import { Montserrat } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import StoreProvider from "@/provider";
import { ToastContainer } from "react-toastify";
import styles from './page.module.css'
import { ChatInterface } from "@/components/chat";

const monserrat = Montserrat({ subsets: ["latin"]});

export const metadata = {
  title: "Flowell",
  description: "E-commerce for Flowell a floral businesses that sells flowers from south America to USA.",
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
          hideProgressBar={true}
          theme="light"
        />
        <ChatInterface />       
      </body>
    </html>
  );
}
