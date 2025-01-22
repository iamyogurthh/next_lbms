import { connectdb } from '@/libs/utils'
import BorrowReturnRecord from '@/models/BorrowReturnRecord'
import User from '@/models/User'
import Book from '@/models/Book'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    const { id } = await params
    console.log("id is ",id)
    await connectdb()
    const user = await User.findById(id).select('-password');
    if (user) {
      const borrowReturnRecord = await BorrowReturnRecord.findOne({ email: user.email, })
        .select('-email -_id')
        .populate({
          path: 'books.borrowRecordId', populate: {
            path: 'bookId', model: 'Book'
          }
        });
        if (!borrowReturnRecord) {
          return NextResponse.json({user},{status : 200});
      }
      return NextResponse.json({ 
        user, 
        borrowBooks: borrowReturnRecord.books,
      }, { status: 200 })
    }
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  } catch (error) {
    console.log(error.message)
    return NextResponse.json(
      { message: 'An error occurred while processing the request.' },
      { status: 500 }
    )
  }
}
