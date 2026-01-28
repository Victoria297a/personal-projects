"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = void 0;
const events_json_1 = __importDefault(require("../data/mock/events.json"));
const getEvents = (req, res) => {
    res.json(events_json_1.default);
};
exports.getEvents = getEvents;
