import type { Event } from '../types'

interface AlertsPanelProps {
  events: Event[]
  schoolMode: boolean
  onSchoolModeToggle: () => void
}

export default function AlertsPanel({ events, schoolMode, onSchoolModeToggle }: AlertsPanelProps) {
  const activeEvents = events.filter(event => {
    const eventDate = new Date(event.date)
    const now = new Date()
    const timeDiff = eventDate.getTime() - now.getTime()
    const hoursDiff = timeDiff / (1000 * 60 * 60)
    return hoursDiff >= 0 && hoursDiff <= 48
  }).slice(0, 3)

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30 text-red-900 dark:text-red-100'
      case 'medium':
        return 'bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-900/30 text-orange-900 dark:text-orange-100'
      case 'low':
        return 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/30 text-green-900 dark:text-green-100'
      default:
        return 'bg-gray-50 dark:bg-gray-900/10 border-gray-100 dark:border-gray-900/30 text-gray-900 dark:text-gray-100'
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'warning'
      case 'medium':
        return 'event'
      case 'low':
        return 'info'
      default:
        return 'notifications'
    }
  }

  const getImpactIconColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-500'
      case 'medium':
        return 'text-orange-500'
      case 'low':
        return 'text-green-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className="space-y-4">
      {/* School Mode Toggle */}
      <div className="bg-blue-50/50 dark:bg-primary/10 rounded-xl border border-blue-100 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-primary">
              <span className="material-symbols-outlined text-3xl">school</span>
            </div>
            <div>
              <p className="text-gray-900 dark:text-white text-base font-bold">School Mode</p>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Safety zone prioritization</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={schoolMode}
              onChange={onSchoolModeToggle}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>

      {/* Surge Alerts Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-900 dark:text-white text-lg font-bold">Surge Alerts</h3>
          <span className="text-xs font-semibold text-primary px-2 py-1 bg-primary/10 rounded-full">
            Live Updates
          </span>
        </div>

        {activeEvents.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
            <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">
              check_circle
            </span>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              No active surge alerts at this time
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeEvents.map((event) => (
              <div
                key={event.id}
                className={`flex items-start gap-4 p-3 rounded-xl border ${getImpactColor(event.parkingImpact)} animate-fade-in`}
              >
                <div className={`mt-1 ${getImpactIconColor(event.parkingImpact)}`}>
                  <span className="material-symbols-outlined">
                    {getImpactIcon(event.parkingImpact)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{event.title}</p>
                  <p className="text-xs mt-0.5 opacity-80">{event.alert}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/50 dark:bg-black/20">
                      {event.date} at {event.startTime}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      event.parkingImpact === 'high' ? 'bg-red-500/20 text-red-700 dark:text-red-300' :
                      event.parkingImpact === 'medium' ? 'bg-orange-500/20 text-orange-700 dark:text-orange-300' :
                      'bg-green-500/20 text-green-700 dark:text-green-300'
                    }`}>
                      {event.impactScore}% IMPACT
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
          <p className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-bold tracking-wider mb-1">
            Avg. Finding Time
          </p>
          <p className="text-xl font-bold text-primary">12 min</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
          <p className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-bold tracking-wider mb-1">
            Active Zones
          </p>
          <p className="text-xl font-bold text-green-600">{events.length}</p>
        </div>
      </div>
    </div>
  )
}
