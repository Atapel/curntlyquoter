"use client"
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

const PasswordReset = () => {
  const supabase = createClientComponentClient();

  const [formData, setFormData] = useState({
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation if needed

    const { error } = await supabase.auth.resetPasswordForEmail(formData.email);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg('Password reset instructions sent to your email.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <h2 className="card-title text-center">Reset Password</h2>
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

              <button className="btn btn-primary btn-lg btn-block mt-3" type="submit">
                Reset Password
              </button>
            </form>
            {successMsg && <div className="text-success mt-3">{successMsg}</div>}
            {errorMsg && <div className="text-danger mt-3">{errorMsg}</div>}
            <Link href="/auth/SignIn" className="d-block mt-3">
              Remember your password? Sign In.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
