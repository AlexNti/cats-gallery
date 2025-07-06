import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "./button";

type AlertProps = {
  type: "error" | "success";
  title?: string;
  message: string;
  autoClose?: boolean;
  autoCloseDelay?: number;
};

export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  autoClose = true,
  autoCloseDelay = 5000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!autoClose) return;

    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, autoCloseDelay);

    return () => clearTimeout(timeoutId);
  }, [autoClose, autoCloseDelay]);

  const alertStyles = {
    error:
      "bg-neo-white border-neo border-neo-red shadow-neo-red p-neo-lg text-neo-black",
    success:
      "bg-neo-white border-neo border-neo-green shadow-neo-green p-neo-lg text-neo-black",
  };

  if (!isVisible) return null;

  const alertContent = (
    <div
      className={`${alertStyles[type]} mb-neo-lg fixed top-4 right-4 z-50 max-w-md`}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-4 justify-center items-center">
          <Button
            onClick={() => {
              setIsVisible(false);
            }}
            aria-label="Close alert"
          >
            ✕
          </Button>
          <div>
            {title && (
              <h3 className="text-neo-heading mb-neo-sm text-neo-black">
                {title}
              </h3>
            )}
            <p className="text-base text-neo-black">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(alertContent, document.body);
};
