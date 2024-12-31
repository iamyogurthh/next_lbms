import { connectdb } from '@/libs/utils'
import Book from '@/models/Book'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    await connectdb()
    const { id } = await params
    const book = await Book.find({ _id: id })
    if (book) {
      return NextResponse.json(book, { status: 200 })
    }
    return NextResponse.json({ message: 'No Book is found' })
  } catch (error) {
    console.log(error.message)
  }
}

export async function PUT(request, params) {
  try {
    await connectdb()
    const { id } = await params
    const book = await Book.findById(id)
    if (book) {
    }
    return NextResponse.json({ message: 'No book is found' }, { status: 404 })
  } catch (error) {
    console.log(error.message)
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    const result = await Book.findByIdAndDelete(id)
    if (result) {
      return NextResponse.json(
        { message: 'Deleted Successfully' },
        { status: 200 }
      )
    }
    return NextResponse.json({ message: 'Not Found' }, { status: 404 })
  } catch (error) {
    console.log(error.message)
  }
}
