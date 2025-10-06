import mongoose from "mongoose";

export interface IBook {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

export interface BookStaticMethods extends mongoose.Model<IBook> {
  updateAvailability(bookId: mongoose.Types.ObjectId): Promise<IBook>;
}