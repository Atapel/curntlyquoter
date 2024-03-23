"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { confirmSignUp } from '../actions'
const ConfirmSignUp = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const tokenFromQueryParam = searchParams.get('token');
    const emailFromQueryParam = searchParams.get('email');

    const [formData, setFormData] = useState({
        givenName: '',
        familyName: '',
        companyName: '',
        phoneNumber: ''
    });

    const [errors, setErrors] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {error} = confirmOtp(
                    emailFromQueryParam,
                    tokenFromQueryParam
                )

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

        // Interactive input controls based on input name
        if (name === 'phoneNumber') {
            // Allow only numeric input, '+' '*', and '#' symbols
            const sanitizedValue = value.replace(/[^0-9*#+]/g, '');
            setFormData({ ...formData, [name]: sanitizedValue });
        } else if (name === 'givenName' || name === 'familyName') {
            // Allow only alphabetic input
            const alphabeticValue = value.replace(/[^A-Za-z]/gi, '');
            setFormData({ ...formData, [name]: alphabeticValue });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform form validation
        const newErrors = {};

        if (!formData.givenName.trim()) {
            newErrors.givenName = 'Required';
        }

        if (!formData.familyName.trim()) {
            newErrors.familyName = 'Required';
        }

        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Required';
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Required';
        }

        setErrors(newErrors);

        // Check if there are any errors before submitting
        if (Object.keys(newErrors).length === 0) {
            try {
                const {error} = confirmSignUp(
                    formData
                )

                if (error) {
                    console.error('Supabase error:', error.message);
                    throw new Error('Failed to insert record into the database.');
                } else {
                    setSuccessMsg('Record inserted successfully!');

                    // redirect("/account");
                    router.push("/account");
                }
            } catch (error) {
                console.error('Catch block error:', error);
                setErrorMsg('An error occurred while inserting the record.');
            }
        }
    };

    const isSubmitDisabled =
        !formData.givenName.trim() ||
        !formData.familyName.trim() ||
        !formData.companyName.trim() ||
        !formData.phoneNumber.trim();

    return (
        <div className="container d-flex align-items-center justify-content-center mt-5">
            <div className="card">
                <h1>Please add additional data about yourself</h1>
                <form className="column" onSubmit={handleSubmit}>
                    <label htmlFor="givenName">Given Name</label>
                    <input
                        className={`form-control ${errors.givenName && 'is-invalid'}`}
                        id="givenName"
                        name="givenName"
                        placeholder="John"
                        type="text"
                        value={formData.givenName}
                        onChange={handleChange}
                    />
                    {errors.givenName && <div className="invalid-feedback">{errors.givenName}</div>}

                    <label htmlFor="familyName">Family Name</label>
                    <input
                        className={`form-control ${errors.familyName && 'is-invalid'}`}
                        id="familyName"
                        name="familyName"
                        placeholder="Doe"
                        type="text"
                        value={formData.familyName}
                        onChange={handleChange}
                    />
                    {errors.familyName && <div className="invalid-feedback">{errors.familyName}</div>}

                    <label htmlFor="companyName">Company Name</label>
                    <input
                        className={`form-control ${errors.companyName && 'is-invalid'}`}
                        id="companyName"
                        name="companyName"
                        placeholder="ACME Inc."
                        type="text"
                        value={formData.companyName}
                        onChange={handleChange}
                    />
                    {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}

                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        className={`form-control ${errors.phoneNumber && 'is-invalid'}`}
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="1234567890"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                    {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}

                    <button
                        className="btn btn-primary btn-lg btn-block mt-3"
                        type="submit"
                        disabled={isSubmitDisabled}
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