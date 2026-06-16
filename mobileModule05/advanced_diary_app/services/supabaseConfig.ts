import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://zlnmawuxecsagbnkxshd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpsbm1hd3V4ZWNzYWdibmt4c2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzNDU1MzksImV4cCI6MjA5NTkyMTUzOX0.Vib0RRzi8WrSRWBWwJJE67wFoJuWhAehjS7ht1GBNQk";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
