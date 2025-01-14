import React from 'react'
import UserTableItem from '@/components/AdminPanel/UserTableItem'
import SearchFormReset from '@/components/SearchFormReset'

const page = async ({ searchParams }) => {
  const query = (await searchParams).query
  console.log(query)

  const res = await fetch('http://localhost:3000/api/users')
  if (!res.ok) {
    throw new Error('Failed to fetch users')
  }
  const users = await res.json()
  console.log(users)

  const filteredUsers = query
    ? users.filter((user) =>
        user.username.toLowerCase().includes(query.toLowerCase())
      )
    : users
  return (
    <div>
      <div className="flex justify-center">
        <form className="relative flex items-center">
          <input
            placeholder="Search"
            className="w-[331px] h-[40px] rounded-full pl-4 shadow-custom3 border border-gray-300"
            name="query"
            defaultValue={query}
            required
          />
          <div className="absolute right-5 flex items-center gap-1 justify-center">
            {query && <SearchFormReset bringBackTo={'/adminPanel/users'} />}
            <button type="submit" className="hover:cursor-pointer">
              <img src="/defaultIcons/search.png" alt="search" />
            </button>
          </div>
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
              {filteredUsers.map((user, index) => (
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
