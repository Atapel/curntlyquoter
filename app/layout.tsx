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
          <div className='flex-row'>
            <img className='flex-col' src={Curntly_Logo.src} width="350" height="80"></img>
            <p className='flex-col'>Configurator Tool (Alpha Version)</p>
          </div>
            {children}
        </body>
      </GlobalContextProvider>
    </html>
  );
}