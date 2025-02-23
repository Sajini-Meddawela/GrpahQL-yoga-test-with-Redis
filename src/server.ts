import { createServer } from "http";
import { createYoga } from "graphql-yoga";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./schema/typeDefs";
import resolvers from "./schema/resolvers";

const schema = makeExecutableSchema({ typeDefs, resolvers });

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/graphql",
  cors: {
    origin: "http://localhost:3000", 
    credentials: true, 
  },
});

const server = createServer(yoga);

// Create WebSocket server
const wsServer = new WebSocketServer({
  server,
  path: yoga.graphqlEndpoint,
});

useServer({ schema }, wsServer); // Connect GraphQL schema to WebSocket server

server.listen(4000, () => {
  console.log("Server running on http://localhost:4000/graphql");
  console.log("WebSocket server running at ws://localhost:4000/graphql");
});
