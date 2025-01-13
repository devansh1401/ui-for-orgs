import useSWR from 'swr'
import { fetchOrganization } from '@/lib/api'
import type { Organization } from '@/lib/mockApi'

export function useOrganization(id: string) {
  const { data, error, isLoading, mutate } = useSWR<Organization>(`organization-${id}`, () => fetchOrganization(id))

  return {
    organization: data,
    isLoading,
    error,
    mutate
  }
}

