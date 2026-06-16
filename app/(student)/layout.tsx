'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { LayoutDashboard, BookOpen, Award, FileCheck, User, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/modules', label: 'Modules', icon: BookOpen },
  { href: '/achievements', label: 'Achievements', icon: Award },
  { href: '/certificate', label: 'Certificate', icon: FileCheck },
  { href: '/profile', label: 'Profile', icon: User },
]

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { profile, loading, signOut } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSignOut = async () => { await signOut(); router.push('/') }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FBF5F2' }}>
        <div className="text-center">
          <img src="/logo.png" className="w-16 h-16 rounded-xl object-contain mx-auto mb-4 float-animation" alt="logo" style={{ background: '#F9E8E4', padding: '4px' }} />
          <p className="font-semibold text-sm" style={{ color: '#2D6A4F' }}>Loading your learning journey...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#FBF5F2' }}>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 flex-col z-40 border-r"
        style={{ background: 'linear-gradient(160deg, #112C1E 0%, #1B4430 100%)', borderColor: 'rgba(255,255,255,0.08)' }}>
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <Link href="/dashboard" className="flex items-center gap-3">
            <img src="/logo.png" className="w-10 h-10 rounded-xl object-contain flex-shrink-0" alt="logo" style={{ background: '#F9E8E4', padding: '2px' }} />
            <div>
              <div className="font-black text-sm text-white leading-tight">Bloom Girl</div>
              <div className="font-black text-sm leading-tight" style={{ color: '#C9A540' }}>Africa</div>
            </div>
          </Link>
        </div>

        {/* User info */}
        {profile && (
          <div className="px-4 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full gradient-bloom flex items-center justify-center font-bold text-sm flex-shrink-0 text-white">
                {profile.full_name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{profile.full_name}</p>
                <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.45)' }}>{profile.country}</p>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link key={href} href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={active
                  ? { background: 'linear-gradient(135deg, #C9A540 0%, #E8C050 100%)', color: '#112C1E', fontWeight: 700 }
                  : { color: 'rgba(255,255,255,0.6)', background: 'transparent' }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)' }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
                <Icon size={18} />{label}
              </Link>
            )
          })}
        </nav>

        {/* Sign out */}
        <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <button onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{ color: 'rgba(255,255,255,0.45)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#FCA5A5'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,80,80,0.12)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.45)'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <header className="md:hidden fixed top-0 w-full z-40 px-4 h-14 flex items-center justify-between border-b"
        style={{ background: '#1B4430', borderColor: 'rgba(255,255,255,0.08)' }}>
        <Link href="/dashboard" className="flex items-center gap-2">
          <img src="/logo.png" className="w-8 h-8 rounded-lg object-contain" alt="logo" style={{ background: '#F9E8E4', padding: '2px' }} />
          <span className="font-black text-white text-sm">Bloom Girl Africa</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ color: 'rgba(255,255,255,0.7)' }} className="p-1">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile slide-out menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <div className="absolute right-0 top-14 w-64 h-[calc(100%-56px)] flex flex-col border-l"
            style={{ background: '#112C1E', borderColor: 'rgba(255,255,255,0.08)' }}
            onClick={e => e.stopPropagation()}>
            {profile && (
              <div className="px-4 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full gradient-bloom flex items-center justify-center font-bold text-sm text-white">
                    {profile.full_name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{profile.full_name}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{profile.country}</p>
                  </div>
                </div>
              </div>
            )}
            <nav className="flex-1 px-3 py-4 space-y-1">
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || pathname.startsWith(href + '/')
                return (
                  <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={active ? { background: 'linear-gradient(135deg,#C9A540,#E8C050)', color: '#112C1E', fontWeight: 700 } : { color: 'rgba(255,255,255,0.6)' }}>
                    <Icon size={18} />{label}
                  </Link>
                )
              })}
            </nav>
            <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 w-full z-40 flex border-t"
        style={{ background: '#112C1E', borderColor: 'rgba(255,255,255,0.08)' }}>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link key={href} href={href}
              className="flex-1 flex flex-col items-center py-2.5 gap-0.5 text-xs font-medium transition-colors"
              style={{ color: active ? '#C9A540' : 'rgba(255,255,255,0.35)' }}>
              <Icon size={19} />
              <span className="text-[10px]">{label}</span>
            </Link>
          )
        })}
      </nav>

      <main className="md:ml-64 pt-14 md:pt-0 pb-16 md:pb-0 min-h-screen">
        {children}
      </main>
    </div>
  )
}
