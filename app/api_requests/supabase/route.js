export async function POST(dataObject) {
    const body = await dataObject.json();
  
    const supabase = createServerComponentClient({ cookies });
    try {
      // Create values array from the plainDataObject
      const values = Object.values(body);
  
      // Make the API request to write data
      response = await googleSheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        resource: {
          values: [values], // Wrap the values in an array
        },
      });
  
      console.log("Data written to the spreadsheet successfully:", response.statusText);
    } catch (error) {
      console.error("Error writing data to the spreadsheet:", error.message);
    }
  
    return new Response(response.statusText);
  }