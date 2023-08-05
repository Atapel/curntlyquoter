import React, { useEffect, useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UseCurrentUserContext, UseUserInputContext } from "../../context/globalContext";
import { jsPDF } from "jspdf";
import { Alert, Button } from "react-bootstrap";

const PDF_Generation = ({ canvasRef }) => {
  const supabase = createClientComponentClient();
  const { User_Input, setUser_Input } = UseUserInputContext();
  const { CurrentUser, setCurrentUser } = UseCurrentUserContext();
  const [feedback, setFeedback] = useState(null);
  const [feedbackType, setFeedbackType] = useState(null);

  async function uploadFile(file) {
    const { data, error } = await supabase.storage
      .from("Configuration_Drawings")
      .upload(`Currntly_${CurrentUser.id}`, file);
    if (error) {
      setFeedbackType("danger");
      setFeedback(`Upload failed: ${error.message}`);
    } else {
      setFeedbackType("success");
      setFeedback("File uploaded successfully!");
    }
  }

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

    // Save PDF to cloud
    // uploadFile(pdf);
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
