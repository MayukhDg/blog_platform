import './globals.css'
import { Montserrat } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Provider from '@/components/Providers';


const inter = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Blogger',
  description: 'A next level blogging app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="{inter.className} create-post__gradient">
        <Provider>
        <Navbar/>
        <main>
          {children}
        </main>
        </Provider>
        </body>
    </html>
  )
}
