// Simple text-to-speech utility
let speechEnabled = false;

export function speakText(text) {
  if (typeof window === 'undefined' || !speechEnabled) return;
  
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    // Use a more natural voice if available
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang.startsWith('en') && voice.name.includes('Google')
    ) || voices.find(voice => voice.lang.startsWith('en'));
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    speechSynthesis.speak(utterance);
  }
}

export function toggleSpeechEnabled(enabled) {
  speechEnabled = enabled;
  
  // Stop any ongoing speech when disabled
  if (!enabled && 'speechSynthesis' in window) {
    speechSynthesis.cancel();
  }
}

export function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    speechSynthesis.cancel();
  }
}
