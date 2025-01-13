import { OrganizationDetail } from '@/components/organizations/OrganizationDetail'

export default function OrganizationDetailPage({ params }: { params: { id: string } }) {
  return <OrganizationDetail id={params.id} />
}

