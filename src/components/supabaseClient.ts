import { createClient } from "@supabase/supabase-js";
import process from "process";

let browserClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_ANON_KEY!
);

export { browserClient };
