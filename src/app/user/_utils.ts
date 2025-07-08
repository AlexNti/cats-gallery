"use client";

import { v4 as uuidv4 } from "uuid";
import { USER_ID_STORAGE_KEY } from "@/app/favourites/_constants";

export const getUserId = () => {
  return typeof window !== "undefined"
    ? window.localStorage.getItem(USER_ID_STORAGE_KEY) || uuidv4()
    : uuidv4();
};
