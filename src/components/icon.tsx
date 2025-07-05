import React from "react";

export type IconProps = {
  name: string;
  className?: string;
  size?: "small" | "medium";
};

const viewBox = {
  small: "0 0 16 16",
  medium: "0 0 20 20",
};

const _size = {
  small: 16,
  medium: 20,
};

export const Icon: React.FC<IconProps> = ({
  name,
  className = "",
  size = "medium",
}) => {
  return (
    <svg
      className={className}
      width={_size[size]}
      height={_size[size]}
      viewBox={viewBox[size]}
      stroke="currentColor"
      fill="none"
    >
      <use href={`/sprite.svg#icon-${name}`} />
    </svg>
  );
};
