// app/dashboard/toolbox/page.tsx
// CREATE THIS NEW FILE

import { createServerClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import ToolboxClient from '@/components/ToolboxClient'

export default async function ToolboxPage() {
  const supabase = createServerClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/')
  }

  // Fetch tools with category info
  const { data: tools } = await supabase
    .from('tools')
    .select(`
      *,
      category:tool_categories(id, name, code, icon),
      procedure_tools(id)
    `)
    .eq('user_id', user.id)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  // Fetch tool categories
  const { data: categories } = await supabase
    .from('tool_categories')
    .select('*')
    .order('order_index', { ascending: true })

  // Transform tools to include linked count
  const toolsWithCount = (tools || []).map(tool => ({
    ...tool,
    linked_count: tool.procedure_tools?.length || 0
  }))

  return (
    <div className="space-y-6">
      <ToolboxClient 
        initialTools={toolsWithCount} 
        categories={categories || []}
        userId={user.id}
      />
    </div>
  )
}
