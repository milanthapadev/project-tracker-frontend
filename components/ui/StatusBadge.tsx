"use client";

import { cn } from "@/lib/utils";
import { AppStatus, STATUS_STYLES, STATUS_LABELS } from "@/types/status";

interface StatusBadgeProps {
  status: AppStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        STATUS_STYLES[status],
        className
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}