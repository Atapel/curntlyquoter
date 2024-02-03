const { google } = require("googleapis");
const getGoogleSheetsClient = require("./modules/sheetsClient")
const getRequestsObject = require("./modules/getSheetSchema")
const getPricingSheet = require("./modules/getPricing")
const writePricingSheet = require("./modules/writePricing")

// Dev Acces at
// http://localhost:3000/configurator/api_requests/google_sheet_call/pricing
// export async function GET() {
export async function GET() {
  // Get Config Object
  let configObject = {
    "SelectedFrameSize": 36,
    "SelectedVoltage": "208Y/120V",
    "SelectedKAICRating": 65,
    "SelectedBusRating": "800A",
    "SeletedPanelHeight": 90,
    "FeedThruLugs": false,
    "MainLug": false,
    "SericeOrDistribution": "Service",
    "SelectedFeedPosition": "Select Feed Position",
    "SelectedBreakers": [
      {
        "Description": "UTS150",
        "Max_Amperage": 150,
        "BreakerSize": "Single",
        "Size": 4,
        "SVG_str": "<svg width=\"132\" height=\"22\" viewBox=\"0 0 132 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M67.9942 7.52307L68.0004 14.5097M69.0671 14.5088L69.8138 14.5081M70.8271 14.5072L70.8208 7.52053M59.4074 7.53079L80.2607 7.51205L80.267 14.4987L59.4137 14.5175L59.4074 7.53079ZM1.12585 20.7033L130.832 20.5867L130.815 1.33336L1.10855 1.44995L1.12585 20.7033Z\" stroke=\"black\" stroke-width=\"1.28\" stroke-miterlimit=\"10\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>"
      }
    ],
    "CurrentBreakersSize": 4,
    "MaxBreakerSize": 45
  }

  // Load Sheet Id

  // process.env.FEEDBACK_SHEET_ID
  // FeedbackSheet
  // const pricingSheetID = '1jYuxdy8_uFlbtAZTdcnZA-7DWOweSpreRuTQ1NL6CX8'
  // "1jIr6_Noj8-M_Y3LiKkZH_c0bmt8TuimrrGuaj4Zxsq4";

  const pricingSheetID = process.env.MASTER_QUOTE_SHEET_ID

  // Transform Config object into sheets batch request  
  const batchUpdateRequest = getRequestsObject(configObject, pricingSheetID)

  // Initialize Google Sheets Client
  const googleSheets = getGoogleSheetsClient()

  // Maybe clone the sheet or reset all values




  // Write Configuration values into the sheet
  let sheetWriteRequest = await writePricingSheet(googleSheets, batchUpdateRequest)

  // Implement checking if fetched successfull and returns 200 status then continiue

  // Read Sheet and get Pricing Data
  let pricingSheet = await getPricingSheet(googleSheets, pricingSheetID)

  // Transform Pricing Data values

  let pannelPriceRAW = pricingSheet[14][1]
  const price = {
    pannel: parseFloat(pannelPriceRAW.replace(/[$,]/g, '')),
    breakers: parseFloat(pricingSheet[28][1]),

  }

  price.total = price.pannel + price.breakers

  return new Response(
    pricingSheet,
    price
  );
}
