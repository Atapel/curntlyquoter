import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ConfiguratorApp from './components/ConfiguratorApp';

export default async function configuratorPage() {
  const supabase = createServerComponentClient({ cookies });
  let user; // Declare user outside of the try block
  
  try {
    const {
      data: { user: userData, error },
    } = await supabase.auth.getUser();

    user = userData; // Assign userData to user
    // console.log("User ServerSide", user);

    // Redirect if user is unauthenticated
    if (!user) {
      redirect('/auth');
    }
    // Handle user retrieval error
    if (error) {
      console.error("Supabase user retrieval error:", error.message, error.details);
      throw new Error("Failed to retrieve user information.");
    }
  } catch (error) {
    // Overall error handling
    console.error("Insert configurations error:", error.message);
  }

  let userMetadata; // Declare userMetadata to store the data from the second block
  
  try {
    // Retrieve user metadata
    const { data, error } = await supabase
      .from("User_Metadata")
      .select('*')
      .eq('User_UID', user.id);

    userMetadata = data; // Assign data to userMetadata
    console.log("UserMetadata ServerSide", userMetadata);

    // Handle user retrieval error
    if (error) {
      console.error("Supabase query error:", error.message, error.details);
      throw new Error("Failed to query user information.");
    }
  } catch (error) {
    // Overall error handling
    console.error("Query User_Metadata table error:", error.message);
  }
  
  // Pass userMetadata as a prop to the configuratorApp component
  return (
    <ConfiguratorApp usermetadata={userMetadata}/>
  );
}
