import React, { useState } from 'react';
import { Card, ListGroup, ListGroupItem, Row, Col, Dropdown } from 'react-bootstrap'; // Make sure to import necessary Bootstrap components
import ConfirmOrderButton from './Quotation_page_order_button';
const ConfigReview = ({ configuration }) => {
    const [expandedConfig, setExpandedConfig] = useState(null);

    const toggleExpansion = (configId) => {
        setExpandedConfig(expandedConfig === configId ? null : configId);
    };
    
    return (
        <Card>
            {/* <Card.Title onClick={() => toggleExpansion(configuration.id)}>
                Overview
            </Card.Title> */}
            <ListGroup>
                <Row>
                <Col>
                    <Card.Title>Selected Switchboard</Card.Title>
                    <ListGroupItem>
                        <strong>Width:</strong> {configuration.SelectedFrameSize}
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong>Voltage:</strong> {configuration.SelectedVoltage}
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong>KAIC rating:</strong> {configuration.SelectedKAICRating}
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong>Bus rating:</strong> {configuration.SelectedBusRating}
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong>Panel Height:</strong> {configuration.SelectedPanelHeight}
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong>Service Distribution:</strong>{' '}
                        {configuration.SelectedServiceDistribution}
                    </ListGroupItem>
                    <ListGroupItem>
                        <strong>Feed Type:</strong> {configuration.SelectedFeedType}
                    </ListGroupItem>
                    
                    {configuration.SelectedFeedType === "Main Breaker" ? (
                        <ListGroupItem>
                            <strong>Feed Thru Lugs:</strong> {configuration.FeedThruLugs ? "Yes" : "No"}
                        </ListGroupItem>
                    ): configuration.SelectedFeedType === "Main Lug" ? (
                        <ListGroupItem>
                            <strong>Feed Position:</strong> {configuration.SelectedFeedPosition}
                        </ListGroupItem>
                    ):
                    (null)}

                </Col>

                    <Col>
                    <Card.Title>Selected Breakers</Card.Title>

                    {configuration.SelectedBreakers.map((item, index) => (
                        <ListGroup.Item key={index}>
                        <Row>
                            <Col>{item.Description}</Col>

                            <Col>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                Details
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                <Dropdown.Item>Max Amp: {item.Max_Amperage}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            </Col>
                        </Row>
                        </ListGroup.Item>
                    ))}

                    </Col>
                    <Col>
                    <Card.Title>Order Details</Card.Title>
                    <ListGroupItem>
                        <strong>Order status:</strong>{' '}
                        {configuration.order_confirmed ? <p>Confirmed</p> : <Col><Row><p>Not Confirmed yet</p></Row><Row><ConfirmOrderButton></ConfirmOrderButton></Row></Col>}
                    </ListGroupItem>
                    </Col>
                </Row>

            </ListGroup>
            
        </Card>
    );
};

export default ConfigReview;




