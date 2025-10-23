import { Request, Response } from "express";
import Book from "../books/book.model";
import { BookBorrow } from "./borrowBooks.model";



const CreateBorrowBook = async (req: Request, res: Response) => {
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
    const book = await Book.findById(bookId);
    
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
    await book.save();

    // 5. Update availability status using static method
    const updatedBook = await Book.updateAvailability(bookId);

    // 6. Create the borrow record
    const borrowRecord = await BookBorrow.create({
      book: bookId,
      quantity,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowRecord,
    });
  } catch (error) {
  
    res.status(500).json({
      success: false,
      message: "Failed to borrow book",
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};
const getBorrowedBook = async (req: Request, res: Response) => {
  try {
    const summary = await BookBorrow.aggregate([
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve borrowed books",
      error,
    });
  }
};

export const borrowBooksController = {
  CreateBorrowBook,
  getBorrowedBook,
};
