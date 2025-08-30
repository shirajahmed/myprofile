// Simple speech recognition utility
let recognition = null;
let isListening = false;

export function initSpeechRecognition(onResult, onError) {
  if (typeof window === 'undefined') return false;
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    console.warn('Speech recognition not supported');
    return false;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    isListening = false;
    if (onResult) onResult(transcript);
  };

  recognition.onerror = (event) => {
    isListening = false;
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    isListening = false;
  };

  return true;
}

export function startListening() {
  if (recognition && !isListening) {
    try {
      recognition.start();
      isListening = true;
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
    }
  }
}

export function stopListening() {
  if (recognition && isListening) {
    try {
      recognition.stop();
      isListening = false;
    } catch (error) {
      console.error('Failed to stop speech recognition:', error);
    }
  }
}

export function isCurrentlyListening() {
  return isListening;
}
