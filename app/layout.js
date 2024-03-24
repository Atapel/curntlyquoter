import './globals.css'
import { GlobalContextProvider } from "./context/globalContext";
import Curntly_Logo from "../public/curntly_slogan.png";
// import Curntly_favIcon from "../public/curntly_Icon.png"

export const metadata = {
  title: "Curntly",
  description: "Configurator",
};

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <GlobalContextProvider>
        <body>
          <div className='flex flex-row'>
            <img src={Curntly_Logo.src} width="500" height="100"></img>
            {/* <h1>Configurator Tool (Alpha Version)</h1> */}
          </div>
            {children}
        </body>
      </GlobalContextProvider>
    </html>
  );
}