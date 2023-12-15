"use client"
import React, { useEffect, useRef, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { UseUserInputContext } from "../../context/globalContext";
import Curntly_Logo from "public/curntly_slogan.png";

import { jsPDF } from "jspdf";
import { Alert, Button } from "react-bootstrap";

const PDF_Generation = ({ canvasRef }) => {
  const supabase = createClientComponentClient();
  const { User_Input, setUser_Input } = UseUserInputContext();
  const [ProjectMetadata, setProjectMetadata] = useState(null)
  const [feedback, setFeedback] = useState(null);
  const [feedbackType, setFeedbackType] = useState(null);

  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const americanFormatDate = new Date().toLocaleDateString('en-US', options);


  useEffect(() => {
    async function fetchData() {
      const supabase = createClientComponentClient();

      try {
        const { data: { user } } = await supabase.auth.getUser();
        console.log(user);
        const { data, error } = await supabase
          .from("User_Metadata")
          .select('*')
          .eq('User_UID', user.id); // Replace 'User_UID' with the actual column name

        console.log(data);

        setProjectMetadata(data[0])

        if (error) {
          console.error("Supabase error:", error.message, error.details);
          throw new Error("Failed to insert record into the database.");
          // You can handle success here or set a state to update the component
        }
        // Continue with handling data or setting state for success
      } catch (error) {
        console.error("Catch block error:", error);
        // You can handle the error here or set a state to update the component
      }
    }

    fetchData();
  }, []);


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

    var lines = [
      `Project: ${User_Input.project}`,
      `Client: ${User_Input.client}`,
      `Equipment: ${0}`,
      `Sales Order Number: ${0}`,
      `Revision: ${0}`,
      `Drawing Date: ${americanFormatDate}`,
      `Drawn By: ${ProjectMetadata.Given_Name + " " + ProjectMetadata.Family_Name}`,
    ];

    // Start y-coordinate
    var y = 170;

    // Print each line separately
    for (var i = 0; i < lines.length; i++) {
      pdf.text(lines[i], 240, y);
      y += 5; // Increment y-coordinate for the new line
    }

    pdf.addImage(Curntly_Logo.src, 'PNG', 239, 130, 50, 25);

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
