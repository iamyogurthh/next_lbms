import { connectdb, getDataFromForm } from '@/libs/utils'
import User from '@/models/User'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    await connectdb()
    const users = await User.find().select('-password')
    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    console.log(error.message)
    return NextResponse.json(
      { message: 'An error occurred while processing the request.' },
      { status: 500 }
    )
  }
}
