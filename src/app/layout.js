import { Montserrat } from "next/font/google";
import "./globals.css";
import Navigation from "../_components/_layout_components/navigation_bar/Navigation"
import SessionAuthProvider from "@/context/SessionAuthProvider";
import StoreProvider from "@/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
          <StoreProvider>
            <header>
              <Navigation/>
            </header>
            <main>{children}</main>
            </StoreProvider>
            <footer>          
            </footer>
        </SessionAuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={1500}
        />       
      </body>
    </html>
  );
}
