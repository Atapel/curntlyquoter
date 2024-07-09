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
import { createSheet, writeFramePricing } from "@api_requests/google_sheet_call/pricing/actions";
import { selectableFrameOptions } from "../../assets/FrameSelectionOptions";
import { updateConfiguration } from "@api_requests/supabase/actions";
import { UseConfigurationReducerContext } from "@context/globalContext";
import DisplaySelectedFrame from "./Config_page_Selected_Frame_Preview";
import SelectionItemDropdown from "./SelectionItemDropdown";
function Select_Panel_Menu(props) {
  const [panelSelected, setPanelSelected] = props.renderstate;
  const { state, dispatch } = UseConfigurationReducerContext();

  useEffect(() => {
    if (state.Metadata.ResumeDraft) {
      setPanelSelected(true);
    }
    // Create corresponding google sheet in the background
    createSheet(state);
  }, []);

  const addFrameConfimation = async function () {
    // Set conditional rendering variable to true
    setPanelSelected(true);
    // Save configuration as soon as the user clicks the add button
    try {
      // Async function that runs in the background without await
      updateConfiguration(state);
    } catch (error) {
      console.error("Error updating configuration:", error);
      // You can also display an error message to the user here
      alert(
        "An error occurred while updating the configuration. Please try again later."
      );
    }
    // Write Configured Frame into Google sheet
    writeFramePricing(state);
  };

  return (
    <>
      {panelSelected === false ? (
        <ListGroup>
          <ListGroup.Item>
            <h2>Configure Panel: </h2>
          </ListGroup.Item>

          <ListGroup.Item>
            {/* Dropdown for Frame Size */}
            <SelectionItemDropdown
              disabledBool={false}
              ItemName={"Panel Width"}
              SelectableItemsArray={selectableFrameOptions.frameSize}
              dispatchFunc={dispatch}
              dispatchAction={"SET_FRAME_SIZE"}
            />
            {/* Dropdown for Frame Size */}
          </ListGroup.Item>

          <ListGroup.Item>
            {/* Dropdown for Panel Height */}
            <SelectionItemDropdown
              disabledBool={
                state.Configuration.SelectedFrameSize === "Select Width"
              }
              ItemName={"Panel Height"}
              SelectableItemsArray={selectableFrameOptions.panelHeight}
              dispatchFunc={dispatch}
              dispatchAction={"SET_PANEL_HEIGHT"}
            />
          </ListGroup.Item>

          <ListGroup.Item>
            {/* Dropdown for Voltage */}
            <SelectionItemDropdown
              disabledBool={
                state.Configuration.SelectedPanelHeight === "Select Height"
              }
              ItemName={"Voltage"}
              SelectableItemsArray={selectableFrameOptions.voltage}
              dispatchFunc={dispatch}
              dispatchAction={"SET_VOLTAGE"}
            />
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
            <SelectionItemDropdown
              disabledBool={
                state.Configuration.SelectedKAICRating === "Select KAIC Rating"
              }
              ItemName={"Bus Rating"}
              SelectableItemsArray={selectableFrameOptions.busRating}
              dispatchFunc={dispatch}
              dispatchAction={"SET_BUS_RATING"}
            />
          </ListGroup.Item>

          <ListGroup.Item>
            {/* Dropdown for DistributionSerie */}
            <SelectionItemDropdown
              disabledBool={
                state.Configuration.SelectedBusRating === "Select Bus Rating"
              }
              ItemName={"Distribution or Service"}
              SelectableItemsArray={selectableFrameOptions.serviceDistribution}
              dispatchFunc={dispatch}
              dispatchAction={"SET_SERVICE_OR_DISTRIBUTION"}
            />
          </ListGroup.Item>

          <ListGroup.Item>
            {/* Dropdown for Feed Type */}
            <SelectionItemDropdown
              disabledBool={
                state.Configuration.SelectedServiceDistribution ===
                "Select Service or Distribution"
              }
              ItemName={"Feed Type"}
              SelectableItemsArray={selectableFrameOptions.feedType}
              dispatchFunc={dispatch}
              dispatchAction={"SET_FEED_TYPE"}
            />
          </ListGroup.Item>

          {state.Configuration.SelectedFeedType === "Main Lug" ? (
            <ListGroup.Item>
              {/* Dropdown for Feed Position */}
              <SelectionItemDropdown
                disabledBool={false}
                ItemName={"Feed Position"}
                SelectableItemsArray={selectableFrameOptions.feedPosition}
                dispatchFunc={dispatch}
                dispatchAction={"SET_FEED_POSITION"}
              />
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
              onClick={() => addFrameConfimation()}
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
