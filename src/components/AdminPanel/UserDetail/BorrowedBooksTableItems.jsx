import React from 'react'
import Image from 'next/image'

const BorrowedBooksTableItems = () => {
  return (
    <tr className="border-b h-[80px]">
      <th
        scope="row"
        className="px-4 py-4 text-left font-normal max-w-[300px] align-middle"
      >
        <div className="flex gap-3 items-center">
          <div>
            <p className="font-bold text-wrap">Atomic Habits</p>
            <p className="font-normal whitespace-nowrap">James Clears</p>
            <p className="font-bold text-[12px] text-gray-600">Self help</p>
          </div>
        </div>
      </th>
      <td className="px-4 py-2 text-left align-middle font-bold">12/25/2024</td>
      <td className="px-4 py-2 text-left align-middle text-red-500 font-bold">
        12/30/2024
      </td>
      <td className="px-4 py-2 text-left align-middle font-bold ">
        <button className="text-white bg-[#009F30] px-[10px] py-[5px] font-bold text-[12px] shadow-custom3 active:shadow-none rounded-[10px]">
          Returned
        </button>
      </td>
      <td className="px-4 py-2 align-middle">
        <button>
          <Image
            src="/defaultIcons/delete.png"
            alt="delete"
            width={25}
            height={25}
          />
        </button>
      </td>
    </tr>
  )
}

export default BorrowedBooksTableItems
