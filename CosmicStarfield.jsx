import React, { useEffect, useRef } from 'react';

export default function CosmicStarfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;

    const stars = [];
    const starCount = 180;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.2 + 0.3,
          alpha: Math.random() * 0.7 + 0.2,
          speed: Math.random() * 0.15 + 0.05,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          color: Math.random() > 0.8 ? '#38bdf8' : Math.random() > 0.6 ? '#fef08a' : '#ffffff'
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle cosmic dust nebula gradient
      const grad = ctx.createRadialGradient(
        width * 0.5, height * 0.35, 10,
        width * 0.5, height * 0.35, width * 0.8
      );
      grad.addColorStop(0, 'rgba(14, 116, 144, 0.04)');
      grad.addColorStop(0.5, 'rgba(8, 12, 22, 0.2)');
      grad.addColorStop(1, 'rgba(3, 5, 9, 0.8)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }

        star.alpha += Math.sin(Date.now() * star.twinkleSpeed) * 0.01;
        const currentAlpha = Math.max(0.1, Math.min(0.9, star.alpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[-1] opacity-75"
    />
  );
}
