import React, { useState } from "react";
import { resetPassword } from "../../actions";
const ResetPassword = () => {
  const [buttonValue, setButtonValue] = useState(<p>Reset Password</p>);
  const [email, setEmail] = useState(""); // Add a state variable for email
  const handleSubmit = async () => {
    setButtonValue(
      <div>
        Reseting password... <div className="spinner-border"></div>
      </div>
    );
    await resetPassword(email); // Pass the email state variable
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update the email state variable
  };
  return (
    <div className="card" style={{ backgroundColor: "grey" }}>
      <h2 className="card-title text-center">Reset Password</h2>
      <form className="column">
        <label htmlFor="email">Email</label>
        <input
          className={`form-control`}
          id="email"
          name="email"
          placeholder="Please enter your e-mail"
          type="email"
          value={email} // Bind the input value to the email state
          onChange={handleEmailChange} // Add the onChange event handler
        />
        <button
          className="btn btn-primary btn-lg btn-block mt-3"
          onClick={handleSubmit}
        >
          {buttonValue}
        </button>
      </form>
    </div>
  );
};
export default ResetPassword;
