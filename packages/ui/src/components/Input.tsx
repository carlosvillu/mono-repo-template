import React from "react"
import { ComponentSize } from "@repo/types"
import { cn } from "@repo/utils"

interface InputProps {
  size?: ComponentSize
  error?: boolean
  disabled?: boolean
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: "text" | "email" | "password" | "number"
  className?: string
  label?: string
  errorMessage?: string
}

const sizeClasses: Record<ComponentSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-4 py-3 text-lg",
  xl: "px-6 py-4 text-xl",
}

export function Input({
  size = "md",
  error = false,
  disabled = false,
  placeholder,
  value,
  onChange,
  type = "text",
  className,
  label,
  errorMessage,
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          "block w-full rounded-md border shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
          sizeClasses[size],
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
          disabled && "bg-gray-50 cursor-not-allowed",
          className
        )}
      />
      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  )
}
