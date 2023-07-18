import React, { useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { UseFrameContext } from "@/app/context/globalContext";

const DisplaySelectedFrame = () => {
  const { Selected_Panel, set_Selected_Panel } = UseFrameContext();

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
            <Col>{Selected_Panel.Frame_Size}" Inch</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>
              <h5>Selected Voltage:</h5>
            </Col>
            <Col>{Selected_Panel.Voltage}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>
              <h5>Selected KAIC rating:</h5>
            </Col>
            <Col>{Selected_Panel.KAIC_rating}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>
              <h5>Selected Bus rating:</h5>
            </Col>
            <Col>{Selected_Panel.Bus_rating}</Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Button
            variant="outline-danger"
            className="w-100"
            onClick={() => set_Selected_Panel([])}
          >
            Delete
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default DisplaySelectedFrame;
