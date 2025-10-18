// components/ui/card.tsx
"use client";

import React, { PropsWithChildren } from "react";

export function Card({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={
        "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm p-4 " +
        className
      }
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <div className={"mb-2 " + className}>{children}</div>;
}

export function CardTitle({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <h3 className={"text-sm font-medium text-slate-700 dark:text-slate-200 " + className}>{children}</h3>;
}

export function CardContent({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <div className={"mt-2 text-slate-900 dark:text-slate-200 " + className}>{children}</div>;
}
