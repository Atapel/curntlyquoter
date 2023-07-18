import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button, Alert } from "react-bootstrap";

function SaveConfigurationButton({ CurrentUser, User_Input, Selected_Panel, setInserted }) {
  const [operationStatus, setOperationStatus] = useState(null);
  const supabase = createClientComponentClient();

  async function insertConfigurations() {
    const currentTime = new Date()
      .toISOString()
      .substring(0, 19)
      .replace("T", " ");

    try {
      console.log(CurrentUser);
      const { error } = await supabase.from("Configurations").insert({
        created_at: currentTime,
        user_id: CurrentUser.id,
        init_client: User_Input.client,
        init_project: User_Input.project,
        init_drawn_by: User_Input.drawnBy,

        panel_width: Selected_Panel.Frame_Size,
        panel_voltage: Selected_Panel.Voltage,
        panel_KAIC_rating: Selected_Panel.KAIC_rating,
        panel_bus_rating: Selected_Panel.Bus_rating,

        selected_breakers: false,

        order_confirmed: false,
      });
      if (error) {
        throw new Error("Failed to insert record into the database.");
      }
      console.log("Record inserted successfully!");
      setInserted(true);
      setOperationStatus('success');
    } catch (error) {
      console.error(error);
      setOperationStatus('danger');
    }
  }

  return (
    <>
      <Button
        onClick={insertConfigurations}
        variant="outline-info"
        className="w-50"
      >
        Save Configuration
      </Button>
      {operationStatus && (
        <Alert variant={operationStatus}>
          {operationStatus === 'success'
            ? 'Configuration saved successfully!'
            : 'Failed to save configuration!'}
        </Alert>
      )}
    </>
  );
}

export default SaveConfigurationButton;

