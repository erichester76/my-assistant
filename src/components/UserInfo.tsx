// src/components/UserInfo.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function UserInfo() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("[UserInfo] Error fetching user:", error.message);
      } else {
        console.log("[UserInfo] Current user:", user ? user.email : "No user");
      }
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <div>
      {user ? `Logged in as: ${user.email}` : "Not logged in"}
    </div>
  );
}