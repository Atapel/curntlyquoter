"use client"
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import React from 'react';

const SignIn = () => {

  const supabase = createClientComponentClient();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);



  // const validateForm = () => {
  //   const newErrors = {};

  //   if (!formData.email) {
  //     newErrors.email = 'Required';
  //   } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
  //     newErrors.email = 'Invalid email';
  //   }

  //   if (!formData.password) {
  //     newErrors.password = 'Required';
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="card">
      <h2 className="w-full text-center">Sign In</h2>
      <form className="column w-full" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          className={`input ${errors.email && 'bg-red-50'}`}
          id="email"
          name="email"
          placeholder="jane@acme.com"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <div className="text-red-600">{errors.email}</div>}

        <label htmlFor="password">Password</label>
        <input
          className={`input ${errors.password && 'bg-red-50'}`}
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <div className="text-red-600">{errors.password}</div>}

        <Link href="/reset-password" className="link w-full">
          Forgot your password?
        </Link>

        <button className="button-inverse w-full" type="submit">
          Submit
        </button>
      </form>
      {errorMsg && <div className="text-red-600">{errorMsg}</div>}
      <Link href="/auth/SignUp" className="link w-full">
        Don&apos;t have an account? Sign Up.
      </Link>
    </div>
  );
};

export default SignIn;
