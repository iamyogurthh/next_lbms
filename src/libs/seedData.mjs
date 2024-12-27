import Book from '@/models/Book'
import connectdb from './connectdb'
import { bookData } from './data'

export async function seedBookData() {
  try {
    await connectdb()
    await Book.deleteMany()
    await Book.insertMany(bookData)
  } catch (error) {
    console.log(error.message)
  }
}

// seedBookData().then(() => {
//     console.log("Congratulation ! Data seeding is complete");
// }).catch((err) => { console.log(err.message) });
