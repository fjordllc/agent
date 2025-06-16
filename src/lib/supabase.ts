import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/lib/database.types";

const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
);

export default supabase;
