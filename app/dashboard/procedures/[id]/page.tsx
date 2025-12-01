import { createServerClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import ProcedureCard from '@/components/ProcedureCard'
import StatsCards from '@/components/StatsCards'

export default async function DashboardPage() {
  const supabase = createServerClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/')
  }

  // Fetch user's procedures
  const { data: procedures } = await supabase
    .from('procedures')
    .select(`
      *,
      ebir_categories (name, code),
      medical_centres (name, city)
    `)
    .eq('user_id', session.user.id)
    .order('procedure_date', { ascending: false })

  // Fetch stats
  const { count: totalProcedures } = await supabase
    .from('procedures')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', session.user.id)

  const { count: firstOperator } = await supabase
    .from('procedures')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', session.user.id)
    .eq('operator_role', '1st Operator')

  const { count: categoriesUsed } = await supabase
    .from('procedures')
    .select('ebir_category_id', { count: 'exact', head: true })
    .eq('user_id', session.user.id)
    .not('ebir_category_id', 'is', null)

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Procedures</h1>
          <p className="text-gray-600 mt-1">Track and manage your interventional procedures</p>
        </div>
        <Link
          href="/dashboard/procedures/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span>New Procedure</span>
        </Link>
      </div>

      {/* Stats */}
      <StatsCards 
        totalProcedures={totalProcedures || 0}
        asFirstOperator={firstOperator || 0}
        categoriesUsed={categoriesUsed || 0}
      />

      {/* Procedures List */}
      {procedures && procedures.length > 0 ? (
        <div className="grid gap-4">
          {procedures.map((procedure) => (
            <ProcedureCard key={procedure.id} procedure={procedure} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No procedures yet</h3>
          <p className="text-gray-600 mb-4">Start tracking your procedures by adding your first one.</p>
          <Link
            href="/dashboard/procedures/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Procedure
          </Link>
        </div>
      )}
    </div>
  )
}
