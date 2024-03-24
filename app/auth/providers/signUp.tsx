'use client'
import React, {useState} from 'react';
import { signup } from '../actions'

const SignUp = () => {
    // Define state for error messages if needed
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to handle the signup form submission
    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

// // Perform form validation if needed
// if (formData.password !== formData.confirmPassword) {
//     setErrors({ confirmPassword: "Passwords don't match" });
//     return;
// }
    // Create a FormData object from the form element
    const formData = new FormData(e.currentTarget);

    try {
      // Attempt to signup with the FormData object
      await signup(formData);

      // If signup is successful, you can redirect or perform other actions
      console.log('signup successful');
      setSuccessMsg('Success! Please check your email for further instructions.');
    } catch (error) {
      // If an error occurs during signup, set the error message
      setErrorMsg(error.message);
      console.error(error);
    }
    }

    return (
        <div className="container d-flex align-items-center justify-content-center mt-5">
            <div className="card">
                <h2 className="card-title text-center">Create Account</h2>
                <form className="column" onSubmit={handleSignUp}>
                    <label htmlFor="email">Email</label>
                    <input
                        className={`form-control ${errors.email && 'is-invalid'}`}
                        id="email"
                        name="email"
                        placeholder="jane@acme.com"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}

                    <label htmlFor="password">Password</label>
                    <input
                        className={`form-control ${errors.password && 'is-invalid'}`}
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        className={`form-control ${errors.confirmPassword && 'is-invalid'}`}
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}

                    <button className="btn btn-primary btn-lg btn-block mt-3" type="submit">
                        Submit
                    </button>
                </form>
                {errorMsg && <div className="text-danger mt-3">{errorMsg}</div>}
                {successMsg && <div className="text-success mt-3">{successMsg}</div>}
                {/* <Link href="/auth/SignIn" className="d-block mt-3 text-center">
                    Already have an account? Sign In.
                </Link> */}
            </div>
        </div>
    );
}

export default SignUp;

