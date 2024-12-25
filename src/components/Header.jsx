import Link from 'next/link'
import React from 'react'
import Navbar from './Navbar'

const Header = () => {
  return (
    <nav className="header_container">
      <Navbar />
      <div>
        <h1 className="font-bold text-[72px] text-center mt-[184px]">
          Library Management System
        </h1>
        <div className="flex justify-center mt-8">
          <form className="relative flex items-center">
            <input
              placeholder="Search"
              className=" w-[331px] h-[40px] rounded-[9999px] pl-[16px] shadow-lg"
            />
            <img
              src="/search.png"
              alt="search"
              className="absolute right-5 hover:cursor-pointer"
            />
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Header
