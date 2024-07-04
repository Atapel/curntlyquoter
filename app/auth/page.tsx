import "bootstrap/dist/css/bootstrap.min.css";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import SignIn from "./providers/emailPassword/signIn";
import AlternativeAuthActions from "./providers/emailPassword/alternativeActionsAuth";
export default async function authPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect("/account");
  }
  return (
    <div className="container d-flex flex-column justify-content-around">
      <SignIn />
      <AlternativeAuthActions />
    </div>
  );
}
