import { OrganizationsList } from '@/components/organizations/OrganizationsList'

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Organizations</h1>
      <OrganizationsList />
    </div>
  )
}

