import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import ConfirmSignUp from './ConfirmSignupData';

export default async function SignUpPage() {
    // const supabase = createServerComponentClient({ cookies });

    // const {
    //   data: { user },
    // } = await supabase.auth.getUser();
  
    // if (user) {
    //   redirect('/account');
    // }


    return <ConfirmSignUp />;
}