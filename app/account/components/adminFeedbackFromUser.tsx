"use client";
import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";

const FeedbackForm = ({ session }) => {
  const [formData, setFormData] = useState({
    A: "",
    B: "",
    C: session?.user.email,
    D: new Date().toLocaleDateString(),
    E: null,
  });

  const urlPath = process.env.NEXT_PUBLIC_FEEDBACK_SHEET_ROUTEHANDLER_URL;

  console.log("urlPath Feedback: ", urlPath);

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const submitFeedback = async () => {
      try {
        const response = await fetch(`${urlPath}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setFeedbackMessage("Feedback submitted successfully");
        } else {
          const errorData = await response.json();
          setFeedbackMessage(`Error submitting feedback: ${errorData.message}`);
        }
      } catch (error) {
        setFeedbackMessage(`Error submitting feedback: ${error.message}`);
      }
    };

    if (formSubmitted) {
      submitFeedback();
    }
  }, [formSubmitted]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      E: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <>
      {!formSubmitted && (
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="formFeedback">
                <Form.Label>Feedback:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.E}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Button type="submit">Submit Feedback</Button>
            </Col>
          </Row>
        </Form>
      )}

      {formSubmitted && (
        <Alert
          variant={
            feedbackMessage.includes("successfully") ? "success" : "danger"
          }
        >
          {feedbackMessage}
        </Alert>
      )}
    </>
  );
};

export default FeedbackForm;
