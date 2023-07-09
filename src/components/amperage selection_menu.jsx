import React, { useState } from "react";
import { Dropdown, Button, Row, ListGroup, Col, Form } from "react-bootstrap";

const Select_Amperage_Menu = ({ max_amperage, setMaxAmperage }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSaveButtonClick = () => {
    let new_max_amp = parseInt(inputValue, 10)
    setMaxAmperage(new_max_amp);
    setInputValue(""); // reset the input value
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <ListGroup.Item>
        <Dropdown>
          <Row>
            <Col>
              <h5>Selected max amperage:</h5>
            </Col>
            <Col>
              {max_amperage === 0 ? (
                <Form>
                  <Row>
                    <Col>
                      <Form.Control
                        type="number"
                        placeholder="Enter amperage"
                        value={inputValue}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col>
                      <Button variant="primary" onClick={handleSaveButtonClick}>
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              ) : (
                <Row>
                  <Col>{max_amperage}Amp</Col>
                  <Col>
                    <Button variant="primary" onClick={() => setMaxAmperage(0)}>
                      Edit
                    </Button>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </Dropdown>
      </ListGroup.Item>
    </div>
  );
};

export default Select_Amperage_Menu;

