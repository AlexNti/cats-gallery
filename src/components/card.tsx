import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UrlObject } from "url";

type CardRootProps = {
  children: React.ReactNode;
  className?: string;
};

const CardRoot: React.FC<CardRootProps> = ({ children, className = "" }) => {
  const baseClasses = "card-neo transition-all duration-300 ease-out";

  const combinedClasses = `${baseClasses} ${className}`.trim();

  return <div className={combinedClasses}>{children}</div>;
};

type CardLinkProps = {
  children: React.ReactNode;
  href: UrlObject;
  className?: string;
  scroll?: boolean;
};

const CardLink: React.FC<CardLinkProps> = ({
  children,
  href,
  className = "",
  scroll = false,
  ...props
}) => {
  const baseClasses =
    "card-neo hover:shadow-neo-lg hover:scale-105 transition-all duration-300 ease-out cursor-pointer";
  const combinedClasses = `${baseClasses} ${className}`.trim();

  return (
    <Link href={href} scroll={scroll} className={combinedClasses} {...props}>
      {children}
    </Link>
  );
};

type CardContentProps = {
  children: React.ReactNode;
  className?: string;
};

const CardContent = ({ children, className = "" }: CardContentProps) => {
  return <div className={className}>{children}</div>;
};

type CardTitleProps = {
  children: React.ReactNode;
  className?: string;
};

const CardTitle = ({ children, className = "" }: CardTitleProps) => {
  return (
    <h3 className={`text-neo-heading text-neo-black ${className}`.trim()}>
      {children}
    </h3>
  );
};

type CardBodyProps = {
  children: React.ReactNode;
  className?: string;
};

const CardBody = ({ children, className = "" }: CardBodyProps) => {
  return (
    <div className={`text-base text-neo-black ${className}`.trim()}>
      {children}
    </div>
  );
};

type CardImageProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  quality?: number;
};

const CardImage = ({
  src,
  alt,
  className = "",
  fill = false,
  sizes,
  quality = 75,
}: CardImageProps) => {
  return (
    <div className="relative w-full h-48 overflow-hidden border-neo border-neo-black shadow-neo">
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={className}
        sizes={sizes}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        draggable={false}
        quality={quality}
      />
    </div>
  );
};

export const Card = {
  Root: CardRoot,
  RootLink: CardLink,
  Content: CardContent,
  Title: CardTitle,
  Body: CardBody,
  Image: CardImage,
};
