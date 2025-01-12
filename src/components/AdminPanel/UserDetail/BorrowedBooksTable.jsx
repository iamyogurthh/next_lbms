import React from 'react'
import BorrowedBooksTableItems from './BorrowedBooksTableItems'

const BorrowedBooksTable = ({ borrowBooks }) => {
  console.log(borrowBooks)
  return (
    <div className="mt-8 bg-[#FEF7FF] p-4 rounded-lg shadow-md">
      <div className="overflow-y-auto max-h-[400px] ">
        <table className="w-full text-sm ">
          <thead className="sticky top-0 bg-white ">
            <tr>
              <th scope="col" className="px-4 py-3 text-left font-bold ">
                Book Title
              </th>
              <th scope="col" className="px-4 py-3 text-left font-bold">
                Borrowed At
              </th>
              <th scope="col" className="px-4 py-3 text-left font-bold">
                Due Date
              </th>
              <th scope="col" className="px-4 py-3 text-left font-bold">
                Returned
              </th>
              <th scope="col" className="px-4 py-3 text-left font-bold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {borrowBooks.map((book, index) => (
              <BorrowedBooksTableItems key={index} book={book} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BorrowedBooksTable
