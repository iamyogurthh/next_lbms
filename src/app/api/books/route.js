import Book from '@/models/Book'
import { NextResponse } from 'next/server'
import path from 'path'
import { writeFile } from 'fs/promises'
import { connectdb, getDataFromForm } from '@/libs/utils'

export async function GET() {
  try {
    await connectdb()
    const books = await Book.find().sort({ createdAt: -1 })
    return NextResponse.json(books, { status: 200 })
  } catch (error) {
    console.log(error.message)
  }
}

export async function POST(request) {
  try {
    await connectdb()
    const formdata = await request.formData()
    const { title, qty, description, author, overview, genre, coverImage } =
      getDataFromForm(
        formdata,
        'title',
        'qty',
        'description',
        'author',
        'overview',
        'genre',
        'coverImage'
      )
    const book = new Book({
      title,
      author,
      qty,
      description,
      overview,
      genre,
    })
    if (coverImage) {
      const buffer = Buffer.from(await coverImage.arrayBuffer())
      const filename = Date.now() + coverImage.name.replaceAll(' ', '_')
      await writeFile(
        path.join(process.cwd(), 'public/bookImages/', filename),
        buffer
      )
      book.coverImage = `/bookImages/${filename}`
      await book.save()
      return NextResponse.json(
        book,
        { success: true, msg: 'Blog Added' },
        { status: 200 }
      )
    }
    await book.save()
    return NextResponse.json(book, { status: 200 })
  } catch (error) {
    console.log(error.message)
    return NextResponse.json(
      { success: false, msg: 'Post method error' },
      { status: 500 }
    )
  }
}
