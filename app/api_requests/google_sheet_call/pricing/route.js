const { google } = require("googleapis");
const getGoogleSheetsClient = require("./modules/sheetsClient")
const doesSheetExist = require("./modules/doesSheetExist")
const getRequestsObject = require("./modules/getSheetSchema")
const getPricingSheet = require("./modules/getPricing")
const writePricingSheet = require("./modules/writePricing")
const clonePricingSheet = require("./modules/cloneSheet")

// Dev Acces at
// http://localhost:3000/configurator/api_requests/google_sheet_call/pricing

export async function POST(configObjectRAW) {
  try {
    const configObject = await configObjectRAW.json();

    // Load Sheet Id
    const pricingSheetID = process.env.MASTER_QUOTE_SHEET_ID;

    // Initialize Google Sheets Client
    const googleSheets = getGoogleSheetsClient();

    // Clone the sheet
    let clonedSheet;
    try {
      clonedSheet = await clonePricingSheet(googleSheets, configObject ,pricingSheetID);
    } catch (cloneError) {
      console.error('Error cloning pricing sheet:', cloneError);
      throw new Error('Failed to clone pricing sheet');
    }

    // Insert Sheet ID and Name from the above const into Supabase
    // [Implement code for inserting into Supabase]

    // Transform Config object into sheets batch request
    const batchUpdateRequest = getRequestsObject(configObject.Configuration, pricingSheetID, clonedSheet);

    // Write Configuration values into the sheet
    let sheetWriteRequest;
    try {
      sheetWriteRequest = await writePricingSheet(googleSheets, batchUpdateRequest);
    } catch (writeError) {
      console.error('Error writing to pricing sheet:', writeError);
      throw new Error('Failed to write to pricing sheet');
    }

    // Implement checking if fetched successfully and returns 200 status then continue
    if (sheetWriteRequest.status !== 200) {
      throw new Error(`Failed to write to pricing sheet. Status: ${sheetWriteRequest.status}`);
    }

    // Read Sheet and get Pricing Data
    let pricingSheet;
    try {
      pricingSheet = await getPricingSheet(googleSheets, pricingSheetID, clonedSheet.sheetName);
    } catch (readError) {
      console.error('Error reading pricing sheet:', readError);
      throw new Error('Failed to read pricing sheet');
    }

    // Transform Pricing Data values
    let pannelPriceRAW = pricingSheet[14][1];
    const price = {
      pannel: parseFloat(pannelPriceRAW.replace(/[$,]/g, '')),
      breakers: parseFloat(pricingSheet[28][1]),
    };

    price.total = price.pannel + price.breakers;
    let respo = JSON.stringify(price);

    return new Response(respo);
  } catch (error) {
    console.error('Unhandled error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}