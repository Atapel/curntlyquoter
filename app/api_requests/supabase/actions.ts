"use server"
import { createClient } from '../../utils/supabase/server'

export async function insertConfigurationInit(configState: any) {
  const currentTime = new Date().toISOString().substring(0, 19).replace("T", " ");
  const supabase = createClient()
  const currentUser = await supabase.auth.getUser()
  const objectToInsert = {
    created_at: currentTime,
    user_id: currentUser.data.user.id,
    init_client: configState.Client,
    init_project: configState.Project,
    init_drawn_by: 'Test_User'
    // currentUser.Given_Name + " " + currentUser.Family_Name
  }

  try {
    // Try to insert data into the "Configurations" table
    const { error: insertError } = await supabase.from("Configurations").insert(objectToInsert);
    // Handle data insertion error
    if (insertError) {
      console.error("Supabase data insertion error:", insertError.message, insertError.details);
      throw new Error("Failed to insert record into the database.");
    }
    // Log success and set operation status
    console.log("Record inserted successfully!");
  } catch (error) {
    // Overall error handling
    console.error("Insert configurations error:", error, error.message, error.details);
  }

  return 69
}


// export async function updateConfiguration(configState: any) {
//     const currentTime = new Date().toISOString().substring(0, 19).replace("T", " ");
//     const supabase = createClient()
//     const currentUser = await supabase.auth.getUser()
//     const objectToInsert = {
//       // Case below needs to be implemented
//       // last_updated_at: currentTime, 

//       panel_width:configState.Configuration.SelectedFrameSize,
//       panel_voltage:configState.Configuration.SelectedVoltage,
//       panel_KAIC_rating:configState.Configuration.SelectedKAICRating,
//       panel_bus_rating:configState.Configuration.SelectedBusRating,
//       selected_breakers:configState.Configuration.SelectedBreakers,
//       order_confirmed: false,
//     }


//       try {
//         // Try to insert data into the "Configurations" table
//         const { error: insertError } = await supabase.from("Configurations").insert({
//           panel_width:configState.Configuration.SelectedFrameSize,
//           panel_voltage:configState.Configuration.SelectedVoltage,
//           panel_KAIC_rating:configState.Configuration.SelectedKAICRating,
//           panel_bus_rating:configState.Configuration.SelectedBusRating,
//           selected_breakers:configState.Configuration.SelectedBreakers,
//           order_confirmed: false,
//         });
//         // Handle data insertion error
//         if (insertError) {
//           console.error("Supabase data insertion error:", insertError.message, insertError.details);
//           throw new Error("Failed to insert record into the database.");
//         }
//         // Log success and set operation status
//         console.log("Record inserted successfully!");
//       } catch (error) {
//         // Overall error handling
//         console.error("Insert configurations error:", error, error.message, error.details);
//       }
// }

    // if (configState.Metadata.DatabaseID !== null) {
      // try {
      //   console.log(configState.Metadata.DatabaseID);
      //   // Update entire row matching ID
      //   const { error } = await supabase
      //     .from('Configurations')
      //     .update(objectToInsert)
      //     .eq('id', configState.Metadata.DatabaseID)

      //   // Handle data insertion error
      //   if (error) {
      //     console.error("Supabase data update error:", error.message, error.details);
      //     throw new Error("Failed to update record in the database.");
      //   }

      //   // Log success and set operation status
      //   console.log("Record updated successfully!");

      // } catch (error) {
      //   // Overall error handling
      //   console.error("Update configurations error:", error, error.message, error.details);
      // }

    // }
    // else {

// export async function confirmOrder() {
//     const currentTime = new Date()
//       .toISOString()
//       .substring(0, 19)
//       .replace("T", " ");

//     try {
//       console.log(CurrentUser);
//       const { error } = await supabase.from("Configurations").update({
//         order_confirmed: true,
//       }).match({
//         user_id: CurrentUser.id,
//         created_at: currentTime,
//       });
//       if (error) {
//         console.error("Supabase error:", error.message, error.details);
//         throw new Error("Failed to confirm order.");
//       }
//       console.log("Order confirmed successfully!");
//     } catch (error) {
//       console.error(error);
//     }
//   }