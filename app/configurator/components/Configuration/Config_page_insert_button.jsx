import { useState } from "react";
import { createClient } from '../../../utils/supabase/clients'
import { Button, Alert } from "react-bootstrap";
import { UseCurrentUserContext, UseConfigurationReducerContext } from "../../../context/globalContext";

function SaveConfigurationButton() {
  const { state, dispatch } = UseConfigurationReducerContext();
  const { CurrentUser, setCurrentUser } = UseCurrentUserContext();
  const [operationStatus, setOperationStatus] = useState(null);

  const supabase = createClient();
  const currentTime = new Date().toISOString().substring(0, 19).replace("T", " ");

  async function insertConfigurations() {
    const objectToInsert = {
      created_at: currentTime,
      user_id: CurrentUser.User_UID,
      init_client: state.Metadata.Client,
      init_project: state.Metadata.Project,
      init_drawn_by: CurrentUser.Given_Name + " " + CurrentUser.Family_Name,

      panel_width: state.Configuration.SelectedFrameSize,
      panel_voltage: state.Configuration.SelectedVoltage,
      panel_KAIC_rating: state.Configuration.SelectedKAICRating,
      panel_bus_rating: state.Configuration.SelectedBusRating,
      selected_breakers: state.Configuration.SelectedBreakers,
      order_confirmed: false,
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

          panel_width: state.Configuration.SelectedFrameSize,
          panel_voltage: state.Configuration.SelectedVoltage,
          panel_KAIC_rating: state.Configuration.SelectedKAICRating,
          panel_bus_rating: state.Configuration.SelectedBusRating,
          selected_breakers: state.Configuration.SelectedBreakers,
          order_confirmed: false,
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

  return (
    <>
      <Button
        onClick={insertConfigurations}
        variant="outline-info"
        className="w-100"
      >
        Save Configuration to Database
      </Button>
      {operationStatus && (
        <Alert variant={operationStatus}>
          {operationStatus === "success"
            ? "Configuration saved successfully!"
            : "Failed to save configuration. Please try again or contact support."}
        </Alert>
      )}
    </>
  );
}

export default SaveConfigurationButton;
