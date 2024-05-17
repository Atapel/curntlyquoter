import getGoogleSheetsClient from "../sheetsClient"
import {doesSheetExist} from "./modules/doesSheetExist"
import {clonePricingSheet} from "./modules/cloneSheet"
import {getRequestsObject} from "./modules/getSheetSchema"
import {getPricingSheet} from "./modules/getPricing"
import {writePricingSheet} from "./modules/writePricing"
import {TConfigurationState} from "@context/types"
// Dev Acces at
// http://localhost:3000/configurator/api_requests/google_sheet_call/pricing
export async function POST(configObjectRAW) {
  try {
    const configObject: TConfigurationState = await configObjectRAW.json();

    // Load Sheet Id
    const templateSheetID: string = process.env.MASTER_QUOTE_SHEET_ID;

    // Initialize Google Sheets Client
    const googleSheets = getGoogleSheetsClient();

    // Check if sheet already exists
    const sheetExistenceCheck = await doesSheetExist(
      googleSheets, 
      templateSheetID, 
      configObject.Metadata.DatabaseID
    )
    
    let tabSubSheet:string;
    
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
        console.error('Error cloning pricing sheet:', cloneError);
        throw new Error('Failed to clone pricing sheet');
      }
    } else {
      // Sheet already exists
      tabSubSheet = configObject.Metadata.DatabaseID
    }

    // Transform Config object into sheets batch request
    const batchUpdateRequest = getRequestsObject(
      configObject.Configuration, 
      templateSheetID, 
      tabSubSheet
    );

    try {
      await writePricingSheet(googleSheets, batchUpdateRequest);
    } catch (writeError) {
      console.error('Error writing to pricing sheet:', writeError);
      throw new Error('Failed to write to pricing sheet');
    }

    // Read Sheet and get Pricing Data
    let pricingSheet;
    try {
      pricingSheet = await getPricingSheet(googleSheets, templateSheetID, tabSubSheet);
    } catch (readError) {
      console.error('Error reading pricing sheet:', readError);
      throw new Error('Failed to read pricing sheet');
    }

    // Transform Pricing Data values
    let pannelPriceRAW = pricingSheet[14][1];
    const price: { pannel: number; breakers: number; total: number } = {
      pannel: parseFloat(pannelPriceRAW.replace(/[$,]/g, '')),
      breakers: parseFloat(pricingSheet[28][1]),
      total: 666
    };

    // price.total = price.pannel + price.breakers;
    let respo = JSON.stringify(price);

    return new Response(respo);
  } catch (error) {
    console.error('Unhandled error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}