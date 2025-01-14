import { connectdb } from '@/libs/utils'
import BorrowReturnRecord from '@/models/BorrowReturnRecord'
import User from '@/models/User'
import { NextResponse } from 'next/server'

export async function PUT(request, { params }) {
  try {
    const { id: email, borrowRecordId } = await params
    const { bookId } = await request.json()
    console.log('book Id is', bookId)
    await connectdb()
    const [user, borrowRecord] = await Promise.all([
      User.findOne({ email: email }),
      BorrowReturnRecord.findById(borrowRecordId),
    ])
    if (!user) {
      return NextResponse.json({ message: 'No user found' }, { status: 404 })
    }

    if (!borrowRecord) {
      return NextResponse.json(
        { message: 'No Borrow Record found' },
        { status: 404 }
      )
    }
    const rtdate = await borrowRecord.returnBook(bookId)
    return NextResponse.json({ returnDate: rtdate }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'An error occurred while processing the request.' },
      { status: 500 }
    )
  }
}
