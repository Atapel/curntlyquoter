"use client"
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { Alert, Button } from "react-bootstrap";
import { UseConfigurationReducerContext } from "../../../context/globalContext";
import Curntly_Logo from "public/curntly_slogan.png";

const PDF_Generation = ({ canvasRef }) => {
  const { state, dispatch } = UseConfigurationReducerContext();

  const [feedback, setFeedback] = useState(null);
  const [feedbackType, setFeedbackType] = useState(null);

  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const americanFormatDate = new Date().toLocaleDateString('en-US', options);

  const createPdf = () => {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });
    pdf.addImage(canvasRef.current.toDataURL("image/png"), "PNG", 5, 5);
    
    // Set the text color, draw color, and font:
    pdf.setTextColor(0, 0, 0); // RGB values
    pdf.setDrawColor(255, 0, 0); // RGB values
    pdf.setFont("Helvetica", "normal"); // font name, style
    // Add some text to the document at a specific position:
    pdf.setFontSize(7);
    let linesTopRight = [
      `CONSTRUCTION:PANELBOARD IS BUILT AND LABELED PER UL 891 `,
      `EFFECTIVE AT TIME OF MANUFACTURE.`,
      `SERVICE:INCOMING 1200A 120/208V 3-PHASE 4-WIRE.`,
      `NEMA RATING:ENCLOSURE IS RATED NEMA 1 FOR INDOOR APPLICATIONS.`,
      'FINISH:EXTERIOR FINISHED WITH ANSI 61 GRAY PAINT.',
      `TERMINATIONS: TERMINATIONS ARE ACCESSIBLE FROM THE FRONT.`,
      `BUSSING: SILVER PLATED COPPER SIZED IN ACCORDANCE WITH NYCEC AND NEC.`,
      `NEUTRAL BUS IS FULL SIZE, RUN WITH THE PHASE`,
      `BUSSES AND INSULATED FROM THE FRAME.`,
      `BREAKERS: MCCB BY LS ELECTRIC.`,
      `REFER TO ONE LINE DIAGRAM FOR MODEL NUMBERS`,]

    var y = 50;

    for (var i = 0; i < linesTopRight.length; i++) {
      pdf.text(linesTopRight[i], 200, i * 5);
      y += 5; // Increment y-coordinate for the new line
    }
    pdf.setFontSize(10);
    var linesBottomRight = [
      `Project: ${state.Metadata.Project}`,
      `Client: ${state.Metadata.Client}`,
      `Equipment: ${0}`,
      `Sales Order Number: ${0}`,
      `Revision: ${0}`,
      `Drawing Date: ${americanFormatDate}`,
      // `Drawn By: ${CurrentUser.Given_Name + " " + CurrentUser.Family_Name}`,
    ];

    // Start y-coordinate
    y = 170;

    // Print each line separately
    for (var i = 0; i < linesBottomRight.length; i++) {
      pdf.text(linesBottomRight[i], 240, y);
      y += 5; // Increment y-coordinate for the new line
    }

    pdf.addImage(Curntly_Logo.src, 'PNG', 239, 130, 50, 25);
    pdf.save(`Curntly_Config_${americanFormatDate}.pdf`);
  };

  return (
    <>
      <Button variant="outline-success" className="w-100" onClick={createPdf}>
        Save & Download PDF
      </Button>
      {feedback && <Alert variant={feedbackType}>{feedback}</Alert>}
    </>
  );
};

export default PDF_Generation;
