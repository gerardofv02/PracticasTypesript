export type Coche = {
    id: string,
    matricula: string,
    precio: number,
}
export type Vendedor = {
    id: string,
    coches: Coche[],
    nombre: string,
}
export type Concesionario = {
    id: string,
    vendedores: Vendedor[],
    campoComun: string,
}