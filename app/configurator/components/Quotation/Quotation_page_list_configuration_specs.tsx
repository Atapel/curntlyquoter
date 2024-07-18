import {
  Alert,
  Card,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap"; // Make sure to import necessary Bootstrap components
import DisplaySelectedPanel from "@global_components/selectedPanel";
import ConfirmOrderButton from "./Quotation_page_order_button";
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
            <DisplaySelectedPanel
              Id={state.Metadata.DatabaseID}
              Width={state.Configuration.SelectedFrameSize}
              Height={state.Configuration.SelectedPanelHeight}
              Voltage={state.Configuration.SelectedVoltage}
              KAIC={state.Configuration.SelectedKAICRating}
              Bus={state.Configuration.SelectedBusRating}
              ServiceDistribution={
                state.Configuration.SelectedServiceDistribution
              }
              FeedType={state.Configuration.SelectedFeedType}
              FeedThruLugs={state.Configuration.FeedThruLugs}
              FeedPosition={state.Configuration.SelectedFeedPosition}
            />
          </Col>

          <Col>
            <Card.Title>Selected Breakers</Card.Title>

            {state.Configuration.SelectedBreakers &&
              state.Configuration.SelectedBreakers.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col>{item.BreakerDisplayName}</Col>
                    <Col>{item.SelectedHeight}</Col>
                    <Col>
                      Availability:
                      {
                        // item.InStock
                        true ? (
                          <Alert variant={"success"}>In Stock</Alert>
                        ) : (
                          <Alert variant={"success"}>Out of Stock</Alert>
                        )
                      }
                    </Col>

                    <Col>
                      <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                          Details
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            Max Amp: {item.SelectedBreaker.MaxAmp}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}

            {state.Configuration.SelectedBreakers.length === 0 && (
              <div className="alert alert-warning">No breakers selected</div>
            )}
          </Col>
          <Col>
            <Card.Title>Order Details</Card.Title>
            <ListGroupItem>
              <strong>Order status:</strong>{" "}
              {state.Pricing.OrderConfirmed ? (
                <p>Confirmed</p>
              ) : (
                <Col>
                  <Row>
                    <p>Not Confirmed yet</p>
                  </Row>
                  <Row>
                    <ConfirmOrderButton></ConfirmOrderButton>
                  </Row>
                </Col>
              )}
            </ListGroupItem>
          </Col>
        </Row>
      </ListGroup>
    </Card>
  );
};

export default ConfigReview;
