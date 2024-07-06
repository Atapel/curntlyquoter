import UserFeedbackForm from "./adminFeedbackFromUser";
import SignOut from "@auth/Components/SignOutButton";
const UserPanel = ({ session }) => {
  return (
    <div className="border" style={{ margin: "1rem" }}>
      <h2 className="border">Account</h2>
      <div
        className=""
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
        }}
      >
        <ul style={{ listStyleType: "none" }}>
          <li className="m-3">{session?.user.email}</li>
          <SignOut />
        </ul>
        <UserFeedbackForm session={session} />
        {/* <p className="alert alert-info m-3">
          This Demo version is still under active development. Please be patient
          when things are not as quick or responsive as they should be, we`re
          working on it.
        </p> */}
      </div>
    </div>
  );
};

export default UserPanel;
