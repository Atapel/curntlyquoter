const clonePricingSheet = async (clienObject,configObject,spreadsheetId) => {
    let response;

    //Untiil da6atabase id is implemented generate a dummy string and using it as sheet nameS 
    const randomNumber = String(
      Math.floor(Math.random() * (100000 - 1 + 1)) + 1
    );

    try {
        // Step 1: Duplicate the existing sheet
        const duplicateSheetRequest = {
            spreadsheetId,
            resource: {
                requests: [
                    {
                        duplicateSheet: {
                            sourceSheetId: 344225992, // Provide the sheet name to be duplicated
                            insertSheetIndex: 1, // Choose the index where the new sheet will be inserted
                            // newSheetName: configObject.Metadata.DatabaseID,
                            newSheetName:randomNumber,
                        },
                    },
                ],
            },
        };

        response = await clienObject.spreadsheets.batchUpdate(duplicateSheetRequest);

        // Getting the Sheet id of the newly created sheet
        const newSheetId = response.data.replies[0].duplicateSheet.properties.sheetId

        // Return new sheet name, id
        return {
            // sheetName: configObject.Metadata.DatabaseID,
            sheetName: randomNumber,
            sheetId: newSheetId
        }

    } catch (error) {
        console.error("Error updating sheet", error);
    }
}

module.exports = clonePricingSheet;