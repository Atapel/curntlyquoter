import './globals.css'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import AuthProvider from './context/AuthProvider';
import { GlobalContextProvider } from "./context/globalContext";
import Curntly_Logo from "../public/curntly_slogan.png";
import Curntly_favIcon from "../public/curntly_Icon.png"

export const metadata = {
  title: "Curntly",
  description: "Configurator",
};

export default async function RootLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <GlobalContextProvider>
        {/* The icon causes Hydration issues, please debug */}
        {/* <head>
          <link rel="icon" href={Curntly_favIcon} sizes="any" />
        </head> */}
        <body>
          <div className='flex flex-row'>
            <img src={Curntly_Logo.src} width="500" height="100"></img>
            {/* <h1>Configurator Tool (Alpha Version)</h1> */}
          </div>
          <AuthProvider accessToken={session?.access_token}>{children}</AuthProvider>
          {/*...*/}
        </body>
      </GlobalContextProvider>
    </html>
  );
}