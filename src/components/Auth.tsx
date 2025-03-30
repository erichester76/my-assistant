// src/components/Auth.tsx
"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";
import { getURL } from "@/lib/utils/helpers";

// Initialize the Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AuthComponent() {
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={["google", "azure" ]} // Optional: Add OAuth providers
      magicLink={true} // Optional: Enable magic link login
      redirectTo={getURL()} // Redirect URL after login
   />
  );
}