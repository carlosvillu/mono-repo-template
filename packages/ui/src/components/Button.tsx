import React from "react"
import { ComponentVariant, ComponentSize } from "@repo/types"
import { cn } from "@repo/utils"

interface ButtonProps {
  variant?: ComponentVariant
  size?: ComponentSize
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  className?: string
}

const variantClasses: Record<ComponentVariant, string> = {
  primary: "bg-primary-600 hover:bg-primary-700 text-white",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  success: "bg-green-600 hover:bg-green-700 text-white",
  warning: "bg-yellow-600 hover:bg-yellow-700 text-white",
  error: "bg-red-600 hover:bg-red-700 text-white",
}

const sizeClasses: Record<ComponentSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
  xl: "px-8 py-4 text-xl",
}

export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  children,
  onClick,
  type = "button",
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        variantClasses[variant],
        sizeClasses[size],
        (disabled || loading) && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children} !!!!!
    </button>
  )
}
