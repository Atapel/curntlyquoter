import {TPricingApiResponse} from "@api_requests/types"
export const getPricing = (
    sheetDataRaw: Array<Array<string>>
) => {
    // Access Pricing Data values
    let pannelPriceRAW = sheetDataRaw[14][1];
    let breakersPriceRaw = sheetDataRaw[28][1]
    // Transform Pricing Data values to float
    const pannelPrice = parseFloat(pannelPriceRAW.replace(/[$, ]/g, ''));
    const breakersPrice = parseFloat(breakersPriceRaw);
    // Calculate total price
    const totalPrice = pannelPrice + breakersPrice;
    // Create Pricing object
    const price: TPricingApiResponse = {
        pannel: Math.ceil(pannelPrice),
        breakers: Math.ceil(breakersPrice),
        total: Math.ceil(totalPrice)
    };
    return price
}