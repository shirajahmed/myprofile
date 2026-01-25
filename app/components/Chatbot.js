"use client";

import { useState, useEffect, useRef } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVolumeUp,
  FaVolumeMute,
  FaPaperPlane,
  FaRobot,
  FaUser,
} from "react-icons/fa";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [dynamicKnowledgeBase, setDynamicKnowledgeBase] = useState([]);
  const [isKnowledgeBaseLoading, setIsKnowledgeBaseLoading] = useState(true);
  const [knowledgeBaseError, setKnowledgeBaseError] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchKnowledgeBase = async () => {
      try {
        const response = await fetch('/api/sheets');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const transformedKnowledgeBase = data.data.map(item => ({
          keywords: item.question.toLowerCase().split(/\s*,\s*|\s+/).filter(Boolean),
          answer: item.answer
        }));
        setDynamicKnowledgeBase(transformedKnowledgeBase);
        setKnowledgeBaseError(null); // Clear any previous errors
      } catch (error) {
        console.error("Failed to fetch knowledge base:", error);
        setKnowledgeBaseError("Failed to load knowledge base. Using limited internal data.");
        // Fallback to a default message if fetching fails
        setDynamicKnowledgeBase([
          {
            keywords: ["hello", "hi"],
            answer: "Hello! I couldn't load my full knowledge base right now, but I can still chat with you. How can I help?"
          }
        ]);
      } finally {
        setIsKnowledgeBaseLoading(false);
      }
    };

    fetchKnowledgeBase();

    // Initialize with welcome message
    setMessages([
      {
        id: 1,
        text: "Hello! I'm Shiraj's AI assistant. You can type or speak to me! 🤖",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    // Initialize speech recognition
    initializeSpeechRecognition();
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const initializeSpeechRecognition = () => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputText(transcript);
          setIsListening(false);
          // Auto-send after a short delay
          setTimeout(() => sendMessage(transcript), 500);
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        setRecognition(recognition);
        setSpeechSupported(true);
      } else {
        setSpeechSupported(false);
      }
    }
  };

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const sendMessage = async (messageText = inputText) => {
    const text = messageText.trim();
    if (!text) return;

    const userMessage = {
      id: Date.now(),
      text: text,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Simulate thinking time and get response
    const response = findBestAnswer(text);
      
    const botMessage = {
      id: Date.now() + 1,
      text: response,
      sender: "bot",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);

    // Speak the response if enabled
    if (isSpeechEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.rate = 1.1; // Increased for clearer speech
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const findBestAnswer = (query) => {
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(Boolean); // Split query into words

    let bestMatch = null;
    let highestScore = 0;

    for (const entry of dynamicKnowledgeBase) {
      let currentScore = 0;
      const matchedKeywords = new Set(); // To avoid double-counting words

      for (const keyword of entry.keywords) {
        const keywordLower = keyword.toLowerCase();
        
        // Check for exact word matches
        if (queryWords.includes(keywordLower)) {
          currentScore += keywordLower.length * 2; // Higher score for exact word match
          matchedKeywords.add(keywordLower);
        } else if (queryLower.includes(keywordLower)) {
          // Fallback to substring match if not an exact word, but with lower score
          currentScore += keywordLower.length;
          matchedKeywords.add(keywordLower);
        }
      }
      
      if (currentScore > highestScore) {
        highestScore = currentScore;
        bestMatch = entry;
      }
    }

    if (bestMatch && highestScore > 0) {
      return bestMatch.answer;
    }

    const fallbackResponses = [
      "I'm not sure about that. Can you try rephrasing your question?",
      "I'm still learning. Please ask me something else.",
      "I don't have information on that topic at the moment. Is there anything else I can assist you with?",
      "That's an interesting question! I might not have the answer yet. Try a different query."
    ];

    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleSpeech = () => {
    if (isSpeechEnabled && 'speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    setIsSpeechEnabled(!isSpeechEnabled);
  };

  const clearChat = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    setMessages([
      {
        id: 1,
        text: "Chat cleared! How can I help you? 🤖",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  return (
    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-6 h-full flex flex-col rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <FaRobot className="text-2xl text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">AI Assistant</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={toggleSpeech}
            className={`p-2 rounded-lg transition-all ${
              isSpeechEnabled
                ? "bg-green-100 text-green-600 hover:bg-green-200"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
            title={isSpeechEnabled ? "Disable voice output" : "Enable voice output"}
          >
            {isSpeechEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
          </button>
          <button
            onClick={clearChat}
            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
            title="Clear chat"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
        {isKnowledgeBaseLoading && (
          <div className="flex justify-center items-center h-full text-gray-500">
            <p>Loading knowledge base...</p>
          </div>
        )}

        {knowledgeBaseError && (
          <div className="flex justify-center items-center p-2 bg-red-100 text-red-600 rounded-lg">
            <p>{knowledgeBaseError}</p>
          </div>
        )}

        {!isKnowledgeBaseLoading && messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            } animate-fadeIn`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${
                message.sender === "user"
                  ? "bg-blue-500 text-white shadow-sm"
                  : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-gray-600"
              }`}
            >
              <div className="flex items-start gap-2">
                {message.sender === "bot" && <FaRobot className="text-blue-500 mt-1 flex-shrink-0" />}
                {message.sender === "user" && <FaUser className="text-blue-200 mt-1 flex-shrink-0" />}
                <div className="flex-1">
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className="text-xs opacity-70 mt-2">{message.timestamp}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start animate-fadeIn">
            <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-2">
                <FaRobot className="text-blue-500" />
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message or use voice..."
            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading || isKnowledgeBaseLoading}
          />
        </div>

        {speechSupported && (
          <button
            onClick={toggleListening}
            disabled={isLoading || isKnowledgeBaseLoading}
            className={`p-3 rounded-xl transition-all ${
              isListening
                ? "bg-red-500 text-white animate-pulse"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            } disabled:opacity-50`}
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </button>
        )}

        <button
          onClick={() => sendMessage()}
          disabled={!inputText.trim() || isLoading || isKnowledgeBaseLoading}
          className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          title="Send message"
        >
          <FaPaperPlane />
        </button>
      </div>

      {/* Status */}
      <div className="mt-4 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {isListening
            ? "🎤 Listening... Speak now!"
            : !speechSupported
            ? "⚠️ Voice input not supported in this browser"
            : "💬 Type a message or click the microphone to speak"}
        </p>
      </div>
    </div>
  );
}
