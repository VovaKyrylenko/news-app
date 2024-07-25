import { prisma } from "@/lib/db";

interface CreateUserParams {
  email: string;
  password: string;
}

export async function createUser({ email, password }: CreateUserParams) {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
}
