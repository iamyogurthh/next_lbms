import React from 'react'
import BookCard from './BookCard'

const BookList = ({ books, query }) => {
  return (
    <div className="px-16 mt-16">
      <h1 className="section_title mb-12">
        {query ? `Search result for: ${query}` : 'Recently Added'}
      </h1>

      <div className="flex flex-wrap justify-start gap-6">
        {books.length === 0 ? (
          <p className="font-bold  w-full text-center text-black text-3xl">
            Book not found!
          </p>
        ) : (
          books.map((book, index) => (
            <BookCard
              key={index}
              id={book._id}
              title={book.title}
              author={book.author}
              genre={book.genre}
              coverImage={book.coverImage}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default BookList
