import { gql } from "graphql-tag";

const agentStats = gql`
  type AgentStats {
    totalConversations: Int
    activeChats: Int
    responseTime: String
    resolutionRate: Float
  }
`;

export default agentStats;
