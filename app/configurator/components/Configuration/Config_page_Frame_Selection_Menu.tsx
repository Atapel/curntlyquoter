import React, { useEffect } from "react";
import {
  Dropdown,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import { selectableFrameOptions } from "../../assets/FrameSelectionOptions";
import { UseConfigurationReducerContext } from "@context/globalContext";
import DisplaySelectedFrame from "./Config_page_Selected_Frame_Preview";

function Select_Panel_Menu(props) {
  const [panelSelected, setPanelSelected] = props.renderstate;
  const { state, dispatch } = UseConfigurationReducerContext();

  useEffect(() => {
    if (state.Metadata.ResumeDraft) {
      setPanelSelected(true);
    }
  }, []);

  return (
    <>
      {panelSelected === false ? (
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
                  <Dropdown.Toggle
                    data-testid="Dropdown-Width"
                    variant="primary"
                    id="dropdown-basic"
                  >
                    {state.Configuration.SelectedFrameSize}
                  </Dropdown.Toggle>
                </Col>
              </Row>

              <Dropdown.Menu>
                {selectableFrameOptions.frameSize.map((framesize) => (
                  <Dropdown.Item key={framesize}>
                    <Button
                      data-testid={`selection-${framesize}`}
                      variant="outline-info"
                      size="sm"
                      className="w-100"
                      onClick={() =>
                        dispatch({ type: "SET_FRAME_SIZE", payload: framesize })
                      }
                    >
                      {framesize}
                    </Button>
                  </Dropdown.Item>
                ))}
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
                    data-testid="Dropdown-Height"
                    variant="primary"
                    id="dropdown-basic"
                    disabled={
                      state.Configuration.SelectedFrameSize === "Select Width"
                    }
                  >
                    {state.Configuration.SelectedPanelHeight}
                  </Dropdown.Toggle>
                </Col>
              </Row>
              <Dropdown.Menu>
                {selectableFrameOptions.panelHeight.map((panelHeight) => (
                  <Dropdown.Item key={panelHeight}>
                    <Button
                      data-testid={`selection-${panelHeight}`}
                      variant="outline-info"
                      size="sm"
                      className="w-100"
                      onClick={() =>
                        dispatch({
                          type: "SET_PANEL_HEIGHT",
                          payload: panelHeight,
                        })
                      }
                    >
                      {panelHeight}
                    </Button>
                  </Dropdown.Item>
                ))}
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
                    data-testid="Dropdown-Voltage"
                    variant="primary"
                    id="dropdown-basic"
                    disabled={
                      state.Configuration.SelectedPanelHeight ===
                      "Select Height"
                    }
                  >
                    {state.Configuration.SelectedVoltage}
                  </Dropdown.Toggle>
                </Col>
              </Row>
              <Dropdown.Menu>
                {selectableFrameOptions.voltage.map((voltage) => (
                  <Dropdown.Item key={voltage}>
                    <Button
                      data-testid={`selection-${voltage}`}
                      variant="outline-info"
                      size="sm"
                      className="w-100"
                      onClick={() =>
                        dispatch({ type: "SET_VOLTAGE", payload: voltage })
                      }
                    >
                      {voltage}
                    </Button>
                  </Dropdown.Item>
                ))}
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
                    data-testid="Dropdown-Kaic"
                    variant="primary"
                    id="dropdown-basic"
                    disabled={
                      state.Configuration.SelectedVoltage === "Select Voltage"
                    }
                  >
                    {state.Configuration.SelectedKAICRating}
                  </Dropdown.Toggle>
                </Col>
              </Row>
              <Dropdown.Menu>
                {state.Configuration.SelectedVoltage === "208Y/120V" ? (
                  <>
                    {selectableFrameOptions.kaicRating["208Y/120V"].map(
                      (kaicRating) => (
                        <Dropdown.Item key={kaicRating}>
                          <Button
                            data-testid={`selection-${kaicRating}`}
                            variant="outline-info"
                            size="sm"
                            className="w-100"
                            onClick={() =>
                              dispatch({
                                type: "SET_KAIC_RATING",
                                payload: kaicRating,
                              })
                            }
                          >
                            {kaicRating}
                          </Button>
                        </Dropdown.Item>
                      )
                    )}
                  </>
                ) : state.Configuration.SelectedVoltage === "480Y/270V" ? (
                  <>
                    {selectableFrameOptions.kaicRating["480Y/270V"].map(
                      (kaicRating) => (
                        <Dropdown.Item key={kaicRating}>
                          <Button
                            data-testid={`selection-${kaicRating}`}
                            variant="outline-info"
                            size="sm"
                            className="w-100"
                            onClick={() =>
                              dispatch({
                                type: "SET_KAIC_RATING",
                                payload: kaicRating,
                              })
                            }
                          >
                            {kaicRating}
                          </Button>
                        </Dropdown.Item>
                      )
                    )}
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
                    data-testid="Dropdown-Bus"
                    variant="primary"
                    id="dropdown-basic"
                    disabled={
                      state.Configuration.SelectedKAICRating ===
                      "Select KAIC Rating"
                    }
                  >
                    {state.Configuration.SelectedBusRating}
                  </Dropdown.Toggle>
                </Col>
              </Row>
              <Dropdown.Menu>
                {selectableFrameOptions.busRating.map((busRating) => (
                  <Dropdown.Item key={busRating}>
                    <Button
                      data-testid={`selection-${busRating}`}
                      variant="outline-info"
                      size="sm"
                      className="w-100"
                      onClick={() =>
                        dispatch({ type: "SET_BUS_RATING", payload: busRating })
                      }
                    >
                      {busRating}
                    </Button>
                  </Dropdown.Item>
                ))}
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
                    data-testid="Dropdown-DistService"
                    variant="primary"
                    id="dropdown-basic"
                    disabled={
                      state.Configuration.SelectedBusRating ===
                      "Select Bus Rating"
                    }
                  >
                    {state.Configuration.SelectedServiceDistribution}
                  </Dropdown.Toggle>
                </Col>
              </Row>
              <Dropdown.Menu>
                {selectableFrameOptions.serviceDistribution.map(
                  (serviceDistribution) => (
                    <Dropdown.Item key={serviceDistribution}>
                      <Button
                        data-testid={`selection-${serviceDistribution}`}
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() =>
                          dispatch({
                            type: "SET_SERVICE_OR_DISTRIBUTION",
                            payload: serviceDistribution,
                          })
                        }
                      >
                        {serviceDistribution}
                      </Button>
                    </Dropdown.Item>
                  )
                )}
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
                    data-testid="Dropdown-Feed"
                    variant="primary"
                    id="dropdown-basic"
                    disabled={
                      state.Configuration.SelectedServiceDistribution ===
                      "Select Service or Distribution"
                    }
                  >
                    {state.Configuration.SelectedFeedType}
                  </Dropdown.Toggle>
                </Col>
              </Row>
              <Dropdown.Menu>
                {selectableFrameOptions.feedType.map((feedType) => (
                  <Dropdown.Item key={feedType}>
                    <Button
                      data-testid={`selection-${feedType}`}
                      variant="outline-info"
                      size="sm"
                      className="w-100"
                      onClick={() =>
                        dispatch({ type: "SET_FEED_TYPE", payload: feedType })
                      }
                    >
                      {feedType}
                    </Button>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </ListGroup.Item>

          {state.Configuration.SelectedFeedType === "Main Lug" ? (
            <ListGroup.Item>
              {/* Dropdown for Feed Position */}
              <Dropdown>
                <Row>
                  <Col>
                    <h5>Selected Feed Position:</h5>
                  </Col>
                  <Col>
                    <Dropdown.Toggle
                      data-testid="Dropdown-Position"
                      variant="primary"
                      id="dropdown-basic"
                      // disabled={state.Configuration.MainLug === false}
                    >
                      {state.Configuration.SelectedFeedPosition}
                    </Dropdown.Toggle>
                  </Col>
                </Row>
                <Dropdown.Menu>
                  {selectableFrameOptions.feedPosition.map((feedPosition) => (
                    <Dropdown.Item key={feedPosition}>
                      <Button
                        data-testid={`selection-${feedPosition}`}
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                        onClick={() =>
                          dispatch({
                            type: "SET_FEED_POSITION",
                            payload: feedPosition,
                          })
                        }
                      >
                        {feedPosition}
                      </Button>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </ListGroup.Item>
          ) : state.Configuration.SelectedFeedType === "Main Breaker" ? (
            <ListGroup.Item>
              <Row>
                <Col>
                  <h5>Feed Thru Lugs</h5>
                </Col>
                <Col>
                  <Form.Check
                    data-testid="Tickbox-lugs"
                    type="checkbox"
                    onClick={() => {
                      dispatch({
                        type: "SET_FEED_THRU_LUGS",
                        payload: !state.Configuration.FeedThruLugs,
                      });
                    }}
                  />
                </Col>
              </Row>
            </ListGroup.Item>
          ) : (
            <></>
          )}

          <ListGroupItem>
            <Button
              data-testid="Add-Frame"
              variant="outline-info"
              size="sm"
              className="w-100"
              onClick={() => setPanelSelected(true)}
              disabled={
                (state.Configuration.SelectedFeedPosition ===
                  "Select Feed Position" &&
                  state.Configuration.SelectedFeedType === "Main Lug") ||
                state.Configuration.SelectedFeedType === "Select Feed Type"
              }
            >
              Add
            </Button>
          </ListGroupItem>
        </ListGroup>
      ) : (
        <DisplaySelectedFrame renderstate={[panelSelected, setPanelSelected]} />
      )}
    </>
  );
}

export default Select_Panel_Menu;
