'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Page = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const router = useRouter()

  //Error Handlers
  const validateForm = () => {
    const newErrors = {}
    if (!data.username.trim()) newErrors.username = 'Username is required.'
    if (!data.email.trim()) newErrors.email = 'Email is required.'
    if (!data.phone.trim()) newErrors.phone = 'Phone number is required.'
    if (!data.password.trim()) newErrors.password = 'Password is required.'
    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Clear errors as user types
    }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error('Please fix the errors in the form.')
      return
    }

    const formData = new FormData()
    formData.append('username', data.username)
    formData.append('password', data.password)
    formData.append('email', data.email)
    formData.append('phone', data.phone)

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: formData,
      })

      if (response.status === 200) {
        toast.success('Account successfully registered.')
        router.push('/signin')
      } else {
        toast.error('Failed to register account.')
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to register account.')
    }
  }

  return (
    <>
      <div className="bg-[#7A9DD5] h-[100vh] w-[100%] ">
        <div className="px-[32px] pb-[32px]">
          <Link href={'/'} className="logo">
            LBMS
          </Link>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <div className="w-[674px] h-fit relative shadow-custom3 rounded-lg">
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
            <form onSubmit={onSubmitHandler}>
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
                className={`mt-[8px] border min-w-full h-[40px] pl-[16px] rounded-lg ${
                  errors.username ? 'border-red-500 mb-0' : 'border-[#D9D9D9]'
                } mb-[24px]`}
                onChange={onChangeHandler}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mb-2">{errors.username}</p>
              )}

              <label htmlFor="email" className="text-[16px]">
                Email
              </label>
              <br />
              <input
                name="email"
                id="email"
                type="email"
                placeholder="example@gmail.com"
                className={`mt-[8px] border min-w-full h-[40px] pl-[16px] rounded-lg ${
                  errors.email ? 'border-red-500 mb-0' : 'border-[#D9D9D9]'
                } mb-[24px]`}
                onChange={onChangeHandler}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mb-2">{errors.email}</p>
              )}

              <label htmlFor="phone" className="text-[16px]">
                Phone Number
              </label>
              <br />
              <input
                name="phone"
                id="phone"
                type="phone"
                placeholder="Enter your phone number"
                className={`mt-[8px] border min-w-full h-[40px] pl-[16px] rounded-lg ${
                  errors.phone ? 'border-red-500 mb-0' : 'border-[#D9D9D9]'
                } mb-[24px]`}
                onChange={onChangeHandler}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mb-2">{errors.phone}</p>
              )}

              <label htmlFor="password" className="text-[16px]">
                Password
              </label>
              <br />
              <input
                name="password"
                id="password"
                type="password"
                placeholder="Enter your password"
                className={`mt-[8px] border min-w-full h-[40px] pl-[16px] rounded-lg ${
                  errors.password ? 'border-red-500 mb-0' : 'border-[#D9D9D9]'
                } mb-[24px]`}
                onChange={onChangeHandler}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mb-2">{errors.password}</p>
              )}

              <label htmlFor="confirmPassword" className="text-[16px]">
                Confirm Password
              </label>
              <br />
              <input
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className={`mt-[8px] border min-w-full h-[40px] pl-[16px] rounded-lg ${
                  errors.confirmPassword
                    ? 'border-red-500 mb-0'
                    : 'border-[#D9D9D9]'
                } mb-[32px]`}
                onChange={onChangeHandler}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.confirmPassword}
                </p>
              )}

              <div className="flex flex-col items-center w-full">
                <button
                  type="submit"
                  className="bg-black text-white py-[9px] w-full rounded-lg mb-[8px]"
                >
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

export default Page
