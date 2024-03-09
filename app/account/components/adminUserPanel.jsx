"use client";
import React from "react";
import { Button, Row, Col, ListGroup } from "react-bootstrap";
import UserFeedbackForm from "./adminFeedbackFromUser"
import SignOut from "../../auth/SignOutButton"

const UserPanel = ({ session }) => {

  return (
    <ListGroup>
      <ListGroup.Item>
        <h2>Account</h2>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          {session ? (
            <>

              <Col>User: {session?.user.email}</Col>
              <Col>
              <UserFeedbackForm session={session} />
              </Col>
              <Col>
                <SignOut />
              </Col>
            </>
          ) : (
            <>
              <Col>No user is signed in.</Col>
              <Col>
                <Button
                  variant="success"
                  href="/"
                  className="w-50"
                >
                  Sign in here
                </Button>
              </Col>
            </>
          )}
        </Row>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default UserPanel;

