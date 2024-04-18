"use client";

import { supabase } from "@/server/supabase";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      alert("User Logged in successfully");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error Logging in up");
    }
  };

  // TODO: Actually make the login form look good
  return (
    <form onSubmit={handleSubmit} className="flex flex-col text-white gap-4">
      <div className="flex gap-2">
        <label htmlFor="email">email</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-black"
        />
      </div>
      <div className="flex gap-2">
        <label htmlFor="password">password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-black"
        />
      </div>
      <button type="submit">Log in</button>
    </form>
  );
}
