import {
    sheets_v4
  } from "googleapis"
import {TConfigurationState} from "@context/types"
export const clonePricingSheet = async (
    clientObject:sheets_v4.Sheets,
    configObject:TConfigurationState,
    spreadsheetId:string
) :  Promise<string> => {
    const sourceSheetId: number = Number(process.env.GOOGLE_SHEETS_SOURCE_SHEET_ID);
    
    try {
        // Step 1: Duplicate the existing sheet
        const duplicateSheetRequest = {
            spreadsheetId,
            resource: {
                requests: [
                    {
                        duplicateSheet: {
                            // sourceSheetId: sourceSheetId,
                            sourceSheetId: sourceSheetId, // Provide the sheet name to be duplicated
                            insertSheetIndex: 1, // Choose the index where the new sheet will be inserted
                            newSheetName: configObject.Metadata.DatabaseID
                        },
                    },
                ],
            },
        };

        const response = await clientObject.spreadsheets.batchUpdate(duplicateSheetRequest);

        // Getting the Sheet id of the newly created sheet
        const newSheetId = response.data.replies[0].duplicateSheet.properties.sheetId

        // Return new sheet name
        return configObject.Metadata.DatabaseID

    } catch (error) {
        console.error(error);
        throw new Error("Failed cloning sheet");
        
    }
}