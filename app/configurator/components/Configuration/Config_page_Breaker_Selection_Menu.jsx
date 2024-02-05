import React, { useEffect, useState } from "react";
import { Alert, Dropdown, Button, Row, ListGroup, Col, ListGroupItem } from "react-bootstrap";
import { getBreakerDetails } from "../../api_requests/fetch_products";
import { UseConfigurationReducerContext } from "@/app/context/globalContext.jsx";
import DisplaySelectedItems from "./Config_page_Selected_Breakers_List";

const Select_Breakers_Menu = () => {
  const { state, dispatch } = UseConfigurationReducerContext();
  const { breakerState, breakerDispatch } = UseBreakerReducerContext()

  const [renderSelectedBrakers, setrenderSelectedBrakers] = useState(false);
  const [disableButtonState, setDisableButtonState] = useState(false)
  const [maxBreakerMsg, setMaxBreakerMsg] = useState(false)

  // const [Selected_Size, setSelected_Size] = useState("Select Breaker Size");
  // const [SelectedTrip, setSelectedTrip] = useState("Select Breaker Trip");
  // const [SelectedFeature, setSelectedFeature] = useState("Select Feature");
  // const [Selected_Breaker, setSelected_Breaker] = useState({ Description: "Select Breaker" });
  // const [SelectedBreakerAmp, setSelectedBreakerAmp] = useState("Select Amperage");
  // const [SelectedBreakerPoles, setSelectedBreakerPoles] = useState("Select Poles")

  const handleProductSelect = (product) => {
    dispatch({ type: 'ADD_BREAKER', payload: product })
    // Checking on when to display the max breaker message
    // console.log(maxBreakerMsg, state.Configuration.CurrentBreakersSize);
    // if (product["size"] + state.Configuration.CurrentBreakersSize > state.Configuration.MaxBreakerSize) {
    //   console.log(maxBreakerMsg);
    //   setMaxBreakerMsg(true)
    // }

    setrenderSelectedBrakers(true)
    // reset the states back to original
    setSelected_Size("Select Breaker Size");
    setSelectedTrip("Select Breaker Trip")
    setSelected_Breaker({ Description: "Select Breaker" });
  };


  useEffect(() => {
    // Checking on wether to disable the Add Breaker Button or not
    if (
      state.Configuration.CurrentBreakersSize + Selected_Size >
      state.Configuration.MaxBreakerSize
      || Selected_Size === "Select Breaker Size"
      || Selected_Breaker.Description === "Select Breaker"
    ) {
      setDisableButtonState(true)
    } else {
      setDisableButtonState(false)
    }
  }, [breakerState.SelectedBreaker, breakerState.SelectedSize])


  let products = [];

  let {
    Single_breakers_46,
    Double_breakers_46,
    Single_breakers_36,
    Double_breakers_36,
  } = getBreakerDetails(state.Configuration);
  if (Selected_Size == "Single" && state.Configuration.SelectedFrameSize === 46) {
    products = Single_breakers_46;
  } else if (
    Selected_Size == "Single" &&
    state.Configuration.SelectedFrameSize === 36
  ) {
    products = Single_breakers_36;
  } else if (
    Selected_Size == "Double" &&
    state.Configuration.SelectedFrameSize === 46
  ) {
    products = Double_breakers_46;
  } else if (
    Selected_Size == "Double" &&
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
                  {Selected_Size}
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
                  onClick={() => breakerDispatch({type: 'SET_SELECTED_SIZE', payload: "Double"})}
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
                  {SelectedTrip} AT
                </Dropdown.Toggle>
              </Col>
            </Row>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Button
                  onClick={() => breakerDispatch({type: 'SET_SELECTED_TRIP', payload: 600})}
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
                  // disabled={Selected_Size === "Select Breaker Size"}
                >
                  {Selected_Breaker.Description}
                </Dropdown.Toggle>
              </Col>
            </Row>
            <Dropdown.Menu>
              {products.map((product, index) => (
                <Dropdown.Item key={index}>
                  <Button
                    onClick={() => breakerDispatch({type: 'SET_SELECTED_BREAKER', payload: product})}
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

        <ListGroup.Item>
          {/* Dropdown for the Breaker Amperage */}
          <Dropdown>
            <Row>
              <Col>
                <h5>Breaker Amperage:</h5>
              </Col>
              <Col>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {SelectedBreakerAmp}
                </Dropdown.Toggle>
              </Col>
            </Row>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Button
                  onClick={() => breakerDispatch({type: 'SET_SELECTED_BREAKER_AMP', payload: 69})}
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
                  {SelectedBreakerPoles}
                </Dropdown.Toggle>
              </Col>
            </Row>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Button
                  onClick={() => breakerDispatch({type: 'SET_SELECTED_BREAKER_AMP', payload: 69})}
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
                  {SelectedFeature}
                </Dropdown.Toggle>
              </Col>
            </Row>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Button
                  onClick={() => breakerDispatch({type: 'SET_SELECTED_FEATURE', payload: 69})}
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

        <ListGroup.Item>
          {/* Add Breaker to Preview */}
          <Button
            variant="outline-info"
            size="sm"
            className="w-100"
            onClick={() => handleProductSelect(Selected_Breaker)}
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
