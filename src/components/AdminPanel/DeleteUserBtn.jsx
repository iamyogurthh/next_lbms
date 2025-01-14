'use client'
import React from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const DeleteUserBtn = ({ userId, style, redirectTo }) => {
  const router = useRouter()
  async function deleteUser() {
    try {
      const res = await fetch(`http://localhost:3000/api/auth/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId }),
      })

      if (!res.ok) {
        throw new Error('Fail to delete a user')
      } else {
        toast('User deleted successfully.')
        router.push(redirectTo)
      }
    } catch (error) {
      throw new Error(error)
    }
  }
  return (
    <>
      {style === 'text' ? (
        <button onClick={deleteUser} className="font-bold text-red-500">
          Delete User
        </button>
      ) : (
        <button onClick={deleteUser}>
          <Image
            src={'/defaultIcons/delete.png'}
            alt="delete"
            width={24}
            height={24}
          />
        </button>
      )}
    </>
  )
}

export default DeleteUserBtn
