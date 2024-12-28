import Sidebar from '@/components/AdminPanel/Sidebar'
import { ToastContainer } from 'react-toastify'

export const metadata = {
  title: 'Admin Pannel',
  description: 'Admin Pannel For LBMS',
}

export default function RootLayout({ children }) {
  return (
    <>
      <ToastContainer theme="light" />
      <div className="flex ">
        <Sidebar />
        <div className="flex-1 ml-[396px] p-8">{children}</div>
      </div>
    </>
  )
}
