import React, { useEffect, useState } from "react";
import { Alert, Dropdown, Button, Row, ListGroup, Col, ListGroupItem } from "react-bootstrap";
import { getBreakerDetails } from "../../api_requests/fetch_products";
import { UseConfigurationReducerContext, UseBreakerReducerContext } from "@/app/context/globalContext.jsx";
import DisplaySelectedItems from "./Config_page_Selected_Breakers_List";

const Select_Breakers_Menu = () => {
  const { state, dispatch } = UseConfigurationReducerContext();
  const { breakerState, breakerDispatch } = UseBreakerReducerContext()

  const [renderSelectedBrakers, setrenderSelectedBrakers] = useState(false);
  const [disableButtonState, setDisableButtonState] = useState(false)
  const [maxBreakerMsg, setMaxBreakerMsg] = useState(false)



  const handleProductSelect = (product) => {
    dispatch({ type: 'ADD_BREAKER', payload: product })
    // Checking on when to display the max breaker message

    // console.log(maxBreakerMsg, state.Configuration.CurrentBreakersSize);
    // if (product["size"] + state.Configuration.CurrentBreakersSize > state.Configuration.MaxBreakerSize) {
    //   console.log(maxBreakerMsg);
    //   setMaxBreakerMsg(true)
    // }

    // Ativate the Component that lists the selected Breakers
    setrenderSelectedBrakers(true)
    // reset the states back to original
    breakerDispatch({ type: 'RESET_BREAKER_STATE' })

  };


  // useEffect(() => {
  //   // Checking on wether to disable the Add Breaker Button or not
  //   if (
  //     state.Configuration.CurrentBreakersSize + breakerState.SelectedSize >
  //     state.Configuration.MaxBreakerSize
  //     || breakerState.SelectedSize === "Select Breaker Size"
  //     || Selected_Breaker.Description === "Select Breaker"
  //   ) {
  //     setDisableButtonState(true)
  //   } else {
  //     setDisableButtonState(false)
  //   }
  // }, [breakerState.SelectedBreaker, breakerState.SelectedSize])


  let products = [];

  let {
    Single_breakers_46,
    Double_breakers_46,
    Single_breakers_36,
    Double_breakers_36,
  } = getBreakerDetails(state.Configuration);
  if (breakerState.SelectedSize == "Single" && state.Configuration.SelectedFrameSize === 46) {
    products = Single_breakers_46;
  } else if (
    breakerState.SelectedSize == "Single" &&
    state.Configuration.SelectedFrameSize === 36
  ) {
    products = Single_breakers_36;
  } else if (
    breakerState.SelectedSize == "Double" &&
    state.Configuration.SelectedFrameSize === 46
  ) {
    products = Double_breakers_46;
  } else if (
    breakerState.SelectedSize == "Double" &&
    state.Configuration.SelectedFrameSize === 36
  ) {
    products = Double_breakers_36;
  }

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
                // disabled={breakerState.SelectedSize === "Select Breaker Size"}
                >
                  {breakerState.SelectedBreaker.Description}
                </Dropdown.Toggle>
              </Col>
            </Row>
            <Dropdown.Menu>
              {products.map((product, index) => (
                <Dropdown.Item key={index}>
                  <Button
                    onClick={() => breakerDispatch({ type: 'SET_SELECTED_BREAKER', payload: product })}
                    variant="outline-info"
                    size="sm"
                    className="w-100"
                  // onClick={() => setSelected_Breaker(product)}
                  // disabled={state.Configuration.CurrentBreakersSize > state.Configuration.MaxBreakerSize}
                  >
                    {product.Description}
                  </Button>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>


        {/* Conditionally rendering the next 3 menu items only if a breaker has been selected above */}


        {breakerState.SelectedBreaker.Description ==! "Select Breaker" ? 
        (<>
          <p>YEEEEEEEEEEEEEE</p>
        </>) : (<>
          <p>NOOOOOOOOOOO</p>
        </>)}


        <ListGroup.Item>
          {/* Dropdown for the Breaker Amperage */}
          <Dropdown>
            <Row>
              <Col>
                <h5>Breaker Amperage:</h5>
              </Col>
              <Col>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {breakerState.SelectedBreakerAmp}
                </Dropdown.Toggle>
              </Col>
            </Row>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Button
                  onClick={() => breakerDispatch({ type: 'SET_SELECTED_BREAKER_AMP', payload: 69 })}
                  variant="outline-info"
                  size="sm"
                  className="w-100"
                // onClick={() => setSelectedBreakerAmp(600)}
                >

                </Button>
              </Dropdown.Item>
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
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {breakerState.SelectedBreakerPoles}
                </Dropdown.Toggle>
              </Col>
            </Row>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Button
                  onClick={() => breakerDispatch({ type: 'SET_SELECTED_BREAKER_AMP', payload: 69 })}
                  variant="outline-info"
                  size="sm"
                  className="w-100"
                // onClick={() => setSelectedBreakerAmp(600)}
                >

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
                <h5>Add Feature:</h5>
              </Col>
              <Col>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
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
        {/* ##################################################################### */}

        <ListGroup.Item>
          {/* Add Breaker to Preview */}
          <Button
            variant="outline-info"
            size="sm"
            className="w-100"
            onClick={() => handleProductSelect(breakerState.SelectedBreaker)}
            disabled={disableButtonState}
          >
            Add
          </Button>
          {maxBreakerMsg === true ? (<Alert variant="warning">
            No more Breakers available
          </Alert>) : (null)}
        </ListGroup.Item>
      </ListGroup>

      {renderSelectedBrakers === true ? (
        <DisplaySelectedItems renderstate={[renderSelectedBrakers, setrenderSelectedBrakers]} />
      ) : (
        null
      )}

    </div>
  );
};

export default Select_Breakers_Menu;
