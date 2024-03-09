"use client"
import React, {useState} from 'react';
import { login } from '../actions';

const SignIn = () => {
  // Define state for error messages if needed
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // Function to handle the login form submission
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create a FormData object from the form element
    const formData = new FormData(e.currentTarget);

    try {
      // Attempt to login with the FormData object
      await login(formData);

      // If login is successful, you can redirect or perform other actions
      console.log('Login successful');
    } catch (error) {
      // If an error occurs during login, set the error message
      setErrorMessage('Login failed. Please check your credentials.');
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <h2 className="card-title text-center">Sign In</h2>
            <form className="column" onSubmit={handleLogin}>
              {/* Display error message if present */}
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

              <label htmlFor="email">Email</label>
              <input
                className={`form-control`}
                id="emailSignIn"
                name="email"
                placeholder="jane@acme.com"
                type="email"
              />
              <label htmlFor="password">Password</label>
              <input
                className={`form-control`}
                id="passwordSigniIn"
                name="password"
                placeholder="Password"
                type="password"
              />
              <button className="btn btn-primary btn-lg btn-block mt-3" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
