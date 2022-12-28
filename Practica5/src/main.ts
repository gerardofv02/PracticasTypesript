import { Server } from "std/http/server.ts";
import { GraphQLHTTP } from "gql";
import { makeExecutableSchema } from "graphql_tools";

import { config } from "std/dotenv/mod.ts";
await config({ export: true, allowEmptyValues: true });

import { Query } from "./resolvers/query.ts";
import { Mutation } from "./resolvers/mutation.ts";
import{ Usuario} from "./resolvers/usuario.ts";
import { typeDefs } from "./schema.ts";

const resolvers = {
  Query,
  Mutation,
  Usuario,
};

const port = Number(Deno.env.get("PORT"));

const s = new Server({
  handler: async (req) => {
    const { pathname } = new URL(req.url);

    return pathname === "/graphql"
      ? await GraphQLHTTP<Request>({
          schema: makeExecutableSchema({ resolvers, typeDefs }),
          graphiql: true,
          context:(req) => {
            const idioma = req.headers.get("idioma");
            const Auth = req.headers.get("Auth");
            return{
              idioma: idioma,
              Auth: Auth,
            }
          }
        })(req)
      : new Response("Not Found", { status: 404 });
  },
  port: port,
});

s.listenAndServe();

console.log(`Server running on: http://localhost:${port}/graphql`);