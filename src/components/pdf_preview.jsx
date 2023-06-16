import React, { useContext, useEffect, useRef } from 'react';
import { Selected_Items_Context } from '../selected_items_context.jsx';
import { jsPDF } from "jspdf";
import Button from 'react-bootstrap/Button';
import DisplaySelectedItems from './configuration_preview.jsx'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PDF_preview = () => {
    const { Selected_Items, set_Selected_Items } = useContext(Selected_Items_Context);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        let currentY = 0;  // Initial y-coordinate

        Selected_Items.forEach(item => {
            const img = new Image();
            img.onload = () => {
                context.drawImage(img, 0, currentY);
                if(item.Size == 9){
                    currentY += 50;  // Increment y-coordinate
                }else if(item.Size == 6){
                    currentY += 35;  // Increment y-coordinate
                }else if(item.Size == 4){
                    currentY += 25;  // Increment y-coordinate
                }
                
            }
            img.src = 'data:image/svg+xml,' + encodeURIComponent(item.SVG_str);
        });

    }, [Selected_Items]);  // Dependency array

    const canvasHeight = 50 * Selected_Items.length;  // Calculate the needed canvas height

    const createPdf = () => {
        const pdf = new jsPDF();
        pdf.addImage(canvasRef.current.toDataURL('image/png'), 'PNG', 0, 0);
        pdf.save('Curntly_Config.pdf');
    };

    // const createPdf = () => {
    //     const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait mode, 'mm' for unit in millimeters, and 'a4' for page size
    //     const imgData = canvasRef.current.toDataURL('image/png');
    //     const pdfWidth = pdf.internal.pageSize.getWidth();
    //     const pdfHeight = pdf.internal.pageSize.getHeight();
    
    //     // Create a new image object to get the actual dimensions of the image
    //     const img = new Image();
    //     img.onload = function() {
    //         const imgWidth = this.width;
    //         const imgHeight = this.height;
    //         const marginLeft = (pdfWidth - imgWidth / 4) / 2; // Calculate horizontal margin
    //         const marginTop = (pdfHeight - imgHeight / 4) / 2; // Calculate vertical margin
    
    //         pdf.addImage(imgData, 'PNG', marginLeft, marginTop, imgWidth / 4, imgHeight / 4); // Add the image with the correct dimensions and margins
    //         pdf.save('Curntly_Config.pdf');
    //     };
    //     img.src = imgData;
    // };

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <DisplaySelectedItems />
                    </Col>
                    <Col>
                        <canvas ref={canvasRef} height={canvasHeight} />
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





