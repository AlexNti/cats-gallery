import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  const variantClasses = {
    primary: "btn-neo btn-neo-primary",
    secondary: "btn-neo btn-neo-secondary",
    danger: "btn-neo btn-neo-danger",
    success: "btn-neo btn-neo-success",
  };

  return (
    <button className={`${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
