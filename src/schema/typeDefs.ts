import { gql } from "graphql-tag";
import { mergeTypeDefs } from "@graphql-tools/merge";
import agentStats from "./AgentStats";
import queries from "./queries";
import mutations from "./mutations";
import subscriptions from "./subscriptions";

const typeDefs = mergeTypeDefs([agentStats, queries, mutations, subscriptions]);

export default typeDefs;
