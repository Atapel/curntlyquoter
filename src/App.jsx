import { useState, useRef } from 'react';

import './App.css';

import Select_Breakers_Menu from './components/dropdown_product_selector';
import Configuration_Preview from './components/configuration_preview';
import DownloadPDF from './components/local_file_convert';

import { Selected_Items_Context, Items_Lenght_Check_Context } from './selected_items_context.jsx';
function App() {
  const [Selected_Items, set_Selected_Items] = useState([]);
  const [Length_Limit_Check, setLength_Limit_Check] = useState(0);

  return (
    <Selected_Items_Context.Provider value={{Selected_Items, set_Selected_Items}}>
      <Items_Lenght_Check_Context.Provider value={{Length_Limit_Check, setLength_Limit_Check}}>
    <>
      {/* Header */}
      <h1>Configurator Prototype</h1>
      
      {/* Main Section */}
      <div>
        {/* Breaker selection menu */}
        <div>
          <Select_Breakers_Menu />
        </div>

        {/* Breaker selection Preview */}
        <div>
          <Configuration_Preview />
        </div>
        <DownloadPDF />

      </div>
      
    </>
    </Items_Lenght_Check_Context.Provider>
    </Selected_Items_Context.Provider>
  )
}

export default App;




