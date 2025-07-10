import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { COOKIE_USER_ID_KEY, COOKIE_MAX_AGE } from "@/app/user/_constants";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.get(COOKIE_USER_ID_KEY)) {
    response.cookies.set(COOKIE_USER_ID_KEY, uuidv4(), {
      sameSite: "lax",
      path: "/",
      httpOnly: false,
      maxAge: COOKIE_MAX_AGE,
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
