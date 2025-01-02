import EditBookForm from '@/components/AdminPanel/EditBookForm'
import React from 'react'

const getBookById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/books/${id}`)
    const book = await response.json()
    return book
  } catch (error) {
    console.log('Fail to fetch book')
  }
}

const page = async ({ params }) => {
  const { id } = await params
  const [book] = await getBookById(id)

  return (
    <EditBookForm
      mongoId={id}
      title={book.title}
      author={book.author}
      genre={book.genre}
      qty={book.qty}
      description={book.description}
      overview={book.overview}
      coverImage={book.coverImage}
    />
  )
}

export default page
