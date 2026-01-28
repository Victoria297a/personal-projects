"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParkingZoneById = exports.getParkingZones = void 0;
const parking_json_1 = __importDefault(require("../data/mock/parking.json"));
const getParkingZones = (req, res) => {
    res.json(parking_json_1.default);
};
exports.getParkingZones = getParkingZones;
const getParkingZoneById = (req, res) => {
    const { id } = req.params;
    const parkingZone = parking_json_1.default.find(zone => zone.id === id);
    if (parkingZone) {
        res.json(parkingZone);
    }
    else {
        res.status(404).json({ message: 'Parking zone not found' });
    }
};
exports.getParkingZoneById = getParkingZoneById;
