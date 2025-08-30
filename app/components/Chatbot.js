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

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Enhanced knowledge base with better matching
  const knowledgeBase = [
    {
      keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening"],
      answer: "Hello! 👋 I'm Shiraj's AI assistant. How can I help you today?"
    },
    {
      keywords: ["name", "who are you", "what are you"],
      answer: "I'm an AI chatbot created by Shiraj Ahmed. I'm here to help answer questions about web development, his projects, and general inquiries!"
    },
    {
      keywords: ["shiraj", "creator", "developer", "who is shiraj", "about shiraj"],
      answer: "Shiraj Ahmed is a talented frontend developer who specializes in React, Next.js, and modern web technologies. He built this portfolio website and chatbot!"
    },
    {
      keywords: ["help", "what can you do", "capabilities", "features"],
      answer: "I can help you with:\n• Information about Shiraj's projects\n• Web development questions\n• General conversation\n• Voice interaction (if supported)\n• Navigate through the website tools"
    },
    {
      keywords: ["projects", "portfolio", "work", "tools"],
      answer: "Shiraj has built several amazing tools including:\n• Password Generator\n• QR Code Generator\n• Color Generator\n• Calculator Suite\n• Social Media Downloader\n• And many more! Check out the Tools section."
    },
    {
      keywords: ["react", "nextjs", "next.js", "javascript", "web development"],
      answer: "Great question! React is a powerful JavaScript library for building user interfaces. Next.js is a React framework that adds features like server-side rendering and static generation. Shiraj uses these technologies extensively!"
    },
    {
      keywords: ["contact", "email", "reach", "get in touch"],
      answer: "You can reach Shiraj through his social media links on this website or check his contact information in the portfolio section!"
    },
    {
      keywords: ["thank you", "thanks", "appreciate"],
      answer: "You're very welcome! 😊 I'm happy to help. Is there anything else you'd like to know?"
    },
    {
      keywords: ["bye", "goodbye", "see you", "farewell"],
      answer: "Goodbye! 👋 Thanks for chatting with me. Feel free to come back anytime!"
    },
    {
      keywords: ["how are you", "how do you feel", "what's up"],
      answer: "I'm doing great, thank you for asking! 🤖 I'm always ready to help and chat. How are you doing today?"
    },
    {
      keywords: ["weather", "time", "date"],
      answer: "I don't have access to real-time data like weather or current time, but I can help you with web development questions and information about Shiraj's projects!"
    },
    {
      keywords: ["ai", "artificial intelligence", "machine learning"],
      answer: "AI is fascinating! While I'm a simple rule-based chatbot, AI encompasses machine learning, natural language processing, and much more. It's revolutionizing how we interact with technology!"
    }
  ];

  useEffect(() => {
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

    // Simulate thinking time
    setTimeout(() => {
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
        utterance.rate = 0.8;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
      }
    }, 1000);
  };

  const findBestAnswer = (query) => {
    const queryLower = query.toLowerCase();
    
    // Find the best matching knowledge base entry
    let bestMatch = null;
    let highestScore = 0;

    for (const entry of knowledgeBase) {
      let score = 0;
      
      // Check how many keywords match
      for (const keyword of entry.keywords) {
        if (queryLower.includes(keyword.toLowerCase())) {
          score += keyword.length; // Longer keywords get higher scores
        }
      }
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = entry;
      }
    }

    // If we found a good match, return it
    if (bestMatch && highestScore > 0) {
      return bestMatch.answer;
    }

    // Fallback responses for unmatched queries
    const fallbackResponses = [
      "I'm not sure about that specific topic. Could you try asking about Shiraj's projects, web development, or something else I might know?",
      "That's an interesting question! I'm still learning. You might want to ask about Shiraj's work, his tools, or web development topics.",
      "I don't have information about that right now. Feel free to ask me about Shiraj's portfolio, his development projects, or general web development questions!",
      "Hmm, I'm not familiar with that. Try asking me about the tools on this website, Shiraj's background, or web development topics!"
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
    setIsSpeechEnabled(!isSpeechEnabled);
  };

  const clearChat = () => {
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
    <div className="bg-white/95 backdrop-blur-sm p-6 h-full flex flex-col rounded-2xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <FaRobot className="text-2xl text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-800">AI Assistant</h2>
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
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
        {messages.map((message) => (
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
                  : "bg-white text-gray-800 shadow-sm border border-gray-200"
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
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        {speechSupported && (
          <button
            onClick={toggleListening}
            disabled={isLoading}
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
          disabled={!inputText.trim() || isLoading}
          className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          title="Send message"
        >
          <FaPaperPlane />
        </button>
      </div>

      {/* Status */}
      <div className="mt-4 text-center">
        <p className="text-gray-500 text-sm">
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
