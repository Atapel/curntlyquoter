import React, { useContext, useEffect, useRef } from 'react';
import { Selected_Items_Context } from '../selected_items_context.jsx';
import { jsPDF } from "jspdf";
import Button from 'react-bootstrap/Button';
import DisplaySelectedItems from './configuration_preview.jsx'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { containe_w_dimensions_SVG } from '../assets/switch_board.jsx';
const PDF_preview = () => {
    const { Selected_Items, set_Selected_Items } = useContext(Selected_Items_Context);
    const canvasRef = useRef(null);

    // Define your containerSVG string
    const containerSVG =containe_w_dimensions_SVG
    
    useEffect(() => {
        const canvas = canvasRef.current;
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
        container.src = 'data:image/svg+xml,' + encodeURIComponent(containerSVG);
    
    }, [Selected_Items, containerSVG]);  // Dependency array
    

    const createPdf = () => {
        const pdf = new jsPDF();
        pdf.addImage(canvasRef.current.toDataURL('image/png'), 'PNG', 0, 0);
        pdf.save('Curntly_Config.pdf');
    };

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <DisplaySelectedItems />
                    </Col>
                    <Col>
                        <canvas ref={canvasRef} />
                        {Selected_Items && Selected_Items.length > 0 ? (
                            <Button variant="success" onClick={createPdf}>Download PDF</Button>
                            ) : (
                                <div />
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PDF_preview;







