import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const UserTableItem = ({ name, isAdmin, userId }) => {
  return (
    <tr className="border-b border-white">
      <th scope="row" className=" py-[8px] px-3 ">
        <Link
          href={`/adminPanel/users/${userId}`}
          className="flex items-center gap-3"
        >
          <Image
            src={`/defaultIcons/user.png`}
            alt="user"
            width={40}
            height={40}
          />
          <p className="font-normal whitespace-nowrap">{name}</p>
        </Link>
      </th>
      <td>22/7/2024</td>
      <td>{String(isAdmin)}</td>
      <td>
        <button>
          <Image
            src={'/defaultIcons/delete.png'}
            alt="delete"
            width={24}
            height={24}
          />
        </button>
      </td>
    </tr>
  )
}

export default UserTableItem
