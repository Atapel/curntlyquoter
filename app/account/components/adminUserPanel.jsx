import UserFeedbackForm from "./adminFeedbackFromUser"
import SignOut from "../../auth/Components/SignOutButton"
const UserPanel = ({ session }) => {
  return (
    <div className="list-group">
      <div className="list-group-item">
        <h2>Account</h2>
      </div>
      <div className="list-group-item">
        <div className="row">
          {session ? (
            <>
              <div className="col">User: {session?.user.email}</div>
              <div className="col">
                <UserFeedbackForm session={session} />
              </div>
              <div className="col">
                <SignOut />
              </div>
            </>
          ) : (
            <>
              <div className="col">No user is signed in.</div>
              <div className="col">
                <a href="/" className="btn btn-success w-50">
                  Sign in here
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  
  );
};

export default UserPanel;

