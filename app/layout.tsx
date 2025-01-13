import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { NavBar } from '@/components/NavBar'
import { SWRConfig } from 'swr'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Organization Dashboard',
  description: 'Manage your organizations with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SWRConfig 
          value={{
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
          }}
        >
          <div className="min-h-screen bg-white">
            <NavBar />
            <main className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </div>
          <Toaster />
        </SWRConfig>
      </body>
    </html>
  )
}



import './globals.css'