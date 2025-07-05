"use client";

import { useState, useEffect, useRef } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVolumeUp,
  FaVolumeMute,
  FaPaperPlane,
} from "react-icons/fa";
import { searchAnswers } from "../utils/googleSheets";
import {
  initSpeechRecognition,
  startListening,
  stopListening,
} from "../utils/speechRecognition";
import { speakText, toggleSpeechEnabled } from "../utils/textToSpeech";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Initialize with welcome message (client-side only)
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your voice chatbot. You can type or speak to me!",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    // Initialize speech recognition
    const isSupported = initSpeechRecognition(
      handleSpeechResult,
      handleSpeechError
    );
    setSpeechSupported(isSupported);

    // Load knowledge base from Google Sheets
    loadKnowledgeBase();

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadKnowledgeBase = async () => {
    try {
      const data = await searchAnswers();
      setKnowledgeBase(data);
    } catch (error) {
      console.error("Error loading knowledge base:", error);
      // Fallback data if Google Sheets fails
      setKnowledgeBase([
        {
          question: "What is your name?",
          answer: "I'm Shiraj's chatbot assistant!",
        },
        {
          question: "Who is Shiraj?",
          answer: "Shiraj is a frontend engineer who built this chatbot.",
        },
        {
          question: "What can you do?",
          answer:
            "I can chat with you using text or voice, and I get my knowledge from Google Sheets!",
        },
        {
          question: "How are you?",
          answer:
            "I'm doing great! Thanks for asking. How can I help you today?",
        },
      ]);
    }
  };

  const handleSpeechResult = (transcript) => {
    console.log("🎤 Speech recognized:", transcript);
    setInputText(transcript);
    setIsListening(false);
    // Auto-send the message
    setTimeout(() => sendMessage(transcript), 500);
  };

  const handleSpeechError = (error) => {
    console.error("Speech recognition error:", error);
    setIsListening(false);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
      setIsListening(false);
    } else {
      startListening();
      setIsListening(true);
    }
  };

  const sendMessage = async (messageText = inputText) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      // Search for answer in knowledge base
      const response = await findBestAnswer(messageText);

      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botMessage]);

      // Speak the response if speech is enabled
      if (isSpeechEnabled) {
        speakText(response);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble processing your request. Please try again.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const findBestAnswer = async (query) => {
    console.log("🔍 Searching for:", query);
    console.log("📚 Knowledge base:", knowledgeBase);

    // Import Fuse.js dynamically
    const Fuse = (await import("fuse.js")).default;

    const fuse = new Fuse(knowledgeBase, {
      keys: ["question"],
      threshold: 0.6, // More lenient for voice input (0.0 = exact match, 1.0 = match anything)
      includeScore: true,
      minMatchCharLength: 2,
      ignoreLocation: true,
      findAllMatches: true,
    });

    const results = fuse.search(query);
    console.log("🎯 Search results:", results);

    if (results.length > 0) {
      const bestMatch = results[0];
      console.log("✅ Best match:", bestMatch);

      // More lenient scoring - if we have any result, use it
      if (bestMatch.score < 0.8) {
        return bestMatch.item.answer;
      }
    }

    // Try simple keyword matching as fallback
    const queryLower = query.toLowerCase();
    for (const item of knowledgeBase) {
      const questionLower = item.question.toLowerCase();
      if (
        questionLower.includes(queryLower) ||
        queryLower.includes(questionLower)
      ) {
        console.log("✅ Keyword match found:", item);
        return item.answer;
      }
    }

    // Check for common words/phrases
    const commonPhrases = [
      {
        phrases: ["hello", "hi", "hey"],
        answer: "Hello! How can I help you today?",
      },
      {
        phrases: ["thank you", "thanks"],
        answer: "You're welcome! Is there anything else I can help you with?",
      },
      {
        phrases: ["goodbye", "bye", "see you"],
        answer: "Goodbye! Have a great day!",
      },
      {
        phrases: ["help", "assist"],
        answer:
          "I'm here to help! You can ask me questions about Shiraj, web development, or anything in my knowledge base.",
      },
    ];

    for (const phrase of commonPhrases) {
      if (phrase.phrases.some((p) => queryLower.includes(p))) {
        console.log("✅ Common phrase match:", phrase);
        return phrase.answer;
      }
    }

    return "I'm not sure about that. Can you try asking differently or check if your question is in my knowledge base?";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleSpeech = () => {
    const newState = !isSpeechEnabled;
    setIsSpeechEnabled(newState);
    toggleSpeechEnabled(newState);
  };

  // Show loading state until initialized
  if (!isInitialized) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto">
        <div className="flex justify-center items-center h-96">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Initializing chatbot...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Chat</h2>
        <div className="flex gap-2">
          <button
            onClick={toggleSpeech}
            className={`p-3 rounded-full transition-all ${
              isSpeechEnabled
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
            title={
              isSpeechEnabled ? "Disable voice output" : "Enable voice output"
            }
          >
            {isSpeechEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-white/5 rounded-xl">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            } message-animation`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white/20 text-white"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/20 text-white px-4 py-2 rounded-2xl">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message or use voice..."
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/40"
          />
        </div>

        {speechSupported && (
          <button
            onClick={toggleListening}
            className={`p-3 rounded-xl transition-all ${
              isListening
                ? "bg-red-500 text-white recording-animation"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </button>
        )}

        <button
          onClick={() => sendMessage()}
          disabled={!inputText.trim() || isLoading}
          className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          title="Send message"
        >
          <FaPaperPlane />
        </button>
      </div>

      {/* Status */}
      <div className="mt-4 text-center">
        <p className="text-white/60 text-sm">
          {isListening
            ? "🎤 Listening..."
            : !speechSupported
            ? "⚠️ Speech not supported in this browser"
            : knowledgeBase.length > 0
            ? `💾 Knowledge base loaded (${knowledgeBase.length} entries)`
            : "📡 Loading knowledge base..."}
        </p>
      </div>
    </div>
  );
}
