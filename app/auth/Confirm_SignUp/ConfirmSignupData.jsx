"use client"
import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect, useRouter, useSearchParams } from 'next/navigation'

const ConfirmSignUp = () => {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const searchParams = useSearchParams()

    const tokenFromQuerryParam = searchParams.get('token')
    const emailFromQuerryParam = searchParams.get('email')

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Retrieving Session
                // const { data, error } = await supabase.auth.verifyOtp({ token_hash: tokenFromQuerryParam, type: 'email' });
                const { data, error } = await supabase.auth.verifyOtp({ email: emailFromQuerryParam, token: tokenFromQuerryParam, type: 'email' })

                if (error) {
                    console.error("Supabase error:", error.message, error.details);
                    throw new Error("Failed to validate OTP token.");
                }

                console.log("Session retrieved");

            } catch (error) {
                console.error("Inner try-catch block error:", error);
            }
        };
        fetchData();

    }, []);

    const [formData, setFormData] = useState({
        givenName: '',
        familyName: '',
        companyName: '',
        phoneNumber: ''
    });

    const [errors, setErrors] = useState({});
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            console.log(user);

            const { error } = await supabase.from("User_Metadata").insert({
                User_UID: user.id,
                Given_Name: formData.givenName,
                Family_Name: formData.familyName,
                Company_Name: formData.companyName,
                Phone_Number: formData.phoneNumber
            });

            if (error) {
                console.error("Supabase error:", error.message, error.details);
                throw new Error("Failed to insert record into the database.");
            } else {
                console.log("Record inserted successfully!");
                // You can handle success here or set a state to update the component

                // Redirect after successful record insertion
                // redirect("/account");
                // router.push("/account");
            }

        } catch (error) {
            console.error("Catch block error:", error);
            // You can handle the error here or set a state to update the component
        }
    };

    return (
        <div className="card">
            <h1>Please add Additional data about yourself</h1>
            <form className="column w-full" onSubmit={handleSubmit}>
                <label htmlFor="givenName">Given Name</label>
                <input
                    className={`input ${errors.givenName && 'bg-red-50'}`}
                    id="givenName"
                    name="givenName"
                    placeholder="John"
                    type="text"
                    value={formData.givenName}
                    onChange={handleChange}
                />
                {errors.givenName && <div className="text-red-600">{errors.givenName}</div>}

                <label htmlFor="familyName">Family Name</label>
                <input
                    className={`input ${errors.familyName && 'bg-red-50'}`}
                    id="familyName"
                    name="familyName"
                    placeholder="Doe"
                    type="text"
                    value={formData.familyName}
                    onChange={handleChange}
                />
                {errors.familyName && <div className="text-red-600">{errors.familyName}</div>}

                <label htmlFor="companyName">Company Name</label>
                <input
                    className={`input ${errors.companyName && 'bg-red-50'}`}
                    id="companyName"
                    name="companyName"
                    placeholder="ACME Inc."
                    type="text"
                    value={formData.companyName}
                    onChange={handleChange}
                />
                {errors.companyName && <div className="text-red-600">{errors.companyName}</div>}

                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                    className={`input ${errors.phoneNumber && 'bg-red-50'}`}
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="1234567890"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
                {errors.phoneNumber && <div className="text-red-600">{errors.phoneNumber}</div>}


                <button className="button-inverse w-full" type="submit">
                    Submit
                </button>
            </form>
            {errorMsg && <div className="text-red-600">{errorMsg}</div>}
            {successMsg && <div className="text-black">{successMsg}</div>}
        </div>
    );
};

export default ConfirmSignUp;