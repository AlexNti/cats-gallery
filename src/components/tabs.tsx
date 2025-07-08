"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TabItem = {
  label: string;
  href: string;
  icon?: string;
};

type TabsProps = {
  items: TabItem[];
  className?: string;
};

const Tabs: React.FC<TabsProps> = ({ items, className = "" }) => {
  const pathname = usePathname();

  return (
    <div className={`flex gap-neo-sm ${className}`.trim()}>
      {items.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(item.href + "/");

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              px-neo-lg py-neo-md text-base font-medium transition-all duration-200
              border-neo border-neo-black shadow-neo
              ${
                isActive
                  ? "bg-neo-pink text-neo-black shadow-neo scale-105"
                  : "bg-neo-white text-neo-black hover:bg-neo-yellow hover:shadow-neo hover:scale-105"
              }
            `.trim()}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export { Tabs };
