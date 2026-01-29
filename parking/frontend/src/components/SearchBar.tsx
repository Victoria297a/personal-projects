import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Location } from '../types'

interface SearchBarProps {
  onSearch: (query: string, type?: 'office' | 'hospital' | 'school') => void
  locations: Location[]
  loading?: boolean
}

export default function SearchBar({ onSearch, locations, loading = false }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [selectedType, setSelectedType] = useState<'office' | 'hospital' | 'school' | undefined>()
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleTypeClick = (type: 'office' | 'hospital' | 'school') => {
    const newType = selectedType === type ? undefined : type
    setSelectedType(newType)
    onSearch(query, newType)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch(query, selectedType)
  }

  const filteredSuggestions = locations
    .filter(loc => 
      loc.name.toLowerCase().includes(query.toLowerCase()) ||
      loc.address.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 5)

  return (
    <div className="w-full space-y-3">
      {/* Search Input */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-stretch rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
          <div className="flex items-center justify-center pl-4 text-primary">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search neighborhoods, streets, locations..."
            className="flex-1 px-3 py-3 bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-500"
          />
          {loading && (
            <div className="flex items-center px-3">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <button
            type="submit"
            className="px-4 bg-primary text-white font-medium hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && query && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {filteredSuggestions.map((location) => (
              <button
                key={location.id}
                onClick={() => {
                  setQuery(location.name)
                  onSearch(location.name, location.type)
                  setShowSuggestions(false)
                }}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <span className="material-symbols-outlined text-primary">
                  {location.type === 'school' ? 'school' : 
                   location.type === 'hospital' ? 'local_hospital' : 
                   'apartment'}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{location.name}</p>
                  <p className="text-xs text-gray-500">{location.address}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </form>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => handleTypeClick('office')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border whitespace-nowrap transition-all ${
            selectedType === 'office'
              ? 'bg-primary text-white border-primary'
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">apartment</span>
          <span className="text-sm font-medium">Offices</span>
        </button>

        <button
          onClick={() => handleTypeClick('hospital')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border whitespace-nowrap transition-all ${
            selectedType === 'hospital'
              ? 'bg-primary text-white border-primary'
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">local_hospital</span>
          <span className="text-sm font-medium">Hospitals</span>
        </button>

        <button
          onClick={() => handleTypeClick('school')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border whitespace-nowrap transition-all ${
            selectedType === 'school'
              ? 'bg-primary text-white border-primary'
              : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">school</span>
          <span className="text-sm font-medium">Schools</span>
        </button>
      </div>
    </div>
  )
}
