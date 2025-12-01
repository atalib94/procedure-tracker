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
      subtitle: `${totalProcedures > 0 ? Math.round((asFirstOperator / totalProcedures) * 100) : 0}%`,
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
      subtitle: 'of 14',
      icon: Activity,
      color: 'bg-orange-500',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.name} className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-0 sm:flex-col sm:items-start">
              <div className={`w-8 h-8 sm:w-12 sm:h-12 ${stat.color} rounded-lg flex items-center justify-center flex-shrink-0 sm:mb-4`}>
                <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600 truncate">{stat.name}</div>
                {stat.subtitle && (
                  <div className="text-xs text-gray-500 hidden sm:block">{stat.subtitle}</div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
