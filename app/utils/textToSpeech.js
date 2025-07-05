let speechEnabled = true;
let currentUtterance = null;

export function speakText(text) {
  if (!speechEnabled || typeof window === "undefined") return;

  // Check if speech synthesis is supported
  if (!window.speechSynthesis) {
    console.warn("Speech synthesis not supported in this browser");
    return;
  }

  // Stop any current speech
  stopCurrentSpeech();

  // Create new utterance
  currentUtterance = new SpeechSynthesisUtterance(text);

  // Configure voice settings
  currentUtterance.rate = 0.9; // Slightly slower for better clarity
  currentUtterance.pitch = 1.0;
  currentUtterance.volume = 0.8;

  // Try to use a pleasant voice
  const voices = window.speechSynthesis.getVoices();

  // Prefer female voices or specific voice types
  const preferredVoice = voices.find(
    (voice) =>
      voice.name.includes("Google") ||
      voice.name.includes("Samantha") ||
      voice.name.includes("Alex") ||
      voice.name.includes("Female")
  );

  if (preferredVoice) {
    currentUtterance.voice = preferredVoice;
  } else if (voices.length > 0) {
    // Use first available voice
    currentUtterance.voice = voices[0];
  }

  // Set up event handlers
  currentUtterance.onstart = () => {
    console.log("Started speaking:", text);
  };

  currentUtterance.onend = () => {
    console.log("Finished speaking");
    currentUtterance = null;
  };

  currentUtterance.onerror = (event) => {
    console.error("Speech synthesis error:", event.error);
    currentUtterance = null;
  };

  // Speak the text
  window.speechSynthesis.speak(currentUtterance);
}

export function stopCurrentSpeech() {
  if (typeof window === "undefined") return;

  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }

  currentUtterance = null;
}

export function toggleSpeechEnabled(enabled) {
  speechEnabled = enabled;

  if (!enabled) {
    stopCurrentSpeech();
  }

  console.log("Speech enabled:", enabled);
}

export function isSpeechEnabled() {
  return speechEnabled;
}

export function isSpeechSynthesisSupported() {
  if (typeof window === "undefined") return false;
  return !!window.speechSynthesis;
}

export function getAvailableVoices() {
  if (typeof window === "undefined") return [];

  return window.speechSynthesis.getVoices();
}

// Load voices when they become available
if (typeof window !== "undefined" && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    const voices = window.speechSynthesis.getVoices();
    console.log(
      "Available voices:",
      voices.map((v) => v.name)
    );
  };
}
