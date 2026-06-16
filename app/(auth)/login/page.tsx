'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
    setLoading(false)
    if (signInError) { setError(signInError.message); return }
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
      router.push(profile?.role === 'admin' ? '/admin/dashboard' : '/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#FBF5F2' }}>
      {/* Decorative blobs */}
      <div className="fixed top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-30" style={{ background: 'radial-gradient(circle, #B4D9C8 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="fixed bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle, #FCE08A 0%, transparent 70%)', filter: 'blur(50px)' }} />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-5">
            <img src="/logo.png" alt="Bloom Girl Africa" className="w-12 h-12 rounded-xl object-contain" style={{ background: '#F9E8E4', padding: '2px' }} />
            <span className="font-bold text-xl" style={{ color: '#1A0C08' }}>Bloom Girl Africa</span>
          </Link>
          <h1 className="text-3xl font-black" style={{ color: '#1A0C08' }}>Welcome Back! 🌸</h1>
          <p className="mt-2 text-sm" style={{ color: '#7A5848' }}>Sign in to continue your learning journey</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl p-8 shadow-lg border bg-white" style={{ borderColor: '#EBD8D0' }}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider block mb-2" style={{ color: '#2D6A4F' }}>Email Address</label>
              <input type="email" required value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full rounded-xl px-4 py-3 text-sm border focus:outline-none focus:ring-2 transition-shadow"
                style={{ borderColor: '#EBD8D0', background: '#FAFAFA', color: '#1A0C08', '--tw-ring-color': '#B4D9C8' } as React.CSSProperties} />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-wider block mb-2" style={{ color: '#2D6A4F' }}>Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} required
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="Your password"
                  className="w-full rounded-xl px-4 py-3 text-sm border focus:outline-none focus:ring-2 transition-shadow pr-11"
                  style={{ borderColor: '#EBD8D0', background: '#FAFAFA', color: '#1A0C08', '--tw-ring-color': '#B4D9C8' } as React.CSSProperties} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 transition-colors"
                  style={{ color: '#A88878' }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="text-right mt-2">
                <Link href="/forgot-password" className="text-xs font-semibold hover:underline" style={{ color: '#2D6A4F' }}>Forgot password?</Link>
              </div>
            </div>

            {error && (
              <div className="rounded-xl px-4 py-3 text-sm border" style={{ background: '#FDF0EC', borderColor: '#F5C0B0', color: '#A83838' }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full gradient-bloom py-3.5 rounded-xl font-bold text-sm text-white hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg mt-2">
              {loading ? <><Loader2 size={18} className="animate-spin" /> Signing In...</> : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t text-center" style={{ borderColor: '#EBD8D0' }}>
            <p className="text-sm" style={{ color: '#7A5848' }}>
              New to Bloom Girl Africa?{' '}
              <Link href="/signup" className="font-bold hover:underline" style={{ color: '#2D6A4F' }}>Create Free Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
