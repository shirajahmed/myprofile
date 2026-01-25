const API_KEY = process.env.AI_CHAT_GOOGLE_SHEETS_API_KEY;
const SHEET_ID = process.env.AI_CHAT_GOOGLE_SHEET_ID;

export async function searchAnswers() {
  try {
    // If no API key or sheet ID, return fallback data
    if (!API_KEY || !SHEET_ID) {
      console.warn(
        "Google Sheets API key or Sheet ID not configured, using fallback data",
      );
      return getFallbackData();
    }

    const range = "Sheet1!A:B"; // Adjust range as needed
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.values || data.values.length === 0) {
      return getFallbackData();
    }

    // Skip the header row and convert to question-answer format
    const rows = data.values.slice(1);
    const knowledgeBase = rows
      .map((row, index) => ({
        id: index + 1,
        question: row[0] || "",
        answer: row[1] || "No answer provided",
      }))
      .filter((item) => item.question.trim() !== "");

    return knowledgeBase;
  } catch (error) {
    console.error("Error fetching from Google Sheets:", error);
    return getFallbackData();
  }
}

function getFallbackData() {
  return [
    {
      id: 1,
      question: "What is your name?",
      answer:
        "I'm Shiraj's AI chatbot assistant! I'm here to help you with any questions you might have.",
    },
    {
      id: 2,
      question: "Who is Shiraj?",
      answer:
        "Shiraj is a talented frontend engineer who built this amazing voice chatbot. He specializes in React, Next.js, and modern web technologies.",
    },
    {
      id: 3,
      question: "What can you do?",
      answer:
        "I can chat with you using both text and voice! I get my knowledge from Google Sheets, so I can answer questions about various topics. Try asking me something!",
    },
    {
      id: 4,
      question: "How are you?",
      answer:
        "I'm doing fantastic! Thanks for asking. I'm always ready to help and chat. How are you doing today?",
    },
    {
      id: 5,
      question: "What technologies do you use?",
      answer:
        "I'm built with Next.js, React, Tailwind CSS, and use Google Sheets API for my knowledge base. I also use the Web Speech API for voice features!",
    },
    {
      id: 6,
      question: "Can you help me?",
      answer:
        "Absolutely! I'm here to help you with any questions or information you need. What would you like to know about?",
    },
    {
      id: 7,
      question: "What is AI?",
      answer:
        "AI (Artificial Intelligence) refers to computer systems that can perform tasks that typically require human intelligence, like understanding language, recognizing patterns, and making decisions.",
    },
    {
      id: 8,
      question: "Tell me about web development",
      answer:
        "Web development involves creating websites and web applications using technologies like HTML, CSS, JavaScript, and frameworks like React, Next.js, Vue, or Angular.",
    },
    {
      id: 9,
      question: "What is React?",
      answer:
        "React is a popular JavaScript library for building user interfaces, especially for web applications. It was created by Facebook and allows developers to create reusable UI components.",
    },
    {
      id: 10,
      question: "What is Next.js?",
      answer:
        "Next.js is a React framework that provides features like server-side rendering, static site generation, and API routes. It's great for building fast, SEO-friendly web applications.",
    },
  ];
}

// Helper function to add new knowledge to the sheet (if needed)
export async function addKnowledge(question, answer) {
  try {
    if (!API_KEY || !SHEET_ID) {
      throw new Error("Google Sheets API not configured");
    }

    const range = "Sheet1!A:B";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}:append?key=${API_KEY}&valueInputOption=RAW`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [[question, answer]],
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add knowledge: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding knowledge:", error);
    throw error;
  }
}
