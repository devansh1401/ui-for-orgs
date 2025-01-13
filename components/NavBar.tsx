import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function NavBar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-semibold">
          Organization Dashboard
        </Link>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/">Organizations</Link>
          </Button>
          <Button variant="ghost">Profile</Button>
          <Button variant="ghost">Logout</Button>
        </div>
      </div>
    </nav>
  )
}

