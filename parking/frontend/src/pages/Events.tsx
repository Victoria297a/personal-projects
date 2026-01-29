import { useState, useEffect } from 'react'
import { eventsAPI } from '../services/api'
import type { Event } from '../types'

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      setLoading(true)
      const data = await eventsAPI.getEvents()
      setEvents(data.events || [])
    } catch (err) {
      console.error('Error loading events:', err)
    } finally {
      setLoading(false)
    }
  }

  const getImpactBadge = (impact: string, score: number) => {
    const colors = {
      high: 'bg-red-500/10 text-red-500 border-red-500/20',
      medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      low: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    }
    return (
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${colors[impact as keyof typeof colors]}`}>
        {score}% IMPACT
      </span>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
            Events & Predictions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upcoming events and their parking impact in Sofia
          </p>
        </div>

        {/* AI Prediction Card */}
        <div className="mb-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl overflow-hidden shadow-xl">
          <div className="p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined">auto_awesome</span>
              <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-2 py-1 rounded">
                AI Prediction
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Proactive Parking Tip</h2>
            <p className="text-blue-100 mb-4">
              Heavy congestion expected near NDK from 18:00 due to concert. Use Buffer Parking 'Bulgaria Blvd' for seamless access.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <span className="material-symbols-outlined text-yellow-300">bolt</span>
                <span>Saved 12 mins avg.</span>
              </div>
              <button className="px-6 py-2 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                Navigate
              </button>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase text-sm tracking-wider opacity-70">
            Upcoming Events
          </h2>
          <span className="text-[10px] text-gray-500">Updated 2m ago</span>
        </div>

        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-6">
                {/* Date Badge */}
                <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg min-w-[70px] h-[70px]">
                  <span className="text-primary text-2xl font-bold">
                    {new Date(event.date).getDate()}
                  </span>
                  <span className="text-[10px] uppercase font-medium text-gray-600 dark:text-gray-400">
                    {new Date(event.date).toLocaleString('en', { month: 'short' })}
                  </span>
                </div>

                {/* Event Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {event.title}
                    </h3>
                    {getImpactBadge(event.parkingImpact, event.impactScore)}
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-3">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    <span>{event.venue}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full font-medium">
                      {event.startTime} - {event.endTime}
                    </span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full font-medium">
                      {event.expectedAttendance.toLocaleString()} attendees
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {event.alert}
                  </p>

                  {/* Recommended Parking */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p className="text-xs font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-wider">
                      Recommended Parking
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {event.recommendedParking.map((parking, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {parking.name}
                            </p>
                            <p className="text-xs text-gray-500">{parking.distance}</p>
                          </div>
                          <span className="text-xs font-bold text-green-600">
                            {parking.availabilityScore}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
