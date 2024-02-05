// import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import SaveConfigurationButton from '../Configuration/Config_page_insert_button';
import ConfirmOrderButton from './Quotation_page_order_button';
import ConfigReview from './Quotation_page_list_configuration_specs';
import PriceDisplayComponent from './Quotation_page_price';
import { UseCurrentUserContext, UseConfigurationReducerContext } from "../../../context/globalContext";

function QuotePage() {
  const { state, dispatch } = UseConfigurationReducerContext();
  const { CurrentUser, setCurrentUser } = UseCurrentUserContext();

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
            <SaveConfigurationButton />
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Quote Overview: </h2>
          </ListGroup.Item>
          <ListGroup.Item>
            <PriceDisplayComponent />
          </ListGroup.Item>
          <ListGroup.Item>
            {/* <ConfirmOrderButton /> */}
          </ListGroup.Item>
        </ListGroup>
      </>
    </div>
  );
}

export default QuotePage;
