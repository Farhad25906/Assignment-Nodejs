"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_router_1 = __importDefault(require("../modules/books/book.router"));
const borrowBooks_router_1 = __importDefault(require("../modules/borrowBooks/borrowBooks.router"));
const routes = (0, express_1.Router)();
routes.use("/api", book_router_1.default);
routes.use("/api", borrowBooks_router_1.default);
exports.default = routes;
