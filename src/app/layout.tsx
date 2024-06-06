"use client";

import "@/styles/globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`bg-gradient-to-r from-black via-[#030b15] from-1% to-99% to-black ${montserrat.className} min-h-screen flex flex-col`}
      >
        <div className="">{children}</div>
      </body>
    </html>
  );
}
