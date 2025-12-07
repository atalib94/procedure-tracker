import { createServerClient } from '@/lib/supabase-server'
import DashboardClient from '@/components/DashboardClient'

export default async function DashboardPage() {
  const supabase = createServerClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) return null

  // Fetch user's profile to get selected environment
  const { data: profile } = await supabase
    .from('profiles')
    .select('selected_environment_id')
    .eq('id', session.user.id)
    .single()

  // Fetch procedures with related data (including archived)
  const { data: procedures } = await supabase
    .from('procedures')
    .select(`
      *,
      ebir_categories (id, name, code),
      medical_centres (id, name)
    `)
    .eq('user_id', session.user.id)
    .order('procedure_date', { ascending: false })
    .limit(100)

  // Fetch categories for the selected environment
  const { data: categories } = await supabase
    .from('ebir_categories')
    .select('id, name, code')
    .eq('environment_id', profile?.selected_environment_id)
    .order('order_index')

  // Fetch medical centres
  const { data: medicalCentres } = await supabase
    .from('medical_centres')
    .select('id, name')
    .eq('is_active', true)
    .order('name')

  // Fetch stats (only non-archived procedures)
  const { data: stats } = await supabase
    .from('procedures')
    .select('id, operator_role, medical_centre_id, ebir_category_id, archived')
    .eq('user_id', session.user.id)

  // Calculate stats excluding archived procedures
  const activeStats = stats?.filter(p => !p.archived) || []
  const totalProcedures = activeStats.length
  const asFirstOperator = activeStats.filter(p => p.operator_role === '1st Operator').length
  const medicalCentresCount = new Set(activeStats.map(p => p.medical_centre_id).filter(Boolean)).size
  const categoriesUsed = new Set(activeStats.map(p => p.ebir_category_id).filter(Boolean)).size

  return (
    <DashboardClient
      procedures={procedures || []}
      totalProcedures={totalProcedures}
      asFirstOperator={asFirstOperator}
      medicalCentres={medicalCentresCount}
      categoriesUsed={categoriesUsed}
      categories={categories || []}
      medicalCentresList={medicalCentres || []}
      environmentId={profile?.selected_environment_id || null}
    />
  )
}
