'use client'
import { SDG_MODULES } from '@/lib/data/sdg-modules'
import { BookOpen, FileText, HelpCircle } from 'lucide-react'

export default function AdminModulesPage() {
  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-gray-900">Modules</h1>
        <p className="text-gray-600 mt-1">Overview of all 17 SDG learning modules</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SDG_MODULES.map((module) => (
          <div key={module.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="p-4 text-white" style={{ backgroundColor: module.color }}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{module.emoji}</span>
                <div>
                  <p className="text-xs font-bold opacity-75">SDG {module.sdg_number}</p>
                  <h3 className="font-black text-base">{module.title}</h3>
                </div>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <BookOpen size={14} className="text-gray-400" />
                <span>{module.content.sections.length} content sections</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <HelpCircle size={14} className="text-gray-400" />
                <span>10 quiz questions</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FileText size={14} className="text-gray-400" />
                <span>{module.content.key_takeaways.length} key takeaways</span>
              </div>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                  ✅ Active
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
