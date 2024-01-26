import React, { useEffect, useState } from 'react';
import { UseConfigurationReducerContext } from "@/app/context/globalContext.jsx";

const PriceDisplayComponent = () => {
  const { state, dispatch } = UseConfigurationReducerContext();
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/configurator/api_requests/google_sheet_call'); // replace with your URL
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.text();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();

  }, []);

  return (
    <div>
      <p>All details regarding the quotation will be listed here:</p>
      <pre>{data}</pre>
    </div>
  );
};

export default PriceDisplayComponent;