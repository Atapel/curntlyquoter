// Dev Acces at
// http://localhost:3000/configurator/api_requests/google_sheet_call/pricing

const getPricingSheet = async (clienObject, spreadsheetId, sheetName) => {
    const range = `${sheetName}`; // Change this to the range you want to retrieve
    let values;

    try {
        // Make the API request to retrieve data
        const response = await clienObject.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        values = response.data.values;
    } catch (error) {
        console.error("Error retrieving data:", error.message);
    }
    return values
}

module.exports = getPricingSheet;


