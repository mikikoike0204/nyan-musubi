"use client";
import { useEffect } from "react";

export default function TestEnv() {
  useEffect(() => {
    console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("Supabase ANON KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  }, []);

  return <div>Check console</div>;
}