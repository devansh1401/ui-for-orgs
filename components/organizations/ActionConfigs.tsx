import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ActionConfig {
  name: string
  description: string
  inputConfigurations: {
    type: 'text' | 'select' | 'number'
    label: string
    required: boolean
    multiline?: boolean
    placeholder?: string
    options?: string[]
    defaultValue?: string | number
    min?: number
    max?: number
  }[]
}

interface ActionConfigsProps {
  actionConfigs: ActionConfig[]
}

export function ActionConfigs({ actionConfigs }: ActionConfigsProps) {
  const [expandedConfigs, setExpandedConfigs] = useState<string[]>([])

  const toggleConfig = (name: string) => {
    setExpandedConfigs(prev =>
      prev.includes(name)
        ? prev.filter(config => config !== name)
        : [...prev, name]
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Action Configurations</CardTitle>
      </CardHeader>
      <CardContent>
        {actionConfigs.map((config) => (
          <Card key={config.name} className="mb-4">
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <CardTitle className="text-lg">{config.name}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleConfig(config.name)}
              >
                {expandedConfigs.includes(config.name) ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CardHeader>
            {expandedConfigs.includes(config.name) && (
              <CardContent className="p-4">
                <p className="mb-4 text-sm text-gray-600">{config.description}</p>
                <h4 className="mb-2 font-semibold">Input Configurations:</h4>
                <ul className="space-y-4">
                  {config.inputConfigurations.map((input, index) => (
                    <li key={index} className="border-t pt-2">
                      <h5 className="font-medium">{input.label}</h5>
                      <p className="text-sm text-gray-600">Type: {input.type}</p>
                      <p className="text-sm text-gray-600">
                        Required: {input.required ? 'Yes' : 'No'}
                      </p>
                      {input.type === 'text' && input.multiline && (
                        <p className="text-sm text-gray-600">Multiline: Yes</p>
                      )}
                      {input.placeholder && (
                        <p className="text-sm text-gray-600">
                          Placeholder: {input.placeholder}
                        </p>
                      )}
                      {input.type === 'select' && input.options && (
                        <p className="text-sm text-gray-600">
                          Options: {input.options.join(', ')}
                        </p>
                      )}
                      {input.type === 'number' && (
                        <>
                          {input.min !== undefined && (
                            <p className="text-sm text-gray-600">Min: {input.min}</p>
                          )}
                          {input.max !== undefined && (
                            <p className="text-sm text-gray-600">Max: {input.max}</p>
                          )}
                        </>
                      )}
                      {input.defaultValue !== undefined && (
                        <p className="text-sm text-gray-600">
                          Default: {input.defaultValue}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            )}
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}

