"use client";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button, Row, Col, ListGroup } from "react-bootstrap";
import { UseCurrentUserContext } from "@/app/context/globalContext";

const UserPanel = ({ session }) => {
  const supabase = createClientComponentClient();
  const { CurrentUser, setCurrentUser } = UseCurrentUserContext();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  if (session) {
    setCurrentUser(session?.user);
  }

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
                <form action="/auth/signout" method="post">
                  <Button
                    variant="danger"
                    className="w-50"
                    onClick={handleSignOut}
                    type="submit"
                  >
                    Sign out
                  </Button>
                </form>
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
