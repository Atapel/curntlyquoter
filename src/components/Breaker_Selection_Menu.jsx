import React, { useContext, useState, useEffect } from "react";
import { Alert, Dropdown, Button, Row, ListGroup, Col } from "react-bootstrap";
import {
  Single_breakers_46,
  Single_breakers_36,
  Double_breakers_46,
  Double_breakers_36,
} from "../api_requests/fetch_products.jsx";
import {
  Configuration_Frame_Context,
  Configuration_Breakers_Context,
  Items_Lenght_Check_Context,
} from "../selected_items_context.jsx";

const Select_Breakers_Menu = () => {
  const { Selected_Breakers, setSelected_Breakers } = useContext(
    Configuration_Breakers_Context
  );
  const { Selected_Panel, set_Selected_Panel } = useContext(
    Configuration_Frame_Context
  );
  const { Length_Limit_Check, setLength_Limit_Check } = useContext(
    Items_Lenght_Check_Context
  );
  const [Warning_Display, setWarning_Display] = useState(false);
  const [Selected_Breaker_Size, setSelected_Breaker_Size] = useState(
    "Select Breaker Size"
  );
  const [Currently_Selected_Breaker, setCurrently_Selected_Breaker] = useState({
    Description: "Select Breaker",
  });

  const handleProductSelect = (product) => {
    if (Length_Limit_Check + product["Size"] <= 45) {
      // Append selected specs to selected item
      setSelected_Breakers([...Selected_Breakers, product]);
      setLength_Limit_Check(Length_Limit_Check + product["Size"]);
      setWarning_Display(false);

      // reset the states back to original
      setSelected_Breaker_Size("Select Breaker Size");
      setCurrently_Selected_Breaker({ Description: "Select Breaker" });
    } else {
      setWarning_Display(true);
    }
  };

  let products = [];

  if (Selected_Breaker_Size == "Single" && Selected_Panel.Frame_Size === 46) {
    products = Single_breakers_46;
  } else if (
    Selected_Breaker_Size == "Single" &&
    Selected_Panel.Frame_Size === 36
  ) {
    products = Single_breakers_36;
  } else if (
    Selected_Breaker_Size == "Double" &&
    Selected_Panel.Frame_Size === 46
  ) {
    products = Double_breakers_46;
  } else if (
    Selected_Breaker_Size == "Double" &&
    Selected_Panel.Frame_Size === 36
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
                <h5>Selected Breaker Size:</h5>
              </Col>
              <Col>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {Selected_Breaker_Size}
                </Dropdown.Toggle>
              </Col>
            </Row>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Button
                  variant="outline-info"
                  size="sm"
                  className="w-100"
                  onClick={() => setSelected_Breaker_Size("Single")}
                >
                  Single
                </Button>
              </Dropdown.Item>
              <Dropdown.Item>
                <Button
                  variant="outline-info"
                  size="sm"
                  className="w-100"
                  onClick={() => setSelected_Breaker_Size("Double")}
                >
                  Double
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
                <h5>Selected Breaker:</h5>
              </Col>
              <Col>
                <Dropdown.Toggle
                  variant="primary"
                  id="dropdown-basic"
                  disabled={Selected_Breaker_Size === "Select Breaker Size"}
                >
                  {Currently_Selected_Breaker.Description}
                </Dropdown.Toggle>
              </Col>
            </Row>
            <Dropdown.Menu>
              {products.map((product, index) => (
                <Dropdown.Item key={index}>
                  <Button
                    variant="outline-info"
                    size="sm"
                    className="w-100"
                    onClick={() => setCurrently_Selected_Breaker(product)}
                    disabled={Length_Limit_Check > 45}
                  >
                    {product.Description}
                  </Button>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>

        <ListGroup.Item>
          {/* Add Breaker to Preview */}
          {Warning_Display === false ? (
            <Button
              variant="outline-info"
              size="sm"
              className="w-100"
              onClick={() => handleProductSelect(Currently_Selected_Breaker)}
              disabled={Length_Limit_Check > 45}
            >
              Add
            </Button>
          ) : (
            <div>
              <Alert variant="warning">Max ammount of breakers selected</Alert>
              <Button
                variant="outline-info"
                size="sm"
                className="w-100"
                onClick={() => handleProductSelect(Currently_Selected_Breaker)}
                disabled={Length_Limit_Check > 45}
              >
                Add
              </Button>
            </div>
          )}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Select_Breakers_Menu;
