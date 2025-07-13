import { Button, Card } from "@repo/ui"
import { formatDate } from "@repo/utils"

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <Card.Header>
              <h3 className="text-lg font-semibold text-gray-900">👥 Users</h3>
            </Card.Header>
            <p className="text-3xl font-bold text-primary-600">1,234</p>
            <p className="text-sm text-gray-500">Total registered users</p>
          </Card>

          <Card>
            <Card.Header>
              <h3 className="text-lg font-semibold text-gray-900">
                📊 Analytics
              </h3>
            </Card.Header>
            <p className="text-3xl font-bold text-green-600">98.5%</p>
            <p className="text-sm text-gray-500">System uptime</p>
          </Card>

          <Card>
            <Card.Header>
              <h3 className="text-lg font-semibold text-gray-900">
                💰 Revenue
              </h3>
            </Card.Header>
            <p className="text-3xl font-bold text-blue-600">$45,678</p>
            <p className="text-sm text-gray-500">This month</p>
          </Card>
        </div>

        <Card className="mt-8">
          <Card.Header>
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome to Admin
            </h2>
          </Card.Header>
          <p className="text-gray-600 mb-4">
            This is the admin dashboard built with the shared UI components and
            utilities. It demonstrates how multiple apps can share the same
            design system.
          </p>
          <Card.Footer>
            <p className="text-sm text-gray-500">
              Last updated: {formatDate(new Date())}
            </p>
          </Card.Footer>
        </Card>
      </main>
    </div>
  )
}

export default App
