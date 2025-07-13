#!/usr/bin/env node

/**
 * Script para preparar el package.json para publicación externa
 * Modifica las rutas para apuntar a dist/ en lugar de src/
 */

const fs = require("fs")
const path = require("path")

const PACKAGE_JSON_PATH = path.join(__dirname, "../package.json")
const BACKUP_PATH = path.join(__dirname, "../package.json.backup")

function prepareForPublish() {
  // Leer el package.json actual
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, "utf8"))

  // Hacer backup del package.json original
  fs.writeFileSync(BACKUP_PATH, JSON.stringify(packageJson, null, 2))

  // Crear copia para modificar
  const publishPackageJson = { ...packageJson }

  // Actualizar main y types para apuntar a dist
  publishPackageJson.main = "dist/index.js"
  publishPackageJson.types = "dist/index.d.ts"

  // Transformar exports dinámicamente para apuntar a dist
  if (publishPackageJson.exports) {
    const transformedExports = {}
    
    for (const [key, value] of Object.entries(publishPackageJson.exports)) {
      if (typeof value === 'string') {
        // Si es un string simple, transformar según el tipo de archivo
        if (value.endsWith('.css')) {
          // Mantener archivos CSS sin cambios
          transformedExports[key] = value
        } else if (value.endsWith('.ts')) {
          // Para archivos .ts, cambiar a .js y src -> dist
          transformedExports[key] = value.replace(/^\.\/src\//, './dist/').replace(/\.ts$/, '.js')
        } else {
          // Para otros archivos, solo cambiar src -> dist
          transformedExports[key] = value.replace(/^\.\/src\//, './dist/')
        }
      } else if (typeof value === 'object') {
        // Si es un objeto, transformar cada propiedad
        transformedExports[key] = {}
        for (const [subKey, subValue] of Object.entries(value)) {
          if (typeof subValue === 'string') {
            if (subKey === 'types' || subKey === 'import' || subKey === 'require') {
              // Para types, import y require, cambiar src por dist y .ts por extensión apropiada
              let transformed = subValue.replace(/^\.\/src\//, './dist/')
              if (subKey === 'types') {
                transformed = transformed.replace(/\.ts$/, '.d.ts')
              } else if (subKey === 'import') {
                transformed = transformed.replace(/\.ts$/, '.js')
              } else if (subKey === 'require') {
                transformed = transformed.replace(/\.ts$/, '.js')
              }
              transformedExports[key][subKey] = transformed
            } else {
              // Para otros campos, mantener como está
              transformedExports[key][subKey] = subValue
            }
          } else {
            transformedExports[key][subKey] = subValue
          }
        }
      } else {
        transformedExports[key] = value
      }
    }
    
    publishPackageJson.exports = transformedExports
  }

  // Actualizar files para incluir dist en lugar de src
  publishPackageJson.files = ["dist", "src/styles.css"]

  // Escribir el package.json modificado
  fs.writeFileSync(
    PACKAGE_JSON_PATH,
    JSON.stringify(publishPackageJson, null, 2)
  )

  console.log("✅ package.json preparado para publicación")
  console.log("📁 Backup guardado en package.json.backup")
}

function restoreFromBackup() {
  if (fs.existsSync(BACKUP_PATH)) {
    const backupContent = fs.readFileSync(BACKUP_PATH, "utf8")
    fs.writeFileSync(PACKAGE_JSON_PATH, backupContent)
    fs.unlinkSync(BACKUP_PATH)
    console.log("✅ package.json restaurado desde backup")
  } else {
    console.log("⚠️  No se encontró archivo de backup")
  }
}

// Determinar acción basada en argumentos
const action = process.argv[2]

if (action === "restore") {
  restoreFromBackup()
} else {
  prepareForPublish()
}

