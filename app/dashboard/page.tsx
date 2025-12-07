import { createServerClient } from '@/lib/supabase-server'
import DashboardClient from '@/components/DashboardClient'

export default async function DashboardPage() {
  const supabase = createServerClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) return null

  // Fetch procedures with related data (including archived)
  const { data: procedures } = await supabase
    .from('procedures')
    .select(`
      *,
      ebir_categories (name, code),
      medical_centres (name)
    `)
    .eq('user_id', session.user.id)
    .order('procedure_date', { ascending: false })
    .limit(100)

  // Fetch stats (only non-archived procedures)
  const { data: stats } = await supabase
    .from('procedures')
    .select('id, operator_role, medical_centre_id, ebir_category_id, archived')
    .eq('user_id', session.user.id)

  // Calculate stats excluding archived procedures
  const activeStats = stats?.filter(p => !p.archived) || []
  const totalProcedures = activeStats.length
  const asFirstOperator = activeStats.filter(p => p.operator_role === '1st Operator').length
  const medicalCentres = new Set(activeStats.map(p => p.medical_centre_id).filter(Boolean)).size
  const categoriesUsed = new Set(activeStats.map(p => p.ebir_category_id).filter(Boolean)).size

  return (
    <DashboardClient
      procedures={procedures || []}
      totalProcedures={totalProcedures}
      asFirstOperator={asFirstOperator}
      medicalCentres={medicalCentres}
      categoriesUsed={categoriesUsed}
    />
  )
}
