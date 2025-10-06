import { Router } from "express";
import { bookController } from "./book.controller";

const bookRoute = Router();

bookRoute.post("/books", bookController.CreateBook);
bookRoute.get("/books", bookController.getBook);
bookRoute.get("/books/:bookId", bookController.getBooksById);
bookRoute.patch("/books/:bookId", bookController.updateBook);
bookRoute.delete("/books/:bookId", bookController.deleteBook);

export default bookRoute;
