# Web App - Claude Development Guide

## Overview

The main React application built with Vite, TypeScript, and Tailwind CSS. This is the primary user-facing application that demonstrates the shared components and utilities from the monorepo packages.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for development and building
- **React Router** for client-side routing
- **Tailwind CSS** for styling
- **Vitest** for testing
- Shared packages: `@repo/ui`, `@repo/utils`, `@repo/types`

## Project Structure

```
apps/web/
├── src/
│   ├── components/
│   │   └── Home.tsx          # Home page component
│   ├── App.tsx               # Main app component with routing
│   ├── main.tsx              # React app entry point
│   └── index.css             # Tailwind CSS imports
├── public/                   # Static assets
├── index.html                # HTML template
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
└── tsconfig.json             # TypeScript configuration
```

## Available Scripts

```bash
# Development server (runs on port 3000)
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Lint code
pnpm lint

# Clean build artifacts
pnpm clean
```

## Key Features

### Routing

The app uses React Router for navigation:

```tsx
// src/App.tsx
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}
```

### Shared Component Usage

Demonstrates all major shared components:

```tsx
// Using shared UI components
import { Button, Card, Input, Modal } from "@repo/ui"
import { formatDate, capitalize } from "@repo/utils"

function Home() {
  return (
    <Card>
      <Button variant="primary" onClick={handleClick}>
        Action Button
      </Button>
      <Input label="User Input" value={value} onChange={handleChange} />
    </Card>
  )
}
```

### Layout Structure

- **Header**: Navigation with app title and menu links
- **Main Content**: Responsive layout with max-width container
- **Component Grid**: Showcases different UI components and patterns

## Development Guidelines

### Adding New Pages

1. Create component in `src/components/` or inline in App.tsx
2. Add route to the Routes configuration
3. Update navigation links in header if needed
4. Follow existing patterns for styling and layout

### Styling Guidelines

- Import Tailwind CSS in `src/index.css`
- Import shared UI styles: `import "@repo/ui/styles"`
- Use Tailwind classes for custom styling
- Follow responsive design patterns (mobile-first)

### Component Patterns

```tsx
// Page component example
import { useState } from "react"
import { Button, Card } from "@repo/ui"
import { formatDate } from "@repo/utils"

export default function MyPage() {
  const [count, setCount] = useState(0)

  return (
    <div className="space-y-8">
      <Card>
        <h1 className="text-2xl font-bold">Page Title</h1>
        <p>Count: {count}</p>
        <Button onClick={() => setCount((c) => c + 1)}>Increment</Button>
      </Card>
    </div>
  )
}
```

### State Management

Currently uses React's built-in state management:

- `useState` for component state
- `useEffect` for side effects
- Props for data passing

For complex state, consider adding:

- Context API for app-wide state
- Custom hooks for shared logic
- External state management library if needed

## Configuration Files

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
})
```

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  ...require("@repo/config/tailwind"),
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
}
```

### TypeScript Configuration

- Extends root monorepo TypeScript config
- References shared packages for proper type resolution
- Configured for React JSX and modern ES features

## Integration with Shared Packages

### UI Components

```tsx
import { Button, Card, Input, Modal } from "@repo/ui"
import "@repo/ui/styles" // Required for Tailwind styles
```

### Utilities

```tsx
import { formatDate, capitalize, debounce } from "@repo/utils"

const formatted = formatDate(new Date())
const debounced = debounce(handleSearch, 300)
```

### Types

```tsx
import type { User, ApiResponse } from "@repo/types"

const [user, setUser] = useState<User | null>(null)
```

## Testing

### Test Structure

```tsx
// src/App.test.tsx
import { describe, it, expect } from "vitest"
import App from "./App"

describe("App", () => {
  it("should be defined", () => {
    expect(App).toBeDefined()
  })
})
```

### Testing Guidelines

- Test component exports and basic functionality
- Mock external dependencies when needed
- Use Vitest for unit testing
- Test user interactions with shared components

## Environment Variables

Add environment variables in `.env` files:

```bash
# .env.local
VITE_API_URL=http://localhost:8080
VITE_APP_NAME=Web App
```

Access in code:

```tsx
const apiUrl = import.meta.env.VITE_API_URL
```

## Performance Considerations

### Code Splitting

```tsx
// Lazy load components
import { lazy, Suspense } from "react"

const LazyComponent = lazy(() => import("./components/Heavy"))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  )
}
```

### Bundle Optimization

- Vite automatically handles code splitting
- Use dynamic imports for heavy dependencies
- Optimize images and assets
- Tree-shake unused code

## Deployment

### Build Process

```bash
# Production build
pnpm build

# Output in dist/ directory
ls dist/
```

### Static Hosting

The built app can be deployed to:

- Vercel, Netlify, or similar
- AWS S3 + CloudFront
- Any static file hosting

### Build Configuration

- Vite optimizes for production automatically
- Assets are fingerprinted for caching
- Bundle analysis available with `pnpm build --analyze`

## Troubleshooting

### Common Issues

1. **Port conflicts**: Change port in vite.config.ts if 3000 is occupied
2. **Import errors**: Ensure shared packages are built (`pnpm build`)
3. **Styling issues**: Check Tailwind content paths include package sources
4. **Hot reload not working**: Restart dev server

### Development Tips

- Use React DevTools for debugging
- Check browser console for errors
- Use Vite's fast refresh for instant updates
- Leverage TypeScript for catching errors early
