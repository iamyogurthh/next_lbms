'use client'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
function DeleteBorrowRecordBtn({ borrowRecordId, email }) {

    const router = useRouter();

    const handleDelete = async () => {
        const res = await fetch(`http://localhost:3000/api/users/${email}/borrowBooks`,
            {
                headers: {
                    'Content-Type': "application/json"
                },
                method: 'DELETE',
                body: JSON.stringify({ borrowRecordId: borrowRecordId })
            })
        if (res.ok) {
            toast('Deleted Successfully')
            window.location.reload()
        } else {
            const data = await res.json();
            toast(data.message)
        }
    }

    return (
        <>
            <button onClick={handleDelete}>
                {console.log("I am rendering")}
                <Image
                    src="/defaultIcons/delete.png"
                    alt="delete"
                    width={25}
                    height={25}
                />
            </button>
        </>
    )
}

export default DeleteBorrowRecordBtn