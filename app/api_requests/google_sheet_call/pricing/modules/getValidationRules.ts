import {
  sheets_v4
} from "googleapis"
type TCellInputValidation = ({
  Cell: string,
  Validation: (string[])
})[]
  export const getValidationRules = async (
    spreadsheetId: string, 
    clienObject: sheets_v4.Sheets,
    sheetName: string
  ): Promise<TCellInputValidation> => {
  const cellValidationValues: TCellInputValidation = [];
  // Retrieve data validation rules
  const response = await clienObject.spreadsheets.get({
    spreadsheetId: spreadsheetId,
    ranges: [sheetName],
    fields: 'sheets/data/rowData/values/dataValidation'
  });
  const rowData = response.data.sheets[0].data[0].rowData;

  // Bellow code too fragile, instead search for dataValidation key
  // Look in the docs if the api can return a cleaner answer,
  // where both the cell location and the validation values are returned

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

  return cellValidationValues

}




















let validationRules = [
  {
    range: "B2",
    Validation: [
      "800",
      "1500",
      "2250",
    ],
  },
  {
    range: "B3",
    Validation: [
      "Service",
      "Distribution",
    ],
  },
  {
    range: "B4",
    Validation: [
      "208Y/120V",
      "480Y/277V",
    ],
  },
  {
    range: "B5",
    Validation: [
      "65KAIC",
      "100KAIC",
    ],
  },
  {
    range: "A18",
    Validation: [
      "UTE100",
      "UTS150",
      "UTS250",
      "UTS400",
      "UTS600",
      "UTS800",
      "UTS1200",
    ],
  },
  {
    range: "B18",
    Validation: [
      "Single",
      "Double",
    ],
  },
  {
    range: "A19",
    Validation: [
      "UTE100",
      "UTS150",
      "UTS250",
      "UTS400",
      "UTS600",
      "UTS800",
      "UTS1200",
    ],
  },
  {
    range: "B19",
    Validation: [
      "Single",
      "Double",
    ],
  },
  {
    range: "A20",
    Validation: [
      "UTE100",
      "UTS150",
      "UTS250",
      "UTS400",
      "UTS600",
      "UTS800",
      "UTS1200",
    ],
  },
  {
    range: "B20",
    Validation: [
      "Single",
      "Double",
    ],
  },
  {
    range: "A21",
    Validation: [
      "UTE100",
      "UTS150",
      "UTS250",
      "UTS400",
      "UTS600",
      "UTS800",
      "UTS1200",
    ],
  },
  {
    range: "B21",
    Validation: [
      "Single",
      "Double",
    ],
  },
  {
    range: "A22",
    Validation: [
      "UTE100",
      "UTS150",
      "UTS250",
      "UTS400",
      "UTS600",
      "UTS800",
      "UTS1200",
    ],
  },
  {
    range: "B22",
    Validation: [
      "Single",
      "Double",
    ],
  },
  {
    range: "A23",
    Validation: [
      "UTE100",
      "UTS150",
      "UTS250",
      "UTS400",
      "UTS600",
      "UTS800",
      "UTS1200",
    ],
  },
  {
    range: "B23",
    Validation: [
      "Single",
      "Double",
    ],
  },
  {
    range: "A24",
    Validation: [
      "UTE100",
      "UTS150",
      "UTS250",
      "UTS400",
      "UTS600",
      "UTS800",
      "UTS1200",
    ],
  },
  {
    range: "B24",
    Validation: [
      "Single",
      "Double",
    ],
  },
  {
    range: "A25",
    Validation: [
      "UTE100",
      "UTS150",
      "UTS250",
      "UTS400",
      "UTS600",
      "UTS800",
      "UTS1200",
    ],
  },
  {
    range: "B25",
    Validation: [
      "Single",
      "Double",
    ],
  },
  {
    range: "A26",
    Validation: [
      "UTE100",
      "UTS150",
      "UTS250",
      "UTS400",
      "UTS600",
      "UTS800",
      "UTS1200",
    ],
  },
  {
    range: "B26",
    Validation: [
      "Single",
      "Double",
    ],
  },
  {
    range: "A27",
    Validation: [
      "UTE100",
      "UTS150",
      "UTS250",
      "UTS400",
      "UTS600",
      "UTS800",
      "UTS1200",
    ],
  },
  {
    range: "B27",
    Validation: [
      "Single",
      "Double",
    ],
  },
  {
    range: "A28",
    Validation: [
      "UTE100",
      "UTS150",
      "UTS250",
      "UTS400",
      "UTS600",
      "UTS800",
      "UTS1200",
    ],
  },
  {
    range: "B28",
    Validation: [
      "Single",
      "Double",
    ],
  },
] 