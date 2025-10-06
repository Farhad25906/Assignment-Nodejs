import { Request, Response } from "express";
import Book from "./book.model";

const CreateBook = async (req: Request, res: Response) => {
  try {
    const data = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book Created Successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      message: "Book Created Failed",
      success: false,
      error: error,
    });
  }
};

const getBook = async (req: Request, res: Response) => {
  try {
    // const data = await Book.find();
    const filter = req.query.filter as string;
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sort = req.query.sort === "desc" ? -1 : 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const query: any = {};
    if (filter) {
      query.genre = filter;
    }

    const data = await Book.find(query)
      .sort({ [sortBy]: sort })
      .limit(limit);

    res.send({
      success: true,
      message: "Books retrieved successfully",
      data,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Book couldn't Find",
      error,
    });
  }
};

const getBooksById = async (req: Request, res: Response) => {
  try {
    const id = req.params.bookId;
    const singleBook = await Book.findById(id);

    res.send({
      success: true,
      message: "Book retrieved successfully",
      data: singleBook,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Book couldn't Find",
      error,
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.bookId;
    const updatedData = req.body;
    const data = await Book.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.send({
      success: true,
      message: "Book updated successfully",
      data,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Book couldn't Find",
      error,
    });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.bookId;
    const data = await Book.findByIdAndDelete(id);

    res.send({
      success: true,
      message: "Book Deleted successfully",
      data,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Book couldn't Find",
      error,
    });
  }
};

export const bookController = {
  CreateBook,
  getBook,
  getBooksById,
  updateBook,
  deleteBook,
};
