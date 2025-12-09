// EBIR MCQ Question Bank - Premium Edition
// High-yield questions aligned with EBIR examination standards

export interface MCQQuestion {
  id: string
  section: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
  sectionTitle: string
  subsection: string
  question: string
  options: string[]
  correctAnswers: number[]
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  examFrequency?: 'high' | 'medium' | 'low'
}

export const sectionInfo = {
  A: { letter: 'A', title: 'Fundamental Topics in Interventional Radiology', color: 'purple' },
  B: { letter: 'B', title: 'Vascular Diagnosis and Intervention', color: 'blue' },
  C: { letter: 'C', title: 'Non-vascular Interventions (Chest, GI, Hepatobiliary)', color: 'green' },
  D: { letter: 'D', title: 'Genito-urinary Tract and Renal Transplants', color: 'orange' },
  E: { letter: 'E', title: 'Musculoskeletal System Intervention', color: 'pink' },
  F: { letter: 'F', title: 'Interventional Oncology', color: 'red' },
}

export const mcqQuestions: MCQQuestion[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION A: Fundamental Topics in Interventional Radiology
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'A001',
    section: 'A',
    sectionTitle: 'Fundamental Topics in IR',
    subsection: 'Anticoagulation Management',
    question: 'A patient on warfarin requires an elective renal biopsy. The INR is 2.8. According to CIRSE guidelines, what is the recommended approach?',
    options: [
      'Proceed immediately as INR < 3.0 is acceptable for this procedure',
      'Stop warfarin 5 days before and check INR is ≤1.5 before proceeding',
      'Administer vitamin K 10mg IV and proceed the same day',
      'Bridge with therapeutic LMWH until 12 hours before the procedure'
    ],
    correctAnswers: [1],
    explanation: `Renal biopsy is classified as a HIGH bleeding risk procedure by CIRSE (2012 guidelines, updated 2019).

HIGH-YIELD FACTS:
• Target INR for high-risk procedures: ≤1.5
• Warfarin cessation: 5 days pre-procedure (half-life ~40 hours, need 5 half-lives)
• INR check: Day of procedure, ideally morning of
• Bridging therapy: Only for HIGH thromboembolic risk patients (mechanical mitral valve, recent VTE <3 months, CHA₂DS₂-VASc ≥7)

CIRSE BLEEDING RISK CATEGORIES:
• Low risk: Venography, IVC filter, PICC → INR ≤2.0 acceptable
• Moderate risk: Angioplasty, uterine fibroid embolization → INR ≤1.5
• High risk: Renal biopsy, nephrostomy, TIPS → INR ≤1.5, PLT >50,000

Vitamin K reversal takes 12-24 hours orally, 6-8 hours IV—not suitable for same-day procedures.`,
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'A002',
    section: 'A',
    sectionTitle: 'Fundamental Topics in IR',
    subsection: 'Contrast Media & Nephrotoxicity',
    question: 'Which of the following patients has the HIGHEST risk for post-contrast acute kidney injury (PC-AKI)?',
    options: [
      'eGFR 55 mL/min, diabetic, intravenous contrast administration',
      'eGFR 35 mL/min, non-diabetic, intra-arterial contrast with first-pass renal exposure',
      'eGFR 45 mL/min, diabetic, on metformin',
      'eGFR 60 mL/min, multiple myeloma, intravenous contrast'
    ],
    correctAnswers: [1],
    explanation: `PC-AKI risk is determined by eGFR threshold AND route of administration (ESUR 2018 guidelines).

HIGH-YIELD FACTS:
• IV contrast: Risk threshold eGFR <30 mL/min
• IA contrast with 1st-pass renal exposure: Risk threshold eGFR <45 mL/min
• IA contrast without 1st-pass (e.g., cerebral): Same as IV, eGFR <30

The patient with eGFR 35 + intra-arterial first-pass exposure crosses BOTH thresholds—highest risk.

RISK FACTORS FOR PC-AKI:
• eGFR <30 (IV) or <45 (IA first-pass)
• Diabetes mellitus (additive, not independent)
• Dehydration
• Nephrotoxic drugs (NSAIDs, aminoglycosides)
• High contrast volume (keep <1.5 × eGFR in mL)

METFORMIN MYTH: Metformin itself doesn't cause PC-AKI. Concern is metformin accumulation IF AKI occurs → lactic acidosis. Current guidelines: only stop if eGFR <30 or high-risk procedure.

Multiple myeloma: Previously thought high-risk, now considered safe with adequate hydration if no renal impairment.`,
    difficulty: 'hard',
    examFrequency: 'high'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION B: Vascular Diagnosis and Intervention
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'B001',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Aortic Intervention',
    question: 'A 72-year-old male with a 6.2 cm infrarenal AAA is evaluated for EVAR. CT shows a 22mm infrarenal neck length, 28mm neck diameter, and 65° angulation. Which factor is OUTSIDE standard IFU criteria for most devices?',
    options: [
      'Infrarenal neck length of 22mm',
      'Neck diameter of 28mm',
      'Neck angulation of 65°',
      'All parameters are within standard IFU'
    ],
    correctAnswers: [2],
    explanation: `Standard EVAR IFU criteria have specific anatomical requirements. Neck angulation <60° is generally acceptable, but 65° approaches limits for some devices.

HIGH-YIELD IFU CRITERIA (know these!):
• Neck length: ≥15mm (most devices), ≥10mm for some newer devices
• Neck diameter: 18-32mm (device dependent)
• Neck angulation: ≤60° (infrarenal), ≤45° (suprarenal)
• Iliac diameter: 7-25mm (access), ≤20mm (landing zone)
• Iliac angulation: <90°

The 45° angulation is AT the suprarenal limit and approaching infrarenal limits for many devices—this is the concerning parameter.

HOSTILE NECK FEATURES (Type Ia endoleak risk):
• Short neck (<15mm)
• Angulated neck (>60°)
• Conical neck (>10% diameter increase over 15mm)
• Circumferential thrombus/calcification >50%
• Reverse taper

DEVICE-SPECIFIC PEARLS:
• Endurant II/IIs: Neck ≥10mm, angle ≤75°
• Excluder: Neck ≥15mm, angle ≤60°
• Zenith: Neck ≥15mm with active fixation`,
    difficulty: 'hard',
    examFrequency: 'high'
  },
  {
    id: 'B002',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Peripheral Arterial Disease',
    question: 'According to the TASC II classification, which femoropopliteal lesion is classified as TASC D?',
    options: [
      'Single stenosis ≤10 cm',
      'Chronic total occlusion of the CFA or SFA >20 cm involving the popliteal artery',
      'Multiple stenoses each ≤5 cm',
      'Single occlusion ≤5 cm'
    ],
    correctAnswers: [1],
    explanation: `TASC II (2007) classifies femoropopliteal lesions to guide endovascular vs surgical management.

TASC FEMOROPOPLITEAL CLASSIFICATION:

TASC A (Endovascular preferred):
• Single stenosis ≤10 cm
• Single occlusion ≤5 cm

TASC B (Endovascular preferred, good results):
• Multiple stenoses/occlusions each ≤5 cm
• Single stenosis/occlusion ≤15 cm not involving popliteal
• Heavily calcified occlusion ≤5 cm
• Single popliteal stenosis

TASC C (Surgery preferred, endovascular possible):
• Multiple stenoses/occlusions >15 cm total
• Recurrent stenoses after two endovascular attempts

TASC D (Surgery preferred):
• CTO of CFA or SFA >20 cm involving popliteal
• CTO of popliteal and proximal trifurcation

PRACTICE PEARL: Modern endovascular techniques have shifted management—many TASC C/D lesions now treated endovascularly with acceptable results. BASIL trial showed equivalent 2-year outcomes for CLI patients suitable for both.

Remember: TASC was updated to Global Vascular Guidelines (GVG) 2019, introducing GLASS classification for CLI.`,
    difficulty: 'medium',
    examFrequency: 'high'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION C: Non-vascular Interventions
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'C001',
    section: 'C',
    sectionTitle: 'Non-vascular Interventions',
    subsection: 'Hepatobiliary Intervention',
    question: 'A patient with malignant hilar obstruction (Bismuth-Corlette IIIa) requires biliary drainage. What is the optimal drainage strategy?',
    options: [
      'Single right-sided PTBD draining right anterior and posterior sectors',
      'Left-sided PTBD alone as it drains more liver volume',
      'Bilateral PTBD draining both right and left systems',
      'Right-sided PTBD draining the right system (>50% liver volume)'
    ],
    correctAnswers: [3],
    explanation: `Bismuth-Corlette IIIa involves the confluence extending into the RIGHT hepatic duct. The LEFT system remains intact.

BISMUTH-CORLETTE CLASSIFICATION:
• Type I: Below confluence (CHD)
• Type II: At confluence (blocks both R & L)
• Type IIIa: Confluence + RIGHT hepatic duct
• Type IIIb: Confluence + LEFT hepatic duct
• Type IV: Both R & L ducts OR multifocal

DRAINAGE STRATEGY PRINCIPLES:
1. Drain ≥50% of functional liver volume
2. Drain the side that will NOT be resected (if surgery planned)
3. Avoid contaminating undrained segments (cholangitis risk!)

FOR TYPE IIIa:
• Right system is blocked/invaded
• Left system is INTACT → drains naturally to duodenum if stented
• RIGHT-sided drainage is optimal—drains the obstructed side (>50% liver)
• Avoid left-sided PTBD as left system is not obstructed

TECHNICAL PEARL: If bilateral drainage needed, avoid crossing the tumor at hilum—use separate accesses. Metal stents: use uncovered at hilum (covered stents occlude side branches).

Volume estimation: Right liver ~60%, Left liver ~40% (segment IV contributes ~20% to left).`,
    difficulty: 'hard',
    examFrequency: 'high'
  },
  {
    id: 'C002',
    section: 'C',
    sectionTitle: 'Non-vascular Interventions',
    subsection: 'Chest Intervention',
    question: 'A 45-year-old patient has a moderate-sized pleural effusion. What is the recommended maximum volume to drain in a single session to minimize re-expansion pulmonary edema (RPE)?',
    options: [
      '500 mL',
      '1000 mL',
      '1500 mL',
      '2000 mL'
    ],
    correctAnswers: [2],
    explanation: `Re-expansion pulmonary edema (RPE) is a potentially fatal complication of rapid pleural drainage.

HIGH-YIELD FACTS ON RPE:
• Recommended limit: 1000-1500 mL per session
• BTS guidelines suggest <1500 mL at first drainage
• Stop if: chest tightness, persistent cough, or pleural pressure <-20 cmH₂O

RISK FACTORS FOR RPE:
• Large volume drainage (>1500 mL)
• Rapid drainage
• Chronic effusion/collapse (>7 days)
• Young patients (more compliant lung → faster re-expansion)
• Application of negative suction

PATHOPHYSIOLOGY:
• Chronically collapsed lung has damaged capillary endothelium
• Rapid re-expansion → increased permeability → protein-rich edema
• Usually unilateral, ipsilateral to drained side
• Onset: within 24 hours of drainage

PREVENTION STRATEGIES:
• Limit to 1500 mL per session
• Use gravity drainage, not wall suction initially
• Monitor pleural pressure (manometry)
• Stop if symptomatic
• If large effusion: staged drainage over days

TREATMENT: Supportive—oxygen, diuretics if needed. Severe cases may require ventilation. Mortality ~20% in severe cases.`,
    difficulty: 'medium',
    examFrequency: 'medium'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION D: Genito-urinary Tract and Renal Transplants
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'D001',
    section: 'D',
    sectionTitle: 'Genito-urinary Tract and Renal Transplants',
    subsection: 'Renal Transplant Intervention',
    question: 'A renal transplant patient presents 3 months post-transplant with rising creatinine. Ultrasound shows elevated resistive indices (RI 0.85) and tardus parvus waveform. What is the most likely diagnosis?',
    options: [
      'Acute rejection',
      'Transplant renal artery stenosis',
      'Ureteric stricture',
      'Calcineurin inhibitor toxicity'
    ],
    correctAnswers: [1],
    explanation: `Tardus parvus waveform with elevated RI is the classic Doppler finding of transplant renal artery stenosis (TRAS).

DOPPLER FINDINGS IN TRAS:
• Tardus parvus: Delayed systolic upstroke, rounded peak
• Acceleration time >100 ms (normal <70 ms)
• Acceleration index <3 m/s²
• RI may be elevated (>0.8) or paradoxically low in severe stenosis
• PSV at stenosis >200-250 cm/s
• PSV ratio (stenosis:pre-stenosis) >2:1

TIMING OF COMPLICATIONS:
• <1 month: Surgical (thrombosis, kink, hematoma)
• 1-6 months: TRAS, acute rejection, ureteric leak
• >6 months: TRAS, chronic rejection, ureteric stricture

WHY NOT OTHER OPTIONS:
• Acute rejection: Elevated RI but NO tardus parvus (normal arterial waveform)
• Ureteric stricture: Hydronephrosis, normal Doppler
• CNI toxicity: Normal Doppler, diagnosis by biopsy/levels

TRAS FACTS:
• Incidence: 1-23% (most 1-5%)
• Location: Usually anastomosis or within 1cm
• Treatment: PTA (first-line), stent if recoil/dissection
• Surgery if: Early post-op, failed PTA, complex anatomy

Technical success >90%, but restenosis ~10-30%.`,
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'D002',
    section: 'D',
    sectionTitle: 'Genito-urinary Tract and Renal Transplants',
    subsection: 'Percutaneous Nephrostomy',
    question: 'What is the preferred calyx for PCN access in a standard non-dilated system for antegrade ureteric stent placement?',
    options: [
      'Upper pole calyx via posterior approach',
      'Lower pole calyx via posterior approach',
      'Middle calyx via direct lateral approach',
      'Upper pole calyx via anterior approach'
    ],
    correctAnswers: [1],
    explanation: `Lower pole posterior calyx access is preferred for most PCN and antegrade procedures.

ANATOMICAL RATIONALE:
• Posterior calyces point posterolaterally at 20-30° to coronal plane
• Lower pole offers: Straight shot to UPJ/ureter, avoids crossing vessels
• Brödel's line: Relatively avascular plane between anterior and posterior divisions (posterior approach through this zone)

ACCESS SELECTION BY INDICATION:
• Standard PCN/antegrade stent: Lower pole posterior
• PCNL for lower pole stones: Lower pole posterior
• PCNL for staghorn/upper pole stones: Upper pole posterior (direct access)
• Ureteroscopy access: Lower pole (straighter path)

UPPER POLE ACCESS CONSIDERATIONS:
• Risk of pleural transgression (11th-12th rib, especially above)
• Needed for: Upper pole stones, infundibular stenosis, UPJ procedures
• Higher complication rate but sometimes necessary

TECHNICAL PEARLS:
• Ideal angle: 30° posterolateral (follows calyceal axis)
• Avoid: Anterior calyces (bowel, spleen, liver risk)
• Fluoroscopic guidance: Calyx should "open" toward you = posterior calyx
• CT guidance: For complex anatomy, malrotation, adjacent bowel

Complications: Bleeding (most common), sepsis, pleural injury, bowel injury (<0.5% with posterior approach).`,
    difficulty: 'medium',
    examFrequency: 'high'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION E: Musculoskeletal System Intervention
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'E001',
    section: 'E',
    sectionTitle: 'Musculoskeletal System Intervention',
    subsection: 'Vertebral Augmentation',
    question: 'A patient with an osteoporotic T12 compression fracture is evaluated for vertebroplasty. Which finding is a contraindication to the procedure?',
    options: [
      'Vertebral body height loss of 70%',
      'Fracture age of 3 weeks with persistent pain',
      'Retropulsion causing asymptomatic mild canal narrowing',
      'Extension of fracture into the posterior vertebral body wall'
    ],
    correctAnswers: [0],
    explanation: `Severe vertebral collapse (>65-70% height loss) is a relative contraindication due to technical difficulty and limited benefit.

CONTRAINDICATIONS TO VERTEBROPLASTY:

ABSOLUTE:
• Asymptomatic fractures
• Patient improving on medical therapy
• Osteomyelitis/active infection
• Uncorrectable coagulopathy
• Allergy to cement/components

RELATIVE:
• Severe vertebral collapse (vertebra plana, >65-70%)
• Retropulsion with neurological deficit
• Tumor extension into epidural space with cord compression
• Disruption of posterior wall (increases leak risk, not absolute CI)

WHY SEVERE COLLAPSE IS PROBLEMATIC:
• Minimal cavity for cement → inadequate fill
• Distorted anatomy → difficult needle placement
• Limited height restoration possible
• Higher cement leak risk

POSTERIOR WALL DISRUPTION:
• NOT an absolute contraindication
• Present in most burst fractures
• Requires careful technique: high-viscosity cement, controlled injection
• Monitor with real-time fluoroscopy for epidural leak

CEMENT LEAK RATES:
• Vertebroplasty: 20-70% (most asymptomatic)
• Kyphoplasty: 7-20% (balloon creates cavity)
• Clinically significant: <1-2%

Timing: Optimal at 4-6 weeks if conservative management fails. Very acute fractures (<2 weeks) may have higher leak risk.`,
    difficulty: 'medium',
    examFrequency: 'high'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SECTION F: Interventional Oncology
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'F001',
    section: 'F',
    sectionTitle: 'Interventional Oncology',
    subsection: 'Hepatic Tumor Ablation',
    question: 'A 3.5 cm HCC is located 5mm from the main portal vein. Regarding thermal ablation, which statement is correct?',
    options: [
      'Microwave ablation is contraindicated due to lack of heat-sink control',
      'Radiofrequency ablation is preferred as it has less heat-sink effect',
      'Heat-sink effect from the portal vein may lead to incomplete ablation at the tumor margin',
      'Cryoablation should be avoided near major vessels'
    ],
    correctAnswers: [2],
    explanation: `Heat-sink effect is a critical consideration for perivascular tumors—blood flow dissipates heat, causing incomplete ablation at vessel-adjacent margins.

HEAT-SINK EFFECT:
• Definition: Flowing blood carries away thermal energy
• Result: Sublethal temperatures at tumor-vessel interface
• Risk: Incomplete ablation → local tumor progression
• Significant with vessels >3mm diameter

VESSEL PROXIMITY CONSIDERATIONS:
• <5mm from major vessel: High heat-sink risk
• Portal vein: Flow ~1 L/min, significant cooling
• Hepatic veins: Less flow than PV, but still relevant
• Hepatic artery: Highest flow but smaller caliber

RFA vs MWA vs CRYO:

RFA (Radiofrequency):
• MORE susceptible to heat-sink (lower temperatures, ~60-100°C)
• Slower heating, more time for blood cooling
• Pringle maneuver can help (occludes portal flow)

MWA (Microwave):
• LESS heat-sink effect (higher temperatures, faster heating)
• Temperatures 100-150°C achieved rapidly
• Preferred for perivascular tumors
• But still affected—don't assume immunity

CRYOABLATION:
• Can be used near vessels (ice ball visible on imaging)
• Actually SAFER near major vessels (cryoadhesion protects wall)
• Disadvantage: Higher bleeding risk post-thaw

STRATEGIES FOR PERIVASCULAR TUMORS:
• Use MWA over RFA
• Pringle maneuver (temporary portal occlusion)
• Balloon occlusion of hepatic vein
• Multiple overlapping ablations
• Accept higher LTP risk and close follow-up`,
    difficulty: 'hard',
    examFrequency: 'high'
  },
]

// Helper functions
export function getQuestionsBySection(section: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'): MCQQuestion[] {
  return mcqQuestions.filter(q => q.section === section)
}

export function getQuestionsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): MCQQuestion[] {
  return mcqQuestions.filter(q => q.difficulty === difficulty)
}

export function getHighYieldQuestions(): MCQQuestion[] {
  return mcqQuestions.filter(q => q.examFrequency === 'high')
}

export function getRandomQuestions(count: number, section?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'): MCQQuestion[] {
  let questions = section ? getQuestionsBySection(section) : [...mcqQuestions]
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]]
  }
  return questions.slice(0, Math.min(count, questions.length))
}

export function getSectionStats() {
  const stats: Record<string, { total: number; byDifficulty: Record<string, number> }> = {}
  for (const section of ['A', 'B', 'C', 'D', 'E', 'F'] as const) {
    const sectionQuestions = getQuestionsBySection(section)
    stats[section] = {
      total: sectionQuestions.length,
      byDifficulty: {
        easy: sectionQuestions.filter(q => q.difficulty === 'easy').length,
        medium: sectionQuestions.filter(q => q.difficulty === 'medium').length,
        hard: sectionQuestions.filter(q => q.difficulty === 'hard').length,
      }
    }
  }
  return stats
}
