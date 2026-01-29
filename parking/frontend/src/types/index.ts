export interface ParkingZone {
  id: string
  name: string
  neighborhood: string
  coordinates: [number, number][]
  center: [number, number]
  availability: 'low' | 'medium' | 'high'
  availabilityScore: number
  totalSpots: number
  occupiedSpots: number
  averageFindingTime: number
  peakHours: string[]
  pricePerHour: number
  notes?: string
}

export interface Event {
  id: string
  title: string
  type: string
  venue: string
  coordinates: [number, number]
  date: string
  startTime: string
  endTime: string
  expectedAttendance: number
  parkingImpact: 'low' | 'medium' | 'high'
  impactScore: number
  affectedZones: string[]
  recommendedParking: {
    name: string
    distance: string
    availabilityScore: number
  }[]
  alternativeTransport: string[]
  alert: string
}

export interface Location {
  id: string
  name: string
  type: 'office' | 'hospital' | 'school'
  coordinates: [number, number]
  address: string
  nearbyParking: {
    zoneId: string
    distance: string
    availabilityScore: number
    walkTime: number
  }[]
  safetyZone?: boolean
  dropOffPeakHours?: string[]
  congestionWarning?: string
  emergencyAccess?: boolean
}

export interface Prediction {
  coordinates: { lat: number; lng: number }
  recommendations: (ParkingZone & { 
    distance: number
    distanceKm: string
    recommendationScore: number 
  })[]
  bestOption: ParkingZone & { 
    distance: number
    distanceKm: string
    recommendationScore: number 
  }
  message: string
  nearbyLocations?: Location[]
}
