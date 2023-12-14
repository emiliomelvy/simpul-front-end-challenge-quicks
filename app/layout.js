import { Inter } from "next/font/google";
import "./globals.css";
import Open from "./components/Open";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quicks",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={inter.className}>{children}</body> */}
      <body>
        <div>{children}</div>
        <Open></Open>
      </body>
    </html>
  );
}
