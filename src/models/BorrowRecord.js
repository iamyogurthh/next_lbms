import mongoose from "mongoose"

const borrowRecordSchema = new mongoose.Schema({
    bookId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Book"
    },
    borrowDate : {
        type : Date,
        default : new Date()
    },
    dueDate : {
        type : Date,
        required : true
    },
    returnDate : Date,
})

const BorrowRecord = mongoose.models.BorrowRecord || mongoose.model("BorrowRecord",borrowRecordSchema)

export default BorrowRecord;