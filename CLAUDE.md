# Claude Development Guide

This document contains essential information for Claude Code to effectively work with this monorepo.

## Project Overview

This is a modern monorepo template built with:

- **pnpm workspaces** for package management
- **Turborepo** for build orchestration and caching
- **React + Vite + TypeScript** for applications
- **Tailwind CSS** for styling
- **Vitest** for testing
- **ESLint** for linting

## Project Structure

```
mono-repo-template/
├── apps/
│   ├── web/              # Main React app (port 3000)
│   └── admin/            # Admin React app (port 3001)
├── packages/
│   ├── ui/               # Shared React components with Tailwind
│   ├── utils/            # Shared utilities and helpers
│   ├── types/            # Shared TypeScript types
│   └── config/           # Shared configurations (ESLint, Tailwind)
├── .changeset/           # Version management
├── package.json          # Root package with workspaces
├── pnpm-workspace.yaml   # Workspace configuration
└── turbo.json           # Turborepo configuration
```

## Essential Commands

### Development

```bash
# Start all apps in development mode
pnpm dev

# Start specific app
pnpm --filter web dev       # Web app on port 3000
pnpm --filter admin dev     # Admin app on port 3001
```

### Building

```bash
# Build everything (packages + apps)
pnpm build

# Build specific package/app
pnpm --filter @repo/ui build
pnpm --filter web build
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests for specific package
pnpm --filter @repo/utils test
```

### Code Quality

```bash
# Lint all code
pnpm lint

# Format all code
pnpm format

# Type check
pnpm typecheck
```

### Package Management

```bash
# Install dependencies
pnpm install

# Add dependency to specific package
pnpm --filter web add react-router-dom
pnpm --filter @repo/ui add -D @types/react

# Clean all builds
pnpm clean
```

## Shared Packages

### @repo/ui

- **Location**: `packages/ui/`
- **Purpose**: Shared React components with Tailwind CSS
- **Available components**: Button, Input, Card, Modal
- **Usage**: `import { Button } from "@repo/ui"`

### @repo/utils

- **Location**: `packages/utils/`
- **Purpose**: Shared utility functions
- **Available functions**: formatDate, capitalize, slugify, debounce, etc.
- **Usage**: `import { formatDate } from "@repo/utils"`

### @repo/types

- **Location**: `packages/types/`
- **Purpose**: Shared TypeScript types and interfaces
- **Available types**: User, ApiResponse, ComponentVariant, etc.
- **Usage**: `import type { User } from "@repo/types"`

### @repo/config

- **Location**: `packages/config/`
- **Purpose**: Shared configurations
- **Available configs**: ESLint, Tailwind base config
- **Usage**: Referenced in individual package configs

## Development Workflow

1. **Adding new features**: Create components in `@repo/ui`, utilities in `@repo/utils`
2. **Creating new apps**: Copy structure from existing apps, update ports
3. **Adding dependencies**: Use `pnpm --filter <package>` to add to specific packages
4. **Testing changes**: Use `pnpm build` to ensure everything compiles
5. **Hot reload**: Changes in packages automatically reload in apps during development

## TypeScript Configuration

- **Root config**: `tsconfig.json` with project references
- **Package configs**: Each package has its own `tsconfig.json` extending root
- **Path mapping**: Packages are mapped for easy imports (`@repo/*`)

## Important Notes

- **Package manager**: Always use `pnpm`, never `npm` or `yarn`
- **Workspaces**: Use `workspace:*` for internal package dependencies
- **Builds**: Packages must build before apps can use them
- **Ports**: Web app runs on 3000, admin on 3001
- **Caching**: Turborepo caches builds for faster subsequent runs

## Troubleshooting

### Build Issues

- Run `pnpm clean` then `pnpm install` if builds fail
- Check TypeScript references in `tsconfig.json` files
- Ensure packages build before apps

### Development Issues

- Make sure all dependencies are installed: `pnpm install`
- Check that ports 3000 and 3001 are available
- Restart dev servers if hot reload isn't working

### Testing Issues

- Tests use Vitest, check `vitest.config.ts` files
- Mock external dependencies in test files
- Use `pnpm test:watch` for interactive testing

## Best Practices

1. **Component Development**: Create reusable components in `@repo/ui`
2. **Utility Functions**: Add shared logic to `@repo/utils`
3. **Type Safety**: Define shared types in `@repo/types`
4. **Testing**: Write tests for utilities and components
5. **Documentation**: Update this file when adding new features or packages
