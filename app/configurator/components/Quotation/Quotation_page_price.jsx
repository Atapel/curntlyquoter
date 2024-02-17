import React, { useEffect, useState } from 'react';
import { UseConfigurationReducerContext } from "@/app/context/globalContext.jsx";
import { Button, Col, Row } from 'react-bootstrap';

const PriceDisplayComponent = () => {
  const { state, dispatch } = UseConfigurationReducerContext();
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  const urlPath = process.env.NEXT_PUBLIC_PRICING_SHEET_ROUTEHANDLER_URL;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${urlPath}`, {
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
      setButtonPressed(true); // Set the buttonPressed state to true after successful data fetch
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <Row>
          <Col>
            <Button
              variant="success"
              onClick={fetchData}
              disabled={loading}
              >
              {loading ? 'Loading... (This can take up to a minute)' : 'Generate Quote'}
            </Button>
          </Col>

          <Col>
          {buttonPressed && (
          <>
            {/* <p>Pannel Price: ${Math.ceil(data.pannel)}</p>
            <p>Breakers Price: ${Math.ceil(data.breakers)}</p> */}
            <p>Total Price: ${Math.ceil(data.total)}</p>
          </>
        )}
          </Col>
        </Row>
        
      </div>
    </div>
  );
};

export default PriceDisplayComponent;


