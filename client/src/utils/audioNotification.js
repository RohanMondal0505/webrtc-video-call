// Audio utility for playing notification sounds

class AudioNotification {
	constructor() {
		// Create audio elements for different notifications
		this.ringtone = new Audio();
		this.endCallBeep = new Audio();

		// Set up ringtone (incoming call sound)
		// Using a simple oscillator-based ringtone
		this.setupRingtone();

		// Set up end call beep
		this.setupEndCallBeep();
	}

	setupRingtone() {
		// Create a ringtone using Web Audio API
		const audioContext = new (window.AudioContext || window.webkitAudioContext)();
		const duration = 1.5;
		const sampleRate = audioContext.sampleRate;
		const numSamples = duration * sampleRate;
		const buffer = audioContext.createBuffer(1, numSamples, sampleRate);
		const data = buffer.getChannelData(0);

		// Generate a pleasant ringtone pattern (two-tone)
		for (let i = 0; i < numSamples; i++) {
			const t = i / sampleRate;
			const freq1 = 800; // First tone
			const freq2 = 1000; // Second tone

			// Create a pattern that alternates between two tones
			const pattern = Math.floor(t * 2) % 2;
			const freq = pattern === 0 ? freq1 : freq2;

			// Generate sine wave with envelope
			const envelope = Math.max(0, 1 - (t % 0.75) / 0.75);
			data[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.3;
		}

		const source = audioContext.createBufferSource();
		source.buffer = buffer;
		source.connect(audioContext.destination);

		// Store the audio context and buffer for later use
		this.ringtoneContext = audioContext;
		this.ringtoneBuffer = buffer;
		this.ringtoneSource = null;
		this.isRinging = false;
	}

	setupEndCallBeep() {
		// Create a short beep sound using Web Audio API
		const audioContext = new (window.AudioContext || window.webkitAudioContext)();
		const duration = 0.3;
		const sampleRate = audioContext.sampleRate;
		const numSamples = duration * sampleRate;
		const buffer = audioContext.createBuffer(1, numSamples, sampleRate);
		const data = buffer.getChannelData(0);

		// Generate a descending beep (from 600Hz to 400Hz)
		for (let i = 0; i < numSamples; i++) {
			const t = i / sampleRate;
			const freq = 600 - (200 * t) / duration; // Descending frequency
			const envelope = Math.max(0, 1 - t / duration); // Fade out
			data[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.4;
		}

		this.endCallContext = audioContext;
		this.endCallBuffer = buffer;
	}

	playRingtone() {
		if (this.isRinging) return;

		this.isRinging = true;
		const playSound = () => {
			if (!this.isRinging) return;

			this.ringtoneSource = this.ringtoneContext.createBufferSource();
			this.ringtoneSource.buffer = this.ringtoneBuffer;
			this.ringtoneSource.connect(this.ringtoneContext.destination);
			this.ringtoneSource.start(0);

			// Repeat every 2 seconds
			this.ringtoneTimeout = setTimeout(playSound, 2000);
		};

		playSound();
	}

	stopRingtone() {
		this.isRinging = false;
		if (this.ringtoneTimeout) {
			clearTimeout(this.ringtoneTimeout);
			this.ringtoneTimeout = null;
		}
		if (this.ringtoneSource) {
			try {
				this.ringtoneSource.stop();
			} catch (e) {
				// Source might already be stopped
			}
			this.ringtoneSource = null;
		}
	}

	playEndCallBeep() {
		const source = this.endCallContext.createBufferSource();
		source.buffer = this.endCallBuffer;
		source.connect(this.endCallContext.destination);
		source.start(0);
	}
}

// Create a singleton instance
const audioNotification = new AudioNotification();

export default audioNotification;
