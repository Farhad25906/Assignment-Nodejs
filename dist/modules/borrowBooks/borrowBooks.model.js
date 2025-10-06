"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookBorrow = void 0;
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Books",
        required: [true, "object ID Must Lagbe"],
    },
    quantity: {
        type: Number,
        required: [true, "please enter the quantity"],
        min: [1, 'Quantity number must be at least 1'],
        validate: {
            validator: function (value) {
                return Number.isInteger(value) && value > 0;
            },
            message: "Quantity must be positive number"
        }
    },
    dueDate: {
        type: Date,
        required: [true, 'due Date is required'],
        validate: {
            validator: function (value) {
                return value instanceof Date && value > new Date();
            },
            message: "Due Date must be Future Date",
        }
    }
}, {
    versionKey: false,
    timestamps: true,
});
exports.BookBorrow = (0, mongoose_1.model)('BookBorrow', borrowSchema);
