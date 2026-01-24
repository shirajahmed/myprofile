import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, email, subject, message } = await request.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 },
    );
  }

  try {
    // Authenticate with Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Handle private key newlines
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Append data to the Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID_CONTACT_FORM,
      range: "Sheet1!A:E", // Assuming A: Name, B: Email, C: Subject, D: Message, E: Timestamp
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, email, subject, message, new Date().toISOString()]],
      },
    });

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "Error appending to Google Sheet:",
      error.message,
      error.stack,
    ); // More detailed logging
    return NextResponse.json(
      { error: "Failed to send message.", details: error.message },
      { status: 500 },
    ); // Return more details to frontend
  }
}
