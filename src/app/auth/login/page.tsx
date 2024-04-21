"use client";

import { supabase } from "@/server/supabase";

import { defaultUser } from "@/types/user";
import { useState } from "react";

import { setUserInLocalStorage } from "@/lib/userLocalStorage";

export default function Login() {
  /*
   * BACKEND
   */

  const [user, setUser] = useState(defaultUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });

      if (error) throw error;

      const populateUser = await supabase
        .from("User")
        .select()
        .eq("email", user.email)
        .single();

      if (populateUser.error) throw populateUser.error;

      setUserInLocalStorage(populateUser.data);

      alert("User Logged in successfully");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error Logging in up");
    }
  };

  /*
   * FRONTEND
   */

  // TODO: Actually make the login form look good
  return (
    <form onSubmit={handleSubmit} className="flex flex-col text-white gap-4">
      <div className="flex gap-2">
        <label htmlFor="email">email</label>
        <input
          name="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="text-black"
        />
      </div>
      <div className="flex gap-2">
        <label htmlFor="password">password</label>
        <input
          name="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="text-black"
        />
      </div>
      <button type="submit">Log in</button>
    </form>
  );
}
