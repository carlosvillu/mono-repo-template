# @repo/utils Package - Claude Development Guide

## Overview

Shared utility functions and helpers for the monorepo. This package contains commonly used functions that can be shared across all apps and packages.

## Available Functions

### Date & Time Utilities

#### `formatDate(date: Date): string`

Formats a Date object to a human-readable string using Intl.DateTimeFormat.

**Usage**:

```tsx
import { formatDate } from "@repo/utils"

const formatted = formatDate(new Date()) // "December 12, 2024"
```

#### `formatCurrency(amount: number, currency = "USD"): string`

Formats a number as currency using Intl.NumberFormat.

**Usage**:

```tsx
import { formatCurrency } from "@repo/utils"

const price = formatCurrency(1234.56) // "$1,234.56"
const euros = formatCurrency(1234.56, "EUR") // "€1,234.56"
```

### String Utilities

#### `capitalize(str: string): string`

Capitalizes the first letter of a string and lowercases the rest.

**Usage**:

```tsx
import { capitalize } from "@repo/utils"

const result = capitalize("hello WORLD") // "Hello world"
```

#### `slugify(text: string): string`

Converts text to a URL-friendly slug format.

**Usage**:

```tsx
import { slugify } from "@repo/utils"

const slug = slugify("Hello World!") // "hello-world"
```

### Performance Utilities

#### `debounce<T>(func: T, wait: number): (...args: Parameters<T>) => void`

Creates a debounced version of a function that delays execution.

**Usage**:

```tsx
import { debounce } from "@repo/utils"

const debouncedSearch = debounce((query: string) => {
  // Search API call
}, 300)

// Will only execute after 300ms of no new calls
debouncedSearch("user input")
```

#### `throttle<T>(func: T, limit: number): (...args: Parameters<T>) => void`

Creates a throttled version of a function that limits execution frequency.

**Usage**:

```tsx
import { throttle } from "@repo/utils"

const throttledResize = throttle(() => {
  // Handle resize
}, 100)

window.addEventListener("resize", throttledResize)
```

### Math Utilities

#### `clamp(value: number, min: number, max: number): number`

Constrains a number between a minimum and maximum value.

**Usage**:

```tsx
import { clamp } from "@repo/utils"

const constrained = clamp(150, 0, 100) // 100
const inRange = clamp(50, 0, 100) // 50
```

### ID Generation

#### `randomId(): string`

Generates a random string ID.

**Usage**:

```tsx
import { randomId } from "@repo/utils"

const id = randomId() // "k3j2h1g9f8d7s6a5"
```

### Validation Utilities

#### `isEmailValid(email: string): boolean`

Validates if a string is a valid email format.

**Usage**:

```tsx
import { isEmailValid } from "@repo/utils"

const valid = isEmailValid("user@example.com") // true
const invalid = isEmailValid("not-an-email") // false
```

### Styling Utilities

#### `cn(...classes: (string | undefined | null | false)[]): string`

Concatenates class names, filtering out falsy values. Useful for conditional styling.

**Usage**:

```tsx
import { cn } from "@repo/utils"

const className = cn(
  "base-class",
  isActive && "active-class",
  error ? "error-class" : "normal-class",
  null, // filtered out
  undefined, // filtered out
  false // filtered out
)
```

## Development Guidelines

### Adding New Utilities

1. Add function to `src/index.ts`
2. Include TypeScript types for all parameters and return values
3. Write comprehensive tests in `src/index.test.ts`
4. Follow existing naming conventions
5. Add documentation with usage examples

### Function Design Principles

- **Pure functions**: No side effects when possible
- **Type safety**: Full TypeScript support
- **Performance**: Efficient implementations
- **Reusability**: Generic enough for multiple use cases
- **Testing**: 100% test coverage for critical functions

### Naming Conventions

- Use camelCase for function names
- Use descriptive names that indicate the function's purpose
- Group related functions (e.g., all date functions start with "format")

## Available Scripts

```bash
# Build the package
pnpm build

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Lint code
pnpm lint

# Type check
pnpm typecheck

# Clean build artifacts
pnpm clean
```

## Testing

All utilities are thoroughly tested with Vitest. Tests cover:

- Basic functionality
- Edge cases
- Type safety
- Error conditions

Example test structure:

```tsx
import { describe, it, expect } from "vitest"
import { capitalize, slugify } from "./index"

describe("capitalize", () => {
  it("should capitalize first letter", () => {
    expect(capitalize("hello")).toBe("Hello")
  })

  it("should handle empty strings", () => {
    expect(capitalize("")).toBe("")
  })
})
```

## Dependencies

### Production Dependencies

- `@repo/types` - For shared TypeScript interfaces

### Development Dependencies

- TypeScript, Vitest, ESLint for development and testing

## Usage Examples

### Form Validation

```tsx
import { isEmailValid, debounce } from "@repo/utils"

const validateEmail = debounce((email: string) => {
  if (!isEmailValid(email)) {
    setError("Invalid email format")
  }
}, 300)
```

### Component Styling

```tsx
import { cn } from "@repo/utils"

function Button({ variant, disabled, className }) {
  return (
    <button
      className={cn(
        "base-button-styles",
        variant === "primary" && "primary-styles",
        disabled && "disabled-styles",
        className
      )}
    />
  )
}
```

### Data Formatting

```tsx
import { formatCurrency, formatDate } from "@repo/utils"

function OrderSummary({ order }) {
  return (
    <div>
      <p>Total: {formatCurrency(order.total)}</p>
      <p>Date: {formatDate(order.createdAt)}</p>
    </div>
  )
}
```

## Performance Considerations

- **Debounce/Throttle**: Use for expensive operations like API calls or DOM manipulations
- **Memoization**: Consider memoizing results for expensive pure functions
- **Bundle Size**: Keep utilities lightweight and tree-shakeable
