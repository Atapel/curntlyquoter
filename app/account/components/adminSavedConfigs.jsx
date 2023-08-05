"use client";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
  Modal,
  Alert,
} from "react-bootstrap";
import MapSelectedBreakers from "./adminSavedConfigsSelectedBreakersMap";

function Saved_Configurations({ session }) {
  const supabase = createClientComponentClient();
  const [configs, setConfigs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [expandedConfig, setExpandedConfig] = useState(null);

  const handleExpand = (id) => {
    setExpandedConfig(id === expandedConfig ? null : id);
  };

  async function getConfigs() {
    const userId = session?.user.id;
    try {
      const { data, error } = await supabase
        .from("Configurations")
        .select()
        .eq("user_id", userId);
      if (error) {
        throw new Error("Failed to retrieve data from the database.");
      }
      console.log("yooooooooo", data);
      setConfigs(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteConfigs(id) {
    try {
      const { data, error } = await supabase
        .from("Configurations")
        .delete()
        .eq("id", id);
      if (error) {
        throw new Error("Failed to delete data from the database.");
      }
      // Refresh the configurations after deletion
      getConfigs();
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = (id) => {
    setSelectedConfig(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteConfigs(selectedConfig);
    setShowModal(false);
  };

  useEffect(() => {
    getConfigs();
  }, []);

  return (
    <>
      <ListGroup>
        <ListGroup.Item>
          <h2>Previous configurations</h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            {configs.length > 0 ? (
              configs.map((configuration) => (
                <React.Fragment key={configuration.id}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src="" />
                    <Card.Body>
                      <Card.Title>Overview</Card.Title>
                      <ListGroup>
                        <ListGroupItem>
                          <strong>Project name:</strong>{" "}
                          {configuration.init_project}
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Created at:</strong>{" "}
                          {configuration.created_at
                            .substring(0, 19)
                            .replace("T", " ")}
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Client:</strong>{" "}
                          {configuration.init_client}
                        </ListGroupItem>
                        <ListGroupItem>
                          <strong>Drawn by:</strong>{" "}
                          {configuration.init_drawn_by}
                        </ListGroupItem>
                        {expandedConfig === configuration.id && (
                          <>
                            <Card.Title>Selected Switchboard</Card.Title>
                            <ListGroupItem>
                              <strong>Width:</strong>{" "}
                              {configuration.panel_width}
                            </ListGroupItem>
                            <ListGroupItem>
                              <strong>Voltage:</strong>{" "}
                              {configuration.panel_voltage}
                            </ListGroupItem>
                            <ListGroupItem>
                              <strong>KAIC rating:</strong>{" "}
                              {configuration.panel_KAIC_rating}
                            </ListGroupItem>
                            <ListGroupItem>
                              <strong>Bus rating:</strong>{" "}
                              {configuration.panel_bus_rating}
                            </ListGroupItem>
                            <Card.Title>Selected Breakers</Card.Title>
                            <MapSelectedBreakers
                              config_state={configuration}
                            />
                            <Card.Title>Order Details</Card.Title>
                            <ListGroupItem>
                              <strong>Order status:</strong>{" "}
                              {configuration.order_confirmed
                                ? "Confirmed"
                                : "Not confirmed"}
                            </ListGroupItem>
                          </>
                        )}
                      </ListGroup>

                      <Col>
                        <Row>
                          <Button
                            variant="primary"
                            onClick={() => handleExpand(configuration.id)}
                          >
                            {expandedConfig === configuration.id
                              ? "Collapse"
                              : "Expand"}
                          </Button>
                        </Row>

                        <Row>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(configuration.id)}
                          >
                            Delete
                          </Button>
                        </Row>
                      </Col>
                    </Card.Body>
                  </Card>
                </React.Fragment>
              ))
            ) : (
              <Col>
                <Alert variant="info">User has no configurations saved.</Alert>
              </Col>
            )}
          </Row>
        </ListGroup.Item>
      </ListGroup>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this configuration?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Saved_Configurations;
