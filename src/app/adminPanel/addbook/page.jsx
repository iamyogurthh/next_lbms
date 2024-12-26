import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <form className="relative">
      <h1 className="form_label">Upload Book Cover Image</h1>
      <label htmlFor="image">
        <Image
          src={'/book_place_holder.png'}
          alt="book"
          width={100}
          height={173}
          className="mt-[18px] shadow-custom3"
        />
      </label>
      <input type="file" id="image" hidden required />

      <p className="form_label mt-8">Book Title</p>
      <input
        name="title"
        placeholder="Enter Book Name"
        type="text"
        required
        className="form_input"
      />

      <p className="form_label mt-8">Author Name</p>
      <input
        name="author-name"
        placeholder="Enter Author Name"
        type="text"
        required
        className="form_input"
      />

      <p className="form_label mt-8">Genre</p>
      <input
        name="genre"
        placeholder="Enter Book Genre"
        type="text"
        required
        className="form_input"
      />

      <p className="form_label mt-8">Quantity</p>
      <input
        name="qty"
        placeholder="Enter Book Quantity"
        type="number"
        required
        className="form_input"
      />

      <p className="form_label mt-8">Description</p>
      <input
        name="description"
        placeholder="Enter Book Description"
        type="text"
        required
        className="form_input"
      />

      <p className="form_label mt-8">Overview</p>
      <input
        name="overview"
        placeholder="Enter Book Overview"
        type="text"
        required
        className="form_input"
      />
      <br />
      <button className="mt-8 bg-[#CDAEFF] px-[29px] py-[15px] font-bold text-[14px] text-[#4F378B]">
        ADD BOOK
      </button>
    </form>
  )
}

export default page
