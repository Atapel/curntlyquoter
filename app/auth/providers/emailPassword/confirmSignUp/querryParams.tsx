"use client"
import { useEffect,useState } from 'react'
import { validateOtp } from '../../../actions'
import { useSearchParams } from 'next/navigation';
export default function QuerryParams() {
    const [error, setError] = useState(null);
    const searchParams = useSearchParams();
    const tokenFromQueryParam = searchParams.get('token')
    const emailFromQueryParam = searchParams.get('email')
    useEffect(() => {
        const otpVal = async () => {
            try{
                await validateOtp( 
                    emailFromQueryParam,
                    tokenFromQueryParam 
                )
                console.log("Otp validated")
            } catch (error){
                setError(error.messages);
                console.log("Error validating otp")
            }
        }
        otpVal()
    },[])

    return (
        <>
          {error && <p>Error: {error}</p>}
        </>
      );
}