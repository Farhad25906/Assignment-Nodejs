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
exports.borrowBooksController = void 0;
const book_model_1 = __importDefault(require("../books/book.model"));
const borrowBooks_model_1 = require("./borrowBooks.model");
const CreateBorrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        // Validate required fields
        if (!bookId || !quantity || !dueDate) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: book, quantity, dueDate",
            });
        }
        // 1. Verify the book exists and has enough copies
        const book = yield book_model_1.default.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        // 2. Check if book is available
        if (book.available === false) {
            return res.status(400).json({
                success: false,
                message: "Book is not available for borrowing",
            });
        }
        // 3. Check if book has enough copies
        if (book.copies < quantity) {
            return res.status(400).json({
                success: false,
                message: `Not enough copies available. Only ${book.copies} available.`,
            });
        }
        // 4. Deduct the quantity from the book's copies
        book.copies -= quantity;
        yield book.save();
        // 5. Update availability status using static method
        const updatedBook = yield book_model_1.default.updateAvailability(bookId);
        // 6. Create the borrow record
        const borrowRecord = yield borrowBooks_model_1.BookBorrow.create({
            book: bookId,
            quantity,
            dueDate,
        });
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowRecord,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to borrow book",
            error: process.env.NODE_ENV === 'development' ? error : undefined,
        });
    }
});
const getBorrowedBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrowBooks_model_1.BookBorrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails"
                }
            },
            {
                $unwind: {
                    path: "$bookDetails",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn"
                    },
                    totalQuantity: 1
                }
            },
            {
                $sort: { totalQuantity: -1 }
            }
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve borrowed books",
            error,
        });
    }
});
exports.borrowBooksController = {
    CreateBorrowBook,
    getBorrowedBook,
};
