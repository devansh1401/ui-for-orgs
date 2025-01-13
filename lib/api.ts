import { getMockOrganizations, getMockOrganization, createMockOrganization, updateMockOrganization, regenerateMockApiKey } from './mockApi'
import type { Organization } from './mockApi'

export async function fetchOrganizations(): Promise<Organization[]> {
  return getMockOrganizations()
}

export async function fetchOrganization(id: string): Promise<Organization | undefined> {
  return getMockOrganization(id)
}

export async function createOrganization(name: string): Promise<Organization> {
  return createMockOrganization(name)
}

export async function updateOrganization(id: string, data: Partial<Organization>): Promise<Organization> {
  return updateMockOrganization(id, data)
}

export async function regenerateApiKey(id: string): Promise<{ apiKey: string }> {
  return regenerateMockApiKey(id)
}

