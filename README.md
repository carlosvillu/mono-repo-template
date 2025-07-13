# Modern Monorepo Template

A production-ready monorepo template built with modern tools and best practices for scalable web development.

## 🚀 Features

- **🏗️ Monorepo Architecture** - pnpm workspaces + Turborepo for efficient build orchestration
- **⚡ Modern Frontend Stack** - React 18 + Vite + TypeScript for blazing fast development
- **🎨 Styling** - Tailwind CSS with shared design system
- **🧪 Testing** - Vitest for unit testing with hot reload
- **📦 Shared Packages** - Reusable UI components, utilities, types, and configurations
- **🔧 Developer Experience** - ESLint, Prettier, and comprehensive tooling
- **🤖 AI-First Development** - Optimized for AI coding assistants with detailed Claude.md documentation

## 📋 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **pnpm** 8+ (Install with: `npm install -g pnpm`)

### Installation

#### Option 1: Use GitHub Template (Recommended)

1. Click **"Use this template"** button on GitHub
2. Clone your new repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

#### Option 2: Clone Directly

```bash
git clone https://github.com/carlosvillu/mono-repo-template.git
cd mono-repo-template
```

### Setup

```bash
# Install all dependencies
pnpm install

# Build all packages
pnpm build

# Start development servers
pnpm dev
```

After running `pnpm dev`, you'll have:
- **Web App**: http://localhost:3000
- **Admin App**: http://localhost:3001

## 📁 Project Structure

```
mono-repo-template/
├── apps/                    # Applications
│   ├── web/                # Main React app (port 3000)
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── admin/              # Admin React app (port 3001)
│       ├── src/
│       ├── package.json
│       └── vite.config.ts
├── packages/               # Shared packages
│   ├── ui/                # React components library
│   │   ├── src/components/
│   │   ├── src/styles.css
│   │   └── package.json
│   ├── utils/             # Shared utilities
│   │   ├── src/index.ts
│   │   └── package.json
│   ├── types/             # TypeScript type definitions
│   │   ├── src/index.ts
│   │   └── package.json
│   ├── business-logic/    # Domain logic and use cases
│   │   ├── src/_kernel/   # Architecture patterns
│   │   ├── src/dummy/     # Example domain
│   │   └── package.json
│   └── config/            # Shared configurations
│       ├── eslint.js
│       ├── tailwind.js
│       └── package.json
├── .changeset/            # Version management
├── CLAUDE.md             # AI assistant documentation
├── turbo.json            # Turborepo configuration
├── pnpm-workspace.yaml   # Workspace configuration
└── package.json          # Root package with scripts
```

## 🛠️ Available Commands

### Development

```bash
# Start all apps in development mode
pnpm dev

# Start specific app
pnpm --filter web dev       # Web app only
pnpm --filter admin dev     # Admin app only

# Start with custom port
pnpm --filter web dev -- --port 3002
```

### Building

```bash
# Build everything (packages + apps)
pnpm build

# Build specific package/app
pnpm --filter @repo/ui build
pnpm --filter web build

# Clean all builds
pnpm clean
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests for specific package
pnpm --filter @repo/utils test
pnpm --filter @repo/ui test

# Generate coverage report
pnpm test:coverage
```

### Code Quality

```bash
# Lint all code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format all code with Prettier
pnpm format

# Type check all packages
pnpm typecheck
```

### Package Management

```bash
# Add dependency to specific package
pnpm --filter web add react-router-dom
pnpm --filter @repo/ui add lucide-react
pnpm --filter admin add -D @types/node

# Add dependency to root
pnpm add -w husky

# Remove dependency
pnpm --filter web remove lodash

# Update dependencies
pnpm update
```

### Workspace Management

```bash
# List all packages
pnpm list --depth=0

# Run command in all packages
pnpm -r exec rm -rf dist

# Filter packages by pattern
pnpm --filter "*ui*" build
pnpm --filter "@repo/*" test
```

## 📦 Shared Packages

### @repo/ui

React component library with Tailwind CSS styling.

```typescript
import { Button, Card, Input, Modal } from "@repo/ui";

// Usage
<Button variant="primary" size="lg">
  Click me
</Button>
```

**Available Components:**
- `Button` - Customizable button with variants
- `Card` - Container component with shadow
- `Input` - Form input with validation states
- `Modal` - Overlay modal component

### @repo/utils

Common utility functions for data manipulation and formatting.

```typescript
import { formatDate, capitalize, slugify, debounce } from "@repo/utils";

// Usage
const formatted = formatDate(new Date(), "YYYY-MM-DD");
const slug = slugify("Hello World"); // "hello-world"
```

**Available Functions:**
- `formatDate` - Date formatting with various patterns
- `capitalize` - String capitalization
- `slugify` - Convert strings to URL-friendly slugs
- `debounce` - Function debouncing utility

### @repo/types

Shared TypeScript interfaces and types.

```typescript
import type { User, ApiResponse, ComponentVariant } from "@repo/types";

// Usage
const user: User = {
  id: "123",
  name: "John Doe",
  email: "john@example.com"
};
```

### @repo/business-logic

Domain-driven design patterns and business logic.

```typescript
import { CreateDummyUseCase, DummyEntity } from "@repo/business-logic";

// Usage - follows clean architecture patterns
const createDummy = new CreateDummyUseCase(repository);
const result = await createDummy.execute({ name: "Test" });
```

### @repo/config

Shared configurations for ESLint, Tailwind, and other tools.

```javascript
// In your package
module.exports = {
  extends: ["@repo/config/eslint"],
  // your overrides
};
```

## 🤖 AI-First Development

This monorepo is optimized for AI coding assistants, particularly **Claude Code**.

### Claude.md Documentation

Each package includes a `CLAUDE.md` file with:
- Package purpose and architecture
- Available functions and components
- Usage examples and patterns
- Development guidelines

The main `CLAUDE.md` contains:
- Complete project overview
- Essential commands and workflows
- Package structure and dependencies
- Development best practices

### Working with AI Assistants

**Benefits:**
- **Context-Aware**: Detailed documentation helps AI understand your codebase
- **Consistent Patterns**: Shared configurations ensure consistent code generation
- **Type Safety**: Strong TypeScript typing guides AI suggestions
- **Best Practices**: Pre-configured tools enforce code quality

**Tips for AI Development:**
1. Reference `CLAUDE.md` files when asking for help
2. Use shared types for consistent interfaces
3. Follow established patterns in existing components
4. Leverage the business logic patterns for domain modeling

## 🔧 Configuration

### Environment Variables

Create `.env.local` files in app directories:

```bash
# apps/web/.env.local
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=My Web App

# apps/admin/.env.local
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Admin Dashboard
```

### Customizing Tailwind

Extend the base configuration in `packages/config/tailwind.js`:

```javascript
// In your app's tailwind.config.js
module.exports = {
  presets: [require("@repo/config/tailwind")],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#your-color",
        },
      },
    },
  },
};
```

### Adding New Packages

1. Create package directory:
   ```bash
   mkdir packages/new-package
   cd packages/new-package
   ```

2. Initialize package.json:
   ```bash
   pnpm init
   ```

3. Update package.json:
   ```json
   {
     "name": "@repo/new-package",
     "version": "0.0.0",
     "main": "./dist/index.js",
     "types": "./dist/index.d.ts",
     "scripts": {
       "build": "tsc",
       "dev": "tsc --watch"
     }
   }
   ```

4. Add to workspace dependencies where needed

## 🚨 Troubleshooting

### Common Issues

**Build Failures:**
```bash
# Clear all caches and reinstall
pnpm clean
rm -rf node_modules
pnpm install
pnpm build
```

**Port Conflicts:**
```bash
# Kill processes on specific ports
npx kill-port 3000 3001

# Or start with different ports
pnpm --filter web dev -- --port 3002
```

**TypeScript Errors:**
```bash
# Rebuild package dependencies
pnpm build

# Check for circular dependencies
pnpm --filter @repo/types build
pnpm --filter @repo/utils build
```

**Hot Reload Issues:**
- Restart development servers
- Check file permissions
- Ensure proper workspace dependencies

### Performance Tips

1. **Use Turborepo caching**: Builds are cached automatically
2. **Parallel development**: Start only needed apps with `--filter`
3. **Incremental builds**: Packages rebuild only when changed
4. **Optimize imports**: Import only what you need from packages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `pnpm test`
5. Ensure code quality: `pnpm lint && pnpm typecheck`
6. Commit changes: `git commit -m 'Add amazing feature'`
7. Push to branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Turborepo](https://turbo.build/) for build orchestration
- [Vite](https://vitejs.dev/) for lightning-fast development
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vitest](https://vitest.dev/) for delightful testing experience
- [Claude Code](https://claude.ai/code) for AI-powered development

---

**Happy coding!** 🎉

For questions or support, please open an issue on GitHub.