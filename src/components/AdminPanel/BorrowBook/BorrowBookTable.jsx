import React from 'react'
import BorrowBookTableItem from './BorrowBookTableItem'

const BorrowBookTable = ({ borrowedBooks, deleteBook }) => {
  return (
    <div className="mt-8 bg-[#FEF7FF] p-4 rounded-lg shadow-md">
      <div className="overflow-y-auto max-h-[400px] ">
        <table className="w-full text-sm ">
          <thead className="sticky top-0 bg-white border-b border-gray-300">
            <tr>
              <th scope="col" className="px-4 py-3 text-left font-medium">
                Book Title
              </th>
              <th scope="col" className="px-4 py-3 text-left font-medium">
                Genre
              </th>
              <th scope="col" className="px-4 py-3 text-left font-medium">
                Borrowed At
              </th>
              <th scope="col" className="px-4 py-3 text-left font-medium">
                Due Date
              </th>
              <th scope="col" className="px-4 py-3 text-left font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map((book, index) => (
              <BorrowBookTableItem
                book={book}
                key={index}
                deleteBook={deleteBook}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BorrowBookTable
