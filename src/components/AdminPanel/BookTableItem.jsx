import React from 'react'
import Image from 'next/image'
import { formatDate } from '@/libs/utils'

import DeleteBookBtn from './DeleteBookBtn'
import Link from 'next/link'
import BookTableItem_BookId from './BookTableItem_BookId'

const BookTableItem = ({ book }) => {
  const bookCreatedTime = formatDate(book.createdAt)

  return (
    <tr className="border-b border-white">
      <th
        scope="row"
        className="items-center gap-3  flex max-w-[300px] px-4 py-2 text-left"
      >
        <Image
          src={book.coverImage}
          alt="user"
          width={63}
          height={97}
          className="object-cover border border-black max-w-[63px] max-h-[97px]"
        />
        <div className="text-left">
          <p className="font-bold  text-wrap">{book.title}</p>
          <p className="font-normal whitespace-nowrap">{book.author}</p>
        </div>
      </th>
      <td className="px-4 py-2 text-left">{book.genre}</td>
      <BookTableItem_BookId bookId={book._id} />
      <td className="px-4 py-2 text-left">
        {bookCreatedTime !== 'NaN/NaN/NaN' ? bookCreatedTime : 'No Date'}
      </td>
      <td className="px-4 py-2 text-left">{book.qty}</td>
      <td className="px-4 py-2 text-left">
        <div className="flex items-center justify-center space-x-2">
          <Link href={`/adminPanel/editbook/${book._id}`}>
            <Image
              src="/defaultIcons/edit.png"
              alt="edit"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </Link>
          <DeleteBookBtn mongoId={book._id} />
        </div>
      </td>
    </tr>
  )
}

export default BookTableItem
