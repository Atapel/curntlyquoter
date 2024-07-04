import { resetPassword } from "../../actions";

const ResetPassword = () => {
  return (
    <div className="card" style={{backgroundColor: "grey"}}>
      <h2 className="card-title text-center">Reset Password</h2>
      <form className="column">
        <label htmlFor="email">Email</label>
        <input
          className={`form-control`}
          id="email"
          name="email"
          placeholder="jane@acme.com"
          type="email"
        />
        <button
          className="btn btn-primary btn-lg btn-block mt-3"
          formAction={resetPassword}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};
export default ResetPassword;
