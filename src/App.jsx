import { useState, useRef } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './App.css';
import DisplaySelectedItems from './components/configuration_preview'
import PDF_preview from './components/pdf_preview'
import Select_Breakers_Menu from './components/dropdown_product_selector';
import New_config_input from './components/user_input';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Selected_Items_Context, Items_Lenght_Check_Context, User_Input_Context } from './selected_items_context.jsx';
function App() {
  const [Selected_Items, set_Selected_Items] = useState([]);
  const [Length_Limit_Check, setLength_Limit_Check] = useState(0);
  const [User_Input, setUser_Input] = useState({
    client: '',
    project: '',
    equipment: '-',
    salesOrderNumber: '-',
    revision: '-',
    drawingDate: '',
    drawnBy: ''
  })

  return (
    <Selected_Items_Context.Provider value={{Selected_Items, set_Selected_Items}}>
      <Items_Lenght_Check_Context.Provider value={{Length_Limit_Check, setLength_Limit_Check}}>
        <User_Input_Context.Provider value={{User_Input, setUser_Input}}>
          <>

            {/* Header */}
            <Tabs
              defaultActiveKey="Start"
              fill
            >

              <Tab eventKey="Start" title="Start new Drawing">
                <New_config_input />
              </Tab>
              
              <Tab eventKey="Configure" title="Configurator">
                <Row>
                    <Col md={4}>
                        <Select_Breakers_Menu />
                        <DisplaySelectedItems />
                    </Col>
                    <Col md={8}>
                        <PDF_preview />
                    </Col>
                </Row>            
              </Tab>

              <Tab eventKey="Quote" title="Get Quote">
                
              </Tab>
                
            </Tabs>
          </>
        </User_Input_Context.Provider>
      </Items_Lenght_Check_Context.Provider>
    </Selected_Items_Context.Provider>
  )
}

export default App;




