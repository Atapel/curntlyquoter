"use server"
import { createClient } from '@utils/supabase/server'
import { TConfigurationState } from '@context/types';
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
    user_id: currentUser.data.user.id,
    init_created_at: currentTime,
    init_client: configState.Client,
    init_project: configState.Project,
    init_drawn_by: 'USER_1'
  }

  let data: string;

  try {
    // Try to insert data into the "Configurations" table
    const {  data: insertedData, error: insertError } = await supabase.from("Configurations").insert(objectToInsert).select('id');
    data = insertedData[0].id;
        
    // Handle data insertion error
    if (insertError) {
      console.error("Supabase data insertion error:", insertError);
      throw new Error("Failed to insert record into the database.");
    }
    // Log success and set operation status
    console.log("Record inserted successfully!",data);
  } catch (error) {
    // Overall error handling
    console.error("Insert configurations error:", error, error.message, error.details);
  }

  return data
}

export async function updateConfiguration(configState: TConfigurationState) {
    const currentTime = new Date().toISOString().substring(0, 19).replace("T", " ");
    const supabase = createClient()
    const objectToInsert = {
      // Case below needs to be implemented
      last_updated_at: currentTime, 
      panel_width:configState.Configuration.SelectedFrameSize,
      panel_height:configState.Configuration.SelectedPanelHeight,
      panel_voltage:configState.Configuration.SelectedVoltage,
      panel_KAIC_rating:configState.Configuration.SelectedKAICRating,
      panel_bus_rating:configState.Configuration.SelectedBusRating,
      panel_service_distribution:configState.Configuration.SelectedServiceDistribution,
      panel_feed_type:configState.Configuration.SelectedFeedType,
      panel_feed_position:configState.Configuration.SelectedFeedPosition,
      panel_feed_thru_lugs:configState.Configuration.FeedThruLugs,
      selected_breakers:configState.Configuration.SelectedBreakers,
      order_confirmed: false,
    }
    
    if (configState.Metadata.DatabaseID) {
      try {
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
        return "Record updated successfully!";

      } catch (error) {
        // Overall error handling
        console.error("Update configurations error:", error, error.message, error.details);
        throw new Error(`Failed to update record in the database,${error.message}`);
        
      }

    }
    else {
      throw new Error(`Failed to update record in the database, No Database ID was provided`);
      return {error: `No Database ID was provided`}
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