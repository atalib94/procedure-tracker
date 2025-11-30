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

      {/* Profile Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
        <SettingsForm
          profile={profile}
          environments={environments || []}
          medicalCentres={centres || []}
        />
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Email</span>
            <span className="font-medium text-gray-900">{session.user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Account Created</span>
            <span className="font-medium text-gray-900">
              {new Date(session.user.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
