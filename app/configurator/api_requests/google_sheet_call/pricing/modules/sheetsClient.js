const { google } = require("googleapis");
const getGoogleSheetsClient = () => {
    const credentialsFilePath = "credentials.json"

    const auth = new google.auth.GoogleAuth({
        keyFile: credentialsFilePath,
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth });
    return googleSheets
}

module.exports = getGoogleSheetsClient;