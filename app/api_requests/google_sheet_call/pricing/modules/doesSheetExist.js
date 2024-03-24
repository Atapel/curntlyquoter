const doesSheetExist = async (clienObject,spreadsheetId,sheetName) => {
       
    // Check if sheet alreadyy exists by sheetname
    try{
      const response = await clienObject.spreadsheets.get({
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
module.exports = doesSheetExist;
// Now  figure out  on how to implement this