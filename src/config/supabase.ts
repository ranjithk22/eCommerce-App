import { createClient } from "@supabase/supabase-js";

const VITE_SUPABASE_URL = "https://uthmvldgliquxsoqmtsd.supabase.co";
const VITE_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);
export default supabase;
