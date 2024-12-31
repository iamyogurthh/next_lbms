import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
      <div className="bg-[#7A9DD5] h-[100vh] w-[100%] ">
        <div className="px-[32px] pb-[32px]">
          <Link href={'/'} className="logo">
            LBMS
          </Link>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <div className="w-[674px] h-[684px] relative shadow-custom3 rounded-lg">
            <img
              src="/projectImages/bg-picture.jpg"
              alt="LBMS"
              className="object-cover w-[674px] h-[684px] opacity-50 rounded-lg"
            />
            <h1 className="absolute top-[40%] right-[30%] font-black text-white text-[100px] ">
              LBMS
            </h1>
          </div>
          <div className="bg-white w-[516px] h-fit rounded-lg p-[32px] shadow-custom3">
            <form>
              <h1 className="text-[24px] font-black mb-[24px]">Register</h1>

              <label htmlFor="username" className="text-[16px]">
                Username
              </label>
              <br />
              <input
                name="username"
                id="username"
                type="text"
                placeholder="Enter username"
                className="mt-[8px] border min-w-full h-[40px] pl-[16px] rounded-lg border-[#D9D9D9] mb-[24px]"
              />

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

              <label htmlFor="phone" className="text-[16px]">
                Phone Number
              </label>
              <br />
              <input
                name="phone"
                id="phone"
                type="phone"
                placeholder="Enter your phone number"
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
                className="mt-[8px] border min-w-full h-[40px] pl-[16px] rounded-lg border-[#D9D9D9] mb-[24px]"
              />

              <label htmlFor="confirmPassword" className="text-[16px]">
                Confirm Password
              </label>
              <br />
              <input
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="mt-[8px] border min-w-full h-[40px] pl-[16px] rounded-lg border-[#D9D9D9] mb-[32px]"
              />
              <div className="flex flex-col items-center w-full">
                <button className="bg-black text-white py-[9px] w-full rounded-lg mb-[8px]">
                  Register Account
                </button>
                <p className="text-[16px]">
                  Already have an account?{' '}
                  <Link href={'/signin'} className="font-bold underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default page
