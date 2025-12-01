import { createServerClient } from '@/lib/supabase-server'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import ProcedureCard from '@/components/ProcedureCard'
import StatsCards from '@/components/StatsCards'

export default async function DashboardPage() {
  const supabase = createServerClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) return null

  // Fetch procedures with related data
  const { data: procedures } = await supabase
    .from('procedures')
    .select(`
      *,
      ebir_categories (name, code),
      medical_centres (name)
    `)
    .eq('user_id', session.user.id)
    .order('procedure_date', { ascending: false })
    .limit(50)

  // Fetch stats
  const { data: stats } = await supabase
    .from('procedures')
    .select('id, operator_role, medical_centre_id, ebir_category_id')
    .eq('user_id', session.user.id)

  const totalProcedures = stats?.length || 0
  const asFirstOperator = stats?.filter(p => p.operator_role === '1st Operator').length || 0
  const medicalCentres = new Set(stats?.map(p => p.medical_centre_id).filter(Boolean)).size
  const categoriesUsed = new Set(stats?.map(p => p.ebir_category_id).filter(Boolean)).size

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">IR Procedure Log</h1>
          <p className="text-gray-600 mt-1">Track your interventional radiology procedures</p>
        </div>
        <Link
          href="/dashboard/procedures/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Log Procedure
        </Link>
      </div>

      {/* Stats */}
      <StatsCards
        totalProcedures={totalProcedures}
        asFirstOperator={asFirstOperator}
        medicalCentres={medicalCentres}
        categoriesUsed={categoriesUsed}
      />

      {/* Procedures List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Procedures</h2>
            <div className="flex gap-2">
              <input
                type="search"
                placeholder="Search procedures..."
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {procedures && procedures.length > 0 ? (
            procedures.map((procedure) => (
              <ProcedureCard key={procedure.id} procedure={procedure} />
            ))
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No procedures yet</h3>
              <p className="text-gray-600 mb-6">Get started by logging your first procedure</p>
              <Link
                href="/dashboard/procedures/new"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Log Your First Procedure
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
