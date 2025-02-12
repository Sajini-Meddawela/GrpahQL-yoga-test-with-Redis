import { publishAgentStats } from "./services/redisService";

setInterval(() => {
  const updatedStats = {
    totalConversations: Math.floor(Math.random() * 2000),
    activeChats: Math.floor(Math.random() * 100),
    responseTime: `${Math.floor(Math.random() * 5) + 1}m ${Math.floor(Math.random() * 60)}s`,
    resolutionRate: parseFloat((Math.random() * 100).toFixed(1)),
  };

  publishAgentStats(updatedStats);
  console.log("Published new stats:", updatedStats);
}, 5000);
