import React, { useEffect, useRef, useState } from "react";
import { UseConfigurationReducerContext } from "../../../context/globalContext";
import { ListGroup } from "react-bootstrap";
import {
  container_46_w_dimensions_SVG,
  container_36_w_dimensions_SVG,
} from "../../assets/switch_board.jsx";
import PDF_Generation from "./Config_page_PDF_creation";
import SaveConfigurationButton from "./Quotation_page_insert_button";

const PDF_preview = (props) => {
  const [panelSelected, setPanelSelected] = props.renderstate;
  const [containerSrc, setContainerSrc] = useState(null);
  const { state, dispatch } = UseConfigurationReducerContext();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (panelSelected === false) {
      if (state.Configuration.SelectedFrameSize === 36) {
        setContainerSrc(
          "data:image/svg+xml," +
          encodeURIComponent(container_36_w_dimensions_SVG)
        );
      } else if (state.Configuration.SelectedFrameSize === 46) {
        setContainerSrc(
          "data:image/svg+xml," +
          encodeURIComponent(container_46_w_dimensions_SVG)
        );
      }
    }
  }, [state.Configuration]);

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
      // let currentX = 78.5; // Start with an offset for x-coordinate
      let currentX = null // Start with an offset for x-coordinate


      state.Configuration.SelectedBreakers.forEach((item) => {
        const img = new Image();
        img.onload = () => {
          if (state.Configuration.SelectedFrameSize === 36) {
            currentX = 60.5; // Start with an offset for x-coordinate
          } else if (state.Configuration.SelectedFrameSize === 46) {
            currentX = 78.5; // Start with an offset for x-coordinate
          }
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
  }, [state.Configuration.SelectedBreakers, containerSrc]);


  return (
    <div>
      {panelSelected === true ? (
        <ListGroup>
          <ListGroup.Item>
            <h2>Configure Panel: </h2>
          </ListGroup.Item>
          <ListGroup.Item>
            <canvas ref={canvasRef} className="m-5" />
          </ListGroup.Item>
          <ListGroup.Item>
            <PDF_Generation canvasRef={canvasRef} />
            <SaveConfigurationButton />
          </ListGroup.Item>
        </ListGroup>
      ) : (
        <div />
      )}
    </div>
  );
};

export default PDF_preview;
