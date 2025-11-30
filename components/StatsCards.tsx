import { ClipboardList, User, Building2, Activity } from 'lucide-react'

interface StatsCardsProps {
  totalProcedures: number
  asFirstOperator: number
  medicalCentres: number
  categoriesUsed: number
}

export default function StatsCards({
  totalProcedures,
  asFirstOperator,
  medicalCentres,
  categoriesUsed,
}: StatsCardsProps) {
  const stats = [
    {
      name: 'Total Procedures',
      value: totalProcedures,
      icon: ClipboardList,
      color: 'bg-blue-500',
    },
    {
      name: 'As 1st Operator',
      value: asFirstOperator,
      subtitle: `${totalProcedures > 0 ? Math.round((asFirstOperator / totalProcedures) * 100) : 0}% of total`,
      icon: User,
      color: 'bg-green-500',
    },
    {
      name: 'Medical Centres',
      value: medicalCentres,
      icon: Building2,
      color: 'bg-purple-500',
    },
    {
      name: 'EBIR Categories',
      value: categoriesUsed,
      subtitle: 'of 14 categories',
      icon: Activity,
      color: 'bg-orange-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.name}</div>
            {stat.subtitle && (
              <div className="text-xs text-gray-500 mt-1">{stat.subtitle}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}
