"use client"
import { redirect, useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form"
import { confirmSignUp, validateOtp } from '../../../actions'
import { IConfirmSignupForm } from '../../../types'
export default function ConfirmSignUp () {
    
    const searchParams = useSearchParams();

    const tokenFromQueryParam = searchParams.get('token');
    const emailFromQueryParam = searchParams.get('email');

    const { 
        register, 
        handleSubmit,
        setError,
        formState: { errors, isSubmitting } 
    } = useForm<IConfirmSignupForm>()

    const onSubmit: SubmitHandler<IConfirmSignupForm> = async (formData) => {
        console.log(formData)
        try {
            const error = await confirmSignUp(
                formData
            )
            if (error) {
                console.error('Supabase error:', error);
                setError('apiError', {
                    type: 'manual',
                    message: error
                  })
                throw new Error('Failed to insert record into the database.');
            }
        } catch (error) {
            console.error('DB insert error:', error);
        }
    }

    return (
        <div className="container d-flex align-items-center justify-content-center mt-5">
            <div className="card">
                <h1>Please add additional data about yourself</h1>
                <form className="column" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="givenName">Given Name</label>
                    <input
                        className={`form-control`}
                        placeholder="Enter your first name"
                        type="text"
                        {...register(
                            "givenName",
                            { 
                                required: "First name is required",
                                pattern: {
                                    value: /^\p{L}+$/u,
                                    message: "Your name can only contain letters"
                                }
                            }
                        )}
                    />
                    {errors.givenName && <div className="invalid-feedback">{errors.givenName.message}</div>}

                    <label htmlFor="familyName">Family Name</label>
                    <input
                        className={`form-control`}
                        placeholder="Enter your last name"
                        type="text"
                        {...register(
                            "familyName",
                            { 
                                required: "Family name is required",
                                pattern: {
                                    value: /^\p{L}+$/u,
                                    message: "Your name can only contain letters"
                                }
                            }
                        )}
                    />
                    {/* {errors.familyName && <div className="invalid-feedback">{errors.familyName}</div>} */}

                    <label htmlFor="companyName">Company Name</label>
                    <input
                        className={`form-control`}
                        placeholder="Enter your company name"
                        type="text"
                        {...register(
                            "companyName",
                            { 
                                required: "Company name is required",
                                // pattern: {
                                //     value: /^\p{L}+$/u,
                                //     message: "Please enter a valid company name"
                                // }
                            }
                        )}
                    />
                    {/* {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>} */}

                    <label htmlFor="phoneNumber">Phone number (optional)</label>
                    <input
                        className={`form-control`}
                        placeholder="Enter your phone number"
                        type="tel"
                        {...register(
                            "phoneNumber",
                            { 
                                required: false,
                                pattern: {
                                    value: /^\+?[0-9]{8,15}$/,
                                    message: 'Please enter a valid phone number'
                                }
                            }
                        )}
                    />
                    {/* {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>} */}

                    <button
                        className="btn btn-primary btn-lg btn-block mt-3"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};