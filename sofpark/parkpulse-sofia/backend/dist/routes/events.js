"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventsController_1 = require("../controllers/eventsController");
const router = (0, express_1.Router)();
// Route to get all events
router.get('/', eventsController_1.getEvents);
exports.default = router;
