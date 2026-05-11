import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/database.types";

let client: SupabaseClient<Database> | undefined;

function getClient(): SupabaseClient<Database> {
  if (!client) {
    client = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    );
  }
  return client;
}

const supabase = new Proxy({} as SupabaseClient<Database>, {
  get(_target, prop, receiver) {
    return Reflect.get(getClient(), prop, receiver);
  },
});

export default supabase;
