import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { ParkingZone, Location, Event } from '../types'

interface MapViewProps {
  zones: ParkingZone[]
  locations?: Location[]
  events?: Event[]
  center?: [number, number]
  zoom?: number
  onZoneClick?: (zone: ParkingZone) => void
}

const getAvailabilityColor = (availability: string) => {
  switch (availability) {
    case 'high':
      return '#22c55e'
    case 'medium':
      return '#eab308'
    case 'low':
      return '#ef4444'
    default:
      return '#6b7280'
  }
}

export default function MapView({
  zones,
  locations = [],
  events = [],
  center = [42.6977, 23.3219],
  zoom = 13,
  onZoneClick,
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize map
    const map = L.map(mapRef.current).setView(center, zoom)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    mapInstanceRef.current = map

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current) return

    const map = mapInstanceRef.current

    // Clear existing layers except tile layer
    map.eachLayer((layer: L.Layer) => {
      if (layer instanceof L.TileLayer) return
      map.removeLayer(layer)
    })

    // Add parking zones as polygons
    zones.forEach((zone) => {
      const polygon = L.polygon(zone.coordinates as [number, number][], {
        color: getAvailabilityColor(zone.availability),
        fillColor: getAvailabilityColor(zone.availability),
        fillOpacity: 0.3,
        weight: 2,
      }).addTo(map)

      const popupContent = `
        <div class="p-2">
          <h3 class="font-bold text-lg mb-1">${zone.name}</h3>
          <p class="text-sm text-gray-600 mb-2">${zone.neighborhood}</p>
          <div class="space-y-1 text-sm">
            <p><strong>Availability:</strong> ${zone.availabilityScore}%</p>
            <p><strong>Available Spots:</strong> ${zone.totalSpots - zone.occupiedSpots}/${zone.totalSpots}</p>
            <p><strong>Avg. Finding Time:</strong> ${zone.averageFindingTime} min</p>
            <p><strong>Price:</strong> ${zone.pricePerHour} BGN/hr</p>
          </div>
        </div>
      `
      polygon.bindPopup(popupContent)

      if (onZoneClick) {
        polygon.on('click', () => onZoneClick(zone))
      }

      // Add label at center
      const divIcon = L.divIcon({
        className: 'zone-label',
        html: `<div style="
          background: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: bold;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          white-space: nowrap;
        ">${zone.name}</div>`,
        iconSize: [100, 20],
        iconAnchor: [50, 10],
      })

      L.marker(zone.center, { icon: divIcon }).addTo(map)
    })

    // Add location markers
    locations.forEach((location) => {
      const icon = L.divIcon({
        className: 'location-marker',
        html: `<div style="
          background: ${location.type === 'school' ? '#f59e0b' : location.type === 'hospital' ? '#ef4444' : '#137fec'};
          color: white;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ">
          <span class="material-symbols-outlined" style="font-size: 20px;">
            ${location.type === 'school' ? 'school' : location.type === 'hospital' ? 'local_hospital' : 'apartment'}
          </span>
        </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })

      const marker = L.marker(location.coordinates, { icon }).addTo(map)

      const popupContent = `
        <div class="p-2">
          <h3 class="font-bold text-base mb-1">${location.name}</h3>
          <p class="text-xs text-gray-600 mb-2">${location.address}</p>
          ${location.safetyZone ? '<p class="text-xs text-orange-600 font-bold">⚠️ School Safety Zone</p>' : ''}
          ${location.emergencyAccess ? '<p class="text-xs text-red-600 font-bold">🚑 Emergency Access</p>' : ''}
        </div>
      `
      marker.bindPopup(popupContent)
    })

    // Add event markers
    events.forEach((event) => {
      const icon = L.divIcon({
        className: 'event-marker',
        html: `<div style="
          background: ${event.parkingImpact === 'high' ? '#ef4444' : event.parkingImpact === 'medium' ? '#f59e0b' : '#22c55e'};
          color: white;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          border: 3px solid white;
        ">
          <span class="material-symbols-outlined" style="font-size: 24px;">event</span>
        </div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      })

      const marker = L.marker(event.coordinates, { icon }).addTo(map)

      const popupContent = `
        <div class="p-2">
          <h3 class="font-bold text-base mb-1">${event.title}</h3>
          <p class="text-xs text-gray-600 mb-1">${event.venue}</p>
          <p class="text-xs mb-2">${event.date} at ${event.startTime}</p>
          <p class="text-xs font-bold" style="color: ${getAvailabilityColor(event.parkingImpact)}">
            ${event.impactScore}% Parking Impact
          </p>
          <p class="text-xs text-gray-600 mt-2">${event.alert}</p>
        </div>
      `
      marker.bindPopup(popupContent)
    })
  }, [zones, locations, events, onZoneClick])

  return (
    <div
      ref={mapRef}
      className="w-full h-full min-h-[500px] rounded-xl overflow-hidden shadow-lg"
    />
  )
}
