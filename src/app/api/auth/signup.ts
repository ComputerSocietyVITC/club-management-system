import type { NextApiRequest, NextApiResponse } from "next";

import { supabase } from "@/server/supabase";
import { User } from "../../../supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  if (
    !email ||
    !password ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return res.status(400).json({ error: "Invalid email or password format" });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  const user = data?.user as User;

  try {
    const { error: insertError } = await supabase.from("User").insert(user);

    if (insertError) {
      throw insertError;
    }

    console.log("User signed up and profile inserted successfully!");
    return res.status(200).json({ user });
  } catch (err) {
    console.error("Error inserting user profile:", err);
    return res.status(500).json({ error: "Failed to create user profile" });
  }
}
