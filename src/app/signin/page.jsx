import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <>
      <div className="bg-[#7A9DD5] h-[100vh] w-[100%] flex flex-col  items-center justify-center">
        <div className="pb-[32px]">
          <Link href={'/'} className="logo">
            LBMS
          </Link>
        </div>
        <div className="bg-white w-[516px] h-fit rounded-lg p-[32px] shadow-custom3">
          <form>
            <h1 className="text-[24px] font-black mb-[24px]">Sign in</h1>

            <label htmlFor="email" className="text-[16px]">
              Email
            </label>
            <br />
            <input
              name="email"
              id="email"
              type="email"
              placeholder="example@gmail.com"
              className="mt-[8px] border min-w-full h-[40px] pl-[16px] rounded-lg border-[#D9D9D9] mb-[24px]"
            />

            <label htmlFor="password" className="text-[16px]">
              Password
            </label>
            <br />
            <input
              name="password"
              id="password"
              type="password"
              placeholder="Enter your password"
              className="mt-[8px] border min-w-full h-[40px] pl-[16px] rounded-lg border-[#D9D9D9] mb-[32px]"
            />

            <div className="flex flex-col items-center w-full">
              <button className="bg-black text-white py-[9px] w-full rounded-lg mb-[24px]">
                Sign in
              </button>
              <p className="text-[16px]">
                Don't have an account?{' '}
                <Link href={'/register'} className="font-bold underline">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default page
