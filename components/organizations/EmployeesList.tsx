import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface EmployeesListProps {
  employees: string[]
}

export function EmployeesList({ employees }: EmployeesListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employees</CardTitle>
      </CardHeader>
      <CardContent>
        {employees.length === 0 ? (
          <p className="text-sm text-gray-500">No employees added yet.</p>
        ) : (
          <ul className="space-y-2">
            {employees.map((email, index) => (
              <li key={index} className="text-sm">
                {email}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

