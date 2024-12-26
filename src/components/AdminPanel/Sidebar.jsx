'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
  const pathName = usePathname()

  const listItems = [
    { path: '/adminPanel/addbook', label: 'Add Book' },
    { path: '/adminPanel/users', label: 'Users' },
    { path: '/adminPanel/editbook', label: 'Edit Book' },
  ]

  return (
    <div className="max-w-[396px] bg-[#F7F2FA] flex flex-col fixed bottom-0 top-0">
      <div className="p-8">
        <h1 className="logo">LBMS</h1>
        <span className="font-bold text-[24px]">Admin-Dashboard</span>
      </div>
      <ul className="px-[17px]">
        {listItems.map((item, index) => (
          <li
            key={index}
            className={`sidebar_items ${
              pathName === item.path ? 'active' : ''
            }`}
          >
            <Link href={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
