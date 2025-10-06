import { Router } from "express";
import { borrowBooksController } from "./borrowBooks.controller";


const borrowBookRoute = Router();

borrowBookRoute.post("/borrow", borrowBooksController.CreateBorrowBook);
borrowBookRoute.get("/borrow", borrowBooksController.getBorrowedBook);

export default borrowBookRoute;
  