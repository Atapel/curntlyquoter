import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Alert, Button, Col, Dropdown, Row } from "react-bootstrap";
import { UseConfigurationReducerContext } from "@/app/context/globalContext.jsx";

const DisplaySelectedItems = (props) => {
  const { state, dispatch } = UseConfigurationReducerContext();
  // const [renderSelectedBrakers, setrenderSelectedBrakers] = props.renderstate

  const deleteItem = (indexToDelete) => {
    // if(state.Configuration.SelectedBreakers.length === 1){
    //   setrenderSelectedBrakers(false)
    //   // console.log("renderSelectedBrakers",renderSelectedBrakers);
    // }
    dispatch({ type: 'REMOVE_BREAKER', payload: indexToDelete })
  };
  return (
    <div>
      <ListGroup>

        { state.Configuration.SelectedBreakers.length === 0 ? (
          // <Alert variant="info">
          //   Please select some breakers
          // </Alert>
          null
        ):(
          //null
          <ListGroup.Item>
          <h2>Selected breakers: </h2>
          </ListGroup.Item>
        )}

        {state.Configuration.SelectedBreakers.map((item, index) => (
          <ListGroup.Item key={index}>
            <Row>
              <Col>{item.Name}</Col>

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
                <Button variant="danger"
                  onClick={() => deleteItem(index)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default DisplaySelectedItems;
