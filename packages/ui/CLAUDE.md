# @repo/ui Package - Claude Development Guide

## Overview

Shared React UI components built with TypeScript and Tailwind CSS. These components are designed to be reusable across all apps in the monorepo.

## Available Components

### Button

**File**: `src/components/Button.tsx`
**Props**:

- `variant?: "primary" | "secondary" | "success" | "warning" | "error"`
- `size?: "sm" | "md" | "lg" | "xl"`
- `disabled?: boolean`
- `loading?: boolean`
- `children: React.ReactNode`
- `onClick?: () => void`
- `type?: "button" | "submit" | "reset"`
- `className?: string`

**Usage**:

```tsx
import { Button } from "@repo/ui"

;<Button variant="primary" size="lg" onClick={handleClick}>
  Click me
</Button>
```

### Input

**File**: `src/components/Input.tsx`
**Props**:

- `size?: "sm" | "md" | "lg" | "xl"`
- `error?: boolean`
- `disabled?: boolean`
- `placeholder?: string`
- `value?: string`
- `onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void`
- `type?: "text" | "email" | "password" | "number"`
- `className?: string`
- `label?: string`
- `errorMessage?: string`

**Usage**:

```tsx
import { Input } from "@repo/ui"

;<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={!!emailError}
  errorMessage={emailError}
/>
```

### Card

**File**: `src/components/Card.tsx`
**Props**:

- `children: React.ReactNode`
- `className?: string`
- `padding?: "none" | "sm" | "md" | "lg"`
- `shadow?: "none" | "sm" | "md" | "lg"`

**Sub-components**:

- `Card.Header` - For card headers with bottom border
- `Card.Footer` - For card footers with top border

**Usage**:

```tsx
import { Card } from "@repo/ui"

;<Card padding="lg" shadow="md">
  <Card.Header>
    <h3>Card Title</h3>
  </Card.Header>
  <p>Card content goes here</p>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

### Modal

**File**: `src/components/Modal.tsx`
**Props**:

- `isOpen: boolean`
- `onClose: () => void`
- `children: React.ReactNode`
- `size?: "sm" | "md" | "lg" | "xl"`
- `className?: string`

**Sub-components**:

- `Modal.Header` - Header with optional close button
- `Modal.Body` - Main content area
- `Modal.Footer` - Footer with action buttons

**Usage**:

```tsx
import { Modal } from "@repo/ui"

;<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
  <Modal.Header onClose={() => setIsModalOpen(false)}>Modal Title</Modal.Header>
  <Modal.Body>
    <p>Modal content</p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleSave}>
      Save
    </Button>
  </Modal.Footer>
</Modal>
```

## Development Guidelines

### Adding New Components

1. Create component file in `src/components/`
2. Export from `src/index.ts`
3. Follow existing patterns for props and styling
4. Add TypeScript types for all props
5. Write basic tests in `.test.tsx` file

### Styling Guidelines

- Use Tailwind CSS classes
- Follow existing design tokens (colors, spacing, etc.)
- Support `className` prop for custom styling
- Use consistent naming for variants and sizes

### TypeScript Guidelines

- Import types from `@repo/types` when available
- Use React.ReactNode for children props
- Make optional props truly optional with sensible defaults
- Export component props interfaces when they might be reused

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

## Dependencies

### Production Dependencies

- `@repo/types` - Shared TypeScript types
- `@repo/utils` - Shared utility functions (cn helper)
- `react` - React library

### Development Dependencies

- TypeScript, Vitest, ESLint, Tailwind CSS

## Tailwind Configuration

The package uses a shared Tailwind config from `@repo/config/tailwind` with these customizations:

- Extended color palette with primary and gray scales
- Content paths include both package and consuming app files
- Consistent design tokens across the monorepo

## Testing

Tests are written with Vitest and focus on:

- Component exports and function types
- Basic component behavior
- Props validation

Example test:

```tsx
import { describe, it, expect } from "vitest"
import { Button } from "./Button"

describe("Button", () => {
  it("should be a function", () => {
    expect(typeof Button).toBe("function")
  })
})
```

## Import/Export Pattern

All components are exported from the main index file:

```tsx
// src/index.ts
export { Button } from "./components/Button"
export { Input } from "./components/Input"
export { Card } from "./components/Card"
export { Modal } from "./components/Modal"
```

## Usage in Apps

```tsx
// In any app (web or admin)
import { Button, Card, Input, Modal } from "@repo/ui"
import "@repo/ui/styles" // Import Tailwind styles
```
