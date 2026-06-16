'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react'

const AFRICAN_COUNTRIES = [
  'Algeria','Angola','Benin','Botswana','Burkina Faso','Burundi','Cameroon','Cape Verde',
  'Central African Republic','Chad','Comoros','DR Congo','Republic of Congo','Djibouti',
  'Egypt','Equatorial Guinea','Eritrea','Eswatini','Ethiopia','Gabon','Gambia','Ghana',
  'Guinea','Guinea-Bissau','Ivory Coast','Kenya','Lesotho','Liberia','Libya','Madagascar',
  'Malawi','Mali','Mauritania','Mauritius','Morocco','Mozambique','Namibia','Niger',
  'Nigeria','Rwanda','São Tomé and Príncipe','Senegal','Seychelles','Sierra Leone','Somalia',
  'South Africa','South Sudan','Sudan','Tanzania','Togo','Tunisia','Uganda','Zambia','Zimbabwe',
  'Other'
]

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', country: '', age: '', password: '', confirm_password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm_password) { setError('Passwords do not match.'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (Number(form.age) < 10 || Number(form.age) > 25) { setError('Age must be between 10 and 25.'); return }

    setLoading(true)
    const supabase = createClient()
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.full_name,
          phone: form.phone,
          country: form.country,
          age: Number(form.age),
        }
      }
    })

    if (signUpError) { setLoading(false); setError(signUpError.message); return }

    // If email confirmation is disabled, session is returned immediately — auto-login
    if (signUpData.session) {
      router.push('/dashboard')
      return
    }

    // Email confirmation is enabled — sign in directly (works if confirm email is OFF in Supabase)
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    setLoading(false)
    if (signInError) {
      // Email confirmation still required — show message
      setSuccess(true)
      return
    }
    router.push('/dashboard')
  }

  if (success) {
    return (
      <div className="min-h-screen gradient-bloom-soft flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-xl">
          <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-gray-900 mb-3">Almost there! 🌸</h2>
          <p className="text-gray-600 mb-6">We sent a verification link to <strong>{form.email}</strong>. Click it to activate your account and start learning!</p>
          <Link href="/login" className="gradient-bloom text-white px-6 py-3 rounded-xl font-bold inline-block hover:opacity-90 transition-opacity">Go to Sign In</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bloom-soft flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <img src="/logo.png" alt="Bloom Girl Africa" className="w-10 h-10 rounded-full object-cover" />
            <span className="font-bold text-purple-800 text-xl">Bloom Girl Africa</span>
          </Link>
          <h1 className="text-3xl font-black text-gray-900">Create Your Account</h1>
          <p className="text-gray-600 mt-2">Join thousands of African girls learning about the SDGs</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Full Name *</label>
                <input name="full_name" required value={form.full_name} onChange={handleChange} placeholder="Your full name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Age *</label>
                <input name="age" type="number" required value={form.age} onChange={handleChange} placeholder="e.g. 15" min="10" max="25"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent" />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Email Address *</label>
              <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Phone Number</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+234..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Country *</label>
                <select name="country" required value={form.country} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white">
                  <option value="">Select country</option>
                  {AFRICAN_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Password *</label>
              <div className="relative">
                <input name="password" type={showPassword ? 'text' : 'password'} required value={form.password} onChange={handleChange} placeholder="At least 8 characters"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent pr-11" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Confirm Password *</label>
              <input name="confirm_password" type="password" required value={form.confirm_password} onChange={handleChange} placeholder="Repeat your password"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent" />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>
            )}

            <button type="submit" disabled={loading}
              className="w-full gradient-bloom text-white py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 mt-2">
              {loading ? <><Loader2 size={18} className="animate-spin" /> Creating Account...</> : '🌸 Create My Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-purple-600 font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
