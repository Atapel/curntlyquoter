'use server'
// import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'
import { ISignUpForm, IConfirmSignupForm} from './types'

export async function login(formData: FormData) {
  const supabase = createClient()
  // type-casting here for convenience
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  else {
    redirect('/account')
  }
}

export async function signup(
  // formData: FormData
  formData: ISignUpForm
  ) {
  const supabase = createClient()

  // type-casting here for convenience
  const data = {
    // email: formData.get('email') as string,
    // password: formData.get('password') as string,
    email: formData.email,
    password: formData.password,
  }
  try {
    const { error } = await supabase.auth.signUp(data)
    if (error) {
      console.log(error);
      throw new Error(error.message);
    }
    else {
      redirect('/auth/providers/emailPassword/checkYourEmails')
    }
  } catch (error) {
    console.error(error);
    return JSON.stringify(error)
  }
}

export async function validateOtp(
    emailFromQueryParam: string,
    tokenFromQueryParam: string
  ) {
  const supabase = createClient()

  const { error } = await supabase.auth.verifyOtp({
    email: emailFromQueryParam,
    token: tokenFromQueryParam,
    type: 'email',
  });

  try{
  if (error) {
      console.error('Supabase error:', error.message);
      throw new Error('Failed to validate OTP token.');
  }

  console.log('Session retrieved');
} catch (error) {
  console.error('Session not retrieved', error);
}
}

export async function confirmSignUp(
  // formData: FormData
  formData: IConfirmSignupForm
  ) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.auth.getUser();

    console.log(data);

    const { error: insertError } = await supabase.from('User_Metadata').insert({
        User_UID: data.user.id,
        Given_Name: formData.givenName,
        Family_Name: formData.familyName,
        Company_Name: formData.companyName,
        Phone_Number: formData.phoneNumber
    });

    if (insertError) {
        console.error('Supabase error:', insertError.message, insertError.details);
        throw new Error(insertError.message);
    } else {
      redirect('/account')
    }
  } catch (error) {
    console.error(error);
    return JSON.stringify(error)
  }
}

export async function logout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log(error);
  }
  else {
    redirect('/')
  }
}

export async function resetPassword(formData: FormData) {
  const supabase = createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(
    formData.get('email') as string,
  )

  if (error) {
    console.log(error);
  }
  else {
    redirect('/account')
  }
}