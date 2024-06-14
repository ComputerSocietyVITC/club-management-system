"use client";

import "@/styles/globals.css";
import { Montserrat } from "next/font/google";
import { ReactNode, useEffect, useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import Login from "@/components/log";
import Header from "@/components/header";
import { FloatingNav } from "@/components/navbar";

const montserrat = Montserrat({ subsets: ["latin"] });

function SessionCheck({ children }: { children: ReactNode }) {
  const { status } = useSession();
  return status === "unauthenticated" ? (
    <Login choice="signin" />
  ) : status === "loading" ? (
    <Login choice="loading" />
  ) : (
    <>
      <SessionProvider>
        <Header />
        <FloatingNav />
        {children}
      </SessionProvider>
    </>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`bg-gradient-to-r from-black via-[#04101d] from-20% to-80% to-black ${montserrat.className} min-h-screen flex flex-col`}
      >
        <SessionProvider>
          <SessionCheck>{children}</SessionCheck>
        </SessionProvider>
      </body>
    </html>
  );
}
