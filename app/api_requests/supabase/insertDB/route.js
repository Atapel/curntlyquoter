import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export async function POST(configurtionState) {

    const supabase = createServerComponentClient({ cookies });
    let user; // Declare user outside of the try block
    
    try {
      const {
        data: { user: userData, error },
      } = await supabase.auth.getUser();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      user = userData; // Assign userData to user

      // Handle user retrieval error
      if (error) {
        console.error("Supabase user retrieval error:", error.message, error.details);
        throw new Error("Failed to retrieve user information.");
      }
    } catch (error) {
      // Overall error handling
      console.error("Retrieve User Serverside error:", error, error.message , error.details);
    }


  



    return new Response('Test');
}