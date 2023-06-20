import React, { useContext, useEffect, useRef, useState } from 'react';
import { Selected_Items_Context, User_Input_Context } from '../selected_items_context.jsx';
import { jsPDF } from "jspdf";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { container_46_w_dimensions_SVG, container_36_w_dimensions_SVG } from '../assets/switch_board.jsx';

const PDF_preview = () => {
    const { Selected_Items, set_Selected_Items } = useContext(Selected_Items_Context);
    const { User_Input, setUser_Input } = useContext(User_Input_Context);

    const canvasRef = useRef(null);

    const [containerSrc, setContainerSrc] = useState(null);

    useEffect(() => {
        if (Selected_Items.length > 0) {
            if (Selected_Items[0].config_specs.Frame_Size === 36) {
                setContainerSrc('data:image/svg+xml,' + encodeURIComponent(container_36_w_dimensions_SVG));
            } else if (Selected_Items[0].config_specs.Frame_Size === 46) {
                setContainerSrc('data:image/svg+xml,' + encodeURIComponent(container_46_w_dimensions_SVG));
            }
        }
    }, [Selected_Items]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !containerSrc) return;
        
        const context = canvas.getContext('2d');
        
        // Load and draw the container SVG first
        const container = new Image();
        container.onload = () => {
            // Set the canvas size to match the container image size
            canvas.width = container.width;
            canvas.height = container.height;
    
            context.drawImage(container, 0, 0);
        
            // Once the container is drawn, proceed with the SVG items
            let currentY = 117;  // Start with an offset for y-coordinate
            let currentX = 78.5;  // Start with an offset for x-coordinate
        
            Selected_Items.forEach(item => {
                const img = new Image();
                img.onload = () => {
                    context.drawImage(img, currentX, currentY);
                    if(item.Size == 9){ 
                        currentY += 45;  // Increment y-coordinate
                    }else if(item.Size == 6){
                        currentY += 30;  // Increment y-coordinate
                    }else if(item.Size == 4){
                        currentY += 20;  // Increment y-coordinate
                    }
                }
                img.src = 'data:image/svg+xml,' + encodeURIComponent(item.SVG_str);
            });
        };
        container.src = containerSrc;
        
    }, [Selected_Items, containerSrc]);

    const createPdf = () => {
        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a4"
        });

        pdf.addImage(canvasRef.current.toDataURL('image/png'), 'PNG', 5, 5);
        pdf.setFontSize(10)
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
    
        pdf.save('Curntly_Config.pdf');

    }

    return (
        <div>
            {Selected_Items && Selected_Items.length > 0 ? (
                <Container>
                    <Row>
                        <Col>
                            <canvas ref={canvasRef} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="success" onClick={createPdf}>Download PDF</Button>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <div />
            )}
        </div>
    );
};

export default PDF_preview;
