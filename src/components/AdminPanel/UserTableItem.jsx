import React from 'react'
import Image from 'next/image'

const UserTableItem = ({ name, isAdmin }) => {
  return (
    <tr className="border-b border-white">
      <th scope="row" className="items-center gap-3 py-[8px] px-3 flex">
        <Image src={`/user.png`} alt="user" width={40} height={40} />
        <p className="font-normal whitespace-nowrap">{name}</p>
      </th>
      <td>22/7/2024</td>
      <td>{String(isAdmin)}</td>
      <td>
        <button>
          <Image src={'/delete.png'} alt="delete" width={24} height={24} />
        </button>
      </td>
    </tr>
  )
}

export default UserTableItem
