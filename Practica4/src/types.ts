
export type Coche = {
    id: string,
    matricula: string,
    precio: number,
}
export type Vendedor = {
    id: string,
    coches: string[],
    nombre: string,
}
export type Concesionario = {
    id: string,
    vendedores: string[],
    campoComun: string,
}