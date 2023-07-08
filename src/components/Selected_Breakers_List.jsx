import React, { useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Button,Col, Dropdown, Row } from "react-bootstrap";
import {
  Configuration_Breakers_Context,
  Items_Lenght_Check_Context,
} from "../selected_items_context.jsx";

const DisplaySelectedItems = () => {
  const { Selected_Breakers, setSelected_Breakers } = useContext(
    Configuration_Breakers_Context
  );
  const { Length_Limit_Check, setLength_Limit_Check } = useContext(
    Items_Lenght_Check_Context
  );

  const deleteItem = (indexToDelete) => {
    const itemToDelete = Selected_Breakers[indexToDelete];
    setLength_Limit_Check(Length_Limit_Check - itemToDelete["Size"]);
    let newSelected_Breakers = Selected_Breakers.filter(
      (_, index) => index !== indexToDelete
    );
    setSelected_Breakers(newSelected_Breakers);
  };

  return (
    <div>
      <ListGroup>
        <ListGroup.Item>
          <h2>Currently selected breakers: </h2>
        </ListGroup.Item>
        {Selected_Breakers.map((item, index) => (
          <ListGroup.Item>
            <Row>
              <Col>{item.Description}</Col>

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
    </div>
  );
};

export default DisplaySelectedItems;
