import { createClient } from "@utils/supabase/server";
import { redirect } from "next/navigation";
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
    redirect("/auth");
  }

  return (
    <>
      <UserPanel session={session} />
      <NewConfigInput />
      <Saved_Configurations />
    </>
  );
}
