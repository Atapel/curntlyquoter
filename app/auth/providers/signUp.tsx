'use client'

import { signup } from '../actions'

const SignUp = () => {
    return (
        <div className="container d-flex align-items-center justify-content-center mt-5">
        <div className="card">
            <h2 className="card-title text-center">Create Account</h2>
            <form className="column">
                <label htmlFor="email">Email</label>
                <input
                    className={`form-control`}
                    id="emailSignUp"
                    name="email"
                    placeholder="jane@acme.com"
                    type="email"
                />
                <label htmlFor="password">Password</label>
                <input
                    className={`form-control`}
                    id="passwordSignUp"
                    name="password"
                    type="password"
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    className={`form-control`}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                />
                <button className="btn btn-primary btn-lg btn-block mt-3" formAction={signup}>
                    Submit
                </button>
            </form>
        </div>
    </div>
  )
}

export default SignUp;