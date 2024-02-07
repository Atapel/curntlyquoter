import React from "react";
import {
  Dropdown,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Form
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
                {/* Dropdown for Panel Height */}
                <Dropdown>
                  <Row>
                    <Col>
                      <h5>Selected Panel Height:</h5>
                    </Col>
                    <Col>
                      <Dropdown.Toggle
                        variant="primary"
                        id="dropdown-basic"
                        disabled={state.Configuration.SelectedFrameSize === "Select Width"}
                      >
                        {state.Configuration.SelectedPanelHeight}
                      </Dropdown.Toggle>
                    </Col>
                  </Row>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => dispatch({ type: 'SET_PANEL_HEIGHT', payload: 90 })}
                      >
                        90"
                      </Button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => dispatch({ type: 'SET_PANEL_HEIGHT', payload: 77.5 })}
                      >
                        77.5"
                      </Button>
                    </Dropdown.Item>

                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => dispatch({ type: 'SET_PANEL_HEIGHT', payload: 65 })}
                      >
                        65"
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
                      <h5>Selected Voltage:</h5>
                    </Col>
                    <Col>
                      <Dropdown.Toggle
                        variant="primary"
                        id="dropdown-basic"
                        disabled={state.Configuration.SelectedPanelHeight === "Select Height"}
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
                            onClick={() => dispatch({ type: 'SET_KAIC_RATING', payload: 35 })}
                          >
                            35
                          </Button>
                        </Dropdown.Item>
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
                      </>
                    ) : null}
                  </Dropdown.Menu>
                </Dropdown>
              </ListGroup.Item>

              <ListGroup.Item>
                {/* Dropdown for Bus Rating */}
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
                        onClick={() => dispatch({ type: 'SET_BUS_RATING', payload: 800 })}
                      >
                        800A
                      </Button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => dispatch({ type: 'SET_BUS_RATING', payload: 1500 })}
                      >
                        1500A
                      </Button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => dispatch({ type: 'SET_BUS_RATING', payload: 2250 })}
                      >
                        2250A
                      </Button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ListGroup.Item>

              <ListGroup.Item>
                {/* Dropdown for DistributionSerie */}

                <Dropdown>
                  <Row>
                    <Col>
                      <h5>Distribution or Service: </h5>
                    </Col>
                    <Col>
                      <Dropdown.Toggle
                        variant="primary"
                        id="dropdown-basic"
                        disabled={state.Configuration.SelectedBusRating === "Select Bus Rating"}
                      >
                        {state.Configuration.SelectedServiceDistribution}
                      </Dropdown.Toggle>
                    </Col>
                  </Row>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Button
                        // onClick={() => {
                        //   const currentValue = state.Configuration.FeedThruLugs;
                        //   dispatch({
                        //     type: 'SET_MAIN_LUG',
                        //     payload: !currentValue
                        //   });
                        // }}
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => dispatch({ type: 'SET_SERVICE_OR_DISTRIBUTION', payload: "Distribution" })}
                      >
                        Distribution
                      </Button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => dispatch({ type: 'SET_SERVICE_OR_DISTRIBUTION', payload: "Service" })}
                      >
                        Service
                      </Button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <h5>Feed Thru Lugs</h5>
                  </Col>
                  <Col>
                    <Form.Check
                      type="checkbox"
                      onClick={() => {
                        const currentValue = state.Configuration.FeedThruLugs;
                        dispatch({
                          type: 'SET_FEED_THRU_LUGS',
                          payload: !currentValue
                        });
                      }}
                    />
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {/* Dropdown for Feed Position */}
                <Dropdown>
                  <Row>
                    <Col>
                      <h5>Selected Feed Position:</h5>
                    </Col>
                    <Col>
                      <Dropdown.Toggle
                        variant="primary"
                        id="dropdown-basic"
                        // disabled={state.Configuration.MainLug === false}
                      >
                        {state.Configuration.SelectedFeedPosition}
                      </Dropdown.Toggle>
                    </Col>
                  </Row>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => dispatch({ type: 'SET_FEED_POSITION', payload: "Top" })}
                      >
                        Top
                      </Button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => dispatch({ type: 'SET_FEED_POSITION', payload: "Bottom" })}
                      >
                        Bottom
                      </Button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => dispatch({ type: 'SET_FEED_POSITION', payload: "FeedThru" })}
                      >
                        Feed Thru (Top/Bottom)
                      </Button>
                    </Dropdown.Item>

                  </Dropdown.Menu>
                </Dropdown>
              </ListGroup.Item>

              <ListGroup.Item>
                {/* Dropdown for Feed Type */}
                <Dropdown>
                  <Row>
                    <Col>
                      <h5>Selected Feed Type:</h5>
                    </Col>
                    <Col>
                      <Dropdown.Toggle
                        variant="primary"
                        id="dropdown-basic"
                        // disabled={}
                      >
                        {state.Configuration.SelectedFeedType}
                      </Dropdown.Toggle>
                    </Col>
                  </Row>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => dispatch({ type: 'SET_FEED_TYPE', payload: "Main Breaker" })}
                      >
                        Main Breaker
                      </Button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Button
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() => dispatch({ type: 'SET_FEED_TYPE', payload: "Main Lug" })}
                      >
                        Main Lug
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
            <DisplaySelectedFrame renderstate={[panelSelected, setPanelSelected]} />
          )}
    </div>
  );
};

export default Select_Panel_Menu;