import { getQuery } from "https://deno.land/x/oak@v11.1.0/helpers.ts";
import {
  Application,
  Router,
  helpers,
} from "https://deno.land/x/oak@v11.1.0/mod.ts";

type transaction = {
  ID_sender : string,
  ID_reciber : string,
  amount : string
};

type User = {
  email : string,
  nombre : string,
  apellido : string,
  telefono : string,
  DNI : string,
  IBAN : string,
  ID : number,
};



type PostUserctx = RouterContext<"/addUser",
Record<string|undefined>,
Record<string|undefined>,
Record<string|undefined>,
Record<string|undefined>,
Record<string|undefined>,
>; 
type PostTransactionctx = RouterContext<"/addUser",
Record<string|undefined>,
Record<string|undefined>,
Record<string|undefined>,
>; 


let transactions : transaction[] = [
  {
    ID_sender : "4000",
    ID_reciber : "0",
    amount : "500"
  }
];

let users :User[] = [

];
/*
let ibans : string = [

];

function ibanProve( userss : User[]) : string{
  if(userss.length === 0){
    let ultimo = "ES0000000000000000000000";
    ibans.push(ultimo);
    return ultimo;
  }
    let i = userss.length;
    let ultimo = i.IBAN;
    if(Number(ultimo.charAt(ultimo.length)) === 9){
      ultimo.charAt(ultimo.length) = '0';
    }
    else{
      Number(ultimo.charAt(ultimo.length)) = Number(ultimo.charAt(ultimo.length))+ 1;
    }
  return ultimo;

}
*/


const router = new Router();
let cont : number = 0;
let iban : string = "ES0000000000000000000000";



router
.get("/getUser/:id",(ctx ) => {
  try{
  if(ctx.params?.id){
    const user : User|undefined = users.find((user) => user.email === ctx.params.id || user.telefono === ctx.params.id || user.DNI === ctx.params.id || user.IBAN === ctx.params.id || user.ID === ctx.params.id );

    if(user){
      ctx.response.body = user;
    }
  }
  
  ctx.response.status = 404;
}
catch(error){
  console.error(error);
}
})
.post("/addUser", async (ctx : PostUserctx) => {
  try{
  const result = ctx.request.body({ type: "json" });
  const value = await result.value;
  
  
  if(!value?.email || !value?.nombre || !value?.apellido || !value?.telefono || !value?.DNI ){
    ctx.response.status = 400;
    return;
  }
  if (!/^[0-9]{9}/.test(value.telefono)) {
    ctx.response.status = 404;
    return;
  }
  if (!/^[0-9]{8}[A-Z]$/.test(value.DNI)) {
    ctx.response.status = 404;
    return;
  }
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/.test(value.email)) {
    ctx.response.status = 404;
    return;
  }
  const found : User|undefined = users.find((found) => found.email === value.email|| found.telefono === value.telefono || found.DNI === value.DNI );
  if(found){
    ctx.response.body = {
      Message : "Usuario ya encontrado en la base de datos",

    }
    ctx.response.status = 400;
    return;
  }


  
  const user: User = {
    email: value.email,
    nombre: value.nombre,
    apellido: value.apellido,
    telefono: value.telefono,
    DNI: value.DNI
  };
  user.ID = cont.toString();
  /*
  let e : number = iban.parte_numeros;
  if(e < 10){
    iban = iban +  "000000000000000000000";
  }else if(e < 100){
    let x : string = "00000000000000000000";
  }else if(e <1000){
    let x : string = "0000000000000000000";
  }else if(e < 10000){
    let x : string = "000000000000000000";
  }else if(e < 100000){
    let x : string = "00000000000000000";
  } else if(e < 1000000){
    let x : string = "0000000000000000";
  }else if(e < 10000000){
    let x : string = "000000000000000";
  }else if(e < 100000000){
    let x : string = "00000000000000";
  }else if(e < 1000000000){
    let x : string = "0000000000000";
  }else if(e < 10000000000){
    let x : string = "000000000000";
  }else if(e < 100000000000){
    let x : string = "00000000000";
  }else if(e < 1000000000000){
    let x : string = "0000000000";
  }else if(e < 10000000000000){
    let x : string = "000000000";
  }else if(e < 100000000000000){
    let x : string = "00000000";
  }else if(e < 1000000000000000){
    let x : string = "0000000";
  }else if(e < 10000000000000000){
    let x : string = "000000";
  }else if(e < 100000000000000000){
    let x : string = "00000";
  }else if(e < 1000000000000000000){
    let x : string = "0000";
  }else if(e < 10000000000000000000){
    let x : string = "000";
  }else if(e < 100000000000000000000){
    let x : string = "00";
  }else if(e < 1000000000000000000000){
    let x : string = "0";
  }else{
    let x : string = "";
  }
  */
  
  
  user.IBAN = iban + 1 ; // NO HEMOS PODIDO SOLUCIONAR ESTE PROBLEMA DEL IBAN Y SE VAN SUMANDO MAS CARACTERES CADA VEZ
  cont = users.length +1;
  ctx.response.body = {
    email: user.email,
    nombre: user.nombre,
    apellido: user.apellido,
    telefono: user.telefono,
    DNI: user.DNI,
    ID : user.ID,
    IBAN : user.IBAN,
  }
  users.push(user);
}catch(error){
  console.error(error);

}
})
.delete("/deleteUser/:id" ,  (ctx) =>{
  try{
  if(ctx.params?.id && users.find((user) => user.email === ctx.params.id)){
    users = users.filter((user) => user.email !== ctx.params.id);
    ctx.response.body = {
      mesagge: "Eliminado"
    }
    return;
}
else{
  console.log("HOLA");
ctx.response.body = {
  message: "No encontrado",
}
ctx.response.status = 404;
}
  }
  catch(error){
    console.error(error);
  }
})
.post("/addTransaction" , async (ctx : PostTransactionctx) => {
  try{
  const result = ctx.request.body({ type: "json" });
  const value = await result.value;
  if(!value?.ID_sender || !value?.ID_reciber || !value?.amount){
    ctx.response.status = 400;
    return;
  }
  const tran : transaction = {
    ID_sender : value.ID_sender,
    ID_reciber : value.ID_reciber,
    amount : value.amount,
  }
  ctx.response.body = {
    ID_sender : tran.ID_sender,
    ID_reciber : tran.ID_reciber,
    amount : tran.amount,
  }

  transactions.push(tran);
  console.log(transactions);
}catch(error){
  console.error(error);
}
})




const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 7777 });