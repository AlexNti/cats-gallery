"server-only";

import { v4 as uuidv4 } from "uuid";
import { USER_ID_STORAGE_KEY } from "@/app/favourites/_constants";
import { cookies } from "next/headers";

export const getUserId = async () => {
  const userId = (await cookies()).get(USER_ID_STORAGE_KEY)?.value;

  return userId || uuidv4();
};
