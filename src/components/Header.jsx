import React from 'react'
import Navbar from './Navbar'
import SearchFormReset from './SearchFormReset'

const Header = ({ query }) => {
  return (
    <>
      <nav className="header_container">
        <Navbar />
        <div>
          <h1 className="font-bold text-[72px] text-center mt-[184px]">
            Library Management System
          </h1>
          <div className="flex justify-center mt-8">
            <form
              className="search-form relative flex items-center"
              action={'/'}
            >
              <input
                placeholder="Search"
                className="w-[331px] h-[40px] rounded-[9999px] pl-[16px] shadow-lg"
                name="query"
                defaultValue={query}
              />

              <div className="absolute right-5 flex items-center gap-1 justify-center">
                {query && <SearchFormReset />}
                <button type="submit" className="hover:cursor-pointer">
                  <img src="/defaultIcons/search.png" alt="search" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
