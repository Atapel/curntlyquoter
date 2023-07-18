"use client";

import { useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
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
      {/* Header */}
      <Tabs defaultActiveKey="Configure" fill>
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
