'use client'

import { useState, useMemo } from 'react'
import { Search, BookOpen, ChevronDown, ChevronRight, GraduationCap, ExternalLink, CheckCircle } from 'lucide-react'

// Traffic light system from CIRSE:
// Green = frequently tested (almost every exam)
// Yellow = tested in most exams
// Red = rarely tested
// Purple = verified by supervisor (competency checklist)

type ExamFrequency = 'green' | 'yellow' | 'red' | 'purple'

interface KnowledgeItem {
  id: string
  title: string
  explanation: string
}

interface SubSection {
  id: string
  number: string
  title: string
  frequency: ExamFrequency
  knowledgeItems: KnowledgeItem[]
}

interface Section {
  id: string
  number: string
  title: string
  frequency?: ExamFrequency
  subsections?: SubSection[]
  knowledgeItems?: KnowledgeItem[]
}

interface Chapter {
  id: string
  letter: string
  title: string
  sections: Section[]
}

const syllabusData: Chapter[] = [
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
1. **Purpose** - Why the procedure is being performed
2. **Expected outcome** - Technical and clinical success rates
3. **Risks** - Both common and serious complications
4. **Benefits** - What the patient can expect to gain
5. **Alternatives** - Other treatment options including doing nothing
6. **Follow-up** - What happens after the procedure

**Key Points:**
- Allow adequate time for patient to consider information
- Use language the patient understands
- Ensure patient has capacity to consent
- Document the discussion
- Consent can be withdrawn at any time

**Specific Risks to Discuss:**
- Access site complications (bleeding, hematoma, pseudoaneurysm)
- Contrast reactions and nephrotoxicity
- Radiation exposure
- Procedure-specific complications
- Need for further intervention

For emergency procedures where consent cannot be obtained, act in the patient's best interest and document the circumstances.`
          },
          {
            id: '2.1.3-3',
            title: 'ASA classification and procedural risk assessment',
            explanation: `The American Society of Anesthesiologists (ASA) Physical Status Classification helps assess patient fitness:

**ASA Classifications:**
- **ASA I**: Normal healthy patient
- **ASA II**: Mild systemic disease (e.g., well-controlled diabetes, mild obesity)
- **ASA III**: Severe systemic disease (e.g., poorly controlled diabetes, morbid obesity, COPD)
- **ASA IV**: Severe systemic disease that is a constant threat to life (e.g., unstable angina, symptomatic CHF)
- **ASA V**: Moribund patient not expected to survive without operation
- **ASA VI**: Brain-dead patient for organ donation

**Factors Increasing Procedural Risk:**
- Advanced age (>70 years)
- Cardiac disease (recent MI, unstable angina, heart failure)
- Respiratory disease (COPD, pulmonary fibrosis)
- Renal impairment (eGFR <30 mL/min)
- Coagulopathy or anticoagulation
- Diabetes mellitus
- Immunosuppression

**Pre-procedural Checklist:**
- Review medications (especially anticoagulants, metformin)
- Check allergies (contrast, latex, antibiotics)
- Assess fasting status
- Verify IV access
- Confirm monitoring equipment available

For ASA III+ patients, consider anesthetic pre-assessment and discuss with the sedation/anesthesia team.`
          },
          {
            id: '2.1.3-4',
            title: 'Peri-procedural medication management',
            explanation: `**Anticoagulation Management:**
See dedicated anticoagulation section, but key principles:
- Risk stratify procedure (low/moderate/high bleeding risk)
- Balance thrombotic vs bleeding risk
- Follow CIRSE/SIR guidelines for hold times
- Plan bridging if needed for high thrombotic risk patients

**Diabetes Management:**
- *Metformin*: Hold for 48h after contrast if eGFR <30, or for high contrast volume procedures
- *Insulin*: Reduce dose on morning of procedure if fasting; monitor glucose
- *Sulfonylureas*: Risk of hypoglycemia if fasting

**Renal Protection:**
- Identify at-risk patients (eGFR <45, diabetes, heart failure)
- Hydration: IV 0.9% saline 1-1.5 mL/kg/hr for 6-12h pre/post procedure
- Minimize contrast volume
- Consider iso-osmolar contrast
- Avoid concurrent nephrotoxins (NSAIDs, aminoglycosides)

**Antibiotic Prophylaxis:**
Indicated for:
- Biliary interventions
- GU tract interventions
- Procedures with prosthetic material
- Immunocompromised patients

**Sedation Medications:**
- Midazolam: 1-2mg IV titrated (anxiolysis, amnesia)
- Fentanyl: 25-50mcg IV titrated (analgesia)
- Monitor oxygen saturation, have reversal agents available (flumazenil, naloxone)`
          },
          {
            id: '2.1.3-5',
            title: 'Recognition and management of complications',
            explanation: `**Access Site Complications:**
- *Hematoma*: Direct pressure, bed rest; if large, may need ultrasound-guided compression or surgical repair
- *Pseudoaneurysm*: Ultrasound-guided thrombin injection or compression; surgical repair if large
- *AV fistula*: Usually managed conservatively; surgery for symptomatic cases
- *Retroperitoneal hemorrhage*: IV fluids, blood transfusion, CT imaging, may need embolization

**Contrast Reactions:**
- *Mild* (urticaria, nausea): Supportive care, antihistamines
- *Moderate* (bronchospasm, hypotension): O2, IV fluids, bronchodilators, epinephrine 0.1-0.3mg IM
- *Severe* (anaphylaxis): Epinephrine 0.3-0.5mg IM, IV fluids, call for help

**Contrast-Induced Nephropathy:**
- Risk peaks at 48-72h post-procedure
- Monitor creatinine in high-risk patients
- Management: supportive, ensure adequate hydration

**Sedation Complications:**
- *Respiratory depression*: Reduce/stop sedation, stimulate patient, bag-mask ventilation, naloxone/flumazenil
- *Aspiration*: Suction, intubation if severe, antibiotics

**Emergency Drugs to Know:**
- Atropine (bradycardia): 0.5-1mg IV
- Adrenaline (anaphylaxis/arrest): 0.5mg IM or 1mg IV
- Flumazenil (benzodiazepine reversal): 0.2mg IV
- Naloxone (opioid reversal): 0.4mg IV
- Glucagon (beta-blocker overdose): 1-5mg IV`
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
1. **Time**: Minimize fluoroscopy time; use last-image-hold; plan procedure before screening
2. **Distance**: Inverse square law - doubling distance reduces dose by 75%
3. **Shielding**: Lead aprons, thyroid shields, lead glasses, ceiling-suspended shields

**Practical Dose Reduction Techniques:**
- Use pulsed fluoroscopy (lowest acceptable pulse rate)
- Collimate the beam tightly
- Minimize magnification (increases dose)
- Keep patient close to detector, tube away from patient
- Remove grid for small patients/extremities
- Avoid steep oblique angles (increases scatter and patient dose)
- Use road-mapping to reduce fluoroscopy during wire/catheter manipulation

**Dose Monitoring:**
- Personal dosimeters (worn at collar level outside apron)
- Area monitors in IR suite
- Patient dose recorded (DAP, air kerma) for every procedure

**Dose Reference Levels:**
- Know your local DRLs for common procedures
- If consistently exceeding DRLs, review technique

**Staff Protection:**
- Lead equivalent: minimum 0.5mm Pb for apron
- Thyroid collar essential
- Lead glasses reduce lens dose by 90%
- Maintain distance when possible
- Rotate staff in high-volume centers`
          },
          {
            id: '2.1.4-2',
            title: 'Radiation dose metrics and monitoring',
            explanation: `**Key Dose Metrics:**

**Dose Area Product (DAP) / Kerma Area Product (KAP):**
- Measured in Gy·cm² or mGy·cm²
- Total radiation delivered to patient
- Independent of distance from tube
- Good indicator of stochastic risk (cancer)

**Air Kerma (AK) / Cumulative Air Kerma:**
- Measured in mGy or Gy
- Dose at the interventional reference point (15cm from isocenter toward tube)
- Indicator of skin dose and deterministic effects
- **Alert threshold**: 3Gy (risk of skin effects)
- **Substantial threshold**: 5Gy (likely skin effects)

**Fluoroscopy Time:**
- Useful but incomplete metric
- Same time can give very different doses depending on settings
- Should be recorded but not used alone

**Deterministic Effects (Skin):**
- 2Gy: Transient erythema
- 3Gy: Main erythema (appears at 2 weeks)
- 6Gy: Prolonged erythema, permanent epilation
- 10Gy: Dermal necrosis
- 15Gy: Surgical intervention may be needed

**For High-Dose Procedures:**
- Document dose in patient records
- Inform patient if threshold exceeded
- Arrange clinical follow-up for skin checks (2-4 weeks)
- Report to radiation protection advisor

**Stochastic Effects:**
- Cancer risk increases with dose (no threshold)
- Estimated additional cancer risk: ~5% per Sv
- Younger patients at higher risk`
          },
          {
            id: '2.1.4-3',
            title: 'Infection control and needlestick injury prevention',
            explanation: `**Standard Precautions (Apply to All Patients):**
- Hand hygiene before and after patient contact
- Gloves for contact with blood/body fluids
- Gown if splash risk
- Eye protection for aerosol-generating procedures
- Safe handling and disposal of sharps

**Aseptic Technique for IR:**
- Sterile gown and gloves
- Full surgical scrub for complex procedures
- Sterile draping of puncture site and equipment
- Chlorhexidine skin preparation (allow to dry)
- Single-use equipment where possible

**High-Risk Pathogens:**
- Hepatitis B: ~30% transmission risk from needlestick
- Hepatitis C: ~3% transmission risk
- HIV: ~0.3% transmission risk
- MRSA, VRE, C. difficile: Contact precautions

**Needlestick Injury Protocol:**
1. Allow wound to bleed, wash with soap and water
2. Do NOT squeeze the wound
3. Report immediately to occupational health
4. Document the incident
5. Source patient testing (with consent)
6. Risk assessment and post-exposure prophylaxis if indicated
7. Follow-up serological testing

**Prevention:**
- Never recap needles
- Use safety-engineered devices
- Pass sharps in a dish, not hand-to-hand
- Dispose in sharps containers immediately
- Adequate lighting and space in procedure room

**Vaccination:**
Hepatitis B vaccination is essential for all IR staff - ensure immunity confirmed (anti-HBs >10 IU/L)`
          }
        ]
      },
      {
        id: '2.1.7',
        number: '2.1.7',
        title: 'Pharmacology of Interventional Radiology',
        frequency: 'yellow',
        knowledgeItems: [
          {
            id: '2.1.7-1',
            title: 'Contrast media - types, uses, and hazards',
            explanation: `**Iodinated Contrast:**

*Classifications:*
- **Ionic vs Non-ionic**: Non-ionic preferred (fewer reactions)
- **Osmolality**: Low-osmolar or iso-osmolar safest
  - High-osmolar (HOCM): >1400 mOsm/kg - rarely used
  - Low-osmolar (LOCM): 600-800 mOsm/kg - standard
  - Iso-osmolar (IOCM): ~290 mOsm/kg - safest for high-risk patients

*Contrast-Induced Nephropathy (CIN):*
- Definition: Rise in creatinine >25% or >44 μmol/L within 48-72h
- Risk factors: Pre-existing renal impairment, diabetes, heart failure, dehydration, high contrast volume, nephrotoxic drugs
- Prevention: Hydration, minimize volume, avoid repeated doses within 48h

*Allergic Reactions:*
- Prior reaction increases risk 5-fold
- Premedication: Prednisone 50mg at 13h, 7h, 1h pre + antihistamine
- Premedication does NOT guarantee safety - be prepared for reaction

**Gadolinium:**
- Used when iodinated contrast contraindicated
- Risk of nephrogenic systemic fibrosis (NSF) with severe renal impairment (eGFR <30)
- Use macrocyclic agents (lower NSF risk)
- Off-label for angiography; small volumes only

**Carbon Dioxide (CO2):**
- No nephrotoxicity, no allergy
- Useful in renal impairment
- Contraindicated above diaphragm (air embolism risk)
- Buoyant - images best in dependent vessels
- Use dedicated delivery system; never use room air`
          },
          {
            id: '2.1.7-2',
            title: 'Local anesthetics',
            explanation: `**Mechanism:** Block sodium channels → prevent nerve impulse conduction

**Common Agents:**

*Lidocaine (Lignocaine):*
- Onset: 2-5 minutes
- Duration: 1-2 hours (3-4h with epinephrine)
- Max dose: 4.5 mg/kg (7 mg/kg with epinephrine)
- 1% = 10mg/mL, 2% = 20mg/mL
- Example: 70kg patient → max 315mg = 31.5mL of 1%

*Bupivacaine:*
- Onset: 5-10 minutes
- Duration: 4-8 hours
- Max dose: 2 mg/kg (3 mg/kg with epinephrine)
- More cardiotoxic than lidocaine
- Used when prolonged anesthesia needed

**Epinephrine Additive:**
- Causes vasoconstriction → prolongs action, reduces bleeding
- Concentration: 1:200,000 (5 μg/mL)
- **AVOID in end-arterial territories**: Fingers, toes, nose, ears, penis

**Signs of Local Anesthetic Toxicity (LAST):**
Early: Perioral numbness, tinnitus, metallic taste, lightheadedness
Late: Seizures, arrhythmias, cardiac arrest

**Management of LAST:**
- Stop injection immediately
- Call for help
- Airway management, IV access
- Treat seizures (benzodiazepines)
- **Lipid emulsion (Intralipid 20%)**: 1.5 mL/kg bolus, then 0.25 mL/kg/min infusion
- Prolonged CPR may be needed`
          },
          {
            id: '2.1.7-3',
            title: 'Sedation and analgesia',
            explanation: `**Sedation Levels:**
- **Minimal**: Anxiolysis, responds normally to verbal commands
- **Moderate (Conscious)**: Depressed consciousness, responds purposefully to verbal/tactile stimulation
- **Deep**: Cannot be easily roused, responds to painful stimulation
- **General Anesthesia**: Unarousable

**Common Sedation Agents:**

*Midazolam:*
- Benzodiazepine - anxiolysis, amnesia, muscle relaxation
- Dose: 0.5-2mg IV, titrate to effect
- Onset: 2-3 min IV
- Duration: 30-60 min
- Reversal: Flumazenil 0.2mg IV (may need repeat doses)

*Fentanyl:*
- Opioid - analgesia
- Dose: 25-50 μg IV, titrate
- Onset: 1-2 min IV
- Duration: 30-60 min
- Reversal: Naloxone 0.1-0.4mg IV

**Monitoring During Sedation:**
- Continuous pulse oximetry
- ECG monitoring
- Blood pressure (every 5 min)
- End-tidal CO2 (if available)
- Clinical observation (responsiveness, breathing)

**Requirements:**
- IV access
- Supplemental oxygen
- Suction available
- Resuscitation equipment
- Trained personnel
- Recovery area with monitoring

**Discharge Criteria:**
- Alert and oriented
- Stable vital signs for 30 min
- Able to mobilize safely
- No nausea/vomiting
- Responsible adult escort`
          },
          {
            id: '2.1.7-4',
            title: 'Anticoagulation pharmacology',
            explanation: `**Vitamin K Antagonists (Warfarin):**
- Inhibits vitamin K-dependent factors (II, VII, IX, X)
- Monitored by INR
- Half-life: 36-42 hours
- Reversal: Vitamin K (6-24h), PCC (immediate), FFP

**Heparins:**
*Unfractionated Heparin (UFH):*
- Activates antithrombin → inhibits IIa and Xa
- Half-life: 1-2 hours IV
- Monitored by aPTT
- Reversal: Protamine (1mg per 100 units)

*Low Molecular Weight Heparin (LMWH):*
- Enoxaparin, dalteparin, tinzaparin
- Predominantly anti-Xa activity
- Half-life: 4-6 hours
- Fixed dosing, no routine monitoring
- Partial reversal with protamine

**Direct Oral Anticoagulants (DOACs):**

*Dabigatran (Pradaxa):*
- Direct thrombin inhibitor
- Half-life: 12-17 hours (longer in renal impairment)
- Reversal: Idarucizumab (Praxbind)

*Rivaroxaban (Xarelto), Apixaban (Eliquis), Edoxaban (Lixiana):*
- Factor Xa inhibitors
- Half-lives: 5-12 hours
- Reversal: Andexanet alfa or 4-factor PCC

**Antiplatelet Agents:**

*Aspirin:*
- Irreversible COX-1 inhibition
- Effect lasts 7-10 days (platelet lifespan)
- No specific reversal; platelet transfusion if severe bleeding

*Clopidogrel/Prasugrel/Ticagrelor:*
- P2Y12 inhibitors
- Duration varies (clopidogrel 5d, prasugrel 7d, ticagrelor 3-5d)
- No specific reversal; platelet transfusion if needed`
          }
        ]
      },
      {
        id: '2.1.8',
        number: '2.1.8',
        title: 'Imaging',
        frequency: 'green',
        knowledgeItems: [
          {
            id: '2.1.8-1',
            title: 'Ultrasound in IR',
            explanation: `**Advantages:**
- Real-time imaging
- No ionizing radiation
- Portable
- Contrast-enhanced US (CEUS) available
- Doppler for vascular assessment

**Applications in IR:**
- Vascular access guidance
- Biopsy guidance
- Drainage procedures
- CEUS for tumor characterization and ablation monitoring
- Compression of pseudoaneurysms
- Thrombin injection for pseudoaneurysms

**Doppler Ultrasound:**
*Color Doppler:* Shows direction and relative velocity of flow
*Spectral Doppler:* Quantitative velocity measurements
*Power Doppler:* More sensitive for slow flow, no directional information

**Normal Arterial Waveforms:**
- High-resistance (peripheral): Triphasic/biphasic with reverse flow
- Low-resistance (renal, ICA): Monophasic with continuous forward flow

**Signs of Stenosis on Duplex:**
- Focal velocity increase (PSV ratio >2 suggests >50% stenosis)
- Post-stenotic turbulence
- Tardus-parvus waveform distally

**Vascular Access Tips:**
- Use linear high-frequency probe (7-12 MHz)
- Position vessel in center of screen
- Needle at 45-60° angle
- Short-axis (out-of-plane) vs long-axis (in-plane) technique
- Compress vein to confirm it's not an artery`
          },
          {
            id: '2.1.8-2',
            title: 'CT and CT angiography',
            explanation: `**CT Angiography (CTA) Principles:**
- Helical/spiral acquisition during contrast bolus
- Multidetector CT enables thin slices and rapid coverage
- Dual-energy CT allows material differentiation (iodine vs calcium)

**Contrast Timing:**
- *Bolus tracking:* ROI placed in target vessel; scan triggers when threshold HU reached
- *Test bolus:* Small contrast injection to calculate time-to-peak
- Arterial phase: ~20-25s post-injection
- Portal venous phase: ~60-70s post-injection

**Typical CTA Protocols:**
- *Aorta:* 80-120mL contrast, 4mL/s, arterial phase, ECG-gating for thoracic aorta
- *Peripheral runoff:* 100-150mL, 3-4mL/s, may need delayed imaging for distal vessels
- *Mesenteric:* Arterial + portal venous phases

**Post-Processing:**
- *MPR (Multiplanar Reconstruction):* Standard viewing
- *MIP (Maximum Intensity Projection):* Vessel overview, like angiogram
- *VRT (Volume Rendering):* 3D visualization
- *Centerline analysis:* For measurements (aneurysm sizing, stent planning)

**Artifacts:**
- Beam hardening from calcium/metal
- Motion artifact
- Partial volume averaging
- Streak artifacts

**Advantages over MRA:**
- Faster acquisition
- Better spatial resolution
- Better for calcified vessels
- More available

**Disadvantages:**
- Ionizing radiation
- Iodinated contrast (nephrotoxicity, allergy)
- Limited soft tissue contrast compared to MR`
          },
          {
            id: '2.1.8-3',
            title: 'Catheter angiography and DSA',
            explanation: `**Digital Subtraction Angiography (DSA):**
- Pre-contrast mask image subtracted from post-contrast images
- Removes bone/soft tissue, leaving only contrast-filled vessels
- Requires patient immobility

**Advantages:**
- Gold standard spatial resolution
- Real-time imaging
- Allows intervention in same session
- Hemodynamic assessment possible

**Technical Factors:**
- *Frame rate:* 2-6 fps typically; higher for fast flow (AVM)
- *Road-mapping:* Overlay of contrast image on live fluoroscopy
- *Rotational angiography:* 3D reconstruction, cone-beam CT

**Common Catheter Shapes:**
- *Pigtail:* Aortic flush angiography
- *Cobra:* Visceral arteries (celiac, SMA)
- *SOS/Simmons:* Acute angle origins
- *Berenstein:* Selective catheterization
- *Microcatheters:* Superselective embolization

**Standard Projections:**
- AP and lateral for most territories
- Obliques to open up bifurcations
- Cranial/caudal angulation as needed

**Complications of Diagnostic Angiography:**
- Access site: Hematoma (3-5%), pseudoaneurysm (0.5%), AV fistula
- Catheter-related: Dissection, thromboembolism, vessel perforation
- Contrast-related: Reaction, nephropathy
- Overall major complication rate: <1%

**Pressure Measurements:**
- Pull-back gradient across stenosis
- >10-15 mmHg resting gradient = significant
- Use vasodilators (papaverine, nitroglycerin) to unmask borderline stenoses`
          }
        ]
      },
      {
        id: '2.1.9',
        number: '2.1.9',
        title: 'Core Procedures in Interventional Radiology',
        frequency: 'green',
        knowledgeItems: [
          {
            id: '2.1.9-1',
            title: 'Hemorrhage control - GI bleeding embolization',
            explanation: `**Indications:**
- Massive upper or lower GI bleeding
- Hemodynamic instability despite resuscitation
- Failed or unavailable endoscopic therapy
- Bleeding source identified on CTA or angiography

**Upper GI Bleeding:**
*Common sources:* Gastroduodenal artery (duodenal ulcer), left gastric artery (gastric ulcer), splenic artery branches

*Approach:*
- Celiac artery → hepatic artery → gastroduodenal artery
- Also evaluate left gastric artery territory

**Lower GI Bleeding:**
*Common sources:* Right colic branches (diverticular), ileocolic (angiodysplasia)

*Approach:*
- SMA for right colon and small bowel
- IMA for left colon (rarely needed due to watershed)

**Technical Considerations:**
- Provocative angiography if no active bleeding seen (heparin, vasodilators, thrombolytics)
- Superselective catheterization to minimize ischemia
- Coils preferred for larger vessels
- Gelfoam, PVA, or glue for smaller vessels
- Empiric embolization of suspected culprit vessel if CTA positive but angio negative

**Embolic Agents:**
- *Coils:* Permanent, precise, good for larger vessels
- *Gelfoam:* Temporary (weeks), slurry for distal territory
- *Particles:* PVA (permanent), Gelfoam pledge
- *Glue (NBCA):* Permanent, fast, requires experience

**Outcomes:**
- Technical success: 80-95%
- Clinical success: 60-80%
- Rebleeding rate: 15-30%
- Bowel ischemia: 5-10% (usually self-limiting)

**Complications:**
- Non-target embolization
- Bowel ischemia/infarction
- Access site complications
- Contrast nephropathy`
          },
          {
            id: '2.1.9-2',
            title: 'Hemorrhage control - Trauma embolization',
            explanation: `**Indications:**
- Hemodynamically unstable trauma patient
- Active extravasation on CT
- Ongoing transfusion requirements
- Solid organ injury with vascular component
- Pelvic fractures with hemorrhage

**Solid Organ Injury:**

*Liver:*
- Most common indication: Hepatic artery injury, pseudoaneurysm
- Superselective embolization preserves hepatic parenchyma
- Dual blood supply (hepatic artery + portal vein) protects from ischemia
- Can embolize right or left hepatic artery if needed

*Spleen:*
- Proximal embolization (main splenic artery) for high-grade injury
- Distal embolization for focal injuries (pseudoaneurysm, AV fistula)
- Proximal embolization maintains splenic function via collaterals
- Post-embolization: fever, LUQ pain common (splenic infarcts)

*Kidney:*
- Superselective embolization preferred to preserve parenchyma
- Segmental artery embolization causes focal infarction
- Main renal artery embolization → nephrectomy equivalent

**Pelvic Trauma:**
- Most bleeding is venous (not amenable to embolization)
- Arterial bleeding: Internal iliac artery branches
- Empiric bilateral internal iliac embolization may be performed
- Non-selective gelfoam embolization often effective
- Avoid gluteal artery occlusion (wound healing, buttock necrosis)

**Emergency Setup:**
- Minimal prep time
- Femoral access (may need bilateral)
- 5F sheath initially, upsize if needed
- Have coils, gelfoam ready
- Coordinate with trauma team, OR on standby

**Key Points:**
- Speed is essential
- Communication with trauma team critical
- May need to embolize before formal angiographic diagnosis
- Damage control approach - stop bleeding, worry about perfection later`
          },
          {
            id: '2.1.9-3',
            title: 'Sepsis control - Biliary drainage',
            explanation: `**Indications for Percutaneous Biliary Drainage:**
- Obstructive jaundice with cholangitis
- Biliary sepsis
- Failed ERCP or ERCP not available
- Preoperative biliary decompression
- Palliative drainage for malignant obstruction
- Post-surgical biliary leak or stricture

**Clinical Presentation of Cholangitis (Charcot's Triad):**
1. Fever/rigors
2. Jaundice
3. RUQ pain

*Reynolds' Pentad (severe):* Add hypotension and confusion

**Anatomy:**
- Right ducts: Anterior (segments 5,8) and Posterior (segments 6,7)
- Left duct: Segments 2,3,4
- Common hepatic duct → common bile duct → ampulla

**Technique:**
1. *Access:* Usually right-sided, mid-axillary approach, subcostal
2. *Target:* Peripheral duct to allow for tract maturation
3. *Initial puncture:* 21-22G needle under US/fluoroscopic guidance
4. *Cholangiogram:* Define anatomy and level of obstruction
5. *Wire passage:* Through obstruction if possible
6. *Drainage:* 8-12F pigtail catheter

**Types of Drainage:**
- *External:* Catheter above obstruction, drains externally
- *Internal-external:* Catheter crosses obstruction, drains to duodenum and externally
- *Internal (stent):* Definitive management, metallic or plastic

**Complications:**
- Bleeding (hemobilia): 2-5%
- Sepsis exacerbation: Important to give antibiotics before procedure
- Bile leak/biloma
- Catheter dislodgement
- Cholangitis
- Pleural transgression (pneumothorax, empyema)

**Antibiotics:**
- Give before procedure
- Cover gram-negative and anaerobes
- Example: Piperacillin-tazobactam, or ciprofloxacin + metronidazole`
          },
          {
            id: '2.1.9-4',
            title: 'Sepsis control - Nephrostomy',
            explanation: `**Indications:**
- Obstructed and infected kidney (pyonephrosis) - EMERGENCY
- Ureteric obstruction (stones, malignancy, stricture)
- Urinary diversion for fistula or post-surgical leak
- Access for antegrade ureteric procedures
- Preoperative decompression

**Pyonephrosis:**
- Clinical: Fever, flank pain, obstructed system
- US: Hydronephrosis with debris/echoes in collecting system
- EMERGENCY: Can progress to septic shock rapidly
- Decompress first, treat cause later

**Technique:**
1. *Position:* Prone or prone-oblique
2. *Approach:* Posterolateral, below 12th rib, through Brodel's line (avascular plane)
3. *Target:* Lower pole calyx (posterior) for access to ureter; middle/upper for drainage only
4. *Guidance:* Ultrasound for puncture, fluoroscopy for wire/catheter
5. *Puncture:* 18-21G needle into calyx
6. *Confirm position:* Aspirate urine (may be purulent)
7. *Wire passage:* Into collecting system or down ureter
8. *Drainage:* 8-12F pigtail catheter

**Anatomical Considerations:**
- Posterior calyces face posterolaterally → safest access
- Anterior calyces face anteromedially
- Avoid transverse processes and lower ribs
- Interpolar approach for ureteric access
- Upper pole may require supracostal approach (risk of pleural transgression)

**Complications:**
- Bleeding: Hematuria common, significant bleeding rare (pseudoaneurysm, AV fistula)
- Sepsis: Ensure antibiotics given; fever common post-procedure
- Pleural injury: Pneumothorax, hydrothorax
- Urinoma
- Catheter dislodgement

**Post-Procedure Care:**
- Monitor urine output (should improve)
- Monitor for sepsis
- Flush tube daily to maintain patency
- Plan definitive treatment (JJ stent, lithotripsy, surgery)
- Nephrostogram before removal to confirm drainage`
          },
          {
            id: '2.1.9-5',
            title: 'Sepsis control - Abscess drainage',
            explanation: `**Indications:**
- Infected fluid collection >3cm (generally)
- Drainable route available
- Alternative to surgery in many cases

**Contraindications (relative):**
- No safe access route
- Coagulopathy (correct first)
- Multiple small abscesses (may not be amenable)
- Echinococcal cyst (risk of anaphylaxis and dissemination)

**Imaging Guidance:**
- *CT:* Best for deep abscesses, complex anatomy
- *US:* Good for superficial, liver, pelvis
- *Fluoroscopy:* Used with contrast for drain checks

**Technique:**
*Trocar technique:*
- Direct puncture with drainage catheter over stylet
- Quick, single-step
- Risk of injury if collection decompresses

*Seldinger technique:*
- Needle puncture → wire → serial dilation → catheter
- Safer for deep collections
- Allows upsizing if needed

**Catheter Selection:**
- 8-14F for most collections
- Larger (14-16F+) for viscous collections
- Multiple sideholes
- Pigtail configuration for retention

**Specific Collections:**

*Intra-abdominal:*
- Liver abscess: 8-12F, consider aspiration alone if <5cm
- Pelvic abscess: Transgluteal, transrectal, or transvaginal approach
- Appendiceal abscess: May allow interval appendicectomy

*Thoracic:*
- Empyema: Requires larger bore (12-16F+), often needs suction
- Lung abscess: Consider bronchial drainage, surgical risk

**Post-Procedure Management:**
- Regular flushes (saline 10mL TDS)
- Monitor output
- Repeat imaging if no improvement
- Catheter removal when output <10mL/day, afebrile, imaging clear

**Complications:**
- Bleeding
- Bowel/hollow viscus injury
- Bacteremia
- Fistula formation
- Catheter dislodgement
- Incomplete drainage (loculations)`
          },
          {
            id: '2.1.9-6',
            title: 'Thrombolysis for acute limb ischemia',
            explanation: `**Definition of Acute Limb Ischemia (ALI):**
- Sudden decrease in limb perfusion threatening viability
- Duration <14 days
- Caused by embolism or in-situ thrombosis

**Rutherford Classification of ALI:**
- **I (Viable):** No sensory loss, no weakness, audible Doppler signals
- **IIa (Marginally threatened):** Minimal sensory loss (toes), no weakness, often inaudible arterial Doppler
- **IIb (Immediately threatened):** Sensory loss beyond toes, mild-moderate weakness, usually inaudible arterial Doppler
- **III (Irreversible):** Profound sensory loss, paralysis, inaudible Dopplers, mottling - amputation likely

**Treatment by Category:**
- Category I: Elective investigation and treatment
- Category IIa: Urgent treatment - good candidate for thrombolysis
- Category IIb: Urgent - thrombolysis or surgery (often surgery preferred)
- Category III: Primary amputation

**Thrombolysis Technique:**
1. *Access:* Antegrade or contralateral retrograde femoral approach
2. *Initial angiogram:* Define occlusion level and extent
3. *Wire traversal:* Cross occlusion with hydrophilic wire
4. *Catheter positioning:* Multi-sidehole catheter embedded in thrombus
5. *Thrombolytic infusion:* Alteplase (tPA) 0.5-1 mg/hr typical
6. *Adjunctive heparin:* Low-dose through sheath (500 units/hr)
7. *Check angiogram:* 4-12h intervals
8. *Treat underlying lesion:* Angioplasty/stenting of unmasked stenosis

**Contraindications:**
*Absolute:*
- Active internal bleeding
- Recent stroke (<2 months)
- Intracranial pathology (tumor, AVM)

*Relative:*
- Recent surgery or trauma (<10 days)
- Uncontrolled hypertension
- Pregnancy
- Coagulopathy
- GI bleeding (<10 days)

**Complications:**
- Bleeding (major: 5-10%)
- Distal embolization (can treat with aspiration/continued lysis)
- Compartment syndrome (monitor, fasciotomy if needed)
- Stroke
- Access site complications

**Alternatives/Adjuncts:**
- Percutaneous mechanical thrombectomy (faster but availability varies)
- Aspiration thrombectomy
- Surgical thrombectomy
- Combination approaches`
          }
        ]
      }
    ]
  },
  // More chapters will be added in subsequent file updates...
]

const frequencyLabels = {
  green: 'Frequently Tested',
  yellow: 'Most Examinations',
  red: 'Rarely Tested',
  purple: 'Competency Checklist'
}

const frequencyColors = {
  green: 'bg-green-100 text-green-800 border-green-300',
  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  red: 'bg-red-100 text-red-800 border-red-300',
  purple: 'bg-purple-100 text-purple-800 border-purple-300'
}

export default function SyllabusGuide() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set(['section-a']))
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null)

  const toggleChapter = (id: string) => {
    const newExpanded = new Set(expandedChapters)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedChapters(newExpanded)
  }

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedSections(newExpanded)
  }

  // Search functionality
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return syllabusData

    const query = searchQuery.toLowerCase()
    return syllabusData.map(chapter => ({
      ...chapter,
      sections: chapter.sections.filter(section => {
        const titleMatch = section.title.toLowerCase().includes(query)
        const itemMatch = section.knowledgeItems?.some(item => 
          item.title.toLowerCase().includes(query) || 
          item.explanation.toLowerCase().includes(query)
        )
        const subsectionMatch = section.subsections?.some(sub =>
          sub.title.toLowerCase().includes(query) ||
          sub.knowledgeItems.some(item => 
            item.title.toLowerCase().includes(query) ||
            item.explanation.toLowerCase().includes(query)
          )
        )
        return titleMatch || itemMatch || subsectionMatch
      })
    })).filter(chapter => chapter.sections.length > 0)
  }, [searchQuery])

  return (
    <div className="max-w-6xl mx-auto pb-20 lg:pb-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <GraduationCap className="w-7 h-7 text-purple-600" />
          EBIR Syllabus Study Guide
        </h1>
        <p className="text-gray-600 mt-1">
          European Curriculum and Syllabus for Interventional Radiology (2023)
        </p>
      </div>

      {/* Reference Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex gap-3">
          <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Reference</p>
            <p className="mt-1">
              Based on the European Curriculum and Syllabus for Interventional Radiology, Third Edition (2023), 
              published by CIRSE and the UEMS Division of Interventional Radiology.
            </p>
            <a 
              href="https://www.cirse.org/wp-content/uploads/2023/04/cirse_IRcurriculum_syllabus_2023_web.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 mt-2 font-medium"
            >
              View Original Document <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Frequency Legend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Examination Frequency Guide</h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(frequencyLabels).map(([key, label]) => (
            <span key={key} className={`px-3 py-1 rounded-full text-xs font-medium border ${frequencyColors[key as ExamFrequency]}`}>
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search topics (e.g., PAE, TIPS, biopsy, embolization...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Contents</h2>
          </div>
          <div className="max-h-[600px] overflow-y-auto divide-y divide-gray-100">
            {filteredData.map(chapter => (
              <div key={chapter.id}>
                <button
                  onClick={() => toggleChapter(chapter.id)}
                  className="w-full px-4 py-3 flex items-center gap-2 hover:bg-gray-50 text-left"
                >
                  {expandedChapters.has(chapter.id) ? (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  )}
                  <span className="font-medium text-purple-600">Section {chapter.letter}</span>
                  <span className="text-gray-700 text-sm">{chapter.title}</span>
                </button>

                {expandedChapters.has(chapter.id) && (
                  <div className="bg-gray-50 border-t border-gray-100">
                    {chapter.sections.map(section => (
                      <div key={section.id}>
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="w-full px-6 py-2 flex items-center gap-2 hover:bg-gray-100 text-left"
                        >
                          {expandedSections.has(section.id) ? (
                            <ChevronDown className="w-3 h-3 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-3 h-3 text-gray-400" />
                          )}
                          <span className="text-sm text-gray-600">{section.number}</span>
                          <span className="text-sm text-gray-800">{section.title}</span>
                          {section.frequency && (
                            <span className={`ml-auto w-2 h-2 rounded-full ${
                              section.frequency === 'green' ? 'bg-green-500' :
                              section.frequency === 'yellow' ? 'bg-yellow-500' :
                              section.frequency === 'red' ? 'bg-red-500' : 'bg-purple-500'
                            }`} />
                          )}
                        </button>

                        {expandedSections.has(section.id) && section.knowledgeItems && (
                          <div className="bg-white border-t border-gray-100">
                            {section.knowledgeItems.map(item => (
                              <button
                                key={item.id}
                                onClick={() => setSelectedItem(item)}
                                className={`w-full px-8 py-2 text-left text-sm hover:bg-purple-50 flex items-center gap-2 ${
                                  selectedItem?.id === item.id ? 'bg-purple-50 text-purple-700' : 'text-gray-600'
                                }`}
                              >
                                <CheckCircle className={`w-3 h-3 flex-shrink-0 ${
                                  selectedItem?.id === item.id ? 'text-purple-500' : 'text-gray-300'
                                }`} />
                                <span className="line-clamp-1">{item.title}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">
              {selectedItem ? selectedItem.title : 'Select a Topic'}
            </h2>
          </div>
          
          {selectedItem ? (
            <div className="p-6 max-h-[600px] overflow-y-auto">
              <div className="prose prose-sm max-w-none">
                {selectedItem.explanation.split('\n').map((line, idx) => {
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <h3 key={idx} className="font-bold text-gray-900 mt-4 mb-2">{line.replace(/\*\*/g, '')}</h3>
                  }
                  if (line.startsWith('*') && line.includes(':*')) {
                    const [term, ...rest] = line.split(':*')
                    return (
                      <p key={idx} className="mb-1">
                        <strong className="text-gray-800">{term.replace('*', '')}:</strong>
                        {rest.join(':*').replace(/\*/g, '')}
                      </p>
                    )
                  }
                  if (line.startsWith('- ')) {
                    return <li key={idx} className="ml-4 text-gray-700">{line.substring(2)}</li>
                  }
                  if (line.trim() === '') {
                    return <br key={idx} />
                  }
                  return <p key={idx} className="text-gray-700 mb-2">{line}</p>
                })}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p>Select a topic from the contents to view study material</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
