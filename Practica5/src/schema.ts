import{gql} from "graphql_tag";

export const typeDefs = gql`
type Usuario{
    id: ID!
    username: String!,
    password: String!,
}
type Mensaje  {
    id:ID!,
    destinatario: String!,
    mensaje: String!,
}

type Query{
    getUser(username:String!) : Usuario!
}

type Mutation{
    createUser(username: String!,password:String!): Usuario!
}
`;