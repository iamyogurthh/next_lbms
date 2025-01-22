import { connectdb } from '@/libs/utils'
import BorrowRecord from '@/models/BorrowRecord';
import BorrowReturnRecord from '@/models/BorrowReturnRecord'
import User from '@/models/User'
import { NextResponse } from 'next/server'

export async function PUT(request, { params }) {
  try {
    const { id: email } = await params;
    const { borrowRecordId } = await request.json()
    await connectdb();
    const [borrowRecord, borrowReturnRecord] = await Promise.all([
      BorrowRecord.findById(borrowRecordId),
      BorrowReturnRecord.findOne({ 'email': email }),
    ])
    if (!borrowRecord) {
      return NextResponse.json({ message: 'No Borrow Record was found' }, { status: 404 })
    }

    if (!borrowReturnRecord) {
      return NextResponse.json(
        { message: 'User or Borrow Return Record not found' },
        { status: 404 }
      )
    }
    const rtdate = await borrowReturnRecord.returnBook(borrowRecordId)
    return NextResponse.json({ returnDate: rtdate }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'An error occurred while processing the request.' },
      { status: 500 }
    )
  }
}
