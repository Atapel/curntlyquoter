import "./globals.css";
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              backgroundColor: "rgba(34, 110, 147, 0.4)",
              padding: "1rem",
            }}
          >
            <img src={Curntly_Logo.src} width="350" height="80"></img>
            <h1>Configurator Tool (Alpha Version)</h1>
          </div>
          {children}
          <footer
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              backgroundColor: "rgba(34, 110, 147, 0.4)",
              padding: "0.5rem",
            }}
          >
            sales@curntly.com | 244 Fifth Avenue, Suite 1409 New York, N.Y.
            10001 | 914-512-8796
          </footer>
        </body>
      </GlobalContextProvider>
    </html>
  );
}
