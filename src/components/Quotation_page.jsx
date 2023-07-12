import { useState, useContext } from "react";
import { supabase } from "../supabaseClient.js";
import {
  Configuration_Frame_Context,
  Configuration_Breakers_Context,
  User_Input_Context,
} from "../selected_items_context.jsx";
import { Button, ListGroup } from "react-bootstrap";

function InsertButton() {
  const { Selected_Breakers, setSelected_Breakers } = useContext(
    Configuration_Breakers_Context
  );
  const { Selected_Panel, set_Selected_Panel } = useContext(
    Configuration_Frame_Context
  );
  const { User_Input, setUser_Input } = useContext(User_Input_Context);

  const [inserted, setInserted] = useState(false);

  async function insertConfigurations() {
    const currentTime = new Date()
      .toISOString()
      .substring(0, 19)
      .replace("T", " ");

    try {
      const { error } = await supabase.from("Configurations").insert({
        created_at: currentTime,
        user_id: 1,
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
    } catch (error) {
      console.error(error);
      // Handle the error as needed (e.g., show an error message)
    }
  }

  const showQuoteComponents =
    Selected_Breakers !== 0 && Selected_Panel !== 0 && User_Input !== 0;

  return (
    <div>
      {showQuoteComponents && (
        <>
          <ListGroup>
          <ListGroup.Item>
          <h2>Configuration Overview: </h2>
          </ListGroup.Item>
            <ListGroup.Item>
              <Button
                onClick={insertConfigurations}
                disabled={inserted}
                variant="outline-info"
                className="w-50"
              >
                Save Configuration
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                // onClick={insertConfigurations}
                // disabled={inserted}
                variant="outline-success"
                className="w-50"
              >
                Confirm Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </>
      )}
      {inserted && <p>Record inserted successfully!</p>}
    </div>
  );
}

export default InsertButton;
