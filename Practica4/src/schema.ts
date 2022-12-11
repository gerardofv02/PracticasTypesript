import{gql} from "graphql_tag";

export const typeDefs = gql`
 type Coche  {
    id: ID!,
    matricula: String!,
    precio: Int!,
}
 type Vendedor {
    id: String!,
    coches: Coche[]!,
    nombre: String!,
}
 type Concesionario {
    id: String!,
    vendedores: Vendedor[]!,
    campoComun: String!,
}
type Query{

}

type Mutation{

}
`;