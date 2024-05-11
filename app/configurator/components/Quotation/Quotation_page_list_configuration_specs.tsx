import { Card, ListGroup, ListGroupItem, Row, Col, Dropdown } from 'react-bootstrap'; // Make sure to import necessary Bootstrap components
import ConfirmOrderButton from './Quotation_page_order_button';
import { UseConfigurationReducerContext } from "@context/globalContext";
const ConfigReview = () => {
    const { state, dispatch } = UseConfigurationReducerContext();
    // Fix bug where Breake gets added from Breaker state to config.selected breakers rather than just pushing the product element from the products array
    return (
        <Card>
            <ListGroup>
                <Row>
                <Col>
                    <Card.Title>Selected Switchboard</Card.Title>
                    <ListGroupItem data-testid={`${state.Metadata.Project}-Width`}>
                        <strong>Width:</strong> {state.Configuration.SelectedFrameSize}
                    </ListGroupItem>
                    <ListGroupItem data-testid={`${state.Metadata.Project}-Voltage`}>
                        <strong>Voltage:</strong> {state.Configuration.SelectedVoltage}
                    </ListGroupItem>
                    <ListGroupItem data-testid={`${state.Metadata.Project}-Kaic`}>
                        <strong>KAIC rating:</strong> {state.Configuration.SelectedKAICRating}
                    </ListGroupItem>
                    <ListGroupItem data-testid={`${state.Metadata.Project}-Bus`}>
                        <strong>Bus rating:</strong> {state.Configuration.SelectedBusRating}
                    </ListGroupItem>
                    <ListGroupItem data-testid={`${state.Metadata.Project}-Height`}>
                        <strong>Panel Height:</strong> {state.Configuration.SelectedPanelHeight}
                    </ListGroupItem>
                    <ListGroupItem data-testid={`${state.Metadata.Project}-ServiceDistribution`}>
                        <strong>Service Distribution:</strong>{' '}
                        {state.Configuration.SelectedServiceDistribution}
                    </ListGroupItem>
                    <ListGroupItem data-testid={`${state.Metadata.Project}-FeedType`}>
                        <strong>Feed Type:</strong> {state.Configuration.SelectedFeedType}
                    </ListGroupItem>
                    
                    {state.Configuration.SelectedFeedType === "Main Breaker" ? (
                        <ListGroupItem data-testid={`${state.Metadata.Project}-FeedThruLugs`}>
                            <strong>Feed Thru Lugs:</strong> {state.Configuration.FeedThruLugs ? "Yes" : "No"}
                        </ListGroupItem>
                    ): state.Configuration.SelectedFeedType === "Main Lug" ? (
                        <ListGroupItem data-testid={`${state.Metadata.Project}-FeedPosition`}>
                            <strong>Feed Position:</strong> {state.Configuration.SelectedFeedPosition}
                        </ListGroupItem>
                    ):
                    (null)}

                </Col>

                    <Col>
                    <Card.Title>Selected Breakers</Card.Title>

                    {state.Configuration.SelectedBreakers && state.Configuration.SelectedBreakers.map((item, index) => (
                        <ListGroup.Item key={index}>
                        <Row>
                            <Col>{item.SelectedBreaker.Description}</Col>
                            <Col>{item.BreakerSize}</Col>
                            <Col>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                Details
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                <Dropdown.Item>Max Amp: {item.SelectedBreaker.MaxAmp}</Dropdown.Item>
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
                        {state.Pricing.OrderConfirmed ? <p>Confirmed</p> : <Col><Row><p>Not Confirmed yet</p></Row><Row><ConfirmOrderButton></ConfirmOrderButton></Row></Col>}
                    </ListGroupItem>
                    </Col>
                </Row>

            </ListGroup>
            
        </Card>
    );
};

export default ConfigReview;




