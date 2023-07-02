import { useState, useRef } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./App.css";
import DisplaySelectedItems from "./components/Selected_Breakers_List";
import PDF_preview from "./components/pdf_preview";
import Select_Breakers_Menu from "./components/Breaker_Selection_Menu";
import New_config_input from "./components/user_input";
import Select_Panel_Menu from "./components/Frame_Selection_Menu";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  Configuration_Frame_Context,
  Configuration_Breakers_Context,
  Items_Lenght_Check_Context,
  User_Input_Context,
} from "./selected_items_context.jsx";

function App() {
  const [Selected_Panel, set_Selected_Panel] = useState([]);
  const [Selected_Breakers, setSelected_Breakers] = useState([]);
  const [Length_Limit_Check, setLength_Limit_Check] = useState(0);
  const [User_Input, setUser_Input] = useState({
    client: "",
    project: "",
    equipment: "-",
    salesOrderNumber: "-",
    revision: "-",
    drawingDate: "",
    drawnBy: "",
  });

  return (
    <Configuration_Frame_Context.Provider
      value={{ Selected_Panel, set_Selected_Panel }}
    >
      <Items_Lenght_Check_Context.Provider
        value={{ Length_Limit_Check, setLength_Limit_Check }}
      >
        <User_Input_Context.Provider value={{ User_Input, setUser_Input }}>
          <Configuration_Breakers_Context.Provider
            value={{ Selected_Breakers, setSelected_Breakers }}
          >
            <>
              {/* Header */}
              <Tabs defaultActiveKey="Start" fill>
                <Tab eventKey="Start" title="Start new Drawing">
                  <New_config_input />
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

                <Tab eventKey="Quote" title="Get Quote"></Tab>
              </Tabs>
            </>
          </Configuration_Breakers_Context.Provider>
        </User_Input_Context.Provider>
      </Items_Lenght_Check_Context.Provider>
    </Configuration_Frame_Context.Provider>
  );
}

export default App;
