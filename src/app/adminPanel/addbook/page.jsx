'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const page = () => {
  const [image, setImage] = useState('')
  const [data, setData] = useState({
    title: '',
    author: '',
    genre: '',
    qty: 0,
    description: '',
    overview: '',
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((pervData) => {
      const newData = { ...pervData, [name]: value }
      console.log(newData)
      return newData
    })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    console.log('Image is from frontend', image)
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('author', data.author)
    formData.append('genre', data.genre)
    formData.append('description', data.description)
    formData.append('overview', data.overview)
    formData.append('qty', data.qty)
    formData.append('coverImage', image)

    try {
      const response = await fetch('http://localhost:3000/api/books', {
        method: 'POST',
        body: formData,
      })

      console.log(response.status)
      if (response.status) {
        toast.success('Book Posted')
        setImage(false)
        setData({
          title: '',
          author: '',
          genre: '',
          qty: 0,
          description: '',
          overview: '',
        })
      } else {
        toast.error('Something went wrong')
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }
  return (
    <form className="relative" onSubmit={onSubmitHandler}>
      <h1 className="form_label">Upload Book Cover Image</h1>
      <label htmlFor="image">
        <Image
          src={
            !image
              ? '/defaultIcons/book_place_holder.png'
              : URL.createObjectURL(image)
          }
          alt="book"
          width={100}
          height={173}
          className="mt-[18px] shadow-custom3 min-w-[100px] min-h-[173px] object-cover"
        />
      </label>
      <input
        type="file"
        id="image"
        hidden
        onChange={(e) => setImage(e.target.files[0])}
      />

      <p className="form_label mt-8">Book Title</p>
      <input
        name="title"
        placeholder="Enter Book Name"
        type="text"
        required
        className="form_input"
        onChange={onChangeHandler}
        value={data.title}
      />

      <p className="form_label mt-8">Author Name</p>
      <input
        name="author"
        placeholder="Enter Author Name"
        type="text"
        required
        className="form_input"
        onChange={onChangeHandler}
        value={data.author}
      />

      <p className="form_label mt-8">Genre</p>
      <input
        name="genre"
        placeholder="Enter Book Genre"
        type="text"
        required
        className="form_input"
        onChange={onChangeHandler}
        value={data.genre}
      />

      <p className="form_label mt-8">Quantity</p>
      <input
        name="qty"
        placeholder="Enter Book Quantity"
        type="number"
        required
        className="form_input"
        onChange={onChangeHandler}
        value={data.qty}
      />

      <p className="form_label mt-8">Description</p>
      <input
        name="description"
        placeholder="Enter Book Description"
        type="text"
        required
        className="form_input"
        onChange={onChangeHandler}
        value={data.description}
      />

      <p className="form_label mt-8">Overview</p>
      <input
        name="overview"
        placeholder="Enter Book Overview"
        type="text"
        required
        className="form_input"
        onChange={onChangeHandler}
        value={data.overview}
      />
      <br />
      <button
        type="submit"
        className="mt-8 bg-[#CDAEFF] px-[29px] py-[15px] font-bold text-[14px] text-[#4F378B]"
      >
        ADD BOOK
      </button>
    </form>
  )
}

export default page
