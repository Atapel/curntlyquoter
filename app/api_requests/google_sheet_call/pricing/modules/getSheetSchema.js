// Merge Schema with Validation Rules and also implement logic that detects if there are no
// validation rules for a cell and then adds a default validation rule for that cell
// for each merged cell
// 

// range: "B2", merge with "B2" of Schema
const getRequestsObject = (configObject, spreadsheetId) => {
  
  const cells = {
    SheetName: "Panel",

  }

  // Define Sheet Schema
  let Schema = [
    {
      // CellName: 'Amperage',
      values: [[configObject.SelectedBusRating]],
      range: `${cells.SheetName}!B2`
    },
    {
      // CellName: 'ServiceorDistribution',
      values: [[configObject.SelectedServiceDistribution]],
      range: `${cells.SheetName}!B3`
    },
    {
      // CellName: 'Voltage',
      values: [[configObject.SelectedVoltage]],
      range: `${cells.SheetName}!B4`
    },
    {
      // CellName: 'Interrupt',
      values: [[configObject.SelectedKAICRating]],
      range: `${cells.SheetName}!B5`
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
        values: [[configObject.SelectedBreakers[index].Description]],
        range: `${cells.SheetName}!A${sheetRow}`
      }, {
        // CellName: 'Single or Double',
        values: [[configObject.SelectedBreakers[index].BreakerSize]],
        range: `${cells.SheetName}!B${sheetRow}`
      }
    )
  }

  const batchUpdateRequest = {
    spreadsheetId,
    resource: {
      valueInputOption: "RAW",
      data: Schema,
    },
  };

  return batchUpdateRequest
}


// Get Validation valuess

// Perform Validation on Config Object

// Merge config object into schema



module.exports = getRequestsObject;