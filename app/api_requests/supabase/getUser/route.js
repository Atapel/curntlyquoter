// import { createServerClient, type CookieOptions } from '@supabase/ssr'
// import { cookies } from 'next/headers'

// export default async function Page () {
//   const cookieStore = cookies()

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name: string) {
//           return cookieStore.get(name)?.value
//         },
//       },
//     }
//   )

//   return ...
// }

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request) {
  const cookieStore = cookies()

  // Von mir eingefügt
  let keks = request.headers

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        }
      },
    }
  )
let user = await supabase.auth.getUser()

  return {user}
}




