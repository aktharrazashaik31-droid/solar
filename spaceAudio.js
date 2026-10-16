// Web Audio API Procedural Space Drone & Interface Telemetry (Zero external audio files required)

let audioCtx = null;
let droneGain = null;
let osc1 = null;
let osc2 = null;
let filter = null;
let isMuted = true;

export const initSpaceAudio = () => {
  if (audioCtx) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  audioCtx = new AudioContext();

  // Create deep cosmic resonant hum
  osc1 = audioCtx.createOscillator();
  osc2 = audioCtx.createOscillator();
  filter = audioCtx.createBiquadFilter();
  droneGain = audioCtx.createGain();

  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(55, audioCtx.currentTime); // A1 note

  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(110, audioCtx.currentTime); // A2 harmonic

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(160, audioCtx.currentTime);
  filter.Q.setValueAtTime(4.0, audioCtx.currentTime);

  droneGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(droneGain);
  droneGain.connect(audioCtx.destination);

  osc1.start();
  osc2.start();
};

export const toggleSpaceAudio = (enable) => {
  if (!audioCtx) initSpaceAudio();
  if (!audioCtx || !droneGain) return false;

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  isMuted = !enable;
  if (enable) {
    droneGain.gain.exponentialRampToValueAtTime(0.06, audioCtx.currentTime + 1.2);
  } else {
    droneGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);
  }
  return enable;
};

// Play a subtle sci-fi telemetry ping when switching planets
export const playTelemetryBeep = (freq = 880) => {
  if (isMuted || !audioCtx) return;
  try {
    const beepOsc = audioCtx.createOscillator();
    const beepGain = audioCtx.createGain();
    
    beepOsc.type = 'sine';
    beepOsc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    beepGain.gain.setValueAtTime(0.03, audioCtx.currentTime);
    beepGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);

    beepOsc.connect(beepGain);
    beepGain.connect(audioCtx.destination);

    beepOsc.start();
    beepOsc.stop(audioCtx.currentTime + 0.12);
  } catch (e) {
    // silently catch if audio context not unlocked
  }
};
