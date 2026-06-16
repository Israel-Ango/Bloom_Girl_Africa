'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useProgress } from '@/hooks/useProgress'
import { createClient } from '@/lib/supabase/client'
import { Loader2, CheckCircle, User, Globe, Phone, Calendar, Mail } from 'lucide-react'

const AFRICAN_COUNTRIES = [
  'Algeria','Angola','Benin','Botswana','Burkina Faso','Burundi','Cameroon','Cape Verde',
  'Chad','Egypt','Ethiopia','Ghana','Guinea','Kenya','Liberia','Libya','Madagascar','Malawi',
  'Mali','Morocco','Mozambique','Namibia','Niger','Nigeria','Rwanda','Senegal','Sierra Leone',
  'Somalia','South Africa','South Sudan','Sudan','Tanzania','Togo','Tunisia','Uganda','Zambia','Zimbabwe','Other'
]

export default function ProfilePage() {
  const { profile } = useAuth()
  const { stats } = useProgress(profile?.id)
  const [form, setForm] = useState({ full_name: '', phone: '', country: '' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (profile) {
      setForm({ full_name: profile.full_name || '', phone: profile.phone || '', country: profile.country || '' })
    }
  }, [profile])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from('profiles').update({ full_name: form.full_name, phone: form.phone, country: form.country }).eq('id', profile.id)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-2">Manage your account details</p>
      </div>

      {/* Avatar Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full gradient-bloom flex items-center justify-center text-white font-black text-2xl flex-shrink-0">
          {profile?.full_name?.charAt(0).toUpperCase() || '?'}
        </div>
        <div>
          <h2 className="text-xl font-black text-gray-900">{profile?.full_name}</h2>
          <p className="text-gray-500 text-sm">{profile?.email}</p>
          <div className="flex gap-3 mt-2 text-sm">
            <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold text-xs">
              🌍 {profile?.country || 'Africa'}
            </span>
            <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-semibold text-xs">
              🎓 Student
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Modules Done', value: `${stats.modules_completed}/17` },
          { label: 'Progress', value: `${stats.overall_percent}%` },
          { label: 'Badges', value: stats.badges_earned },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-xl font-black text-gray-900">{value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Edit Form */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-5">Edit Profile</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1 flex items-center gap-2">
              <User size={14} /> Full Name
            </label>
            <input value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1 flex items-center gap-2">
              <Mail size={14} /> Email Address
            </label>
            <input value={profile?.email || ''} disabled
              className="w-full border border-gray-100 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-400 cursor-not-allowed" />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1 flex items-center gap-2">
              <Phone size={14} /> Phone Number
            </label>
            <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} type="tel"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1 flex items-center gap-2">
              <Globe size={14} /> Country
            </label>
            <select value={form.country} onChange={e => setForm({ ...form, country: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white">
              <option value="">Select country</option>
              {AFRICAN_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1 flex items-center gap-2">
              <Calendar size={14} /> Age
            </label>
            <input value={profile?.age || ''} disabled
              className="w-full border border-gray-100 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-400 cursor-not-allowed" />
          </div>

          <button type="submit" disabled={saving}
            className="w-full gradient-bloom text-white py-3.5 rounded-xl font-bold text-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
            {saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : saved ? <><CheckCircle size={16} /> Saved!</> : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}
