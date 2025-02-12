import { Redis } from "ioredis";

const redis = new Redis();
const redisSubscriber = new Redis();

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
        const queue: any[] = [];

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

export default resolvers;
