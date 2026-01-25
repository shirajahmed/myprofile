// app/api/compliment-generator/route.js
import { NextResponse } from "next/server";
import { readSheet } from "../../utils/googleSheetsServer"; // Import the generic readSheet

export async function GET() {
  try {
    const values = await readSheet("Sheet4", "A:A"); // Assuming Sheet4 for compliments, column A

    if (!values || values.length < 2) { // Need at least header + 1 compliment
      return NextResponse.json(
        { error: "No compliments found or sheet is empty." },
        { status: 404 },
      );
    }

    // Assuming the first row is headers, skip it
    const compliments = values.slice(1).map(row => row[0]).filter(compliment => compliment); // Filter out empty strings

    if (compliments.length === 0) {
      return NextResponse.json(
        { error: "No compliments found after parsing." },
        { status: 404 },
      );
    }

    // Select a random compliment
    const randomIndex = Math.floor(Math.random() * compliments.length);
    const randomCompliment = compliments[randomIndex];

    return NextResponse.json({ compliment: randomCompliment }, { status: 200 });
  } catch (error) {
    console.error(
      "Error fetching compliment from Google Sheet:",
      error.message,
      error.stack,
    );
    return NextResponse.json(
      { error: "Failed to fetch compliment.", details: error.message },
      { status: 500 },
    );
  }
}
