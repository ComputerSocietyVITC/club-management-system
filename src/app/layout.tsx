"use client";

import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { supabase } from "@/server/supabase";

import Header from "@/components/header";
import Dashboard from "@/components/dashboard";
import { setUserInLocalStorage } from "@/lib/userLocalStorage";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const _ = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user === undefined) {
        if (pathname !== "/auth/signup") {
          router.push("/auth/login");
        }
      } else {
        const { data, error } = await supabase
          .from("User")
          .select()
          .eq("email", session.user.email)
          .single();

        setUserInLocalStorage(data);
      }
    });
  }, [router, pathname]);

  return (
    <html lang="en">
      <body
        className={`bg-gradient-to-br from-[#01372f] to-black ${inter.className} min-h-screen flex flex-col`}
      >
        <Header />
        <Dashboard />
        <div className="ml-[300px]">{children}</div>
      </body>
    </html>
  );
}
