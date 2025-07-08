import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";
import { USER_ID_STORAGE_KEY } from "@/app/favourites/_constants";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get(USER_ID_STORAGE_KEY)?.value;

    if (userId) {
      return NextResponse.json({ data: userId });
    }

    const newUserId = uuidv4();
    const response = NextResponse.json({ data: newUserId });

    response.cookies.set(USER_ID_STORAGE_KEY, newUserId, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Failed to retrieve or create user" },
      { status: 500 }
    );
  }
}
