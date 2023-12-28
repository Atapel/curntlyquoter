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
          <h2>Currently selected frame: </h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>
              <h5>Selected Frame Size:</h5>
            </Col>
            <Col>{state.Configuration.SelectedFrameSize}" Inch</Col>
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
            <Col>{state.Configuration.SelectedBusRating}</Col>
          </Row>
        </ListGroup.Item>

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
