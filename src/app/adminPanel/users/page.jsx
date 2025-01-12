import React from 'react'
import UserTableItem from '@/components/AdminPanel/UserTableItem'

const page = async () => {
  const res = await fetch('http://localhost:3000/api/users')
  if (!res.ok) {
    throw new Error('Failed to fetch users')
  }
  const users = await res.json()

  return (
    <div className="">
      <div className="flex justify-center">
        <form className="relative flex items-center">
          <input
            placeholder="Search"
            className="w-[331px] h-[40px] rounded-full pl-4 shadow-custom3 border border-gray-300"
          />
          <img
            src="/defaultIcons/search.png"
            alt="search"
            className="absolute right-5 hover:cursor-pointer"
          />
        </form>
      </div>
      <div className="mt-8 bg-[#FEF7FF] rounded-lg shadow">
        <div className="overflow-y-auto overflow-hidden max-h-[83vh]">
          <table className="w-full border-collapse text-sm text-left">
            <thead className="sticky top-0 bg-white">
              <tr className="bg-white">
                <th className="py-3 px-4 border-b font-medium text-gray-600">
                  Name
                </th>
                <th className="py-3 px-4 border-b font-medium text-gray-600">
                  Created At
                </th>
                <th className="py-3 px-4 border-b font-medium text-gray-600">
                  Is Admin
                </th>
                <th className="py-3 px-4 border-b font-medium text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <UserTableItem
                  key={index}
                  name={user.username}
                  isAdmin={user.isAdmin}
                  userId={user._id}
                  createdAt={user.createdAt}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default page
