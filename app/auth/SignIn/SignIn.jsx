"use client"
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

const SignIn = () => {
  const supabase = createClientComponentClient();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation if needed

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <h2 className="card-title text-center">Sign In</h2>
            <form className="column" onSubmit={handleSubmit}>
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

              <Link href="/reset-password" className="d-block mt-3">
                Forgot your password?
              </Link>

              <button className="btn btn-primary btn-lg btn-block mt-3" type="submit">
                Submit
              </button>
            </form>
            {errorMsg && <div className="text-danger mt-3">{errorMsg}</div>}
            <Link href="/auth/SignUp" className="d-block mt-3">
              Don't have an account? Sign Up.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
