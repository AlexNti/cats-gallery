"use client";

import { COOKIE_MAX_AGE, COOKIE_USER_ID_KEY } from "@/app/user/_constants";
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

  document.cookie = `${name}=${value}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=lax`;
  return value;
};

export const getOrCreateUserId = (): string => {
  const userId = getCookie(COOKIE_USER_ID_KEY);

  if (userId) {
    return userId;
  }

  return createCookie(COOKIE_USER_ID_KEY, uuidv4());
};
