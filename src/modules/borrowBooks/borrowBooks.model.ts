import { model, Schema } from "mongoose";
import { IBorrowBook } from "./borrowBooks.interface";


const borrowSchema = new Schema <IBorrowBook> ({
    book:{
        type:Schema.Types.ObjectId,
        ref:"Books",
        required:[true,"object ID Must Lagbe"],
    },
    quantity:{
        type:Number,
        required:[true,"please enter the quantity"],
        min:[1,'Quantity number must be at least 1'],
        validate:{
            validator:function(value){
                return Number.isInteger(value) && value >0;
            },
            message:"Quantity must be positive number"
        }
    },
    dueDate:{
        type:Date,
        required:[true,'due Date is required'],
        validate:{
            validator:function(value){
                return value instanceof Date && value> new Date();
            },
            message:"Due Date must be Future Date",
        }
    }
},
{
    versionKey:false,
    timestamps:true,
})

export const BookBorrow = model<IBorrowBook>('BookBorrow',borrowSchema)