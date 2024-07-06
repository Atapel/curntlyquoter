"use client";
import React from "react";
import { createClient } from "../../utils/supabase/clients";
import { useRouter } from "next/navigation";
const SignOut = () => {
  // Using Router instead of redirect here because of client side compitability
  const router = useRouter();
  const supabase = createClient();
  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("ERROR:", error);
    } else {
      router.push("/auth"); // Programmatic navigation after signout
    }
  }
  return (
    <button
      type="button"
      className="btn btn-danger btn-lg m-3"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
};
export default SignOut;
