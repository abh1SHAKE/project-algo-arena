'use client'
import { Poppins } from "next/font/google";
import { Silkscreen } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import FirebaseAuthListener from "./providers/FirebaseAuthListener";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({ 
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  variable: "--font-silkscreen",
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <FirebaseAuthListener>
        <html lang="en">
          <head>
            <title>ALGO-ARENA</title>
          </head>
          <body className={`${poppins.variable} ${silkscreen.variable}`}>
            {children}
            <ToastContainer/>
          </body>
        </html>
      </FirebaseAuthListener>
    </Provider>
  );
}
