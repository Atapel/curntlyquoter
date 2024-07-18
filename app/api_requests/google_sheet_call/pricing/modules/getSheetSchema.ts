// Merge Schema with Validation Rules and also implement logic that detects if there are no
// validation rules for a cell and then adds a default validation rule for that cell
// for each merged cell
// 
// range: "B2", merge with "B2" of Schema
import {
  sheets_v4
} from "googleapis"
import {TConfiguration} from "@context/types"
import {getValidationRules} from "./getValidationRules"
export type TBatchUpdateRequest = {
  spreadsheetId: string,
  resource: {
    valueInputOption: "RAW",
    data: TSheetSchema
  }
}
type TSheetSchema = ({
  values: (number | string)[][];
  range: string;
})[]
export const getRequestsObject = async (
  configObject: TConfiguration,
  clientObject:sheets_v4.Sheets,
  spreadsheetId: string, 
  sheetName: string
): Promise<TBatchUpdateRequest> => {
  // let validationRules = await getValidationRules(
  //   spreadsheetId,
  //   clientObject, 
  //   sheetName
  // )
  // Define Sheet Schema
  let Schema: TSheetSchema = [
    {
      // CellName: 'Amperage',
      values: [[configObject.SelectedBusRating]],
      range: `${sheetName}!B2`
    },
    {
      // CellName: 'ServiceorDistribution',
      values: [[configObject.SelectedServiceDistribution]],
      range: `${sheetName}!B3`
    },
    {
      // CellName: 'Voltage',
      values: [[configObject.SelectedVoltage]],
      range: `${sheetName}!B4`
    },
    {
      // CellName: 'Interrupt',
      values: [[configObject.SelectedKAICRating+'KAIC']],
      range: `${sheetName}!B5`
    }]

  // for (let sheetRow = 18; sheetRow <= 28; ++sheetRow) {
  for (let index = 0; index < configObject.SelectedBreakers.length; ++index) {
    // Define SheetRows
    let sheetRow = index + 18
    console.log(sheetRow, configObject.SelectedBreakers.length);
    // Since Cells in Row 22 are broken, we need to temporarily skip them
    if (sheetRow === 22) {
      continue
    }

    Schema.push(
      {
        // CellName: 'Breaker',
        values: [[configObject.SelectedBreakers[index].SelectedBreaker.Description]],
        range: `${sheetName}!A${sheetRow}`
      }, {
        // CellName: 'Single or Double',
        values: [[configObject.SelectedBreakers[index].SelectedHeight]],
        range: `${sheetName}!B${sheetRow}`
      }
    )
  }

  const batchUpdateRequest: TBatchUpdateRequest = {
    spreadsheetId,
    resource: {
      valueInputOption: "RAW",
      data: Schema,
    },
  };

  return batchUpdateRequest
}

// Perform Validation on Config Object

// Merge config object into schema
