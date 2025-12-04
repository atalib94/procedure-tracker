import { createServerClient } from '@/lib/supabase-server'
import { redirect, notFound } from 'next/navigation'
import ProcedureDetailClient from '@/components/ProcedureDetailClient'

export default async function ProcedureDetailPage({ params }: { params: { id: string } }) {
  const supabase = createServerClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/')
  }

  // Fetch the procedure with related data
  const { data: procedure, error } = await supabase
    .from('procedures')
    .select(`
      *,
      ebir_categories (name, code),
      medical_centres (name, city, country)
    `)
    .eq('id', params.id)
    .eq('user_id', session.user.id)
    .single()

  if (error || !procedure) {
    notFound()
  }

  // Fetch linked documents
  const { data: linkedDocsData } = await supabase
    .from('procedure_documents')
    .select(`
      learning_material_id,
      learning_materials (
        id, title, description, file_url, file_size, category, created_at
      )
    `)
    .eq('procedure_id', params.id)

  const linkedDocuments = linkedDocsData?.map(link => link.learning_materials as any).filter(Boolean) || []

  // Fetch linked tools
  const { data: linkedToolsData } = await supabase
    .from('procedure_tools')
    .select(`
      id,
      tool_id,
      quantity,
      notes,
      tools (
        id, name, manufacturer, model_number, image_url,
        tool_categories (id, name)
      )
    `)
    .eq('procedure_id', params.id)

  // Transform the data to match expected interface (Supabase returns nested objects)
  const linkedTools = (linkedToolsData || []).map(item => {
    const tool = Array.isArray(item.tools) ? item.tools[0] : item.tools
    return {
      ...item,
      tools: tool ? {
        ...tool,
        tool_categories: Array.isArray(tool.tool_categories) ? tool.tool_categories[0] : tool.tool_categories
      } : null
    }
  })

  // Fetch categories and medical centres for edit modal
  const { data: categories } = await supabase
    .from('ebir_categories')
    .select('id, name')
    .order('order_index', { ascending: true })

  const { data: medicalCentres } = await supabase
    .from('medical_centres')
    .select('id, name')
    .eq('is_active', true)
    .order('name', { ascending: true })

  return (
    <ProcedureDetailClient
      procedure={procedure}
      linkedDocuments={linkedDocuments}
      linkedTools={linkedTools}
      categories={categories || []}
      medicalCentres={medicalCentres || []}
    />
  )
}
