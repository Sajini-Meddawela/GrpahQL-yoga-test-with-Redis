import Redis from "ioredis";

const redis = new Redis();

export const publishAgentStats = (stats: any) => {
  redis.publish("AGENT_UPDATES", JSON.stringify(stats));
};
