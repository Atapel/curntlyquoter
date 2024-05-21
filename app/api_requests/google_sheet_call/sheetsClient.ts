// const { google } = require("googleapis");
import {
  google,
  Auth,
  sheets_v4
} from "googleapis"

const getGoogleSheetsClient = (): sheets_v4.Sheets => {
  try {
    const auth: Auth.GoogleAuth = new google.auth.GoogleAuth({
      credentials: {
        type: "service_account",
        project_id: process.env.GOOGLE_SHEETS_PROJECT_ID,
        private_key_id: process.env.GOOGLE_SHEETS_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_SHEETS_CLIENT_ID,
        // auth_uri: "https://accounts.google.com/o/oauth2/auth",
        // token_uri: "https://oauth2.googleapis.com/token",
        // auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        // client_x509_cert_url: process.env.GOOGLE_SHEETS_CLIENT_x509_CERT_URL,
        universe_domain: "googleapis.com"
      },
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    // Instance of Google Sheets API
    const googleSheets: sheets_v4.Sheets = google.sheets({ version: "v4", auth });
    
    return googleSheets;
  } catch (error) {
    console.error("Error initializing Google Sheets client:", error);
    console.log('ProessENV log::::',
      {
        project_id: process.env.GOOGLE_SHEETS_PROJECT_ID,
        private_key_id: process.env.GOOGLE_SHEETS_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_SHEETS_CLIENT_ID,
        client_x509_cert_url: process.env.GOOGLE_SHEETS_CLIENT_x509_CERT_URL
      }
      );
    throw error; // Re-throw the error to propagate it to the calling code
  }
};

export default getGoogleSheetsClient;
