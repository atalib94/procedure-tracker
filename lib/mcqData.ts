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
  {
    id: 'B003',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Carotid Intervention',
    question: 'A patient undergoes carotid artery stenting for a symptomatic 80% ICA stenosis. Thirty seconds after stent deployment, the patient becomes bradycardic (HR 38) and hypotensive (BP 70/40). What is the most appropriate immediate management?',
    options: [
      'Immediate stent retrieval',
      'Atropine 0.5-1mg IV and IV fluids',
      'Emergent carotid endarterectomy',
      'High-dose vasopressor infusion and ICU transfer'
    ],
    correctAnswers: [1],
    explanation: `This is classic carotid sinus hypersensitivity/baroreceptor reflex—the most common hemodynamic complication of CAS.
MECHANISM:
• Stent expansion stretches carotid bulb baroreceptors
• Baroreceptors interpret this as "hypertension"
• Vagal response: bradycardia + vasodilation → hypotension
• Usually self-limiting (minutes to hours), but can persist days
MANAGEMENT ALGORITHM:
• Atropine 0.5-1mg IV (repeat up to 3mg) for bradycardia
• IV fluid bolus for hypotension
• If refractory: glycopyrrolate, vasopressors (phenylephrine)
• Rarely: temporary pacing for persistent bradycardia
PREVENTION STRATEGIES:
• Pre-procedure atropine (controversial, some centers routine)
• Minimize balloon inflation time
• Avoid excessive post-dilation
• Glycopyrrolate prophylaxis in high-risk patients
RISK FACTORS FOR HEMODYNAMIC INSTABILITY:
• Calcified plaque at carotid bulb
• Bilateral carotid stenosis
• Recent contralateral CEA
• Pre-existing cardiac conduction abnormalities
• Lesion at carotid bulb (vs distal ICA)
POST-CAS HYPOTENSION:
• Occurs in 20-40% of patients
• Usually resolves within 24 hours
• Hold antihypertensives, liberalize fluids
• Persistent >24h: consider autonomic dysfunction`,
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'B004',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Venous Intervention',
    question: 'A 32-year-old male presents with acute left iliofemoral DVT, symptoms for 3 days. Which finding would EXCLUDE him from catheter-directed thrombolysis according to most guidelines?',
    options: [
      'Symptom duration of 3 days',
      'INR of 1.8 on warfarin therapy',
      'Ischemic stroke 6 weeks ago',
      'Active peptic ulcer disease with recent bleeding'
    ],
    correctAnswers: [3],
    explanation: `Active bleeding or high bleeding risk conditions are absolute contraindications to thrombolysis.
ABSOLUTE CONTRAINDICATIONS TO CDT/PCDT:
• Active internal bleeding
• Recent (<3 months) intracranial hemorrhage
• Recent (<3 months) ischemic stroke
• Intracranial neoplasm, AVM, or aneurysm
• Recent major surgery/trauma (<10 days)
• Active peptic ulcer with recent bleeding ← CORRECT ANSWER
WHY ACTIVE BLEEDING TRUMPS OTHER RISKS:
• Both stroke at 6 weeks and active PUD are concerning
• However, active bleeding is an ABSOLUTE contraindication
• You cannot lyse someone who is actively bleeding
RELATIVE CONTRAINDICATIONS:
• Recent major surgery (10-14 days)
• Stroke 3-6 months ago
• Pregnancy
• Severe hypertension (>180/110)
• CPR within 10 days
• INR >1.7 (can be corrected)
IDEAL CDT CANDIDATE:
• Iliofemoral DVT (proximal)
• Symptom onset <14-21 days (fresher = better lysis)
• Low bleeding risk
• Good functional status
• Life expectancy >1 year
ATTRACT TRIAL NOTE:
• Showed no difference in PTS at 24 months for all-comers
• Subgroup with iliofemoral DVT may benefit`,
    difficulty: 'hard',
    examFrequency: 'high'
  },
  {
    id: 'B005',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Aortic Intervention',
    question: 'A patient presents with a Stanford Type B aortic dissection. Which feature indicates a "complicated" dissection requiring urgent intervention?',
    options: [
      'Maximum aortic diameter of 4.2 cm',
      'Patent false lumen with partial thrombosis',
      'Refractory hypertension despite two antihypertensive agents',
      'Malperfusion syndrome with acute limb ischemia'
    ],
    correctAnswers: [3],
    explanation: `Malperfusion syndrome is a COMPLICATED Type B dissection requiring urgent/emergent intervention.
COMPLICATED VS UNCOMPLICATED TYPE B:
COMPLICATED (urgent intervention needed):
• Malperfusion: limb, renal, mesenteric, spinal cord
• Rupture or impending rupture
• Refractory pain despite adequate analgesia
• Refractory hypertension despite adequate medical therapy
• Rapid aortic expansion (>1 cm/year or >5mm in acute phase)
UNCOMPLICATED:
• Medical management first-line
• Strict BP control: SBP 100-120 mmHg
• Heart rate control: <60 bpm (reduces dP/dt)
• Beta-blockers first, then add vasodilators
MALPERFUSION MECHANISMS:
• Dynamic: True lumen collapse, flap occludes branch
• Static: Dissection extends into branch vessel
• Mixed: Combination
TEVAR FOR COMPLICATED TYPE B:
• Cover primary entry tear
• Restore true lumen flow
• Technical success >95%
• In-hospital mortality: 10-20% (complicated) vs 1-3% (uncomplicated medical)
PARTIAL FALSE LUMEN THROMBOSIS:
• Actually WORSE prognosis than patent or fully thrombosed
• Indicates poor outflow → expansion risk
• Consider early TEVAR even if "uncomplicated"`,
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'B006',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Dialysis Access',
    question: 'A patient with a brachiocephalic AVF has a stenosis at the cephalic arch. After PTA, there is >30% residual stenosis with elastic recoil. What is the recommended next step?',
    options: [
      'Repeat PTA with prolonged inflation (3 minutes)',
      'Cutting balloon angioplasty',
      'Stent graft placement',
      'Surgical transposition to basilic vein'
    ],
    correctAnswers: [2],
    explanation: `Cephalic arch stenosis is notoriously resistant to PTA alone—stent grafts have become the preferred treatment for refractory lesions.
CEPHALIC ARCH STENOSIS:
• Location: Where cephalic vein arches over to join axillary/subclavian
• Incidence: 30-40% of brachiocephalic AVFs
• Cause: Turbulent flow, external compression by clavicle/pectoralis
• Highly recurrent after PTA alone (3-6 month patency ~50%)
TREATMENT ALGORITHM:
1. PTA first (standard or high-pressure balloon)
2. If elastic recoil (>30% residual) or early recurrence → Stent graft preferred
3. Cutting/scoring balloon: For fibrotic lesions, neointimal hyperplasia
4. Drug-coated balloon: Emerging evidence, may reduce restenosis
WHY STENT GRAFT > BARE METAL:
• ACSVENT trial: Stent graft superior patency
• Bare metal: 50-60% neointimal ingrowth/restenosis
• Covered stent: Acts as barrier, 6-month patency >80%
TECHNICAL CONSIDERATIONS:
• Stent should not protrude into subclavian (affects future access)
• Size for 10-20% oversizing
• Post-dilate to nominal pressure
SURGICAL OPTIONS:
• Basilic vein transposition (if suitable vein)
• Brachioaxillary graft
• Reserved for: Failed endovascular, no remaining targets
KDOQI: Maintain fistula first approach, exhaust endovascular options before abandoning access.`,
    difficulty: 'hard',
    examFrequency: 'high'
  },
  {
    id: 'B007',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Mesenteric Intervention',
    question: 'A patient with chronic mesenteric ischemia has >70% stenoses of both the celiac axis and SMA. What is the recommended revascularization strategy?',
    options: [
      'Treat SMA only as it is the dominant supply',
      'Treat celiac axis only to preserve hepatic perfusion',
      'Treat both vessels to reduce restenosis-related recurrence',
      'Medical management with vasodilators is sufficient'
    ],
    correctAnswers: [2],
    explanation: `Multi-vessel revascularization is recommended when feasible to provide redundancy and reduce symptom recurrence.
CHRONIC MESENTERIC ISCHEMIA (CMI):
• Classic triad: Postprandial pain, food fear, weight loss
• Requires stenosis of ≥2 of 3 vessels (celiac, SMA, IMA) typically
• Single-vessel stenosis rarely symptomatic due to collaterals
MULTI-VESSEL TREATMENT RATIONALE:
• Collateral-dependent circulation in CMI
• Single-vessel treatment: Higher recurrence (30-40% at 3 years)
• Dual-vessel treatment: Provides "backup" if one vessel restenoses
• Reduces ischemia-related symptoms and acute-on-chronic events
ORDER OF PRIORITY:
1. SMA (most critical for small bowel)
2. Celiac axis (foregut, liver)
3. IMA (usually via collaterals, less commonly treated)
ENDOVASCULAR VS SURGICAL:
• Endovascular: First-line, lower morbidity
• Patency: 60-80% at 3 years (bare metal stent)
• Covered stents: Emerging data, may improve patency
• Surgery: For failed endovascular, complex anatomy
• Surgical bypass: Superior patency but higher morbidity
TECHNICAL TIPS:
• Embolic protection controversial (plaque usually fibrotic)
• Stent from ostium (don't miss the lesion!)
• Covered stent for ostial calcified lesions
CELIAC COMPRESSION (MALS):
• External compression by median arcuate ligament
• Treat surgically (release ligament) ± stent
• Stenting alone has high restenosis due to external compression`,
    difficulty: 'medium',
    examFrequency: 'medium'
  },
  {
    id: 'B008',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Peripheral Arterial Disease',
    question: 'Which of the following is the PRIMARY indication for below-the-knee (BTK) intervention in a patient with peripheral arterial disease?',
    options: [
      'Lifestyle-limiting claudication with TASC A tibial lesions',
      'Chronic limb-threatening ischemia with tissue loss (Rutherford 5)',
      'Asymptomatic >70% tibial artery stenosis',
      'Acute limb ischemia Rutherford IIa'
    ],
    correctAnswers: [1],
    explanation: `BTK intervention is primarily indicated for chronic limb-threatening ischemia (CLTI), NOT claudication.
PRIMARY INDICATION:
• CLTI with tissue loss (Rutherford 5-6, Fontaine IV)
• Ischemic rest pain (Rutherford 4, Fontaine III)
• Goal: Limb salvage, wound healing
NOT INDICATED:
• Claudication (even severe): BTK vessels rarely limit walking
• Asymptomatic disease: No benefit, risks of intervention
• Claudication is an ABOVE-knee problem (aortoiliac, fem-pop)
WHY CLAUDICANTS DON'T BENEFIT FROM BTK:
• Claudication = exercise-induced supply/demand mismatch
• Occurs at large vessel level (thigh/calf muscles)
• BTK disease causes critical ischemia at rest, not claudication
• Exercise programs help claudication, not BTK stenting
CLTI-SPECIFIC CONSIDERATIONS:
• GLASS classification: Infrainguinal staging for CLTI
• Target: "Wound-directed" angiosome revascularization
• Direct flow to wound via appropriate tibial vessel
• Indirect revascularization via collaterals if direct not possible
ACUTE LIMB ISCHEMIA:
• Rutherford IIa: Threatened, salvageable with prompt treatment
• Usually requires thrombectomy/thrombolysis first
• Address underlying lesion after flow restored
• Different pathway than CLTI management
WOUND HEALING REQUIREMENTS:
• Toe pressure >30 mmHg or TcPO2 >30 mmHg
• Inline flow to foot (at least one tibial vessel)
• ~80% limb salvage with successful revascularization`,
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'B009',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Pulmonary Embolism',
    question: 'A patient with massive PE (sustained hypotension, RV dysfunction) has an absolute contraindication to systemic thrombolysis. Which intervention is most appropriate?',
    options: [
      'IVC filter placement and anticoagulation alone',
      'Catheter-directed therapy with mechanical thrombectomy',
      'Surgical embolectomy only if catheter therapy fails',
      'High-dose UFH with no interventional therapy'
    ],
    correctAnswers: [1],
    explanation: `Catheter-directed therapy (CDT) is the preferred option for massive PE when systemic thrombolysis is contraindicated.
MASSIVE PE DEFINITION:
• Sustained hypotension: SBP <90 for ≥15 min or requiring pressors
• Pulselessness or persistent profound bradycardia
• High mortality: 30-50% short-term without treatment
TREATMENT ALGORITHM:
IF NO CONTRAINDICATION:
• Systemic thrombolysis first-line (alteplase 100mg/2h)
IF SYSTEMIC LYSIS CONTRAINDICATED:
• Catheter-directed therapy (CDT)
• Catheter-directed thrombolysis: Low-dose tPA (20-24mg over 12-24h)
• Pharmacomechanical thrombectomy
• Aspiration thrombectomy (FlowTriever, Indigo)
• Reduces systemic lytic exposure → lower bleeding risk
• Surgical embolectomy: If CDT unavailable or fails
CDT OPTIONS:
ULTRASOUND-ASSISTED (EKOS):
• ULTIMA, SEATTLE II trials
• 20-24mg tPA over 12-24h (vs 100mg systemic)
• Ultrasound theoretically enhances clot penetration
ASPIRATION THROMBECTOMY:
• FlowTriever (FLARE trial): No lytic needed
• Large bore catheter, mechanical aspiration
• Emerging: May become first-line
IVC FILTER ROLE:
• Adjunct, not treatment for massive PE
• Consider if: Recurrent PE despite anticoagulation
• Does NOT treat the existing PE
SUBMASSIVE PE:
• Intermediate-risk, RV dysfunction but hemodynamically stable
• Anticoagulation first-line, CDT selectively`,
    difficulty: 'hard',
    examFrequency: 'high'
  },
  {
    id: 'B010',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Trauma Intervention',
    question: 'A hemodynamically unstable patient with blunt abdominal trauma has a CT showing a Grade IV splenic laceration with active extravasation. What is the most appropriate management?',
    options: [
      'Immediate splenectomy without angiography',
      'Splenic artery embolization with coils at the hilum (proximal)',
      'Non-operative management with close observation',
      'Distal splenic artery embolization with particles'
    ],
    correctAnswers: [0],
    explanation: `Hemodynamically UNSTABLE patients with high-grade splenic injury require SURGERY, not embolization.
HEMODYNAMIC STATUS IS KEY:
UNSTABLE PATIENT (SBP <90, non-responder to resuscitation):
• Immediate surgery: Splenectomy or splenorrhaphy
• No time for angiography—patient won't survive the delay
• "Damage control" principles apply
STABLE OR TRANSIENT RESPONDER:
• Angiography with embolization is appropriate
• EAST guidelines: Embolization for contrast extravasation, high-grade injury
SPLENIC INJURY GRADING (AAST):
• Grade I-II: Subcapsular hematoma <50%, laceration <3cm
• Grade III: Subcapsular >50%, parenchymal >5cm
• Grade IV: Laceration involving segmental vessels, >25% devascularization
• Grade V: Shattered spleen, hilar vascular injury
EMBOLIZATION TECHNIQUES (for stable patients):
PROXIMAL (Main splenic artery):
• Reduces perfusion pressure to entire spleen
• Allows collateral flow to maintain splenic function
• Preferred for: Diffuse injury, multiple sites
DISTAL (Selective, superselective):
• Targets specific bleeding site
• Preserves more splenic function
• Preferred for: Focal injury, pseudoaneurysm
COMPLICATIONS OF SPLENIC EMBOLIZATION:
• Splenic infarction (20-30%)
• Abscess (3-5%)
• Post-embolization syndrome (fever, pain)
POST-SPLENECTOMY:
• Vaccinations: Pneumococcal, meningococcal, H. influenzae
• OPSI risk: Overwhelming post-splenectomy infection`,
    difficulty: 'hard',
    examFrequency: 'medium'
  },
  {
    id: 'B011',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Endoleak Management',
    question: 'A surveillance CT 6 months post-EVAR shows an enlarging aneurysm sac with contrast seen arising from a lumbar artery. No other source identified. What type of endoleak is this and what is the initial management?',
    options: [
      'Type I endoleak; urgent proximal extension cuff',
      'Type II endoleak; observation if sac enlargement <5mm',
      'Type II endoleak; intervention required given sac enlargement',
      'Type III endoleak; relining of the stent graft'
    ],
    correctAnswers: [2],
    explanation: `Type II endoleak from lumbar artery with sac ENLARGEMENT requires intervention—observation is only appropriate if the sac is stable/shrinking.
ENDOLEAK CLASSIFICATION:
TYPE I: Attachment site leak
• Ia: Proximal seal zone
• Ib: Distal seal zone
• HIGH pressure, requires urgent treatment
• Treatment: Extension cuffs, Palmaz stent, conversion
TYPE II: Branch vessel retrograde flow
• From lumbar arteries, IMA
• LOW pressure system
• Most common type (20-30%)
• Management depends on SAC BEHAVIOR
TYPE III: Graft defect
• IIIa: Junctional separation
• IIIb: Fabric tear/hole
• HIGH pressure, requires treatment
• Treatment: Relining, bridging stent
TYPE IV: Graft porosity
• Rare with modern grafts
• Self-limiting, observed
TYPE II MANAGEMENT ALGORITHM:
SAC STABLE OR SHRINKING:
• Observation with surveillance
• Most (>50%) resolve spontaneously
SAC ENLARGING:
• Intervention indicated
• Options: Transarterial embolization (SMA→IMA, iliac→lumbar)
• Translumbar direct sac puncture and embolization
• Transcaval approach (emerging)
• Target the nidus in the sac, not just feeding vessel
• Glue/coils/thrombin to sac
PERSISTENT TYPE II AFTER EMBOLIZATION:
• Repeat embolization, different approach
• Laparoscopic ligation
• Open sac evacuation (rare, last resort)`,
    difficulty: 'hard',
    examFrequency: 'high'
  },
  {
    id: 'B012',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Vascular Access',
    question: 'A patient requires TAVI via transfemoral approach. CT shows a minimum iliofemoral diameter of 5.0mm, severe calcification at the external iliac origin, and significant vessel tortuosity. Which factor is the MOST prohibitive for transfemoral access?',
    options: [
      'Minimum vessel diameter of 5.0mm',
      'Severe calcification at the external iliac origin ("front wall" pattern)',
      'Significant iliofemoral tortuosity',
      'All factors equally prohibitive'
    ],
    correctAnswers: [0],
    explanation: `Vessel DIAMETER is the most critical factor for transfemoral TAVI access—5.0mm is too small for current delivery systems.
TRANSFEMORAL TAVI ACCESS REQUIREMENTS:
MINIMUM DIAMETER:
• Current generation valves: 5.0-6.5mm minimum (device-specific)
• Edwards SAPIEN 3: 5.5mm (14F) to 6.5mm (16F eSheath)
• Medtronic Evolut: 5.0mm (14F inline sheath)
• 5.0mm is borderline/prohibitive for MOST devices
CALCIFICATION CONSIDERATIONS:
• "Front wall" (anterior): HIGHER risk—against the sheath
• "Back wall" (posterior): Lower risk
• Circumferential ("horse shoe"): HIGHEST risk
• Severe calcification + small vessel = highest complication rate
• Can often navigate with care, buddy wire, calcification modification
TORTUOSITY:
• Moderate: Usually navigable with stiff wire, sheath support
• Severe (>90° angle): Challenging but not absolute CI
• Can be addressed with: Buddy wire, longer sheath, pre-dilation
• "Straightens out" with stiff wire
RISK HIERARCHY FOR COMPLICATIONS:
1. Small diameter (most prohibitive—cannot pass sheath)
2. Severe calcification + small diameter
3. Extreme tortuosity
4. Calcification alone (manageable)
ALTERNATIVES IF TF NOT SUITABLE:
• Transaxillary/subclavian
• Transcarotid
• Transcaval
• Transapical (less common now)
• Direct aortic
ILIOFEMORAL COMPLICATIONS:
• Occur in 5-15% of TF-TAVI
• Include: Dissection, rupture, thrombosis, pseudoaneurysm
• Covered stent bailout essential to have available`,
    difficulty: 'hard',
    examFrequency: 'medium'
  },

  {
    id: 'B013',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Aortic Intervention',
    question: 'A 68-year-old male undergoes EVAR for a 5.8cm infrarenal AAA. Post-procedure angiography shows brisk contrast filling the aneurysm sac from the proximal attachment site. What is the most appropriate immediate management?',
    options: [
      'Observe and repeat CT in 1 month',
      'Balloon molding of the proximal seal zone',
      'Immediate conversion to open repair',
      'Coil embolization of the sac'
    ],
    correctAnswers: [1],
    explanation: `Type Ia endoleak identified intra-procedurally should be treated immediately—balloon molding is the first-line intervention.
TYPE Ia ENDOLEAK:
- Definition: Inadequate seal at proximal attachment site
- HIGH-PRESSURE, HIGH-FLOW leak
- Continued aneurysm pressurization → rupture risk
- Must be treated before leaving the OR
INTRA-OPERATIVE MANAGEMENT ALGORITHM:
1. Balloon molding (compliant balloon at proximal neck) — FIRST STEP
2. Proximal extension cuff if molding fails
3. Palmaz stent (balloon-expandable) for persistent leak
4. Endostaples/EndoAnchors for hostile necks
5. Chimney/snorkel if renal coverage needed
6. Conversion to open ONLY if all else fails
WHY BALLOON MOLDING FIRST:
- Often the graft just needs better apposition
- Quick, low-risk, no additional hardware
- Success rate ~50-70% for minor leaks
- If fails, proceed to cuff/stent
WHEN TO USE PROXIMAL CUFF:
- Inadequate seal zone length
- Neck dilation post-deployment
- Persistent leak after molding
PALMAZ STENT INDICATIONS:
- Refractory leak after cuff
- Type Ia with Type III component
- Provides radial force for sealing
RISK FACTORS FOR TYPE Ia:
- Short neck (<15mm)
- Angulated neck (>60°)
- Conical neck
- Thrombus/calcification in seal zone
- Undersized device`,
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'B014',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Lower Extremity Venous',
    question: 'A patient with chronic iliofemoral venous obstruction and severe post-thrombotic syndrome is evaluated for venous stenting. IVUS shows a 70% stenosis of the left common iliac vein with external compression. What is the TARGET diameter for stent sizing?',
    options: [
      'Match the diameter of the stenotic segment',
      'Match the adjacent normal vein diameter',
      '12-14mm for common iliac vein regardless of measurements',
      '16-18mm for common iliac vein, using nominal venous diameters'
    ],
    correctAnswers: [3],
    explanation: `Venous stents should be sized to NOMINAL expected diameters, not the diseased/compressed segment—common iliac vein targets 16-18mm.
VENOUS STENT SIZING PRINCIPLES:
- Veins are collapsible—measured diameter is NOT true diameter
- Chronic obstruction causes remodeling → smaller measured size
- Must restore to physiological nominal diameter
- Undersizing = early failure, thrombosis, restenosis
NOMINAL VENOUS DIAMETERS (memorize these):
- Common iliac vein: 16-18mm
- External iliac vein: 14-16mm
- Common femoral vein: 12-14mm
- Femoral vein: 10-12mm
WHY IVUS IS ESSENTIAL:
- Venography underestimates stenosis (contrast flows around)
- IVUS shows true cross-sectional area
- Identifies webs, spurs, compression
- >50% area reduction = significant stenosis
MAY-THURNER SYNDROME:
- Left CIV compression by right CIA against L5 vertebra
- Causes: DVT, chronic venous insufficiency, claudication
- IVUS finding: Spur or web at compression point
- Treatment: Stent across compression (16-18mm)
STENTING TECHNIQUE PEARLS:
- Land in healthy vein proximally and distally
- Extend into IVC if needed (1-2cm protrusion OK)
- Overlap stents by 1-2cm
- Post-dilate to nominal diameter
- Dedicated venous stents preferred (Wallstent, VENOVO, Zilver Vena)
ANTICOAGULATION POST-STENT:
- Anticoagulation 6-12 months minimum
- Some advocate indefinite for extensive disease
- Add antiplatelet if stent thrombosis concern`,
    difficulty: 'hard',
    examFrequency: 'high'
  },
  {
    id: 'B015',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Cerebrovascular',
    question: 'A patient with acute ischemic stroke and LVO is evaluated for mechanical thrombectomy. The ASPECTS score is 5. Based on current guidelines, what is the significance of this score?',
    options: [
      'Favorable for thrombectomy—proceed immediately',
      'Unfavorable—thrombectomy is contraindicated',
      'Borderline—advanced imaging (perfusion) should guide decision',
      'Not relevant—time from onset is the only factor'
    ],
    correctAnswers: [2],
    explanation: `ASPECTS 5 is borderline—advanced perfusion imaging helps identify salvageable tissue and guide thrombectomy decisions.
ASPECTS (Alberta Stroke Program Early CT Score):
- 10-point scale assessing MCA territory on NCCT
- Each region scores 1 point (normal)
- Subtract 1 for each region with early ischemic changes
- Score 10 = normal, Score 0 = complete MCA infarct
THE 10 REGIONS:
Basal ganglia level (4 regions):
- C = Caudate
- L = Lentiform nucleus
- IC = Internal capsule
- I = Insular ribbon
Supraganglionic level (6 regions):
- M1, M2, M3 = Anterior, lateral, posterior MCA cortex
- M4, M5, M6 = Same regions at higher cut
ASPECTS INTERPRETATION:
- 8-10: Small core, favorable for thrombectomy
- 6-7: Moderate core, generally favorable
- 5: Borderline—perfusion imaging recommended
- 0-4: Large core, historically excluded from trials
EVOLVING EVIDENCE (DAWN, DEFUSE-3, SELECT-2):
- Perfusion mismatch more important than ASPECTS alone
- SELECT-2: Benefit shown even with ASPECTS 3-5 if mismatch present
- Core-penumbra mismatch identifies salvageable tissue
- Extended window (6-24h) based on perfusion, not time alone
PERFUSION PARAMETERS:
- Core: CBF <30% (irreversible)
- Penumbra: Tmax >6s (salvageable)
- Mismatch ratio: Penumbra/Core >1.8
- Target mismatch: Core <70ml, penumbra >15ml
CURRENT PRACTICE:
- ASPECTS ≥6: Proceed with thrombectomy in window
- ASPECTS <6: Perfusion-guided selection
- Time is brain, but tissue is the target`,
    difficulty: 'hard',
    examFrequency: 'high'
  },
  {
    id: 'B016',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Visceral Aneurysm',
    question: 'A 45-year-old female is incidentally found to have a 2.8cm splenic artery aneurysm. She is planning pregnancy in the near future. What is the recommended management?',
    options: [
      'Observation with annual ultrasound surveillance',
      'Elective treatment before pregnancy regardless of size',
      'Treatment only if symptomatic or >3cm',
      'Defer treatment until after pregnancy'
    ],
    correctAnswers: [1],
    explanation: `Splenic artery aneurysms in women of childbearing age planning pregnancy should be treated electively—rupture risk dramatically increases during pregnancy.
SPLENIC ARTERY ANEURYSM (SAA):
- Most common visceral aneurysm (60%)
- 4:1 female predominance
- Associated with: Multiparity, portal hypertension, fibromuscular dysplasia
RUPTURE RISK FACTORS:
- Pregnancy (especially 3rd trimester, labor/delivery)
- Size >2cm (some say >2.5cm)
- Rapid growth
- Symptomatic
- Portal hypertension
PREGNANCY-RELATED RUPTURE:
- Maternal mortality: 70-75%
- Fetal mortality: 90-95%
- Risk increases with each trimester
- Mechanism: Hormonal changes (estrogen/progesterone on vessel wall)
- Increased splenic blood flow during pregnancy
TREATMENT THRESHOLDS:
TREAT REGARDLESS OF SIZE:
- Women of childbearing age planning pregnancy ← THIS CASE
- Symptomatic (pain, expansion)
- Pseudoaneurysm (any size)
TREAT IF >2-2.5CM:
- All patients (even asymptomatic)
- Portal hypertension patients
- Liver transplant candidates
TREATMENT OPTIONS:
ENDOVASCULAR (preferred):
- Coil embolization (proximal and distal)
- Covered stent (if preserving splenic flow needed)
- Plug devices
- Success rate >95%
SURGICAL:
- Aneurysmectomy with/without splenectomy
- For: Complex anatomy, failed endovascular
LOCATION MATTERS:
- Proximal/mid SAA: Embolization safe (collaterals via short gastrics)
- Hilar: Risk of splenic infarction, may need splenectomy`,
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'B017',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Renal Intervention',
    question: 'A patient with resistant hypertension (BP 165/95 on 4 medications) has a 75% ostial renal artery stenosis. Renal vein renin sampling shows a lateralizing ratio of 2.5:1. What does this finding suggest?',
    options: [
      'Stenosis is hemodynamically insignificant',
      'High likelihood of blood pressure improvement after revascularization',
      'Bilateral renal artery disease',
      'Primary hyperaldosteronism rather than renovascular hypertension'
    ],
    correctAnswers: [1],
    explanation: `Renal vein renin ratio ≥1.5:1 (lateralizing) predicts blood pressure response to revascularization with ~90% accuracy.
RENAL VEIN RENIN SAMPLING:
- Compares renin secretion between kidneys
- Lateralizing ratio = Affected kidney renin / Contralateral renin
- Ratio ≥1.5:1 = Significant lateralization
- Ratio ≥2.0:1 = Strong lateralization
INTERPRETATION:
- ≥1.5:1 with suppressed contralateral: Best predictor of cure/improvement
- <1.5:1: Bilateral disease, essential hypertension, or non-functional stenosis
- This patient's 2.5:1 = HIGH likelihood of benefit
CAVEATS OF RENIN SAMPLING:
- Must stop ACE-I/ARB 2-4 weeks prior (stimulate renin)
- Stop beta-blockers (suppress renin)
- Sodium restriction increases sensitivity
- Captopril stimulation test can enhance sensitivity
ASTRAL AND CORAL TRIALS:
- Showed no benefit of stenting over medical therapy in general population
- BUT: Selected patients with high clinical suspicion may benefit
- Trials criticized for including non-significant stenoses
WHO MIGHT BENEFIT FROM RENAL STENTING:
- Flash pulmonary edema with RAS
- Resistant hypertension with lateralizing renins
- Declining renal function on ACE-I/ARB
- Solitary functioning kidney with significant RAS
- Recent onset hypertension with clear anatomic cause
TECHNICAL POINTS:
- Ostial lesions need stent with 1-2mm protrusion into aorta
- Distal protection not routinely used (atheroma less friable)
- Target: <30% residual stenosis
- Complications: Dissection, embolization, access site`,
    difficulty: 'hard',
    examFrequency: 'medium'
  },
  {
    id: 'B018',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Upper Extremity',
    question: 'A violinist presents with right arm claudication and digital ischemia. Angiography shows compression of the subclavian artery with arm abduction. What is the most likely diagnosis and definitive treatment?',
    options: [
      'Buerger disease; smoking cessation',
      'Thoracic outlet syndrome; first rib resection',
      'Subclavian steal syndrome; carotid-subclavian bypass',
      'Giant cell arteritis; high-dose steroids'
    ],
    correctAnswers: [1],
    explanation: `Arterial thoracic outlet syndrome (TOS) with positional compression requires surgical decompression—first rib resection is definitive treatment.
THORACIC OUTLET SYNDROME TYPES:
NEUROGENIC TOS (95%):
- Brachial plexus compression
- Pain, paresthesias, weakness
- Provocative tests: Adson, Wright, Roos
ARTERIAL TOS (1%):
- Subclavian artery compression
- Claudication, embolization, aneurysm
- Often with cervical rib or anomalous first rib
VENOUS TOS (Paget-Schroetter) (4%):
- Subclavian vein thrombosis
- "Effort thrombosis" in young athletes
- Swelling, cyanosis, pain
ARTERIAL TOS FINDINGS:
- Positional compression on angiography (this case)
- Post-stenotic aneurysm formation
- Distal embolization (digital ischemia)
- Cervical rib on X-ray (50%)
- Abnormal first rib or scalene muscle hypertrophy
DIAGNOSIS:
- Duplex with provocative positioning
- CTA/MRA with arm abduction
- Conventional angiography gold standard
- Chest X-ray for cervical rib
TREATMENT ALGORITHM:
ARTERIAL TOS:
- First rib resection ± cervical rib resection
- Scalene muscle release
- Repair/replace subclavian if aneurysmal
- Treat distal embolization (thrombolysis, embolectomy)
VENOUS TOS:
- Thrombolysis for acute thrombosis
- Then: First rib resection (usually 2-4 weeks later)
- Some advocate same-admission surgery
NEUROGENIC TOS:
- Physical therapy first (3-6 months)
- Surgery if failed conservative management
WHY NOT OTHER OPTIONS:
- Buerger: Young smoker, affects small vessels, no compression
- Subclavian steal: Retrograde vertebral flow, no arm compression
- GCA: Large vessel vasculitis, no positional component`,
    difficulty: 'medium',
    examFrequency: 'medium'
  },
  {
    id: 'B019',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Portal Venous System',
    question: 'A patient with cirrhosis and refractory ascites undergoes TIPS creation. Post-procedure, the portal-systemic gradient is reduced from 22 mmHg to 6 mmHg. What is the concern with this gradient?',
    options: [
      'Gradient is optimal—no concerns',
      'Gradient too high—TIPS is stenosed',
      'Gradient too low—high risk of hepatic encephalopathy',
      'Gradient measurement is unreliable post-TIPS'
    ],
    correctAnswers: [2],
    explanation: `Post-TIPS PSG <8 mmHg increases hepatic encephalopathy risk—the target is 8-12 mmHg, not maximally low.
PORTAL-SYSTEMIC GRADIENT (PSG):
- Normal: 1-5 mmHg
- Clinically significant portal HTN: ≥10 mmHg
- Variceal bleeding threshold: ≥12 mmHg
TIPS TARGET GRADIENT:
- Goal: PSG 8-12 mmHg (or <12 mmHg)
- <8 mmHg: Too much shunting → encephalopathy risk
- >12 mmHg: Inadequate decompression
- This patient's 6 mmHg is TOO LOW
WHY TOO LOW IS BAD:
- Excessive portal decompression
- Hepatofugal flow (liver starved of portal nutrients)
- Increased systemic ammonia exposure
- Hepatic encephalopathy in 25-45% of TIPS patients
- Higher rates with lower gradients
TIPS SIZING STRATEGY:
- 8mm stent: Standard starting point
- 10mm stent: If 8mm doesn't achieve target
- Can dilate up but harder to reduce
- Some use under-dilated stent initially
REDUCING POST-TIPS ENCEPHALOPATHY:
- Avoid over-shunting (PSG <8)
- Lactulose prophylaxis
- Rifaximin if recurrent
- Consider TIPS reduction if refractory
TIPS REDUCTION OPTIONS:
- Parallel stent-graft (reducing flow)
- Shunt-reducing stent
- Balloon-occluded TIPS modification
INDICATIONS FOR TIPS:
- Variceal bleeding (acute or secondary prevention)
- Refractory ascites
- Hepatic hydrothorax
- Budd-Chiari syndrome
- Hepatorenal syndrome (bridge to transplant)
CONTRAINDICATIONS:
- Absolute: Right heart failure, severe tricuspid regurg
- Relative: Encephalopathy, bilirubin >5, MELD >18 (high mortality)`,
    difficulty: 'hard',
    examFrequency: 'high'
  },
  {
    id: 'B020',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Arteriovenous Malformation',
    question: 'A patient with a high-flow AVM of the lower extremity is referred for embolization. Which embolic agent is most appropriate for the NIDUS of this lesion?',
    options: [
      'Gelfoam pledgets',
      'Coils in the feeding arteries',
      'Liquid embolic (Onyx or NBCA)',
      'Polyvinyl alcohol (PVA) particles'
    ],
    correctAnswers: [2],
    explanation: `AVM treatment requires nidus penetration—liquid embolics (Onyx, NBCA) are optimal for this purpose. Feeding vessel embolization alone leads to recurrence.
AVM TREATMENT PRINCIPLES:
- Goal: Obliterate the NIDUS (abnormal vascular core)
- Feeding artery only embolization = FAILURE
- Why? Collaterals recruit rapidly → recurrence
- Must penetrate and cast the nidus itself
EMBOLIC AGENTS FOR AVM:
LIQUID EMBOLICS (nidus penetration):
- Onyx (EVOH): Controlled injection, non-adhesive
- NBCA (glue): Fast polymerization, adhesive
- Advantages: Fill nidus, reach small vessels
- This is the CORRECT choice
COILS:
- For aneurysms, pseudo-aneurysms
- Feeding artery occlusion in AVMs = BAD
- Blocks future access, collaterals form
- Reserve for: High-flow fistula component only
PVA PARTICLES:
- Temporary effect
- Don't reach nidus effectively
- Recanalization common
- Use for: Pre-surgical devascularization, tumor embolization
GELFOAM:
- Temporary agent (resorbs in days-weeks)
- Not for definitive AVM treatment
- Use for: Acute hemorrhage control, pre-op
SCHOBINGER CLASSIFICATION:
- Stage I: Quiescent (warm, pink, AV shunting)
- Stage II: Expansion (enlargement, pulsation, thrill, bruit)
- Stage III: Destruction (pain, ulceration, bleeding, necrosis)
- Stage IV: Decompensation (high-output cardiac failure)
TREATMENT APPROACH:
- Stage I: Observation (many remain stable)
- Stage II-IV: Intervention indicated
- Multi-stage embolization often needed
- Surgery may follow embolization
- Complete resection > partial treatment
ETHANOL:
- Most permanent agent (tissue necrosis)
- High complication rate (nerve injury, skin necrosis)
- Reserved for experienced centers
- Requires general anesthesia (painful)`,
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'B021',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'IVC Filters',
    question: 'A patient with acute PE had an IVC filter placed due to contraindication to anticoagulation. Six weeks later, the contraindication has resolved and the patient is anticoagulated. What is the recommended management of the filter?',
    options: [
      'Leave the filter permanently—removal is not necessary',
      'Retrieve the filter as soon as the contraindication resolves',
      'Retrieve the filter within 3-6 months if no longer needed',
      'Remove only if the patient develops filter-related complications'
    ],
    correctAnswers: [1],
    explanation: `Retrievable IVC filters should be removed as soon as the indication resolves—FDA recommends retrieval when no longer needed, ideally within 1-2 months.
FDA RECOMMENDATIONS (2014 Safety Communication):
- Evaluate filter retrieval 1-2 months after placement
- Remove as soon as PE/DVT risk allows
- Prolonged dwell time increases complications
- This patient: Contraindication resolved → RETRIEVE NOW
IVC FILTER INDICATIONS:
ABSOLUTE:
- Acute VTE with contraindication to anticoagulation
- Recurrent VTE despite adequate anticoagulation
- Complication of anticoagulation requiring cessation
RELATIVE (controversial):
- Massive PE with residual DVT (prophylactic)
- Free-floating iliofemoral thrombus
- Poor cardiopulmonary reserve with any PE risk
COMPLICATIONS OF INDWELLING FILTERS:
EARLY:
- Insertion site thrombosis
- Malposition
- IVC penetration
LATE:
- Filter thrombosis (6-30%)
- IVC occlusion
- Filter migration
- Strut fracture with embolization
- Penetration with retroperitoneal injury
- Chronic leg swelling
RETRIEVAL SUCCESS FACTORS:
- Dwell time: <3 months optimal, can still retrieve at >1 year
- Tilt: <15° ideal
- Embedded struts: May need advanced techniques
- Filter type: Some easier than others
ADVANCED RETRIEVAL TECHNIQUES:
- Stiff wire/sheath manipulation
- Laser sheath
- Endobronchial forceps
- Loop snare techniques
- 96%+ retrieval rate at experienced centers
IF NOT RETRIEVABLE:
- Leave in place if asymptomatic
- Treat IVC thrombosis with anticoagulation
- Covered stent for symptomatic IVC stenosis`,
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'B022',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Peripheral Arterial Disease',
    question: 'A patient with lifestyle-limiting claudication has a 6cm occlusion of the superficial femoral artery. You successfully recanalize the lesion. What is the preferred treatment strategy for this TASC C lesion?',
    options: [
      'Plain balloon angioplasty alone',
      'Drug-coated balloon (DCB) angioplasty',
      'Bare metal stent placement',
      'Covered stent-graft placement'
    ],
    correctAnswers: [1],
    explanation: `Drug-coated balloons (DCB) are the preferred treatment for femoropopliteal lesions after successful recanalization—superior patency compared to plain balloon with less foreign body.
FEMOROPOPLITEAL TREATMENT EVOLUTION:
- Plain balloon: High restenosis (40-60% at 1 year)
- Bare metal stent: Better acute result, but in-stent restenosis
- Drug-coated balloon: Current first-line for most lesions
- Drug-eluting stent: Alternative for complex cases
DCB ADVANTAGES:
- No permanent implant (vessel preserved)
- Paclitaxel inhibits smooth muscle proliferation
- 1-year patency 80-90% (vs 50-60% POBA)
- IN.PACT SFA, LEVANT trials showed superiority
WHEN TO USE DCB (first-line):
- De novo femoropopliteal stenosis/occlusion
- After successful recanalization of CTO
- In-stent restenosis treatment
- Moderate-length lesions (up to 15-20cm)
WHEN TO CONSIDER STENT:
- Flow-limiting dissection after PTA
- Significant recoil (>30% residual)
- Failed DCB with suboptimal result
- Consider DES for longer lesions
COVERED STENT (VIABAHN) INDICATIONS:
- Very long lesions (>15-20cm)
- In-stent restenosis (stent-in-stent)
- Heavily calcified vessels
- VIASTAR trial showed benefit in long lesions
PACLITAXEL SAFETY:
- FDA review 2018-2020: Mortality signal concern
- Subsequent analyses: No confirmed increased risk
- Still recommended by guidelines
- Discuss with patient (shared decision-making)
TECHNICAL TIPS FOR DCB:
- Adequate lesion preparation essential
- Score balloon or atherectomy for calcium
- DCB should overlap lesion by 5-10mm each end
- 3-minute inflation (drug transfer time)
- No need for post-dilation usually`,
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
