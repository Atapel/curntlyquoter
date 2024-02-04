const { google } = require("googleapis");
const getGoogleSheetsClient = require("./modules/sheetsClient")
const getRequestsObject = require("./modules/getSheetSchema")
const getPricingSheet = require("./modules/getPricing")
const writePricingSheet = require("./modules/writePricing")

// Dev Acces at
// http://localhost:3000/configurator/api_requests/google_sheet_call/pricing
// export async function GET() {
export async function POST(configObjectRAW) {
  const intermediate = await configObjectRAW.json()
  const configObject = intermediate.Configuration
  // Load Sheet Id
  const pricingSheetID = process.env.MASTER_QUOTE_SHEET_ID

  // Transform Config object into sheets batch request  
  const batchUpdateRequest = getRequestsObject(configObject, pricingSheetID)
  // Inspect if all values written

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
  let respo = JSON.stringify(price)
  return new Response(
    respo
  );
}
