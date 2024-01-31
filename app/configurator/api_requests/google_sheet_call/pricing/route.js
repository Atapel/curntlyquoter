const { google } = require("googleapis");
// Dev Acces at
// http://localhost:3000/configurator/api_requests/google_sheet_call/pricing
export async function GET() {
  let cellValidationValues = []
  let cellValues = []

  const spreadsheetId = process.env.MASTER_QUOTE_SHEET_ID;
  const range = "A:B"; // Change this to the range you want to retrieve
  const credentialsFilePath = "app/configurator/api_requests/google_sheet_call/credentials.json"

  const auth = new google.auth.GoogleAuth({
    keyFile: credentialsFilePath,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth });

  // Retrieve data validation rules
  const response = await googleSheets.spreadsheets.get({
    auth: auth,
    spreadsheetId: spreadsheetId,
    ranges: [range],
    fields: 'sheets/data/rowData/values/dataValidation'
  });
  const rowData = response.data.sheets[0].data[0].rowData;

  for (let rowIndex = 0; rowIndex < rowData.length; rowIndex++) {
    if (!rowData[rowIndex].values) continue; // Skip empty rows
    const row = rowData[rowIndex];
    const rowValues = row.values;

    for (let colIndex = 0; colIndex < rowValues.length; colIndex++) {
      const cell = rowValues[colIndex];
      const dataValidation = cell.dataValidation;
      if (!dataValidation) continue; // Skip cells without data validation rules
      if (dataValidation) {
        const rowNumber = rowIndex + 1;  // Adjust for 1-based index
        const colLetter = String.fromCharCode('A'.charCodeAt(0) + colIndex);
        const cellAddress = `${colLetter}${rowNumber}`;
        let validationVal = []
        dataValidation.condition.values.forEach(element => {
          validationVal.push(element.userEnteredValue)
        })
        cellValidationValues.push({
          Cell: cellAddress,
          Validation: validationVal
        })
      }
    }
  }

  let values;
  try {
    // Make the API request to retrieve data
    const response = await googleSheets.spreadsheets.values.get({
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
  return new Response(values);
}
