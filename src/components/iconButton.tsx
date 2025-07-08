import React from "react";
import { Icon, IconProps } from "./icon";
import { Button, ButtonProps } from "./button";

type IconButtonProps = Omit<ButtonProps, "children"> & {
  icon: string;
  size?: IconProps["size"];
  color?: "neo-pink" | "neo-red" | "neo-gray-400";
  loading?: boolean;
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
  ...props
}) => {
  const colorClass = color ? `text-${color}` : "";

  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      variant={variant}
      className={`inline-flex items-center justify-center p-2 ${colorClass} ${className}`}
      {...props}
    >
      <Icon
        name={loading ? "spinner" : icon}
        size={size}
        className={loading ? "animate-spin text-neo-purple" : ""}
      />
    </Button>
  );
};
