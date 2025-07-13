import React from "react"
import { cn } from "@repo/utils"

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: "none" | "sm" | "md" | "lg"
  shadow?: "none" | "sm" | "md" | "lg"
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
}

const shadowClasses = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
}

export function Card({
  children,
  className,
  padding = "md",
  shadow = "md",
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-gray-200",
        paddingClasses[padding],
        shadowClasses[shadow],
        className
      )}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("border-b border-gray-200 pb-4 mb-4", className)}>
      {children}
    </div>
  )
}

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn("border-t border-gray-200 pt-4 mt-4", className)}>
      {children}
    </div>
  )
}

Card.Header = CardHeader
Card.Footer = CardFooter
