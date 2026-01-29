const express = require('express');
const router = express.Router();
const parkingData = require('../data/parking-zones.json');

// GET /api/parking-zones
router.get('/', (req, res) => {
  try {
    res.json(parkingData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch parking zones' });
  }
});

// GET /api/parking-zones/:id
router.get('/:id', (req, res) => {
  try {
    const zone = parkingData.zones.find(z => z.id === req.params.id);
    if (!zone) {
      return res.status(404).json({ error: 'Zone not found' });
    }
    res.json(zone);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch parking zone' });
  }
});

module.exports = router;
