'use server'
// import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'
import { ISignUpForm, IConfirmSignupForm} from './types'

export async function login(
    formData: FormData
  ) {
  const supabase = createClient()
  
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  
  try{
    await supabase.auth.signInWithPassword(data)
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
  
  redirect('/account')
}

export async function signup(
  formData: ISignUpForm
  ) {
  const supabase = createClient()

  const reqData = {
    email: formData.email,
    password: formData.password,
  }

  try {
    const { data, error } = await supabase.auth.signUp(reqData)
    if (error) {
      throw new Error(error.message)
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }

  redirect('/auth/providers/emailPassword/checkYourEmails')
}

export async function validateOtp(
    emailFromQueryParam: string,
    tokenFromQueryParam: string
  ) {
  const supabase = createClient()
  try{
    const { error } = await supabase.auth.verifyOtp({
      email: emailFromQueryParam,
      token: tokenFromQueryParam,
      type: 'email',
    });
    if (error) {
        console.error('Supabase error:', error.message);
        throw new Error('Failed to validate OTP token.');
    }
    console.log('Session retrieved');
  } catch (error) {
    console.error('Session not retrieved', error);
    throw new Error(error.message);
  }
}

export async function confirmSignUp(
  // formData: FormData
  formData: IConfirmSignupForm
  ) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw new Error(`Error fetching user data: ${error.message}`);
    }

    const { error: insertError } = await supabase
      .from('User_Metadata')
      .insert({
        User_UID: data.user.id,
        Given_Name: formData.givenName,
        Family_Name: formData.familyName,
        Company_Name: formData.companyName,
        Phone_Number: formData.phoneNumber,
      });

    if (insertError) {
      throw new Error(`Error inserting user metadata: ${error.message}`);
    }
  } catch (error) {
    console.error(error);
    // Re-throw the error to allow client-side handling
    // Mot sure if just throw or throw new error
    throw new Error(error.message);
  } 

  redirect('/account')
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