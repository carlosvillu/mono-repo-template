# @repo/types Package - Claude Development Guide

## Overview

Shared TypeScript types, interfaces, and enums for the entire monorepo. This package ensures type consistency across all apps and packages.

## Available Types

### User Management

#### `User` Interface

Represents a user in the system.

```typescript
interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}
```

#### `UserRole` Enum

Defines user permission levels.

```typescript
enum UserRole {
  USER = "user",
  ADMIN = "admin",
  MODERATOR = "moderator",
}
```

**Usage**:

```tsx
import type { User, UserRole } from "@repo/types"

const user: User = {
  id: "123",
  email: "user@example.com",
  name: "John Doe",
  role: UserRole.USER,
  createdAt: new Date(),
  updatedAt: new Date(),
}
```

### API Response Types

#### `ApiResponse<T>` Interface

Standard API response wrapper.

```typescript
interface ApiResponse<T = unknown> {
  data: T
  message?: string
  success: boolean
  error?: string
}
```

**Usage**:

```tsx
import type { ApiResponse, User } from "@repo/types"

// API function return type
async function getUser(id: string): Promise<ApiResponse<User>> {
  // Implementation
}

// Usage in components
const response: ApiResponse<User[]> = await getUsers()
```

#### `PaginatedResponse<T>` Interface

API response with pagination information.

```typescript
interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
```

**Usage**:

```tsx
import type { PaginatedResponse, User } from "@repo/types"

const response: PaginatedResponse<User> = await getUsersPaginated(1, 10)
console.log(response.pagination.totalPages)
```

### Base Types

#### `BaseEntity` Interface

Common fields for database entities.

```typescript
interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}
```

**Usage**:

```tsx
import type { BaseEntity } from "@repo/types"

interface Product extends BaseEntity {
  name: string
  price: number
  description: string
}
```

#### `LoadingState` Interface

Standard loading state pattern.

```typescript
interface LoadingState {
  isLoading: boolean
  error?: string
}
```

**Usage**:

```tsx
import type { LoadingState } from "@repo/types"
import { useState } from "react"

function useApiCall() {
  const [state, setState] = useState<LoadingState>({
    isLoading: false,
  })

  // Implementation
}
```

### UI Component Types

#### `ComponentVariant` Type

Standard variant options for UI components.

```typescript
type ComponentVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
```

#### `ComponentSize` Type

Standard size options for UI components.

```typescript
type ComponentSize = "sm" | "md" | "lg" | "xl"
```

#### `ButtonProps` Interface

Props interface for Button components.

```typescript
interface ButtonProps {
  variant?: ComponentVariant
  size?: ComponentSize
  disabled?: boolean
  loading?: boolean
  children: any
  onClick?: () => void
}
```

**Usage**:

```tsx
import type { ButtonProps, ComponentVariant } from "@repo/types"

function CustomButton({ variant = "primary", ...props }: ButtonProps) {
  // Implementation
}
```

## Development Guidelines

### Adding New Types

1. Add types to `src/index.ts`
2. Use clear, descriptive names
3. Include JSDoc comments for complex types
4. Export all types that might be used by other packages
5. Group related types together

### Naming Conventions

- **Interfaces**: PascalCase (e.g., `UserProfile`)
- **Type aliases**: PascalCase (e.g., `ComponentVariant`)
- **Enums**: PascalCase (e.g., `UserRole`)
- **Generic type parameters**: Single uppercase letter (e.g., `T`, `K`, `V`)

### Type Design Principles

- **Consistency**: Use similar patterns across related types
- **Extensibility**: Design types to be easily extended
- **Specificity**: Be as specific as possible while maintaining reusability
- **Documentation**: Include JSDoc comments for complex types

### Generic Types

Use generics for reusable type patterns:

```typescript
// Good: Generic API response
interface ApiResponse<T = unknown> {
  data: T
  success: boolean
}

// Good: Generic paginated list
interface PaginatedList<T> {
  items: T[]
  total: number
  page: number
}
```

## Available Scripts

```bash
# Build the package
pnpm build

# Lint code
pnpm lint

# Type check
pnpm typecheck

# Clean build artifacts
pnpm clean
```

## Usage Patterns

### Import Types

Always use `type` imports for type-only imports:

```tsx
// Correct
import type { User, ApiResponse } from "@repo/types"

// Avoid (runtime import for types)
import { User, ApiResponse } from "@repo/types"
```

### Extending Types

Build upon base types for specific use cases:

```tsx
import type { BaseEntity, User } from "@repo/types"

interface ExtendedUser extends User {
  preferences: UserPreferences
  subscription: Subscription
}

interface Product extends BaseEntity {
  name: string
  price: number
  category: string
}
```

### Type Guards

Create type guards for runtime type checking:

```tsx
import type { User, UserRole } from "@repo/types"

function isAdmin(user: User): boolean {
  return user.role === UserRole.ADMIN
}

function isUser(obj: any): obj is User {
  return obj && typeof obj.id === "string" && typeof obj.email === "string"
}
```

## Common Patterns

### API Response Handling

```tsx
import type { ApiResponse, User } from "@repo/types"

async function handleUserFetch(): Promise<User | null> {
  const response: ApiResponse<User> = await fetchUser()

  if (response.success) {
    return response.data
  } else {
    console.error(response.error)
    return null
  }
}
```

### Form State Types

```tsx
import type { User } from "@repo/types"

type UserFormData = Pick<User, "name" | "email">
type UserUpdateData = Partial<Pick<User, "name" | "email" | "avatar">>

function UserForm() {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
  })
}
```

### Component Props with Variants

```tsx
import type { ComponentVariant, ComponentSize } from "@repo/types"

interface CardProps {
  variant?: ComponentVariant
  size?: ComponentSize
  children: React.ReactNode
  className?: string
}
```

## Dependencies

This package has no runtime dependencies, only development dependencies for building and type checking:

- TypeScript for compilation
- ESLint for linting

## Best Practices

1. **Keep types pure**: No runtime code in this package
2. **Export everything**: All types should be exported for use
3. **Use strict types**: Avoid `any` and prefer specific types
4. **Document complex types**: Add JSDoc comments for clarity
5. **Version carefully**: Type changes can break consuming packages
