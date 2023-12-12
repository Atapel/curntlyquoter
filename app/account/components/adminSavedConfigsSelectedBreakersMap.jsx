"use client"
import React from "react";
import { Col, ListGroup, Dropdown, Row } from "react-bootstrap";

const MapSelectedBreakers = (config_state) => {
  let selectedBreakers = config_state.config_state.selected_breakers
  return (
    <>
      {selectedBreakers.map((item, index) => (
        <ListGroup.Item key={index}>
          <Row>
            <Col>{item.Description}</Col>

            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Details
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Max Amp: {item.Max_Amperage}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </>
  );
};

export default MapSelectedBreakers;
