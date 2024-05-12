import { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { UseConfigurationReducerContext } from "@context/globalContext";
import { updateConfiguration }  from '@api_requests/supabase/actions'
function SaveConfigurationButton() {
  const { state, dispatch } = UseConfigurationReducerContext();
  const [operationStatus, setOperationStatus] = useState(null);

  async function insertConfigurations() {
    
    try {
      console.log("state to save",state);
      
      const result = await updateConfiguration(state);
      if (typeof result === 'string') {
        // Log success and set operation status
        console.log("Record inserted successfully!");
        setOperationStatus("success");
      } else {
        // Handle the object with an 'error' property
        console.error(result.error);
        setOperationStatus("danger");
      }
    } catch (error) {
      // Handle any errors that occurred during the update process
      console.error('Error updating configuration:', error);
      setOperationStatus("danger");
    }
    
  }

  return (
    <>
      <Button
        onClick={insertConfigurations}
        variant="outline-info"
        className="w-100"
        data-testid="Save-Config"
      >
        Save Configuration to Database
      </Button>
      {operationStatus && (
        <Alert 
          variant={operationStatus}
          data-testid="Save-Config-Alert"  
        >
          {operationStatus === "success"
            ? "Configuration saved successfully!"
            : "Failed to save configuration!"}
        </Alert>
      )}
    </>
  );
}

export default SaveConfigurationButton;
