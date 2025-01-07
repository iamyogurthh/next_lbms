import Providers from '@/components/Providers'
import './globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastContainer theme="light" />
        <Providers>
          <div className="max-w-auto">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
