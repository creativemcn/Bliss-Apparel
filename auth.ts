"use server";

import { createServiceClient } from "@/lib/supabase/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type AuthActionResult = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function registerUser(formData: FormData): Promise<AuthActionResult> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = parsed.data;
  const supabase = createServiceClient();

  // Check if email already exists
  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("email", email.toLowerCase())
    .single();

  if (existing) {
    return {
      success: false,
      error: "An account with this email already exists. Please sign in instead.",
    };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const { error } = await supabase.from("users").insert({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    role: "user",
  });

  if (error) {
    console.error("Register error:", error);
    return {
      success: false,
      error: "Failed to create account. Please try again.",
    };
  }

  return { success: true };
}
