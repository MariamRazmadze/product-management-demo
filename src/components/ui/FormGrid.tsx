import type { ReactNode } from "react";

type FormGridProps = {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  gap?: 2 | 3 | 4 | 6;
};

export default function FormGrid({
  children,
  columns = 2,
  gap = 4,
}: FormGridProps) {
  const gridClasses = `grid gap-${gap} ${
    columns === 2
      ? "grid-cols-2"
      : columns === 3
        ? "grid-cols-3"
        : "grid-cols-4"
  }`;

  return <div className={gridClasses}>{children}</div>;
}
