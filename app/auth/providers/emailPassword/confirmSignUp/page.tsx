"use client"
import { useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form"
import { confirmSignUp, validateOtp } from '../../../actions'
import { IConfirmSignupForm } from '../../../types'
export default function ConfirmSignUp () {
    

        const searchParams = useSearchParams();
        const tokenFromQueryParam = searchParams.get('token');
        const emailFromQueryParam = searchParams.get('email');
        console.log(tokenFromQueryParam,emailFromQueryParam);
        // Handle potential missing parameters gracefully
        if (!tokenFromQueryParam || !emailFromQueryParam) {
          // Log an error or redirect to a different page
          console.error('Missing confirmation parameters in URL.');
          // You can redirect here using `useRouter` from `next/router`
        }
  

    const { 
        register, 
        handleSubmit,
        setError,
        formState: { errors, isSubmitting } 
    } = useForm<IConfirmSignupForm>()

    const onSubmit: SubmitHandler<IConfirmSignupForm> = async (formData) => {
        console.log(formData)
        try {
            await confirmSignUp(
                formData
            )
        } catch (error) {
            console.error('DB insert error:', error);
            setError('root', {
                type: 'manual',
                message: error
              })
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
                    {errors.givenName && <div className="alert alert-danger" role="alert">{String(errors.givenName.message)}</div>}
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
                    {errors.familyName && <div className="alert alert-danger" role="alert">{String(errors.familyName.message)}</div>}
                    <label htmlFor="companyName">Company Name</label>
                    <input
                        className={`form-control`}
                        placeholder="Enter your company name"
                        type="text"
                        {...register(
                            "companyName",
                            { 
                                required: "Company name is required",
                            }
                        )}
                    />
                    {errors.companyName && <div className="alert alert-danger" role="alert">{String(errors.companyName.message)}</div>}
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
                    {errors.phoneNumber && <div className="alert alert-danger" role="alert">{String(errors.phoneNumber.message)}</div>}
                    {errors.root && <div className="alert alert-danger" role="alert">{String(errors.root.message)}</div>}
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