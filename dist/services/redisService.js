"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishAgentStats = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default();
const publishAgentStats = (stats) => {
    redis.publish("AGENT_UPDATES", JSON.stringify(stats));
};
exports.publishAgentStats = publishAgentStats;
