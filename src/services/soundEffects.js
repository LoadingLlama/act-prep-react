/**
 * Sound Effects Service
 * Provides playful sound effects for UI interactions
 */

class SoundEffectsService {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.enabled = true;
    this.volume = 0.3;

    // Initialize on first user interaction
    this.initialized = false;
  }

  /**
   * Initialize audio context (must be called after user interaction)
   */
  init() {
    if (this.initialized) return;

    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.initialized = true;
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
      this.enabled = false;
    }
  }

  /**
   * Play a simple click sound
   */
  playClick() {
    if (!this.enabled) return;
    this.init();

    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Quick click sound
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(this.volume * 0.5, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.05);
  }

  /**
   * Play a success sound
   */
  playSuccess() {
    if (!this.enabled) return;
    this.init();

    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Pleasant ascending tone
    oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(900, this.audioContext.currentTime + 0.1);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.15);
  }

  /**
   * Play a hover sound
   */
  playHover() {
    if (!this.enabled) return;
    this.init();

    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Subtle hover tone
    oscillator.frequency.value = 1000;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(this.volume * 0.2, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.03);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.03);
  }

  /**
   * Play a navigation sound
   */
  playNavigation() {
    if (!this.enabled) return;
    this.init();

    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Wooden knock sound - medium low pitch
    oscillator.frequency.setValueAtTime(280, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(140, this.audioContext.currentTime + 0.05);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(this.volume * 0.5, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.08);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.08);
  }

  /**
   * Play a toggle sound
   */
  playToggle() {
    if (!this.enabled) return;
    this.init();

    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Subtle low toggle sound
    oscillator.frequency.value = 220;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(this.volume * 0.15, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.06);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.06);
  }

  /**
   * Play a pop sound for modals/dialogs
   */
  playPop() {
    if (!this.enabled) return;
    this.init();

    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Quick pop
    oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.1);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(this.volume * 0.6, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  /**
   * Enable or disable sounds
   */
  setEnabled(enabled) {
    this.enabled = enabled;
    localStorage.setItem('soundEffectsEnabled', enabled ? 'true' : 'false');
  }

  /**
   * Set volume (0 to 1)
   */
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    localStorage.setItem('soundEffectsVolume', this.volume.toString());
  }

  /**
   * Check if sounds are enabled
   */
  isEnabled() {
    return this.enabled;
  }

  /**
   * Load settings from localStorage
   */
  loadSettings() {
    const enabled = localStorage.getItem('soundEffectsEnabled');
    if (enabled !== null) {
      this.enabled = enabled === 'true';
    }

    const volume = localStorage.getItem('soundEffectsVolume');
    if (volume !== null) {
      this.volume = parseFloat(volume);
    }
  }
}

// Create singleton instance
const soundEffects = new SoundEffectsService();

// Load settings on initialization
soundEffects.loadSettings();

export default soundEffects;
