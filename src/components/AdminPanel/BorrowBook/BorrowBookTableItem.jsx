import React from 'react'
import Image from 'next/image'

const BorrowBookTableItem = ({ book, deleteBook }) => {
  return (
    <tr className="border-b h-[80px]">
      <th
        scope="row"
        className="px-4 py-2 text-left font-normal max-w-[300px] align-middle"
      >
        <div className="flex gap-3 items-center">
          <div>
            <p className="font-bold text-wrap">{book.title}</p>
            <p className="font-normal whitespace-nowrap">{book.author}</p>
          </div>
        </div>
      </th>
      <td className="px-4 py-2 text-left align-middle">{book.genre}</td>
      <td className="px-4 py-2 text-left align-middle">{book.borrowedAt}</td>
      <td className="px-4 py-2 text-left align-middle font-bold text-red-500">
        {book.dueDate}
      </td>
      <td className="px-4 py-2 align-middle">
        <button onClick={() => deleteBook(book.bookId)}>
          <Image
            src="/defaultIcons/delete.png"
            alt="delete"
            width={25}
            height={25}
          />
        </button>
      </td>
    </tr>
  )
}

export default BorrowBookTableItem
