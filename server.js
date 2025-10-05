const WebSocket = require('ws');
const url = require('url');
const http = require('http');

const PORT = process.env.PORT || 3001;
const server = http.createServer();
const wss = new WebSocket.Server({ server });
const chats = new Map();

const broadcastUserList = (chatId) => {
  const chatUsers = chats.get(chatId);
  if (!chatUsers || chatUsers.size === 0) {
    console.log(`No users in chat ${chatId}`);
    return;
  }
  
  const userList = Array.from(chatUsers)
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
  chatUsers.forEach(client => {
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
    chats.set(chatId, new Set());
    console.log(`Created new chat room: ${chatId}`);
  }
  
  chats.get(chatId).add(ws);
  ws.chatId = chatId;
  ws.userId = userId;
  ws.userName = userName;
  
  console.log(`Total users in chat ${chatId}: ${chats.get(chatId).size}`);
  
  // Send user list multiple times to ensure delivery
  broadcastUserList(chatId);
  setTimeout(() => broadcastUserList(chatId), 100);
  setTimeout(() => broadcastUserList(chatId), 500);
  
  ws.on('message', (data) => {
    const message = JSON.parse(data);
    console.log(`Message from ${userName}: ${message.type === 'text' ? message.text : message.type}`);
    
    if (message.type !== 'userList') {
      chats.get(chatId)?.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      });
    }
  });
  
  ws.on('close', () => {
    console.log(`\n=== USER LEFT ===`);
    console.log(`User ${userName} left chat ${chatId}`);
    
    chats.get(chatId)?.delete(ws);
    const remainingUsers = chats.get(chatId)?.size || 0;
    
    if (remainingUsers === 0) {
      chats.delete(chatId);
      console.log(`Deleted empty chat room: ${chatId}`);
    } else {
      console.log(`${remainingUsers} users remaining in chat ${chatId}`);
      broadcastUserList(chatId);
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
