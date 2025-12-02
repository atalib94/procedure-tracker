'use client'

import { useState, useEffect } from 'react'
import { Shield, X, AlertTriangle, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface PrivacyNoticeProps {
  variant?: 'banner' | 'compact'
}

export default function HIPAANotice({ variant = 'banner' }: PrivacyNoticeProps) {
  const [dismissed, setDismissed] = useState(false)
  const [showFull, setShowFull] = useState(false)

  useEffect(() => {
    const dismissedUntil = localStorage.getItem('privacy_notice_dismissed')
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
    localStorage.setItem('privacy_notice_dismissed', dismissUntil.toISOString())
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
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 relative">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-amber-900 flex items-center gap-2">
              Patient Data Protection (GDPR &amp; HIPAA)
            </h3>
            <div className="mt-1 text-sm text-amber-800">
              <p>
                <strong>Never enter patient identifiers.</strong> Use Case IDs to track procedures, 
                and maintain a separate secure mapping to PACS accession numbers within your institution.
              </p>
              <Link 
                href="/dashboard/privacy-guidance"
                className="inline-flex items-center gap-1 mt-2 text-amber-700 hover:text-amber-900 font-medium underline underline-offset-2"
              >
                View full privacy guidance
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
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
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Patient Data Protection</h2>
              </div>
              <button
                onClick={() => setShowFull(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200 mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  This application is for <strong>educational tracking</strong>. Never store patient identifiers.
                </p>
              </div>
              
              <div className="space-y-4 text-sm text-gray-700">
                <p>
                  Under both <strong>GDPR</strong> (EU) and <strong>HIPAA</strong> (US), you must not enter:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2 text-gray-600">
                  <li>Patient names or initials</li>
                  <li>Dates of birth or exact ages</li>
                  <li>Medical Record Numbers (MRN)</li>
                  <li>PACS Accession Numbers</li>
                  <li>Contact information</li>
                  <li>Any identifiable images without de-identification</li>
                </ul>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="font-medium text-blue-900 mb-2">Use Case IDs Instead</p>
                  <p className="text-blue-800">
                    Create your own Case ID system (e.g., <code className="bg-white px-1 rounded">IR-2024-0042</code>) 
                    and maintain a separate, secure mapping to PACS accession numbers on your hospital network.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex gap-3">
              <Link
                href="/dashboard/privacy-guidance"
                onClick={() => setShowFull(false)}
                className="flex-1 px-4 py-2.5 text-purple-700 bg-purple-50 border border-purple-200 rounded-lg font-medium hover:bg-purple-100 transition-colors text-center"
              >
                Read Full Guide
              </Link>
              <button
                onClick={() => setShowFull(false)}
                className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
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
