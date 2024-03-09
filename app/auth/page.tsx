import 'bootstrap/dist/css/bootstrap.min.css';
import { redirect } from 'next/navigation';
import { createClient } from '../utils/supabase/server'
import SignIn from './providers/signIn';
import SignUp from './providers/signUp'
import ResetPassword from './providers/resetPassword';
export default async function authPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect('/private');
  }
  return (
    <div className="container mt-5">
        <div className="row justify-content-center align-items-center">
            <div className="col-md-4">
              <SignIn />
              {/* <SignUp /> */}
              {/* <ResetPassword /> */}
            </div>
        </div>
    </div>
  )
}
