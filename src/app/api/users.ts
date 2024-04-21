import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/server/supabase";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data: user, error } = await supabase.from("User").select();

    if (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error parsing server response:", error);
    return res.status(500).json({ error: "Error parsing server response" });
  }
}
