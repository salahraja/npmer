import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xfqearusvtluyszpicux.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmcWVhcnVzdnRsdXlzenBpY3V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc3MDgzNzksImV4cCI6MjAwMzI4NDM3OX0.n1zxtPise_OC5JMSndVQPtuHt_yi1AHsRkaX4AjTZoY"
);

export default supabase;
