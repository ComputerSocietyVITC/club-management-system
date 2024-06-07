"use client";

import "@/styles/globals.css";
import { Montserrat } from "next/font/google";
import { ReactNode } from "react";
const montserrat = Montserrat({ subsets: ["latin"] });

import { SessionProvider, useSession } from "next-auth/react";
import Login from "@/components/log";

function SessionCheck({ children }: { children: ReactNode }) {
  const { status } = useSession();
  return status === "unauthenticated" ? (
    <Login choice="signin" />
  ) : status === "loading" ? (
    <Login choice="loading" />
  ) : (
    <>{children}</>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`bg-gradient-to-r from-black via-[#030b15] from-1% to-99% to-black ${montserrat.className} min-h-screen flex flex-col`}
      >
        <SessionProvider>
          <SessionCheck>{children}</SessionCheck>
        </SessionProvider>
      </body>
    </html>
  );
}
