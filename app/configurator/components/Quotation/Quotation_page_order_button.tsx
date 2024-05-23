import { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { confirmOrder } from "@api_requests/supabase/actions"
function ConfirmOrderButton() {
  const [operationStatus, setOperationStatus] = useState(null);

  async function confirm() {

    // try {
    //     //  Call Server
    //     await confirmOrder()
    //   if (error) {
    //     console.error("Supabase error:", error.message, error.details);
    //     throw new Error("Failed to confirm order.");
    //   }
    //   console.log("Order confirmed successfully!");
    //   setOperationStatus('success');
    // } catch (error) {
    //   console.error(error);
    //   setOperationStatus('danger');
    // }
  }

  return (
    <>
      <Button
        // onClick={confirmOrder}
        variant="outline-success"
        className="w-50"
      >
        Confirm Order
      </Button>
      {operationStatus && (
        <Alert variant={operationStatus}>
          {operationStatus === 'success'
            ? 'Order confirmed successfully!'
            : 'Failed to confirm order!'}
        </Alert>
      )}
    </>
  );
}

export default ConfirmOrderButton;


