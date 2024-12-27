import React from 'react'
import BookCard from './BookCard'
import { bookData } from '@/libs/data'

const BookList = () => {
  const books = bookData
  try {
  } catch (error) {
    console.log(error)
  }

  return (
    <div className="px-16 mt-16">
      <h1 className="section_title mb-12">Recently Added</h1>

      <div className="flex flex-wrap justify-between">
        {books.map((book, index) => (
          <BookCard
            key={index}
            id={book._id}
            title={book.title}
            author={book.author}
            genre={book.genre}
            coverImage={book.coverImage}
          />
        ))}
      </div>
    </div>
  )
}

export default BookList
