"use clients"
import { Suspense } from 'react'
import { validateOtp } from '../../../actions'
import { useSearchParams } from 'next/navigation';
export default function QuerryParams() {
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
    return (
        <Suspense>
            {String(tokenFromQueryParam)}
            {String(emailFromQueryParam)}
        </Suspense>
    )
}