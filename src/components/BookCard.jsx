import Link from 'next/link'
import React from 'react'

const BookCard = ({ title, author, genre, coverImage, id }) => {
  return (
    <div className="p-[18px] box-shadow w-[240px] mb-10 hover:shadow-custom2">
      <Link href={`/bookDetail/${id}`}>
        <img
          src={coverImage}
          alt={title}
          width={204}
          height={298}
          className="border border-black max-w-[204px] max-h-[290px] object-cover"
        />
      </Link>
      <Link href={`/bookDetail/${id}`}>
        <h1 className="text-[16px] font-bold mt-4">{title}</h1>
      </Link>
      <h1 className="text-[16px] mt-2 mb-2">{author}</h1>
      <span className="text-[12px] bg-[#E7E7E7] px-[12px] py-[3px] rounded-[9px] font-bold">
        {genre}
      </span>
    </div>
  )
}

export default BookCard
