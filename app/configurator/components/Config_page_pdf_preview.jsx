import React, { useEffect, useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  UseBreakerContext,
  UseFrameContext,
  UseUserInputContext,
  UseCurrentUserContext
} from "../../context/globalContext";
import { Button, ListGroup } from "react-bootstrap";
import {
  container_46_w_dimensions_SVG,
  container_36_w_dimensions_SVG,
} from "../assets/switch_board.jsx";
import PDF_Generation from "./Config_page_PDF_creation";
import SaveConfigurationButton from "./Quotation_page_insert_button";

const PDF_preview = () => {
  const supabase = createClientComponentClient();
  const { Selected_Breakers, setSelected_Breakers } = UseBreakerContext();
  const { Selected_Panel, set_Selected_Panel } = UseFrameContext();
  const { User_Input, setUser_Input } = UseUserInputContext();
  const { CurrentUser, setCurrentUser } = UseCurrentUserContext();
  
  const canvasRef = useRef(null);

  const [containerSrc, setContainerSrc] = useState(null);

  useEffect(() => {
    if (Selected_Panel.length !== 0) {
      if (Selected_Panel.Frame_Size === 36) {
        setContainerSrc(
          "data:image/svg+xml," +
            encodeURIComponent(container_36_w_dimensions_SVG)
        );
      } else if (Selected_Panel.Frame_Size === 46) {
        setContainerSrc(
          "data:image/svg+xml," +
            encodeURIComponent(container_46_w_dimensions_SVG)
        );
      }
    }
  }, [Selected_Panel]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerSrc) return;

    const context = canvas.getContext("2d");

    // Load and draw the container SVG first
    const container = new Image();
    container.onload = () => {
      // Set the canvas size to match the container image size
      canvas.width = container.width;
      canvas.height = container.height;

      context.drawImage(container, 0, 0);

      // Once the container is drawn, proceed with the SVG items
      let currentY = 117; // Start with an offset for y-coordinate
      let currentX = 78.5; // Start with an offset for x-coordinate

      Selected_Breakers.forEach((item) => {
        const img = new Image();
        img.onload = () => {
          context.drawImage(img, currentX, currentY);
          if (item.Size == 9) {
            currentY += 45; // Increment y-coordinate
          } else if (item.Size == 6) {
            currentY += 30; // Increment y-coordinate
          } else if (item.Size == 4) {
            currentY += 20; // Increment y-coordinate
          }
        };
        img.src = "data:image/svg+xml," + encodeURIComponent(item.SVG_str);
      });
    };
    container.src = containerSrc;
  }, [Selected_Breakers, containerSrc]);


  return (
    <div>
      {Selected_Panel.length !== 0 ? (
        <ListGroup>
          <ListGroup.Item>
            <h2>Configure Panel: </h2>
          </ListGroup.Item>
          <ListGroup.Item>
            <canvas ref={canvasRef} className="m-5" />
          </ListGroup.Item>
          <ListGroup.Item>

            <PDF_Generation canvasRef={canvasRef} />

            <SaveConfigurationButton
              CurrentUser={CurrentUser}
              User_Input={User_Input}
              Selected_Panel={Selected_Panel}
              Selected_Breakers={Selected_Breakers}
            />

          </ListGroup.Item>
        </ListGroup>
      ) : (
        <div />
      )}
    </div>
  );
};

export default PDF_preview;
