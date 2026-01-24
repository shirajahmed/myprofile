"use client";


import { useState, useEffect, useRef } from "react";

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
  const [polling, setPolling] = useState(null);
  const fileRef = useRef();
  const messagesEndRef = useRef();

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

  useEffect(() => {
    if (chatId) {
      const savedMessages = localStorage.getItem(`chat-messages-${chatId}`);
      if (savedMessages) setMessages(JSON.parse(savedMessages));
    }
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      connectWs(savedChatId);
    }
  }, []);

  const createChat = () => {
    if (!userName.trim()) return alert("Enter your name first");
    const id = Math.random().toString(36).substr(2, 9);
    setChatId(id);
    connectWs(id);
    setJoined(true);
    localStorage.setItem("chat-expires", Date.now() + 2 * 24 * 60 * 60 * 1000);
    localStorage.setItem("current-chat-id", id);
    localStorage.setItem("current-user-name", userName);
  };

  const joinChat = () => {
    if (!chatId || !userName.trim())
      return alert("Enter chat ID and your name");
    connectWs(chatId);
    setJoined(true);
    localStorage.setItem("current-chat-id", chatId);
    localStorage.setItem("current-user-name", userName);
  };

  const connectWs = async (id) => {
    setConnected(true);

    // Join the chat
    await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatId: id,
        userId,
        userName,
        message: { type: "join" },
      }),
    });

    // Start polling for messages
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/chat?chatId=${id}`);
        const data = await response.json();

        setMessages((prev) => {
          const newMessages = data.messages
            .filter((msg) => !prev.some((p) => p.id === msg.id))
            .map((msg) => ({ ...msg, uniqueId: `${msg.id}-${msg.userId}` }));

          if (newMessages.length > 0) {
            const updated = [...prev, ...newMessages];
            saveMessages(id, updated);
            return updated;
          }
          return prev;
        });

        setOnlineUsers(data.users);
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 1000);

    setPolling(interval);
  };

  const sendMessage = async () => {
    if (!message.trim() || !connected) return;

    const msg = {
      id: `${Date.now()}-${Math.random()}`,
      userId,
      userName,
      text: message,
      timestamp: new Date().toISOString(),
      type: "text",
    };

    await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatId,
        userId,
        userName,
        message: msg,
      }),
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
    if (!file || !connected) return;

    compressImage(file, async (compressedImage) => {
      const msg = {
        id: `${Date.now()}-${Math.random()}`,
        userId,
        userName,
        image: compressedImage,
        timestamp: new Date().toISOString(),
        type: "image",
      };

      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId,
          userId,
          userName,
          message: msg,
        }),
      });
    });
  };

  const terminateChat = async () => {
    if (polling) {
      clearInterval(polling);
      setPolling(null);
    }

    // Leave the chat
    await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatId,
        userId,
        userName,
        message: { type: "leave" },
      }),
    });

    setMessages([]);
    setChatId("");
    setJoined(false);
    setConnected(false);
    localStorage.removeItem(`chat-messages-${chatId}`);
    localStorage.removeItem("chat-expires");
    localStorage.removeItem("current-chat-id");
    localStorage.removeItem("current-user-name");
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {!joined ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h1 className="text-2xl font-bold mb-6 text-center text-green-600">
              Anonymous Chat
            </h1>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg mb-4 focus:outline-none focus:border-green-500"
            />
            <input
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              placeholder="Enter Chat ID to join"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg mb-4 focus:outline-none focus:border-green-500"
            />
            <div className="flex gap-3">
              <button
                onClick={createChat}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium"
              >
                Create New Chat
              </button>
              <button
                onClick={joinChat}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium"
              >
                Join Chat
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-green-600 text-white p-4 flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{userName}</h2>
              <p className="text-sm opacity-90">Chat ID: {chatId}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm">Online: {onlineUsers.length}</div>
                <div className="text-xs opacity-75">
                  {onlineUsers.map((user) => user.userName).join(", ")}
                </div>
              </div>
              <button
                onClick={terminateChat}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
              >
                End Chat
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.uniqueId}
                className={`mb-4 flex ${msg.userId === userId ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md ${
                    msg.userId === userId
                      ? "bg-green-500 text-white rounded-l-lg rounded-tr-lg"
                      : "bg-white border rounded-r-lg rounded-tl-lg text-gray-800"
                  } p-3 shadow`}
                >
                  {msg.userId !== userId && (
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-xs font-semibold text-green-600">
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
                        msg.userId === userId ? "text-white" : "text-gray-800"
                      }
                    >
                      {msg.text}
                    </div>
                  )}
                  <div
                    className={`text-xs mt-2 ${msg.userId === userId ? "text-green-100" : "text-gray-500"}`}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="bg-white border-t p-4">
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
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:border-green-500"
              />
              <button
                onClick={sendMessage}
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center"
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
