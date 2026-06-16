'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { LayoutDashboard, Users, BookOpen, BarChart2, LogOut, Shield } from 'lucide-react'

const ADMIN_NAV = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/students', label: 'Students', icon: Users },
  { href: '/admin/modules', label: 'Modules', icon: BookOpen },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { profile, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-60 text-white flex flex-col fixed h-full z-40 gradient-brown">
        <div className="p-5 border-b border-amber-800/40">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Bloom Girl Africa" className="w-9 h-9 rounded-full object-cover ring-2 ring-amber-400/40" />
            <div>
              <div className="font-bold text-amber-50 text-sm">Bloom Girl Africa</div>
              <div className="text-xs text-amber-300/70 flex items-center gap-1"><Shield size={10} /> Admin Panel</div>
            </div>
          </div>
        </div>
        {profile && (
          <div className="px-4 py-3 border-b border-amber-800/40">
            <p className="text-sm font-semibold text-amber-100">{profile.full_name}</p>
            <p className="text-xs text-amber-300/60">{profile.email}</p>
          </div>
        )}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {ADMIN_NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-amber-100/70 hover:bg-white/10 hover:text-amber-100'}`}>
                <Icon size={17} />{label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-amber-800/40">
          <Link href="/dashboard" className="flex items-center gap-2 text-xs text-amber-300/60 hover:text-amber-300 mb-2 transition-colors">
            ← Student View
          </Link>
          <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-amber-100/70 hover:bg-red-900/40 hover:text-red-300 transition-all">
            <LogOut size={17} /> Sign Out
          </button>
        </div>
      </aside>
      <main className="ml-60 flex-1 p-6 sm:p-8">{children}</main>
    </div>
  )
}
