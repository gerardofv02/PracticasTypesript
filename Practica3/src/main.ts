
import { Application, Router } from "oak";
import { getBooks, getUser } from "./resolvers/get.ts";
import { addUser, addAuthor, addBook } from "./resolvers/post.ts";
import { deleteUser }from "./resolvers/delete.ts";
import { updateCart } from "./resolvers/put.ts";

const router = new Router();
router
.get("/getBooks", getBooks)
.get("/getUser/:id", getUser)
.post("/addBook", addBook)
.post("/addAuthor", addAuthor)
.post("/addUser", addUser)
.delete("/deleteUser/:id",deleteUser)
.put("/updateCart", updateCart);


const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });