'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { signup } from '../../actions';
import { ISignUpForm } from '../../types'
const SignUp = () => {
  const { 
    register, 
    handleSubmit, 
    setError, 
    formState: { 
      errors,
      isSubmitting},
    watch
  } = useForm();
  const password = watch('password');
  const handleSignUp = async (formData:ISignUpForm) => {
    try {
      await signup(formData);
      console.log('signup successful');
    } catch (error) {
      setError('apiError', {
        type: 'manual',
        message: error.message
      });
      console.error(error);
    }
  }
  return (
    <div className="container d-flex align-items-center justify-content-center mt-5">
      <div className="card">
        <h2 className="card-title text-center">Create Account</h2>
        <form className="column" onSubmit={handleSubmit(handleSignUp)}>
          <label htmlFor="email">Email</label>
          <input
            className={`form-control`}
            placeholder="Please enter your e-mail"
            type="email"
            {...register(
              'email', 
              { 
                required: 'Email is required',
                pattern : {
                  value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email address'
                }
              })}
          />
          {errors.email && <div className="alert alert-danger" role="alert">{String(errors.email.message)}</div>}
          <label htmlFor="password">Password</label>
          <input
            className={`form-control`}
            placeholder='Please enter your password'
            type="password"
            {...register(
              'password', 
              { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long' 
                }
              })}
          />
          {errors.password && <div className="alert alert-danger" role="alert">{String(errors.password.message)}</div>}
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className={`form-control`}
            placeholder='Please confirm your password'
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              minLength: 6,
              validate: value => value === password || 'Passwords do not match'
            })}
          />
          {errors.confirmPassword && <div className="alert alert-danger" role="alert">{String(errors.confirmPassword.message)}</div>}
          {errors.root && <div className="alert alert-danger" role="alert">{String(errors.root.message)}</div>}
          <button 
            className="btn btn-primary btn-lg btn-block mt-3" 
            type="submit"
            disabled={
              isSubmitting
            }
            >
            Submit
          </button>
        </form>
        
      </div>
    </div>
  );
}
export default SignUp;