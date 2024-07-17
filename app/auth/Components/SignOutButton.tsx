"use client";
import React, { useState } from "react";
import { createClient } from "../../utils/supabase/clients";
import { useRouter } from "next/navigation";
const SignOut = () => {
  // Using Router instead of redirect here because of client side compitability
  const router = useRouter();
  const supabase = createClient();
  const [buttonValue, setButtonValue] = useState(<p>Sign out</p>);
  async function handleSignOut() {
    setButtonValue(
      <div>
        Signing out... <div className="spinner-border"></div>
      </div>
    );
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
      {buttonValue}
    </button>
  );
};
export default SignOut;
