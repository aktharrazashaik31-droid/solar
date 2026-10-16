import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  RotateCw, 
  Pause, 
  Play, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  Layers, 
  Sparkles, 
  Compass, 
  ShieldAlert,
  Info
} from 'lucide-react';

export default function PlanetViewer3D({ planet, onInspectLandmark }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isRotating, setIsRotating] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(0.002);
  const [viewMode, setViewMode] = useState('realistic'); // 'realistic' | 'scanner' | 'relief' | 'thermal'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [webGLError, setWebGLError] = useState(false);
  const [isLoadingTexture, setIsLoadingTexture] = useState(true);

  // References for Three.js objects
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const planetMeshRef = useRef(null);
  const cloudsMeshRef = useRef(null);
  const atmosphereMeshRef = useRef(null);
  const lightsRef = useRef({});
  const cameraRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const reqIdRef = useRef(null);

  // Fallback check
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLError(true);
      }
    } catch (e) {
      setWebGLError(true);
    }
  }, []);

  // Initialize and update 3D Scene
  useEffect(() => {
    if (webGLError || !containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 3.6;
    cameraRef.current = camera;

    // 3. Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      rendererRef.current = renderer;
    } catch (err) {
      console.error('WebGL init error:', err);
      setWebGLError(true);
      return;
    }

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
    sunLight.position.set(5, 2, 4);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(new THREE.Color(planet.color), 0.8);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    lightsRef.current = { ambientLight, sunLight, rimLight };

    // 5. Starfield particles in the background of viewport
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 600;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 80;
      starPositions[i + 1] = (Math.random() - 0.5) * 80;
      starPositions[i + 2] = -10 - Math.random() * 40;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.18,
      transparent: true,
      opacity: 0.6
    });
    const starPoints = new THREE.Points(starGeometry, starMaterial);
    scene.add(starPoints);

    // 6. Planet Sphere
    setIsLoadingTexture(true);
    const textureLoader = new THREE.TextureLoader();

    // Planet base geometry
    const geometry = new THREE.SphereGeometry(1.2, 64, 64);
    
    // Create base material
    const material = new THREE.MeshStandardMaterial({
      roughness: 0.85,
      metalness: 0.05
    });

    // Load Planet Surface Map
    textureLoader.load(
      planet.texture,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        material.map = tex;
        material.needsUpdate = true;
        setIsLoadingTexture(false);
      },
      undefined,
      (err) => {
        console.warn('Failed loading texture:', err);
        setIsLoadingTexture(false);
      }
    );

    // Load Bump Map if available (Mars, Venus)
    if (planet.bumpTexture) {
      textureLoader.load(planet.bumpTexture, (bumpTex) => {
        material.bumpMap = bumpTex;
        material.bumpScale = planet.id === 'mars' ? 0.05 : 0.02;
        material.needsUpdate = true;
      });
    }

    const planetMesh = new THREE.Mesh(geometry, material);
    scene.add(planetMesh);
    planetMeshRef.current = planetMesh;

    // 7. Earth Clouds Layer
    let cloudsMesh = null;
    if (planet.id === 'earth' && planet.cloudsTexture) {
      const cloudsGeom = new THREE.SphereGeometry(1.22, 64, 64);
      const cloudsMat = new THREE.MeshStandardMaterial({
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      textureLoader.load(planet.cloudsTexture, (cloudTex) => {
        cloudsMat.map = cloudTex;
        cloudsMat.needsUpdate = true;
      });
      cloudsMesh = new THREE.Mesh(cloudsGeom, cloudsMat);
      scene.add(cloudsMesh);
      cloudsMeshRef.current = cloudsMesh;
    }

    // 8. Atmosphere Glow Shell (Atmospheric Rim)
    const atmosGeom = new THREE.SphereGeometry(1.24, 64, 64);
    const atmosMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 glowColor;
        uniform float intensity;
        void main() {
          float rim = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
          rim = pow(rim, 3.2);
          gl_FragColor = vec4(glowColor, rim * intensity);
        }
      `,
      uniforms: {
        glowColor: { value: new THREE.Color(planet.color) },
        intensity: { value: planet.id === 'venus' ? 0.85 : planet.id === 'earth' ? 0.75 : 0.45 }
      },
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false
    });
    const atmosMesh = new THREE.Mesh(atmosGeom, atmosMat);
    atmosMesh.scale.set(1.12, 1.12, 1.12);
    scene.add(atmosMesh);
    atmosphereMeshRef.current = atmosMesh;

    // Animation Loop
    let lastTime = performance.now();
    const animate = (time) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (isRotating && planetMeshRef.current) {
        // Venus has retrograde rotation (negative)
        const sign = planet.id === 'venus' ? -1 : 1;
        planetMeshRef.current.rotation.y += rotationSpeed * sign;

        if (cloudsMeshRef.current) {
          // Earth clouds drift slightly faster than crust
          cloudsMeshRef.current.rotation.y += rotationSpeed * 1.35;
        }
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      reqIdRef.current = requestAnimationFrame(animate);
    };
    reqIdRef.current = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      if (rendererRef.current) rendererRef.current.dispose();
      geometry.dispose();
      material.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      atmosGeom.dispose();
      atmosMat.dispose();
    };
  }, [planet.id, webGLError]);

  // Adjust View Modes
  useEffect(() => {
    if (!planetMeshRef.current || !rendererRef.current) return;
    const material = planetMeshRef.current.material;
    const { ambientLight, sunLight, rimLight } = lightsRef.current;

    if (viewMode === 'realistic') {
      material.wireframe = false;
      material.roughness = 0.85;
      material.metalness = 0.05;
      if (ambientLight) ambientLight.intensity = 0.25;
      if (sunLight) {
        sunLight.intensity = 2.2;
        sunLight.color.setHex(0xffffff);
      }
      if (atmosphereMeshRef.current) atmosphereMeshRef.current.visible = true;
      if (cloudsMeshRef.current) cloudsMeshRef.current.visible = true;
    } else if (viewMode === 'scanner') {
      material.wireframe = false;
      material.roughness = 0.4;
      material.metalness = 0.2;
      if (ambientLight) ambientLight.intensity = 0.6;
      if (sunLight) {
        sunLight.intensity = 3.0;
        sunLight.color.set(new THREE.Color(planet.color));
      }
      if (atmosphereMeshRef.current) {
        atmosphereMeshRef.current.visible = true;
        atmosphereMeshRef.current.material.uniforms.intensity.value = 1.3;
      }
      if (cloudsMeshRef.current) cloudsMeshRef.current.visible = false;
    } else if (viewMode === 'relief') {
      material.wireframe = false;
      material.roughness = 0.95;
      material.bumpScale = (planet.bumpTexture ? (planet.id === 'mars' ? 0.12 : 0.06) : 0.02);
      if (ambientLight) ambientLight.intensity = 0.15;
      if (sunLight) {
        sunLight.intensity = 2.8;
        sunLight.color.setHex(0xfff7ed);
      }
      if (atmosphereMeshRef.current) atmosphereMeshRef.current.visible = false;
      if (cloudsMeshRef.current) cloudsMeshRef.current.visible = false;
    } else if (viewMode === 'thermal') {
      material.wireframe = false;
      material.roughness = 0.3;
      material.metalness = 0.4;
      if (ambientLight) ambientLight.intensity = 0.05;
      if (sunLight) {
        sunLight.intensity = 3.5;
        sunLight.color.setHex(planet.id === 'venus' ? 0xff4500 : 0x00f0ff);
      }
      if (atmosphereMeshRef.current) atmosphereMeshRef.current.visible = true;
      if (cloudsMeshRef.current) cloudsMeshRef.current.visible = false;
    }
    material.needsUpdate = true;
  }, [viewMode, planet.id, planet.color, planet.bumpTexture]);

  // Mouse & Touch Drag Controls for manual orbital rotation
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    previousMousePositionRef.current = { x: clientX, y: clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || !planetMeshRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    const deltaX = clientX - previousMousePositionRef.current.x;
    const deltaY = clientY - previousMousePositionRef.current.y;

    planetMeshRef.current.rotation.y += deltaX * 0.006;
    planetMeshRef.current.rotation.x += deltaY * 0.006;

    if (cloudsMeshRef.current) {
      cloudsMeshRef.current.rotation.y += deltaX * 0.006;
      cloudsMeshRef.current.rotation.x += deltaY * 0.006;
    }

    previousMousePositionRef.current = { x: clientX, y: clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Zoom controls
  const handleZoom = (delta) => {
    if (!cameraRef.current) return;
    const newZ = cameraRef.current.position.z + delta;
    if (newZ >= 2.0 && newZ <= 6.0) {
      cameraRef.current.position.z = newZ;
    }
  };

  const handleReset = () => {
    if (!cameraRef.current || !planetMeshRef.current) return;
    cameraRef.current.position.set(0, 0, 3.6);
    planetMeshRef.current.rotation.set(0, 0, 0);
    if (cloudsMeshRef.current) cloudsMeshRef.current.rotation.set(0, 0, 0);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-space-950 transition-all duration-500 shadow-2xl flex flex-col justify-between select-none ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[460px] sm:h-[540px] md:h-[620px]'
      }`}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      {/* 3D Canvas or Fallback View */}
      {!webGLError ? (
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0" 
        />
      ) : (
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-space-900">
          <img 
            src={planet.poster} 
            alt={planet.name} 
            className="w-80 h-80 sm:w-96 sm:h-96 object-contain rounded-full shadow-2xl animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300 flex items-center gap-2">
            <Info size={14} className="text-cyan-400" />
            <span>High-Fidelity Photographic Mode Active</span>
          </div>
        </div>
      )}

      {/* Top Telemetry & HUD Bar */}
      <div className="relative z-10 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-space-900/80 backdrop-blur-md border border-slate-700/60 shadow-lg text-xs font-mono tracking-wider text-slate-300">
            <span 
              className="inline-block w-2.5 h-2.5 rounded-full animate-ping"
              style={{ backgroundColor: planet.color }}
            />
            <span className="font-semibold text-white tracking-widest uppercase">{planet.name} ORBITAL VIEWER</span>
            <span className="text-slate-500">|</span>
            <span className="text-cyan-400">{planet.distanceFromSunAU}</span>
          </div>

          {isLoadingTexture && (
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded bg-space-900/80 border border-slate-800 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>STREAMING HIGH-RES MESH...</span>
            </div>
          )}
        </div>

        {/* View Mode Pill Switcher */}
        <div className="pointer-events-auto flex items-center p-1 rounded-xl bg-space-900/85 backdrop-blur-md border border-slate-800 text-xs shadow-xl">
          {[
            { id: 'realistic', label: 'True Color' },
            { id: 'relief', label: 'Relief / Topo' },
            { id: 'scanner', label: 'Atmosphere Rim' },
            { id: 'thermal', label: 'Thermal Shadow' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              className={`px-2.5 sm:px-3 py-1 rounded-lg font-medium transition-all duration-200 ${
                viewMode === mode.id 
                  ? 'bg-slate-700/90 text-white shadow-inner font-semibold' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Center Overlay Instructions (subtle, disappears during interaction) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none text-center opacity-30 hover:opacity-100 transition-opacity">
        <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
          Click & Drag to Rotate 3D Globe
        </p>
      </div>

      {/* Bottom Controls HUD */}
      <div className="relative z-10 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Rotation & Spin Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-xl bg-space-900/85 backdrop-blur-md border border-slate-800 shadow-xl">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2 rounded-lg transition-colors ${
              isRotating ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:bg-slate-800'
            }`}
            title={isRotating ? 'Pause Orbital Spin' : 'Resume Orbital Spin'}
            aria-label={isRotating ? 'Pause rotation' : 'Start rotation'}
          >
            {isRotating ? <Pause size={16} /> : <Play size={16} />}
          </button>

          <button
            onClick={() => setRotationSpeed((s) => (s >= 0.006 ? 0.001 : s + 0.002))}
            className="px-2.5 py-1 rounded-lg text-xs font-mono text-slate-300 hover:bg-slate-800 transition-colors"
            title="Toggle Spin Rate"
          >
            SPEED: {rotationSpeed === 0.001 ? '0.5x' : rotationSpeed === 0.003 ? '1.0x' : '2.0x'}
          </button>

          <div className="w-[1px] h-4 bg-slate-800 mx-1" />

          <button
            onClick={handleReset}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Reset View Orientation"
            aria-label="Reset view orientation"
          >
            <Compass size={16} />
          </button>
        </div>

        {/* Zoom & Fullscreen Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-xl bg-space-900/85 backdrop-blur-md border border-slate-800 shadow-xl">
          <button
            onClick={() => handleZoom(-0.4)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Zoom In"
            aria-label="Zoom in"
          >
            <ZoomIn size={16} />
          </button>

          <button
            onClick={() => handleZoom(0.4)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <ZoomOut size={16} />
          </button>

          <div className="w-[1px] h-4 bg-slate-800 mx-1" />

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
