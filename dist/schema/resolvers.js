"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = require("ioredis");
const redis = new ioredis_1.Redis();
const redisSubscriber = new ioredis_1.Redis();
redisSubscriber.subscribe("AGENT_UPDATES");
const resolvers = {
    Query: {
        getAgentStats: () => ({
            totalConversations: 1234,
            activeChats: 56,
            responseTime: "1m 30s",
            resolutionRate: 94.0,
        }),
    },
    Subscription: {
        agentUpdated: {
            subscribe: async function* () {
                const queue = [];
                redisSubscriber.on("message", (channel, message) => {
                    if (channel === "AGENT_UPDATES") {
                        queue.push(JSON.parse(message));
                    }
                });
                while (true) {
                    if (queue.length) {
                        yield { agentUpdated: queue.shift() };
                    }
                    await new Promise((resolve) => setTimeout(resolve, 100));
                }
            },
        },
    },
};
exports.default = resolvers;
