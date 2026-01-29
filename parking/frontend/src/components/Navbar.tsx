import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="bg-white dark:bg-background-dark shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <span className="material-symbols-outlined text-white text-2xl">
                local_parking
              </span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ParkPulse Sofia
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/')
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span className="material-symbols-outlined text-xl">map</span>
              <span className="font-medium">Map</span>
            </Link>

            <Link
              to="/events"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/events')
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span className="material-symbols-outlined text-xl">event</span>
              <span className="font-medium">Events</span>
            </Link>

            <Link
              to="/about"
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isActive('/about')
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span className="material-symbols-outlined text-xl">info</span>
              <span className="font-medium">About</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
