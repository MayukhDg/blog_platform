import './globals.css'
import { Roboto } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Provider from '@/components/Providers';


const roboto = Roboto({ 
  subsets: ['latin'],
  weight:["100", "300", "400", "500", "700", "900"],
  variable: '--font-roboto',  

})

export const metadata = {
  title: 'Blogger',
  description: 'A next level blogging app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
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
