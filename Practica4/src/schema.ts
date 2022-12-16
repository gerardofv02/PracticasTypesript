import{gql} from "graphql_tag";
//en la query no se como lo quieres si le pasemos los dos datos o solo 1 o tal vez que pueda ser ninguno

export const typeDefs = gql`
type Coche{
    id: ID!,
    matricula: String!,
    precio: Int!,
}
type Vendedor{
    id: String!,
    coches: [Coche!],
    nombre: String!,
}
type Concesionario{
    id: String!,
    vendedores: [Vendedor!]!,
    localidad: String!,
}
type Query{
    obtenerVendedores_nombre( nombre: String!): [Vendedor!]! 
    obtenerVendedores_id( id: String!): [Vendedor!]! 
}

type Mutation{
    crearVendedor(nombre: String!): Vendedor!
    crearCoche(matricula: String!, precio: Int!): Coche!
    anadirCoche_Vendedor( idCoche: String!, idVendedor: String!): Vendedor!
    crearConcesionario( nombre: String!, localidad: String!): Concesionario!
}
`;