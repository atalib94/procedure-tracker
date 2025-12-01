'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'
import AuthForm from '@/components/AuthForm'
import { X, Smartphone } from 'lucide-react'

export default function Home() {
  const [showWebAppGuide, setShowWebAppGuide] = useState(false)
  const [activeTab, setActiveTab] = useState<'iphone' | 'android'>('iphone')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.push('/dashboard')
      }
    }
    checkSession()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="w-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="font-bold text-xl text-gray-900">Procedure Tracker</span>
          </div>
          <button
            onClick={() => setShowWebAppGuide(true)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Install as App</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="w-full px-6 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Top Content - Centered */}
          <div className="text-center mb-12">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 leading-tight">
              The Interventionalist's<br />
              <span className="text-blue-600">Diary</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-gray-500 font-medium">
              Reflect. Improve. Celebrate.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Left side - Features */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-900">Quick Reference</span> — Register performed procedures for quick reference and reflection.
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-900">EBIR Ready</span> — Organize according to EBIR syllabus topics and export for personal use or certification.
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-900">Learn & Link</span> — Upload relevant PDF files and link them to your cases.
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <Smartphone className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-900">Works Anywhere</span> — Use online as a web-app on any device.
                  <button 
                    onClick={() => setShowWebAppGuide(true)}
                    className="ml-1 text-blue-600 hover:underline"
                  >
                    Learn how →
                  </button>
                </p>
              </div>
            </div>

            {/* Center - Auth Form */}
            <div className="lg:col-span-1">
              <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
                <AuthForm />
              </div>
            </div>
            
            {/* Right side - Phone Mockup */}
            <div className="lg:col-span-1 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-44 h-[22rem] bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                  {/* Phone Frame */}
                  <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-gray-900 rounded-b-xl z-10"></div>
                    
                    {/* Screen Content */}
                    <div className="w-full h-full bg-gradient-to-b from-blue-50 to-white p-3 pt-7">
                      {/* Mini Header */}
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-4 h-4 bg-blue-600 rounded-md"></div>
                        <span className="text-[7px] font-bold text-gray-900">Procedure Tracker</span>
                      </div>
                      
                      {/* Mini Stats */}
                      <div className="grid grid-cols-2 gap-1 mb-2">
                        <div className="bg-white rounded-lg p-1.5 shadow-sm">
                          <div className="text-[9px] font-bold text-gray-900">24</div>
                          <div className="text-[5px] text-gray-500">Procedures</div>
                        </div>
                        <div className="bg-white rounded-lg p-1.5 shadow-sm">
                          <div className="text-[9px] font-bold text-blue-600">8</div>
                          <div className="text-[5px] text-gray-500">Categories</div>
                        </div>
                      </div>
                      
                      {/* Mini Cards */}
                      <div className="space-y-1">
                        <div className="bg-white rounded-lg p-1.5 shadow-sm">
                          <div className="flex items-center gap-1">
                            <div className="w-5 h-5 bg-blue-100 rounded"></div>
                            <div>
                              <div className="text-[6px] font-medium text-gray-900">TACE Procedure</div>
                              <div className="text-[5px] text-gray-500">Today</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-1.5 shadow-sm">
                          <div className="flex items-center gap-1">
                            <div className="w-5 h-5 bg-green-100 rounded"></div>
                            <div>
                              <div className="text-[6px] font-medium text-gray-900">PTA + Stent</div>
                              <div className="text-[5px] text-gray-500">Yesterday</div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-1.5 shadow-sm">
                          <div className="flex items-center gap-1">
                            <div className="w-5 h-5 bg-purple-100 rounded"></div>
                            <div>
                              <div className="text-[6px] font-medium text-gray-900">Nephrostomy</div>
                              <div className="text-[5px] text-gray-500">2 days ago</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Mini Nav */}
                      <div className="absolute bottom-2 left-2 right-2 bg-white rounded-xl p-1 shadow-lg flex justify-around">
                        <div className="w-3 h-3 bg-blue-600 rounded"></div>
                        <div className="w-3 h-3 bg-gray-200 rounded"></div>
                        <div className="w-3 h-3 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-200 rounded-full opacity-50 blur-xl"></div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-indigo-200 rounded-full opacity-50 blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Web App Guide Modal */}
      {showWebAppGuide && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold text-gray-900">Install as Web App</h2>
              <button
                onClick={() => setShowWebAppGuide(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Tabs */}
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('iphone')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'iphone'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                🍎 iPhone / iPad
              </button>
              <button
                onClick={() => setActiveTab('android')}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'android'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                🤖 Android
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6">
              {activeTab === 'iphone' ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Add Procedure Tracker to your home screen for quick access:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-blue-600">1</div>
                      <p className="text-sm text-gray-700">
                        Open this website in <strong>Safari</strong>
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-blue-600">2</div>
                      <p className="text-sm text-gray-700">
                        Tap the <strong>Share button</strong> (square with arrow pointing up)
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-blue-600">3</div>
                      <p className="text-sm text-gray-700">
                        Scroll down and tap <strong>"Add to Home Screen"</strong>
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-blue-600">4</div>
                      <p className="text-sm text-gray-700">
                        Tap <strong>"Add"</strong> in the top right corner
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-700">
                      💡 The app will appear on your home screen and work like a native app!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Add Procedure Tracker to your home screen for quick access:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-green-600">1</div>
                      <p className="text-sm text-gray-700">
                        Open this website in <strong>Chrome</strong>
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-green-600">2</div>
                      <p className="text-sm text-gray-700">
                        Tap the <strong>three dots menu</strong> (⋮) in the top right
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-green-600">3</div>
                      <p className="text-sm text-gray-700">
                        Tap <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong>
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-green-600">4</div>
                      <p className="text-sm text-gray-700">
                        Tap <strong>"Add"</strong> to confirm
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-xs text-green-700">
                      💡 The app will appear on your home screen and work like a native app!
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t bg-gray-50">
              <button
                onClick={() => setShowWebAppGuide(false)}
                className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
