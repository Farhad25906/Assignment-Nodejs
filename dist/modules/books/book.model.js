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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, trim: true, required: true },
    author: { type: String, trim: true, required: true },
    genre: {
        type: String,
        enum: [
            "FICTION",
            "NON_FICTION",
            "SCIENCE",
            "HISTORY",
            "BIOGRAPHY",
            "FANTASY",
        ],
        default: "FICTION",
        required: true,
    },
    isbn: { type: String, required: true },
    copies: { type: Number, min: 0, default: 1 },
    description: { type: String, required: true },
    available: { type: Boolean, required: true },
}, { timestamps: true });
bookSchema.statics.updateAvailability = function (bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(bookId);
        if (!book) {
            throw new Error("Book not found");
        }
        book.available = book.copies > 0;
        yield book.save();
        return book;
    });
};
bookSchema.pre("save", function (next) {
    console.log(` Saving new book: ${this.title}`);
    this.title = this.title.trim();
    next();
});
bookSchema.post("save", function (doc) {
    console.log(` Book "${doc.title}" saved successfully with ID: ${doc._id}`);
});
const Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = Book;
