"use client";

import React, { FC } from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  fullScreen?: boolean;
}

// loading spinner component with different sizes and fullscreen option
const LoadingSpinner: FC<LoadingSpinnerProps> = ({ size = "md", className = "", fullScreen = false }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 bg-white flex items-center justify-center z-50"
    : `flex items-center justify-center ${className}`;

  return (
    <div className={containerClasses}>
      <div
        className={`${sizeClasses[size]} border-4 border-yellow-200 border-t-yellow-400 rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;