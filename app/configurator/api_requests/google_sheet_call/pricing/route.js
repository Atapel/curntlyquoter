const { google } = require("googleapis");
// Dev Acces at
// http://localhost:3000/configurator/api_requests/google_sheet_call/pricing
export async function GET() {

  const spreadsheetId = process.env.MASTER_QUOTE_SHEET_ID;
  const range = "A1:A5"; // Change this to the range you want to retrieve
  const credentialsFilePath = "app/configurator/api_requests/google_sheet_call/credentials.json"

  const auth = new google.auth.GoogleAuth({
    keyFile: credentialsFilePath,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth });
  let values;
  try {
    // Make the API request to retrieve data
    const response = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    values = response.data.values;

    if (values.length) {
      console.log("Data from the spreadsheet:");
      values.forEach((row) => {
        console.log(row.join("\t"));
      });
      // return values

    } else {
      console.log("No data found.");
    }
  } catch (error) {
    console.error("Error retrieving data:", error.message);
  }
  return new Response(values);
}
