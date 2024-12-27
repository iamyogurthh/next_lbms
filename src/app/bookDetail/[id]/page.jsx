import Navbar from '@/components/Navbar'
import { bookData } from '@/libs/data'
import React from 'react'

const page = async ({ params }) => {
  const { id } = await params
  //const [book] = bookData.filter((book) => book._id === id)
  const response = await fetch(`http://localhost:3000//api/books/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch a book')
  }
  const [book] = await response.json()
  return (
    <>
      <div className="header_container">
        <Navbar />
      </div>
      <div className="flex justify-right ml-8 items-center absolute top-[270px] gap-[64px]">
        <img
          alt={book.title}
          src={book.coverImage}
          width={273}
          height={413}
          className="max-w-[273px] max-h-[413px] object-cover  shadow-custom3"
        />
        <div>
          <h1 className="font-bold text-white  text-[72px] ">{book.title}</h1>
          <h2 className="font-medium text-[32px] mb-[32px]">{book.author}</h2>
          <span className="text-[14px] bg-[#ffffff] px-[13px] py-[5px] rounded-[20px] font-medium shadow-custom3">
            {book.genre}
          </span>
        </div>
      </div>
      <div className="mt-[147px] px-[64px] mb-[64px]">
        <h1 className="section_title mb-8">Description</h1>
        <p className="text-2xl font-normal">{book.description}</p>
      </div>
      <div className="px-[64px] mb-[64px]">
        <h1 className="section_title mb-8">Overview</h1>
        <p className="text-2xl font-normal">{book.overview}</p>
      </div>
    </>
  )
}

export default page
