// EBIR Syllabus Data - Section A & B
// Based on CIRSE European Curriculum and Syllabus for IR (2023)

export type ExamFrequency = 'green' | 'yellow' | 'red' | 'purple'

export interface KnowledgeItem {
  id: string
  title: string
  explanation: string
}

export interface Section {
  id: string
  number: string
  title: string
  frequency?: ExamFrequency
  knowledgeItems?: KnowledgeItem[]
}

export interface Chapter {
  id: string
  letter: string
  title: string
  sections: Section[]
}

export const syllabusData: Chapter[] = [
  {
    id: 'section-a',
    letter: 'A',
    title: 'Fundamental Topics in Interventional Radiology',
    sections: [
      {
        id: '2.1.3',
        number: '2.1.3',
        title: 'Patient Safety',
        frequency: 'green',
        knowledgeItems: [
          {
            id: '2.1.3-1',
            title: 'Select patients for invasive procedures',
            explanation: `Patient selection is fundamental to safe IR practice. Before any procedure, you must review:

**Clinical Assessment:**
- Complete medical history including comorbidities, allergies, and medications
- Physical examination findings relevant to the planned procedure
- Laboratory investigations (coagulation profile, renal function, full blood count)

**Pre-procedural Imaging:**
- Review all relevant imaging to confirm indication and plan approach
- Identify anatomical variants that may affect the procedure
- Assess for contraindications

**Risk-Benefit Analysis:**
- Determine if the patient will benefit from the intervention
- Consider alternative treatments (medical, surgical, conservative)
- Assess procedural risk vs. expected benefit

**Key Contraindications to Consider:**
- Uncorrected coagulopathy
- Active infection at access site
- Severe contrast allergy (for procedures requiring contrast)
- Pregnancy (for fluoroscopic procedures)
- Patient unable to cooperate or lie flat

Always use a dedicated IR patient safety checklist (e.g., CIRSE checklist) and ensure proper communication with the patient and referring physician.`
          },
          {
            id: '2.1.3-2',
            title: 'Informed consent process',
            explanation: `Consent is a **process**, not just a form. It should be obtained by someone capable of performing the procedure.

**Elements of Valid Consent:**
1. Purpose - Why the procedure is being performed
2. Expected outcome - Technical and clinical success rates
3. Risks - Both common and serious complications
4. Benefits - What the patient can expect to gain
5. Alternatives - Other treatment options including doing nothing
6. Follow-up - What happens after the procedure

**Key Points:**
- Allow adequate time for patient to consider information
- Use language the patient understands
- Ensure patient has capacity to consent
- Document the discussion
- Consent can be withdrawn at any time

For emergency procedures where consent cannot be obtained, act in the patient's best interest and document the circumstances.`
          },
          {
            id: '2.1.3-3',
            title: 'ASA classification and procedural risk assessment',
            explanation: `The American Society of Anesthesiologists (ASA) Physical Status Classification helps assess patient fitness:

**ASA Classifications:**
- ASA I: Normal healthy patient
- ASA II: Mild systemic disease (e.g., well-controlled diabetes, mild obesity)
- ASA III: Severe systemic disease (e.g., poorly controlled diabetes, COPD)
- ASA IV: Severe systemic disease that is a constant threat to life
- ASA V: Moribund patient not expected to survive without operation
- ASA VI: Brain-dead patient for organ donation

**Factors Increasing Procedural Risk:**
- Advanced age (>70 years)
- Cardiac disease (recent MI, unstable angina, heart failure)
- Respiratory disease (COPD, pulmonary fibrosis)
- Renal impairment (eGFR <30 mL/min)
- Coagulopathy or anticoagulation
- Diabetes mellitus

For ASA III+ patients, consider anesthetic pre-assessment.`
          }
        ]
      },
      {
        id: '2.1.4',
        number: '2.1.4',
        title: 'Recognizing and Reducing Occupational Hazards',
        frequency: 'green',
        knowledgeItems: [
          {
            id: '2.1.4-1',
            title: 'ALARA principle and radiation protection',
            explanation: `**ALARA = As Low As Reasonably Achievable**

The fundamental principle of radiation protection is to minimize dose while achieving diagnostic/therapeutic goals.

**Three Pillars of Radiation Protection:**
1. Time: Minimize fluoroscopy time; use last-image-hold
2. Distance: Inverse square law - doubling distance reduces dose by 75%
3. Shielding: Lead aprons, thyroid shields, lead glasses

**Practical Dose Reduction Techniques:**
- Use pulsed fluoroscopy (lowest acceptable pulse rate)
- Collimate the beam tightly
- Minimize magnification (increases dose)
- Keep patient close to detector, tube away from patient
- Use road-mapping to reduce fluoroscopy

**Staff Protection:**
- Lead equivalent: minimum 0.5mm Pb for apron
- Thyroid collar essential
- Lead glasses reduce lens dose by 90%`
          },
          {
            id: '2.1.4-2',
            title: 'Radiation dose metrics',
            explanation: `**Key Dose Metrics:**

**Dose Area Product (DAP):**
- Measured in Gy·cm²
- Total radiation delivered to patient
- Good indicator of stochastic risk (cancer)

**Air Kerma:**
- Measured in mGy or Gy
- Indicator of skin dose and deterministic effects
- Alert threshold: 3Gy (risk of skin effects)
- Substantial threshold: 5Gy (likely skin effects)

**Deterministic Effects (Skin):**
- 2Gy: Transient erythema
- 3Gy: Main erythema (appears at 2 weeks)
- 6Gy: Prolonged erythema, permanent epilation
- 10Gy: Dermal necrosis

For high-dose procedures, document dose and arrange follow-up.`
          }
        ]
      },
      {
        id: '2.1.7',
        number: '2.1.7',
        title: 'Pharmacology of IR',
        frequency: 'yellow',
        knowledgeItems: [
          {
            id: '2.1.7-1',
            title: 'Contrast media',
            explanation: `**Iodinated Contrast Classifications:**
- Low-osmolar (LOCM): 600-800 mOsm/kg - standard
- Iso-osmolar (IOCM): ~290 mOsm/kg - safest for high-risk

**Contrast-Induced Nephropathy (CIN):**
- Definition: Rise in creatinine >25% or >44 μmol/L within 48-72h
- Risk factors: Pre-existing renal impairment, diabetes, heart failure
- Prevention: Hydration, minimize volume

**CO2 Angiography:**
- No nephrotoxicity, no allergy
- Contraindicated above diaphragm
- Use dedicated delivery system

**Gadolinium:**
- Risk of NSF with severe renal impairment (eGFR <30)
- Use macrocyclic agents (lower NSF risk)`
          },
          {
            id: '2.1.7-2',
            title: 'Local anesthetics',
            explanation: `**Lidocaine:**
- Onset: 2-5 minutes
- Duration: 1-2 hours (3-4h with epinephrine)
- Max dose: 4.5 mg/kg (7 mg/kg with epinephrine)
- 1% = 10mg/mL

**Bupivacaine:**
- Onset: 5-10 minutes
- Duration: 4-8 hours
- Max dose: 2 mg/kg
- More cardiotoxic than lidocaine

**AVOID epinephrine in end-arterial territories:** Fingers, toes, nose, ears, penis

**Local Anesthetic Toxicity (LAST):**
- Early: Perioral numbness, tinnitus, metallic taste
- Late: Seizures, arrhythmias, cardiac arrest
- Treatment: Lipid emulsion (Intralipid 20%) 1.5 mL/kg bolus`
          }
        ]
      },
      {
        id: '2.1.9',
        number: '2.1.9',
        title: 'Core Procedures in IR',
        frequency: 'green',
        knowledgeItems: [
          {
            id: '2.1.9-1',
            title: 'GI bleeding embolization',
            explanation: `**Indications:**
- Massive upper or lower GI bleeding
- Hemodynamic instability despite resuscitation
- Failed or unavailable endoscopic therapy

**Upper GI:** Celiac → hepatic → gastroduodenal artery territory
**Lower GI:** SMA for right colon, IMA for left colon

**Embolic Agents:**
- Coils: Permanent, precise, good for larger vessels
- Gelfoam: Temporary (weeks), slurry for distal territory
- Microcoils: For selective embolization

**Outcomes:**
- Technical success: 80-95%
- Rebleeding rate: 15-30%
- Bowel ischemia: 5-10% (usually self-limiting)`
          },
          {
            id: '2.1.9-2',
            title: 'Biliary drainage',
            explanation: `**Indications:**
- Obstructive jaundice with cholangitis
- Failed ERCP
- Malignant obstruction

**Charcot's Triad:** Fever, jaundice, RUQ pain
**Reynolds' Pentad:** Add hypotension and confusion

**Technique:**
- Right-sided, mid-axillary approach
- Target peripheral duct
- 8-12F pigtail catheter

**Types:**
- External: Above obstruction only
- Internal-external: Crosses obstruction
- Internal (stent): Definitive

**Give antibiotics before procedure!**`
          },
          {
            id: '2.1.9-3',
            title: 'Nephrostomy',
            explanation: `**Emergency Indication:** Obstructed infected kidney (pyonephrosis)

**Technique:**
- Prone position
- Below 12th rib, through Brodel's line
- Target lower pole calyx (posterior)
- 8-12F pigtail catheter

**Complications:**
- Bleeding (hematuria common)
- Sepsis
- Pleural injury

**Post-Procedure:**
- Monitor urine output
- Plan definitive treatment`
          },
          {
            id: '2.1.9-4',
            title: 'Acute limb ischemia thrombolysis',
            explanation: `**Rutherford Classification:**
- I (Viable): No sensory loss, no weakness
- IIa (Marginally threatened): Minimal sensory loss
- IIb (Immediately threatened): Sensory loss, weakness
- III (Irreversible): Paralysis - amputation likely

**Treatment:**
- Category IIa: Good thrombolysis candidate
- Category IIb: Urgent - often surgery preferred
- Category III: Primary amputation

**Technique:**
- Multi-sidehole catheter in thrombus
- tPA 0.5-1 mg/hr
- Check angiogram 4-12h intervals
- Treat underlying stenosis

**Contraindications:**
- Active bleeding
- Recent stroke (<2 months)
- Recent surgery (<10 days)`
          }
        ]
      }
    ]
  },
  {
    id: 'section-b',
    letter: 'B',
    title: 'Vascular Diagnosis and Intervention',
    sections: [
      {
        id: '2.2.1.1.1',
        number: '2.2.1.1.1',
        title: 'Peripheral Arterial Disease',
        frequency: 'green',
        knowledgeItems: [
          {
            id: '2.2.1.1.1-1',
            title: 'PAD classification and clinical presentation',
            explanation: `Let's talk legs. PAD affects about 200 million people worldwide. Know the classification systems cold.

**The Rutherford Classification** (exam gold):
- 0: Asymptomatic
- 1: Mild claudication
- 2: Moderate claudication
- 3: Severe claudication
- 4: Ischemic rest pain
- 5: Minor tissue loss (ulcers on toes)
- 6: Major tissue loss (above transmetatarsal)

**Critical Limb Ischemia (CLI)** = Rutherford 4-6. "Fix it or lose it."

**The Fontaine Classification:**
- Stage I: Asymptomatic
- Stage II: Intermittent claudication
- Stage III: Rest pain
- Stage IV: Ulceration or gangrene

**The 6 P's of Acute Limb Ischemia:**
Pain, Pallor, Pulselessness, Paresthesia, Paralysis, Poikilothermia

If they have paralysis or paresthesia, the clock is ticking. Muscle tolerates about 6 hours of ischemia.`
          },
          {
            id: '2.2.1.1.1-2',
            title: 'Ankle-Brachial Index (ABI)',
            explanation: `The ABI is your bread-and-butter PAD screening tool.

**ABI = Highest ankle pressure / Highest brachial pressure**

**Interpretation:**
- >1.3: Non-compressible (calcified) - UNRELIABLE
- 1.0-1.3: Normal
- 0.9-1.0: Borderline
- 0.5-0.9: Claudication range
- <0.5: Critical limb ischemia
- <0.3: Severe CLI, likely tissue loss

**The Diabetic Problem:** Medial calcification gives falsely elevated ABI. Use:
- Toe-Brachial Index (TBI): <0.7 is abnormal
- TcPO2: <30 mmHg = critical ischemia

**Waveform Analysis:**
- Triphasic: Normal
- Biphasic: Early disease
- Monophasic: Significant disease (tardus-parvus)`
          },
          {
            id: '2.2.1.1.1-3',
            title: 'Leriche syndrome and aortoiliac disease',
            explanation: `**Leriche Syndrome** - the classic triad:
1. Buttock and thigh claudication (bilateral)
2. Erectile dysfunction
3. Absent/diminished femoral pulses

Named after René Leriche (1940). Middle-aged male smoker who can't walk OR perform.

**TASC II Classification for Aortoiliac Disease:**
- Type A: Single stenosis <3cm
- Type B: Short stenosis 3-10cm
- Type C: Bilateral CIA stenoses
- Type D: Diffuse disease, aortic occlusion

**Treatment Philosophy:**
- TASC A & B: Endovascular first
- TASC C: Either approach
- TASC D: Surgery preferred (but increasingly endo)

**Kissing Stents:** For bilateral CIA disease. Simultaneously deploy stents in both CIAs extending into distal aorta.`
          },
          {
            id: '2.2.1.1.1-4',
            title: 'Femoropopliteal disease',
            explanation: `The SFA is the workhorse of peripheral intervention - and the most frustrating vessel. It bends, kinks, and doesn't like stents.

**The Adductor Canal Problem:** The SFA passes through the adductor hiatus - extreme mechanical stress with every step. This is why SFA stents fail.

**Treatment Arsenal:**

*Plain Old Balloon Angioplasty (POBA):* Still valid for short lesions.

*Drug-Coated Balloons (DCB):* Paclitaxel-coated. First-line for most SFA disease. Leave no metal behind.

*Self-Expanding Nitinol Stents:* For flow-limiting dissection or residual stenosis >30%.

*Covered Stents (Viabahn):* For long occlusions, in-stent restenosis.

**Clinical Pearl:** Always preserve the profunda femoris. If you occlude the SFA and the profunda is gone, the leg is in serious trouble.`
          },
          {
            id: '2.2.1.1.1-5',
            title: 'Below-the-knee intervention and angiosomes',
            explanation: `BTK intervention is where heroes are made. Goal: get blood to the wound.

**The Angiosome Concept:**

The foot has 6 vascular territories:
1. Anterior tibial → dorsalis pedis: Dorsum of foot
2. Posterior tibial (medial calcaneal): Medial/plantar heel
3. Posterior tibial (medial plantar): Medial midfoot
4. Posterior tibial (lateral plantar): Lateral forefoot, toes 2-5
5. Peroneal (calcaneal): Lateral/posterior heel
6. Peroneal (anterior perforating): Lateral ankle

**Why It Matters:** Direct revascularization (opening the artery feeding the wound angiosome) has better outcomes than indirect.

**Technical Tips:**
- Antegrade CFA access preferred
- Retrograde pedal access for complex CTOs
- Long, low-pressure inflations
- DCBs showing promise in BTK
- Avoid stenting BTK (high restenosis)

**Wound Blush Sign:** On completion angiography, you want contrast reaching the wound bed.`
          },
          {
            id: '2.2.1.1.1-6',
            title: 'Access site complications',
            explanation: `Every IR career includes access site disasters. Know them, prevent them, fix them.

**Hematoma:** Ice, pressure, bed rest. CT if retroperitoneal suspected.

**Pseudoaneurysm (PSA):**
- "To-and-fro" Doppler signal is pathognomonic
- Treatment: Observation (<2cm), US-guided compression, thrombin injection, covered stent

**Thrombin Injection:** Into PSA sac (NOT the neck). 100-1000 units. ~95% effective.

**AV Fistula:** High-velocity, low-resistance flow. Usually close spontaneously.

**Retroperitoneal Hemorrhage** - the one that kills:
- High puncture (above inguinal ligament)
- No external swelling
- Hypotension, flank pain, falling hematocrit
- Treatment: Fluids, blood, reversal, covered stent/embolization

**Prevention:** Fluoro-guided puncture, ultrasound, avoid high puncture, single wall technique.`
          }
        ]
      },
      {
        id: '2.2.1.2',
        number: '2.2.1.2',
        title: 'Prostate Artery Embolization (PAE)',
        frequency: 'yellow',
        knowledgeItems: [
          {
            id: '2.2.1.2-1',
            title: 'BPH and patient selection for PAE',
            explanation: `PAE has entered the chat. Here's what you need to know.

**BPH Basics:** Affects 50% at age 50, 90% by age 90. The prostate wraps around the urethra - when it grows, urination suffers.

**IPSS Score Ranges** (memorize):
- 0-7: Mild symptoms
- 8-19: Moderate symptoms
- 20-35: Severe symptoms

**Ideal PAE Candidate:**
- IPSS >13
- Prostate 40-80mL (some do up to 200mL+)
- Failed medical therapy
- Wants to preserve sexual function
- No prostate cancer

**Contraindications:**
- Suspected prostate cancer
- Neurogenic bladder
- Active UTI

**Pre-Procedure Workup:**
- IPSS and QoL score
- Uroflowmetry (Qmax normal >15 mL/s)
- Post-void residual
- PSA
- MRI prostate (rule out cancer, measure volume)`
          },
          {
            id: '2.2.1.2-2',
            title: 'Prostatic artery anatomy',
            explanation: `If you don't understand prostatic artery anatomy, you will either fail PAE or embolize the wrong structure.

**The Dangerous Neighbors:**

🚨 Superior rectal artery → supplies rectum = rectal necrosis

🚨 Internal pudendal artery → supplies penis = penile necrosis

🚨 Inferior vesical artery → supplies bladder

**Common Origins:**
- Type I: From inferior vesical artery (most common)
- Type II: From internal pudendal
- Type III: From obturator
- Type IV: From superior vesical

**How to Stay Safe:**
1. Superselective catheterization beyond dangerous branches
2. Cone-beam CT to confirm position
3. Recognize the "corkscrew" sign near prostate
4. Prostatic capsular blush is your target

**Bilateral vs Unilateral:** Bilateral gives better outcomes but isn't always possible.`
          },
          {
            id: '2.2.1.2-3',
            title: 'PAE technique and outcomes',
            explanation: `**Access:** Usually CFA, 4-5F sheath

**Catheter Selection:**
- 4-5F Cobra or RUC for internal iliac
- 2.0-2.7F microcatheter for prostatic artery
- 0.014-0.016" microwire

**Embolic Agents:**
- Microspheres 100-300μm or 300-500μm most common
- Smaller particles penetrate deeper

**Endpoints:**
- Slow flow/near stasis in prostatic artery
- Pruning of arterial tree
- Loss of parenchymal blush

**Outcomes:**
- IPSS improvement: 70-80%
- Average IPSS reduction: 10-15 points
- Prostate volume reduction: 20-40%

**Complications:**
- Post-PAE syndrome (expect it): Dysuria, discomfort, fever
- Urinary retention: 5-10%, usually temporary
- Rectal/bladder ischemia: RARE if technique correct`
          }
        ]
      },
      {
        id: '2.2.1.2.1',
        number: '2.2.1.2.1',
        title: 'Priapism',
        frequency: 'red',
        knowledgeItems: [
          {
            id: '2.2.1.2.1-1',
            title: 'High-flow vs low-flow priapism',
            explanation: `Priapism is a urological emergency, but IR gets called for one specific type.

**LOW-FLOW (Ischemic)** - THE EMERGENCY:
- Veins blocked → blood trapped → ischemia
- PAINFUL, RIGID
- Blood gas: Dark, PO2 <30, acidotic
- Causes: Sickle cell, medications, injection
- Time-critical: >24-48h = permanent ED
- Treatment: Aspiration + phenylephrine (NOT IR)

**HIGH-FLOW (Non-ischemic)** - IR TERRITORY:
- Arterial injury → AV fistula → unregulated inflow
- PAINLESS, SEMI-RIGID
- Blood gas: Bright red, normal
- Cause: Almost always TRAUMA
- NOT an emergency
- Treatment: EMBOLIZATION

**The Key Differentiator:**
| Feature | Low-Flow | High-Flow |
|---------|----------|-----------|
| Pain | YES | NO |
| Cause | Medical | Trauma |
| Urgency | EMERGENCY | Elective |
| Treatment | Aspiration | Embolization |

**Exam Pearl:** Painless priapism after perineal trauma = high-flow = embolization.`
          },
          {
            id: '2.2.1.2.1-2',
            title: 'High-flow priapism embolization',
            explanation: `**Mechanism:** Blunt perineal trauma → cavernosal artery injury → AV fistula → persistent engorgement

**Diagnosis:**
- Doppler US: Turbulent flow, "yin-yang" sign
- Pudendal angiography: Confirms fistula

**Technique:**
1. Femoral access
2. Select internal pudendal → cavernosal artery
3. Position microcatheter distal to fistula
4. Embolize with GELFOAM (preferred)

**Why Gelfoam?** Temporary agent allows recanalization and return of erectile function. Young men want their erections back.

**Outcomes:**
- Technical success: >90%
- Recurrence: 20-30% (may need repeat)
- Long-term ED risk: ~5% with gelfoam`
          }
        ]
      },
      {
        id: '2.2.1.3.1',
        number: '2.2.1.3.1',
        title: 'Venous Thrombosis',
        frequency: 'green',
        knowledgeItems: [
          {
            id: '2.2.1.3.1-1',
            title: 'DVT classification and treatment',
            explanation: `DVT is common, dangerous (PE), and increasingly in IR's domain.

**Classification:**
- Distal DVT (below knee): Lower PE risk (~5%), often anticoag alone
- Proximal DVT (popliteal+): Higher PE risk (~50%), PTS risk
- Iliofemoral DVT: Highest PTS risk, best intervention candidates

**Treatment Hierarchy:**
1. Anticoagulation alone: Standard for most DVT
2. Catheter-Directed Thrombolysis (CDT): For iliofemoral with severe symptoms
3. Pharmacomechanical Thrombectomy (PMT): Faster, less lytic
4. IVC Filter: If anticoag contraindicated

**Who Gets Intervention?**
- Iliofemoral DVT
- Severe symptoms
- Young, active patient
- Low bleeding risk
- Acute (<14-21 days)
- Phlegmasia`
          },
          {
            id: '2.2.1.3.1-2',
            title: 'Phlegmasia',
            explanation: `Phlegmasia is DVT's angry big brother. "This leg might die."

**Phlegmasia Alba Dolens** (white leg):
- Massive iliofemoral DVT
- Leg: Pale, swollen, painful
- Arterial spasm → pallor
- Precursor to cerulea dolens

**Phlegmasia Cerulea Dolens** (blue leg):
- Complete venous outflow obstruction
- Leg: BLUE, massively swollen, excruciating
- Compartment syndrome develops
- Can lead to venous gangrene

**EMERGENCY Management:**
1. Fluid resuscitation
2. Heparin
3. Leg elevation
4. Thrombus removal (CDT or surgical)
5. Fasciotomy if compartment syndrome
6. IVC filter consideration

**Cerulea dolens has 20-40% amputation rate if not treated aggressively.**`
          },
          {
            id: '2.2.1.3.1-3',
            title: 'May-Thurner syndrome',
            explanation: `May-Thurner is the classic "anatomical compression causing DVT" syndrome.

**The Anatomy:**
Left common iliac vein compressed between:
- Right common iliac artery (anteriorly)
- L5 vertebral body (posteriorly)

**Result:** Left iliofemoral DVT in young, healthy women.

**Classic Presentation:**
- Young female
- Left leg DVT
- Often with OCP, pregnancy, travel

**Diagnosis:**
- IVUS (gold standard): Shows >50% compression
- CT/MR venography

**Treatment:**
1. Remove acute thrombus (CDT/PMT)
2. Reveal underlying stenosis
3. STENT the compressed segment
4. Anticoagulation

**Stent Selection:**
- Dedicated venous stents (14-16mm)
- Must extend from common iliac into IVC
- Oversizing recommended`
          }
        ]
      },
      {
        id: '2.2.1.3.2',
        number: '2.2.1.3.2',
        title: 'Pulmonary Embolism',
        frequency: 'yellow',
        knowledgeItems: [
          {
            id: '2.2.1.3.2-1',
            title: 'PE risk stratification',
            explanation: `PE kills fast. Know who needs what treatment.

**High-Risk (Massive) PE:**
- SBP <90 mmHg or shock
- Mortality: 15-25%
- Treatment: Systemic thrombolysis

**Intermediate-Risk (Submassive) PE:**
- Stable BUT with RV dysfunction AND/OR elevated troponin
- Mortality: 3-15%
- Treatment: Anticoag ± escalation if deteriorating

**Low-Risk PE:**
- Stable, no RV dysfunction, normal biomarkers
- Mortality: <1%
- Treatment: Anticoag (often outpatient)

**Key Prognostic Markers:**
- RV/LV ratio >0.9 (bad)
- Elevated troponin
- Elevated BNP

**When IR Gets Called:**
- Massive PE with contraindication to systemic lysis
- Submassive PE with deterioration
- Failed systemic thrombolysis`
          },
          {
            id: '2.2.1.3.2-2',
            title: 'Catheter-directed therapy for PE',
            explanation: `**CDT for PE:**
- Catheter in pulmonary arteries
- Lower dose tPA (1mg/hr per lung)
- SEATTLE II: RV improvement, low bleeding

**Ultrasound-Assisted CDT (EKOS):**
- US waves accelerate thrombolysis
- Good evidence base

**Mechanical Thrombectomy:**
- FlowTriever, Indigo: Large-bore aspiration
- No lytic needed (good for bleeding risk)

**Endpoints:**
- Hemodynamic improvement
- RV function improvement
- PA pressure reduction

**Complications:**
- PA perforation (rare but serious)
- Bradycardia
- Access site bleeding`
          },
          {
            id: '2.2.1.3.2-3',
            title: 'IVC filters',
            explanation: `IVC filters: controversial, often placed, sometimes forgotten.

**Absolute Indication:**
- Acute VTE + absolute contraindication to anticoag

**Filter Types:**
- Permanent: Designed to stay forever
- Retrievable: CAN be removed (but often aren't)

**Retrieval Rates:** Only 20-40% actually retrieved!

**Complications:**
- IVC thrombosis: 5-15%
- Migration
- Fracture/embolization
- Perforation
- Tilting

**Key Message:** Place only when truly indicated. Have a retrieval plan.`
          }
        ]
      },
      {
        id: '2.2.1.3.4.1',
        number: '2.2.1.3.4.1',
        title: 'TIPS and Portal Hypertension',
        frequency: 'green',
        knowledgeItems: [
          {
            id: '2.2.1.3.4.1-1',
            title: 'Portal hypertension and TIPS indications',
            explanation: `TIPS is one of IR's signature procedures. High stakes, high reward.

**Portal Pressure:**
- Normal: 5-10 mmHg
- Clinically significant: HVPG >10 mmHg
- Variceal bleeding risk: HVPG >12 mmHg

**TIPS Indications:**
1. Secondary prevention of variceal bleeding
2. Refractory ascites
3. Hepatic hydrothorax
4. Budd-Chiari syndrome
5. Acute variceal bleeding (rescue)
6. Hepatorenal syndrome (bridge to transplant)

**Contraindications:**
- Severe hepatic encephalopathy
- Severe heart failure
- Severe pulmonary hypertension
- Polycystic liver disease

**The Question:** Is this patient better served by TIPS or transplant?`
          },
          {
            id: '2.2.1.3.4.1-2',
            title: 'TIPS technique',
            explanation: `**The Concept:** Create pathway from portal vein → hepatic vein → systemic circulation.

**Pre-Procedure:**
- CT/MRI: Anatomy, portal vein patency
- MELD score (>18 = high mortality)
- Echo: Rule out pulmonary hypertension

**Technique:**
1. Right IJ access
2. Catheterize right hepatic vein
3. Puncture from HV toward PV (TIPS needle)
4. Wire into portal vein
5. Measure portal pressure
6. Dilate tract
7. Deploy covered stent (Viatorr)
8. Post-dilate
9. Final portography

**Target Gradient:** <12 mmHg
Too low (<5) = risk of encephalopathy

**Stent:** Viatorr (PTFE-covered), 8-10mm`
          },
          {
            id: '2.2.1.3.4.1-3',
            title: 'TIPS outcomes and complications',
            explanation: `**Technical Success:** 95-99%

**Clinical Outcomes:**
- Rebleeding: 10-20% (vs 40-50% with endoscopy alone)
- Ascites complete response: 50-70%

**Post-TIPS Encephalopathy:**
- Occurs in 25-45%
- Treatment: Lactulose, rifaximin
- If severe: TIPS reduction/occlusion

**TIPS Dysfunction:**
- Stenosis or occlusion
- Surveillance: Doppler US every 6-12 months
- Revision: Angioplasty ± extension stent

**Other Complications:**
- Bleeding (1-2%)
- Heart failure exacerbation
- Acute liver failure (rare)

**Survival:** 1-year 70-90% (depends on liver function)`
          },
          {
            id: '2.2.1.3.4.1-4',
            title: 'BRTO for gastric varices',
            explanation: `BRTO is the "anti-TIPS" - gaining popularity for gastric varices.

**BRTO Concept:** Occlude gastric varices via gastrorenal shunt WITHOUT creating portosystemic shunt.

**Procedure:**
1. Access left renal vein
2. Catheterize gastrorenal shunt
3. Balloon occlude
4. Inject sclerosant
5. Leave balloon inflated for hours

**BRTO vs TIPS:**
| BRTO | TIPS |
|------|------|
| Eliminates varices | Decompresses varices |
| May worsen ascites | Treats ascites |
| Lower encephalopathy | Higher encephalopathy |

**BRTO Complications:**
- Worsening portal hypertension
- New esophageal varices
- Worsening ascites

**Bottom Line:** Different tools for different problems.`
          }
        ]
      },
      {
        id: '2.2.1.3.5',
        number: '2.2.1.3.5',
        title: 'Gonadal Venous Interventions',
        frequency: 'green',
        knowledgeItems: [
          {
            id: '2.2.1.3.5-1',
            title: 'Varicocele embolization',
            explanation: `Varicoceles: "bag of worms" in the scrotum. IR fixes them without a scalpel.

**Why It Matters:**
- Most common correctable cause of male infertility
- 15% of general population
- 40% of men with primary infertility

**Pathophysiology:**
- Left side: 85-90% (drains to left renal vein at 90° angle)
- Right side: 10-15% (drains to IVC at acute angle)

**Clinical Pearl:** Isolated RIGHT varicocele → rule out retroperitoneal mass!

**Embolization Technique:**
1. Catheterize left renal vein
2. Select left gonadal vein
3. Venography (look for duplications)
4. Advance to inguinal canal level
5. Embolize from below upward
6. Coils ± sclerosant

**Outcomes:**
- Technical success: >95%
- Semen improvement: 60-70%
- Pregnancy rates: 30-50%

**Advantages Over Surgery:**
- Same day, local anesthesia
- No incision
- Bilateral treatment in one session`
          },
          {
            id: '2.2.1.3.5-2',
            title: 'Pelvic congestion syndrome',
            explanation: `Pelvic congestion syndrome (PCS) is the female analog to varicocele.

**What Is It?** Chronic pelvic pain from ovarian/pelvic vein incompetence.

**Who Gets It?**
- Premenopausal women
- Multiparous
- History of pelvic surgery

**Symptoms:**
- Chronic dull pelvic pain
- Worse with standing
- Dyspareunia
- Vulvar/thigh varicosities

**Diagnosis:**
- US: Dilated ovarian veins >6mm
- MR Venography: Best non-invasive
- Diagnostic venography

**Embolization:**
- Target left ovarian vein (most important)
- Right ovarian vein
- Internal iliac tributaries
- Coils + sclerosant

**Outcomes:**
- Clinical improvement: 70-85%
- Recurrence: 10-20%

**Key Point:** Often missed diagnosis. Consider in chronic pelvic pain with negative gyn workup.`
          }
        ]
      },
      {
        id: '2.2.1.3.6',
        number: '2.2.1.3.6',
        title: 'Dialysis Vascular Access',
        frequency: 'green',
        knowledgeItems: [
          {
            id: '2.2.1.3.6-1',
            title: 'Dialysis access types',
            explanation: `Dialysis access is the lifeline for ESRD patients. IR maintains that lifeline.

**Access Hierarchy:**
1. AV Fistula (AVF) - "Fistula first"
2. AV Graft (AVG) - Bridge to fistula
3. Tunneled dialysis catheter - Last resort

**AV Fistula:**
- Native artery → vein connection
- Best patency (60-80% at 5 years)
- Lowest infection rate
- Needs maturation (6-8 weeks)

**AV Graft:**
- PTFE conduit
- Faster to use (2-4 weeks)
- Lower patency (50% at 2 years)
- Higher infection risk

**What Goes Wrong:**
- Stenosis (usually venous outflow)
- Thrombosis
- Pseudoaneurysm
- Steal syndrome

**Signs of Dysfunction:**
- Elevated venous pressures
- Decreased flow
- Prolonged bleeding
- Pulsatile access (should have thrill)`
          },
          {
            id: '2.2.1.3.6-2',
            title: 'Dialysis access intervention',
            explanation: `**Fistulogram:**
1. Access AVF/AVG
2. Inject contrast
3. Image: Arterial inflow → Anastomosis → Body → Venous outflow → Central veins

**Angioplasty for Stenosis:**
- Cross stenosis
- High-pressure balloon often needed
- Target: <30% residual stenosis

**Drug-Coated Balloons:** Emerging evidence for better patency.

**Stenting:** Generally avoid in peripheral access (limits future surgery). OK for:
- Elastic recoil
- Flow-limiting dissection
- Central vein stenosis

**Thrombectomy:**
- Mechanical: Arrow-Trerotola, AngioJet
- Pharmacomechanical: tPA + angioplasty
- Always treat underlying stenosis

**The Goal:** Keep access functional, avoid catheter.`
          }
        ]
      },
      {
        id: '2.2.1.3.7',
        number: '2.2.1.3.7',
        title: 'Central Venous Access',
        frequency: 'green',
        knowledgeItems: [
          {
            id: '2.2.1.3.7-1',
            title: 'Central line types',
            explanation: `Every IR does central lines. Do them well.

**Types:**
- Non-tunneled: Short-term (<14 days), higher infection
- Tunneled (Hickman): Long-term, Dacron cuff
- Ports: Completely subcutaneous, lowest infection
- PICCs: Via arm vein, medium-term

**Choosing:**
| Indication | Access |
|------------|--------|
| Short-term ICU | Non-tunneled |
| Long-term TPN | Tunneled/Port |
| Intermittent chemo | Port |
| Dialysis | Tunneled catheter |
| IV antibiotics | PICC |

**Access Sites:**
- Right IJ (preferred): Straight shot to SVC
- Left IJ: Acceptable
- Subclavian: Higher pneumothorax, stenosis risk
- Femoral: Higher infection/DVT

**Tip Position:** Cavoatrial junction or lower SVC

**Ultrasound Guidance:** Now standard of care.`
          },
          {
            id: '2.2.1.3.7-2',
            title: 'Port placement and complications',
            explanation: `**Port Components:**
- Reservoir (titanium/plastic)
- Septum (silicone)
- Catheter

**Technique:**
1. US-guided IJ access
2. Wire to RA (fluoro confirm)
3. Create pocket (below clavicle, over pectoralis)
4. Tunnel from pocket to IJ site
5. Insert catheter via peel-away sheath
6. Position tip at CAJ
7. Connect to port, suture to fascia
8. Close pocket, access port, confirm blood return

**Complications:**
- Immediate: Pneumothorax, arterial puncture
- Early: Hematoma, infection, migration
- Late: Occlusion, fibrin sheath, fracture, pinch-off

**No Blood Return?**
1. Reposition patient
2. Flush with saline
3. tPA lock (2mg, dwell 30-120 min)
4. Linogram under fluoro

**Removal:** When no longer needed or infection not clearing.`
          }
        ]
      },
      {
        id: '2.2.1.1.7',
        number: '2.2.1.1.7',
        title: 'Vascular Trauma',
        frequency: 'green',
        knowledgeItems: [
          {
            id: '2.2.1.1.7-1',
            title: 'Trauma embolization principles',
            explanation: `Trauma is where IR careers are made. Fast decisions, high stakes.

**When IR Gets Called:**
- Solid organ injury (liver, spleen, kidney)
- Pelvic fractures with arterial bleeding
- Ongoing hemorrhage after surgical packing

**Golden Rules:**
1. Speed over elegance
2. Superselective when possible
3. Empiric embolization OK if CTA positive, angio negative
4. Have a plan before starting
5. Communicate constantly with trauma team

**Embolic Selection:**
- Coils: Precise, permanent, larger vessels
- Gelfoam: Temporary, good for diffuse bleeding
- Particles: Distal embolization
- Glue: Fast-flow situations

**Organ-Specific:**
- Liver: Dual supply = aggressive embo OK
- Spleen: Proximal (maintains function) vs distal
- Kidney: Superselective only (preserve parenchyma)
- Pelvis: Often bilateral, gelfoam often sufficient`
          },
          {
            id: '2.2.1.1.7-2',
            title: 'Traumatic aortic injury',
            explanation: `TAI is usually fatal at the scene. If they make it to you, you can save them.

**Mechanism:** Rapid deceleration → shear forces → aortic tear

**Classic Location:** 90% at aortic isthmus (just distal to left subclavian)

**Classification:**
- Grade I: Intimal tear
- Grade II: Intramural hematoma
- Grade III: Pseudoaneurysm (contained)
- Grade IV: Free rupture (usually fatal)

**Treatment:** Endovascular stent-graft = standard of care
- Lower mortality (8% vs 15-20% surgical)
- No thoracotomy in polytrauma patient

**Technical Points:**
- Femoral access (18-24F sheath)
- May need to cover left subclavian (usually tolerated)
- Slight oversizing (10-15%)

**Complications:**
- Stroke
- Spinal cord ischemia
- Left arm ischemia

**Young Patient Problem:** Small aorta, long-term durability concerns.`
          }
        ]
      },
      {
        id: '2.2.1.1.8',
        number: '2.2.1.1.8',
        title: 'Visceral Arterial Disease',
        frequency: 'yellow',
        knowledgeItems: [
          {
            id: '2.2.1.1.8-1',
            title: 'Mesenteric ischemia',
            explanation: `Mesenteric ischemia is a "can't miss" diagnosis.

**Acute Mesenteric Ischemia (AMI):**

Causes:
- Embolism (50%): Cardiac source, lodges at SMA branches
- Thrombosis (25%): On atherosclerosis, at origin
- NOMI (20%): Vasospasm from shock/pressors
- Venous (5%): SMV/portal vein thrombosis

**Classic Presentation:** "Pain out of proportion to exam"

**CT Signs of Bowel Ischemia:**
- Bowel wall thickening or paper-thin
- Absent wall enhancement
- Pneumatosis (gas in wall)
- Portal venous gas

**Treatment:**
- If peritonitis: Surgery first
- If viable bowel: CDT/thrombectomy + treat stenosis
- NOMI: Intra-arterial vasodilators

---

**Chronic Mesenteric Ischemia (CMI):**

Classic Triad:
1. Postprandial pain ("intestinal angina")
2. Food fear (weight loss)
3. Abdominal bruit

Treatment: Angioplasty + stenting`
          },
          {
            id: '2.2.1.1.8-2',
            title: 'Renal artery stenosis',
            explanation: `RAS is common, but knowing WHEN to stent is the art.

**Causes:**
- Atherosclerosis (90%): Ostial, older patients
- FMD (10%): "String of beads," young women

**Clinical Presentations:**
- Renovascular hypertension
- Ischemic nephropathy
- Flash pulmonary edema
- Recurrent CHF

**The CORAL Trial Problem:**
No difference between stenting vs medical therapy... but patient selection may have been poor.

**Current Stenting Indications:**
- Flash pulmonary edema
- Refractory hypertension with confirmed significant RAS
- Ischemic nephropathy with viable kidney
- FMD (angioplasty alone, excellent outcomes)

**Less Likely to Benefit:**
- Chronic stable hypertension
- Small kidney (<7cm)
- High resistance index (>0.8)
- Already on dialysis

**Bottom Line:** Stenting works in the right patient. The art is selection.`
          },
          {
            id: '2.2.1.1.8-3',
            title: 'Visceral artery aneurysms',
            explanation: `VAAs are uncommon but dangerous. If you find it, think about fixing it.

**Distribution:**
1. Splenic (60%) - most common
2. Hepatic (20%)
3. SMA (5.5%)
4. Celiac (4%)

**Risk of Rupture:**
- Size >2cm = higher risk
- Pregnancy (splenic aneurysms very dangerous)
- Mycotic = very high risk

**Causes:**
- Atherosclerosis
- Medial degeneration
- FMD
- Infection (mycotic)
- Connective tissue disorders

**Treatment Indications:**
- Symptomatic
- >2cm
- Growing
- Women of childbearing age (splenic)
- Mycotic

**Treatment Options:**
- Coil embolization (most common)
- Covered stent (if vessel preservation needed)
- Surgical

**Splenic Artery Aneurysm:**
- Most common VAA
- 3% rupture risk
- 75% mortality if ruptures in pregnancy
- Treatment: Coil embo or covered stent`
          }
        ]
      },
      {
        id: '2.2.1.1.9',
        number: '2.2.1.1.9',
        title: 'Obstetric and Gynecologic Interventions',
        frequency: 'yellow',
        knowledgeItems: [
          {
            id: '2.2.1.1.9-1',
            title: 'Uterine artery embolization for fibroids',
            explanation: `UAE is a proven alternative to hysterectomy for symptomatic fibroids.

**Indications:**
- Symptomatic fibroids (bleeding, bulk symptoms)
- Desire to preserve uterus
- Failed medical therapy

**Contraindications:**
- Pregnancy or desire for pregnancy (relative)
- Active infection
- Suspected malignancy
- Pedunculated subserosal fibroid

**Technique:**
1. Bilateral femoral or single femoral + crossover
2. Select uterine arteries
3. Angiogram to map fibroid supply
4. Embolize with particles (500-700μm typical)
5. Endpoint: Near stasis, pruning of fibroid vessels
6. Preserve ovarian branches if possible

**Outcomes:**
- Technical success: >95%
- Symptom improvement: 85-90%
- Fibroid volume reduction: 40-60%

**Complications:**
- Post-embolization syndrome (EXPECT IT): Pain, fever, nausea
- Amenorrhea (5-10%, higher if >45 years)
- Infection/endometritis
- Non-target embolization`
          },
          {
            id: '2.2.1.1.9-2',
            title: 'Postpartum hemorrhage embolization',
            explanation: `PPH kills. IR can be life-saving.

**Definition:** Blood loss >500mL (vaginal) or >1000mL (cesarean)

**Causes (4 T's):**
- Tone (uterine atony) - most common
- Trauma
- Tissue (retained placenta)
- Thrombin (coagulopathy)

**When IR Gets Called:**
- Failed medical management
- Ongoing hemorrhage
- Hemodynamic instability

**Technique:**
1. Femoral access
2. Aortogram → identify bleeding source
3. Select uterine arteries bilaterally
4. Embolize with gelfoam (preferred - temporary)
5. If persistent: Internal iliac branches

**Targets:**
- Uterine arteries (first choice)
- Ovarian arteries (if bleeding continues)
- Other internal iliac branches

**Why Gelfoam?** Temporary occlusion allows for future fertility.

**Outcomes:**
- Technical success: 85-95%
- Fertility preservation: Most can conceive again
- Repeat embolization: May be needed

**Key Point:** This is often an emergency. Be ready.`
          }
        ]
      }
    ]
  }
]
