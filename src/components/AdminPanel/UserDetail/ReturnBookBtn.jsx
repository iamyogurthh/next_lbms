'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const ReturnBookBtn = ({ borrowRecordId, email, bookId }) => {
  const router = useRouter()
  const handleClick = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/users/${email}/returnBooks/${borrowRecordId}/return`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ bookId: bookId }),
        }
      )

      if (res.ok) {
        console.log('Book returned successfully')
        toast('Book returned successfully')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <button
        onClick={handleClick}
        className="text-white bg-[#009F30] px-[10px] py-[5px] font-bold text-[12px] shadow-custom3 active:shadow-none rounded-[10px]"
      >
        Returned
      </button>
    </>
  )
}

export default ReturnBookBtn
