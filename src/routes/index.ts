import { Router } from "express";
import bookRoute from "../modules/books/book.router";
import borrowBookRoute from "../modules/borrowBooks/borrowBooks.router";


const routes = Router();

routes.use("/api", bookRoute);
routes.use("/api", borrowBookRoute);

export default routes;
