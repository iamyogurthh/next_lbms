import React from 'react'
import Image from 'next/image'
import { formatDate } from '@/libs/utils'

const BorrowedBooksTableItems = async ({ book }) => {
  const bookId = book.bookId

  const res = await fetch(`http://localhost:3000/api/books/${bookId}`)
  if (!res.ok) {
    throw new Error('Failed to fetch book')
  }
  const [data] = await res.json()
  return (
    <tr className="border-b h-[80px]">
      <th
        scope="row"
        className="px-4 py-4 text-left font-normal max-w-[300px] align-middle"
      >
        <div className="flex gap-3 items-center">
          <div>
            <p className="font-bold text-wrap">{data.title}</p>
            <p className="font-normal whitespace-nowrap">{data.author}</p>
            <p className="font-bold text-[12px] text-gray-600">{data.genre}</p>
          </div>
        </div>
      </th>
      <td className="px-4 py-2 text-left align-middle font-bold">
        {formatDate(book.borrowDate)}
      </td>
      <td className="px-4 py-2 text-left align-middle text-red-500 font-bold">
        {formatDate(book.dueDate)}
      </td>
      <td className="px-4 py-2 text-left align-middle font-bold ">
        <button className="text-white bg-[#009F30] px-[10px] py-[5px] font-bold text-[12px] shadow-custom3 active:shadow-none rounded-[10px]">
          Returned
        </button>
      </td>
      <td className="px-4 py-2 align-middle">
        <button>
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

export default BorrowedBooksTableItems
