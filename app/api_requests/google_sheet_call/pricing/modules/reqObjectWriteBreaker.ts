import { TConfiguration } from "@context/types";
//   import {getValidationRules} from "./getValidationRules"
type TSheetSchema = {
  values: (number | string)[][];
  range: string;
}[];
export type TBatchUpdateRequest = {
  spreadsheetId: string;
  resource: {
    valueInputOption: "RAW";
    data: TSheetSchema;
  };
};
export const ReqObjectWriteBreakers = (
  configObject: TConfiguration,
  sheetName: string,
  spreadsheetId: string
) => {
  // ):TSheetSchema => {
  // let validationRules = await getValidationRules(
  //   spreadsheetId,
  //   clientObject,
  //   sheetName
  // )
  // Define Sheet Schema
  let Schema: TSheetSchema = [];

  for (let index = 0; index < configObject.SelectedBreakers.length; ++index) {
    // Define SheetRows
    let sheetRow = index + 18;
    console.log(sheetRow, configObject.SelectedBreakers.length);
    // Since Cells in Row 22 are broken, we need to temporarily skip them
    if (sheetRow === 22) {
      continue;
    }

    Schema.push(
      {
        // CellName: 'Breaker',
        values: [
          [configObject.SelectedBreakers[index].SelectedBreaker.Description],
        ],
        range: `${sheetName}!A${sheetRow}`,
      },
      {
        // CellName: 'Single or Double',
        values: [[configObject.SelectedBreakers[index].SelectedHeight]],
        range: `${sheetName}!B${sheetRow}`,
      }
    );
  }

  const batchUpdateRequest: TBatchUpdateRequest = {
    spreadsheetId,
    resource: {
      valueInputOption: "RAW",
      data: Schema,
    },
  };

  return batchUpdateRequest;
};
