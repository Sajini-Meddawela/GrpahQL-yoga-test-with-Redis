import { gql } from "graphql-tag";

const queries = gql`
  type Query {
    getAgentStats: AgentStats
  }
`;

export default queries;
