// app/api/daily-fact/route.js
import { NextResponse } from "next/server";
import { readSheet } from "../../utils/googleSheetsServer"; // Import the generic readSheet

export async function GET() {
  try {
    const values = await readSheet("Sheet3", "A:A"); // Assuming Sheet3 for daily facts/memes, column A

    if (!values || values.length < 2) { // Need at least header + 1 fact/meme
      return NextResponse.json(
        { error: "No daily facts/memes found or sheet is empty." },
        { status: 404 },
      );
    }

    // Assuming the first row is headers, skip it
    const facts = values.slice(1).map(row => row[0]).filter(fact => fact); // Filter out empty strings

    if (facts.length === 0) {
      return NextResponse.json(
        { error: "No daily facts/memes found after parsing." },
        { status: 404 },
      );
    }

    // Pick one based on the current date for "daily" change
    const today = new Date();
    const day = today.getDate(); // 1-31
    const dailyFact = facts[day % facts.length]; // Cycle through facts based on day

    return NextResponse.json({ fact: dailyFact }, { status: 200 });
  } catch (error) {
    console.error(
      "Error fetching daily fact/meme from Google Sheet:",
      error.message,
      error.stack,
    );
    return NextResponse.json(
      { error: "Failed to fetch daily fact/meme.", details: error.message },
      { status: 500 },
    );
  }
}
