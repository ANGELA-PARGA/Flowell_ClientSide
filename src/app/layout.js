import { Montserrat } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import { ReduxProvider } from "@/store/ReduxProvider";
import { ReduxErrorBoundary } from "@/components/ReduxErrorBoundary";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";
import { ChatInterface } from "@/components/chat";
import { ToastContainer } from "react-toastify";
import styles from './page.module.css'


const monserrat = Montserrat({ subsets: ["latin"]});

export const metadata = {
  title: "Flowell",
  description: "E-commerce for Flowell a floral businesses that sells flowers from south America to USA.",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  
  return (
    <html lang="en">
      <body className={monserrat.className}>
        <SessionAuthProvider session={session}>
          <ReduxErrorBoundary>
            <ReduxProvider>
              <header>
                <Navigation/>
              </header>
              <main className={styles.mainBody}>{children}</main>                    
              <footer> 
                <Footer/>         
              </footer>
              <ChatInterface /> 
            </ReduxProvider>
          </ReduxErrorBoundary>
        </SessionAuthProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={true}
          theme="light"
        />              
      </body>
    </html>
  );
}
