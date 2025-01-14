import BookTableItem from '@/components/AdminPanel/BookTableItem'
import React from 'react'
import SearchFormReset from '@/components/SearchFormReset'

const page = async ({ searchParams }) => {
  const query = (await searchParams).query

  const response = await fetch('http://localhost:3000/api/books')
  if (!response.ok) {
    throw new Error('Failed to fetch data ')
  }
  const books = await response.json()

  const filteredBooks = query
    ? books.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.genre.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase())
      )
    : books

  return (
    <div>
      <div className="flex justify-center">
        <form
          className="search-form relative flex items-center"
          action={'/adminPanel/editbook'}
        >
          <input
            placeholder="Search"
            className="w-[331px] h-[40px] rounded-[9999px] pl-[16px] shadow-custom3"
            name="query"
            defaultValue={query}
            required
          />
          <div className="absolute right-5 flex items-center gap-1 justify-center">
            {query && <SearchFormReset bringBackTo={'/adminPanel/editbook'} />}
            <button type="submit" className="hover:cursor-pointer">
              <img src="/defaultIcons/search.png" alt="search" />
            </button>
          </div>
        </form>
      </div>
      <div className="mt-[32px] bg-[#FEF7FF]">
        <div className="overflow-y-auto overflow-hidden max-h-[83vh]">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-white">
              <tr>
                <th scope="col" className="px-4 py-2 text-left">
                  Title
                </th>
                <th scope="col" className="px-4 py-2 text-left">
                  Genre
                </th>
                <th scope="col" className="px-4 py-2 text-left">
                  Book Id
                </th>
                <th scope="col" className="px-4 py-2 text-left">
                  Added At
                </th>
                <th scope="col" className="px-4 py-2 text-left">
                  Quantity
                </th>
                <th scope="col" className="px-4 py-2 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
                <BookTableItem key={index} book={book} query={query} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default page
