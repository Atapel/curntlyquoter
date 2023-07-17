import React, { useState, useEffect, useContext } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button, Row, Col, ListGroup } from "react-bootstrap";

const userPanel = () => {
  const supabase = createClientComponentClient()



  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <>
      <ListGroup>
        <ListGroup.Item>
          <h2>Account</h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>User Email</Col>
            <Col>
              <Button variant="danger" className="w-50" onClick={handleSignOut}>
                Sign out
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default userPanel;
