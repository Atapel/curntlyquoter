import { ListGroup } from "react-bootstrap";
import ConfigReview from "./Quotation_page_list_configuration_specs";
import PriceDisplayComponent from "./Quotation_page_price";
function QuotePage() {
  return (
    <>
      <ListGroup>
        <ListGroup.Item>
          <h2>Configuration Overview: </h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <ConfigReview />
        </ListGroup.Item>

        <ListGroup.Item>
          <h2>Quote Overview: </h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <PriceDisplayComponent />
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}

export default QuotePage;
