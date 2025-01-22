import { connectdb, getDataFromForm } from '@/libs/utils'
import Book from '@/models/Book'
import BorrowRecord from '@/models/BorrowRecord'
import BorrowReturnRecord, {
  addBooksToBorrowReturnRecord,
} from '@/models/BorrowReturnRecord'
import User from '@/models/User'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    const { id: email } = await params
    await connectdb()
    const borrowedBooks = await BorrowReturnRecord.findOne({
      email: email,
    }).populate({
      path: 'books.bookId',
      model: 'Book',
    })
    if (borrowedBooks) {
      return NextResponse.json(borrowedBooks, { status: 200 })
    }
    return NextResponse.json({ message: 'No book found' }, { status: 200 })
  } catch (error) {
    console.log(error.message)
    return NextResponse.json(
      { message: 'An error occurred while processing the request.' },
      { status: 500 }
    )
  }
}

export async function POST(request, { params }) {
  try {
    const { id: email } = await params;
    const { books } = await request.json();
    console.log("books in frontends is ", books);
    await connectdb();
    const borrowRecord = await addBooksToBorrowReturnRecord(email, books);
    console.log("the borrow record is ", borrowRecord);
    return NextResponse.json(borrowRecord, { status: 200 })
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ message: "User or Book is invalid" }, { status: 400 })
  }
}


export async function DELETE(request,{params}) {
  try {
    const { borrowRecordId } = await request.json();
    const { id: email } = await params;
    await connectdb();
    const borrowReturnRecord = await BorrowReturnRecord.findOne({ email: email })
    if (!borrowReturnRecord) {
      return NextResponse.json({ message: "Borrow Return Record not found" }, { status: 404 })
    }
    const borrowRecordIdToDelete = borrowReturnRecord.books.findIndex((book) => book.borrowRecordId.toString() === borrowRecordId);
    if (borrowRecordIdToDelete === -1) {
      return NextResponse.json({ message: "Borrow Record not found" }, { status: 404 })
    }
    const borrowRecord = await BorrowRecord.findById(borrowRecordId);
    if (!borrowRecord.returnDate) {
      return NextResponse.json({ message: "You can't delete a record without returning the book" }, { status: 400 });
    }
    borrowReturnRecord.books.splice(borrowRecordIdToDelete, 1)
    await Promise.all([borrowReturnRecord.save(), BorrowRecord.findByIdAndDelete(borrowRecordId)])
    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
  }
}