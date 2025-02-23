import { gql } from "graphql-tag";

const subscriptions = gql`
  type Subscription {
    agentUpdated: AgentStats
  }
`;

export default subscriptions;
