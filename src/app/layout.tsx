"use client";

import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { supabase } from "@/server/supabase";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
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
        className={`bg-gradient-to-br from-[#013735] to-black h-screen ${inter.className} overflow-hidden`}
      >
        <Header />
        <section className="flex">
          <Sidebar />
          <section className="flex flex-grow mt-20 h-screen">
            {children}
          </section>
        </section>
      </body>
    </html>
  );
}
