import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const MyForm = () => {
  const [formState, setFormState] = useState({
    client: '',
    project: '',
    equipment: '',
    salesOrderNumber: '',
    revision: '',
    drawingDate: '',
    drawnBy: ''
  });

  const handleInputChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formClient">
        <Form.Label>Client</Form.Label>
        <Form.Control type="text" name="client" onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formClient">
        <Form.Label>Project</Form.Label>
        <Form.Control type="text" name="client" onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formEquipment">
        <Form.Label>Equipment</Form.Label>
        <Form.Control type="text" name="equipment" onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formSalesOrderNumber">
        <Form.Label>Sales Order Number</Form.Label>
        <Form.Control type="text" name="salesOrderNumber" onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formRevision">
        <Form.Label>Revision</Form.Label>
        <Form.Control type="text" name="revision" onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formDrawingDate">
        <Form.Label>Drawing Date</Form.Label>
        <Form.Control type="date" name="drawingDate" onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formDrawnBy">
        <Form.Label>Drawn By</Form.Label>
        <Form.Control type="text" name="drawnBy" onChange={handleInputChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default MyForm;


