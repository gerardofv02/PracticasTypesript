//flat
//numero maximo de arrays de arrays
//excepciones
//strings

const Array1 : any[] = [2,3,4];
const Array2 : any[]= [2,"13",2];
const Array3 : any[]= [2,[3,4,[2,5,"1"]],2];
// creams la funcion para convertir los strings en ints
function convertToInt(s1 : any[]) {
  for(let i = 0; i < s1.length; i++){
    if (typeof(s1[i]) !== 'string'){
      
    }
    else{
      s1[i] = parseInt(s1[i]);
    }
  }

  return s1;
}
//creamos la funcion de aplanar
function aplaneishon(s1: any[]){
    return s1.flat(Number.MAX_VALUE);
}

function transform(s1 : any[]){
  return s1.map((n: number, index : number) => {
    n = 1;
    for(let i = 0; i < s1.length; i++){
      if(i !== index){
        n = n*s1[i];
      }
    }
    return n;
  })
}


//Y aqui esta la funcion ya todo junto y bien hecho
function todoJunto(s1 : any[]){
try{
let aplanado = aplaneishon(s1);
console.log(aplanado);
let semihecho = convertToInt(aplanado);
console.log(semihecho);
let hecho = transform(semihecho);
console.log(hecho);
return hecho;
}
catch(Error){
  console.log(Error);
}
}
let arrayy = todoJunto(Array3);


export default todoJunto;