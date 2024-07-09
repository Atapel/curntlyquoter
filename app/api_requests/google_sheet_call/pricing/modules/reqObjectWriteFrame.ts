import { TConfiguration } from "@context/types";
//   import {getValidationRules} from "./getValidationRules"
type TSheetSchema = {
  values: (number | string)[][];
  range: string;
}[];
export type TBatchUpdateRequest = {
    spreadsheetId: string,
    resource: {
      valueInputOption: "RAW",
      data: TSheetSchema
    }
  }
export const ReqObjectWriteFrame = (
  configObject: TConfiguration,
  sheetName: string,
  spreadsheetId: string, 
) => {
  // ):TSheetSchema => {
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
      range: `${sheetName}!B2`,
    },
    {
      // CellName: 'ServiceorDistribution',
      values: [[configObject.SelectedServiceDistribution]],
      range: `${sheetName}!B3`,
    },
    {
      // CellName: 'Voltage',
      values: [[configObject.SelectedVoltage]],
      range: `${sheetName}!B4`,
    },
    {
      // CellName: 'Interrupt',
      values: [[configObject.SelectedKAICRating + "KAIC"]],
      range: `${sheetName}!B5`,
    },
  ];

  const batchUpdateRequest: TBatchUpdateRequest = {
    spreadsheetId,
    resource: {
      valueInputOption: "RAW",
      data: Schema,
    },
  };

  return batchUpdateRequest
};
