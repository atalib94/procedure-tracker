import { createServerClient } from '@/lib/supabase-server'
import NewProcedureForm from '@/components/NewProcedureForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function NewProcedurePage() {
  const supabase = createServerClient()
  
  // Fetch environments
  const { data: environments } = await supabase
    .from('environments')
    .select('*')
    .eq('is_active', true)

  // Fetch EBIR categories (assuming user selected EBIR environment)
  const { data: categories } = await supabase
    .from('ebir_categories')
    .select('*')
    .order('order_index')

  // Fetch medical centres
  const { data: centres } = await supabase
    .from('medical_centres')
    .select('*')
    .eq('is_active', true)
    .order('name')

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to procedures
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Log New Procedure</h1>
        <p className="text-gray-600 mt-1">Add details about your interventional procedure</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <NewProcedureForm
          environments={environments || []}
          categories={categories || []}
          medicalCentres={centres || []}
        />
      </div>
    </div>
  )
}
