// app/utils/googleSheetsServer.js
import { google } from "googleapis";

const getAuth = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"), // Handle private key newlines
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return await auth.getClient();
};

export const getGoogleSheets = async () => {
  const authClient = await getAuth();
  return google.sheets({ version: "v4", auth: authClient });
};

// Generic function to read data from a specified sheet and range
export async function readSheet(sheetName, range) {
  try {
    const sheets = await getGoogleSheets();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID_CONTACT_FORM, // Use NEXT_PUBLIC_GOOGLE_SHEET_ID for consistency
      range: `${sheetName}!${range}`,
    });
    console.log(
      `Successfully read from Google Sheet ${sheetName}:`,
      response.data.values,
    ); // Log success
    return response.data.values;
  } catch (error) {
    console.error(
      `Error reading from Google Sheet ${sheetName}:`,
      error.message,
    );
    if (error.response?.data?.error) {
      console.error("Google API error details:", error.response.data.error);
    }
    throw new Error(`Failed to read from Google Sheet ${sheetName}.`);
  }
}

// Generic function to append data to a specified sheet and range
export async function appendSheet(sheetName, range, values) {
  try {
    const sheets = await getGoogleSheets();
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID, // Use the same sheet ID
      range: `${sheetName}!${range}`,
      valueInputOption: "RAW",
      resource: {
        values: [values],
      },
    });
    console.log(
      `Successfully appended to Google Sheet ${sheetName}:`,
      response.data,
    ); // Log success
    return response.data;
  } catch (error) {
    console.error(
      `Error appending to Google Sheet ${sheetName}:`,
      error.message,
    );
    if (error.response?.data?.error) {
      console.error("Google API error details:", error.response.data.error);
    }
    throw new Error(`Failed to append to Google Sheet ${sheetName}.`);
  }
}
