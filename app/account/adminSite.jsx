import React from "react"
import UserPanel from "./components/adminUserPanel";
// import NewConfigInput from "./components/adminUserInput"

export default async function AdminSite({session} ) {

  return (
    <>
      <UserPanel session={session} />
      {/* <NewConfigInput /> */}
    </>
  );
}
