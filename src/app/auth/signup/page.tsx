"use client";

import { supabase } from "@/server/supabase";
import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [github, setGithub] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) throw error;

      const populateUserTable = await supabase.from("User").insert([
        {
          registration_number: registrationNumber,
          name: name,
          phone_number: phoneNumber,
          department: department,
          role: role,
          email: email,
          github: github,
          admin: false,
        },
      ]);

      console.log(populateUserTable);

      if (populateUserTable.error) throw populateUserTable.error;

      alert("User created successfully");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error signing up");
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
      <div className="flex gap-2">
        <label htmlFor="name">name</label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-black"
        />
      </div>
      <div className="flex gap-2">
        <label htmlFor="registrationNumber">registration number</label>
        <input
          name="registrationNumber"
          type="text"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          className="text-black"
        />
      </div>
      <div className="flex gap-2">
        <label htmlFor="department">department</label>
        <input
          name="department"
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="text-black"
        />
      </div>
      <div className="flex gap-2">
        <label htmlFor="phoneNumber">phone number</label>
        <input
          name="phoneNumber"
          type="number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="text-black"
        />
      </div>
      <div className="flex gap-2">
        <label htmlFor="role">department role</label>
        <input
          name="role"
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="text-black"
        />
      </div>
      <div className="flex gap-2">
        <label htmlFor="github">github</label>
        <input
          name="github"
          type="url"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          className="text-black"
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}
