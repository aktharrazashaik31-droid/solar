export const PLANETS_DATA = {
  earth: {
    id: 'earth',
    name: 'Earth',
    tagline: 'The Oasis of Life & Liquid Water',
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    accentGradient: 'from-sky-400 to-blue-600',
    texture: '/textures/earth_atmos.jpg',
    cloudsTexture: '/textures/earth_clouds.png',
    bumpTexture: null,
    poster: '/textures/earth_poster.jpg',
    orderFromSun: 3,
    distanceFromSunAU: '1.00 AU',
    distanceFromSunKm: '149,597,870 km',
    overview: 'The third planet from the Sun and the only astronomical object known to harbor life. Earth possesses an active hydrological cycle, dynamic plate tectonics, and a protective magnetosphere powered by its convective liquid nickel-iron outer core.',
    quickStats: {
      diameter: '12,742 km',
      mass: '5.972 × 10²⁴ kg',
      gravity: '9.807 m/s² (1.0 g)',
      surfacePressure: '1.013 bar (101.3 kPa)',
      meanTemperature: '15°C (59°F)',
      tempRange: '-89.2°C to 56.7°C',
      dayLength: '23h 56m 04s (solar 24h)',
      yearLength: '365.25 days',
      moons: '1 (The Moon / Luna)',
      orbitalSpeed: '29.78 km/s',
      axialTilt: '23.44°',
      escapeVelocity: '11.19 km/s'
    },
    atmosphere: {
      summary: 'A nitrogen-oxygen rich envelope protected by a robust geomagnetic field, maintaining surface liquid water and blocking lethal ionizing cosmic radiation.',
      pressureComparison: 'Baseline standard (1.0 atm)',
      composition: [
        { gas: 'Nitrogen (N₂)', percentage: 78.08, color: '#38bdf8' },
        { gas: 'Oxygen (O₂)', percentage: 20.95, color: '#0284c7' },
        { gas: 'Argon (Ar)', percentage: 0.93, color: '#64748b' },
        { gas: 'Carbon Dioxide (CO₂)', percentage: 0.042, color: '#94a3b8' },
        { gas: 'Water Vapor (H₂O) & Trace', percentage: 0.04, color: '#bae6fd' }
      ]
    },
    landmarks: [
      {
        name: 'Challenger Deep (Mariana Trench)',
        type: 'Oceanic Abyssal Trench',
        metric: '10,994 meters below sea level',
        description: 'The deepest point in Earth’s oceans, subjected to hydrostatic pressures exceeding 1,000 atmospheres.'
      },
      {
        name: 'Mount Everest (Sagarmatha)',
        type: 'Tectonic Continental Peak',
        metric: '8,848.86 meters above sea level',
        description: 'Formed by the ongoing continental collision of the Indian and Eurasian tectonic plates.'
      },
      {
        name: 'The Great Barrier Reef',
        type: 'Living Biogenic Structure',
        metric: '2,300 km continuous expanse',
        description: 'The largest living structure visible from orbit, constructed entirely by billions of coral polyps.'
      }
    ],
    missions: [
      { year: '1972', name: 'Apollo 17', type: 'Human Lunar Mission', note: 'Captured the iconic "Blue Marble" photograph of Earth.' },
      { year: '1990', name: 'Voyager 1 Pale Blue Dot', type: 'Deep Space Telescope', note: 'Turned its camera from 6 billion km to reveal Earth as a speck of dust in a sunbeam.' },
      { year: '2015', name: 'DSCOVR (EPIC)', type: 'Lagrange Point 1 Observatory', note: 'Provides real-time continuous observations of Earth’s sunlit face from 1.5 million km.' }
    ],
    curiosities: [
      {
        title: 'Geodynamo Shield',
        body: 'Earth’s molten metallic outer core continuously rotates, acting as a massive self-exciting dynamo that generates the magnetic field shielding our atmosphere from solar wind stripping.'
      },
      {
        title: 'Hydrological Miracle',
        body: 'Over 70.8% of Earth’s surface is covered in liquid water. It is the only planet where water exists simultaneously as ice, liquid, and gas across normal surface conditions.'
      },
      {
        title: 'The Tectonic Engine',
        body: 'Earth is the only planet in our solar system with active plate tectonics, which continually recycles carbon dioxide and maintains long-term thermal and climatic equilibrium.'
      }
    ]
  },

  venus: {
    id: 'venus',
    name: 'Venus',
    tagline: 'The Runaway Greenhouse Hellscape',
    color: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.35)',
    accentGradient: 'from-amber-400 to-yellow-600',
    texture: '/textures/venus_atmos.jpg',
    cloudsTexture: null,
    bumpTexture: '/textures/venus_bump.jpg',
    poster: '/textures/venus_poster.jpg',
    orderFromSun: 2,
    distanceFromSunAU: '0.72 AU',
    distanceFromSunKm: '108,208,000 km',
    overview: 'Often termed Earth’s "evil twin", Venus possesses roughly 95% of Earth’s diameter and 81% of its mass. However, a runaway greenhouse effect has trapped solar heat beneath a crushing, opaque supercritical CO₂ atmosphere crowned with clouds of concentrated sulfuric acid.',
    quickStats: {
      diameter: '12,104 km',
      mass: '4.867 × 10²⁴ kg',
      gravity: '8.87 m/s² (0.904 g)',
      surfacePressure: '92.0 bar (9.2 MPa)',
      meanTemperature: '464°C (867°F)',
      tempRange: '438°C to 482°C (isothermal)',
      dayLength: '243 Earth days (retrograde)',
      yearLength: '224.7 Earth days',
      moons: '0 (None)',
      orbitalSpeed: '35.02 km/s',
      axialTilt: '177.36° (upside down)',
      escapeVelocity: '10.36 km/s'
    },
    atmosphere: {
      summary: 'A supercritical fluid layer of carbon dioxide under 92 atmospheres of pressure, with upper cloud decks composed of pure droplets of concentrated sulfuric acid (H₂SO₄).',
      pressureComparison: 'Equivalent to 900 meters depth in Earth oceans',
      composition: [
        { gas: 'Carbon Dioxide (CO₂)', percentage: 96.5, color: '#eab308' },
        { gas: 'Nitrogen (N₂)', percentage: 3.5, color: '#ca8a04' },
        { gas: 'Sulfur Dioxide (SO₂)', percentage: 0.015, color: '#fef08a' },
        { gas: 'Argon (Ar)', percentage: 0.007, color: '#a1a1aa' },
        { gas: 'Water Vapor (trace)', percentage: 0.002, color: '#71717a' }
      ]
    },
    landmarks: [
      {
        name: 'Maxwell Montes',
        type: 'Massive Mountain Range',
        metric: '11,000 meters above mean radius',
        description: 'Towers higher than Mount Everest, coated in a reflective metallic frost suspected to be bismuth sulfide or tellurium.'
      },
      {
        name: 'Aphrodite Terra',
        type: 'Equatorial Highland Continent',
        metric: 'Roughly the size of South America',
        description: 'Heavily fractured volcanic terrain marked with intricate coronae, rift valleys, and compressional ridges.'
      },
      {
        name: 'Maat Mons',
        type: 'Shield Volcano',
        metric: '8,000 meters elevation',
        description: 'One of the tallest volcanoes on Venus, displaying radar evidence of active volcanism and recent basaltic lava flows.'
      }
    ],
    missions: [
      { year: '1970', name: 'Venera 7', type: 'Soviet Lander', note: 'First human craft to transmit telemetry from the surface of another planet (survived 23 minutes).' },
      { year: '1990', name: 'Magellan', type: 'NASA Synthetic Aperture Radar', note: 'Mapped 98% of the surface through impenetrable cloud cover at sub-kilometer resolution.' },
      { year: '2029+', name: 'DAVINCI & VERITAS', type: 'Upcoming NASA Probes', note: 'Deep atmospheric probe and high-precision orbital geophysical mapper to uncover ocean history.' }
    ],
    curiosities: [
      {
        title: 'Retrograde Rotation',
        body: 'Venus spins backward compared to almost all other planets in the solar system. The Sun rises in the west and sets in the east, and one day lasts longer than one Venusian year!'
      },
      {
        title: 'Super-Rotation',
        body: 'While the solid planet crawls at only 6.5 km/h at the equator, its upper cloud decks race around the entire world in just 4 Earth days at speeds exceeding 360 km/h.'
      },
      {
        title: 'Lead Melting Temperature',
        body: 'With steady surface temperatures of 464°C (867°F), Venus is hotter than Mercury despite being nearly twice as far from the Sun. Surface lead, zinc, and tin would pool into molten liquid.'
      }
    ]
  },

  mars: {
    id: 'mars',
    name: 'Mars',
    tagline: 'The Red Planet & Ancient Oceanic Frontier',
    color: '#ea580c',
    glowColor: 'rgba(234, 88, 12, 0.35)',
    accentGradient: 'from-orange-500 to-red-700',
    texture: '/textures/mars_atmos.jpg',
    cloudsTexture: null,
    bumpTexture: '/textures/mars_bump.jpg',
    poster: '/textures/mars_poster.jpg',
    orderFromSun: 4,
    distanceFromSunAU: '1.52 AU',
    distanceFromSunKm: '227,943,824 km',
    overview: 'The fourth planet from the Sun and the second-smallest planet in the solar system. A cold, hyper-arid desert world whose iconic rusty hue stems from widespread iron(III) oxide dust. Ancient river valleys, deltas, and sedimentary strata reveal Mars once held a dense atmosphere and vast northern oceans.',
    quickStats: {
      diameter: '6,779 km (53% of Earth)',
      mass: '6.417 × 10²³ kg (11% of Earth)',
      gravity: '3.721 m/s² (0.379 g)',
      surfacePressure: '0.0063 bar (636 Pa)',
      meanTemperature: '-63°C (-81°F)',
      tempRange: '-140°C to +20°C',
      dayLength: '24h 37m 22s (1 Sol)',
      yearLength: '687 Earth days (1.88 Earth years)',
      moons: '2 (Phobos & Deimos)',
      orbitalSpeed: '24.07 km/s',
      axialTilt: '25.19° (similar seasons to Earth)',
      escapeVelocity: '5.03 km/s'
    },
    atmosphere: {
      summary: 'An extremely thin, desiccated carbon dioxide atmosphere providing less than 1% of Earth’s sea-level pressure, allowing cosmic radiation and ultraviolet light to sterilize the topsoil.',
      pressureComparison: 'Equivalent to Earth altitude at 35,000 meters',
      composition: [
        { gas: 'Carbon Dioxide (CO₂)', percentage: 95.32, color: '#ea580c' },
        { gas: 'Nitrogen (N₂)', percentage: 2.60, color: '#c2410c' },
        { gas: 'Argon (Ar)', percentage: 1.90, color: '#78716c' },
        { gas: 'Oxygen (O₂)', percentage: 0.13, color: '#38bdf8' },
        { gas: 'Carbon Monoxide & Water', percentage: 0.05, color: '#fdba74' }
      ]
    },
    landmarks: [
      {
        name: 'Olympus Mons',
        type: 'Colossal Shield Volcano',
        metric: '21.9 km height, 600 km width',
        description: 'The tallest planetary mountain and volcano in the known solar system, nearly three times the height of Mount Everest.'
      },
      {
        name: 'Valles Marineris',
        type: 'Grand Rift Valley Canyon',
        metric: 'Over 4,000 km long, up to 7 km deep',
        description: 'A colossal tectonic rift system stretching across a quarter of Mars’ circumference, dwarfing Earth’s Grand Canyon.'
      },
      {
        name: 'Jezero Crater',
        type: 'Ancient Paleolake Basin',
        metric: '45 km diameter',
        description: 'Site of an ancient river delta where NASA’s Perseverance rover is currently drilling rock cores to search for fossil biosignatures.'
      }
    ],
    missions: [
      { year: '1976', name: 'Viking 1 & 2', type: 'NASA Orbiters & Landers', note: 'First successful operational landing on Mars, providing high-resolution color panoramas.' },
      { year: '2012', name: 'Curiosity (MSL)', type: 'Nuclear-Powered Rover', note: 'Discovered ancient organic molecules and evidence of long-lasting habitable freshwater lakes in Gale Crater.' },
      { year: '2021', name: 'Perseverance & Ingenuity', type: 'Rover & Autonomous Helicopter', note: 'Achieved the first powered, controlled aerodynamic flight on another world (72 total flights).' }
    ],
    curiosities: [
      {
        title: 'Global Dust Storms',
        body: 'During perihelion, atmospheric temperature gradients trigger continent-sized dust devils that can merge into a titanic planetary dust storm engulfing the entire globe for months.'
      },
      {
        title: 'Blue Sunsets',
        body: 'Because the fine martian ferric dust particles scatter red light away through Mie scattering, sunsets and sunrises on Mars appear as an ethereal pale blue halo around the Sun.'
      },
      {
        title: 'Doomed Moon Phobos',
        body: 'Mars’ innermost moon Phobos orbits just 6,000 km above the surface and is steadily spiraling inward. In 30 to 50 million years, tidal forces will tear Phobos into a ring of planetary debris.'
      }
    ]
  }
};

export const COMPARATIVE_METRICS = [
  { metric: 'Equatorial Diameter', earth: '12,742 km', venus: '12,104 km (95%)', mars: '6,779 km (53%)', unit: 'km' },
  { metric: 'Surface Gravity', earth: '9.81 m/s² (1.00g)', venus: '8.87 m/s² (0.90g)', mars: '3.72 m/s² (0.38g)', unit: 'm/s²' },
  { metric: 'Mean Surface Temp', earth: '+15°C (288 K)', venus: '+464°C (737 K)', mars: '-63°C (210 K)', unit: '°C' },
  { metric: 'Surface Pressure', earth: '1.01 bar (101 kPa)', venus: '92 bar (9,200 kPa)', mars: '0.006 bar (0.63 kPa)', unit: 'bar' },
  { metric: 'Solar Irradiance', earth: '1,361 W/m²', venus: '2,601 W/m²', mars: '586 W/m²', unit: 'W/m²' },
  { metric: 'Length of Day (Solar)', earth: '24 hours', venus: '116.75 Earth days', mars: '24 hours 37 mins', unit: 'duration' },
  { metric: 'Natural Satellites', earth: '1 (The Moon)', venus: '0', mars: '2 (Phobos & Deimos)', unit: 'count' },
  { metric: 'Global Magnetic Field', earth: 'Strong Dynamo (30–60 µT)', venus: 'Induced ionospheric only', mars: 'Localized crustal remnants', unit: 'field' }
];

export const EDUCATIONAL_MODULES = [
  {
    code: 'MOD-01',
    title: 'The Habitable Zone Calculus',
    description: 'Explore the thermodynamic boundaries of the circumstellar habitable zone ("Goldilocks Zone") and how planetary mass and atmospheric feedback determine liquid water stability.'
  },
  {
    code: 'MOD-02',
    title: 'Atmospheric Evolution & Runaway States',
    description: 'Contrast Earth’s stabilized carbon cycle against Venus’ runaway greenhouse tipping point and Mars’ irreversible atmospheric stripping by solar wind.'
  },
  {
    code: 'MOD-03',
    title: 'In-Situ Resource Utilization (ISRU)',
    description: 'Examine chemical pathways to synthesize rocket propellant (methalox via the Sabatier reaction) and breathing oxygen directly from the martian and venusian atmospheres.'
  }
];
