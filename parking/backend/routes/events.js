const express = require('express');
const router = express.Router();
const eventsData = require('../data/events.json');

// GET /api/events
router.get('/', (req, res) => {
  try {
    // Sort by date and return upcoming events
    const sortedEvents = eventsData.events.sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
    res.json({ events: sortedEvents });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// GET /api/events/active - Get currently active or upcoming events
router.get('/active', (req, res) => {
  try {
    const now = new Date();
    const activeEvents = eventsData.events.filter(event => {
      const eventDate = new Date(event.date);
      const timeDiff = eventDate - now;
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      // Return events happening within next 48 hours
      return hoursDiff >= 0 && hoursDiff <= 48;
    });
    res.json({ events: activeEvents });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch active events' });
  }
});

// GET /api/events/:id
router.get('/:id', (req, res) => {
  try {
    const event = eventsData.events.find(e => e.id === req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

module.exports = router;
