import React, { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { User_Input_Context } from '../selected_items_context.jsx';

const New_config_input = () => {
  const {User_Input, setUser_Input} = useContext(User_Input_Context);

  const handleInputChange = (event) => {
    setUser_Input({
      ...User_Input,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(User_Input).some(value => value === '')) {
      alert("Please fill out all fields before submitting.");
    } else {
      console.log(User_Input);
    }
  };

  const isFormIncomplete = Object.values(User_Input).some(value => value === '');

  return (
 
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formClient">
        <Form.Label>Client</Form.Label>
        <Form.Control type="text" name="client" onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formProject">
        <Form.Label>Project</Form.Label>
        <Form.Control type="text" name="project" onChange={handleInputChange} />
      </Form.Group>

      {/* <Form.Group controlId="formEquipment">
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
      </Form.Group> */}

      <Form.Group controlId="formDrawingDate">
        <Form.Label>Drawing Date</Form.Label>
        <Form.Control type="date" name="drawingDate" onChange={handleInputChange} />
      </Form.Group>

      <Form.Group controlId="formDrawnBy">
        <Form.Label>Drawn By</Form.Label>
        <Form.Control type="text" name="drawnBy" onChange={handleInputChange} />
      </Form.Group>
      
      {isFormIncomplete && <Alert variant="warning">Please fill out all fields before submitting.</Alert>}

      <Button variant="primary" type="submit" disabled={isFormIncomplete}>
        Submit
      </Button>
      
    </Form>
  );
};

export default New_config_input;




