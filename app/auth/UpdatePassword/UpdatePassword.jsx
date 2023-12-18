"use client"
import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter, useSearchParams } from 'next/navigation';

const ConfirmSignUp = () => {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const searchParams = useSearchParams();

    const tokenFromQueryParam = searchParams.get('token');
    const emailFromQueryParam = searchParams.get('email');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase.auth.verifyOtp({
                    email: emailFromQueryParam,
                    token: tokenFromQueryParam,
                    type: 'email',
                });

                if (error) {
                    console.error('Supabase error:', error.message, error.details);
                    setErrorMsg('Failed to validate OTP token.');
                    throw new Error('Failed to validate OTP token.');
                }

                console.log('Session retrieved');
            } catch (error) {
                console.error('Inner try-catch block error:', error);
                setErrorMsg('An error occurred while retrieving the session.');
            }
        };
        fetchData();
    }, [emailFromQueryParam, tokenFromQueryParam]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update state based on the form input changes
        if (name === 'newPassword') {
            setNewPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        const newErrors = {};

        if (!newPassword) {
            newErrors.newPassword = 'New password is required';
        }

        if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        // Check if there are any errors before submitting
        if (Object.keys(newErrors).length === 0) {
            try {
                // Use Supabase API to update the password
                const { data, updateError } = await supabase.auth.updateUser({ password: newPassword })

                if (updateError) {
                    console.error('Supabase error:', updateError.message, updateError.details);
                    throw new Error('Failed to update the password.');
                } else {
                    setSuccessMsg('Password updated successfully!');
                    router.push('/account');
                }
            } catch (error) {
                console.error('Catch block error:', error);
                setErrorMsg('An error occurred while updating the password.');
            }
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center mt-5">
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">
                            New Password
                        </label>
                        <input
                            type="password"
                            className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                            id="newPassword"
                            name="newPassword"
                            value={newPassword}
                            onChange={handleChange}
                        />
                        {errors.newPassword && (
                            <div className="invalid-feedback">{errors.newPassword}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && (
                            <div className="invalid-feedback">{errors.confirmPassword}</div>
                        )}
                    </div>
                    <button
                        className="btn btn-primary btn-lg btn-block mt-3"
                        type="submit"
                        disabled={false}
                    >
                        Submit
                    </button>
                </form>
                {errorMsg && <div className="text-danger mt-3">{errorMsg}</div>}
                {successMsg && <div className="text-success mt-3">{successMsg}</div>}
            </div>
        </div>
    );
};

export default ConfirmSignUp;
