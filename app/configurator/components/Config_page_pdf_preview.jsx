import React, { useEffect, useRef, useState } from "react";
import {
  UseBreakerContext,
  UseFrameContext,
  UseUserInputContext,
} from "../../context/globalContext";
import { jsPDF } from "jspdf";
import { Button, ListGroup } from "react-bootstrap";
import {
  container_46_w_dimensions_SVG,
  container_36_w_dimensions_SVG,
} from "../assets/switch_board.jsx";

const PDF_preview = () => {
  const { Selected_Breakers, setSelected_Breakers } = UseBreakerContext();
  const { Selected_Panel, set_Selected_Panel } = UseFrameContext();
  const { User_Input, setUser_Input } = UseUserInputContext();

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

  const createPdf = () => {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    pdf.addImage(canvasRef.current.toDataURL("image/png"), "PNG", 5, 5);
    pdf.setFontSize(10);
    // Set the text color, draw color, and font:
    pdf.setTextColor(0, 0, 0); // RGB values
    pdf.setDrawColor(255, 0, 0); // RGB values
    pdf.setFont("Helvetica", "normal"); // font name, style
    // Add some text to the document at a specific position:
    // Define your text lines
    var lines = [
      `Project: ${User_Input.project}`,
      `Client: ${User_Input.client}`,
      `Equipment: ${User_Input.equipment}`,
      `Sales Order Number: ${User_Input.salesOrderNumber}`,
      `Revision: ${User_Input.revision}`,
      `Drawing Date: ${User_Input.drawingDate}`,
      `Drawn By: ${User_Input.drawnBy}`,
    ];

    // Start y-coordinate
    var y = 170;

    // Print each line separately
    for (var i = 0; i < lines.length; i++) {
      pdf.text(lines[i], 240, y);
      y += 5; // Increment y-coordinate for the new line
    }

    pdf.save("Curntly_Config.pdf");
  };

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
            <Button
              variant="outline-success"
              className="w-100"
              onClick={createPdf}
            >
              Download PDF
            </Button>
          </ListGroup.Item>
        </ListGroup>
      ) : (
        <div />
      )}
    </div>
  );
};

export default PDF_preview;
