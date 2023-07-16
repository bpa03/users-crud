import './globals.css'
import {Inter} from 'next/font/google'

// Providers
import {Toaster} from '../components/ui/toaster'
import ThemeProvider from '../components/theme-provider'
import ReactQueryProvider from '../lib/react-query'

const inter = Inter({subsets: ['latin'], variable: '--font-inter'})

export const metadata = {
  title: 'Users crud',
  description:
    'This is a web page where you can create and update records from a list of users'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" enableSystem defaultTheme="dark">
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
