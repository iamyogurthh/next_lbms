import React from 'react'
import Image from 'next/image'
import { formatDate } from '@/libs/utils'
import ReturnBookBtn from './ReturnBookBtn'
import DeleteBorrowRecordBtn from './DeleteBorrowRecordBtn'

const BorrowedBooksTableItems = async ({ book, email, borrowRecordId }) => {
  console.log("I am rendering table")
  const formattedDate = formatDate(book.borrowRecordId.returnDate)
  console.log(formattedDate)
  return (
    <tr className="border-b h-[80px]">
      <th
        scope="row"
        className="px-4 py-4 text-left font-normal max-w-[300px] align-middle"
      >
        <div className="flex gap-3 items-center">
          <div>
            <p className="font-bold text-wrap">{book.borrowRecordId.bookId.title}</p>
            <p className="font-normal whitespace-nowrap">
              {book.borrowRecordId.bookId.author}
            </p>
            <p className="font-bold text-[12px] text-gray-600">
              {book.borrowRecordId.bookId.genre}
            </p>
          </div>
        </div>
      </th>
      <td className="px-4 py-2 text-left align-middle font-bold">
        {formatDate(book.borrowRecordId.borrowDate)}
      </td>
      <td className="px-4 py-2 text-left align-middle text-red-500 font-bold">
        {formatDate(book.borrowRecordId.dueDate)}
      </td>
      <td className="px-4 py-2 text-left align-middle font-bold ">
        {formattedDate && formattedDate !== 'NaN/NaN/NaN' ? (
          formattedDate
        ) : (
          <ReturnBookBtn
            email={email}
            borrowRecordId={borrowRecordId}
          />
        )}
      </td>
      <td className="px-4 py-2 align-middle">
        <DeleteBorrowRecordBtn
          borrowRecordId={borrowRecordId}
          email={email}
          />
          {/* <button>
          <Image
            src="/defaultIcons/delete.png"
            alt="delete"
            width={25}
            height={25}
          />
        </button> */}
      </td>
    </tr>
  )
}

export default BorrowedBooksTableItems
