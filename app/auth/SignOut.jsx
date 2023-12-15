'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react';

const SignOut = () => {
    const supabase = createClientComponentClient();

    async function handleSignOut() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            // eslint-disable-next-line no-console
            console.error('ERROR:', error);
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
