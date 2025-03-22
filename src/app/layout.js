import { Montserrat } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import StoreProvider from "@/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from './page.module.css'

const monserrat = Montserrat({ subsets: ["latin"]});

export const metadata = {
  title: "Flowell",
  description: "E-commerce for floral businesses",
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
            <main className={styles.mainBody}>{children}</main>
          </StoreProvider>
            <footer> 
              <Footer/>         
            </footer>
        </SessionAuthProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
        />       
      </body>
    </html>
  );
}
