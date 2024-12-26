import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div className="max-w-[396px] bg-[#F7F2FA] flex flex-col fixed bottom-0 top-0">
      <div className="p-8">
        <h1 className="logo">LBMS</h1>
        <span className="font-bold text-[24px]">Admin-Dashboard</span>
      </div>
      <ul className="px-[17px]">
        <li className="w-[336px] h-[56px]  flex justify-center items-center text-[14px] font-bold active">
          <Link href={'/adminPanel/addbook'}>Add Book</Link>
        </li>
        <li className="w-[336px] h-[56px]  flex justify-center items-center text-[14px] font-bold">
          <Link href={'/adminPanel/users'}>Users</Link>
        </li>
        <li className="w-[336px] h-[56px]  flex justify-center items-center text-[14px] font-bold ">
          <Link href={'/adminPanel/editbook'}>Edit Book</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
