'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useProgress } from '@/hooks/useProgress'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Download, Printer, Share2, Lock, Trophy, CheckCircle } from 'lucide-react'

interface CertificateData {
  certificate_number: string
  issued_at: string
}

function CertificatePreview({ name, date, certNumber }: { name: string; date: string; certNumber: string }) {
  return (
    <div id="certificate-preview" className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-double border-purple-200 p-8 sm:p-12 max-w-3xl mx-auto text-center relative">
      {/* Decorative borders */}
      <div className="absolute inset-3 border-2 border-amber-300/50 rounded-xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-20 h-20 border-r-0 border-b-0 border-4 border-purple-500 rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-20 h-20 border-l-0 border-b-0 border-4 border-purple-500 rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-r-0 border-t-0 border-4 border-purple-500 rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-l-0 border-t-0 border-4 border-purple-500 rounded-br-2xl" />

      <div className="relative z-10">
        {/* Logo / Brand */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <img src="/logo.png" alt="Bloom Girl Africa" className="w-14 h-14 rounded-full object-cover shadow-lg" />
          <div className="text-left">
            <div className="font-black text-purple-800 text-lg leading-tight">Bloom Girl Africa</div>
            <div className="text-xs text-gray-500">SDG Learning Platform</div>
          </div>
        </div>

        {/* Decorative line */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <span className="text-amber-400 text-lg">✦</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>

        <p className="text-gray-500 text-sm uppercase tracking-[0.2em] mb-2">Certificate of Completion</p>
        <p className="text-gray-600 text-sm mb-4">This is to certify that</p>

        <h2 className="text-3xl sm:text-4xl font-black text-purple-800 mb-4" style={{ fontFamily: 'Georgia, serif' }}>{name}</h2>

        <p className="text-gray-700 leading-relaxed max-w-md mx-auto mb-6 text-sm sm:text-base">
          has successfully completed the{' '}
          <strong className="text-purple-700">Bloom Girl Africa SDG Learning Program</strong>,
          demonstrating mastery of all{' '}
          <strong>17 United Nations Sustainable Development Goals</strong>{' '}
          and a commitment to empowering communities across Africa.
        </p>

        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <span className="text-amber-400 text-lg">✦</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 max-w-md mx-auto">
          <div>
            <div className="h-px bg-gray-300 mb-1" />
            <p className="text-xs text-gray-500">Completion Date</p>
            <p className="text-sm font-semibold text-gray-700">{date}</p>
          </div>
          <div>
            <div className="w-16 h-16 gradient-bloom rounded-full flex items-center justify-center mx-auto -mt-4 shadow-lg">
              <span className="text-2xl">🌸</span>
            </div>
          </div>
          <div>
            <div className="h-px bg-gray-300 mb-1" />
            <p className="text-xs text-gray-500">Certificate ID</p>
            <p className="text-sm font-semibold text-gray-700">{certNumber}</p>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-2">&ldquo;Empowering Girls Through Knowledge, Leadership, and the SDGs.&rdquo;</p>
      </div>
    </div>
  )
}

export default function CertificatePage() {
  const { profile } = useAuth()
  const { stats } = useProgress(profile?.id)
  const [certificate, setCertificate] = useState<CertificateData | null>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)

  const allComplete = stats.modules_completed === 17

  useEffect(() => {
    if (!profile) return
    const fetchCertificate = async () => {
      const supabase = createClient()
      const { data } = await supabase.from('certificates').select('*').eq('student_id', profile.id).single()
      if (data) setCertificate(data)
      setLoading(false)
    }
    fetchCertificate()
  }, [profile])

  const handleGenerate = async () => {
    if (!profile || !allComplete) return
    setGenerating(true)
    const supabase = createClient()
    const certNumber = `BGA-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    const { data, error } = await supabase.from('certificates')
      .insert({ student_id: profile.id, certificate_number: certNumber })
      .select()
      .single()
    if (data) setCertificate(data)
    setGenerating(false)
  }

  const handlePrint = () => window.print()

  const handleShare = async () => {
    if (!certificate || !profile) return
    const text = `I just completed the Bloom Girl Africa SDG Learning Program and earned my certificate! 🌸🎓 Certificate ID: ${certificate.certificate_number}`
    if (navigator.share) {
      await navigator.share({ title: 'My Bloom Girl Africa Certificate', text })
    } else {
      navigator.clipboard.writeText(text)
      alert('Share text copied to clipboard!')
    }
  }

  if (loading) return (
    <div className="p-8 text-center">
      <div className="w-10 h-10 gradient-bloom rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
        <Trophy size={20} className="text-white" />
      </div>
      <p className="text-gray-500 text-sm">Loading certificate...</p>
    </div>
  )

  const completionDate = certificate ? new Date(certificate.issued_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Certificate 🎓</h1>
        <p className="text-gray-600 mt-2">Complete all 17 SDG modules to earn your official certificate</p>
      </div>

      {!allComplete ? (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
          <Lock size={48} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-black text-gray-900 mb-2">Certificate Locked</h2>
          <p className="text-gray-600 mb-6">Complete all 17 SDG modules and pass their quizzes to unlock your certificate.</p>
          <div className="bg-purple-50 rounded-2xl p-4 max-w-sm mx-auto mb-6">
            <div className="text-2xl font-black text-purple-700">{stats.modules_completed}/17</div>
            <p className="text-sm text-gray-600">modules completed</p>
            <div className="w-full bg-purple-100 rounded-full h-2 mt-2">
              <div className="gradient-bloom h-2 rounded-full transition-all" style={{ width: `${stats.overall_percent}%` }} />
            </div>
          </div>
          <Link href="/modules" className="gradient-bloom text-white px-6 py-3 rounded-xl font-bold inline-block hover:opacity-90">
            Continue Learning
          </Link>
        </div>
      ) : (
        <div>
          {/* Congratulations Banner */}
          <div className="gradient-bloom rounded-2xl p-6 text-white text-center mb-8">
            <div className="text-4xl mb-2">🎉</div>
            <h2 className="text-2xl font-black mb-1">Congratulations, {profile?.full_name?.split(' ')[0]}!</h2>
            <p className="text-white/80">You have completed all 17 SDG modules. You are now a true Bloom Girl! 👑</p>
          </div>

          {!certificate ? (
            <div className="text-center mb-8">
              <button onClick={handleGenerate} disabled={generating}
                className="gradient-bloom text-white px-8 py-4 rounded-2xl font-bold text-lg hover:opacity-90 disabled:opacity-50 flex items-center gap-2 mx-auto">
                {generating ? 'Generating...' : <><Trophy size={20} /> Generate My Certificate</>}
              </button>
            </div>
          ) : (
            <>
              {/* Certificate Preview */}
              <CertificatePreview
                name={profile?.full_name || ''}
                date={completionDate}
                certNumber={certificate.certificate_number}
              />

              {/* Actions */}
              <div className="flex flex-wrap gap-3 mt-6 justify-center">
                <button onClick={handlePrint}
                  className="flex items-center gap-2 bg-white border-2 border-purple-200 text-purple-700 px-5 py-3 rounded-xl font-bold text-sm hover:bg-purple-50 transition-colors">
                  <Printer size={18} /> Print
                </button>
                <button onClick={handleShare}
                  className="flex items-center gap-2 bg-white border-2 border-pink-200 text-pink-700 px-5 py-3 rounded-xl font-bold text-sm hover:bg-pink-50 transition-colors">
                  <Share2 size={18} /> Share
                </button>
                <a href={`/api/certificate?id=${profile?.id}`} target="_blank"
                  className="flex items-center gap-2 gradient-bloom text-white px-5 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
                  <Download size={18} /> Download PDF
                </a>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">Certificate ID: <strong>{certificate.certificate_number}</strong></p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
