import getGoogleSheetsClient from "../sheetsClient";
// Dev Acces at http://localhost:3000/configurator/api_requests/google_sheet_call/feedback
export async function POST(dataObject) {
  
  const body = await dataObject.json();

  const spreadsheetId = process.env.FEEDBACK_SHEET_ID;
  const range = "A:E"; // Change this to the range you want to write to

  console.log("Request_Payload: ",body, "spreadsheetId: ", spreadsheetId);
  
  // Initialize Google Sheets Client
  const googleSheets = getGoogleSheetsClient();
  
  let response;

  try {
    // Create values array from the plainDataObject
    const values = Object.values(body);

    // Make the API request to write data
    response = await googleSheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [values], // Wrap the values in an array
      },
    });

    console.log("Data written to the spreadsheet successfully:", response.statusText);
  } catch (error) {
    console.error("Error writing data to the spreadsheet:", error.message);
  }

  return new Response(response.statusText);
}
