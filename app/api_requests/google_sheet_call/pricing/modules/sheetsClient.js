const { google } = require("googleapis");
const getGoogleSheetsClient = () => {
    // const credentialsFilePath = "credentials.json"
    const credentialsFilePath = process.env.GOOGLE_SHEETS_CREDENTIALS_FILE_PATH

    const auth = new google.auth.GoogleAuth({
        keyFile: credentialsFilePath,
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth });
    return googleSheets
}

module.exports = getGoogleSheetsClient;