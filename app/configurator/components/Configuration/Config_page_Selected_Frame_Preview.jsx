import React from "react";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import { UseConfigurationReducerContext } from "@/app/context/globalContext.jsx";

const DisplaySelectedFrame = (props) => {
  const { state, dispatch } = UseConfigurationReducerContext();
  const [panelSelected, setPanelSelected] = props.renderstate;

  const handleReset = () => {
    dispatch({ type: 'RESET_CONFIGURATION' })
    setPanelSelected(false)
  }

  return (
    <div>
      <ListGroup>
        <ListGroup.Item>
          <h2>Currently Selected Frame: </h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>
              <h5>Selected Width:</h5>
            </Col>
            <Col>{state.Configuration.SelectedFrameSize}"</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>
              <h5>Selected Height:</h5>
            </Col>
            <Col>{state.Configuration.SelectedPanelHeight}"</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>
              <h5>Selected Voltage:</h5>
            </Col>
            <Col>{state.Configuration.SelectedVoltage}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>
              <h5>Selected KAIC rating:</h5>
            </Col>
            <Col>{state.Configuration.SelectedKAICRating}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>
              <h5>Selected Bus rating:</h5>
            </Col>
            <Col>{state.Configuration.SelectedBusRating}A</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>
              <h5>Service or Distribution:</h5>
            </Col>
            <Col>{state.Configuration.SelectedServiceDistribution}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>
              <h5>Feed Type:</h5>
            </Col>
            <Col>{state.Configuration.SelectedFeedType}</Col>
          </Row>
        </ListGroup.Item>

        {state.Configuration.SelectedFeedType === "Main Breaker" ? (
          <ListGroup.Item>
            <Row>
              <Col>
                <h5>Feed thru lugs:</h5>
              </Col>
              <Col>
                {state.Configuration.FeedThruLugs ? "Yes" : "No"}
              </Col>
            </Row>
          </ListGroup.Item>
        ): state.Configuration.SelectedFeedType === "Main Lug" ? (
          <ListGroup.Item>
            <Row>
              <Col>
                <h5>Feed Position:</h5>
              </Col>
              <Col>{state.Configuration.SelectedFeedPosition}</Col>
            </Row>
          </ListGroup.Item>
        ):
        (null)}
      
        <ListGroup.Item>
          <Button
            variant="outline-danger"
            className="w-100"
            onClick={() => handleReset()}
          >
            Reset
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default DisplaySelectedFrame;
