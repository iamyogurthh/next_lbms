import mongoose from 'mongoose'
import Book from './Book'
import BorrowRecord from './BorrowRecord';

const borrowReturnRecordSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    books: [{
      borrowRecordId: {
        type: mongoose.Types.ObjectId,
        ref: "BorrowRecord"
      }
    }],
  },
  {
    timestamps: true,
  }
)

borrowReturnRecordSchema.methods.returnBook = async function (borrowRecordId) {
  try {
    let rtdate;
    const borrowRecordInReturn = this.books.find((book) => book.borrowRecordId.toString() === borrowRecordId)
    if (!borrowRecordInReturn) {
      return "Borrow Record not found Not found"
    }
    const borrowRecord = await BorrowRecord.findById(borrowRecordId);
    if (borrowRecord && !borrowRecord.returnDate) {
      const book = await Book.findById(borrowRecord.bookId);
      if (!book) {
        return "Book not found"
      }
      book.qty += 1;
      rtdate = new Date();
      borrowRecord.returnDate = rtdate;
      await Promise.all([book.save(), borrowRecord.save(), this.save()])
    } else {
      return "Book Record not found or Book had already been returned"
    }
    return rtdate;
  } catch (error) {
    throw new Error(error)
  }
}

export async function addBooksToBorrowReturnRecord(email, books) {
  try {
    const borrowDate = new Date();
    const borrowRecordIds = [];
    for (const book of books) {
      const existbook = await Book.findById(book.bookId)
      if (!existbook || existbook.qty <= 0) {
        throw new Error(`Book not found or No book is left`)
      }
      console.log("book qty is ", existbook.qty)
      existbook.qty -= 1;
      console.log("book qty after -", existbook.qty)
      await existbook.save();
      console.log("After saving ", existbook.qty)
      const borrowRecord = await BorrowRecord.create({
        bookId: book.bookId,
        borrowDate,
        dueDate: new Date(book.dueDate),
      })
      borrowRecordIds.push({borrowRecordId : borrowRecord._id})
    }
    let borrowReturnRecord = await BorrowReturnRecord.findOne({ email: email })
    if (!borrowReturnRecord) {
      borrowReturnRecord = new BorrowReturnRecord({
        email,
        books: borrowRecordIds,
      })
    } else {
      borrowReturnRecord.books.push(...borrowRecordIds)
    }
    await borrowReturnRecord.save()
    return borrowReturnRecord
  } catch (error) {
    console.log(error)
  }
}

const BorrowReturnRecord =
  mongoose.models.BorrowReturnRecord ||
  mongoose.model('BorrowReturnRecord', borrowReturnRecordSchema)

export default BorrowReturnRecord
