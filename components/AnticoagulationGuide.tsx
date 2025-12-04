'use client'

import { useState, useMemo } from 'react'
import { Search, Pill, AlertTriangle, Clock, Info, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'

// Reference: CIRSE Standards of Practice on Peri-operative Anticoagulation Management (2021)
// Hadi M, Walker C, Desborough M, et al. Cardiovasc Intervent Radiol. 2021;44:523-536
// Also incorporates SIR Consensus Guidelines (2019), endorsed by CIRSE

type BleedingRisk = 'low' | 'moderate' | 'high'

interface Procedure {
  name: string
  category: string
  bleedingRisk: BleedingRisk
  notes?: string
}

interface MedicationRecommendation {
  medication: string
  category: string
  low: string
  moderate: string
  high: string
  notes?: string
}

const procedures: Procedure[] = [
  // Vascular - Low Risk
  { name: 'Dialysis access interventions', category: 'Vascular', bleedingRisk: 'low' },
  { name: 'Venography', category: 'Vascular', bleedingRisk: 'low' },
  { name: 'Central venous catheter placement', category: 'Vascular', bleedingRisk: 'low' },
  { name: 'Tunneled central line placement', category: 'Vascular', bleedingRisk: 'low' },
  { name: 'Central line removal', category: 'Vascular', bleedingRisk: 'low' },
  { name: 'IVC filter placement', category: 'Vascular', bleedingRisk: 'low' },
  { name: 'IVC filter retrieval', category: 'Vascular', bleedingRisk: 'low' },
  { name: 'PICC line placement', category: 'Vascular', bleedingRisk: 'low' },
  { name: 'Port placement (venous access)', category: 'Vascular', bleedingRisk: 'low' },
  
  // Vascular - Moderate Risk
  { name: 'Angiography (diagnostic)', category: 'Vascular', bleedingRisk: 'moderate' },
  { name: 'Arterial intervention (non-neurologic)', category: 'Vascular', bleedingRisk: 'moderate' },
  { name: 'Venous intervention', category: 'Vascular', bleedingRisk: 'moderate' },
  { name: 'Chemoembolization (TACE)', category: 'Vascular', bleedingRisk: 'moderate' },
  { name: 'Uterine fibroid embolization', category: 'Vascular', bleedingRisk: 'moderate' },
  { name: 'Peripheral embolization', category: 'Vascular', bleedingRisk: 'moderate' },
  { name: 'Thrombolysis (venous)', category: 'Vascular', bleedingRisk: 'moderate' },
  
  // Vascular - High Risk
  { name: 'TIPS creation', category: 'Vascular', bleedingRisk: 'high' },
  { name: 'TIPS revision', category: 'Vascular', bleedingRisk: 'high' },
  { name: 'Thrombolysis (arterial)', category: 'Vascular', bleedingRisk: 'high' },
  
  // Non-vascular - Low Risk
  { name: 'Thoracentesis', category: 'Non-vascular', bleedingRisk: 'low' },
  { name: 'Paracentesis', category: 'Non-vascular', bleedingRisk: 'low' },
  { name: 'Superficial aspiration/biopsy', category: 'Non-vascular', bleedingRisk: 'low', notes: 'Thyroid, superficial lymph node' },
  { name: 'Superficial abscess drainage', category: 'Non-vascular', bleedingRisk: 'low' },
  { name: 'Drainage catheter exchange', category: 'Non-vascular', bleedingRisk: 'low', notes: 'Biliary, nephrostomy, abscess' },
  { name: 'Joint aspiration/injection', category: 'Non-vascular', bleedingRisk: 'low' },
  { name: 'Lumbar puncture', category: 'Non-vascular', bleedingRisk: 'low' },
  
  // Non-vascular - Moderate Risk
  { name: 'Chest tube placement', category: 'Non-vascular', bleedingRisk: 'moderate' },
  { name: 'Lung biopsy (percutaneous)', category: 'Non-vascular', bleedingRisk: 'moderate' },
  { name: 'Abdominal/retroperitoneal abscess drainage', category: 'Non-vascular', bleedingRisk: 'moderate' },
  { name: 'Gastrostomy placement', category: 'Non-vascular', bleedingRisk: 'moderate' },
  { name: 'Cholecystostomy', category: 'Non-vascular', bleedingRisk: 'moderate' },
  { name: 'Biliary drainage (new)', category: 'Non-vascular', bleedingRisk: 'moderate' },
  { name: 'Nephrostomy placement (new)', category: 'Non-vascular', bleedingRisk: 'moderate' },
  { name: 'Bone biopsy', category: 'Non-vascular', bleedingRisk: 'moderate' },
  { name: 'Vertebroplasty', category: 'Non-vascular', bleedingRisk: 'moderate' },
  { name: 'Kyphoplasty', category: 'Non-vascular', bleedingRisk: 'moderate' },
  
  // Non-vascular - High Risk
  { name: 'Liver biopsy (percutaneous)', category: 'Non-vascular', bleedingRisk: 'high' },
  { name: 'Transjugular liver biopsy', category: 'Non-vascular', bleedingRisk: 'moderate', notes: 'Lower risk than percutaneous' },
  { name: 'Kidney biopsy (native)', category: 'Non-vascular', bleedingRisk: 'high' },
  { name: 'Kidney biopsy (transplant)', category: 'Non-vascular', bleedingRisk: 'high' },
  { name: 'Deep pelvic abscess drainage', category: 'Non-vascular', bleedingRisk: 'high' },
  { name: 'Biliary intervention (complex)', category: 'Non-vascular', bleedingRisk: 'high' },
  
  // Ablation
  { name: 'Radiofrequency ablation (liver)', category: 'Ablation', bleedingRisk: 'high' },
  { name: 'Microwave ablation (liver)', category: 'Ablation', bleedingRisk: 'high' },
  { name: 'Cryoablation (kidney)', category: 'Ablation', bleedingRisk: 'high' },
  { name: 'Radiofrequency ablation (kidney)', category: 'Ablation', bleedingRisk: 'high' },
  { name: 'Lung ablation', category: 'Ablation', bleedingRisk: 'high' },
  
  // Spine
  { name: 'Epidural steroid injection', category: 'Spine', bleedingRisk: 'moderate' },
  { name: 'Facet joint injection', category: 'Spine', bleedingRisk: 'low' },
  { name: 'Nerve root block', category: 'Spine', bleedingRisk: 'moderate' },
  { name: 'Spinal cord stimulator placement', category: 'Spine', bleedingRisk: 'high' },
]

const medications: MedicationRecommendation[] = [
  // Antiplatelet agents
  {
    medication: 'Aspirin (low dose, ≤100mg)',
    category: 'Antiplatelet',
    low: 'Continue',
    moderate: 'Continue',
    high: 'Continue',
    notes: 'Generally safe to continue for most procedures'
  },
  {
    medication: 'Aspirin (high dose, >100mg)',
    category: 'Antiplatelet',
    low: 'Continue',
    moderate: 'Hold 5 days',
    high: 'Hold 5 days',
  },
  {
    medication: 'Clopidogrel (Plavix)',
    category: 'Antiplatelet',
    low: 'Continue or hold 0-5 days',
    moderate: 'Hold 5 days',
    high: 'Hold 5 days',
    notes: 'Consult cardiology if recent stent (<12 months)'
  },
  {
    medication: 'Prasugrel (Effient)',
    category: 'Antiplatelet',
    low: 'Continue or hold 0-5 days',
    moderate: 'Hold 7 days',
    high: 'Hold 7 days',
    notes: 'Longer half-life than clopidogrel'
  },
  {
    medication: 'Ticagrelor (Brilinta)',
    category: 'Antiplatelet',
    low: 'Continue or hold 0-3 days',
    moderate: 'Hold 5 days',
    high: 'Hold 5 days',
  },
  
  // Heparins
  {
    medication: 'Unfractionated heparin (IV)',
    category: 'Anticoagulant',
    low: 'Hold 1 hour',
    moderate: 'Hold 4 hours, check aPTT',
    high: 'Hold 4 hours, check aPTT',
  },
  {
    medication: 'Unfractionated heparin (SC)',
    category: 'Anticoagulant',
    low: 'Hold 4 hours',
    moderate: 'Hold 4 hours',
    high: 'Hold 6 hours',
  },
  {
    medication: 'Enoxaparin (Clexane/Lovenox)',
    category: 'Anticoagulant',
    low: 'Hold 12 hours',
    moderate: 'Hold 12 hours',
    high: 'Hold 24 hours',
    notes: 'LMWH - consider anti-Xa level if renal impairment'
  },
  {
    medication: 'Dalteparin (Fragmin)',
    category: 'Anticoagulant',
    low: 'Hold 12 hours',
    moderate: 'Hold 12 hours',
    high: 'Hold 24 hours',
  },
  {
    medication: 'Fondaparinux (Arixtra)',
    category: 'Anticoagulant',
    low: 'Hold 24 hours',
    moderate: 'Hold 36-42 hours',
    high: 'Hold 36-42 hours',
    notes: 'Long half-life (17-21 hours)'
  },
  
  // Vitamin K Antagonists
  {
    medication: 'Warfarin (Coumadin)',
    category: 'VKA',
    low: 'INR ≤2.0',
    moderate: 'Hold 5 days, INR ≤1.5',
    high: 'Hold 5 days, INR ≤1.5',
    notes: 'Consider bridging in high thrombotic risk patients'
  },
  {
    medication: 'Acenocoumarol (Sintrom)',
    category: 'VKA',
    low: 'INR ≤2.0',
    moderate: 'Hold 3 days, INR ≤1.5',
    high: 'Hold 3 days, INR ≤1.5',
    notes: 'Shorter half-life than warfarin'
  },
  
  // DOACs
  {
    medication: 'Dabigatran (Pradaxa)',
    category: 'DOAC',
    low: 'Hold 24 hours',
    moderate: 'Hold 48 hours',
    high: 'Hold 72 hours',
    notes: 'Extend if CrCl <50 mL/min. Reversal: Idarucizumab'
  },
  {
    medication: 'Rivaroxaban (Xarelto)',
    category: 'DOAC',
    low: 'Hold 24 hours',
    moderate: 'Hold 48 hours',
    high: 'Hold 48 hours',
    notes: 'Reversal: Andexanet alfa or 4F-PCC'
  },
  {
    medication: 'Apixaban (Eliquis)',
    category: 'DOAC',
    low: 'Hold 24 hours',
    moderate: 'Hold 48 hours',
    high: 'Hold 72 hours',
    notes: 'Reversal: Andexanet alfa or 4F-PCC'
  },
  {
    medication: 'Edoxaban (Lixiana)',
    category: 'DOAC',
    low: 'Hold 24 hours',
    moderate: 'Hold 48 hours',
    high: 'Hold 48 hours',
    notes: 'Reversal: 4F-PCC'
  },
]

const riskColors = {
  low: 'bg-green-100 text-green-800 border-green-200',
  moderate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-red-100 text-red-800 border-red-200',
}

const riskLabels = {
  low: 'Low Risk',
  moderate: 'Moderate Risk',
  high: 'High Risk',
}

export default function AnticoagulationGuide() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Antiplatelet', 'Anticoagulant', 'VKA', 'DOAC']))

  const filteredProcedures = useMemo(() => {
    if (!searchQuery.trim()) return procedures
    const query = searchQuery.toLowerCase()
    return procedures.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const groupedProcedures = useMemo(() => {
    const groups: Record<string, Procedure[]> = {}
    filteredProcedures.forEach(p => {
      if (!groups[p.category]) groups[p.category] = []
      groups[p.category].push(p)
    })
    return groups
  }, [filteredProcedures])

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

  const groupedMedications = useMemo(() => {
    const groups: Record<string, MedicationRecommendation[]> = {}
    medications.forEach(m => {
      if (!groups[m.category]) groups[m.category] = []
      groups[m.category].push(m)
    })
    return groups
  }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Pill className="w-7 h-7 text-blue-600" />
          Periprocedural Anticoagulation Guide
        </h1>
        <p className="text-gray-600 mt-1">
          Medication management recommendations for IR procedures
        </p>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-medium">Reference Guidelines</p>
            <p className="mt-1">
              Based on CIRSE Standards of Practice on Peri-operative Anticoagulation Management (Hadi M, et al. <em>Cardiovasc Intervent Radiol</em>. 2021;44:523-536) and SIR Consensus Guidelines (2019).
            </p>
            <p className="mt-2 font-medium">
              ⚠️ Always consult your local institutional protocols. These recommendations should be adapted based on individual patient factors, thrombotic risk, and clinical context.
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search procedures (e.g., liver biopsy, PICC line, nephrostomy...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Procedures List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Select Procedure</h2>
          </div>
          <div className="max-h-96 overflow-y-auto divide-y divide-gray-100">
            {Object.entries(groupedProcedures).map(([category, procs]) => (
              <div key={category}>
                <div className="px-4 py-2 bg-gray-50 text-sm font-medium text-gray-600">
                  {category}
                </div>
                {procs.map(proc => (
                  <button
                    key={proc.name}
                    onClick={() => setSelectedProcedure(proc)}
                    className={`w-full px-4 py-3 flex items-center justify-between hover:bg-blue-50 transition-colors text-left ${
                      selectedProcedure?.name === proc.name ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div>
                      <div className="text-gray-900">{proc.name}</div>
                      {proc.notes && (
                        <div className="text-xs text-gray-500">{proc.notes}</div>
                      )}
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${riskColors[proc.bleedingRisk]}`}>
                      {riskLabels[proc.bleedingRisk]}
                    </span>
                  </button>
                ))}
              </div>
            ))}
            {filteredProcedures.length === 0 && (
              <div className="px-4 py-8 text-center text-gray-500">
                No procedures found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">
              {selectedProcedure ? 'Medication Recommendations' : 'Select a Procedure'}
            </h2>
          </div>
          
          {selectedProcedure ? (
            <div className="divide-y divide-gray-100">
              {/* Selected procedure info */}
              <div className="p-4 bg-blue-50">
                <div className="font-medium text-gray-900">{selectedProcedure.name}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${riskColors[selectedProcedure.bleedingRisk]}`}>
                    {riskLabels[selectedProcedure.bleedingRisk]} Procedure
                  </span>
                </div>
              </div>

              {/* Medication recommendations */}
              <div className="max-h-80 overflow-y-auto">
                {Object.entries(groupedMedications).map(([category, meds]) => (
                  <div key={category} className="border-b border-gray-100 last:border-0">
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full px-4 py-2 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
                    >
                      <span className="font-medium text-gray-700">{category}</span>
                      {expandedCategories.has(category) ? (
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                    
                    {expandedCategories.has(category) && (
                      <div className="divide-y divide-gray-50">
                        {meds.map(med => {
                          const recommendation = med[selectedProcedure.bleedingRisk]
                          return (
                            <div key={med.medication} className="px-4 py-3">
                              <div className="flex items-start justify-between gap-2">
                                <div className="font-medium text-gray-900 text-sm">
                                  {med.medication}
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                                  <span className={`font-medium ${
                                    recommendation.toLowerCase().includes('continue') 
                                      ? 'text-green-600' 
                                      : 'text-orange-600'
                                  }`}>
                                    {recommendation}
                                  </span>
                                </div>
                              </div>
                              {med.notes && (
                                <div className="flex items-start gap-1 mt-1 text-xs text-gray-500">
                                  <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                  {med.notes}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Pill className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p>Select a procedure from the list to see medication recommendations</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Reference */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Quick Reference: Bleeding Risk Categories</h2>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="font-medium text-green-800 mb-2">Low Risk</div>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Venous access procedures</li>
              <li>• Thoracentesis/paracentesis</li>
              <li>• Superficial biopsies</li>
              <li>• Catheter exchanges</li>
            </ul>
          </div>
          <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="font-medium text-yellow-800 mb-2">Moderate Risk</div>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Angiography</li>
              <li>• New drain placements</li>
              <li>• Lung biopsy</li>
              <li>• Vertebroplasty</li>
            </ul>
          </div>
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="font-medium text-red-800 mb-2">High Risk</div>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Liver/kidney biopsy</li>
              <li>• Ablations</li>
              <li>• TIPS</li>
              <li>• Complex biliary work</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Source Reference */}
      <div className="text-center text-sm text-gray-500">
        <p>
          Primary Reference: Hadi M, Walker C, Desborough M, et al. CIRSE Standards of Practice on Peri-operative Anticoagulation Management During Interventional Radiology Procedures. <em>Cardiovasc Intervent Radiol</em>. 2021;44(4):523-536.
        </p>
        <a 
          href="https://pubmed.ncbi.nlm.nih.gov/33474606/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 mt-1"
        >
          View on PubMed <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}
