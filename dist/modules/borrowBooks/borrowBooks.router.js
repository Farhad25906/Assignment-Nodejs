"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrowBooks_controller_1 = require("./borrowBooks.controller");
const borrowBookRoute = (0, express_1.Router)();
borrowBookRoute.post("/borrow", borrowBooks_controller_1.borrowBooksController.CreateBorrowBook);
borrowBookRoute.get("/borrow", borrowBooks_controller_1.borrowBooksController.getBorrowedBook);
exports.default = borrowBookRoute;
