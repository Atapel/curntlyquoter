"use client"
import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';

function UserFeedbackForm() {
  const [showForm, setShowForm] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = () => {
    // You can implement email sending logic here
    // For demonstration purposes, let's log the feedback to the console
    console.log('Feedback submitted:', feedback);

    // You can use a service like email.js or your server to send an email
    // In this example, we are not sending an actual email

    // Set the submitted state to true
    setSubmitted(true);

    // Optionally, reset the feedback state
    setFeedback('');
  };

  const handleShowForm = () => {
    // Reset the submitted state when showing the form again
    setSubmitted(false);

    setShowForm(true);
  };

  return (
    <>
      {!showForm && !submitted && (
        <Button variant="primary" onClick={handleShowForm}>
          Please give us feedback
        </Button>
      )}

      {showForm && !submitted && (
        <Form>
          <Form.Group controlId="userFeedback">
            <Form.Label>Your Feedback</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={feedback}
              onChange={handleFeedbackChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit}>
            Submit Feedback
          </Button>
        </Form>
      )}

      {submitted && (
        <Alert variant="success" onClose={() => setShowForm(false)} dismissible>
          Thank you for your feedback!
        </Alert>
      )}
    </>
  );
}

export default UserFeedbackForm;

