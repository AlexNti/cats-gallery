import React from "react";
import { Icon, IconProps } from "./icon";
import { Button } from "./button";

type IconButtonProps = {
  icon: string;
  onClick: () => void;
  className?: string;
  size?: IconProps["size"];
  disabled?: boolean;
  "aria-label"?: string;
  variant?: "primary" | "secondary" | "danger" | "success" | "ghost";
  loading?: boolean;
  color?: "neo-pink" | "neo-red" | "neo-gray-400";
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  className = "",
  size = "medium",
  disabled = false,
  "aria-label": ariaLabel,
  variant = "ghost",
  loading = false,
  color,
}) => {
  const colorClass = color ? `text-${color}` : "";

  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      variant={variant}
      className={`inline-flex items-center justify-center p-2 ${colorClass} ${className}`}
    >
      <Icon
        name={loading ? "spinner" : icon}
        size={size}
        className={loading ? "animate-spin text-neo-purple" : ""}
      />
    </Button>
  );
};
