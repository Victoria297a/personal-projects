import { useState, useEffect } from 'react'
import MapView from '../components/MapView'
import SearchBar from '../components/SearchBar'
import AlertsPanel from '../components/AlertsPanel'
import { parkingAPI, eventsAPI, locationsAPI } from '../services/api'
import type { ParkingZone, Event, Location } from '../types'

export default function Home() {
  const [zones, setZones] = useState<ParkingZone[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [allLocations, setAllLocations] = useState<Location[]>([])
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([])
  const [schoolMode, setSchoolMode] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [zonesData, eventsData, locationsData] = await Promise.all([
        parkingAPI.getParkingZones(),
        eventsAPI.getActiveEvents(),
        locationsAPI.getLocations(),
      ])

      setZones(zonesData.zones || [])
      setEvents(eventsData.events || [])
      setAllLocations(locationsData.locations || [])
      setFilteredLocations([])
    } catch (err) {
      console.error('Error loading data:', err)
      setError('Failed to load parking data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (query: string, type?: 'office' | 'hospital' | 'school') => {
    try {
      if (!query && !type) {
        setFilteredLocations([])
        return
      }

      const locationsData = await locationsAPI.getLocations(type)
      const filtered = locationsData.locations.filter(loc =>
        loc.name.toLowerCase().includes(query.toLowerCase()) ||
        loc.address.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredLocations(filtered)
    } catch (err) {
      console.error('Error searching locations:', err)
    }
  }

  const handleSchoolModeToggle = () => {
    setSchoolMode(!schoolMode)
    if (!schoolMode) {
      // When enabling school mode, show all schools
      locationsAPI.getLocations('school').then(data => {
        setFilteredLocations(data.locations)
      })
    } else {
      setFilteredLocations([])
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading parking data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-red-500 mb-4">error</span>
          <p className="text-gray-900 dark:text-white text-xl font-bold mb-2">Oops!</p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={loadData}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Main Map Area */}
      <div className="flex-1 relative">
        {/* Search Bar Overlay */}
        <div className="absolute top-4 left-4 right-4 md:right-auto md:w-[500px] z-10">
          <SearchBar
            onSearch={handleSearch}
            locations={allLocations}
            loading={false}
          />
        </div>

        {/* Map */}
        <MapView
          zones={zones}
          locations={filteredLocations}
          events={events}
        />

        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
          <button
            onClick={loadData}
            className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            title="Refresh data"
          >
            <span className="material-symbols-outlined text-primary">refresh</span>
          </button>
        </div>
      </div>

      {/* Right Sidebar - Alerts Panel */}
      <div className="w-80 lg:w-96 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 overflow-y-auto">
        <div className="p-6">
          <AlertsPanel
            events={events}
            schoolMode={schoolMode}
            onSchoolModeToggle={handleSchoolModeToggle}
          />
        </div>
      </div>
    </div>
  )
}
