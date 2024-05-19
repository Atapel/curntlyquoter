import React, { useEffect, useState } from 'react';
import { UseConfigurationReducerContext } from "@context/globalContext";
import { Button, Col, Row } from 'react-bootstrap';
import {TPricingApiResponse} from "@api_requests/types"
const PriceDisplayComponent = () => {
  const { state, dispatch } = UseConfigurationReducerContext();
  const [data, setData] = useState<TPricingApiResponse>();
  const [loading, setLoading] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
      const result: TPricingApiResponse = await response.json(); // Assuming the response is in JSON format
      setData(result);
      setButtonPressed(true); // Set the buttonPressed state to true after successful data fetch
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError(error.message);
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
              data-testid="Price-Generator"
              variant="success"
              onClick={fetchData}
              disabled={loading}
              >
              {loading ? 'Loading... (This can take up to a minute)' : 'Generate Quote'}
            </Button>
          </Col>

          <Col>
          {/* Render Price */}
          {buttonPressed && (
            <>
              {/* <p>Pannel Price: ${Math.ceil(data.pannel)}</p>
              <p>Breakers Price: ${Math.ceil(data.breakers)}</p> */}
              <p
                data-testid="Price-Display"
              >Total Price: ${data.total}</p>
            </>
          )}
          {/* Render Error */}
          {error && <p data-testid="Price-Error">{error}</p>}
          </Col>
        </Row>
        
      </div>
    </div>
  );
};

export default PriceDisplayComponent;


