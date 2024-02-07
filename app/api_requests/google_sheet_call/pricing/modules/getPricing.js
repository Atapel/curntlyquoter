// Dev Acces at
// http://localhost:3000/configurator/api_requests/google_sheet_call/pricing

const getPricingSheet = async (clienObject, spreadsheetId) => {

    let cellValues = []

    const range = "A:F"; // Change this to the range you want to retrieve

    let values;

    try {
        // Make the API request to retrieve data
        const response = await clienObject.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        values = response.data.values;

        if (values.length) {
            console.log("Data from the spreadsheet:");
            values.forEach((row) => {
                console.log(row.join("\t"));
                cellValues.push(row.join("\t"))
            });
            // return values

        } else {
            console.log("No data found.");
        }
    } catch (error) {
        console.error("Error retrieving data:", error.message);
    }
    return values
}

module.exports = getPricingSheet;


