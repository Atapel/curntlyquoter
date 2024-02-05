import React, { useEffect, useState } from 'react';
import { UseConfigurationReducerContext } from "@/app/context/globalContext.jsx";
import { Button } from 'react-bootstrap';

const PriceDisplayComponent = () => {
  const { state, dispatch } = UseConfigurationReducerContext();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);


  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/configurator/api_requests/google_sheet_call/pricing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(response);
      const result = await response.json(); // Assuming the response is in JSON format
      console.log(result);
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);

    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <p>Pannel Price: ${Math.ceil(data.pannel)}</p>
        <p>Breakers Price: ${Math.ceil(data.breakers)}</p>
        <p>Total Price: ${Math.ceil(data.total)}</p>
        <Button
          variant="success"
          onClick={fetchData}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Generate Quote'}
        </Button>
      </div>
    </div>
  );
};

export default PriceDisplayComponent;

