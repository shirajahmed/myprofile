let recognition = null;
let isListening = false;

export function initSpeechRecognition(onResult, onError) {
  // Check if browser supports speech recognition
  if (typeof window === "undefined") return false;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn("Speech recognition not supported in this browser");
    return false;
  }

  recognition = new SpeechRecognition();

  // Configure recognition
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  // Set up event handlers
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log("Speech recognized:", transcript);
    onResult(transcript);
  };

  recognition.onerror = (event) => {
    console?.error("Speech recognition error:", event.error);
    onError(event.error);
  };

  recognition.onend = () => {
    console.log("Speech recognition ended");
    isListening = false;
  };

  recognition.onstart = () => {
    console.log("Speech recognition started");
    isListening = true;
  };

  return true;
}

export function startListening() {
  if (!recognition) {
    console?.error("Speech recognition not initialized");
    return false;
  }

  if (isListening) {
    console.log("Already listening");
    return false;
  }

  try {
    recognition.start();
    return true;
  } catch (error) {
    console.error("Error starting speech recognition:", error);
    return false;
  }
}

export function stopListening() {
  if (!recognition) {
    console.error("Speech recognition not initialized");
    return false;
  }

  try {
    recognition.stop();
    return true;
  } catch (error) {
    console.error("Error stopping speech recognition:", error);
    return false;
  }
}

export function isSpeechRecognitionSupported() {
  if (typeof window === "undefined") return false;
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

export function getSpeechRecognitionState() {
  return isListening;
}
