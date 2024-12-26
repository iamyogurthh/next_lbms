import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="flex justify-between items-center">
      <Link href={'/'} className="logo">
        LBMS
      </Link>
      <Link href={'/register'} className="text-base font-bold">
        Register
      </Link>
    </div>
  )
}

export default Navbar
