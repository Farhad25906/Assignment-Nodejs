import { model, Schema, Model } from "mongoose";
import { IBook, BookStaticMethods } from "./book.interface";
import mongoose from "mongoose";

const bookSchema = new Schema<IBook>(
  {
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
  },
  { timestamps: true }
);

bookSchema.statics.updateAvailability = async function (
  bookId: mongoose.Types.ObjectId
): Promise<IBook> {
  const book = await this.findById(bookId);
  if (!book) {
    throw new Error("Book not found");
  }

  book.available = book.copies > 0;
  await book.save();
  return book;
};


bookSchema.pre("save", function (next) {
  console.log(` Saving new book: ${this.title}`);
  this.title = this.title.trim();
  next();
});
bookSchema.post("save", function (doc) {
  console.log(` Book "${doc.title}" saved successfully with ID: ${doc._id}`);
});

const Book = model<IBook, BookStaticMethods>("Book", bookSchema);

export default Book;
