import { sheets_v4 } from "googleapis";
export const clonePricingSheet = async (
  clientObject: sheets_v4.Sheets,
  DatabaseID: string,
  spreadsheetId: string
): Promise<string> => {
  const sourceSheetId: number = Number(
    process.env.GOOGLE_SHEETS_SOURCE_SHEET_ID
  );
  console.log("sourceSheetId", sourceSheetId);
  try {
    // Step 1: Duplicate the existing sheet
    // Using the Database Id as sheet name so it can be linked to coresponding sheet
    const duplicateSheetRequest = {
      spreadsheetId,
      resource: {
        requests: [
          {
            duplicateSheet: {
              // sourceSheetId: sourceSheetId,
              sourceSheetId: sourceSheetId, // Provide the sheet name to be duplicated
              insertSheetIndex: 1, // Choose the index where the new sheet will be inserted
              newSheetName: DatabaseID,
            },
          },
        ],
      },
    };

    const response = await clientObject.spreadsheets.batchUpdate(
      duplicateSheetRequest
    );

    // Getting the Sheet id of the newly created sheet
    const newSheetId =
      response.data.replies[0].duplicateSheet.properties.sheetId;

    // Return new sheet name
    return DatabaseID;
  } catch (error) {
    console.error(error);
    throw new Error("Failed cloning sheet");
  }
};
