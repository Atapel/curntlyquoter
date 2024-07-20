import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Alert, Button, Col, Dropdown, Row } from "react-bootstrap";
import { UseConfigurationReducerContext } from "@/app/context/globalContext";

const DisplaySelectedItems = ({ addButtonState }) => {
  const { state, dispatch } = UseConfigurationReducerContext();
  const [showAddButton, setShowAddButton] = addButtonState;
  const deleteItem = (indexToDelete: number) => {
    dispatch({ type: "REMOVE_BREAKER", payload: indexToDelete });
    setShowAddButton(true);
  };
  return (
    <>
      <ListGroup>
        {state.Configuration.SelectedBreakers &&
        state.Configuration.SelectedBreakers.length === 0 ? null : (
          <ListGroup.Item>
            <h2>Selected breakers: </h2>
          </ListGroup.Item>
        )}

        {state.Configuration.SelectedBreakers &&
          state.Configuration.SelectedBreakers.map((item, index) => (
            <ListGroup.Item key={index}>
              <Row>
                <Col>{item.BreakerDisplayName}</Col>

                <Col>
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      Edit
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Button variant="info">Add Shunt trip</Button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

                <Col>
                  <Button variant="danger" onClick={() => deleteItem(index)}>
                    Delete
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );
};

export default DisplaySelectedItems;
