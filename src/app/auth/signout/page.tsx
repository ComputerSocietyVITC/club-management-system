"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/server/supabase";

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    const signOutAndRedirect = async () => {
      await supabase.auth.signOut();
      router.push("/");
    };

    signOutAndRedirect();
  }, [router]);

  return null;
}
