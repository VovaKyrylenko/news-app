import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./validation/login";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./utils/db/get-user-by-email";

export default {
  providers: [
    Credentials({
      name: "Credentials",
      authorize: async (credentials) => {
        const validatedFields = loginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (user && (await bcrypt.compare(password, user.password))) {
            return { id: user.id, email: user.email };
          } else {
            return null;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
