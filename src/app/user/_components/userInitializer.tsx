"use client";

import { useEffect } from "react";
import { useAlert } from "@/components/alert";
import { getOrCreateUserId } from "@/app/user/_client.utils";

export function UserInitializer() {
  const { showError } = useAlert();

  useEffect(() => {
    const initializeUser = async () => {
      const userId = getOrCreateUserId();

      if (!userId) {
        showError(
          "Failed to initialize user you will continue without a user id"
        );
        return;
      }
    };

    initializeUser();
  }, []);

  return null;
}
