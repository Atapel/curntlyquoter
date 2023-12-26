"use client"
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { Alert, Button } from "react-bootstrap";
import { UseConfigurationReducerContext, UseCurrentUserContext } from "../../../context/globalContext";
import Curntly_Logo from "public/curntly_slogan.png";

const PDF_Generation = ({ canvasRef }) => {
  const { state, dispatch } = UseConfigurationReducerContext();
  const { CurrentUser, setCurrentUser } = UseCurrentUserContext();

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
    console.log("Current_User from PDF Creator", CurrentUser);
    pdf.addImage(canvasRef.current.toDataURL("image/png"), "PNG", 5, 5);
    pdf.setFontSize(10);
    // Set the text color, draw color, and font:
    pdf.setTextColor(0, 0, 0); // RGB values
    pdf.setDrawColor(255, 0, 0); // RGB values
    pdf.setFont("Helvetica", "normal"); // font name, style
    // Add some text to the document at a specific position:

    var lines = [
      `Project: ${state.Metadata.Project}`,
      `Client: ${state.Metadata.Client}`,
      `Equipment: ${0}`,s
      `Sales Order Number: ${0}`,
      `Revision: ${0}`,
      `Drawing Date: ${americanFormatDate}`,
      `Drawn By: ${CurrentUser.Given_Name + " " + CurrentUser.Family_Name}`,
    ];

    // Start y-coordinate
    var y = 170;

    // Print each line separately
    for (var i = 0; i < lines.length; i++) {
      pdf.text(lines[i], 240, y);
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
