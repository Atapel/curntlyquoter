"use client";
import React, { useEffect, useState } from "react";
import { Alert, Col, Row, Tab, Tabs } from "react-bootstrap";
import Link from "next/link";
import PDF_preview from "./PDF_creation/Config_page_pdf_preview";
import Select_Breakers_Menu from "./Configuration/Config_page_Breaker_Selection_Menu";
import Select_Panel_Menu from "./Configuration/Config_page_Frame_Selection_Menu";
import QuotePage from "./Quotation/Quotation_page";
import { UseCurrentUserContext, UseConfigurationReducerContext } from "../../context/globalContext";

export default function configuratorApp(userMetadata) {
  const { CurrentUser, setCurrentUser } = UseCurrentUserContext();
  const { state, dispatch } = UseConfigurationReducerContext();

  // Rendering Variables
  const [panelSelected, setPanelSelected] = useState(false)

  useEffect(() => {
    setCurrentUser(userMetadata.usermetadata[0])
  }, []);

  return (
    <>
      <title>Curntly Configurator</title>
      {/* Header */}
      <Tabs defaultActiveKey="Configure" fill>
        <Tab eventKey="Back" title="Back">
          <Alert variant="danger">
            Please make sure to save the configuration and to download the PDF before returning back
          </Alert>
          <Link href="/account">Go Back</Link>
        </Tab>
        <Tab eventKey="Configure" title="Configurator">
          <Row>
            <Col md={4}>
              <Select_Panel_Menu renderstate={[panelSelected, setPanelSelected]} />
              {panelSelected === true ? (
                <Select_Breakers_Menu />
              ) : null}
            </Col>
            <Col md={8}>
              <PDF_preview renderstate={[panelSelected, setPanelSelected]} />
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="Quote" title="Get Quote">
          <QuotePage />

        </Tab>
      </Tabs>
    </>
  );
}