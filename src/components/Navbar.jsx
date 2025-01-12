'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

const Navbar = () => {
  const { data: session } = useSession()
  console.log("session is ",session);
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex justify-between items-center">
      <Link href={'/'} className="logo">
        LBMS
      </Link>
      {!session ? (
        <Link href={'/register'} className="text-base font-bold">
          Register
        </Link>
      ) : (
        <div
          className="relative w-[150px]  text-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="text-[18px] font-bold cursor-pointer">
            {session.user.username}
          </span>
          {isHovered && (
            <div className="absolute top-full w-full  right-0 bg-white bg-opacity-[70%] shadow-lg border rounded p-2 text-center">
              <button
                onClick={() => signOut()}
                className="text-[16px] hover:font-bold"
              >
                Sign Out
              </button>
              <br />
              {session.user.isAdmin && (
                <Link
                  href={'/adminPanel/addbook'}
                  className="text-[16px] hover:font-bold mt-[8px]"
                >
                  Admin Panel
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Navbar
