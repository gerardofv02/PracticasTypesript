import { Application, Router } from "oak";
//import { getBookings, getCars } from "./resolvers/get.ts";

const router = new Router();
router
.get("/nombre",(context) => (context.response.body = "SUUU"));


const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 7777 });