import React, { useState } from "react"
import { Button, Card, Input, Modal } from "@repo/ui"
import { capitalize } from "@repo/utils"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card padding="lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Monorepo Template
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A modern monorepo setup with React, TypeScript, Tailwind CSS, and
            shared packages.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsModalOpen(true)}
            >
              Open Modal
            </Button>
            <Button variant="secondary" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <Card.Header>
            <h3 className="text-lg font-semibold text-gray-900">
              🚀 Fast Development
            </h3>
          </Card.Header>
          <p className="text-gray-600">
            Hot reload and instant feedback with Vite and modern tooling.
          </p>
        </Card>

        <Card>
          <Card.Header>
            <h3 className="text-lg font-semibold text-gray-900">
              🔧 Shared Components
            </h3>
          </Card.Header>
          <p className="text-gray-600">
            Reusable UI components and utilities across all apps.
          </p>
        </Card>

        <Card>
          <Card.Header>
            <h3 className="text-lg font-semibold text-gray-900">
              📦 Type Safe
            </h3>
          </Card.Header>
          <p className="text-gray-600">
            Full TypeScript support with shared types and interfaces.
          </p>
        </Card>
      </div>

      {/* Interactive Demo */}
      <Card>
        <Card.Header>
          <h2 className="text-2xl font-bold text-gray-900">Interactive Demo</h2>
        </Card.Header>
        <div className="space-y-4">
          <Input
            label="Try typing something"
            placeholder="Enter some text..."
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
          />
          {inputValue && (
            <p className="text-gray-600">
              Capitalized:{" "}
              <span className="font-semibold">{capitalize(inputValue)}</span>
            </p>
          )}
        </div>
      </Card>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="lg"
      >
        <Modal.Header onClose={() => setIsModalOpen(false)}>
          Modal Example
        </Modal.Header>
        <Modal.Body>
          <p className="text-gray-600">
            This is a modal component from the shared UI package. It
            demonstrates how components can be reused across different apps in
            the monorepo.
          </p>
          <div className="mt-4">
            <Input
              label="Modal Input"
              placeholder="Type something in the modal..."
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setIsModalOpen(false)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
