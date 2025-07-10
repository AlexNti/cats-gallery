"server-only";

import { COOKIE_USER_ID_KEY } from "@/app/user/_constants";
import { cookies } from "next/headers";

const getCookie = async (name: string): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value || null;
};

export const getUserId = async () => {
  return await getCookie(COOKIE_USER_ID_KEY);
};
