"use client"
import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Row, Col, Container, ListGroup } from "react-bootstrap";
import { User_Input_Context } from "../../context/globalContext";

const NewConfigInput = () => {
  const { User_Input, setUser_Input } = User_Input_Context();
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    setUser_Input({
      ...User_Input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(User_Input).some((value) => value === "")) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      console.log(User_Input);
    }
  };

  const isFormIncomplete = Object.values(User_Input).some(
    (value) => value === ""
  );

  return (
    <>
      <ListGroup>
        <ListGroup.Item>
          <h2>New configuration</h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <Form onSubmit={handleSubmit}>
            <Container>
              <Form.Group controlId="formClient">
                <Row>
                  <Col>
                    <Form.Label>Client</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      name="client"
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Container>

            <Container>
              <Form.Group controlId="formProject">
                <Row>
                  <Col>
                    <Form.Label>Project</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      name="project"
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Container>

            <Container>
              <Form.Group controlId="formDrawingDate">
                <Row>
                  <Col>
                    <Form.Label>Drawing Date</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      type="date"
                      name="drawingDate"
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Container>

            <Container>
              <Form.Group controlId="formDrawnBy">
                <Row>
                  <Col>
                    <Form.Label>Drawn By</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      name="drawnBy"
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Container>
            <Button variant="primary" type="submit" disabled={isFormIncomplete}>
              Submit
            </Button>
          </Form>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default NewConfigInput;