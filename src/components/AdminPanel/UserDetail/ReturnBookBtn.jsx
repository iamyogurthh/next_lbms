'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const ReturnBookBtn = ({ borrowRecordId, email }) => {
  const router = useRouter()
  const handleClick = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/users/${email}/returnBook/return`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ borrowRecordId: borrowRecordId }),
        }
      )

      if (res.ok) {
        toast('Book returned successfully')
        window.location.reload();
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
