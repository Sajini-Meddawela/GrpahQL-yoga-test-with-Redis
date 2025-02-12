"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeDefs = `
  type AgentStats {
    totalConversations: Int
    activeChats: Int
    responseTime: String
    resolutionRate: Float
  }

  type Query {
    getAgentStats: AgentStats
  }

  type Subscription {
    agentUpdated: AgentStats
  }
`;
exports.default = typeDefs;
