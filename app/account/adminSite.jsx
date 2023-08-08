"use client"
import React from "react";
import { Button, Row, Col, ListGroup } from "react-bootstrap";
import UserPanel from "./components/adminUserPanel";
import NewConfigInput from "./components/adminUserInput";
import Saved_Configurations from "./components/adminSavedConfigs";

export default async function AdminSite({ session }) {
  return (
    <>
    <title>Curntly Configurator</title>
      <UserPanel session={session} />
      <Row>
        <Col>
          <Saved_Configurations session={session} />
        </Col>
        <Col>
          <NewConfigInput />
        </Col>
      </Row>
    </>
  );
}
