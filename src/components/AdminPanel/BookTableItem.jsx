import React from 'react'
import Image from 'next/image'
import { formatDate } from '@/libs/utils'

const BookTableItem = ({ book }) => {
  const bookCreatedTime = formatDate(book.createdAt)
  const bookUpdatedTime = formatDate(book.updatedAt)

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
      <td className="px-4 py-2 text-left">
        {bookCreatedTime !== 'NaN/NaN/NaN' ? bookCreatedTime : 'No Date'}
      </td>
      <td className="px-4 py-2 text-left">
        {bookUpdatedTime !== 'NaN/NaN/NaN' ? bookUpdatedTime : 'No Date'}
      </td>
      <td className="px-4 py-2 text-left">{book.qty}</td>
      <td className="gap-6 px-4 py-2 text-left">
        <button>
          <Image
            src={'/defaultIcons/edit.png'}
            alt="edit"
            width={24}
            height={24}
            className="mr-6"
          />
        </button>
        <button>
          <Image
            src={'/defaultIcons/delete.png'}
            alt="delete"
            width={25}
            height={25}
          />
        </button>
      </td>
    </tr>
  )
}

export default BookTableItem
