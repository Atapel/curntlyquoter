import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Authenticate() {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        redirect('/account');
    }
    return (
        <main>
            <Link href="/auth/SignIn">
                <h2>Sign in if you already have an account</h2>
            </Link>
            <Link href="/auth/SignUp">
                <h2>Sign up if youŕe new here</h2>
            </Link>

        </main>
    )
}