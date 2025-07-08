"use client";

import { useEffect } from "react";
import { USER_ID_STORAGE_KEY } from "@/app/favourites/_constants";
import { useAlert } from "@/components/alert";

export function UserInitializer() {
  const { showError } = useAlert();

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const response = await fetch("/user");
        const data = await response.json();
        localStorage.setItem(USER_ID_STORAGE_KEY, data.data);
      } catch (error) {
        showError(
          error instanceof Error
            ? error.message
            : "Failed to initialize user you will continue without a user id"
        );
      }
    };

    initializeUser();
  }, []);

  return null;
}
