'use client'

import { useState } from 'react'
import { useOrganization } from '@/hooks/useOrganization'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/use-toast'
import { updateOrganization, regenerateApiKey } from '@/lib/api'
import { ActionConfigs } from './ActionConfigs'
import { EmployeesList } from './EmployeesList'

interface OrganizationDetailProps {
  id: string
}

export function OrganizationDetail({ id }: OrganizationDetailProps) {
  const { organization, isLoading, error, mutate } = useOrganization(id)
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState('')
  const { toast } = useToast()

  if (isLoading) {
    return <OrganizationDetailSkeleton />
  }

  if (error || !organization) {
    return <div>Error loading organization details. Please try again.</div>
  }

  const handleNameUpdate = async () => {
    try {
      await updateOrganization(id, { name: newName })
      mutate()
      setIsEditing(false)
      toast({
        title: 'Organization updated',
        description: 'The organization name has been updated successfully.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update organization name. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleRegenerateApiKey = async () => {
    if (confirm('Are you sure you want to regenerate the API key? This action cannot be undone.')) {
      try {
        await regenerateApiKey(id)
        mutate()
        toast({
          title: 'API Key Regenerated',
          description: 'A new API key has been generated for this organization.',
        })
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to regenerate API key. Please try again.',
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="max-w-xs"
                />
                <Button onClick={handleNameUpdate}>Save</Button>
                <Button variant="ghost" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold">{organization.name}</h2>
                <Button variant="ghost" onClick={() => {
                  setNewName(organization.name)
                  setIsEditing(true)
                }}>
                  Edit
                </Button>
              </>
            )}
          </div>
          <p className="text-sm text-gray-500">
            Created on: {new Date(organization.createdAt).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            Last updated: {new Date(organization.updatedAt).toLocaleString()}
          </p>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Owner:</span>
            <span>{organization.owner}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Key Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="api-key">API Key:</Label>
            <Input
              id="api-key"
              value={organization.apiKey ? '••••••••••••••••' : 'No API Key'}
              readOnly
              className="font-mono text-sm"
            />
            <Button variant="outline" onClick={() => {/* Implement copy functionality */}}>
              Copy
            </Button>
          </div>
          <Button onClick={handleRegenerateApiKey}>Generate New Key</Button>
          <p className="text-sm text-red-500">
            Warning: Generating a new key will invalidate the existing key.
          </p>
        </CardContent>
      </Card>

      <EmployeesList employees={organization.employees} />

      <ActionConfigs actionConfigs={organization.actionConfigs} />
    </div>
  )
}

function OrganizationDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/5" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Key Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-1/4" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Action Configurations</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-40 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}

