import { NextResponse } from 'next/server';

const chats = new Map();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get('chatId');
  
  if (!chats.has(chatId)) {
    return NextResponse.json({ messages: [], users: [] });
  }
  
  const chat = chats.get(chatId);
  return NextResponse.json({
    messages: chat.messages || [],
    users: Array.from(chat.users || [])
  });
}

export async function POST(request) {
  const { chatId, message, userId, userName } = await request.json();
  
  if (!chats.has(chatId)) {
    chats.set(chatId, { messages: [], users: new Set() });
    // Auto-delete after 2 days
    setTimeout(() => chats.delete(chatId), 2 * 24 * 60 * 60 * 1000);
  }
  
  const chat = chats.get(chatId);
  
  if (message.type === 'join') {
    chat.users.add({ userId, userName });
  } else if (message.type === 'leave') {
    chat.users = new Set(Array.from(chat.users).filter(u => u.userId !== userId));
  } else {
    chat.messages.push(message);
    // Keep only last 50 messages
    if (chat.messages.length > 50) {
      chat.messages = chat.messages.slice(-50);
    }
  }
  
  return NextResponse.json({ success: true });
}
