"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const graphql_yoga_1 = require("graphql-yoga");
const schema_1 = require("@graphql-tools/schema");
const typeDefs_1 = __importDefault(require("./schema/typeDefs"));
const resolvers_1 = __importDefault(require("./schema/resolvers"));
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: typeDefs_1.default, resolvers: resolvers_1.default });
const yoga = (0, graphql_yoga_1.createYoga)({ schema, graphiql: true });
const server = (0, http_1.createServer)(yoga);
server.listen(4000, () => {
    console.log("Server running on http://localhost:4000/graphql");
});
