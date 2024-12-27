'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector('.search-form')
    if (form) {
      form.reset()
    }
  }
  return (
    <button type="reset" onClick={reset}>
      <Link href="/">
        <Image src={'/defaultIcons/close.png'} width={34} height={34} alt="x" />
      </Link>
    </button>
  )
}

export default SearchFormReset
