'use client'
import React, { useState } from 'react'
import BorrowBookTable from './BorrowBookTable'
import { toast } from 'react-toastify'

const BorrowBookForm = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    phone: '',
  })

  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    genre: '',
    bookId: '',
    borrowedAt: '',
    dueDate: '',
  })

  const [borrowedBooks, setBorrowedBooks] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)

  //Fetching suggestion list based on the input
  const fetchSuggestions = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSuggestions([])
      return
    }

    const res = await fetch(`http://localhost:3000/api/books`)
    const data = await res.json()
    const filteredData = data.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setSuggestions(filteredData)
  }

  //handling selected book
  const handleSelectedBook = (book) => {
    setSelectedBook(book)
    setBookData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      bookId: book._id,
      borrowedAt: '',
      dueDate: '',
    })
    setSuggestions([])
  }

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((pervData) => {
      const newData = { ...pervData, [name]: value }
      return newData
    })
  }

  const onChangeHandlerForBook = (event) => {
    const name = event.target.name
    const value = event.target.value
    setBookData((pervData) => {
      const newData = { ...pervData, [name]: value }

      if (name === 'borrowedAt') {
        const borrowedAt = new Date(value)
        const dueDate = new Date(borrowedAt)
        dueDate.setDate(dueDate.getDate() + 5)
        newData.dueDate = dueDate.toISOString().split('T')[0]
      }

      if (name === 'title') {
        setSelectedBook(null)
        if (value.trim() === '') {
          setSuggestions([])
        } else {
          fetchSuggestions(value)
        }
      }

      return newData
    })
  }

  // To add a book into the temp list table
  const addBook = () => {
    if (
      bookData.title &&
      bookData.author &&
      bookData.genre &&
      bookData.bookId &&
      bookData.borrowedAt &&
      bookData.dueDate
    ) {
      setBorrowedBooks((prevBooks) => [...prevBooks, bookData])
      setBookData({
        title: '',
        author: '',
        genre: '',
        bookId: '',
        borrowedAt: '',
        dueDate: '',
      })
      setSelectedBook(null)
    } else {
      alert('Please fill in all book fields.')
    }
  }

  //To reset the form
  const resetForm = () => {
    setData({
      username: '',
      email: '',
      phone: '',
    })
    setBookData({
      title: '',
      author: '',
      genre: '',
      bookId: '',
      borrowedAt: '',
      dueDate: '',
    })
    setBorrowedBooks([])
  }

  //for deleting book from the temp table
  const deleteBook = (bookId) => {
    setBorrowedBooks(
      borrowedBooks.filter((book) => {
        bookId != book.bookId
      })
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch(
      `http://localhost:3000/api/users/${data.email}/borrowBooks`,
      {
        method: 'POST',
        body: JSON.stringify({ books: borrowedBooks }),
      }
    )
    const resData = await res.json()
    if (res.status == 200) {
      toast('Form submitted successfully.')
      resetForm()
    } else {
      toast('Something went wrong. Please try again.')
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-[#4F378B]">User Information</h1>
        <button
          type="button"
          onClick={resetForm}
          className="font-bold text-red-500"
        >
          Reset Form
        </button>
      </div>

      <p className="form_label mt-[8px]">Name</p>
      <input
        name="username"
        placeholder="Enter user name"
        type="text"
        required
        className="form_input"
        onChange={onChangeHandler}
        value={data.username}
      />

      <p className="form_label mt-[34px]">Email</p>
      <input
        name="email"
        placeholder="Enter your email"
        type="email"
        required
        className="form_input"
        onChange={onChangeHandler}
        value={data.email}
      />

      <p className="form_label mt-[34px]">Phone</p>
      <input
        name="phone"
        placeholder="Enter your phone number"
        type="phone"
        required
        className="form_input"
        onChange={onChangeHandler}
        value={data.phone}
      />

      <h1 className="font-bold text-[#4F378B] mt-[34px]">Book Information</h1>
      <p className="form_label mt-[8px]">Book Title</p>
      <input
        name="title"
        placeholder="Enter book title"
        type="text"
        className="form_input"
        onChange={onChangeHandlerForBook}
        value={bookData.title}
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border border-black ">
          {suggestions.map((book, index) => (
            <li
              key={index}
              className="cursor-pointer border-b-2  w-[500px] hover:bg-gray-200  px-[32px]"
              onClick={() => handleSelectedBook(book)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold">{book.title}</p>
                  <p>{book.author}</p>
                  <p>{book.genre}</p>
                </div>

                <p>{book.qty}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="form_label mt-[34px]">Author Name</p>
      <input
        name="author"
        placeholder="Enter author name"
        type="text"
        className="form_input"
        onChange={onChangeHandlerForBook}
        value={bookData.author}
      />
      <p className="form_label mt-[34px]">Genre</p>
      <input
        name="genre"
        placeholder="Enter book genre"
        type="text"
        className="form_input"
        onChange={onChangeHandlerForBook}
        value={bookData.genre}
      />
      <p className="form_label mt-[34px]">Book Id</p>
      <input
        name="bookId"
        placeholder="Enter book id"
        type="text"
        className="form_input"
        onChange={onChangeHandlerForBook}
        value={bookData.bookId}
      />
      <p className="form_label mt-[34px]">Borrowed At</p>
      <input
        name="borrowedAt"
        placeholder="Enter borrowed date"
        type="date"
        className="form_input"
        onChange={onChangeHandlerForBook}
        value={bookData.borrowedAt}
      />
      <p className="form_label mt-[34px]">Due Date</p>
      <input
        name="dueDate"
        placeholder="Due date"
        type="date"
        className="form_input"
        onChange={onChangeHandlerForBook}
        value={bookData.dueDate}
      />
      <br />
      <button
        type="button"
        className="mt-8 bg-[#CDAEFF] px-[29px] py-[15px] font-bold text-[14px] text-[#4F378B]"
        onClick={addBook}
      >
        Add Book
      </button>
      <BorrowBookTable borrowedBooks={borrowedBooks} deleteBook={deleteBook} />
      <button
        type="submit"
        className="mt-8 bg-[#CDAEFF] px-[29px] py-[15px] font-bold text-[14px] text-[#4F378B]"
      >
        Submit Form
      </button>
    </form>
  )
}

export default BorrowBookForm
