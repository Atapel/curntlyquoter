import { useState } from "react";
import {
  UseFrameContext,
  UseBreakerContext,
  UseUserInputContext,
  UseCurrentUserContext,
} from "@/app/context/globalContext";
import { ListGroup } from "react-bootstrap";
import SaveConfigurationButton from './Quotation_page_insert_button';
import ConfirmOrderButton from './Quotation_page_order_button';

function QuotePage() {
  const { Selected_Breakers, setSelected_Breakers } = UseBreakerContext();
  const { Selected_Panel, set_Selected_Panel } = UseFrameContext();
  const { User_Input, setUser_Input } = UseUserInputContext();
  const { CurrentUser, setCurrentUser } = UseCurrentUserContext();


  const showQuoteComponents =
    Selected_Breakers !== 0 && Selected_Panel !== 0 && User_Input !== 0;

  return (
    <div>
      {showQuoteComponents && (
        <>
          <ListGroup>
            <ListGroup.Item>
              <h2>Configuration Overview: </h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>A summary of the configuration will be here</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <SaveConfigurationButton
                CurrentUser={CurrentUser}
                User_Input={User_Input}
                Selected_Panel={Selected_Panel}
                Selected_Breakers={Selected_Breakers}
              />
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Quote Overview: </h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>All details regarding the quotation will be listed here</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <ConfirmOrderButton
                CurrentUser={CurrentUser}
                User_Input={User_Input}
                Selected_Panel={Selected_Panel}
              />
            </ListGroup.Item>
          </ListGroup>
        </>
      )}
    </div>
  );
}

export default QuotePage;
