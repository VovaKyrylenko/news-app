"use server";

import { signIn } from "@/auth";
import { loginSchema } from "@/lib/login-schema";
import { AuthError } from "next-auth";
import { z } from "zod";

export const signInCredentials = async (data: z.infer<typeof loginSchema>) => {
  try {
    await signIn("credentials", { ...data, redirect: false });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("error cause:", error.type);
      if (error.type === "CredentialsSignin") {
        return { error: "Invalid credentials!" };
      } else {
        return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
