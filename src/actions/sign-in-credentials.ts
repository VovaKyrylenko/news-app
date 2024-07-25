"use server";

import { signIn } from "@/auth";
import { loginSchema } from "@/validation/login";
import { AuthError } from "next-auth";
import { z } from "zod";

export interface SignInResponse {
  success: boolean;
  error: string | null;
}

export const signInCredentials = async (
  data: z.infer<typeof loginSchema>,
): Promise<SignInResponse> => {
  try {
    const result = await signIn("credentials", { ...data, redirect: false });

    if (result?.error) {
      return { success: false, error: "Invalid credentials!" };
    }

    return { success: true, error: null };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, error: "Invalid credentials!" };
        default:
          return { success: false, error: "Something went wrong!" };
      }
    }

    return { success: false, error: "An unexpected error occurred." };
  }
};
