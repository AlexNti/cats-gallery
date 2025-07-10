"server-only";

import { v4 as uuidv4 } from "uuid";
import { USER_ID_STORAGE_KEY } from "@/app/favourites/_constants";
import { cookies } from "next/headers";
import { COOKIE_MAX_AGE } from "@/app/user/_constants";

const getCookie = async (name: string): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value || null;
};

const createCookie = async (name: string, value: string): Promise<string> => {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
  });

  return value;
};

export const getOrCreateUserId = async (): Promise<string> => {
  const userId = await getCookie(USER_ID_STORAGE_KEY);
  if (userId) {
    return userId;
  }

  return createCookie(USER_ID_STORAGE_KEY, uuidv4());
};
