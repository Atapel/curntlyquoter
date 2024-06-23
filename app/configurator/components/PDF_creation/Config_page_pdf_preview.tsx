import React, { useEffect, useRef, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { UseConfigurationReducerContext } from "@context/globalContext";
import PDF_Generation from "./Config_page_PDF_creation";
import SaveConfigurationButton from "../Configuration/Config_page_insert_button";
import { frontViewSvgSource, sideViewSvgSource } from "./SvgSourceGenerator";

const PDF_preview = (props) => {
  const [panelSelected, setPanelSelected] = props.renderstate;

  const [containerSrc, setContainerSrc] = useState(null);
  const [sideViewSrc, setSideViewSrc] = useState(null);
  // const [techViewSrc, setTechViewSrc] = useState(null);

  const { state, dispatch } = UseConfigurationReducerContext();
  const canvasRef = useRef(null);

  // Set FrontView SRC
  useEffect(() => {
    let frontViewSource = frontViewSvgSource(state.Configuration);
    setContainerSrc(frontViewSource);
  }, [state.Configuration.SelectedFrameSize]);

  // Set SideView SRC
  useEffect(() => {
    setSideViewSrc(null);
    let sideViewSource = sideViewSvgSource(state.Configuration);
    setSideViewSrc(sideViewSource);
    // console.log('sideViewSrc: ',sideViewSrc);
  }, [
    state.Configuration.SelectedFeedType,
    state.Configuration.SelectedFeedPosition,
  ]);

  // Set TechView SRC
  // useEffect(() => {

  // }, [  ])

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerSrc) return;

    const context = canvas.getContext("2d");
    // Load and draw the container SVG first
    const container = new Image();
    // const techview = new Image();
    const sideview = new Image();

    container.onload = () => {
      // Set the canvas size to match the container image size
      // canvas.width = container.width;
      // canvas.height = container.height;
      canvas.width = 800;
      canvas.height = 500;

      context.drawImage(container, 0, 0);
      context.drawImage(sideview, 300, 0);
      // context.drawImage(techview, 500, 50)

      // Once the container is drawn, proceed with the SVG items
      let currentY = 117; // Start with an offset for y-coordinate
      // let currentX = 78.5; // Start with an offset for x-coordinate
      let currentX = null; // Start with an offset for x-coordinate

      state.Configuration.SelectedBreakers.forEach((item) => {
        const img = new Image();
        img.onload = () => {
          if (state.Configuration.SelectedFrameSize === 36) {
            currentX = 76; // Start with an offset for x-coordinate
          } else if (state.Configuration.SelectedFrameSize === 46) {
            currentX = 78.5; // Start with an offset for x-coordinate
          }
          context.drawImage(img, currentX, currentY);
          if (item.SelectedBreaker.Size == 9) {
            currentY += 45; // Increment y-coordinate
          } else if (item.SelectedBreaker.Size == 6) {
            currentY += 30; // Increment y-coordinate
          } else if (item.SelectedBreaker.Size == 4) {
            currentY += 20; // Increment y-coordinate
          }
        };
        img.src =
          "data:image/svg+xml," +
          encodeURIComponent(item.SelectedBreaker.SVG_str);
      });
    };

    container.src = containerSrc;
    sideview.src = sideViewSrc;
    // techview.src = techViewSrc
  }, [state.Configuration.SelectedBreakers, panelSelected, containerSrc]);

  return (
    <>
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
        <></>
      )}
    </>
  );
};

export default PDF_preview;
