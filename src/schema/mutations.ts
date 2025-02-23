import { gql } from "graphql-tag";

const mutations = gql`
  type Mutation {
    updateAgentStats(
      totalConversations: Int
      activeChats: Int
      responseTime: String
      resolutionRate: Float
    ): AgentStats
  }
`;

export default mutations;
