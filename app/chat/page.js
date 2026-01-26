"use client";

import { useState, useEffect, useRef, useCallback } from "react";


const getTypingMessage = (typingUsers) => {
  const users = Object.values(typingUsers);
  if (users.length === 0) return null;
  
  // Filter out potential stale users (e.g., if a stop_typing wasn't received)
  const activeTypingUsers = users.filter(user => Date.now() - user.timer < 5000); // Consider typing for 5 seconds

  if (activeTypingUsers.length === 0) return null;
  
  const userNames = activeTypingUsers.map(user => user.userName);

  if (userNames.length === 1) {
    return `${userNames[0]} is typing...`;
  }
  if (userNames.length === 2) {
    return `${userNames[0]} and ${userNames[1]} are typing...`;
  }
  return "Multiple people are typing...";
};

const saveMessages = (chatId, messages) => {
  try {
    // Keep only last 20 messages to prevent quota issues with images
    const limitedMessages = messages.slice(-20);
    localStorage.setItem(
      `chat-messages-${chatId}`,
      JSON.stringify(limitedMessages),
    );
  } catch (error) {
    console.warn("Storage quota exceeded, clearing data");
    // Clear all chat data
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("chat-messages-")) {
        localStorage.removeItem(key);
      }
    });
    // Try with just last 5 messages
    try {
      const reducedMessages = messages.slice(-5);
      localStorage.setItem(
        `chat-messages-${chatId}`,
        JSON.stringify(reducedMessages),
      );
    } catch (e) {
      // If still failing, don't store messages
      console.error("Storage completely full, running without persistence");
    }
  }
};

const handleTyping = (ws, chatId, userId, userName, typingTimeoutRef) => {
  if (!ws || ws.readyState !== WebSocket.OPEN) return;

  // Send typing event
  ws.send(JSON.stringify({ type: "typing", chatId, userId, userName }));

  // Clear previous timeout
  if (typingTimeoutRef.current) {
    clearTimeout(typingTimeoutRef.current);
  }

  // Set new timeout to send stop_typing after a delay
  typingTimeoutRef.current = setTimeout(() => {
    ws.send(JSON.stringify({ type: "stop_typing", chatId, userId, userName }));
  }, 1500); // Send stop_typing after 1.5 seconds of inactivity
};

export default function Chat() {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chatId, setChatId] = useState("");
  const [userName, setUserName] = useState("");
  const [userId] = useState(() => Math.random().toString(36).substr(2, 9));
  const [connected, setConnected] = useState(false);
  const [joined, setJoined] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState({}); // { userId: {userName, timer} }
  const typingTimeoutRef = useRef(null);
  const fileRef = useRef();
  const messagesEndRef = useRef();
  const observerRef = useRef(null); // Ref for IntersectionObserver
  const [copiedMessage, setCopiedMessage] = useState("");

  const markMessageAsRead = useCallback((messageId) => {
    if (ws && ws.readyState === WebSocket.OPEN && chatId) {
      ws.send(JSON.stringify({ type: "message_read", chatId, messageId }));
    }
  }, [ws, chatId]);

  const messagesRef = useRef([]);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const markMessageAsReadRef = useRef(markMessageAsRead);
  useEffect(() => {
    markMessageAsReadRef.current = markMessageAsRead;
  }, [markMessageAsRead]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingUsers]);

  useEffect(() => {
    if (!joined || !userId) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const messageId = entry.target.dataset.messageId;
            const msg = messagesRef.current.find((m) => m.id === messageId);

            if (msg && msg.userId !== userId && msg.readStatus !== 'seen') {
              markMessageAsReadRef.current(messageId);
            }
          }
        });
      },
      { threshold: 0.8 }
    );

    observerRef.current = observer;

    messagesRef.current.forEach((msg) => {
      const element = document.getElementById(`message-${msg.id}`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [joined, userId, messages]);

  useEffect(() => {
    let currentWs = null;

    if (joined && chatId && userName) {
      // Determine WebSocket URL based on environment
      const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${wsProtocol}//${window.location.hostname}:${
        process.env.NEXT_PUBLIC_WS_PORT || 3001
      }?chatId=${chatId}&userId=${userId}&userName=${userName}`;

      currentWs = new WebSocket(wsUrl);

      currentWs.onopen = () => {
        console.log("WebSocket connected!");
        setConnected(true);
      };

      currentWs.onmessage = (event) => {
        const message = JSON.parse(event.data);

        switch (message.type) {
          case "text":
          case "image":
            setMessages((prev) => {
              const updated = [...prev, { ...message, uniqueId: message.id, readStatus: 'sent' }];
              saveMessages(chatId, updated);
              return updated;
            });
            break;
          case "userList":
            setOnlineUsers(message.users);
            break;
          case "typing":
            if (message.userId !== userId) {
              setTypingUsers((prev) => ({
                ...prev,
                [message.userId]: { userName: message.userName, timer: Date.now() },
              }));
            }
            break;
          case "stop_typing":
            setTypingUsers((prev) => {
              const newState = { ...prev };
              delete newState[message.userId];
              return newState;
            });
            break;
          case "message_read":
            setMessages((prevMessages) =>
              prevMessages.map((msg) =>
                msg.id === message.messageId && msg.readStatus === 'sent'
                  ? { ...msg, readStatus: "read" }
                  : msg
              )
            );
            break;
          case "message_seen_by_all":
            console.log("Message seen by all received for messageId:", message.messageId);
            setMessages((prevMessages) =>
              prevMessages.map((msg) =>
                msg.id === message.messageId ? { ...msg, readStatus: "seen" } : msg
              )
            );
            break;
          default:
            console.log("Unknown message type:", message.type);
        }
      };

      currentWs.onclose = () => {
        console.log("WebSocket disconnected.");
        setConnected(false);
        setWs(null);
      };

      currentWs.onerror = (error) => {
        console.error("WebSocket error:", error);
        setConnected(false);
      };

      setWs(currentWs); // Set the ws state here

    } else if (ws) { // If not joined and ws exists, close it.
      ws.close();
      setWs(null);
    }

    return () => {
      if (currentWs && currentWs.readyState === WebSocket.OPEN) {
        currentWs.close();
      }
    };
  }, [joined, chatId, userName, userId]);

  useEffect(() => {
    const savedChatId = localStorage.getItem("current-chat-id");
    const savedUserName = localStorage.getItem("current-user-name");
    const chatExpires = localStorage.getItem("chat-expires");

    if (
      savedChatId &&
      savedUserName &&
      chatExpires &&
      Date.now() < parseInt(chatExpires)
    ) {
      setChatId(savedChatId);
      setUserName(savedUserName);
      setJoined(true);
    }
  }, []);

  const createChat = () => {
    if (!userName.trim()) return alert("Enter your name first");
    const id = Math.random().toString(36).substr(2, 9);
    setChatId(id);
    setJoined(true);
    localStorage.setItem("chat-expires", Date.now() + 2 * 24 * 60 * 60 * 1000);
    localStorage.setItem("current-chat-id", id);
    localStorage.setItem("current-user-name", userName);
  };

  const joinChat = () => {
    if (!chatId || !userName.trim())
      return alert("Enter chat ID and your name");
    setJoined(true);
    localStorage.setItem("current-chat-id", chatId);
    localStorage.setItem("current-user-name", userName);
  };

  const sendMessage = () => {
    if (!message.trim() || !ws || ws.readyState !== WebSocket.OPEN) return;

    const msg = {
      id: `${Date.now()}-${Math.random()}`,
      userId,
      userName,
      text: message,
      timestamp: new Date().toISOString(),
      type: "text",
    };

    ws.send(JSON.stringify(msg));
    setMessages((prev) => {
      const updated = [...prev, { ...msg, uniqueId: msg.id, readStatus: 'sent' }];
      saveMessages(chatId, updated);
      return updated;
    });
    setMessage("");
  };

  const compressImage = (file, callback) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      const maxWidth = 300;
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      callback(canvas.toDataURL("image/jpeg", 0.7));
    };

    const reader = new FileReader();
    reader.onload = (e) => (img.src = e.target.result);
    reader.readAsDataURL(file);
  };

  const sendImage = (e) => {
    const file = e.target.files[0];
    if (!file || !ws || ws.readyState !== WebSocket.OPEN) return;

    compressImage(file, (compressedImage) => {
      const msg = {
        id: `${Date.now()}-${Math.random()}`,
        userId,
        userName,
        image: compressedImage,
        timestamp: new Date().toISOString(),
        type: "image",
      };

      ws.send(JSON.stringify(msg));
      setMessages((prev) => {
        const updated = [...prev, { ...msg, uniqueId: msg.id, readStatus: 'sent' }];
        saveMessages(chatId, updated);
        return updated;
      });
    });
  };

  const terminateChat = () => {
    if (ws) {
      ws.send(JSON.stringify({ type: "leave", userId, userName }));
      ws.close();
    }

    setMessages([]);
    setChatId("");
    setJoined(false);
    setConnected(false);
    localStorage.removeItem(`chat-messages-${chatId}`);
    localStorage.removeItem("chat-expires");
    localStorage.removeItem("current-chat-id");
    localStorage.removeItem("current-user-name");
  };

  const handleCopyChatId = async () => {
    if (chatId) {
      try {
        await navigator.clipboard.writeText(chatId);
        setCopiedMessage("Copied!");
        setTimeout(() => setCopiedMessage(""), 2000); // Clear message after 2 seconds
      } catch (err) {
        console.error("Failed to copy Chat ID: ", err);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col align-center justify-center p-4 w-full mx-auto">
      {!joined ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white/80 dark:bg-[#18191d]/80 backdrop-blur-sm shadow-md rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 w-96">
            <h1 className="text-2xl font-bold mb-6 text-center text-[#a65fa8]">
              Anonymous Chat
            </h1>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="my-2 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#a65fa8] focus:border-[#a65fa8] text-gray-900 dark:text-white"
            />
            <input
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              placeholder="Enter Chat ID to join"
              className="my-4 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#a65fa8] focus:border-[#a65fa8] text-gray-900 dark:text-white"
            />
            <div className="flex gap-3">
              <button
                onClick={createChat}
                className="flex-1 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 py-3  font-medium"
              >
                Create New Chat
              </button>
              <button
                onClick={joinChat}
                className="flex-1 bg-gradient-to-r from-[#a65fa8] to-purple-600 hover:from-purple-600 hover:to-[#a65fa8] transition-all duration-300 transform hover:scale-105 text-white py-3 rounded-lg font-medium"
              >
                Join Chat
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white/80 dark:bg-[#18191d]/80 backdrop-blur-sm shadow-md text-gray-900 dark:text-white p-4 flex justify-between items-center mx-auto w-full max-w-[769px]">
            <div>
              <h2 className="font-semibold capitalize text-gray-900 dark:text-white">
                {userName}
              </h2>
              <p className="text-sm opacity-90 text-gray-900 dark:text-white flex items-center">
                Chat ID: {chatId}
                <button onClick={handleCopyChatId} className="ml-2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a65fa8]">
                  📋
                </button>
                {copiedMessage && <span className="ml-2 text-xs text-green-500">{copiedMessage}</span>}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm">Online: {onlineUsers.length}</div>
                <div className="text-xs opacity-75 capitalize">
                  {onlineUsers.map((user) => user.userName).join(", ")}
                </div>
              </div>
              <button
                onClick={terminateChat}
                className="bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800 px-3 py-1 rounded text-sm"
              >
                End Chat
              </button>
            </div>
          </div>

          <div className="h-screen flex-1 overflow-y-auto p-4 h-full bg-white/80 dark:bg-[#18191d]/80 backdrop-blur-sm shadow-md p-6 shadow-lg border-t border-gray-200 dark:border-gray-700 mx-auto w-full max-w-[769px]">
            {messages.map((msg) => (
              <div
                key={msg.uniqueId}
                id={`message-${msg.id}`} // Add unique ID for IntersectionObserver
                data-message-id={msg.id} // Add data attribute for IntersectionObserver
                className={`mb-4 flex ${msg.userId === userId ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md ${
                    msg.userId === userId
                      ? "bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-[#a65fa8]/30 transition-all duration-300 hover:shadow-lg"
                      : "bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-[#a65fa8]/30 transition-all duration-300 hover:shadow-lg text-gray-800 dark:text-white"
                  } p-3 shadow`}
                >
                  {msg.userId !== userId && (
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-xs font-semibold text-[#a65fa8]">
                        {msg.userName}
                      </div>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          onlineUsers.some((u) => u.userId === msg.userId)
                            ? "bg-green-400"
                            : "bg-gray-400"
                        }`}
                      ></div>
                    </div>
                  )}
                  {msg.type === "image" ? (
                    <img
                      src={msg.image}
                      alt="Shared"
                      className="max-w-full h-auto rounded"
                    />
                  ) : (
                    <div
                      className={
                        msg.userId === userId
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-900 dark:text-white"
                      }
                    >
                      {msg.text}
                    </div>
                  )}
                  <div
                    className={`flex items-center justify-end text-xs mt-2 ${msg.userId === userId ? "text-green-700 dark:text-green-100" : "text-gray-500"}`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {msg.userId === userId && msg.readStatus && (
                      <span className="ml-1">
                        {msg.readStatus === 'sent' && '✔'}
                        {msg.readStatus === 'read' && <span className="text-blue-500">✔</span>}
                        {msg.readStatus === 'seen' && <span className="text-blue-500">✔✔</span>}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="bg-white/80 dark:bg-[#18191d]/80 backdrop-blur-sm shadow-md border-t border-gray-200 dark:border-gray-700 p-4 mx-auto w-full max-w-[769px]">
            {getTypingMessage(typingUsers) && (
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {getTypingMessage(typingUsers)}
              </div>
            )}
            <div className="flex gap-2 items-center">
              <input
                type="file"
                accept="image/*"
                onChange={sendImage}
                ref={fileRef}
                className="hidden"
              />
              <button
                onClick={() => fileRef.current?.click()}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                📎
              </button>
              <input
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  handleTyping(ws, chatId, userId, userName, typingTimeoutRef);
                }}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="my-2 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#a65fa8] focus:border-[#a65fa8] text-gray-900 dark:text-white"
              />
              <button
                onClick={sendMessage}
                className="text-white bg-gradient-to-r from-[#a65fa8] to-purple-600 hover:from-purple-600 hover:to-[#a65fa8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a65fa8] transition-colors p-2 rounded-full w-10 h-10 flex items-center justify-center"
              >
                ➤
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}