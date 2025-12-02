'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Shield, 
  AlertTriangle, 
  Check, 
  X, 
  Image as ImageIcon, 
  FileText, 
  Database, 
  Lock, 
  Eye, 
  EyeOff,
  Hash,
  Link2,
  Lightbulb,
  Globe,
  Scale,
  ChevronDown,
  ChevronRight,
  Copy,
  CheckCircle2,
  XCircle,
  Info,
  Users,
  Clock,
  Trash2,
  Download
} from 'lucide-react'

interface AccordionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

function Accordion({ title, icon, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <span className="font-semibold text-gray-900">{title}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 sm:px-5 pb-5 border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  )
}

function DoItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Check className="w-3 h-3 text-green-600" />
      </div>
      <span className="text-gray-700">{children}</span>
    </div>
  )
}

function DontItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
        <X className="w-3 h-3 text-red-600" />
      </div>
      <span className="text-gray-700">{children}</span>
    </div>
  )
}

function TipBox({ title, children, variant = 'info' }: { title: string; children: React.ReactNode; variant?: 'info' | 'warning' | 'success' }) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
    success: 'bg-green-50 border-green-200 text-green-900'
  }
  
  const iconStyles = {
    info: 'text-blue-600',
    warning: 'text-amber-600',
    success: 'text-green-600'
  }

  return (
    <div className={`rounded-lg border p-4 ${styles[variant]}`}>
      <div className="flex gap-3">
        <Lightbulb className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconStyles[variant]}`} />
        <div>
          <p className="font-medium mb-1">{title}</p>
          <div className="text-sm opacity-90">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default function PrivacyGuidanceClient() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const exampleCaseId = `IR-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`

  return (
    <div className="max-w-4xl mx-auto pb-20 lg:pb-6">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>
        
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Patient Data Protection Guide</h1>
            <p className="text-gray-600 mt-1">
              GDPR &amp; HIPAA compliance guidance for medical procedure tracking
            </p>
          </div>
        </div>
      </div>

      {/* Key Principle Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white mb-8">
        <div className="flex gap-4">
          <AlertTriangle className="w-8 h-8 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-bold mb-2">Core Privacy Principle</h2>
            <p className="text-purple-100 text-lg">
              This application is designed for <strong className="text-white">educational tracking and professional development</strong>. 
              Never enter direct patient identifiers. Use Case IDs that link to your institution's secure systems.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Reference Cards */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">GDPR</h3>
              <p className="text-sm text-gray-500">EU Data Protection</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Right to erasure (Article 17)</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Data minimisation principle</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Pseudonymisation recommended</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <Scale className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">HIPAA</h3>
              <p className="text-sm text-gray-500">US Health Privacy</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>18 PHI identifiers to avoid</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Minimum necessary standard</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>De-identification requirements</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content Accordions */}
      <div className="space-y-4">
        {/* Protected Identifiers */}
        <Accordion 
          title="Protected Patient Identifiers" 
          icon={<EyeOff className="w-5 h-5 text-purple-600" />}
          defaultOpen={true}
        >
          <div className="pt-4 space-y-4">
            <p className="text-gray-600">
              The following identifiers must <strong>never</strong> be entered into this application. They are protected under both GDPR (as personal data) and HIPAA (as PHI):
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Direct Identifiers
                </h4>
                <ul className="space-y-2 text-sm text-red-800">
                  <li>â€¢ Patient names (full or partial)</li>
                  <li>â€¢ Dates of birth</li>
                  <li>â€¢ Medical Record Numbers (MRN)</li>
                  <li>â€¢ Social security/national ID numbers</li>
                  <li>â€¢ Phone numbers</li>
                  <li>â€¢ Email addresses</li>
                  <li>â€¢ Physical addresses</li>
                  <li>â€¢ Biometric identifiers</li>
                </ul>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Quasi-Identifiers
                </h4>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li>â€¢ Exact procedure dates (use week/month)</li>
                  <li>â€¢ Rare diagnosis combinations</li>
                  <li>â€¢ Unique procedure combinations</li>
                  <li>â€¢ Very specific ages (85+)</li>
                  <li>â€¢ Geographic data smaller than county</li>
                  <li>â€¢ Account numbers</li>
                  <li>â€¢ Certificate/license numbers</li>
                  <li>â€¢ Device identifiers or serial numbers</li>
                </ul>
              </div>
            </div>

            <TipBox title="GDPR Special Category Data" variant="warning">
              <p>Health data is considered "special category data" under GDPR Article 9, requiring even stricter protection. This includes genetic data, biometric data, and any data concerning health.</p>
            </TipBox>
          </div>
        </Accordion>

        {/* Case ID Best Practices */}
        <Accordion 
          title="Case ID System (Replaces Accession Numbers)" 
          icon={<Hash className="w-5 h-5 text-purple-600" />}
        >
          <div className="pt-4 space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Why "Case ID" instead of "Accession Number"?</h4>
              <p className="text-sm text-blue-800">
                We use "Case ID" to clearly distinguish your personal tracking reference from PACS/RIS accession numbers. 
                This prevents confusion and emphasises that this is <strong>your</strong> reference system, not a link to institutional records.
              </p>
            </div>

            <h4 className="font-semibold text-gray-900">Recommended Case ID Formats:</h4>
            
            <div className="space-y-3">
              {[
                { format: 'IR-YYYY-NNNN', example: exampleCaseId, desc: 'Simple sequential (Interventional Radiology)' },
                { format: 'DEPT-MMYY-NNN', example: 'VIR-1224-042', desc: 'Department + Month-Year + Number' },
                { format: 'INITIALS-NNNN', example: 'JD-0847', desc: 'Your initials + sequential number' },
                { format: 'CAT-YYYYMMDD-N', example: 'TACE-20241215-2', desc: 'Category + Date + Daily count' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div>
                    <code className="text-purple-600 font-mono text-sm bg-purple-50 px-2 py-1 rounded">{item.format}</code>
                    <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.example, `format-${idx}`)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {copiedId === `format-${idx}` ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{item.example}</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            <TipBox title="Linking to PACS Accession Numbers" variant="success">
              <p className="mb-2">Maintain a <strong>separate, secure mapping file</strong> in your institution's compliant system:</p>
              <div className="bg-white/50 rounded p-2 font-mono text-xs overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-green-200">
                      <th className="pb-1">Case ID</th>
                      <th className="pb-1">PACS Accession</th>
                      <th className="pb-1">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1">IR-2024-0847</td>
                      <td>ACC-12345678</td>
                      <td>Dec 2024</td>
                    </tr>
                    <tr>
                      <td className="py-1">IR-2024-0848</td>
                      <td>ACC-12345923</td>
                      <td>Dec 2024</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs">Store this on your hospital network or encrypted local drive, never in this app.</p>
            </TipBox>
          </div>
        </Accordion>

        {/* Image De-identification */}
        <Accordion 
          title="Image Upload & De-identification" 
          icon={<ImageIcon className="w-5 h-5 text-purple-600" />}
        >
          <div className="pt-4 space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Critical: De-identify All Images Before Upload
              </h4>
              <p className="text-sm text-red-800">
                Medical images (DICOM, screenshots) often contain embedded patient data in metadata and burned-in annotations. 
                You must de-identify images before uploading to this application.
              </p>
            </div>

            <h4 className="font-semibold text-gray-900 mt-4">Image De-identification Checklist:</h4>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h5 className="text-sm font-medium text-gray-700 uppercase tracking-wide">Remove from Images</h5>
                <div className="space-y-2">
                  <DontItem>Patient name overlays</DontItem>
                  <DontItem>Date of birth text</DontItem>
                  <DontItem>MRN or accession numbers</DontItem>
                  <DontItem>Hospital/clinic name (if identifiable)</DontItem>
                  <DontItem>Referring physician names</DontItem>
                  <DontItem>Study date (exact)</DontItem>
                  <DontItem>Facial features (CT/MRI head)</DontItem>
                  <DontItem>Unique tattoos or birthmarks</DontItem>
                </div>
              </div>
              
              <div className="space-y-3">
                <h5 className="text-sm font-medium text-gray-700 uppercase tracking-wide">Safe to Include</h5>
                <div className="space-y-2">
                  <DoItem>Anatomical labels you add</DoItem>
                  <DoItem>Measurement annotations</DoItem>
                  <DoItem>Arrow markers for teaching</DoItem>
                  <DoItem>Technical parameters (kV, mA)</DoItem>
                  <DoItem>Your Case ID watermark</DoItem>
                  <DoItem>De-identified screenshots</DoItem>
                  <DoItem>Cropped regions of interest</DoItem>
                </div>
              </div>
            </div>

            <TipBox title="Recommended De-identification Tools" variant="info">
              <ul className="space-y-1">
                <li>â€¢ <strong>DICOM Anonymizer</strong> - Free tool for DICOM metadata removal</li>
                <li>â€¢ <strong>Horos/OsiriX</strong> - Export as anonymised JPEG/PNG</li>
                <li>â€¢ <strong>Screenshot + Crop</strong> - Quick method for single images</li>
                <li>â€¢ <strong>ImageJ</strong> - Can black out regions and strip metadata</li>
              </ul>
            </TipBox>

            <div className="bg-gray-100 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">DICOM Metadata to Remove</h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono text-gray-600">
                <span className="bg-white px-2 py-1 rounded">(0010,0010) Patient Name</span>
                <span className="bg-white px-2 py-1 rounded">(0010,0020) Patient ID</span>
                <span className="bg-white px-2 py-1 rounded">(0010,0030) Birth Date</span>
                <span className="bg-white px-2 py-1 rounded">(0008,0050) Accession Number</span>
                <span className="bg-white px-2 py-1 rounded">(0008,0080) Institution</span>
                <span className="bg-white px-2 py-1 rounded">(0008,0090) Referring Physician</span>
              </div>
            </div>
          </div>
        </Accordion>

        {/* PDF Document Guidance */}
        <Accordion 
          title="PDF & Document Guidelines" 
          icon={<FileText className="w-5 h-5 text-purple-600" />}
        >
          <div className="pt-4 space-y-4">
            <p className="text-gray-600">
              When attaching learning materials, guidelines, or case-related PDFs, ensure they contain no patient-identifiable information.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Acceptable Documents
                </h4>
                <ul className="space-y-2 text-sm text-green-800">
                  <li>â€¢ Anatomy reference materials</li>
                  <li>â€¢ Technique guides & protocols</li>
                  <li>â€¢ Published literature & guidelines</li>
                  <li>â€¢ Equipment manuals</li>
                  <li>â€¢ Your own de-identified case notes</li>
                  <li>â€¢ Educational diagrams</li>
                </ul>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Never Upload
                </h4>
                <ul className="space-y-2 text-sm text-red-800">
                  <li>â€¢ Procedure reports with patient data</li>
                  <li>â€¢ Referral letters</li>
                  <li>â€¢ Consent forms</li>
                  <li>â€¢ Discharge summaries</li>
                  <li>â€¢ Lab results</li>
                  <li>â€¢ Any document with PHI</li>
                </ul>
              </div>
            </div>
          </div>
        </Accordion>

        {/* GDPR Data Subject Rights */}
        <Accordion 
          title="Your GDPR Data Subject Rights" 
          icon={<Users className="w-5 h-5 text-purple-600" />}
        >
          <div className="pt-4 space-y-4">
            <p className="text-gray-600">
              Under GDPR, you have specific rights regarding your personal data stored in this application:
            </p>

            <div className="space-y-3">
              {[
                { 
                  icon: <Eye className="w-5 h-5" />, 
                  title: 'Right of Access (Art. 15)', 
                  desc: 'Request a copy of all your stored data' 
                },
                { 
                  icon: <FileText className="w-5 h-5" />, 
                  title: 'Right to Rectification (Art. 16)', 
                  desc: 'Correct any inaccurate personal data' 
                },
                { 
                  icon: <Trash2 className="w-5 h-5" />, 
                  title: 'Right to Erasure (Art. 17)', 
                  desc: 'Request deletion of your data ("right to be forgotten")' 
                },
                { 
                  icon: <Download className="w-5 h-5" />, 
                  title: 'Right to Portability (Art. 20)', 
                  desc: 'Receive your data in a machine-readable format' 
                },
                { 
                  icon: <Clock className="w-5 h-5" />, 
                  title: 'Right to Restriction (Art. 18)', 
                  desc: 'Limit how your data is processed' 
                },
              ].map((right, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 text-purple-600">
                    {right.icon}
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">{right.title}</h5>
                    <p className="text-sm text-gray-600">{right.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <TipBox title="Exercising Your Rights" variant="info">
              <p>To exercise any of these rights, use the Export function in Settings to download your data, or contact the application administrator to request data deletion.</p>
            </TipBox>
          </div>
        </Accordion>

        {/* Data Retention */}
        <Accordion 
          title="Data Retention & Deletion" 
          icon={<Database className="w-5 h-5 text-purple-600" />}
        >
          <div className="pt-4 space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Retention Principles</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Your procedure data is retained as long as your account is active</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>You can delete individual procedures at any time</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Account deletion removes all associated data</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Backups are purged within 30 days of deletion</span>
                </li>
              </ul>
            </div>

            <TipBox title="GDPR Data Minimisation" variant="warning">
              <p>Only enter the minimum data necessary for your educational tracking purposes. If you don't need a field, leave it blank. Regularly review and delete outdated entries.</p>
            </TipBox>
          </div>
        </Accordion>

        {/* Security Measures */}
        <Accordion 
          title="Security Measures" 
          icon={<Lock className="w-5 h-5 text-purple-600" />}
        >
          <div className="pt-4 space-y-4">
            <p className="text-gray-600">
              While we implement security measures to protect your data, remember that this application is designed for educational tracking without patient identifiers:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h5 className="text-sm font-medium text-gray-700">Technical Measures</h5>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Encryption in transit (HTTPS/TLS)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Encryption at rest</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Secure authentication</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Row-level security policies</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h5 className="text-sm font-medium text-gray-700">Your Responsibilities</h5>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-500" />
                    <span>Use a strong, unique password</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-500" />
                    <span>Don't share your login credentials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-500" />
                    <span>Log out on shared devices</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-500" />
                    <span>Report suspicious activity</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Accordion>

        {/* PACS Linking Tips */}
        <Accordion 
          title="Tips: Linking Case IDs to PACS" 
          icon={<Link2 className="w-5 h-5 text-purple-600" />}
        >
          <div className="pt-4 space-y-4">
            <p className="text-gray-600">
              To cross-reference your logged procedures with institutional PACS/RIS records while maintaining privacy:
            </p>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-3">Method 1: Secure Spreadsheet Mapping</h4>
                <ol className="space-y-2 text-sm text-purple-800 list-decimal list-inside">
                  <li>Create an Excel/Numbers file on your <strong>hospital network drive</strong></li>
                  <li>Columns: Case ID (from this app) | PACS Accession | MRN (optional) | Notes</li>
                  <li>Password-protect the spreadsheet</li>
                  <li>Never upload this file to cloud storage or this app</li>
                  <li>Delete entries when no longer needed for your training records</li>
                </ol>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-green-900 mb-3">Method 2: Date-Based Lookup</h4>
                <ol className="space-y-2 text-sm text-green-800 list-decimal list-inside">
                  <li>Use your Case ID format to include the procedure date: <code className="bg-white px-1 rounded">TACE-20241215-1</code></li>
                  <li>When you need PACS access, search your RIS by date + procedure type</li>
                  <li>The daily sequence number (e.g., "-1", "-2") helps identify which case</li>
                  <li>No direct linking requiredâ€”just temporal correlation</li>
                </ol>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
                <h4 className="font-semibold text-amber-900 mb-3">Method 3: Personal Encrypted Notes App</h4>
                <ol className="space-y-2 text-sm text-amber-800 list-decimal list-inside">
                  <li>Use an encrypted notes app (e.g., Standard Notes, Obsidian with encryption)</li>
                  <li>Store your mapping locally with device-level encryption</li>
                  <li>Organise by month or category for easy lookup</li>
                  <li>Set auto-delete reminders for entries older than your training requirement</li>
                </ol>
              </div>
            </div>

            <TipBox title="Best Practice" variant="success">
              <p>Choose the method that aligns with your institution's data governance policies. When in doubt, consult your hospital's Information Governance or Data Protection Officer.</p>
            </TipBox>
          </div>
        </Accordion>
      </div>

      {/* Footer Notice */}
      <div className="mt-8 bg-gray-100 rounded-xl p-6 text-center">
        <Shield className="w-8 h-8 text-gray-400 mx-auto mb-3" />
        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
          By using this application, you acknowledge your responsibility to comply with GDPR, HIPAA, 
          and your institution's data protection policies. This guidance does not constitute legal advice. 
          Consult your institution's Data Protection Officer for specific requirements.
        </p>
        <p className="text-xs text-gray-500 mt-3">
          Last updated: December 2024
        </p>
      </div>
    </div>
  )
}
