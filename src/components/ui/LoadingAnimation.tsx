
import React from "react";
import { cn } from "@/lib/utils";

interface LoadingAnimationProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "purple" | "magenta";
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ 
  className, 
  size = "md", 
  color = "purple" 
}) => {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const colorClasses = {
    primary: "border-t-primary",
    secondary: "border-t-secondary",
    purple: "border-t-app-purple",
    magenta: "border-t-app-magenta",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-white/10",
          sizeClasses[size],
          colorClasses[color],
          className
        )}
      />
    </div>
  );
};

export default LoadingAnimation;
