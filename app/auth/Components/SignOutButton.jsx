'use client';
import React from 'react';
// import { createClient } from '../utils/supabase/server'
import { createClient } from '../../utils/supabase/clients'
import { redirect } from 'next/navigation'
const SignOut = () => {
    const supabase = createClient()
    async function handleSignOut() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            // eslint-disable-next-line no-console
            console.error('ERROR:', error);
        }
        redirect('/auth')
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