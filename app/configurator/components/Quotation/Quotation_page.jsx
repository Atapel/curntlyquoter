// import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import ConfigReview from './Quotation_page_list_configuration_specs';
import PriceDisplayComponent from './Quotation_page_price';
import { UseConfigurationReducerContext } from "../../../context/globalContext";

function QuotePage() {
  const { state, dispatch } = UseConfigurationReducerContext();

  return (
    <div>
      <>
        <ListGroup>
          <ListGroup.Item>
            <h2>Configuration Overview: </h2>
          </ListGroup.Item>
          <ListGroup.Item>
            <ConfigReview configuration={state.Configuration} />
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Quote Overview: </h2>
          </ListGroup.Item>
          <ListGroup.Item>
            <PriceDisplayComponent />
          </ListGroup.Item>
        </ListGroup>
      </>
    </div>
  );
}

export default QuotePage;
