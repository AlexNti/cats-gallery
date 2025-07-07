"use client";

import { useEffect, useState } from "react";
import { Alert } from "@/components/alert";

export function UserInitializer() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const response = await fetch("/user");
        const data = await response.json();
        localStorage.setItem("__user", data.data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to initialize user you will continue without a user id"
        );
      }
    };

    initializeUser();
  }, []);

  if (error) {
    return <Alert type="error" message={error} />;
  }

  return null;
}
