const doesSheetExist = async (clienObject,spreadsheetId,sheetName) => {
       
    // Check if sheet alreadyy exists by sheetname
    try{
    const response = await clienObject.spreadsheets.get({
        spreadsheetId,
      });
  
      const sheetsList = response.data.sheets.map((sheet) => sheet.properties.title);
      return sheetsList.includes(sheetName);
    } catch (error) {
      console.error("Error checking sheet existence", error);
      return false;
    }
  }
module.exports = doesSheetExist;
// Now  figure out  on how to implement this