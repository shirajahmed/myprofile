const WebSocket = require('ws');
const url = require('url');
const http = require('http');

const PORT = process.env.PORT || 3001;
const server = http.createServer();
const wss = new WebSocket.Server({ server });
const chats = new Map();

const broadcastUserList = (chatId) => {
  const chatData = chats.get(chatId);
  if (!chatData || chatData.users.size === 0) {
    console.log(`No users in chat ${chatId}`);
    return;
  }
  
  const userList = Array.from(chatData.users)
    .filter(ws => ws.readyState === WebSocket.OPEN)
    .map(ws => ({
      userId: ws.userId,
      userName: ws.userName
    }));
  
  console.log(`Chat ${chatId} has ${userList.length} users:`, userList.map(u => u.userName));
  
  const message = JSON.stringify({
    type: 'userList',
    users: userList
  });
  
  let sentCount = 0;
  chatData.users.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
      sentCount++;
    }
  });
  
  console.log(`Sent user list to ${sentCount} clients`);
};

wss.on('connection', (ws, req) => {
  const { chatId, userId, userName } = url.parse(req.url, true).query;
  
  console.log(`\n=== NEW CONNECTION ===`);
  console.log(`User: ${userName} (${userId})`);
  console.log(`Chat: ${chatId}`);
  
  if (!chats.has(chatId)) {
    chats.set(chatId, { 
      users: new Set(), 
      messages: new Map() // Map<messageId, { messageData, readBy: Set<userId> }>
    });
    console.log(`Created new chat room: ${chatId}`);
  }
  
  chats.get(chatId).users.add(ws);
  ws.chatId = chatId;
  ws.userId = userId;
  ws.userName = userName;
  
  console.log(`Total users in chat ${chatId}: ${chats.get(chatId).users.size}`);
  
  // Send user list once upon connection
  broadcastUserList(chatId);
  
  ws.on('message', (data) => {
    const message = JSON.parse(data);
    const chatData = chats.get(chatId);

    if (!chatData || !chatData.users.has(ws)) {
      console.log(`Received message from unauthenticated/unknown user in chat ${chatId}`);
      return;
    }

    console.log(`Message from ${userName} (${ws.userId}) in chat ${chatId}: ${message.type}`);
    
    switch (message.type) {
      case 'text':
      case 'image':
        const messageId = message.id; // Client-generated unique ID for the message
        const messageWithSender = { ...message, userId: ws.userId, userName: ws.userName };
        
        // Store message and initialize readBy with sender
        chatData.messages.set(messageId, {
          messageData: messageWithSender,
          readBy: new Set([ws.userId])
        });

        chatData.users.forEach(client => {
          if (client !== ws && client.readyState === WebSocket.OPEN) { // Broadcast to all EXCEPT sender
            client.send(JSON.stringify(messageWithSender));
          }
        });
        break;
      case 'typing':
      case 'stop_typing':
        chatData.users.forEach(client => {
          if (client !== ws && client.readyState === WebSocket.OPEN) { // Broadcast to all EXCEPT sender
            client.send(JSON.stringify({ type: message.type, userId: ws.userId, userName: ws.userName, chatId }));
          }
        });
        break;
      case 'message_read':
        const { messageId: readMessageId } = message;
        const storedMessage = chatData.messages.get(readMessageId);

        if (storedMessage && !storedMessage.readBy.has(ws.userId)) {
          storedMessage.readBy.add(ws.userId);
          console.log(`Message ${readMessageId} read by ${ws.userId}. Read by count: ${storedMessage.readBy.size}`);

          // Calculate distinct user IDs
          const distinctUserIds = new Set();
          chatData.users.forEach(client => distinctUserIds.add(client.userId));
          const distinctUserCount = distinctUserIds.size;

          console.log(`Read Receipt Debug: messageId: ${readMessageId}`);
          console.log(`  storedMessage.readBy.size: ${storedMessage.readBy.size}`);
          console.log(`  distinctUserCount: ${distinctUserCount}`);
          console.log(`  Comparison: ${storedMessage.readBy.size === distinctUserCount}`);

          // Check if all current distinct users have read the message
          if (storedMessage.readBy.size === distinctUserCount) {
            console.log(`Message ${readMessageId} seen by all in chat ${chatId}`);
            chatData.users.forEach(client => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'message_seen_by_all', messageId: readMessageId, chatId }));
              }
            });
          } else {
            // Optionally, broadcast "seen by some" if needed, but not in current spec
            // For now, only broadcast "seen by all"
          }
        }
        break;
      case 'leave':
        // This case is already handled by ws.on('close') mostly.
        // We'll ensure the user is removed from chatData.users in on('close')
        // No explicit action needed here beyond client-side state update.
        // The cleanup will happen on ws.on('close').
        break;
      default:
        console.log(`Unhandled message type: ${message.type}`);
    }
  });
  
  ws.on('close', () => {
    console.log(`\n=== USER LEFT ===`);
    console.log(`User ${userName} left chat ${chatId}`);
    
    const chatData = chats.get(chatId);
    if (chatData) {
      chatData.users.delete(ws);
      const remainingUsers = chatData.users.size || 0;
      
      if (remainingUsers === 0) {
        chats.delete(chatId);
        console.log(`Deleted empty chat room: ${chatId}`);
      } else {
        console.log(`${remainingUsers} users remaining in chat ${chatId}`);
        broadcastUserList(chatId);
      }
    }
  });
  
  ws.on('error', (error) => {
    console.log(`WebSocket error for ${userName}:`, error);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 WebSocket server running on port ${PORT}`);
  console.log('Waiting for connections...\n');
});
