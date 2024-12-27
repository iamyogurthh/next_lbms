import Book from '@/models/Book'
import connectdb from '@/libs/connectdb'
import { NextResponse } from 'next/server'
import path from 'path'
export async function GET() {
  try {
    await connectdb()
    const books = await Book.find()
    return NextResponse.json(books, { status: 200 })
  } catch (error) {
    console.log(error.message)
  }
}

export async function POST(request) {
  try {
    await connectdb()
    const { title, author, genre, description, overview, qty } =
      await request.formData()
    const coverImage = await request.formData().get('coverImage')
    if (!coverImage) {
    }
    const buffer = Buffer.from(await coverImage.arrayBuffer())
    const filename = Date.now + coverImage.name.replaceAll(' ', '_')
    await writeFile(
      path.join(process.cwd() + 'public/bookImages/' + filename),
      buffer
    )
  } catch (error) {
    console.log(error.message)
  }
}
