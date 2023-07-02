import React, { useContext, useState } from "react";
import {
  Dropdown,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Configuration_Frame_Context } from "../selected_items_context.jsx";
import DisplaySelectedFrame from "./Selected_Frame_Preview.jsx";

const Select_Panel_Menu = () => {
  const { Selected_Panel, set_Selected_Panel } = useContext(
    Configuration_Frame_Context
  );

  const [Selected_Frame_Size, setSelected_Frame_Size] =
    useState("Select Width");
  const [Selected_Voltage, setSelected_Voltage] = useState("Select Voltage");
  const [Selected_KAIC_rating, setSelected_KAIC_rating] =
    useState("Select KAIC Rating");
  const [Selected_Bus_rating, setSelected_Bus_rating] =
    useState("Select Bus Rating");

  const handleProductSelect = () => {
    set_Selected_Panel({
      Frame_Size: Selected_Frame_Size,
      Voltage: Selected_Voltage,
      KAIC_rating: Selected_KAIC_rating,
      Bus_rating: Selected_Bus_rating,
    });
  };

  return (
    <div>
      {Selected_Panel.length === 0 ? (
        <ListGroup>
          <ListGroup.Item>
            <h2>Configure Panel: </h2>
          </ListGroup.Item>
          <ListGroup.Item>
            {/* Dropdown for Frame Size */}
            <Dropdown>
              <Row>
                <Col>
                  <h5>Selected Width:</h5>
                </Col>
                <Col>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {Selected_Frame_Size}
                  </Dropdown.Toggle>
                </Col>
              </Row>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <Button
                    variant="outline-info"
                    size="sm"
                    className="w-100"
                    onClick={() => setSelected_Frame_Size(36)}
                  >
                    36
                  </Button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Button
                    variant="outline-info"
                    size="sm"
                    className="w-100"
                    onClick={() => setSelected_Frame_Size(46)}
                  >
                    46
                  </Button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ListGroup.Item>

          <ListGroup.Item>
            {/* Dropdown for Voltage */}
            <Dropdown>
              <Row>
                <Col>
                  <h5>Selected Voltage</h5>
                </Col>
                <Col>
                  <Dropdown.Toggle
                    variant="primary"
                    id="dropdown-basic"
                    disabled={Selected_Frame_Size === "Select Width"}
                  >
                    {Selected_Voltage}
                  </Dropdown.Toggle>
                </Col>
              </Row>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Button
                    variant="outline-info"
                    size="sm"
                    className="w-100"
                    onClick={() => setSelected_Voltage("208Y/120V")}
                  >
                    208Y/120V
                  </Button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Button
                    variant="outline-info"
                    size="sm"
                    className="w-100"
                    onClick={() => setSelected_Voltage("480Y/270V")}
                  >
                    480Y/270V
                  </Button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ListGroup.Item>

          <ListGroup.Item>
            {/* Dropdown for KAIC rating */}
            <Dropdown>
              <Row>
                <Col>
                  <h5>Selected KAIC rating:</h5>
                </Col>
                <Col>
                  <Dropdown.Toggle
                    variant="primary"
                    id="dropdown-basic"
                    disabled={Selected_Voltage === "Select Voltage"}
                  >
                    {Selected_KAIC_rating}
                  </Dropdown.Toggle>
                </Col>
              </Row>
              <Dropdown.Menu>
                {Selected_Voltage === "208Y/120V" ? (
                  <>
                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => setSelected_KAIC_rating(65)}
                      >
                        65
                      </Button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => setSelected_KAIC_rating(100)}
                      >
                        100
                      </Button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => setSelected_KAIC_rating(150)}
                      >
                        150
                      </Button>
                    </Dropdown.Item>
                  </>
                ) : Selected_Voltage === "480Y/270V" ? (
                  <>
                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => setSelected_KAIC_rating(35)}
                      >
                        35
                      </Button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => setSelected_KAIC_rating(65)}
                      >
                        65
                      </Button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => setSelected_KAIC_rating(100)}
                      >
                        100
                      </Button>
                    </Dropdown.Item>
                  </>
                ) : null}
              </Dropdown.Menu>
            </Dropdown>
          </ListGroup.Item>

          <ListGroup.Item>
            {/* Dropdown for Bus rating */}
            <Dropdown>
              <Row>
                <Col>
                  <h5>Selected Bus rating:</h5>
                </Col>
                <Col>
                  <Dropdown.Toggle
                    variant="primary"
                    id="dropdown-basic"
                    disabled={Selected_KAIC_rating === "Select KAIC Rating"}
                  >
                    {Selected_Bus_rating}
                  </Dropdown.Toggle>
                </Col>
              </Row>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Button
                    variant="outline-info"
                    size="sm"
                    className="w-100"
                    onClick={() => setSelected_Bus_rating("750A")}
                  >
                    750A
                  </Button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Button
                    variant="outline-info"
                    size="sm"
                    className="w-100"
                    onClick={() => setSelected_Bus_rating("1500A")}
                  >
                    1500A
                  </Button>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Button
                    variant="outline-info"
                    size="sm"
                    className="w-100"
                    onClick={() => setSelected_Bus_rating("2250A")}
                  >
                    2250A
                  </Button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ListGroup.Item>
          <ListGroupItem>
            <Button
              variant="outline-info"
              size="sm"
              className="w-100"
              onClick={() => handleProductSelect()}
              disabled={Selected_Bus_rating === "Select Bus Rating"}
            >
              Add
            </Button>
          </ListGroupItem>
        </ListGroup>
      ) : (
        <DisplaySelectedFrame />
      )}
    </div>
  );
};

export default Select_Panel_Menu;
