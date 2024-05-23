import Authenticate from "./auth/page"
import { createClient } from './utils/supabase/server'
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }  else {
    redirect('/account');
  }
  return <Authenticate />;
}