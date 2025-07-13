# Admin App - Claude Development Guide

## Overview

The admin dashboard application built with React, Vite, TypeScript, and Tailwind CSS. This app demonstrates how multiple applications can share the same UI components and utilities while serving different purposes.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for development and building
- **Tailwind CSS** for styling
- **Vitest** for testing
- Shared packages: `@repo/ui`, `@repo/utils`, `@repo/types`

## Project Structure

```
apps/admin/
├── src/
│   ├── components/          # Admin-specific components
│   ├── App.tsx             # Main admin app component
│   ├── main.tsx            # React app entry point
│   └── index.css           # Tailwind CSS imports
├── public/                 # Static assets
├── index.html              # HTML template (admin-specific)
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Available Scripts

```bash
# Development server (runs on port 3001)
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

### Admin Dashboard Layout

The app features a typical admin dashboard structure:

```tsx
// src/App.tsx
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Admin Dashboard
            </h1>
            <Button variant="primary" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard content */}
      </main>
    </div>
  )
}
```

### Dashboard Metrics

Displays key metrics using shared Card components:

```tsx
import { Card } from "@repo/ui"

function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <Card.Header>
          <h3 className="text-lg font-semibold">👥 Users</h3>
        </Card.Header>
        <p className="text-3xl font-bold text-primary-600">1,234</p>
        <p className="text-sm text-gray-500">Total registered users</p>
      </Card>

      <Card>
        <Card.Header>
          <h3 className="text-lg font-semibold">📊 Analytics</h3>
        </Card.Header>
        <p className="text-3xl font-bold text-green-600">98.5%</p>
        <p className="text-sm text-gray-500">System uptime</p>
      </Card>

      <Card>
        <Card.Header>
          <h3 className="text-lg font-semibold">💰 Revenue</h3>
        </Card.Header>
        <p className="text-3xl font-bold text-blue-600">$45,678</p>
        <p className="text-sm text-gray-500">This month</p>
      </Card>
    </div>
  )
}
```

## Configuration Differences from Web App

### Port Configuration

Runs on port 3001 to avoid conflicts with the web app:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Different from web app (3000)
    host: true,
  },
})
```

### HTML Template

Has admin-specific branding:

```html
<!-- index.html -->
<title>Admin App - Monorepo Template</title>
```

### Tailwind Configuration

Same shared configuration as web app but can be customized for admin-specific themes:

```javascript
// tailwind.config.js
module.exports = {
  ...require("@repo/config/tailwind"),
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  // Admin-specific theme customizations can go here
}
```

## Development Guidelines

### Admin-Specific Components

Create components tailored for admin functionality:

```tsx
// src/components/UserTable.tsx
import { Card, Button } from "@repo/ui"
import { formatDate } from "@repo/utils"
import type { User } from "@repo/types"

interface UserTableProps {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (userId: string) => void
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  return (
    <Card>
      <Card.Header>
        <h2 className="text-xl font-semibold">User Management</h2>
      </Card.Header>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(user.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onEdit(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="error"
                    onClick={() => onDelete(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
```

### Navigation Structure

Implement admin-specific navigation:

```tsx
// src/components/AdminNav.tsx
import { Button } from "@repo/ui"

interface AdminNavProps {
  currentUser?: User
  onLogout: () => void
}

export function AdminNav({ currentUser, onLogout }: AdminNavProps) {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-semibold text-gray-900">
              Admin Dashboard
            </h1>

            <div className="hidden md:flex space-x-4">
              <a
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900"
              >
                Dashboard
              </a>
              <a href="/users" className="text-gray-600 hover:text-gray-900">
                Users
              </a>
              <a href="/settings" className="text-gray-600 hover:text-gray-900">
                Settings
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {currentUser && (
              <span className="text-sm text-gray-700">
                Welcome, {currentUser.name}
              </span>
            )}
            <Button variant="primary" size="sm" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
```

## Common Admin Patterns

### Data Tables

Use shared components to build data tables:

```tsx
import { Card, Button, Input } from "@repo/ui"
import { useState } from "react"

function DataTable({ data, columns, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <Card>
      <Card.Header>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Data Management</h2>
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
      </Card.Header>

      {/* Table implementation */}
    </Card>
  )
}
```

### Forms with Validation

Create admin forms using shared components:

```tsx
import { Input, Button, Card } from "@repo/ui"
import { useState } from "react"
import { isEmailValid } from "@repo/utils"

function UserForm({ user, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  })

  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}
    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.email) newErrors.email = "Email is required"
    else if (!isEmailValid(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSave(formData)
  }

  return (
    <Card>
      <Card.Header>
        <h2 className="text-xl font-semibold">
          {user ? "Edit User" : "Create User"}
        </h2>
      </Card.Header>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          error={!!errors.name}
          errorMessage={errors.name}
        />

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          error={!!errors.email}
          errorMessage={errors.email}
        />

        <Card.Footer>
          <div className="flex space-x-2">
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </div>
        </Card.Footer>
      </form>
    </Card>
  )
}
```

## Integration with Shared Packages

### Consistent Design System

Uses the same UI components as the web app:

```tsx
import { Button, Card, Input, Modal } from "@repo/ui"
import "@repo/ui/styles"
```

### Shared Business Logic

Leverages utility functions for data processing:

```tsx
import { formatDate, formatCurrency, debounce } from "@repo/utils"

// Format data for display
const displayDate = formatDate(user.createdAt)
const displayRevenue = formatCurrency(metrics.revenue)

// Debounce search input
const debouncedSearch = debounce(handleSearch, 300)
```

### Type Safety

Uses shared types for consistency:

```tsx
import type { User, ApiResponse, UserRole } from "@repo/types"

const [users, setUsers] = useState<User[]>([])
const [loading, setLoading] = useState<LoadingState>({ isLoading: false })
```

## Testing

Testing follows the same patterns as the web app:

```tsx
// src/App.test.tsx
import { describe, it, expect } from "vitest"
import App from "./App"

describe("Admin App", () => {
  it("should be defined", () => {
    expect(App).toBeDefined()
    expect(typeof App).toBe("function")
  })
})
```

## Deployment

The admin app can be deployed separately from the web app:

- Build: `pnpm build`
- Deploy to different subdomain (e.g., `admin.example.com`)
- Can have different security/authentication requirements
- May require admin-specific environment variables

## Security Considerations

Since this is an admin application:

- Implement proper authentication/authorization
- Validate user permissions for admin access
- Use secure API endpoints
- Consider IP restrictions or VPN requirements
- Implement audit logging for admin actions

## Future Enhancements

Potential admin-specific features to add:

- User management with CRUD operations
- Analytics dashboard with charts
- System settings configuration
- Audit logs and activity tracking
- Role-based access control
- Bulk operations for data management
