import React, { useState } from "react";
import { Alert, Dropdown, Button, Row, ListGroup, Col } from "react-bootstrap";
import {
  UseConfigurationReducerContext,
  UseBreakerReducerContext,
} from "@context/globalContext";
// import { writeBreakersPricing } from "@api_requests/google_sheet_call/pricing/actions";
import DisplaySelectedItems from "./Config_page_Selected_Breakers_List";
import BreakerMappings from "./BreakerMappings";
import SelectionItemDropdown from "./SelectionItemDropdown";
const Select_Breakers_Menu = () => {
  const { state, dispatch } = UseConfigurationReducerContext();
  const { breakerState, breakerDispatch } = UseBreakerReducerContext();
  const [showAddButton, setShowAddButton] = useState<boolean>(true);
  const handleProductSelect = () => {
    dispatch({ type: "ADD_BREAKER", payload: breakerState });
    // reset the states back to original
    breakerDispatch({ type: "RESET_BREAKER_STATE" });
  };
  return (
    <>
      <ListGroup>
        <ListGroup.Item>
          <h2>Configure Breaker: </h2>
        </ListGroup.Item>
        {showAddButton === true ? (
          <>
            <ListGroup.Item>
              {/* Dropdown for Breaker Size */}
              <SelectionItemDropdown
                disabledBool={false}
                ItemName={"Breaker Frame"}
                SelectableItemsArray={["Single", "Double"]}
                dispatchFunc={breakerDispatch}
                dispatchAction={"SET_SELECTED_SIZE"}
              />
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
                      data-testid="Dropdown-Breaker"
                      variant="primary"
                      id="dropdown-basic"
                      disabled={breakerState.SelectedHeight === null}
                    >
                      {breakerState.Name ? breakerState.Name : "Select Breaker"}
                    </Dropdown.Toggle>
                  </Col>
                </Row>

                <BreakerMappings
                  addButtonState={[showAddButton, setShowAddButton]}
                />
              </Dropdown>
            </ListGroup.Item>

            {/* Conditionally rendering the next 3 menu items only if a breaker has been selected above */}

            {breakerState.Name !== null ? (
              <>
                <ListGroup.Item>
                  {/* Dropdown for the Breaker Amperage */}

                  <SelectionItemDropdown
                    disabledBool={false}
                    ItemName={"Breaker Amperage"}
                    SelectableItemsArray={
                      breakerState.SelectedBreaker.AmperageOptions
                    }
                    dispatchFunc={breakerDispatch}
                    dispatchAction={"SET_SELECTED_BREAKER_AMP"}
                  />
                </ListGroup.Item>

                <ListGroup.Item>
                  {/* Dropdown for the Breaker Poles */}
                  <SelectionItemDropdown
                    disabledBool={breakerState.SelectedBreakerAmp === null}
                    ItemName={"Breaker Poles"}
                    SelectableItemsArray={
                      breakerState.SelectedBreaker.PolesOptions
                    }
                    dispatchFunc={breakerDispatch}
                    dispatchAction={"SET_SELECTED_BREAKER_POLES"}
                  />
                </ListGroup.Item>

                <ListGroup.Item>
                  {/* Dropdown for the Breaker Trip */}
                  {/* <Dropdown>
                <Row>
                  <Col>
                    <h5>Add Feature:</h5>
                  </Col>
                  <Col>
                    <Dropdown.Toggle
                      data-testid="Dropdown-"
                      variant="primary"
                      id="dropdown-basic"
                      disabled={breakerState.SelectedBreakerPoles === null}
                    >
                      {breakerState.SelectedFeature}
                    </Dropdown.Toggle>
                  </Col>
                </Row>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Button
                      data-testid="selection-"
                      onClick={() =>
                        breakerDispatch({
                          type: "SET_SELECTED_FEATURE",
                          payload: 69,
                        })
                      }
                      variant="outline-info"
                      size="sm"
                      className="w-100"
                      // onClick={() => setSelectedFeature("Shunt trip selected")}
                    >
                      Add Shunt Trip
                    </Button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
                </ListGroup.Item>
              </>
            ) : null}

            <ListGroup.Item>
              {/* Add Breaker to Preview */}

              <Button
                data-testid="Add-Breaker"
                variant="outline-info"
                size="sm"
                className="w-100"
                onClick={() => handleProductSelect()}
                disabled={breakerState.SelectedBreakerPoles === null}
              >
                Add
              </Button>
            </ListGroup.Item>
          </>
        ) : (
          <ListGroup.Item>
            <Alert variant="warning">No more Breakers available</Alert>
          </ListGroup.Item>
        )}
      </ListGroup>

      <DisplaySelectedItems
        addButtonState={[showAddButton, setShowAddButton]}
      />
    </>
  );
};
export default Select_Breakers_Menu;
