const writePricingSheet = async (clienObject, batchRequest) => {
    let response;
    try {
        response = await clienObject.spreadsheets.values.batchUpdate(batchRequest);
        console.log("Sheet updated successfully", response.data);
        // return "Feedback submitted successfully";
      } catch (error) {
        console.error("Error updating sheet", error);
      }
    return response
}

module.exports = writePricingSheet;