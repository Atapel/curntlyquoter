import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button, Alert } from "react-bootstrap";
import { UseCurrentUserContext } from "../../../context/globalContext";
function SaveConfigurationButton({
  User_Input,
  Selected_Panel,
  Selected_Breakers
}) {
  const { CurrentUser, setCurrentUser } = UseCurrentUserContext();
  const [operationStatus, setOperationStatus] = useState(null);
  const [ProjectMetadata, setProjectMetadata] = useState(null)
  const supabase = createClientComponentClient();
  const currentTime = new Date().toISOString().substring(0, 19).replace("T", " ");

  async function insertConfigurations() {
    try {
      console.log({created_at: currentTime,
        user_id: CurrentUser.User_UID,
        init_client: User_Input.client,
        init_project: User_Input.project,
        init_drawn_by: CurrentUser.Given_Name + " " + CurrentUser.Family_Name,

        panel_width: Selected_Panel.Frame_Size,
        panel_voltage: Selected_Panel.Voltage,
        panel_KAIC_rating: Selected_Panel.KAIC_rating,
        panel_bus_rating: Selected_Panel.Bus_rating,
        selected_breakers: Selected_Breakers,
        order_confirmed: false,});
      // Try to insert data into the "Configurations" table
      const { error: insertError } = await supabase.from("Configurations").insert({
        created_at: currentTime,
        user_id: CurrentUser.User_UID,
        init_client: User_Input.client,
        init_project: User_Input.project,
        init_drawn_by: CurrentUser.Given_Name + " " + CurrentUser.Family_Name,

        panel_width: Selected_Panel.Frame_Size,
        panel_voltage: Selected_Panel.Voltage,
        panel_KAIC_rating: Selected_Panel.KAIC_rating,
        panel_bus_rating: Selected_Panel.Bus_rating,
        selected_breakers: Selected_Breakers,
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
