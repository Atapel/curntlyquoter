import getGoogleSheetsClient from "../sheetsClient";
import { writeBreakersPricing } from "./actions";
import { readSheet } from "./modules/getPricing";
import { getPricing } from "./modules/extractPricing";
import { TConfigurationState } from "@context/types";
import { TPricingApiResponse } from "@api_requests/types";
// Dev Acces at
// http://localhost:3000/configurator/api_requests/google_sheet_call/pricing
export async function POST(configObjectRAW) {
  try {
    const configObject: TConfigurationState = await configObjectRAW.json();
    console.log("configObject", configObject);

    // Load Sheet Id
    const templateSheetID: string = process.env.MASTER_QUOTE_SHEET_ID;

    // Initialize Google Sheets Client
    const googleSheets = getGoogleSheetsClient();

    await writeBreakersPricing(configObject);

    // Read Sheet and get Pricing Data
    let pricingSheet;
    try {
      pricingSheet = await readSheet(
        googleSheets,
        templateSheetID,
        configObject.Metadata.DatabaseID
      );
    } catch (readError) {
      console.error("Error reading pricing sheet:", readError);
      throw new Error("Failed to read pricing sheet");
    }

    // Extract Pricing Data
    const pricingObject: TPricingApiResponse = getPricing(pricingSheet);
    let respo = JSON.stringify(pricingObject);

    return new Response(respo);
  } catch (error) {
    console.error("Unhandled error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// Throw error in getPricing Sheet if price field is not defiend
// Implement typing and error handling in the client caller function

// Test if the errors thrown in the modules do actually get caught
// in line 83
