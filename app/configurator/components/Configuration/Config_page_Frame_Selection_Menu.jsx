import React, { useState } from "react";
import {
  Dropdown,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

import { UseConfigurationReducerContext } from "@/app/context/globalContext.jsx";
import DisplaySelectedFrame from "./Config_page_Selected_Frame_Preview.jsx";

function Select_Panel_Menu(props) {
  const [panelSelected, setPanelSelected] = props.renderstate;
  const { state, dispatch } = UseConfigurationReducerContext();

  return (
    <div>
      {
        panelSelected === false
          ? (
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
                        {state.Configuration.SelectedFrameSize}
                      </Dropdown.Toggle>
                    </Col>
                  </Row>

                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => dispatch({ type: 'SET_FRAME_SIZE', payload: 36 })}
                      >
                        36
                      </Button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => dispatch({ type: 'SET_FRAME_SIZE', payload: 46 })}
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
                        disabled={state.Configuration.SelectedFrameSize === "Select Width"}
                      >
                        {state.Configuration.SelectedVoltage}
                      </Dropdown.Toggle>
                    </Col>
                  </Row>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => dispatch({ type: 'SET_VOLTAGE', payload: "208Y/120V" })}
                      >
                        208Y/120V
                      </Button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => dispatch({ type: 'SET_VOLTAGE', payload: "480Y/270V" })}
                      >
                        480Y/270V
                      </Button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ListGroup.Item>

              <ListGroup.Item>
                {/* Dropdown for KAIC kaicRating */}
                <Dropdown>
                  <Row>
                    <Col>
                      <h5>Selected KAIC Rating:</h5>
                    </Col>
                    <Col>
                      <Dropdown.Toggle
                        variant="primary"
                        id="dropdown-basic"
                        disabled={state.Configuration.SelectedVoltage === "Select Voltage"}
                      >
                        {state.Configuration.SelectedKAICRating}
                      </Dropdown.Toggle>
                    </Col>
                  </Row>
                  <Dropdown.Menu>
                    {state.Configuration.SelectedVoltage === "208Y/120V" ? (
                      <>
                        <Dropdown.Item>
                          <Button
                            variant="outline-info"
                            size="sm"
                            className="w-100"
                            onClick={() => dispatch({ type: 'SET_KAIC_RATING', payload: 65 })}
                          >
                            65
                          </Button>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Button
                            variant="outline-info"
                            size="sm"
                            className="w-100"
                            onClick={() => dispatch({ type: 'SET_KAIC_RATING', payload: 100 })}
                          >
                            100
                          </Button>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Button
                            variant="outline-info"
                            size="sm"
                            className="w-100"
                            onClick={() => dispatch({ type: 'SET_KAIC_RATING', payload: 150 })}
                          >
                            150
                          </Button>
                        </Dropdown.Item>
                      </>
                    ) : state.Configuration.SelectedVoltage === "480Y/270V" ? (
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
                {/* Dropdown for Bus kaicRating */}
                <Dropdown>
                  <Row>
                    <Col>
                      <h5>Selected Bus Rating:</h5>
                    </Col>
                    <Col>
                      <Dropdown.Toggle
                        variant="primary"
                        id="dropdown-basic"
                        disabled={state.Configuration.SelectedKAICRating === "Select KAIC Rating"}
                      >
                        {state.Configuration.SelectedBusRating}
                      </Dropdown.Toggle>
                    </Col>
                  </Row>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => dispatch({ type: 'SET_BUS_RATING', payload: "750A" })}
                      >
                        750A
                      </Button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => dispatch({ type: 'SET_BUS_RATING', payload: "1500A" })}
                      >
                        1500A
                      </Button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => dispatch({ type: 'SET_BUS_RATING', payload: "2250A" })}
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
                  onClick={() => setPanelSelected(true)}
                  disabled={state.Configuration.SelectedBusRating === "Select Bus Rating"}
                >
                  Add
                </Button>
              </ListGroupItem>
            </ListGroup>
          ) : (
            <DisplaySelectedFrame renderstate={[panelSelected, setPanelSelected]}/>
          )}
    </div>
  );
};

export default Select_Panel_Menu;