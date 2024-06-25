import getGoogleSheetsClient from "../sheetsClient";
import { doesSheetExist } from "./modules/doesSheetExist";
import { clonePricingSheet } from "./modules/cloneSheet";
import { getRequestsObject } from "./modules/getSheetSchema";
import { readSheet } from "./modules/getPricing";
import { writeSheet } from "./modules/writePricing";
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

    // Check if sheet already exists
    const sheetExistenceCheck = await doesSheetExist(
      googleSheets,
      templateSheetID,
      configObject.Metadata.DatabaseID
    );

    let tabSubSheet: string;

    if (!sheetExistenceCheck) {
      console.log("Sheet does not exist, cloning template sheet");
      // if not then clone the original template sheet
      try {
        tabSubSheet = await clonePricingSheet(
          googleSheets,
          configObject,
          templateSheetID
        );
      } catch (cloneError) {
        console.error("Error cloning pricing sheet:", cloneError);
        throw new Error("Failed to clone pricing sheet");
      }
    } else {
      // Sheet already exists
      tabSubSheet = configObject.Metadata.DatabaseID;
    }

    // Transform Config object into sheets batch request
    const batchUpdateRequest = await getRequestsObject(
      configObject.Configuration,
      googleSheets,
      templateSheetID,
      tabSubSheet
    );

    try {
      await writeSheet(googleSheets, batchUpdateRequest);
    } catch (writeError) {
      console.error("Error writing to pricing sheet:", writeError);
      throw new Error("Failed to write to pricing sheet");
    }

    // Read Sheet and get Pricing Data
    let pricingSheet;
    try {
      pricingSheet = await readSheet(
        googleSheets,
        templateSheetID,
        tabSubSheet
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
