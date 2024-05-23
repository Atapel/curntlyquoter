import { createClient } from '@utils/supabase/server'
import { redirect } from 'next/navigation';
import UserPanel from "./components/adminUserPanel";
import NewConfigInput from "./components/adminUserInput";
import Saved_Configurations from "./components/adminSavedConfigs";
export default async function Account() {
  const supabase = createClient();

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
    <title>Curntly Configurator</title>
      <div className="container-fluid">
        <UserPanel session={session} />
        <div className="row">
          <div className="col">
            <Saved_Configurations />
          </div>
          <div className="col">
            <NewConfigInput />
          </div>
        </div>
      </div>
    </>
  );
}
