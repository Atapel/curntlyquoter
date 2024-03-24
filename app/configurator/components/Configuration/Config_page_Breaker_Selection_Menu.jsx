import React, { useEffect, useState } from "react";
import { Alert, Dropdown, Button, Row, ListGroup, Col, ListGroupItem } from "react-bootstrap";
import { getBreakerDetails } from "../../../api_requests/fetch_products";
import { UseConfigurationReducerContext, UseBreakerReducerContext } from "@/app/context/globalContext.jsx";
import DisplaySelectedItems from "./Config_page_Selected_Breakers_List";
import BreakerMappings from "./BreakerMappings";

const Select_Breakers_Menu = () => {
  const { state, dispatch } = UseConfigurationReducerContext();
  const { breakerState, breakerDispatch } = UseBreakerReducerContext()
  const [renderSelectedBrakers, setrenderSelectedBrakers] = useState(false);
  const [disableButtonState, setDisableButtonState] = useState(false)
  const [showAddButton, setShowAddButton] = useState(true)

  const handleProductSelect = (product) => {
    dispatch({ type: 'ADD_BREAKER', payload: breakerState })
    // Ativate the Component that lists the selected Breakers
    // setrenderSelectedBrakers(true)
    // reset the states back to original
    breakerDispatch({ type: 'RESET_BREAKER_STATE' })

  };

  return (
    <div>
      <ListGroup>
        <ListGroup.Item>
          <h2>Configure Breaker: </h2>
        </ListGroup.Item>

        <ListGroup.Item>
          {/* Dropdown for Breaker Size */}
          <Dropdown>
            <Row>
              <Col>
                <h5>Breaker Frame (AF):</h5>
              </Col>
              <Col>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {breakerState.SelectedSize}
                </Dropdown.Toggle>
              </Col>
            </Row>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Button
                  onClick={() => breakerDispatch({ type: 'SET_SELECTED_SIZE', payload: "Single" })}
                  variant="outline-info"
                  size="sm"
                  className="w-100"
                >
                  Single
                </Button>
              </Dropdown.Item>
              <Dropdown.Item>
                <Button
                  onClick={() => breakerDispatch({ type: 'SET_SELECTED_SIZE', payload: "Double" })}
                  variant="outline-info"
                  size="sm"
                  className="w-100"
                >
                  Double
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>

        <ListGroup.Item>
          {/* Dropdown for the Breaker Trip */}
          <Dropdown>
            <Row>
              <Col>
                <h5>Breaker Trip (AT):</h5>
              </Col>
              <Col>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {breakerState.SelectedTrip} AT
                </Dropdown.Toggle>
              </Col>
            </Row>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Button
                  onClick={() => breakerDispatch({ type: 'SET_SELECTED_TRIP', payload: 600 })}
                  variant="outline-info"
                  size="sm"
                  className="w-100"
                >
                  600 AT
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>

        <ListGroup.Item>
          {/* Dropdown for Breaker */}
          <Dropdown>
            <Row>
              <Col>
                <h5>Breaker:</h5>
              </Col>
              <Col>
                <Dropdown.Toggle
                  variant="primary"
                  id="dropdown-basic"
                  disabled={breakerState.SelectedSize === "Select Breaker Size"}
                >
                  {breakerState.SelectedBreaker.Description}
                </Dropdown.Toggle>
              </Col>
            </Row>
            
            <BreakerMappings addButtonState={[showAddButton, setShowAddButton]}/>

          </Dropdown>
        </ListGroup.Item>


        {/* Conditionally rendering the next 3 menu items only if a breaker has been selected above */}


        {breakerState.SelectedBreaker.Description !== "Select Breaker" ?
          (<>
            <ListGroup.Item>
              {/* Dropdown for the Breaker Amperage */}
              <Dropdown>
                <Row>
                  <Col>
                    <h5>Breaker Amperage:</h5>
                  </Col>
                  <Col>
                    <Dropdown.Toggle 
                      variant="primary" 
                      id="dropdown-basic"
                    >
                      {breakerState.SelectedBreakerAmp}
                    </Dropdown.Toggle>
                  </Col>
                </Row>

                <Dropdown.Menu>

                  {breakerState.SelectedBreaker.AmperageOptions.map((amperage, index) => (

                    <Dropdown.Item>
                      <Button
                        onClick={() => breakerDispatch({ type: 'SET_SELECTED_BREAKER_AMP', payload: amperage })}
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                      >
                        {amperage}
                      </Button>
                    </Dropdown.Item>

                  ))}

                </Dropdown.Menu>
              </Dropdown>
            </ListGroup.Item>

            <ListGroup.Item>
              {/* Dropdown for the Breaker Poles */}
              <Dropdown>
                <Row>
                  <Col>
                    <h5>Breaker Poles:</h5>
                  </Col>
                  <Col>
                    <Dropdown.Toggle 
                      variant="primary" 
                      id="dropdown-basic"
                      disabled={breakerState.SelectedBreakerAmp === "Select Amperage"}  
                    >
                      {breakerState.SelectedBreakerPoles}
                    </Dropdown.Toggle>
                  </Col>
                </Row>

                <Dropdown.Menu>

                  {breakerState.SelectedBreaker.PolesOptions.map((pole, index) => (

                    <Dropdown.Item>
                      <Button
                        onClick={() => breakerDispatch({ type: 'SET_SELECTED_BREAKER_POLES', payload: pole })}
                        variant="outline-info"
                        size="sm"
                        className="w-100"
                      // onClick={() => setSelectedBreakerAmp(600)}
                      >
                        {pole}
                      </Button>
                    </Dropdown.Item>

                  ))}

                </Dropdown.Menu>
              </Dropdown>
            </ListGroup.Item>

            <ListGroup.Item>
              {/* Dropdown for the Breaker Trip */}
              <Dropdown>
                <Row>
                  <Col>
                    <h5>Add Feature:</h5>
                  </Col>
                  <Col>
                    <Dropdown.Toggle 
                      variant="primary" 
                      id="dropdown-basic"
                      disabled={breakerState.SelectedBreakerPoles === "Select Poles"}
                    >
                      {breakerState.SelectedFeature}
                    </Dropdown.Toggle>
                  </Col>
                </Row>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Button
                      onClick={() => breakerDispatch({ type: 'SET_SELECTED_FEATURE', payload: 69 })}
                      variant="outline-info"
                      size="sm"
                      className="w-100"
                    // onClick={() => setSelectedFeature("Shunt trip selected")}
                    >
                      Add Shunt Trip
                    </Button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ListGroup.Item>

          </>) :
        (
          null
        )}

        <ListGroup.Item>
          {/* Add Breaker to Preview */}
          {showAddButton === true ? (
          <Button
            variant="outline-info"
            size="sm"
            className="w-100"
            onClick={() => handleProductSelect()}
            disabled={breakerState.SelectedBreakerPoles==="Select Poles"}
          >
            Add
          </Button>
        ):(
          <Alert variant="warning">
            No more Breakers available
          </Alert>
        )}
        </ListGroup.Item>

      </ListGroup>

      {/* Below line fixes the conditional rendering error, but introduces new TypeError, to be continued... */}
      {/* {(renderSelectedBrakers === true && state.Configuration.SelectedBreakers.length() == 0 )? ( */}
      
      {/* {(renderSelectedBrakers === true)? ( */}
        <DisplaySelectedItems />
        {/* renderstate={[renderSelectedBrakers, setrenderSelectedBrakers]} */}
      {/* ) : (
        null
      )} */}

    </div>
  );
};

export default Select_Breakers_Menu;  
