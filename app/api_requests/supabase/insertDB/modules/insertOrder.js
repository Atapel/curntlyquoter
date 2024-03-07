
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