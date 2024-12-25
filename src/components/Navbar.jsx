import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="flex justify-between items-center">
      <Link href={'/'} className="font-bold text-[35px]">
        LBMS
      </Link>
      <Link href={'/register'} className="text-base font-bold">
        Register
      </Link>
    </div>
  )
}

export default Navbar
