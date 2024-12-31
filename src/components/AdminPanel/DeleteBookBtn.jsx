'use client'
import React from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'

const DeleteBookBtn = ({ mongoId }) => {
  const deleteBook = async (mongoId) => {
    console.log('trying to delete ', mongoId)
    const response = await fetch(`http://localhost:3000/api/books/${mongoId}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      toast.error("Can't Delete Book")
      return
    }
    toast.success('Book Deleted')
    window.location.reload()
  }

  return (
    <button onClick={() => deleteBook(mongoId)}>
      <Image
        src={'/defaultIcons/delete.png'}
        alt="delete"
        width={25}
        height={25}
      />
    </button>
  )
}

export default DeleteBookBtn
