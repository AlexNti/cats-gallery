"use client";

import { USER_ID_STORAGE_KEY } from "@/app/favourites/_constants";
import { COOKIE_MAX_AGE } from "@/app/user/_constants";
import { v4 as uuidv4 } from "uuid";

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

const createCookie = (name: string, value: string): string => {
  if (typeof document === "undefined") return value;

  document.cookie = `${name}=${value}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
  return value;
};

export const getOrCreateUserId = (): string => {
  const userId = getCookie(USER_ID_STORAGE_KEY);

  if (userId) {
    return userId;
  }

  return createCookie(USER_ID_STORAGE_KEY, uuidv4());
};
