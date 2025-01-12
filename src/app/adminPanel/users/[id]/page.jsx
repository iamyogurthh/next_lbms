import Link from 'next/link'
import React from 'react'
import BorrowedBooksTable from '@/components/AdminPanel/UserDetail/BorrowedBooksTable'

const page = async ({ params }) => {
  const { id } = await params
  console.log(id)
  const res = await fetch(`http://localhost:3000/api/users/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch user')
  }
  const data = await res.json()

  const userDetailElements = [
    {
      label: 'Name:',
      value: data.user.username,
    },
    {
      label: 'Email:',
      value: data.user.email,
    },
    {
      label: 'Phone:',
      value: data.user.phone,
    },
    {
      label: 'Created At:',
      value: data.user.createdAt,
    },
  ]
  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-bold">
          <Link href={'/adminPanel/users'}>Back</Link>
        </h1>
        <button className="font-bold text-red-500">Delete User</button>
      </div>
      <ul className="mt-[34px] mb-[26px]">
        {userDetailElements.map((element, index) => (
          <li className="flex mb-[8px] items-center gap-3" key={index}>
            <p className="font-bold">{element.label}</p>
            <p>{element.value}</p>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mb-[34px]">
        <form className="relative flex items-center">
          <input
            placeholder="Search"
            className="w-[331px] h-[40px] rounded-[9999px] pl-[16px] shadow-custom3"
          />
          <img
            src="/defaultIcons/search.png"
            alt="search"
            className="absolute right-5 hover:cursor-pointer"
          />
        </form>
      </div>
      <BorrowedBooksTable borrowBooks={data.borrowBooks} />
    </>
  )
}

export default page
