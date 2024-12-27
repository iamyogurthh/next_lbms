import BookList from '@/components/BookList'
import Header from '@/components/Header'

export default async function Home({ searchParams }) {
  const query = (await searchParams).query

  const response = await fetch('http://localhost:3000/api/books')
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
    <>
      <Header query={query} />
      <BookList books={filteredBooks} query={query} />
    </>
  )
}
