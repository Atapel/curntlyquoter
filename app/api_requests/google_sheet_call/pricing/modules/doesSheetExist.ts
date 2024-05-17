import {
  sheets_v4
} from "googleapis"
export const doesSheetExist = async (
  // clienObject:sheets_v4,
  clientObject: sheets_v4.Sheets,
  spreadsheetId:string,
  sheetName: string) : Promise<boolean> => {
       
    // Check if sheet alreadyy exists by sheetname
    try{
      const response = await clientObject.spreadsheets.get({
        spreadsheetId,
      });
  
      const sheetsList = response.data.sheets.map((sheet) => sheet.properties.title);
    if (sheetsList.includes(sheetName)) {
      return true
    } else {
      return false
    }

    } catch (error) {
      console.error("Error checking sheet existence", error);
    }
  }