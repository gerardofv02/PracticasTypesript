import{gql} from "graphql_tag";

export const typeDefs = gql`
type Usuario{
    id: ID!
    username: String!,
    password: String!,
    idioma: String!,
    fechaCreacion: String!,
    mensajes: [Mensaje!],
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
    login(username: String!, password:String!): String!
    deleteUser: Usuario!
}
`;