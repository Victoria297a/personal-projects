const express = require('express');
const router = express.Router();
const parkingData = require('../data/parking-zones.json');
const locationsData = require('../data/locations.json');

// Simple distance calculation (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in km
}

// GET /api/predictions?lat=42.6977&lng=23.3219
router.get('/', (req, res) => {
  try {
    const { lat, lng, locationType } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({ 
        error: 'Missing required parameters: lat and lng' 
      });
    }

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    // Find nearest parking zones
    const zonesWithDistance = parkingData.zones.map(zone => {
      const distance = calculateDistance(
        userLat, userLng,
        zone.center[0], zone.center[1]
      );
      
      // Calculate recommendation score based on availability and distance
      const distanceScore = Math.max(0, 100 - (distance * 50));
      const availabilityWeight = zone.availabilityScore * 0.7;
      const distanceWeight = distanceScore * 0.3;
      const recommendationScore = Math.round(availabilityWeight + distanceWeight);
      
      return {
        ...zone,
        distance: Math.round(distance * 1000), // Convert to meters
        distanceKm: distance.toFixed(2),
        recommendationScore
      };
    });

    // Sort by recommendation score
    const sortedZones = zonesWithDistance
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, 3); // Top 3 recommendations

    // Find nearby locations if locationType is specified
    let nearbyLocations = [];
    if (locationType && locationsData[locationType + 's']) {
      nearbyLocations = locationsData[locationType + 's']
        .map(location => {
          const distance = calculateDistance(
            userLat, userLng,
            location.coordinates[0], location.coordinates[1]
          );
          return {
            ...location,
            distance: Math.round(distance * 1000),
            distanceKm: distance.toFixed(2)
          };
        })
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5);
    }

    const response = {
      coordinates: { lat: userLat, lng: userLng },
      recommendations: sortedZones,
      bestOption: sortedZones[0],
      message: sortedZones[0].availability === 'high' 
        ? `Great news! ${sortedZones[0].name} has excellent availability (${sortedZones[0].availabilityScore}% available)`
        : sortedZones[0].availability === 'medium'
        ? `Moderate parking available in ${sortedZones[0].name}. Consider arriving early.`
        : `Limited parking in ${sortedZones[0].name}. Check alternative zones below.`,
      nearbyLocations
    };

    res.json(response);
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: 'Failed to generate predictions' });
  }
});

module.exports = router;
