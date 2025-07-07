"use client";

import { v4 as uuidv4 } from "uuid";

export const getUserId = () => {
  return typeof window !== "undefined"
    ? window.localStorage.getItem("__user") || uuidv4()
    : uuidv4();
};
