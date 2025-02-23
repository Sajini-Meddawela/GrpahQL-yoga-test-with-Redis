import { Redis } from "ioredis";
import { AgentStats } from "./types";

const redis = new Redis(); // publisher
const redisSubscriber = new Redis(); // subscriber

redisSubscriber.subscribe("AGENT_UPDATES"); // Subscribe to Redis channel for real-time updates

const resolvers = {
  Query: {
    getAgentStats: (): AgentStats => ({
      totalConversations: 1234,
      activeChats: 56,
      responseTime: "1m 30s",
      resolutionRate: 94.0,
    }),
  },
  Mutation: {
    updateAgentStats: async (_: unknown, args: AgentStats): Promise<AgentStats> => {
      const updatedStats = { ...args };

      // Publish updates to Redis for real-time subscription
      await redis.publish("AGENT_UPDATES", JSON.stringify(updatedStats));

      return updatedStats;
    },
  },
  Subscription: {
    agentUpdated: {
      subscribe: async function* () {
        const queue: AgentStats[] = [];

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
