import { createServerClient } from '@/lib/supabase-server'
import SettingsForm from '@/components/SettingsForm'

export default async function SettingsPage() {
  const supabase = createServerClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  const { data: environments } = await supabase
    .from('environments')
    .select('*')
    .eq('is_active', true)

  const { data: centres } = await supabase
    .from('medical_centres')
    .select('*')
    .eq('is_active', true)
    .order('name')

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences</p>
      </div>

      {/* Settings Form - includes Profile Picture, Profile Info, Security, and Account Info */}
      <SettingsForm
        profile={profile}
        environments={environments || []}
        medicalCentres={centres || []}
      />
    </div>
  )
}
