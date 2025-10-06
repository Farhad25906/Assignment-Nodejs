"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookController = void 0;
const book_model_1 = __importDefault(require("./book.model"));
const CreateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield book_model_1.default.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book Created Successfully",
            data: data,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Book Created Failed",
            success: false,
            error: error,
        });
    }
});
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const data = await Book.find();
        const filter = req.query.filter;
        const sortBy = req.query.sortBy || "createdAt";
        const sort = req.query.sort === "desc" ? -1 : 1;
        const limit = parseInt(req.query.limit) || 10;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const data = yield book_model_1.default.find(query)
            .sort({ [sortBy]: sort })
            .limit(limit);
        res.send({
            success: true,
            message: "Books retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: "Book couldn't Find",
            error,
        });
    }
});
const getBooksById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const singleBook = yield book_model_1.default.findById(id);
        res.send({
            success: true,
            message: "Book retrieved successfully",
            data: singleBook,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: "Book couldn't Find",
            error,
        });
    }
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const updatedData = req.body;
        const data = yield book_model_1.default.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
        res.send({
            success: true,
            message: "Book updated successfully",
            data,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: "Book couldn't Find",
            error,
        });
    }
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const data = yield book_model_1.default.findByIdAndDelete(id);
        res.send({
            success: true,
            message: "Book Deleted successfully",
            data,
        });
    }
    catch (error) {
        res.send({
            success: false,
            message: "Book couldn't Find",
            error,
        });
    }
});
exports.bookController = {
    CreateBook,
    getBook,
    getBooksById,
    updateBook,
    deleteBook,
};
