import { useState } from "react";
import { createClient } from '../../../utils/supabase/clients'
import { Button, Alert } from "react-bootstrap";

function ConfirmOrderButton() {
  const [operationStatus, setOperationStatus] = useState(null);
  const supabase = createClient();

  async function confirmOrder() {
    const currentTime = new Date()
      .toISOString()
      .substring(0, 19)
      .replace("T", " ");

    try {
      console.log(CurrentUser);
      const { error } = await supabase.from("Configurations").update({
        order_confirmed: true,
      }).match({
        user_id: CurrentUser.id,
        created_at: currentTime,
      });
      if (error) {
        console.error("Supabase error:", error.message, error.details);
        throw new Error("Failed to confirm order.");
      }
      console.log("Order confirmed successfully!");
      setOperationStatus('success');
    } catch (error) {
      console.error(error);
      setOperationStatus('danger');
    }
  }

  return (
    <>
      <Button
        onClick={confirmOrder}
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


