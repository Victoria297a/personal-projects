import axios from 'axios'
import type { ParkingZone, Event, Location, Prediction } from '../types'

const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const parkingAPI = {
  // Get all parking zones
  getParkingZones: async (): Promise<{ zones: ParkingZone[] }> => {
    const response = await api.get('/parking-zones')
    return response.data
  },

  // Get specific parking zone
  getParkingZone: async (id: string): Promise<ParkingZone> => {
    const response = await api.get(`/parking-zones/${id}`)
    return response.data
  },
}

export const eventsAPI = {
  // Get all events
  getEvents: async (): Promise<{ events: Event[] }> => {
    const response = await api.get('/events')
    return response.data
  },

  // Get active/upcoming events
  getActiveEvents: async (): Promise<{ events: Event[] }> => {
    const response = await api.get('/events/active')
    return response.data
  },

  // Get specific event
  getEvent: async (id: string): Promise<Event> => {
    const response = await api.get(`/events/${id}`)
    return response.data
  },
}

export const locationsAPI = {
  // Get locations by type
  getLocations: async (type?: 'office' | 'hospital' | 'school'): Promise<{ locations: Location[] }> => {
    const params = type ? { type } : {}
    const response = await api.get('/locations', { params })
    return response.data
  },

  // Get specific location
  getLocation: async (id: string): Promise<Location> => {
    const response = await api.get(`/locations/${id}`)
    return response.data
  },
}

export const predictionsAPI = {
  // Get parking predictions for coordinates
  getPredictions: async (
    lat: number, 
    lng: number, 
    locationType?: string
  ): Promise<Prediction> => {
    const params: Record<string, string | number> = { lat, lng }
    if (locationType) params.locationType = locationType
    const response = await api.get('/predictions', { params })
    return response.data
  },
}

export default api
