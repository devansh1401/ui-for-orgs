import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TableCell, TableRow } from '@/components/ui/table'
import type { Organization } from '@/lib/mockApi'

interface OrganizationRowProps {
  organization: Organization
}

export function OrganizationRow({ organization }: OrganizationRowProps) {
  const router = useRouter()

  const handleRowClick = () => {
    router.push(`/organizations/${organization.id}`)
  }

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent row click when clicking on the action menu
  }

  return (
    <TableRow
      onClick={handleRowClick}
      className="cursor-pointer hover:bg-muted/50"
    >
      <TableCell className="font-medium">{organization.name}</TableCell>
      <TableCell>{organization.owner}</TableCell>
      <TableCell>
        <span
          className={`inline-block h-2 w-2 rounded-full ${
            organization.hasApiKey ? 'bg-green-500' : 'bg-gray-300'
          }`}
        />
      </TableCell>
      <TableCell className="font-mono text-xs">
        {format(new Date(organization.createdAt), 'yyyy-MM-dd HH:mm')}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={handleActionClick}>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                router.push(`/organizations/${organization.id}`)
              }}
            >
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                // Implement delete functionality
                console.log('Delete organization:', organization.id)
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

