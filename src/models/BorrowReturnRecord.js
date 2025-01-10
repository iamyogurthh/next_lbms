import mongoose from "mongoose";
import Book from "./Book";


const bookRecordSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
        required: true,
    },
    borrowDate: {
        type: Date,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    returnDate: Date,
},
    {
        timestamps: true,
    }
)

const borrowReturnRecordSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    books: [bookRecordSchema],
},
    {
        timestamps: true,
    },
)


borrowReturnRecordSchema.methods.returnBook = async function (bookId) {
    try {
        const bookRecord = this.books.find(book => book.bookId.toString() === bookId);
        if (bookRecord && !bookRecord.returnDate) {
            bookRecord.returnDate = new Date();
            const book = await Book.findById(bookId);
            if (book) {
                book.qty += 1;
                await book.save();
            }
        }
        await this.save();

    } catch (error) {
        throw new Error(error);
    }
}


export async function addBooksToBorrowReturnRecord(email, books) {
    try {
        const borrowDate = new Date();
        const bookRecords = await Promise.all(books.map(async book => {
            const existbook = await Book.findById(book.bookId);
            if (!existbook || existbook.qty <= 0 ) {
                throw new Error(`Book not found or No book is left`)
            }
            existbook.qty -= 1;
            await existbook.save();
            return {
                bookId: book.bookId,
                borrowDate,
                dueDate: new Date(book.dueDate)
            }
        }));
        console.log("The BookRecords array is ", bookRecords);
        let borrowRecord = await BorrowReturnRecord.findOne({ email: email });
        if (!borrowRecord) {
            borrowRecord = new BorrowReturnRecord({
                email,
                books: bookRecords,
            })
        } else {
            borrowRecord.books.push(...bookRecords);
        }
        await borrowRecord.save();
        return borrowRecord;
    } catch (error) {
        console.log(error);
    }
}


const BorrowReturnRecord = mongoose.models.BorrowReturnRecord || mongoose.model("BorrowReturnRecord", borrowReturnRecordSchema);




export default BorrowReturnRecord;