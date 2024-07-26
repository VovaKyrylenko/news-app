import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/utils/db/create-user";
import { getUserByEmail } from "@/utils/db/get-user-by-email";
import { hashPassword } from "@utils/hash-password"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );
    }

    const user = await createUser({ email, password: hashPassword(password) });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Unknown error creating user" },
      { status: 500 },
    );
  }
}
