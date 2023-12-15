import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button, Alert } from "react-bootstrap";

function SaveConfigurationButton({
  CurrentUser,
  User_Input,
  Selected_Panel,
  Selected_Breakers
}) {
  const [operationStatus, setOperationStatus] = useState(null);
  const [ProjectMetadata, setProjectMetadata] = useState(null)
  const supabase = createClientComponentClient();
  const currentTime = new Date().toISOString().substring(0, 19).replace("T", " ");

  async function insertConfigurations() {
    try {
      // Try to fetch user information
      const { data: userData, error: userError } = await supabase.auth.getUser();
      console.log(userData.user.id);
      const { data, error } = await supabase
        .from("User_Metadata")
        .select('*')
        .eq('User_UID', user.id); // Replace 'User_UID' with the actual column name

      setProjectMetadata(data[0])
      // Additional operations related to user data
      console.log("Pimml", {
        created_at: currentTime,
        user_id: userData.user.id,
        init_client: User_Input.client,
        init_project: User_Input.project,
        init_drawn_by: ProjectMetadata.Given_Name + " " + ProjectMetadata.Family_Name,

        panel_width: Selected_Panel.Frame_Size,
        panel_voltage: Selected_Panel.Voltage,
        panel_KAIC_rating: Selected_Panel.KAIC_rating,
        panel_bus_rating: Selected_Panel.Bus_rating,

        selected_breakers: Selected_Breakers,

        order_confirmed: false,
      });

      // Handle user retrieval error
      if (userError) {
        console.error("Supabase user retrieval error:", userError.message, userError.details);
        throw new Error("Failed to retrieve user information.");
      }

      // Add a conditional check before the second try-catch block
      if (!userError) {
        // Try to insert data into the "Configurations" table
        const { error: insertError } = await supabase.from("Configurations").insert({
          created_at: currentTime,
          user_id: userData.user.id,
          init_client: User_Input.client,
          init_project: User_Input.project,
          init_drawn_by: User_Input.drawnBy,

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
      }
    } catch (error) {
      // Overall error handling
      console.error("Insert configurations error:", error.message);
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
