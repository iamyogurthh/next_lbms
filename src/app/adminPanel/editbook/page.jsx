import BookTableItem from '@/components/AdminPanel/BookTableItem'
import React from 'react'

const page = async () => {
  const response = await fetch('http://localhost:3000/api/books')
  if (!response.ok) {
    throw new Error('Failed to fetch data ')
  }
  const books = await response.json()

  return (
    <div>
      <div className="flex justify-center">
        <form className="relative flex items-center">
          <input
            placeholder="Search"
            className="w-[331px] h-[40px] rounded-[9999px] pl-[16px] shadow-custom3"
          />
          <img
            src="/defaultIcons/search.png"
            alt="search"
            className="absolute right-5 hover:cursor-pointer"
          />
        </form>
      </div>
      <div className="mt-[34px] bg-[#FEF7FF]">
        <div className="overflow-y-auto overflow-hidden max-h-[83vh]">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-white">
              <tr>
                <th scope="col" className="px-4 py-2 text-left">
                  Title
                </th>
                <th scope="col" className="px-4 py-2 text-left">
                  Genre
                </th>
                <th scope="col" className="px-4 py-2 text-left">
                  Added At
                </th>
                <th scope="col" className="px-4 py-2 text-left">
                  Updated At
                </th>
                <th scope="col" className="px-4 py-2 text-left">
                  Quantity
                </th>
                <th scope="col" className="px-4 py-2 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <BookTableItem key={index} book={book} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default page
