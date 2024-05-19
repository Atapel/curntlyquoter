// Dev Acces at
// http://localhost:3000/configurator/api_requests/google_sheet_call/pricing
import {
    sheets_v4
  } from "googleapis"
export const readSheet = async (
    clienObject: sheets_v4.Sheets, 
    spreadsheetId: string, 
    sheetName: string
) => {
    const range = `${sheetName}`; // Change this to the range you want to retrieve
    let values: Array<Array<string>>;

    try {
        // Make the API request to retrieve data
        const response = await clienObject.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        values = response.data.values;
    } catch (error) {
        console.error("Error retrieving data:", error.message);
        throw new Error("Failed to retrieve data");
    }
    return values
}