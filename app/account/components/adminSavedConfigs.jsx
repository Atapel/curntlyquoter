"use client";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Dropdown,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
  Modal,
  Alert,
} from "react-bootstrap";

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
                      <Card.Title>{configuration.init_project}</Card.Title>
                      <ListGroup>
                        <ListGroupItem>
                          {configuration.created_at
                            .substring(0, 19)
                            .replace("T", " ")}
                        </ListGroupItem>
                        <ListGroupItem>
                          {configuration.init_client}
                        </ListGroupItem>
                        {expandedConfig === configuration.id && (
                          <>
                            <ListGroupItem>
                              {configuration.panel_width}
                            </ListGroupItem>
                            <ListGroupItem>
                              {configuration.panel_voltage}
                            </ListGroupItem>
                            <ListGroupItem>
                              {configuration.panel_KAIC_rating}
                            </ListGroupItem>
                            <ListGroupItem>
                              {configuration.panel_bus_rating}
                            </ListGroupItem>
                            <ListGroupItem>
                              {JSON.stringify(configuration.selected_breakers)}
                            </ListGroupItem>
                            <ListGroupItem>
                              {configuration.order_confirmed
                                ? "Confirmed"
                                : "Not confirmed"}
                            </ListGroupItem>
                            <ListGroupItem>
                              {configuration.init_drawn_by}
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
