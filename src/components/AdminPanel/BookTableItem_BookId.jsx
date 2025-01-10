'use client'
import React from 'react'

const BookTableItem_BookId = ({ bookId }) => {
  return (
    <td
      className="px-4 py-2 text-left text-[14px] font-bold cursor-pointer"
      onClick={() =>
        navigator.clipboard
          .writeText(bookId)
          .then(() => alert('Book ID copied!'))
      }
    >
      {bookId}
    </td>
  )
}

export default BookTableItem_BookId
