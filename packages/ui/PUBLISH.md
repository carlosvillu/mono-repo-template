# Guía de Publicación para @repo/ui

## Configuración Dual: Monorepo vs Publicación Externa

Este paquete está configurado para funcionar tanto dentro del monorepo (apuntando a archivos TypeScript) como para ser publicado externamente (apuntando a archivos JavaScript compilados).

## Estado Actual

### Para uso en el monorepo (configuración actual)
```json
{
  "main": "src/index.ts",
  "types": "src/index.ts",
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "import": "./src/index.ts"
    }
  },
  "files": ["src"]
}
```

### Para publicación externa (automáticamente configurado)
```json
{
  "main": "dist/index.js",
  "types": "dist/index.d.ts", 
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "files": ["dist", "src/styles.css"]
}
```

## Cómo Publicar el Paquete

### 1. Publicación Manual
```bash
# Asegúrate de estar en el directorio del paquete
cd packages/ui

# Instalar dependencias y compilar
pnpm install
pnpm build

# Publicar (el script prepublishOnly se ejecutará automáticamente)
npm publish
```

### 2. Publicación con Scope
```bash
# Si quieres cambiar el nombre del paquete para publicación
npm publish --access public
```

### 3. Dry Run para Probar
```bash
# Ver qué se incluiría en el paquete
pnpm publish:dry

# O manualmente
npm pack --dry-run
```

## Proceso Automático

1. **prepublishOnly**: Se ejecuta antes de publicar
   - Compila el código TypeScript (`pnpm build`)
   - Ejecuta el script de preparación para modificar package.json

2. **Durante el empaquetado**: 
   - Incluye archivos desde `dist/` (JavaScript compilado)
   - Incluye `src/styles.css` (CSS necesario)
   - Excluye archivos de desarrollo (ver `.npmignore`)

3. **postpack**: Se ejecuta después del empaquetado
   - Restaura el package.json original para uso en el monorepo

## Verificación

Después de publicar, el paquete puede ser usado externamente como:

```bash
npm install @repo/ui
```

```javascript
// En un proyecto externo
import { Button, Card, Input, Modal } from '@repo/ui'
import '@repo/ui/styles'
```

## Archivos Incluidos en la Publicación

### ✅ Incluidos
- `dist/` - JavaScript compilado y definiciones de tipos
- `src/styles.css` - Estilos de Tailwind
- `package.json` - Configuración modificada para apuntar a dist

### ❌ Excluidos (ver .npmignore)
- `src/` - Archivos TypeScript originales (excepto styles.css)
- `*.test.*` - Archivos de testing
- Archivos de configuración (tsconfig, etc.)
- Scripts y herramientas de desarrollo
- Documentación de desarrollo (CLAUDE.md)

## Ventajas de este Enfoque

1. **Sin cambios en el flujo de desarrollo**: El monorepo sigue funcionando igual
2. **Publicación automática**: No requiere modificaciones manuales del package.json
3. **Optimizado para ambos casos**: Desarrollo rápido + paquete optimizado
4. **Reversible**: El package.json se restaura automáticamente