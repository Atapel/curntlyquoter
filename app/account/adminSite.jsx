import React from "react"
import UserPanel from "./components/adminUserPanel";
import NewConfigInput from "./components/adminUserInput";
import Saved_Configurations from "./components/adminSavedConfigs"

export default async function AdminSite({session} ) {

  return (
    <>
      <UserPanel session={session} />
      <NewConfigInput />
      <Saved_Configurations session={session}/>
    </>
  );
}
