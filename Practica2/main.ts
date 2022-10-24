import { getQuery } from "https://deno.land/x/oak@v11.1.0/helpers.ts";
import {
  Application,
  Router,
  helpers,
} from "https://deno.land/x/oak@v11.1.0/mod.ts";


type User = {
  email : string,
  nombre : string,
  apellido : string,
  telefono : string,
  DNI : string,
  IBAN : string,
  ID : string,
}

type PostUserctx = RouterContext<"/addUser",
Record<string|undefined>,
Record<string|undefined>,
Record<string|undefined>,
Record<string|undefined>,
Record<string|undefined>,
>; 

let users :User[] = [
  {
    email: "xd@xd.com",
    nombre: "Paco",
    apellido: "gio",
    telefono: "843728",
    DNI: "03102C",
    IBAN: "9839393283",
    ID: "4000"
  }
];

const router = new Router();
let cont : int = 0;

router
.get("/getUser/:id",(ctx ) => {
  if(ctx.params?.id){
    const user : User|undefined = users.find(user => user.email === ctx.params.id || user.telefono === ctx.params.id || user.DNI === ctx.params.id || user.IBAN === ctx.params.id || user.ID === ctx.params.id);

    if(user){
      ctx.response.body = user;
    }
  }
  
  ctx.response.status = 404;
})
.post("/addUser", async (ctx : PostUserctx) => {
  const result = ctx.request.body({ type: "json" });
  const value = await result.value;
  if(!value?.email || !value?.nombre || !value?.apellido || !value?.telefono || !value?.DNI ){
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
  user.IBAN = cont.toString();
  cont = cont +1;
  ctx.response.body = {
    email: user.email,
    nombre: user.nombre,
    apellido: user.apellido,
    telefono: user.telefono,
    DNI: user.DNI,
    ID : user.ID,
    IBAN : user.IBAN,

  }
})


const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 7777 });



/*
cambiar el iban a un njumero de iban verdaderoy aleatorio al crear usuario, igual con id

cambiar lo del telefono pàra q sean 9 digitos

acabar practica
*/