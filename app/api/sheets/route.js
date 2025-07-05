import { NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
const SHEET_ID = process.env.GOOGLE_SHEET_ID;

export async function GET() {
  try {
    if (!API_KEY || !SHEET_ID) {
      return NextResponse.json(
        { error: "Google Sheets API not configured" },
        { status: 500 }
      );
    }

    const range = "Sheet1!A:B";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.values || data.values.length === 0) {
      return NextResponse.json({ data: [], message: "No data found" });
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

    return NextResponse.json({ data: knowledgeBase });
  } catch (error) {
    console.error("Error fetching from Google Sheets:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Google Sheets" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { question, answer } = await request.json();

    if (!API_KEY || !SHEET_ID) {
      return NextResponse.json(
        { error: "Google Sheets API not configured" },
        { status: 500 }
      );
    }

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Question and answer are required" },
        { status: 400 }
      );
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

    const result = await response.json();

    return NextResponse.json({
      success: true,
      message: "Knowledge added successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error adding knowledge:", error);
    return NextResponse.json(
      { error: "Failed to add knowledge to Google Sheets" },
      { status: 500 }
    );
  }
}
