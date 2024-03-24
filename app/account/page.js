import { createClient } from '../utils/supabase/server'
import { cookies } from "next/headers";
import AdminSite from "./adminSite";
import { redirect } from 'next/navigation';

export default async function Account() {
  const supabase = createClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  return (
    <>
      <AdminSite session={session} />
    </>
  );
}
