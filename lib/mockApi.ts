import { v4 as uuidv4 } from 'uuid'

export interface Organization {
  id: string
  name: string
  owner: string
  hasApiKey: boolean
  apiKey: string | null
  createdAt: string
  updatedAt: string
  employees: string[]
  actionConfigs: ActionConfig[]
}

export interface ActionConfig {
  name: string
  description: string
  inputConfigurations: InputConfiguration[]
}

export interface InputConfiguration {
  type: 'text' | 'select' | 'number'
  label: string
  required: boolean
  multiline?: boolean
  placeholder?: string
  options?: string[]
  defaultValue?: string | number
  min?: number
  max?: number
}

const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'Acme Corp',
    owner: 'john@acme.com',
    hasApiKey: true,
    apiKey: 'acme_api_key_123',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-06-01T14:30:00Z',
    employees: ['john@acme.com', 'jane@acme.com', 'bob@acme.com'],
    actionConfigs: [
      {
        name: 'Create Invoice',
        description: 'Generate a new invoice for a customer',
        inputConfigurations: [
          {
            type: 'text',
            label: 'Customer Name',
            required: true,
            placeholder: 'Enter customer name'
          },
          {
            type: 'number',
            label: 'Amount',
            required: true,
            min: 0,
            max: 1000000
          },
          {
            type: 'select',
            label: 'Currency',
            required: true,
            options: ['USD', 'EUR', 'GBP', 'JPY'],
            defaultValue: 'USD'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'TechStart',
    owner: 'sarah@techstart.com',
    hasApiKey: false,
    apiKey: null,
    createdAt: '2023-03-20T09:15:00Z',
    updatedAt: '2023-03-20T09:15:00Z',
    employees: ['sarah@techstart.com', 'mike@techstart.com'],
    actionConfigs: []
  },
  {
    id: '3',
    name: 'Global Innovations',
    owner: 'alex@globalinnovations.com',
    hasApiKey: true,
    apiKey: 'global_api_key_456',
    createdAt: '2022-11-05T16:45:00Z',
    updatedAt: '2023-05-12T11:20:00Z',
    employees: ['alex@globalinnovations.com', 'emma@globalinnovations.com', 'chris@globalinnovations.com', 'olivia@globalinnovations.com'],
    actionConfigs: [
      {
        name: 'Schedule Meeting',
        description: 'Set up a new meeting with team members',
        inputConfigurations: [
          {
            type: 'text',
            label: 'Meeting Title',
            required: true,
            placeholder: 'Enter meeting title'
          },
          {
            type: 'text',
            label: 'Date',
            required: true,
            placeholder: 'YYYY-MM-DD'
          },
          {
            type: 'text',
            label: 'Time',
            required: true,
            placeholder: 'HH:MM'
          },
          {
            type: 'text',
            label: 'Attendees',
            required: true,
            multiline: true,
            placeholder: 'Enter email addresses, one per line'
          }
        ]
      }
    ]
  }
]

export function getMockOrganizations(): Promise<Organization[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockOrganizations), 500)
  })
}

export function getMockOrganization(id: string): Promise<Organization | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockOrganizations.find(org => org.id === id)), 500)
  })
}

export function createMockOrganization(name: string): Promise<Organization> {
  return new Promise((resolve) => {
    const newOrg: Organization = {
      id: uuidv4(),
      name,
      owner: 'new@example.com',
      hasApiKey: false,
      apiKey: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      employees: ['new@example.com'],
      actionConfigs: []
    }
    mockOrganizations.push(newOrg)
    setTimeout(() => resolve(newOrg), 500)
  })
}

export function updateMockOrganization(id: string, data: Partial<Organization>): Promise<Organization> {
  return new Promise((resolve, reject) => {
    const index = mockOrganizations.findIndex(org => org.id === id)
    if (index === -1) {
      reject(new Error('Organization not found'))
    } else {
      mockOrganizations[index] = { ...mockOrganizations[index], ...data, updatedAt: new Date().toISOString() }
      setTimeout(() => resolve(mockOrganizations[index]), 500)
    }
  })
}

export function regenerateMockApiKey(id: string): Promise<{ apiKey: string }> {
  return new Promise((resolve, reject) => {
    const index = mockOrganizations.findIndex(org => org.id === id)
    if (index === -1) {
      reject(new Error('Organization not found'))
    } else {
      const newApiKey = `new_api_key_${Math.random().toString(36).substring(7)}`
      mockOrganizations[index] = { ...mockOrganizations[index], hasApiKey: true, apiKey: newApiKey, updatedAt: new Date().toISOString() }
      setTimeout(() => resolve({ apiKey: newApiKey }), 500)
    }
  })
}

