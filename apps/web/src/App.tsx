import { Routes, Route } from "react-router-dom"
import { Card } from "@repo/ui"
import { formatDate } from "@repo/utils"
import Home from "./components/Home"

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Web App - Monorepo Template
            </h1>
            <nav className="flex space-x-4">
              <a href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </a>
              <a href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/about"
            element={
              <Card>
                <Card.Header>
                  <h2 className="text-2xl font-bold text-gray-900">About</h2>
                </Card.Header>
                <p className="text-gray-600">
                  This is a monorepo template with React, TypeScript, and
                  Tailwind CSS. Built with shared packages and modern
                  development tools.
                </p>
                <Card.Footer>
                  <p className="text-sm text-gray-500">
                    Created on {formatDate(new Date())}
                  </p>
                </Card.Footer>
              </Card>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
