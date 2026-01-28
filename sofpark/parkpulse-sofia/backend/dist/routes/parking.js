"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parkingController_1 = require("../controllers/parkingController");
const router = (0, express_1.Router)();
// Route to get parking zones
router.get('/api/parking-zones', parkingController_1.getParkingZones);
exports.default = router;
