import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import ConfirmSignUp from './ConfirmSignupData';

export default async function SignUpPage() {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getSession();

    const {
        data: { user },
    } = await supabase.auth.getUser();


    return <ConfirmSignUp UserID={user.id} />;
}