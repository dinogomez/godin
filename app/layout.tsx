import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'godin-core',
  description: 'godin-library-port',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en">
      <body>
      <Navbar></Navbar>

      {children}
      </body>
    </html>
  )
}
