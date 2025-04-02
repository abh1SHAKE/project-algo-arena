'use client'
import { Poppins } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const poppins = Poppins({ 
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={`${poppins.variable}`}>
          {children}
        </body>
      </html>
    </Provider>
  );
}
