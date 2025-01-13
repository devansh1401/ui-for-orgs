import useSWR from 'swr'
import { fetchOrganizations } from '@/lib/api'
import type { Organization } from '@/lib/mockApi'

export function useOrganizations() {
  const { data, error, isLoading, mutate } = useSWR<Organization[]>('organizations', fetchOrganizations)

  return {
    organizations: data,
    isLoading,
    error,
    mutate
  }
}

