import { useContext } from 'react';
import React from 'react';
import { Selected_Items_Context } from '../selected_items_context.jsx';
import Button from 'react-bootstrap/Button';

const DownloadPDF = () => {

  const {Selected_Items, set_Selected_Items} = useContext(Selected_Items_Context);

    const downloadPdf = async () => {
        // Extract SVG Strings
        // Extract SVG Strings for each selected item
        let svgStrings = Selected_Items.map(item => item.SVG_str);
        // Post SVG Strings to Server
        const response = await fetch('http://localhost:5000/generate-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({svg: svgStrings})
        });

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Curntly_Config_Breakers.pdf');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    }

    return (
        <div>
            {Selected_Items && Selected_Items.length > 0 ? (
                <Button variant="success" onClick={downloadPdf}>Download PDF</Button>
            ) : (
                <div />
            )}
        </div>
    );
}

export default DownloadPDF;




