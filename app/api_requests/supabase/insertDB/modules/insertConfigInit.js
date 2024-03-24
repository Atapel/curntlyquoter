async function insertConfigurations() {
    const currentTime = new Date().toISOString().substring(0, 19).replace("T", " ");
    const objectToInsert = {
      created_at: currentTime,
      user_id: CurrentUser.User_UID,
      init_client: state.Metadata.Client,
      init_project: state.Metadata.Project,
      init_drawn_by: CurrentUser.Given_Name + " " + CurrentUser.Family_Name
    }

    if (state.Metadata.DatabaseID !== null) {
      try {
        console.log(state.Metadata.DatabaseID);
        // Update entire row matching ID
        const { data, updaterror } = await supabase
          .from('Configurations')
          .update(objectToInsert)
          .eq('id', state.Metadata.DatabaseID)

        // Handle data insertion error
        if (updaterror) {
          console.error("Supabase data update error:", updaterror.message, updaterror.details);
          throw new Error("Failed to update record in the database.");
        }

        // Log success and set operation status
        console.log("Record updated successfully!");
        setOperationStatus("success");

      } catch (error) {
        // Overall error handling
        console.error("Update configurations error:", error, error.message, error.details);
        setOperationStatus("danger");
      }

    } else {

      try {
        // Try to insert data into the "Configurations" table
        const { error: insertError } = await supabase.from("Configurations").insert({
          created_at: currentTime,
          user_id: CurrentUser.User_UID,
          init_client: state.Metadata.Client,
          init_project: state.Metadata.Project,
          init_drawn_by: CurrentUser.Given_Name + " " + CurrentUser.Family_Name,
        });

        // Handle data insertion error
        if (insertError) {
          console.error("Supabase data insertion error:", insertError.message, insertError.details);
          throw new Error("Failed to insert record into the database.");
        }

        // Log success and set operation status
        console.log("Record inserted successfully!");
        setOperationStatus("success");

      } catch (error) {
        // Overall error handling
        console.error("Insert configurations error:", error, error.message, error.details);
        setOperationStatus("danger");
      }

    }
}