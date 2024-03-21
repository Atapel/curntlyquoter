const { google } = require("googleapis");
const getGoogleSheetsClient = require("../../sheetsClient")
// const doesSheetExist = require("../modules/doesSheetExist")


// Dev Acces at
// http://localhost:3000/configurator/api_requests/google_sheet_call/pricing

export async function POST(sheetNameRaw: any) {
        
    
        const sheetName: string = await sheetNameRaw.json()

        // Initialize Google Sheets Client
        const googleSheets = getGoogleSheetsClient();
        // Load Sheet Id
        const templateSheetID : string = process.env.MASTER_QUOTE_SHEET_ID;
      
        const getSheetId = async (sheetName: string, spreadsheetId: string) => {
          try {
            const response = await googleSheets.spreadsheets.get({
              spreadsheetId,
              fields: 'sheets.properties'
            });
      
            const sheets = response.data.sheets;
      
            for (const sheet of sheets) {
              if (sheet.properties.title === sheetName) {
                return sheet.properties.sheetId;
              }
            }
            
            throw new Error(`Sheet '${sheetName}' not found in the spreadsheet.`);
          } catch (error) {
            console.error('Error retrieving sheet ID:', error);
            throw error; // Throw the error to handle it elsewhere
          }
        };
      
        const deleteSheet = async (sheetId: number, spreadsheetId: string) => {
          try {
            await googleSheets.spreadsheets.batchUpdate({
              spreadsheetId,
              requestBody: {
                requests: [
                  {
                    deleteSheet: {
                      sheetId // Provide the sheetId you want to delete
                    }
                  }
                ]
              }
            });
            return 0; // Return success code if deletion is successful
          } catch (error) {
            console.error('Error deleting sheet:', error);
            throw error; // Throw the error to handle it elsewhere
          }
        };
        
      
        const sheetId = await getSheetId(sheetName, templateSheetID);
        await deleteSheet(sheetId, templateSheetID);
    
    return new Response('Successfully deleted sub sheet');
}