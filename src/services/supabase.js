import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://apjtfvknuiwdfwrkgfro.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwanRmdmtudWl3ZGZ3cmtnZnJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUyMzE5ODUsImV4cCI6MjAyMDgwNzk4NX0.6hFtU3o69Q7D5R52CdkbfGs8Yo5I5ZNYPPZMabOA1n0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
