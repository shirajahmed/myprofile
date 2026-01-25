// app/api/micro-challenges/route.js
import { NextResponse } from "next/server";
import { readSheet } from "../../utils/googleSheetsServer"; // Import the generic readSheet

export async function GET() {
  try {
    const values = await readSheet("Sheet2", "A:C"); // Assuming Sheet2 for challenges, columns A: Question, B: Answer, C: Explanation

    if (!values || values.length < 2) { // Need at least header + 1 challenge
      return NextResponse.json(
        { error: "No micro challenges found or sheet is empty." },
        { status: 404 },
      );
    }

    // Assuming the first row is headers, skip it
    const challenges = values.slice(1).map(row => ({
      question: row[0] || "",
      answer: row[1] || "No answer provided.",
      explanation: row[2] || "No explanation provided.",
    }));

    if (challenges.length === 0) {
      return NextResponse.json(
        { error: "No micro challenges found after parsing." },
        { status: 404 },
      );
    }

    // Select a random challenge
    const randomIndex = Math.floor(Math.random() * challenges.length);
    const randomChallenge = challenges[randomIndex];

    return NextResponse.json(randomChallenge, { status: 200 });
  } catch (error) {
    console.error(
      "Error fetching micro challenge from Google Sheet:",
      error.message,
      error.stack,
    );
    return NextResponse.json(
      { error: "Failed to fetch micro challenge.", details: error.message },
      { status: 500 },
    );
  }
}
