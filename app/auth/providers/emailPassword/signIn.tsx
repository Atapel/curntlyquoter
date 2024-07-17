"use client";
import React, { useState } from "react";
import { login } from "../../actions";
const SignIn = () => {
  const [buttonValue, setButtonValue] = useState(<p>Sign In</p>);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Function to handle the login form submission
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonValue(
      <div>
        Signing In... <div className="spinner-border"></div>
      </div>
    );

    // Create a FormData object from the form element
    const formData = new FormData(e.currentTarget);

    try {
      // Attempt to login with the FormData object
      const result = await login(formData);

      // Check if result is an error object
      if (result && typeof result === "object" && result.error) {
        // If an error occurs during login, set the error message
        setErrorMessage(result.error);
        console.error(result.error);
      }
    } catch (error) {
      // If an error occurs during login, set the error message
      setErrorMessage(error.message);
      console.error(error);
    }
  };
  return (
    <div className="card my-5" style={{ backgroundColor: "grey" }}>
      <h2 className="card-title text-center">Sign In</h2>
      <form className="column" onSubmit={handleLogin}>
        {/* Display error message if present */}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <label htmlFor="email">Email</label>
        <input
          className={`form-control`}
          id="emailSignIn"
          name="email"
          placeholder="Please enter your e-mail"
          type="email"
          data-testid="email-input"
        />
        <label htmlFor="password">Password</label>
        <input
          className={`form-control`}
          id="passwordSigniIn"
          name="password"
          placeholder="Please enter your password"
          type="password"
          data-testid="password-input"
        />
        <button
          className="btn btn-primary btn-lg btn-block mt-3"
          type="submit"
          data-testid="signin-button"
        >
          {buttonValue}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
