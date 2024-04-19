"use client";

import { setUserInLocalStorage } from "@/lib/userLocalStorage";
import { supabase } from "@/server/supabase";
import { defaultUser } from "@/types/user";
import { useState } from "react";

export default function Signup() {
  /*
   * BACKEND
   */

  const [user, setUser] = useState(defaultUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
      });

      if (error) throw error;

      const populateUserTable = await supabase.from("User").insert([
        {
          registration_number: user.registration_number,
          name: user.name,
          phone_number: user.phone_number,
          department: user.department,
          role: user.role,
          email: user.email,
          github: user.github,
          admin: user.admin,
        },
      ]);

      if (populateUserTable.error) throw populateUserTable.error;

      setUserInLocalStorage({ ...user, password: "" });

      alert("User created successfully");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error signing up");
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
      <div className="flex gap-2">
        <label htmlFor="name">name</label>
        <input
          name="name"
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="text-black"
        />
      </div>
      <div className="flex gap-2">
        <label htmlFor="registrationNumber">registration number</label>
        <input
          name="registrationNumber"
          type="text"
          value={user.registration_number}
          onChange={(e) =>
            setUser({ ...user, registration_number: e.target.value })
          }
          className="text-black"
        />
      </div>
      <div className="flex gap-2">
        <label htmlFor="department">department</label>
        <input
          name="department"
          type="text"
          value={user.department}
          onChange={(e) => setUser({ ...user, department: e.target.value })}
          className="text-black"
        />
      </div>
      <div className="flex gap-2">
        <label htmlFor="phoneNumber">phone number</label>
        <input
          name="phoneNumber"
          type="number"
          value={user.phone_number}
          onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
          className="text-black"
        />
      </div>
      <div className="flex gap-2">
        <label htmlFor="role">department role</label>
        <input
          name="role"
          type="text"
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
          className="text-black"
        />
      </div>
      <div className="flex gap-2">
        <label htmlFor="github">github</label>
        <input
          name="github"
          type="url"
          value={user.github}
          onChange={(e) => setUser({ ...user, github: e.target.value })}
          className="text-black"
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}
