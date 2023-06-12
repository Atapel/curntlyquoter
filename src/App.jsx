import { useState, useRef } from 'react';

import './App.css';
import { BlueCircle, GreenRectangle, PinkTriangle } from './components/svg_generator.jsx';
import MyComponent from './components/local_file_convert'; 
import GeneratePDFButton from './components/test_pdf'

function App() {
  const [selectedComponents, setSelectedComponents] = useState([]);
  const myComponentRef = useRef();

  const addComponent = (component) => {
    setSelectedComponents([...selectedComponents, component]);
  }

  const removeComponent = (component) => {
    const index = selectedComponents.lastIndexOf(component);
    if (index > -1) {
      const newSelectedComponents = [...selectedComponents];
      newSelectedComponents.splice(index, 1);
      setSelectedComponents(newSelectedComponents);
    }
  }

  const renderComponents = () => {
    return selectedComponents.map((component, index) => {
      switch(component) {
        case '9X':
          return <BlueCircle key={index} />;
        case '6X':
          return <GreenRectangle key={index} />;
        case '4X':
          return <PinkTriangle key={index} />;
        default:
          return null;
      }
    });
  }

  const getPdf = () => {
    if (myComponentRef.current) {
      myComponentRef.current.downloadPdf();
    }
  }

  return (
    <>
      {/* Header */}
      <h1>Configurator Prototype</h1>
      
      {/* Main Section */}
      <div>
        {/* Breaker Selection menu */}
        <div>
          <p>Please Select Breakers</p>
          <button onClick={() => addComponent('9X')}>Add 9X</button>
          <button onClick={() => addComponent('6X')}>Add 6X</button>
          <button onClick={() => addComponent('4X')}>Add 4X</button>
          <button onClick={() => removeComponent('9X')}>Remove 9X</button>
          <button onClick={() => removeComponent('6X')}>Remove 6X</button>
          <button onClick={() => removeComponent('4X')}>Remove 4X</button>
        </div>

        {/* Breaker selection Preview */}
        <div>
          <p>Preview</p>
            {renderComponents()}
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>

      {/* Control Buttons */}
      <button onClick={getPdf}>
        Get PDF
      </button>

      <MyComponent />
      <GeneratePDFButton />
    </>
  )
}

export default App;




