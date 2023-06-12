import React from 'react';
import { jsPDF } from 'jspdf';

const GeneratePDFButton = () => {
  const handleDownload = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add text to the PDF
    doc.text('TESTTEST', 10, 10);

    // Save the PDF as a file
    doc.save('test.pdf');
  };

  return (
    <button onClick={handleDownload}>Download PDF</button>
  );
};

export default GeneratePDFButton;
