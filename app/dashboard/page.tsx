import { createServerClient } from '@/lib/supabase-server'
import DashboardClient from '@/components/DashboardClient'

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
    <DashboardClient
      procedures={procedures || []}
      totalProcedures={totalProcedures}
      asFirstOperator={asFirstOperator}
      medicalCentres={medicalCentres}
      categoriesUsed={categoriesUsed}
    />
  )
}
