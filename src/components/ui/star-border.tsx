"use client";

import React from "react";
import { cn } from "@/lib/utils";

type StarBorderProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T;
    className?: string;
    children?: React.ReactNode;
    color?: string;
    speed?: React.CSSProperties["animationDuration"];
    thickness?: number;
  };

const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  color = "rgba(96, 119, 221, 0.8)",
  speed = "6s",
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || "button";

  return (
    <Component
      className={cn(
        "relative inline-block overflow-hidden rounded-[20px]",
        className
      )}
      {...(rest as Record<string, unknown>)}
      style={{
        padding: `${thickness}px 0`,
        ...(rest as Record<string, unknown>).style as React.CSSProperties,
      }}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className="relative z-[1] bg-gradient-to-b from-[#111118] to-[#0a0a0c] border border-[rgba(96,119,221,0.12)] text-white text-center text-base py-4 px-6 rounded-[20px]">
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
