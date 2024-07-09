"use server";
import getGoogleSheetsClient from "../sheetsClient";
import { TConfigurationState } from "@context/types";
import { doesSheetExist } from "./modules/doesSheetExist";
import { clonePricingSheet } from "./modules/cloneSheet";
import { ReqObjectWriteFrame } from "./modules/reqObjectWriteFrame";
import { ReqObjectWriteBreakers } from "./modules/reqObjectWriteBreaker";
import { writeSheet } from "./modules/writePricing";
// Global env values
const templateSheetID: string = process.env.MASTER_QUOTE_SHEET_ID;
const googleSheets = getGoogleSheetsClient();
export async function createSheet(configObject: TConfigurationState) {
  console.log("configObject", configObject);
  // Initialize Google Sheets Client
  // Check if sheet already exists
  const sheetExistenceCheck = await doesSheetExist(
    googleSheets,
    templateSheetID,
    configObject.Metadata.DatabaseID
  );
  if (!sheetExistenceCheck) {
    console.log("Sheet does not exist, cloning template sheet");
    // if not then clone the original template sheet
    try {
      await clonePricingSheet(
        googleSheets,
        configObject.Metadata.DatabaseID,
        templateSheetID
      );
    } catch (cloneError) {
      console.error("Error cloning pricing sheet:", cloneError);
      throw new Error("Failed to clone pricing sheet");
    }
  } else {
    console.log("Sheet already exists");
  }
}
export async function writeFramePricing(configObject: TConfigurationState) {
  const reqObject = ReqObjectWriteFrame(
    configObject.Configuration,
    configObject.Metadata.DatabaseID,
    templateSheetID
  );
  try {
    await writeSheet(googleSheets, reqObject);
  } catch (writeError) {
    console.error("Error writing to pricing sheet:", writeError);
    throw new Error("Failed to write to pricing sheet");
  }
}
export async function writeBreakersPricing(configObject: TConfigurationState) {
  const reqObject = ReqObjectWriteBreakers(
    configObject.Configuration,
    configObject.Metadata.DatabaseID,
    templateSheetID
  );
  try {
    await writeSheet(googleSheets, reqObject);
  } catch (writeError) {
    console.error("Error writing to pricing sheet:", writeError);
    throw new Error("Failed to write to pricing sheet");
  }
}
