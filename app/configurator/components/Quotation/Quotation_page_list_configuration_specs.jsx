import React, { useState } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'; // Make sure to import necessary Bootstrap components
import MapSelectedBreakers from '../../../account/components/adminSavedConfigsSelectedBreakersMap'; // Assuming MapSelectedBreakers is a valid component

const ConfigReview = ({ configuration }) => {
    const [expandedConfig, setExpandedConfig] = useState(null);

    const toggleExpansion = (configId) => {
        setExpandedConfig(expandedConfig === configId ? null : configId);
    };
    
    return (
        <Card>
            <Card.Title onClick={() => toggleExpansion(configuration.id)}>
                Overview
            </Card.Title>
            <ListGroup>
                <>
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
                    <Card.Title>Selected Breakers</Card.Title>
                    {/* <MapSelectedBreakers config_state={configuration.SelectedBreakers} /> */}
                    <Card.Title>Order Details</Card.Title>
                    <ListGroupItem>
                        <strong>Order status:</strong>{' '}
                        {configuration.order_confirmed ? 'Confirmed' : 'Not confirmed'}
                    </ListGroupItem>
                </>

            </ListGroup>
        </Card>
    );
};

export default ConfigReview;




