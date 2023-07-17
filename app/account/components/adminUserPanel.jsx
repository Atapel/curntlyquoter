"use client";
import React from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button, Row, Col, ListGroup } from "react-bootstrap";

const UserPanel = ({ session }) => {
  const supabase = createClientComponentClient();
  const user = session?.user;
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <div className="form-widget">
      <Row>
        <Col>{session?.user.email}</Col>
  
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
      </Row>
    </div>
  );
};

export default UserPanel;


