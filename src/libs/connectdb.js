import mongoose from 'mongoose'
export default async function connectdb() {
  try {
    console.log(process.env.MONGO_URL)

    await mongoose.connect(process.env.MONGO_URL)
    console.log('Database is connected')
  } catch (error) {
    console.log(error.message)
  }
}
