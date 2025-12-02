'use client'

import { useState, useEffect } from 'react'
import { Shield, X, AlertTriangle } from 'lucide-react'

interface HIPAANoticeProps {
  variant?: 'banner' | 'compact'
}

export default function HIPAANotice({ variant = 'banner' }: HIPAANoticeProps) {
  const [dismissed, setDismissed] = useState(false)
  const [showFull, setShowFull] = useState(false)

  useEffect(() => {
    const dismissedUntil = localStorage.getItem('hipaa_notice_dismissed')
    if (dismissedUntil) {
      const dismissedDate = new Date(dismissedUntil)
      if (dismissedDate > new Date()) {
        setDismissed(true)
      }
    }
  }, [])

  const handleDismiss = () => {
    // Dismiss for 7 days
    const dismissUntil = new Date()
    dismissUntil.setDate(dismissUntil.getDate() + 7)
    localStorage.setItem('hipaa_notice_dismissed', dismissUntil.toISOString())
    setDismissed(true)
  }

  if (dismissed && variant === 'banner') {
    return null
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={() => setShowFull(true)}
        className="flex items-center gap-1.5 text-xs text-amber-700 hover:text-amber-800 bg-amber-50 px-2 py-1 rounded-md border border-amber-200"
      >
        <Shield className="w-3.5 h-3.5" />
        <span>Privacy Notice</span>
      </button>
    )
  }

  return (
    <>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 relative">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-amber-800 flex items-center gap-2">
              Patient Privacy Notice
            </h3>
            <div className="mt-1 text-sm text-amber-700">
              <p>
                While we've implemented security measures to protect your data, we strongly recommend 
                <strong> avoiding direct patient identifiers</strong> such as names, dates of birth, or 
                other personally identifiable information.
              </p>
              <p className="mt-2">
                <strong>Best practice:</strong> Use accession numbers or your own reference codes for cases, 
                and maintain a separate, secure reference document linking these to patient records within 
                your institution's compliant systems.
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 text-amber-600 hover:text-amber-800 hover:bg-amber-100 rounded transition-colors"
            title="Dismiss for 7 days"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Full Modal (for compact variant) */}
      {showFull && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-bold text-gray-900">Patient Privacy Notice</h2>
              </div>
              <button
                onClick={() => setShowFull(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex gap-4 p-4 bg-amber-50 rounded-lg border border-amber-200 mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  This application is designed for educational tracking and professional development purposes.
                </p>
              </div>
              
              <div className="space-y-4 text-sm text-gray-700">
                <p>
                  While we've implemented robust security measures to protect your data, we strongly 
                  recommend <strong>avoiding the upload or entry of direct patient identifiers</strong>, including:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2 text-gray-600">
                  <li>Patient names</li>
                  <li>Dates of birth</li>
                  <li>Medical record numbers</li>
                  <li>Social security numbers</li>
                  <li>Contact information</li>
                  <li>Any other Protected Health Information (PHI)</li>
                </ul>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="font-medium text-purple-900 mb-2">Recommended Approach</p>
                  <p className="text-purple-800">
                    Use accession numbers, case reference codes, or your own numbering system to identify 
                    procedures. Maintain a separate, secure reference document within your institution's 
                    HIPAA-compliant systems to link these references to patient records when needed.
                  </p>
                </div>
                <p className="text-gray-500 text-xs">
                  By using this application, you acknowledge your responsibility to comply with HIPAA 
                  regulations and your institution's privacy policies.
                </p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <button
                onClick={() => setShowFull(false)}
                className="w-full px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
