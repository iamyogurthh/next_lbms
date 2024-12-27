import { users } from '@/libs/data'
import React from 'react'
import UserTableItem from '@/components/AdminPanel/UserTableItem'

const page = () => {
  return (
    <div>
      <div className="flex justify-center">
        <form className="relative flex items-center">
          <input
            placeholder="Search"
            className=" w-[331px] h-[40px] rounded-[9999px] pl-[16px] shadow-custom3"
          />
          <img
            src="/defaultIcons/search.png"
            alt="search"
            className="absolute right-5 hover:cursor-pointer"
          />
        </form>
      </div>
      <div className="mt-[34px] bg-[#FEF7FF]">
        <table className="w-full ">
          <thead className="text-left bg-white px-[16px]">
            <tr>
              <th scope="col" className="">
                Name
              </th>
              <th scope="col" className="">
                Created At
              </th>
              <th scope="col" className="">
                Is Admin
              </th>
              <th scope="col" className="">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <UserTableItem
                key={index}
                name={user.name}
                isAdmin={user.isAdmin}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page
