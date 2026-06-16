'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Loader2, CheckCircle, Mail } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const supabase = createClient()
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`
    })
    setLoading(false)
    if (resetError) { setError(resetError.message); return }
    setSent(true)
  }

  return (
    <div className="min-h-screen gradient-bloom-soft flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <img src="/logo.png" alt="Bloom Girl Africa" className="w-10 h-10 rounded-full object-cover" />
            <span className="font-bold text-purple-800 text-xl">Bloom Girl Africa</span>
          </Link>
          <h1 className="text-3xl font-black text-gray-900">Reset Password</h1>
          <p className="text-gray-600 mt-2">We&apos;ll send you a link to reset your password</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl">
          {sent ? (
            <div className="text-center py-4">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Sent!</h3>
              <p className="text-gray-600 mb-6 text-sm">Check your inbox at <strong>{email}</strong> for a password reset link.</p>
              <Link href="/login" className="gradient-bloom text-white px-6 py-3 rounded-xl font-bold text-sm inline-block hover:opacity-90">Back to Sign In</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-center w-14 h-14 bg-purple-100 rounded-2xl mx-auto mb-4">
                <Mail size={24} className="text-purple-600" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Email Address</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent" />
              </div>
              {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}
              <button type="submit" disabled={loading}
                className="w-full gradient-bloom text-white py-3.5 rounded-xl font-bold text-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : 'Send Reset Link'}
              </button>
            </form>
          )}
          <p className="text-center text-sm text-gray-500 mt-6">
            Remember your password?{' '}
            <Link href="/login" className="text-purple-600 font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
