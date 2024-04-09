'use client';
import React from 'react';
import { createClient } from '../../utils/supabase/clients'
import { useRouter } from 'next/navigation';
const SignOut = () => {
    // Using Router instead of redirect here because of client side compitability
  const router = useRouter();
  const supabase = createClient()
  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('ERROR:', error);
    } else {
      router.push('/auth'); // Programmatic navigation after signout
    }
  }
    return (
        <div className="container d-flex align-items-center justify-content-center mt-5">
            <button
                type="button"
                className="btn btn-danger btn-lg"
                onClick={handleSignOut}
            >
                Sign Out
            </button>
        </div>
    );
};
export default SignOut;