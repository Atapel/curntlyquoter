'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'

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
    throw new Error('Login failed');
  }
  else {
    redirect('/account')
  }
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log(error);
    throw new Error('Signup failed');
  }
  else {
    redirect('/account')
  }
}

export async function confirmOtp(
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
  formData: FormData
  ) {
  const supabase = createClient()

try {
  const { data, error } = await supabase.auth.getUser();

  console.log(data);

  const { error: insertError } = await supabase.from('User_Metadata').insert({
      User_UID: data.user.id,
      Given_Name: formData.get('givenName') as string,
      Family_Name: formData.get('familyName') as string,
      Company_Name: formData.get('companyName') as string,
      Phone_Number: formData.get('phoneNumber') as string,
  });

  if (insertError) {
      console.error('Supabase error:', insertError.message, insertError.details);
      throw new Error('Failed to insert record into the database.');
  }
} catch (error) {
  console.error('Catch block error:', error);
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