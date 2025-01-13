'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { createOrganization } from '@/lib/api'

interface CreateOrganizationModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: () => void
}

export function CreateOrganizationModal({ isOpen, onClose, onCreated }: CreateOrganizationModalProps) {
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const newOrg = await createOrganization(name)
      toast({
        title: 'Organization created',
        description: `${newOrg.name} has been successfully created.`,
      })
      onCreated()
      router.push(`/organizations/${newOrg.id}`)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create organization. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Organization</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Organization Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter organization name"
              maxLength={256}
            />
            <p className="text-sm text-gray-500">{name.length}/256</p>
          </div>
          <Button type="submit" className="w-full" disabled={!name || isLoading}>
            {isLoading ? 'Creating...' : 'Create Organization'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

