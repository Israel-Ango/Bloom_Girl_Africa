'use client'
import Link from 'next/link'
import { SDG_MODULES } from '@/lib/data/sdg-modules'
import { BookOpen, Award, Star, ChevronRight, Globe, Heart, Lightbulb, Users } from 'lucide-react'

const QUOTES = [
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "When girls are educated, their countries become stronger and more prosperous.", author: "Michelle Obama" },
  { text: "I raise up my voice—not so I can shout, but so that those without a voice can be heard.", author: "Malala Yousafzai" },
]

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1658252844173-ba5de80a3015?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1664777686636-2cd1e9cac959?w=600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1660735148170-223b66e9f941?w=600&auto=format&fit=crop&q=80",
]

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: '#FBF5F2' }}>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b shadow-sm" style={{ background: '#F9E8E4', borderColor: '#E5C8BE' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Bloom Girl Africa" className="h-14 w-auto rounded-lg object-contain" style={{ background: '#F9E8E4' }} />
            <span className="font-black text-base leading-tight hidden sm:block" style={{ color: '#1A0C08' }}>Bloom Girl<br /><span style={{ color: '#2D6A4F' }}>Africa</span></span>
          </div>
          <div className="flex gap-3">
            <Link href="/login" className="font-semibold px-4 py-2 rounded-lg transition-colors text-sm hover:bg-green-50" style={{ color: '#2D6A4F' }}>
              Sign In
            </Link>
            <Link href="/signup" className="gradient-bloom text-white px-5 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity shadow-md">
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 pt-8 pb-0">

            {/* Left — text */}
            <div className="flex-1 text-center lg:text-left pb-10 lg:pb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 border"
                style={{ background: '#F0F7F4', borderColor: '#B4D9C8', color: '#2D6A4F' }}>
                <Star size={13} className="fill-current" style={{ color: '#C9A540' }} />
                Free for all African girls
              </div>

              <h1 className="text-5xl sm:text-6xl font-black leading-tight mb-5" style={{ color: '#1A0C08' }}>
                Learn. Lead.<br />
                <span className="text-shimmer">Bloom.</span>
              </h1>

              <p className="text-lg font-semibold mb-3" style={{ color: '#2D6A4F' }}>
                Empowering African Girls Through the 17 SDGs
              </p>
              <p className="text-base leading-relaxed mb-8 max-w-lg" style={{ color: '#7A5848' }}>
                Discover all 17 United Nations Sustainable Development Goals through interactive lessons,
                inspiring African stories, quizzes, and earn your official certificate.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link href="/signup" className="gradient-bloom text-white px-7 py-3.5 rounded-2xl font-bold text-base hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2">
                  Start Learning Free <ChevronRight size={18} />
                </Link>
                <Link href="#how-it-works" className="px-7 py-3.5 rounded-2xl font-bold text-base transition-colors flex items-center justify-center gap-2 border-2"
                  style={{ borderColor: '#2D6A4F', color: '#2D6A4F', background: 'white' }}>
                  How It Works
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 mt-8 justify-center lg:justify-start text-sm" style={{ color: '#7A5848' }}>
                <div className="flex items-center gap-1.5"><BookOpen size={14} style={{ color: '#2D6A4F' }} /> 17 Modules</div>
                <div className="flex items-center gap-1.5"><Award size={14} style={{ color: '#C9A540' }} /> Free Certificate</div>
                <div className="flex items-center gap-1.5"><Globe size={14} style={{ color: '#2D6A4F' }} /> Pan-African</div>
                <div className="flex items-center gap-1.5"><Heart size={14} style={{ color: '#C85048' }} /> Girl-Centered</div>
              </div>
            </div>

            {/* Right — photo collage */}
            <div className="flex-1 w-full relative hidden lg:flex items-end justify-center gap-3 h-[520px]">
              {/* Main large photo */}
              <div className="w-64 h-[480px] rounded-3xl overflow-hidden shadow-2xl relative mt-auto" style={{ border: '4px solid white' }}>
                <img src={HERO_IMAGES[0]} alt="African girl learning" className="w-full h-full object-cover" />
                {/* Gold badge */}
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl p-3 shadow-lg" style={{ background: 'white' }}>
                  <div className="text-xs font-bold" style={{ color: '#2D6A4F' }}>🌱 SDG Champion</div>
                  <div className="text-xs" style={{ color: '#7A5848' }}>17 modules completed</div>
                </div>
              </div>
              {/* Second photo */}
              <div className="w-52 h-[380px] rounded-3xl overflow-hidden shadow-xl mb-8" style={{ border: '4px solid white' }}>
                <img src={HERO_IMAGES[1]} alt="African girls studying" className="w-full h-full object-cover" />
              </div>
              {/* Third small */}
              <div className="w-44 h-[280px] rounded-3xl overflow-hidden shadow-lg mb-16" style={{ border: '4px solid white' }}>
                <img src={HERO_IMAGES[2]} alt="African teenage girl smiling" className="w-full h-full object-cover" />
              </div>
              {/* Decorative blobs */}
              <div className="absolute -z-10 top-8 right-0 w-72 h-72 rounded-full opacity-40" style={{ background: 'radial-gradient(circle, #B4D9C8 0%, transparent 70%)' }} />
              <div className="absolute -z-10 bottom-0 left-0 w-48 h-48 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, #FCE08A 0%, transparent 70%)' }} />
            </div>

            {/* Mobile hero image */}
            <div className="lg:hidden w-full max-w-sm mx-auto">
              <div className="rounded-3xl overflow-hidden shadow-xl" style={{ border: '4px solid white', height: '280px' }}>
                <img src={HERO_IMAGES[0]} alt="African girl learning" className="w-full h-full object-cover object-top" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-0 py-6 border-t border-b" style={{ background: 'white', borderColor: '#EBD8D0' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { value: '17', label: 'SDG Modules', icon: '📚' },
                { value: '170+', label: 'Quiz Questions', icon: '🎯' },
                { value: '7', label: 'Badges to Earn', icon: '🏅' },
                { value: '1', label: 'Certificate', icon: '🎓' },
              ].map(({ value, label, icon }) => (
                <div key={label} className="flex items-center justify-center gap-3">
                  <span className="text-2xl">{icon}</span>
                  <div className="text-left">
                    <div className="text-xl font-black" style={{ color: '#1A0C08' }}>{value}</div>
                    <div className="text-xs" style={{ color: '#7A5848' }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#F0F7F4' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: '#1A0C08' }}>How It Works</h2>
            <p style={{ color: '#7A5848' }}>Three steps to become a Bloom Girl SDG Champion</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Sign Up Free', desc: 'Create your account in 2 minutes. No credit card — free for all African girls.', icon: Users },
              { step: '02', title: 'Learn & Quiz', desc: 'Work through all 17 SDG modules. Each has inspiring stories and a quiz. Score 70% to unlock the next.', icon: BookOpen },
              { step: '03', title: 'Earn Certificate', desc: 'Complete all 17 modules and receive a professional downloadable certificate.', icon: Award },
            ].map(({ step, title, desc, icon: Icon }) => (
              <div key={step} className="bg-white rounded-3xl p-8 text-center card-hover border" style={{ borderColor: '#EBD8D0' }}>
                <div className="w-14 h-14 rounded-2xl gradient-bloom flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Icon size={24} className="text-white" />
                </div>
                <div className="text-5xl font-black mb-2" style={{ color: '#EBD8D0' }}>{step}</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#1A0C08' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#7A5848' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial strip with photos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: '#1A0C08' }}>Girls Just Like You</h2>
            <p style={{ color: '#7A5848' }}>Learning, growing and leading across Africa</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { img: "https://images.unsplash.com/photo-1664777686636-2cd1e9cac959?w=500&auto=format&fit=crop&q=80", name: "Amara, Ghana", quote: "I never knew I could understand global issues — this platform made it so easy and fun!" },
              { img: "https://images.unsplash.com/photo-1660735148170-223b66e9f941?w=500&auto=format&fit=crop&q=80", name: "Fatima, Nigeria", quote: "Completing all 17 modules gave me confidence to speak about climate change at my school." },
              { img: "https://images.unsplash.com/photo-1695131497312-840df5e15e5b?w=500&auto=format&fit=crop&q=80", name: "Zara, Kenya", quote: "The certificate I earned opened doors for me — I presented it at a youth summit!" },
            ].map(({ img, name, quote }) => (
              <div key={name} className="rounded-3xl overflow-hidden card-hover border" style={{ borderColor: '#EBD8D0' }}>
                <div className="h-52 overflow-hidden">
                  <img src={img} alt={name} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 bg-white">
                  <p className="text-sm italic leading-relaxed mb-3" style={{ color: '#5A3C30' }}>&ldquo;{quote}&rdquo;</p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full gradient-bloom flex-shrink-0" />
                    <span className="text-xs font-bold" style={{ color: '#2D6A4F' }}>{name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#FBF5F2' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: '#1A0C08' }}>17 SDG Learning Modules</h2>
            <p style={{ color: '#7A5848' }}>Each module connects global goals to African realities and girls&apos; lives</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {SDG_MODULES.map((module) => (
              <div key={module.id} className="rounded-2xl overflow-hidden card-hover shadow-sm ring-1 ring-black/5">
                <img
                  src={`/sdg/sdg-${String(module.sdg_number).padStart(2, '0')}.png`}
                  alt={`SDG ${module.sdg_number}: ${module.title}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quotes */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="h-px flex-1" style={{ background: '#B4D9C8' }} />
            <div className="flex items-center gap-2">
              <Lightbulb size={18} style={{ color: '#C9A540' }} />
              <h2 className="text-xl font-bold" style={{ color: '#1A0C08' }}>Words That Inspire Us</h2>
            </div>
            <div className="h-px flex-1" style={{ background: '#B4D9C8' }} />
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {QUOTES.map((q, i) => (
              <div key={i} className="rounded-2xl p-6 card-hover border" style={{ background: '#F0F7F4', borderColor: '#B4D9C8' }}>
                <div className="text-4xl font-serif mb-3" style={{ color: '#B4D9C8' }}>&ldquo;</div>
                <p className="italic leading-relaxed mb-4 text-sm" style={{ color: '#5A3C30' }}>{q.text}</p>
                <p className="font-bold text-sm" style={{ color: '#2D6A4F' }}>— {q.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="rounded-3xl overflow-hidden shadow-md border bg-white" style={{ borderColor: '#EBD8D0' }}>
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-64 flex-shrink-0">
              <img src="/founder.jpg" alt="Israel Ango — Founder"
                className="w-full h-64 sm:h-full object-cover object-top" />
            </div>
            <div className="flex-1 p-8 sm:p-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5 w-fit border"
                style={{ background: '#F0F7F4', borderColor: '#B4D9C8', color: '#2D6A4F' }}>
                Meet the Founder
              </div>
              <h2 className="text-2xl sm:text-3xl font-black mb-1" style={{ color: '#1A0C08' }}>Israel Ango</h2>
              <p className="text-sm font-bold mb-4" style={{ color: '#C9A540' }}>Founder &amp; Vision Lead, Bloom Girl Africa</p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#7A5848' }}>
                Driven by a deep belief in the power of education to transform communities,
                Israel Ango created Bloom Girl Africa to bridge the gap between global
                development goals and the lived realities of young African girls.
                His mission: every girl on the continent has the knowledge and confidence to lead change.
              </p>
              <a href="https://www.linkedin.com/in/israelango" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 gradient-bloom text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity w-fit shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto gradient-bloom rounded-3xl p-14 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 70% 30%, #FCE08A 0%, transparent 60%)' }} />
          <div className="relative z-10">
            <div className="text-5xl mb-5">🌸</div>
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Ready to Bloom?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-85">
              Join thousands of empowered African girls learning, leading, and changing the world.
            </p>
            <Link href="/signup" className="inline-flex items-center gap-2 bg-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg"
              style={{ color: '#2D6A4F' }}>
              Start Your Journey <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="gradient-brown text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Bloom Girl Africa" className="h-9 w-auto rounded-lg" style={{ background: '#F9E8E4' }} />
            <span className="font-bold text-white">Bloom Girl Africa</span>
          </div>
          <p className="text-sm text-center opacity-40">&ldquo;Empowering Girls Through Knowledge, Leadership, and the SDGs.&rdquo;</p>
          <div className="flex gap-4 text-sm opacity-50">
            <Link href="/login" className="hover:opacity-100 transition-opacity">Sign In</Link>
            <Link href="/signup" className="hover:opacity-100 transition-opacity">Sign Up</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
