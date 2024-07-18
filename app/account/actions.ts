"use server";
import { createClient } from "@utils/supabase/server";
import { deletePricingSubSheet } from "@api_requests/google_sheet_call/pricing/deleteSubSheet/actions";
import { TConfigDB } from "@context/types";
import { revalidatePath } from "next/cache";

const urlPath = process.env.NEXT_PUBLIC_PRICING_SHEET_ROUTEHANDLER_URL;
export async function getConfigs() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;
  try {
    const { data, error } = await supabase
      .from("Configurations")
      .select()
      .eq("user_id", userId);
    if (error) {
      throw new Error("Failed to retrieve data from the database.");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function deleteConfigs(id: string) {
  const supabase = createClient();
  try {
    try {
      // await deletePricingSubSheet(id)
      deletePricingSubSheet(id);
    } catch (error) {
      console.error(error);
    }

    // Delete Configurations from DB
    // const { error } = await supabase
    const { error } = await supabase
      .from("Configurations")
      .delete()
      .eq("id", id);
    revalidatePath("/account");
    if (error) {
      throw new Error("Failed to delete data from the database.");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
