import mongoose from 'mongoose'
import Book from '@/models/Book'
import { bookData } from './data'

export async function connectdb() {
  try {
    console.log(process.env.MONGO_URL)

    await mongoose.connect(process.env.MONGO_URL)
    console.log('Database is connected')
  } catch (error) {
    console.log(error.message)
  }
}

export function getDataFromForm(formData, ...args) {
  let data = {}
  for (let i = 0; i < args.length; i++) {
    data[args[i]] = formData.get(args[i])
  }
  return data
}

export async function seedBookData() {
  try {
    await connectdb()
    await Book.deleteMany()
    await Book.insertMany(bookData)
  } catch (error) {
    console.log(error.message)
  }
}

export async function handleImage() {}

// seedBookData().then(() => {
//     console.log("Congratulation ! Data seeding is complete");
// }).catch((err) => { console.log(err.message) });

export function formatDate(dateInput) {
  const date = new Date(dateInput)
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${date.getFullYear()}`
}
