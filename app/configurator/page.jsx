"use client";

import { useState } from "react";
import { Alert, Col, Row, Tab, Tabs } from "react-bootstrap";
import Link from "next/link";
import DisplaySelectedItems from "./components/Config_page_Selected_Breakers_List";
import PDF_preview from "./components/Config_page_pdf_preview";
import Select_Breakers_Menu from "./components/Config_page_Breaker_Selection_Menu";
import Select_Panel_Menu from "./components/Config_page_Frame_Selection_Menu";
import InsertButton from "./components/Quotation_page";
import { UseFrameContext, UseBreakerContext } from "../context/globalContext";

function configuratorApp() {
  const { Selected_Panel, set_Selected_Panel } = UseFrameContext();
  const { Selected_Breakers, setSelected_Breakers } = UseBreakerContext();
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
              <Select_Panel_Menu />
              {Selected_Panel.length !== 0 ? (
                <div>
                  <Select_Breakers_Menu />
                  {Selected_Breakers.length !== 0 ? (
                    <DisplaySelectedItems />
                  ) : null}
                </div>
              ) : null}
            </Col>
            <Col md={8}>
              <PDF_preview />
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="Quote" title="Get Quote">
          <InsertButton></InsertButton>
        </Tab>
      </Tabs>
    </>
  );
}

export default configuratorApp;
