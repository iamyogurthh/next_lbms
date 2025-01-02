import Book from '@/models/Book'
import { NextResponse } from 'next/server'
import { connectdb, getDataFromForm, handleImage } from '@/libs/utils';

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
    await connectdb();
    const formdata = await request.formData();
    const { title, qty, description, author, overview, genre, coverImage } = getDataFromForm(formdata, "title", "qty", "description", "author", "overview", "genre", "coverImage");
    console.log("I am coverImage in post",coverImage);
    const book = new Book({
      title,
      author,
      qty,
      description,
      overview,
      genre,
    });
    if (coverImage) {
      const filename = await handleImage(coverImage);
      book.coverImage = `/bookImages/${filename}`;
      await book.save();
      return NextResponse.json(book, { status: 201 });
    }
    await book.save();
    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.log(error.message);
  }
}


