import { Montserrat } from "next/font/google";
import "./globals.css";
import Navigation from "../_components/_layout_components/navigation_bar/Navigation"
import SessionAuthProvider from "@/context/SessionAuthProvider";
const monserrat = Montserrat({ subsets: ["latin"]});

export const metadata = {
  title: "Flowell",
  description: "E-commerce for floral business",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={monserrat.className}>
        <SessionAuthProvider>
          <header>
            <Navigation/>
          </header>
          <main>{children}</main>
          <footer>          
          </footer>
        </SessionAuthProvider>       
      </body>
    </html>
  );
}
