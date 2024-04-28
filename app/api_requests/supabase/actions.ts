"use server"
import { createClient } from '../../utils/supabase/server'
import { TConfiguration } from '../../context/types';
export async function insertConfigurationInit(configState: {
  Client: string,
  Project: string
}): Promise<string> {
  const currentTime = new Date().toISOString().substring(0, 19).replace("T", " ");
  const supabase = createClient()
  const currentUser = await supabase.auth.getUser()
  // User Name from DB in Variable
  // cons UserName = currentUser.data.user.user_metadata.name;  
  const objectToInsert = {
    created_at: currentTime,
    user_id: currentUser.data.user.id,
    init_client: configState.Client,
    init_project: configState.Project,
    init_drawn_by: 'USER_1'
  }

  let data;

  try {
    // Try to insert data into the "Configurations" table
    const {  data: insertedData, error: insertError } = await supabase.from("Configurations").insert(objectToInsert).select('id');
    data = insertedData;
    // Handle data insertion error
    if (insertError) {
      console.error("Supabase data insertion error:", insertError);
      throw new Error("Failed to insert record into the database.");
    }
    // Log success and set operation status
    console.log("Record inserted successfully!");
  } catch (error) {
    // Overall error handling
    console.error("Insert configurations error:", error, error.message, error.details);
  }

  return data[0].id
}

export async function updateConfiguration(configState: TConfiguration) {
    const currentTime = new Date().toISOString().substring(0, 19).replace("T", " ");
    const supabase = createClient()
    const objectToInsert = {
      // Case below needs to be implemented
      last_updated_at: currentTime, 
      panel_width:configState.Configuration.SelectedFrameSize,
      panel_voltage:configState.Configuration.SelectedVoltage,
      panel_KAIC_rating:configState.Configuration.SelectedKAICRating,
      panel_bus_rating:configState.Configuration.SelectedBusRating,
      selected_breakers:configState.Configuration.SelectedBreakers,
      order_confirmed: false,
    }
    
    if (configState.Metadata.DatabaseID !== null) {
      try {
        console.log(configState.Metadata.DatabaseID);
        // Update entire row matching ID
        const { error } = await supabase
          .from('Configurations')
          .update(objectToInsert)
          .eq('id', configState.Metadata.DatabaseID)

        // Handle data insertion error
        if (error) {
          console.error("Supabase data update error:", error.message, error.details);
          throw new Error("Failed to update record in the database.");
        }

        // Log success and set operation status
        console.log("Record updated successfully!");

      } catch (error) {
        // Overall error handling
        console.error("Update configurations error:", error, error.message, error.details);
      }

    }
      
}

export async function confirmOrder(configDbId: string) {
    
  const supabase = createClient()
  
    const currentTime = new Date()
      .toISOString()
      .substring(0, 19)
      .replace("T", " ");

    try {
      console.log();
      const { error } = await supabase.from("Configurations").update({
        order_confirmed: true,
      }).match({
        id: configDbId
      });
      if (error) {
        console.error("Supabase error:", error.message, error.details);
        throw new Error("Failed to confirm order.");
      }
      console.log("Order confirmed successfully!");
    } catch (error) {
      console.error(error);
    }
  }