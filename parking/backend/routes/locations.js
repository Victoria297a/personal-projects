const express = require('express');
const router = express.Router();
const locationsData = require('../data/locations.json');

// GET /api/locations?type=hospital
router.get('/', (req, res) => {
  try {
    const { type } = req.query;
    
    if (!type) {
      // Return all locations
      const allLocations = [
        ...locationsData.offices,
        ...locationsData.hospitals,
        ...locationsData.schools
      ];
      return res.json({ locations: allLocations });
    }

    // Filter by type
    const validTypes = ['office', 'hospital', 'school'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ 
        error: 'Invalid type. Must be one of: office, hospital, school' 
      });
    }

    const typeKey = type + 's'; // offices, hospitals, schools
    const locations = locationsData[typeKey] || [];
    
    res.json({ locations });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

// GET /api/locations/:id
router.get('/:id', (req, res) => {
  try {
    const allLocations = [
      ...locationsData.offices,
      ...locationsData.hospitals,
      ...locationsData.schools
    ];
    
    const location = allLocations.find(l => l.id === req.params.id);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch location' });
  }
});

module.exports = router;
