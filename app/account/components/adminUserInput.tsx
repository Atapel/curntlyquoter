"use client";
import React, { useState } from "react";
import { Form, Button, Row, Col, Container, ListGroup } from "react-bootstrap";
import { UseConfigurationReducerContext } from "@context/globalContext";
import { insertConfigurationInit } from "@api_requests/supabase/actions";
import { useRouter } from "next/navigation";
const NewConfigInput = () => {
  const { state, dispatch } = UseConfigurationReducerContext();
  const [formData, setFormData] = useState({
    client: "",
    project: "",
  });
  const [isFormIncomplete, setIsFormIncomplete] = useState(true);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsFormIncomplete(value === "");
  };

  const handleSubmit = async () => {
    if (isFormIncomplete) {
      alert("Please fill out all fields");
      return;
    }

    // add error handling
    const Id = await insertConfigurationInit({
      Client: formData.client,
      Project: formData.project,
    });

    dispatch({ type: "TOTAL_RESET" });
    // Typescript didn notice the wrong payload i gave it
    // Payload arg was payload: {
    // client: formData.client,
    // project: formData.project,
    // databaseId: Id
    // Capitalisation in key was wrong, no error recieved
    dispatch({
      type: "INIT_NEW_CONFIG",
      payload: {
        Client: formData.client,
        Project: formData.project,
        DatabaseID: Id,
        ResumeDraft: false,
      },
    });
    console.log("state after init", state);
    router.push("/configurator"); // Programmatic navigation after signout
  };

  return (
    <>
      <ListGroup>
        <ListGroup.Item>
          <h2>New configuration</h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <Form>
            <Container>
              <Form.Group controlId="formClient">
                <Row>
                  <Col>
                    <Form.Label>Client</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      name="client"
                      value={formData.client}
                      onChange={handleChange}
                      data-testid="client-input"
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Container>

            <Container>
              <Form.Group controlId="formProject">
                <Row>
                  <Col>
                    <Form.Label>Project</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      name="project"
                      value={formData.project}
                      onChange={handleChange}
                      data-testid="project-input"
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Container>

            {/* TODO: Grey out button when no input in both fields */}
            {/* <Link href="/configurator"> */}
            <Button
              variant="outline-success"
              className="w-100"
              onClick={handleSubmit} // Use onClick to trigger the function
              disabled={isFormIncomplete}
              data-testid="launch-new-configuration-button"
            >
              Launch Configurator
            </Button>
            {/* </Link> */}
          </Form>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default NewConfigInput;

{/* <>
<div className="border" style={{ margin: "1rem" }}>
  <h2>New configuration</h2>
  <form className="border p-2 form-group d-flex flex-row justify-between">
    <label htmlFor="formClient">Client</label>
    <input
      type="text"
      className="form-control mx-3"
      id="formClient"
      name="client"
      value={formData.client}
      onChange={handleChange}
      data-testid="client-input"
    />
    <label htmlFor="formProject">Project</label>
    <input
      type="text"
      className="form-control mx-3"
      id="formProject"
      name="project"
      value={formData.project}
      onChange={handleChange}
      data-testid="project-input"
    />
    <button
      className="btn btn-outline-success w-50"
      onClick={handleSubmit}
      // disabled={isFormIncomplete}
      data-testid="launch-new-configuration-button"
    >
      Launch Configurator
    </button>
  </form>
</div>
</> */}