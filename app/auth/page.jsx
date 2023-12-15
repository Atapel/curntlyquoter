import 'bootstrap/dist/css/bootstrap.min.css';
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
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <Link href="/auth/SignIn" className="btn btn-primary btn-lg btn-block">
                        Sign in if you already have an account
                    </Link>
                </div>
                <div className="col-md-6">
                    <Link href="/auth/SignUp" className="btn btn-success btn-lg btn-block">
                        Sign up if you're new here
                    </Link>
                </div>
            </div>
        </div>
    );
}
