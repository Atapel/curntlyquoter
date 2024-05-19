import {
  sheets_v4
} from "googleapis"
import { TBatchUpdateRequest } from "./getSheetSchema"
export const writeSheet = async (
  clienObject: sheets_v4.Sheets, 
  batchRequest: TBatchUpdateRequest
):Promise<void> => {
    try {
        await clienObject.spreadsheets.values.batchUpdate(batchRequest);
      } catch (error) {
        console.error("Error writing sheet", error);
        throw new Error("Failed writing sheet");
      }
}