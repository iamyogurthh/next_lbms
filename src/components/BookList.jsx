import React from 'react'
import BookCard from './BookCard'

const BookList = async () => {
  const response = await fetch('http://localhost:3000//api/books')
  if (!response.ok) {
    throw new Error('Failed to fetch books')
  }
  const books = await response.json()

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
