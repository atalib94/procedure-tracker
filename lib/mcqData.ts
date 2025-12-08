// EBIR MCQ Question Bank - Expanded Edition (160 Questions)

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
  // SECTION A (35 questions)
  {id:'A001',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Patient Safety',question:'A 65-year-old man develops nausea during a procedure. What is the most appropriate IV metoclopramide dose?',options:['1 mg','10 mg','20 mg','4 mg'],correctAnswers:[1],explanation:'Standard IV dose is 10mg. EMA recommends max 30mg/day.',difficulty:'easy',examFrequency:'medium'},
  {id:'A002',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Radiation Safety',question:'What is the attenuation of a 0.5 mm lead equivalent apron?',options:['50-70%','70-90%','90-95%','95-99%'],correctAnswers:[3],explanation:'A 0.5 mm lead apron attenuates 95-99% of scattered radiation.',difficulty:'medium',examFrequency:'high'},
  {id:'A003',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Radiation Safety',question:'Which method is most effective to reduce operator radiation dose?',options:['Using last image hold','Increasing distance from X-ray source','Wearing thyroid shield','Pulsed fluoroscopy'],correctAnswers:[1],explanation:'Doubling distance reduces exposure by factor of 4 (inverse square law).',difficulty:'easy',examFrequency:'high'},
  {id:'A004',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Contrast Media',question:'For a patient with eGFR 28, which measure best prevents CIN?',options:['N-acetylcysteine','IV sodium bicarbonate','IV isotonic saline hydration','Prophylactic hemodialysis'],correctAnswers:[2],explanation:'IV saline hydration has strongest evidence for preventing CIN.',difficulty:'medium',examFrequency:'high'},
  {id:'A005',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Sedation',question:'During sedation, patient becomes unresponsive with O2 sat 82%. First action?',options:['Flumazenil IV','Naloxone IV','Jaw thrust and supplemental oxygen','Immediate intubation'],correctAnswers:[2],explanation:'First priority is basic airway management before reversal agents.',difficulty:'medium',examFrequency:'high'},
  {id:'A006',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Anticoagulation',question:'Patient on rivaroxaban needs urgent high-risk procedure. Last dose 14 hours ago. Management?',options:['Proceed immediately','Delay at least 24 hours','Give PCC before proceeding','Check anti-Xa levels'],correctAnswers:[1],explanation:'Hold rivaroxaban 24-48 hours for high-risk procedures.',difficulty:'medium',examFrequency:'high'},
  {id:'A007',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Vascular Access',question:'Ideal landmark for CFA puncture?',options:['At inguinal ligament','Over femoral head on fluoro','At SFA/profunda bifurcation','At lesser trochanter'],correctAnswers:[1],explanation:'Puncture over femoral head ensures CFA access and allows compression.',difficulty:'easy',examFrequency:'high'},
  {id:'A008',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Wires and Catheters',question:'Most important guidewire characteristic for CTO crossing?',options:['Hydrophilic coating','High tip stiffness','Large diameter 0.038"','Floppy tip'],correctAnswers:[1],explanation:'High tip stiffness needed to penetrate fibrous cap.',difficulty:'medium',examFrequency:'medium'},
  {id:'A009',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Embolization',question:'Best embolic agent for bronchial artery embolization?',options:['Gelfoam slurry','PVA particles 300-500 μm','Coils alone','Absolute ethanol'],correctAnswers:[1],explanation:'PVA 300-500 μm provides distal embolization, minimizes spinal artery risk.',difficulty:'medium',examFrequency:'high'},
  {id:'A010',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Embolization',question:'Mechanism of action of NBCA glue?',options:['Thermal coagulation','Polymerization on ionic contact','Mechanical obstruction only','Chemical sclerosis'],correctAnswers:[1],explanation:'NBCA polymerizes on contact with blood, creating permanent cast.',difficulty:'medium',examFrequency:'medium'},
  {id:'A011',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Stents',question:'Advantage of self-expanding vs balloon-expandable stents?',options:['Greater radial force','More precise deployment','Better tortuous vessel conformability','Lower profile'],correctAnswers:[2],explanation:'Self-expanding stents are more flexible and conform better.',difficulty:'easy',examFrequency:'high'},
  {id:'A012',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Complications',question:'Acute leg ischemia immediately after femoral angiography - most likely cause?',options:['Vasospasm','Arterial thrombosis/embolism','Compartment syndrome','Contrast vasoconstriction'],correctAnswers:[1],explanation:'Usually due to thrombosis at puncture site or distal embolization.',difficulty:'medium',examFrequency:'high'},
  {id:'A013',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Closure Devices',question:'Contraindication to vascular closure device after 6Fr diagnostic angiography?',options:['Mild PAD','Puncture in SFA','BMI >35','Previous closure device 6 months ago'],correctAnswers:[1],explanation:'SFA puncture is contraindication due to smaller vessel diameter.',difficulty:'medium',examFrequency:'high'},
  {id:'A014',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Hepatic Venous Pressure',question:'WHVP 22 mmHg, FHVP 6 mmHg. What does this indicate?',options:['Normal portal pressure','Mild portal hypertension','Clinically significant portal hypertension','Pre-sinusoidal portal hypertension'],correctAnswers:[2],explanation:'HVPG=16 mmHg. ≥10 mmHg = clinically significant portal hypertension.',difficulty:'medium',examFrequency:'high'},
  {id:'A015',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Radiation Safety',question:'Annual occupational dose limit (ICRP)?',options:['10 mSv','20 mSv','50 mSv','100 mSv'],correctAnswers:[1],explanation:'ICRP recommends 20 mSv/year averaged over 5 years.',difficulty:'easy',examFrequency:'high'},
  {id:'A016',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Radiation Safety',question:'Which projection gives highest operator radiation dose?',options:['AP','LAO','RAO','Lateral'],correctAnswers:[1],explanation:'LAO positions tube on operators side, increasing scatter exposure.',difficulty:'medium',examFrequency:'high'},
  {id:'A017',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Contrast Media',question:'Premedication protocol for severe prior contrast reaction?',options:['Hydrocortisone 200mg IV immediately','Prednisone 50mg at 13, 7, 1 hr + diphenhydramine','Diphenhydramine 50mg IV only','Contrast must be avoided'],correctAnswers:[1],explanation:'Standard protocol: steroids at 13, 7, 1 hour plus antihistamine.',difficulty:'medium',examFrequency:'high'},
  {id:'A018',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Contrast Media',question:'TRUE statement about gadolinium-based contrast?',options:['Safe in all renal impairment','NSF risk highest with linear agents','Safe in iodine allergy without precautions','Group II agents have highest NSF risk'],correctAnswers:[1],explanation:'Linear (Group I) agents have highest NSF risk; macrocyclic are safer.',difficulty:'medium',examFrequency:'medium'},
  {id:'A019',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Anticoagulation',question:'Target INR for urgent biliary drainage in patient on warfarin with INR 2.8?',options:['<1.5','<1.8','<2.0','Proceed regardless'],correctAnswers:[0],explanation:'Target INR <1.5 for high-bleeding-risk procedures.',difficulty:'medium',examFrequency:'high'},
  {id:'A020',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Anticoagulation',question:'Which DOAC has a specific reversal agent?',options:['Rivaroxaban','Apixaban','Dabigatran','Edoxaban'],correctAnswers:[2],explanation:'Dabigatran reversed with idarucizumab (Praxbind).',difficulty:'easy',examFrequency:'high'},
  {id:'A021',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Sedation',question:'Half-life of midazolam?',options:['30 minutes','1-2 hours','2-4 hours','6-8 hours'],correctAnswers:[1],explanation:'Midazolam half-life ~1.5-2.5 hours in healthy adults.',difficulty:'easy',examFrequency:'medium'},
  {id:'A022',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Antibiotics',question:'Which procedure requires routine antibiotic prophylaxis per CIRSE?',options:['Diagnostic angiography','UFE','TIPS creation','Peripheral angioplasty'],correctAnswers:[2],explanation:'TIPS requires prophylaxis due to porto-systemic shunt creation.',difficulty:'medium',examFrequency:'medium'},
  {id:'A023',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Vascular Access',question:'Preferred needle angle for US-guided venous access?',options:['15-30°','30-45°','45-60°','60-90°'],correctAnswers:[1],explanation:'30-45° provides optimal needle visualization on ultrasound.',difficulty:'easy',examFrequency:'medium'},
  {id:'A024',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Wires and Catheters',question:'Reverse curve catheter (SOS Omni, Simmons) requires:',options:['Direct advancement','Reformation in aorta','Brachial approach only','Stiff guidewire'],correctAnswers:[1],explanation:'Must be reformed in large vessel before selecting branches.',difficulty:'easy',examFrequency:'medium'},
  {id:'A025',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Embolization',question:'Recommended NBCA:Lipiodol ratio for high-flow AVMs?',options:['1:1 (50%)','1:2 (33%)','1:3 (25%)','1:4 (20%)'],correctAnswers:[0],explanation:'Higher concentration (1:1) achieves rapid polymerization for high-flow lesions.',difficulty:'hard',examFrequency:'medium'},
  {id:'A026',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Radiation Safety',question:'Threshold skin dose for erythema?',options:['0.5 Gy','2 Gy','5 Gy','10 Gy'],correctAnswers:[1],explanation:'Transient erythema occurs at ~2 Gy.',difficulty:'medium',examFrequency:'high'},
  {id:'A027',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Contrast Media',question:'CO2 angiography is contraindicated where?',options:['Abdominal aorta','Lower extremity arteries','Cerebral circulation','Hepatic arteries'],correctAnswers:[2],explanation:'Absolutely contraindicated above diaphragm - risk of cerebral air embolism.',difficulty:'easy',examFrequency:'high'},
  {id:'A028',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Anticoagulation',question:'Minimum time to hold clopidogrel before high-risk procedure?',options:['24 hours','3 days','5 days','7 days'],correctAnswers:[2],explanation:'Hold clopidogrel 5 days for platelet function recovery.',difficulty:'easy',examFrequency:'high'},
  {id:'A029',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Anticoagulation',question:'Bridging with LMWH recommended for:',options:['AF with CHA2DS2-VASc 2','Mechanical mitral valve','DVT >6 months ago','Bioprosthetic aortic valve'],correctAnswers:[1],explanation:'Mechanical valves (especially mitral) have highest thromboembolic risk.',difficulty:'medium',examFrequency:'medium'},
  {id:'A030',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Embolization',question:'Gelfoam provides temporary occlusion for:',options:['24-48 hours','1-2 weeks','2-6 weeks','3-6 months'],correctAnswers:[2],explanation:'Gelfoam resorbs, recanalization occurs in 2-6 weeks.',difficulty:'easy',examFrequency:'medium'},
  {id:'A031',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Stents',question:'Preferred stent for ostial renal artery stenosis?',options:['Self-expanding nitinol','Balloon-expandable','Covered stent-graft','Drug-eluting'],correctAnswers:[1],explanation:'Balloon-expandable for precise placement and higher radial force.',difficulty:'medium',examFrequency:'high'},
  {id:'A032',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Radiation Safety',question:'Dose area product (DAP) is measured in:',options:['mGy','mSv','Gy·cm²','rad'],correctAnswers:[2],explanation:'DAP measured in Gy·cm², represents total radiation output.',difficulty:'easy',examFrequency:'medium'},
  {id:'A033',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Vascular Access',question:'Micropuncture systems use which initial needle gauge?',options:['18G','19G','21G','25G'],correctAnswers:[2],explanation:'21G needles standard for micropuncture access.',difficulty:'easy',examFrequency:'medium'},
  {id:'A034',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Contrast Media',question:'Osmolality of iso-osmolar contrast media?',options:['290 mOsm/kg','500 mOsm/kg','800 mOsm/kg','1500 mOsm/kg'],correctAnswers:[0],explanation:'IOCM (e.g., iodixanol) ~290 mOsm/kg, similar to blood.',difficulty:'medium',examFrequency:'medium'},
  {id:'A035',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Sedation',question:'Ramsay sedation scale score 3 indicates:',options:['Anxious/agitated','Cooperative/tranquil','Responds to commands only','Responds to glabellar tap'],correctAnswers:[2],explanation:'Ramsay 3 = sedated but responds to commands.',difficulty:'medium',examFrequency:'low'},
  
 
  // SECTION B (35 questions)
  {id:'B036',section:'B',sectionTitle:'Vascular Intervention',subsection:'PAD',question:'Fontaine classification Stage IIb indicates:',options:['Asymptomatic','Claudication >200m','Claudication <200m','Rest pain'],correctAnswers:[2],explanation:'IIa = claudication >200m; IIb = claudication <200m.',difficulty:'medium',examFrequency:'high'},
{id:'B037',section:'B',sectionTitle:'Vascular Intervention',subsection:'PAD',question:'In-stent restenosis in femoropopliteal segment is best treated with:',options:['Repeat bare metal stenting','Drug-coated balloon angioplasty','Atherectomy alone','Bypass surgery'],correctAnswers:[1],explanation:'DCB has best outcomes for femoropopliteal ISR.',difficulty:'medium',examFrequency:'high'},
{id:'B038',section:'B',sectionTitle:'Vascular Intervention',subsection:'Carotid',question:'Hyperperfusion syndrome after carotid stenting typically presents:',options:['Immediately during procedure','1-7 days post-procedure','2-4 weeks post-procedure','Months later'],correctAnswers:[1],explanation:'Usually 1-7 days post-procedure, presents with headache, seizures, ICH.',difficulty:'medium',examFrequency:'medium'},
{id:'B039',section:'B',sectionTitle:'Vascular Intervention',subsection:'EVAR',question:'Type III endoleak is caused by:',options:['Inadequate seal at attachment','Branch vessel retrograde flow','Graft fabric tear or modular disconnection','Graft porosity'],correctAnswers:[2],explanation:'Type III = structural graft failure (fabric tear, modular disconnection).',difficulty:'medium',examFrequency:'high'},
{id:'B040',section:'B',sectionTitle:'Vascular Intervention',subsection:'EVAR',question:'Post-EVAR surveillance typically includes CT at:',options:['1 month only','1 month, 6 months, then annually','6 months only','Annually from start'],correctAnswers:[1],explanation:'Standard: 1 month, 6-12 months, then annually if stable.',difficulty:'easy',examFrequency:'medium'},
{id:'B041',section:'B',sectionTitle:'Vascular Intervention',subsection:'Venous',question:'Nutcracker syndrome involves compression of:',options:['Left renal vein between aorta and SMA','Right renal vein by IVC','Left common iliac vein','Gonadal vein'],correctAnswers:[0],explanation:'Left renal vein compressed between aorta and SMA.',difficulty:'medium',examFrequency:'medium'},
{id:'B042',section:'B',sectionTitle:'Vascular Intervention',subsection:'TIPS',question:'TIPS is indicated for all EXCEPT:',options:['Refractory variceal bleeding','Refractory ascites','Budd-Chiari syndrome','Primary prevention of variceal bleeding'],correctAnswers:[3],explanation:'TIPS not indicated for primary prevention; used for secondary prevention.',difficulty:'medium',examFrequency:'high'},
{id:'B043',section:'B',sectionTitle:'Vascular Intervention',subsection:'Dialysis',question:'Steal syndrome is best initially managed by:',options:['Fistula ligation','DRIL procedure','Banding','Observation'],correctAnswers:[2],explanation:'Initial management: banding to reduce flow. DRIL for refractory cases.',difficulty:'medium',examFrequency:'medium'},
{id:'B044',section:'B',sectionTitle:'Vascular Intervention',subsection:'Pulmonary',question:'Catheter-directed thrombolysis for massive PE uses which agent?',options:['Streptokinase','Alteplase (tPA)','Urokinase','Heparin'],correctAnswers:[1],explanation:'Alteplase (tPA) is standard for catheter-directed PE thrombolysis.',difficulty:'easy',examFrequency:'high'},
{id:'B045',section:'B',sectionTitle:'Vascular Intervention',subsection:'Trauma',question:'AAST grade IV splenic injury involves:',options:['Subcapsular hematoma <10%','Laceration >3 cm depth','Hilar vascular injury or >25% devascularization','Shattered spleen'],correctAnswers:[2],explanation:'Grade IV = hilar injury or >25% devascularization; Grade V = shattered.',difficulty:'hard',examFrequency:'medium'},
{id:'B046',section:'B',sectionTitle:'Vascular Intervention',subsection:'Venous',question:'Paget-Schroetter syndrome refers to:',options:['May-Thurner with DVT','Effort thrombosis of subclavian vein','SVC syndrome','Ovarian vein thrombosis'],correctAnswers:[1],explanation:'Upper extremity DVT from thoracic outlet compression, often in athletes.',difficulty:'medium',examFrequency:'medium'},
{id:'B047',section:'B',sectionTitle:'Vascular Intervention',subsection:'Mesenteric',question:'NOMI (non-occlusive mesenteric ischemia) is best treated with:',options:['Surgical revascularization','Intra-arterial vasodilators (papaverine)','Stenting','Thrombolysis'],correctAnswers:[1],explanation:'NOMI from vasospasm; treat with intra-arterial papaverine.',difficulty:'medium',examFrequency:'medium'},
{id:'B048',section:'B',sectionTitle:'Vascular Intervention',subsection:'Renal',question:'Flash pulmonary edema is associated with:',options:['Unilateral RAS','Bilateral RAS or RAS in solitary kidney','Renal vein thrombosis','Nutcracker syndrome'],correctAnswers:[1],explanation:'Bilateral RAS or solitary kidney RAS causes flash pulmonary edema.',difficulty:'medium',examFrequency:'high'},
{id:'B049',section:'B',sectionTitle:'Vascular Intervention',subsection:'Aortic',question:'Endovascular repair of thoracic aortic aneurysm (TEVAR) requires minimum landing zone of:',options:['10 mm','15 mm','20 mm','25 mm'],correctAnswers:[2],explanation:'TEVAR requires ≥20 mm proximal and distal landing zones.',difficulty:'medium',examFrequency:'high'},
{id:'B050',section:'B',sectionTitle:'Vascular Intervention',subsection:'IVC Filters',question:'Optimal IVC filter retrieval window is:',options:['<2 weeks','<30 days','<3 months','As soon as indication resolves'],correctAnswers:[3],explanation:'Retrieve when no longer indicated; longer dwell increases retrieval difficulty.',difficulty:'easy',examFrequency:'high'},
{id:'B051',section:'B',sectionTitle:'Vascular Intervention',subsection:'PAD',question:'Critical limb ischemia is defined by:',options:['ABI <0.9','Claudication limiting lifestyle','Rest pain or tissue loss with ABI <0.4','Any symptom with PAD'],correctAnswers:[2],explanation:'CLI = rest pain >2 weeks or tissue loss with hemodynamic evidence of PAD.',difficulty:'medium',examFrequency:'high'},
{id:'B052',section:'B',sectionTitle:'Vascular Intervention',subsection:'Venous',question:'First-line treatment for symptomatic central venous stenosis in dialysis patient?',options:['Surgical bypass','Balloon angioplasty','Primary stenting','Thrombolysis'],correctAnswers:[1],explanation:'Balloon angioplasty first-line; stenting for recurrent/refractory stenosis.',difficulty:'medium',examFrequency:'medium'},
{id:'B053',section:'B',sectionTitle:'Vascular Intervention',subsection:'TIPS',question:'Covered stents in TIPS compared to bare metal have:',options:['Higher encephalopathy rate','Better patency','Higher mortality','No difference'],correctAnswers:[1],explanation:'Covered stents (PTFE) have significantly better patency rates.',difficulty:'easy',examFrequency:'medium'},
{id:'B054',section:'B',sectionTitle:'Vascular Intervention',subsection:'Hemorrhage',question:'Postpartum hemorrhage embolization most commonly targets:',options:['Ovarian arteries','Uterine arteries','Internal iliac arteries','Vaginal arteries'],correctAnswers:[1],explanation:'Bilateral uterine artery embolization is first-line.',difficulty:'easy',examFrequency:'high'},
{id:'B055',section:'B',sectionTitle:'Vascular Intervention',subsection:'Visceral',question:'Median arcuate ligament syndrome compresses:',options:['SMA','Celiac artery','IMA','Renal artery'],correctAnswers:[1],explanation:'Celiac artery compressed by median arcuate ligament, worse with expiration.',difficulty:'medium',examFrequency:'medium'},
  {id:'A036',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Radiation Safety',question:'Which tissue has the highest radiation sensitivity?',options:['Bone marrow','Liver','Muscle','Brain'],correctAnswers:[0],explanation:'Bone marrow and gonads are most radiosensitive. Rapidly dividing cells are more susceptible.',difficulty:'easy',examFrequency:'medium'},
{id:'A037',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Sedation',question:'What is the reversal agent for midazolam?',options:['Naloxone','Flumazenil','Atropine','Neostigmine'],correctAnswers:[1],explanation:'Flumazenil is the specific benzodiazepine antagonist.',difficulty:'easy',examFrequency:'high'},
{id:'A038',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Contrast Media',question:'Which contrast reaction is NOT IgE-mediated?',options:['Urticaria','Bronchospasm','Chemotoxic bradycardia','Angioedema'],correctAnswers:[2],explanation:'Chemotoxic reactions (bradycardia, hypotension) are direct physiologic effects, not allergic.',difficulty:'medium',examFrequency:'medium'},
{id:'A039',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Embolization',question:'What is the recommended particle size for prostatic artery embolization?',options:['100-300 μm','300-500 μm','500-700 μm','700-900 μm'],correctAnswers:[1],explanation:'300-500 μm particles standard for PAE to achieve adequate penetration.',difficulty:'medium',examFrequency:'medium'},
{id:'A040',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Anticoagulation',question:'Half-life of unfractionated heparin?',options:['30-60 minutes','60-90 minutes','2-3 hours','4-6 hours'],correctAnswers:[1],explanation:'UFH half-life ~60-90 minutes, reversed with protamine.',difficulty:'easy',examFrequency:'medium'},
{id:'A041',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Vascular Access',question:'What is the most common complication of radial artery access?',options:['Radial artery occlusion','Hematoma','Pseudoaneurysm','AV fistula'],correctAnswers:[0],explanation:'Radial artery occlusion occurs in 5-10% but usually asymptomatic due to collaterals.',difficulty:'medium',examFrequency:'medium'},
{id:'A042',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Radiation Safety',question:'What is the fetal dose threshold for deterministic effects?',options:['50 mGy','100 mGy','500 mGy','1000 mGy'],correctAnswers:[1],explanation:'Fetal doses <100 mGy not associated with increased malformation or IQ reduction.',difficulty:'hard',examFrequency:'medium'},
{id:'A043',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Embolization',question:'Onyx (EVOH) requires which catheter type for delivery?',options:['Standard diagnostic catheter','DMSO-compatible microcatheter','Balloon catheter','Guide catheter only'],correctAnswers:[1],explanation:'Onyx dissolved in DMSO requires DMSO-compatible microcatheters to prevent catheter damage.',difficulty:'medium',examFrequency:'medium'},
{id:'A044',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Antibiotics',question:'Which organism most commonly causes post-embolization abscess?',options:['Staphylococcus aureus','Escherichia coli','Bacteroides species','Streptococcus'],correctAnswers:[2],explanation:'Anaerobes (Bacteroides) common in post-embolization liver abscesses due to ischemia.',difficulty:'medium',examFrequency:'low'},
{id:'A045',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Contrast Media',question:'Metformin should be held after contrast administration in patients with eGFR <30 due to risk of:',options:['Contrast-induced nephropathy','Lactic acidosis','Hypoglycemia','Hepatotoxicity'],correctAnswers:[1],explanation:'Risk of lactic acidosis if renal function worsens; hold metformin 48 hours post-contrast.',difficulty:'medium',examFrequency:'high'},
{id:'A046',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Stents',question:'Drug-eluting stents most commonly elute:',options:['Heparin','Paclitaxel or sirolimus analogues','Aspirin','Clopidogrel'],correctAnswers:[1],explanation:'Paclitaxel and sirolimus/everolimus inhibit neointimal hyperplasia.',difficulty:'easy',examFrequency:'medium'},
{id:'A047',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Wires and Catheters',question:'A Tuohy-Borst adapter is used for:',options:['Wire introduction','Hemostatic valve and flushing','Balloon inflation','Stent deployment'],correctAnswers:[1],explanation:'Y-connector with hemostatic valve allowing wire manipulation while maintaining flush.',difficulty:'easy',examFrequency:'low'},
{id:'A048',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Complications',question:'SIR classification for minor complication requiring nominal therapy?',options:['Class A','Class B','Class C','Class D'],correctAnswers:[1],explanation:'SIR Class A=no therapy; B=nominal therapy; C=requires therapy, minor hospitalization; D-F=major.',difficulty:'medium',examFrequency:'medium'},
{id:'A049',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Radiation Safety',question:'Collimation reduces patient dose by:',options:['Reducing scatter only','Reducing primary beam area and scatter','Increasing image quality only','Filtering low-energy photons'],correctAnswers:[1],explanation:'Collimation reduces irradiated volume and scatter, improving image quality and reducing dose.',difficulty:'easy',examFrequency:'high'},
{id:'A050',section:'A',sectionTitle:'Fundamental Topics in IR',subsection:'Sedation',question:'ASA physical status III indicates:',options:['Normal healthy patient','Mild systemic disease','Severe systemic disease','Life-threatening disease'],correctAnswers:[2],explanation:'ASA III = severe systemic disease with functional limitation.',difficulty:'easy',examFrequency:'medium'},
  {id:'B001',section:'B',sectionTitle:'Vascular Intervention',subsection:'PAD',question:'TASC D lesion in femoropopliteal segment?',options:['Single stenosis ≤10 cm','CTO >20 cm involving popliteal','Multiple stenoses 10-15 cm','Single occlusion ≤5 cm'],correctAnswers:[1],explanation:'TASC D = CTOs >20 cm with popliteal involvement.',difficulty:'hard',examFrequency:'high'},
  {id:'B002',section:'B',sectionTitle:'Vascular Intervention',subsection:'PAD',question:'First-line treatment for focal iliac stenosis?',options:['DCB angioplasty','Plain balloon alone','Primary stenting','Atherectomy + balloon'],correctAnswers:[2],explanation:'Primary stenting standard for iliac lesions (>80% 5-year patency).',difficulty:'easy',examFrequency:'high'},
  {id:'B003',section:'B',sectionTitle:'Vascular Intervention',subsection:'PAD',question:'TRUE regarding DCB in femoropopliteal segment?',options:['Avoid in calcified lesions','Superior patency vs plain balloon','Requires 12-month DAPT','Contraindicated in ISR'],correctAnswers:[1],explanation:'DCBs show superior patency and useful for in-stent restenosis.',difficulty:'medium',examFrequency:'high'},
  {id:'B004',section:'B',sectionTitle:'Vascular Intervention',subsection:'ALI',question:'8-hour ALI with motor deficit, intact sensation. Rutherford class?',options:['I - Viable','IIa - Marginally threatened','IIb - Immediately threatened','III - Irreversible'],correctAnswers:[2],explanation:'IIb = motor deficit, requires emergent revascularization.',difficulty:'medium',examFrequency:'high'},
  {id:'B005',section:'B',sectionTitle:'Vascular Intervention',subsection:'ALI',question:'Maximum duration for catheter-directed thrombolysis in ALI?',options:['12 hours','24 hours','48 hours','72 hours'],correctAnswers:[2],explanation:'Limit to 48 hours to minimize bleeding complications.',difficulty:'medium',examFrequency:'medium'},
  {id:'B006',section:'B',sectionTitle:'Vascular Intervention',subsection:'Carotid',question:'Symptomatic carotid stenosis threshold for intervention?',options:['>50%','>60%','>70%','>80%'],correctAnswers:[0],explanation:'Intervention for symptomatic stenosis >50% (NASCET).',difficulty:'easy',examFrequency:'high'},
  {id:'B007',section:'B',sectionTitle:'Vascular Intervention',subsection:'Carotid',question:'Where to place embolic protection device during CAS?',options:['ICA distal to lesion','CCA proximal to lesion','ECA','Optional'],correctAnswers:[0],explanation:'Distal protection in ICA beyond the stenosis.',difficulty:'easy',examFrequency:'high'},
  {id:'B008',section:'B',sectionTitle:'Vascular Intervention',subsection:'EVAR',question:'What is Type II endoleak?',options:['Leak at attachment site','Retrograde flow from branch vessels','Leak through graft fabric','Leak at modular junctions'],correctAnswers:[1],explanation:'Type II = retrograde flow from lumbar arteries or IMA.',difficulty:'easy',examFrequency:'high'},
  {id:'B009',section:'B',sectionTitle:'Vascular Intervention',subsection:'EVAR',question:'Absolute contraindication to standard EVAR?',options:['Neck angle >60°','CIA diameter 20mm','Neck length 10mm','Previous open AAA repair'],correctAnswers:[2],explanation:'Neck <15mm inadequate for standard EVAR.',difficulty:'medium',examFrequency:'high'},
  {id:'B010',section:'B',sectionTitle:'Vascular Intervention',subsection:'Venous',question:'Best predictor of successful DVT thrombolysis?',options:['Age >65','Symptoms <14 days','Prior DVT history','May-Thurner anatomy'],correctAnswers:[1],explanation:'Early treatment (<14 days) = best thrombolysis outcomes.',difficulty:'medium',examFrequency:'high'},
  {id:'B011',section:'B',sectionTitle:'Vascular Intervention',subsection:'Venous',question:'What is May-Thurner syndrome?',options:['Left CIV compression by right CIA','Right CIV compression by left CIA','IVC compression by liver','Femoral vein compression'],correctAnswers:[0],explanation:'Left CIV compressed by right CIA against spine.',difficulty:'easy',examFrequency:'high'},
  {id:'B012',section:'B',sectionTitle:'Vascular Intervention',subsection:'TIPS',question:'Target portosystemic gradient after TIPS?',options:['<5 mmHg','<8 mmHg','<12 mmHg','<15 mmHg'],correctAnswers:[2],explanation:'Target <12 mmHg to reduce variceal rebleeding.',difficulty:'medium',examFrequency:'high'},
  {id:'B013',section:'B',sectionTitle:'Vascular Intervention',subsection:'TIPS',question:'Contraindication to TIPS?',options:['Child-Pugh B','Prior variceal banding','Severe right heart failure','Ascites'],correctAnswers:[2],explanation:'Right heart failure contraindicated - TIPS increases venous return.',difficulty:'medium',examFrequency:'high'},
  {id:'B014',section:'B',sectionTitle:'Vascular Intervention',subsection:'Dialysis',question:'Minimum vein diameter for AVF creation?',options:['1.5 mm','2.0 mm','2.5 mm','3.0 mm'],correctAnswers:[2],explanation:'≥2.5 mm recommended for successful AVF creation.',difficulty:'medium',examFrequency:'medium'},
  {id:'B015',section:'B',sectionTitle:'Vascular Intervention',subsection:'Dialysis',question:'Mature AVF with decreased flow and elevated venous pressures. Cause?',options:['Arterial inflow stenosis','Venous outflow stenosis','Central venous stenosis','Steal syndrome'],correctAnswers:[1],explanation:'Venous outflow stenosis = most common cause of AVF dysfunction.',difficulty:'medium',examFrequency:'high'},
  {id:'B016',section:'B',sectionTitle:'Vascular Intervention',subsection:'GI Bleeding',question:'Preferred embolic for lower GI bleeding?',options:['Coils only','Gelfoam only','Microcoils ± Gelfoam','PVA particles'],correctAnswers:[2],explanation:'Microcoils allow precise occlusion while preserving collaterals.',difficulty:'medium',examFrequency:'high'},
  {id:'B017',section:'B',sectionTitle:'Vascular Intervention',subsection:'Pseudoaneurysm',question:'Absolute contraindication to thrombin injection for femoral PSA?',options:['PSA >2 cm','Therapeutic anticoagulation','AVF communication','Neck <10 mm'],correctAnswers:[2],explanation:'AVF = absolute contraindication due to systemic embolization risk.',difficulty:'medium',examFrequency:'high'},
  {id:'B018',section:'B',sectionTitle:'Vascular Intervention',subsection:'EVAR',question:'Minimum proximal landing zone for standard EVAR?',options:['5 mm','10 mm','15 mm','25 mm'],correctAnswers:[2],explanation:'≥15 mm infrarenal neck required for adequate seal.',difficulty:'easy',examFrequency:'high'},
  {id:'B019',section:'B',sectionTitle:'Vascular Intervention',subsection:'Aortic Dissection',question:'Which indicates complicated Type B dissection requiring intervention?',options:['Entry tear >10mm','False lumen >22mm','Malperfusion syndrome','IMH >5mm'],correctAnswers:[2],explanation:'Malperfusion, rupture, refractory pain = complicated requiring intervention.',difficulty:'medium',examFrequency:'high'},
  {id:'B020',section:'B',sectionTitle:'Vascular Intervention',subsection:'Renal Artery',question:'Most common cause of renal artery stenosis?',options:['FMD','Atherosclerosis','Takayasu arteritis','Neurofibromatosis'],correctAnswers:[1],explanation:'Atherosclerosis accounts for ~90% of RAS cases.',difficulty:'easy',examFrequency:'high'},
  {id:'B021',section:'B',sectionTitle:'Vascular Intervention',subsection:'Mesenteric',question:'Golden window for revascularization in acute mesenteric ischemia?',options:['2 hours','6 hours','12 hours','24 hours'],correctAnswers:[2],explanation:'~6-12 hours before irreversible bowel necrosis.',difficulty:'medium',examFrequency:'high'},
  {id:'B022',section:'B',sectionTitle:'Vascular Intervention',subsection:'Trauma',question:'Most common site of blunt thoracic aortic injury?',options:['Ascending aorta','Aortic arch','Aortic isthmus','Descending thoracic aorta'],correctAnswers:[2],explanation:'Isthmus (distal to left subclavian) >90% - deceleration injury.',difficulty:'easy',examFrequency:'high'},
  {id:'B023',section:'B',sectionTitle:'Vascular Intervention',subsection:'Venous',question:'Anticoagulation duration after unprovoked proximal DVT?',options:['3 months','6 months','≥3 months, consider indefinite','12 months then stop'],correctAnswers:[2],explanation:'Unprovoked = at least 3 months, often indefinite.',difficulty:'medium',examFrequency:'medium'},
  {id:'B024',section:'B',sectionTitle:'Vascular Intervention',subsection:'IVC Filters',question:'Most common indication for IVC filter?',options:['Prophylaxis in trauma','VTE with anticoagulation contraindication','Recurrent PE on anticoagulation','Free-floating thrombus'],correctAnswers:[1],explanation:'VTE with contraindication to anticoagulation = most common.',difficulty:'easy',examFrequency:'high'},
  {id:'B025',section:'B',sectionTitle:'Vascular Intervention',subsection:'PAD',question:'ABI of 0.6 indicates:',options:['Normal','Mild PAD','Moderate PAD','Severe PAD'],correctAnswers:[2],explanation:'0.4-0.7 = moderate PAD.',difficulty:'easy',examFrequency:'high'},
  {id:'B026',section:'B',sectionTitle:'Vascular Intervention',subsection:'PAD',question:'Most common site of atherosclerotic PAD?',options:['Common iliac','SFA','Popliteal','Tibial arteries'],correctAnswers:[1],explanation:'SFA (especially adductor canal) = most common site.',difficulty:'easy',examFrequency:'high'},
  {id:'B027',section:'B',sectionTitle:'Vascular Intervention',subsection:'Carotid',question:'NASCET method compares narrowest diameter to:',options:['CCA','Carotid bulb','Distal ICA','ECA'],correctAnswers:[2],explanation:'NASCET measures relative to normal distal ICA.',difficulty:'medium',examFrequency:'high'},
  {id:'B028',section:'B',sectionTitle:'Vascular Intervention',subsection:'EVAR',question:'Type Ia endoleak originates from:',options:['Proximal attachment site','Branch vessels','Graft fabric','Modular junctions'],correctAnswers:[0],explanation:'Ia = proximal; Ib = distal; II = branches; III = fabric/junctions.',difficulty:'easy',examFrequency:'high'},
  {id:'B029',section:'B',sectionTitle:'Vascular Intervention',subsection:'TIPS',question:'Most common complication after TIPS?',options:['Bleeding','Infection','Hepatic encephalopathy','Stent thrombosis'],correctAnswers:[2],explanation:'HE occurs in 20-30% after TIPS.',difficulty:'easy',examFrequency:'high'},
  {id:'B030',section:'B',sectionTitle:'Vascular Intervention',subsection:'Venous',question:'CEAP classification is used for:',options:['Arterial disease','Chronic venous disease','Lymphedema','DVT risk'],correctAnswers:[1],explanation:'CEAP = standard for chronic venous disease.',difficulty:'easy',examFrequency:'medium'},
  {id:'B031',section:'B',sectionTitle:'Vascular Intervention',subsection:'GI Bleeding',question:'Most common cause of upper GI bleeding requiring embolization?',options:['Esophageal varices','Gastric ulcer','Duodenal ulcer','Mallory-Weiss tear'],correctAnswers:[2],explanation:'Duodenal ulcers (GDA) most common requiring embolization.',difficulty:'medium',examFrequency:'medium'},
  {id:'B032',section:'B',sectionTitle:'Vascular Intervention',subsection:'Trauma',question:'IR role in pelvic trauma with hemodynamic instability?',options:['After surgery fails','Concurrent with ortho fixation','Venous bleeding only','Reserved for stable patients'],correctAnswers:[1],explanation:'Angioembolization concurrent with external fixation as primary hemostasis.',difficulty:'medium',examFrequency:'high'},
  {id:'B033',section:'B',sectionTitle:'Vascular Intervention',subsection:'Dialysis',question:'Rule of 6s for AVF maturation includes all EXCEPT:',options:['Flow >600 mL/min','Diameter >6 mm','Depth <6 mm','Time >6 weeks'],correctAnswers:[0],explanation:'Rule of 6s: >6mm diameter, <6mm depth, >6 weeks.',difficulty:'medium',examFrequency:'medium'},
  {id:'B034',section:'B',sectionTitle:'Vascular Intervention',subsection:'Renal Artery',question:'FMD most commonly affects which portion of renal artery?',options:['Ostium','Proximal third','Middle to distal third','Branch arteries'],correctAnswers:[2],explanation:'FMD = middle to distal, "string of beads" appearance.',difficulty:'easy',examFrequency:'high'},
  {id:'B035',section:'B',sectionTitle:'Vascular Intervention',subsection:'Aortic Dissection',question:'Stanford Type A involves:',options:['Descending aorta only','Ascending aorta','Aortic arch only','Abdominal aorta'],correctAnswers:[1],explanation:'Type A = ascending aorta (surgical emergency).',difficulty:'easy',examFrequency:'high'},
  // SECTION C (25 questions)
  {id:'C026',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Biopsy',question:'Transgastric approach for pancreatic biopsy is preferred when:',options:['Always preferred','Tumor in pancreatic tail','Tumor in pancreatic head with vessels anteriorly','Never used'],correctAnswers:[2],explanation:'Transgastric avoids vessels when anterior approach blocked.',difficulty:'medium',examFrequency:'medium'},
{id:'C027',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Biliary',question:'Primary sclerosing cholangitis demonstrates which cholangiographic pattern?',options:['Single dominant stricture','Multifocal strictures with beading','Smooth long stricture','Normal cholangiogram'],correctAnswers:[1],explanation:'PSC shows multifocal intra/extrahepatic strictures with beaded appearance.',difficulty:'medium',examFrequency:'medium'},
{id:'C028',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Biliary',question:'Metal biliary stents compared to plastic:',options:['Shorter patency','Longer patency','Same patency','Only used in benign disease'],correctAnswers:[1],explanation:'Metal stents have longer patency (4-6 months vs 2-3 months).',difficulty:'easy',examFrequency:'medium'},
{id:'C029',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'GI',question:'Cecostomy tube is indicated for:',options:['Small bowel obstruction','Colonic pseudo-obstruction (Ogilvie syndrome)','Gastric outlet obstruction','Esophageal stricture'],correctAnswers:[1],explanation:'Cecostomy for decompression in refractory Ogilvie syndrome.',difficulty:'medium',examFrequency:'low'},
{id:'C030',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Lung',question:'Air embolism during lung biopsy is prevented by:',options:['Larger needle','Patient breath-hold during needle removal','Immediate ambulation','Prone positioning'],correctAnswers:[1],explanation:'Breath-hold prevents air entry through needle tract.',difficulty:'medium',examFrequency:'medium'},
{id:'C031',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Biliary',question:'Rendezvous technique in biliary intervention refers to:',options:['Combined surgical and percutaneous approach','Combined percutaneous and endoscopic approach','Bilateral percutaneous access','Sequential balloon dilation'],correctAnswers:[1],explanation:'Rendezvous = percutaneous wire passed to duodenum for endoscopic retrieval.',difficulty:'medium',examFrequency:'medium'},
{id:'C032',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Abscess',question:'Infected pancreatic necrosis is best managed by:',options:['Antibiotics alone','Percutaneous drainage','Step-up approach (drainage then necrosectomy if needed)','Immediate surgery'],correctAnswers:[2],explanation:'Step-up approach with drainage first; surgery if not responding.',difficulty:'medium',examFrequency:'high'},
{id:'C033',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Chest',question:'Thoracic duct embolization is indicated for:',options:['Pneumothorax','Chylothorax refractory to conservative management','Empyema','Hemothorax'],correctAnswers:[1],explanation:'TDE for chylothorax failing conservative treatment (diet, chest drain).',difficulty:'medium',examFrequency:'medium'},
{id:'C034',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Biopsy',question:'Mediastinal biopsy safest approach is usually:',options:['Transsternal','Parasternal','CT-guided avoiding great vessels','Transbronchial always'],correctAnswers:[2],explanation:'CT-guided with vessel avoidance, often extrapleural approach.',difficulty:'medium',examFrequency:'medium'},
{id:'C035',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Gastrostomy',question:'Gastropexy (T-fasteners) before RIG provides:',options:['Faster procedure','Better cosmesis','Anterior gastric wall fixation preventing leak','Larger tube placement'],correctAnswers:[2],explanation:'T-fasteners fix stomach to abdominal wall, reducing peritoneal leak.',difficulty:'medium',examFrequency:'medium'},
{id:'C036',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Biliary',question:'Choledocholithiasis too large for extraction is managed by:',options:['Mechanical lithotripsy','Observation','Indefinite stenting','Surgical exploration only'],correctAnswers:[0],explanation:'Mechanical lithotripsy or electrohydraulic/laser lithotripsy.',difficulty:'medium',examFrequency:'medium'},
{id:'C037',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Nephrostomy',question:'Supracostal access for nephrostomy increases risk of:',options:['Bowel injury','Pneumothorax/hydrothorax','Arterial injury','Ureteral injury'],correctAnswers:[1],explanation:'Supracostal (above 12th rib) risks pleural transgression.',difficulty:'medium',examFrequency:'high'},
{id:'C038',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Drainage',question:'Splenic abscess drainage is typically:',options:['Contraindicated','Safe with careful technique','Only surgical','Only for post-trauma'],correctAnswers:[1],explanation:'Percutaneous drainage safe; surgery for multiloculated or fungal.',difficulty:'medium',examFrequency:'low'},
{id:'C039',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Esophageal',question:'Esophageal stent across GE junction risks:',options:['Nothing specific','Severe reflux','Improved swallowing only','Migration only'],correctAnswers:[1],explanation:'Stents across GEJ cause significant reflux; use anti-reflux designs.',difficulty:'medium',examFrequency:'medium'},
{id:'C040',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Biliary',question:'Cholecystostomy is indicated for:',options:['Elective cholecystectomy prep','Acute cholecystitis in high-surgical-risk patient','Chronic cholecystitis','Gallbladder polyps'],correctAnswers:[1],explanation:'Bridge to surgery or definitive treatment in poor surgical candidates.',difficulty:'easy',examFrequency:'high'},
{id:'C041',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Lung',question:'Ground-glass opacity biopsy uses:',options:['Standard core biopsy technique','Thinner needle and CT guidance with narrow window','FNA only','Is contraindicated'],correctAnswers:[1],explanation:'GGO requires thin needle, narrow CT window settings for visualization.',difficulty:'medium',examFrequency:'medium'},
{id:'C042',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'GI',question:'Gastrojejunostomy tube (GJ) compared to G-tube:',options:['Higher risk of dislodgement','Better for patients with gastroparesis','Easier to replace','Larger bore possible'],correctAnswers:[1],explanation:'GJ bypasses stomach, better for gastroparesis and reflux.',difficulty:'easy',examFrequency:'medium'},
{id:'C043',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Abscess',question:'Appendiceal abscess drainage allows:',options:['Immediate appendectomy','Interval appendectomy','No further treatment needed','Only medical management'],correctAnswers:[1],explanation:'Drainage allows interval appendectomy 6-8 weeks later.',difficulty:'easy',examFrequency:'medium'},
{id:'C044',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Biopsy',question:'Adrenal biopsy is indicated when:',options:['All adrenal masses','Suspected metastasis with unknown primary','Pheochromocytoma suspected','Classic adenoma on imaging'],correctAnswers:[1],explanation:'Biopsy for suspected mets; avoid if pheochromocytoma possible.',difficulty:'medium',examFrequency:'high'},
{id:'C045',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Biliary',question:'Percutaneous transhepatic cholangiography (PTC) success rate in dilated ducts?',options:['50%','75%','95-100%','Variable'],correctAnswers:[2],explanation:'Near 100% success in dilated ducts; 70% in non-dilated.',difficulty:'easy',examFrequency:'medium'},
  {id:'C001',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Biopsy',question:'Minimum safe platelet count for liver biopsy?',options:['25,000/μL','50,000/μL','75,000/μL','100,000/μL'],correctAnswers:[1],explanation:'≥50,000/μL generally considered safe.',difficulty:'easy',examFrequency:'high'},
  {id:'C002',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Drainage',question:'Best catheter for complex multiloculated abscess?',options:['8 Fr pigtail','10 Fr pigtail','12 Fr locking loop','14-16 Fr with multiple sideholes'],correctAnswers:[3],explanation:'Complex abscesses need larger bore with multiple sideholes.',difficulty:'medium',examFrequency:'medium'},
  {id:'C003',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Colonic Stenting',question:'Primary indication for colonic stenting in malignant LBO?',options:['Palliation only','Bridge to surgery only','Benign strictures','Both palliation and bridge to surgery'],correctAnswers:[3],explanation:'Serves both palliation and bridge to surgery.',difficulty:'easy',examFrequency:'high'},
  {id:'C004',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Colonic Stenting',question:'Relative contraindication to colonic stenting?',options:['Sigmoid','Descending colon','Rectum <2 cm from anal verge','Splenic flexure'],correctAnswers:[2],explanation:'Very low rectal lesions cause pain and incontinence.',difficulty:'medium',examFrequency:'high'},
  {id:'C005',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Biliary',question:'Drainage strategy for Bismuth III hilar obstruction?',options:['Single right drain','Single left drain','Bilateral to achieve >50% liver volume','External only'],correctAnswers:[2],explanation:'Bilateral drainage >50% FLR improves outcomes.',difficulty:'hard',examFrequency:'high'},
  {id:'C006',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Biliary',question:'Antibiotic prophylaxis for biliary drainage?',options:['None needed','Single-dose cephalosporin','Piperacillin-tazobactam','Ampicillin only'],correctAnswers:[2],explanation:'Broad-spectrum covering gram-negatives and anaerobes.',difficulty:'medium',examFrequency:'medium'},
  {id:'C007',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Gastrostomy',question:'Minimum time before gastrostomy tube exchange?',options:['1 week','2 weeks','4 weeks','6 weeks'],correctAnswers:[2],explanation:'Mature tract forms in 2-4 weeks.',difficulty:'easy',examFrequency:'medium'},
  {id:'C008',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Lung Biopsy',question:'Most common complication of CT-guided lung biopsy?',options:['Hemoptysis','Pneumothorax','Air embolism','Tumor seeding'],correctAnswers:[1],explanation:'Pneumothorax 15-25%, chest tube needed in 5-15%.',difficulty:'easy',examFrequency:'high'},
  {id:'C009',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Lung Biopsy',question:'Technique to reduce pneumothorax risk?',options:['Larger needle','Multiple rapid passes','Biopsy side down post-procedure','Immediate mobilization'],correctAnswers:[2],explanation:'Side down allows gravity to seal pleural puncture.',difficulty:'medium',examFrequency:'medium'},
  {id:'C010',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Biliary',question:'Preferred approach for biliary drainage?',options:['Left-sided','Right-sided','Either side','Always bilateral'],correctAnswers:[1],explanation:'Right preferred - larger system, better drainage volume.',difficulty:'medium',examFrequency:'medium'},
  {id:'C011',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Chest',question:'Recommended tube size for empyema?',options:['8-10 Fr','10-14 Fr','14-20 Fr','24-32 Fr'],correctAnswers:[2],explanation:'14-20 Fr for viscous fluid and debris.',difficulty:'medium',examFrequency:'medium'},
  {id:'C012',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Abscess',question:'When to remove abscess drainage catheter?',options:['After 24 hours','After 48-72 hours','When output <10-20 mL/day + clinical improvement','After antibiotic course'],correctAnswers:[2],explanation:'Remove when minimal output and symptoms resolved.',difficulty:'easy',examFrequency:'medium'},
  {id:'C013',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Esophageal',question:'Recommended stent length for esophageal malignancy?',options:['Exactly covering stricture','1 cm beyond proximally/distally','2-4 cm beyond proximally/distally','Entire esophagus'],correctAnswers:[2],explanation:'Extend 2-4 cm beyond tumor margins.',difficulty:'medium',examFrequency:'medium'},
  {id:'C014',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Nephrostomy',question:'Optimal calyx for nephrostomy access?',options:['Upper pole','Middle','Lower pole posterior','Any calyx'],correctAnswers:[2],explanation:'Lower pole posterior = avascular approach, good drainage.',difficulty:'easy',examFrequency:'high'},
  {id:'C015',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Biliary',question:'Purpose of cooling off period before biliary internalization?',options:['Reduce bilirubin only','Decompress system, reduce cholangitis risk','Assess bile leak','Tract maturation'],correctAnswers:[1],explanation:'Decompression reduces cholangitis/sepsis during manipulation.',difficulty:'medium',examFrequency:'medium'},
  {id:'C016',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Biopsy',question:'Advantage of coaxial biopsy technique?',options:['Faster single-pass','Multiple samples through single pleural puncture','Better histology','Lower cost'],correctAnswers:[1],explanation:'Coaxial allows multiple samples through one outer needle.',difficulty:'easy',examFrequency:'medium'},
  {id:'C017',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Drainage',question:'Seldinger technique involves:',options:['Direct trocar insertion','Guidewire exchange over needle','Surgical cut-down','Tandem needles'],correctAnswers:[1],explanation:'Needle access, guidewire, catheter exchange.',difficulty:'easy',examFrequency:'high'},
  {id:'C018',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Gastrostomy',question:'Contraindication to percutaneous gastrostomy?',options:['Ascites','Prior abdominal surgery','Interposed colon','Esophageal stricture'],correctAnswers:[2],explanation:'Interposed colon = risk of colonic injury.',difficulty:'medium',examFrequency:'high'},
  {id:'C019',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Biliary',question:'Bismuth-Corlette classification is for:',options:['Gallbladder carcinoma','Hilar cholangiocarcinoma','Distal bile duct cancer','Pancreatic head cancer'],correctAnswers:[1],explanation:'Classifies hilar cholangiocarcinoma by biliary involvement.',difficulty:'easy',examFrequency:'high'},
  {id:'C020',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Chest',question:'Triangle of safety for chest tube bounded by:',options:['Pec major, lat dorsi, nipple line','Lat border pec major, ant border lat dorsi, 5th ICS','Ant axillary, post axillary, 2nd rib','Clavicle, sternum, nipple'],correctAnswers:[1],explanation:'Pec major, lat dorsi, and 5th intercostal space.',difficulty:'medium',examFrequency:'medium'},
  {id:'C021',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Biopsy',question:'Preferred biopsy type for suspected lymphoma?',options:['FNA','Core needle biopsy','Excisional biopsy','FNA equivalent to core'],correctAnswers:[1],explanation:'Core biopsy needed for architecture/subtyping.',difficulty:'medium',examFrequency:'high'},
  {id:'C022',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Lung Biopsy',question:'Factor most increasing pneumothorax risk?',options:['Lesion >3 cm','COPD/emphysema','Supine positioning','18G needle'],correctAnswers:[1],explanation:'COPD significantly increases pneumothorax risk.',difficulty:'medium',examFrequency:'high'},
  {id:'C023',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Drainage',question:'Loculated pleural effusion best managed by:',options:['Large bore chest tube','Repeated thoracentesis','Small catheter + fibrinolytics','Observation'],correctAnswers:[2],explanation:'Fibrinolytics (tPA/DNase) break down septations.',difficulty:'medium',examFrequency:'medium'},
  {id:'C024',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Gastrostomy',question:'RIG vs PEG: RIG preferred for:',options:['Faster procedure','Lower infection rate','Avoiding oral transit in H&N cancer','Better tract formation'],correctAnswers:[2],explanation:'RIG avoids oral transit, preferred in H&N cancer.',difficulty:'medium',examFrequency:'medium'},
  {id:'C025',section:'C',sectionTitle:'Non-vascular Interventions',subsection:'Nephrostomy',question:'Most common complication of nephrostomy?',options:['Bleeding requiring transfusion','Sepsis','Catheter dislodgement','Bowel injury'],correctAnswers:[2],explanation:'Catheter dislodgement most common.',difficulty:'easy',examFrequency:'medium'},
  // SECTION D (20 questions)
  {id:'D021',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'UAE',question:'Adenomyosis treatment with UAE has:',options:['Excellent outcomes','Moderate outcomes, less effective than for fibroids','No role','Superior outcomes to fibroids'],correctAnswers:[1],explanation:'UAE less effective for adenomyosis than fibroids.',difficulty:'medium',examFrequency:'medium'},
{id:'D022',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Transplant',question:'AVF formation after transplant biopsy:',options:['Always requires treatment','May resolve spontaneously if small','Requires immediate surgical repair','Is not a complication of biopsy'],correctAnswers:[1],explanation:'Small post-biopsy AVFs often resolve; large may need embolization.',difficulty:'medium',examFrequency:'medium'},
{id:'D023',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Varicocele',question:'Left varicocele is more common because:',options:['Left gonadal vein drains into left renal vein at 90°','Right testis is larger','Anatomic variant','Unknown reason'],correctAnswers:[0],explanation:'Left gonadal vein enters renal vein at right angle; right enters IVC obliquely.',difficulty:'easy',examFrequency:'medium'},
{id:'D024',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'PAE',question:'Post-PAE urinary retention is:',options:['Rare','Common, usually self-limiting','Permanent complication','Indication for surgery'],correctAnswers:[1],explanation:'Transient retention common; usually resolves in days to weeks.',difficulty:'medium',examFrequency:'medium'},
{id:'D025',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Nephrostomy',question:'One-stick technique for nephrostomy refers to:',options:['Single fluoroscopy image','Combined ultrasound and fluoroscopy with single puncture','Only one attempt allowed','Using only CT guidance'],correctAnswers:[1],explanation:'US-guided puncture followed by fluoroscopic wire and tube placement.',difficulty:'easy',examFrequency:'low'},
{id:'D026',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Ureteric',question:'Ureteric stricture balloon dilation compared to incision:',options:['Higher success rate','Lower success rate','Similar success rate','Only for malignant strictures'],correctAnswers:[1],explanation:'Balloon dilation inferior to cutting balloon/incision for strictures.',difficulty:'medium',examFrequency:'medium'},
{id:'D027',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'UAE',question:'Fibroid expulsion after UAE:',options:['Never occurs','May occur with submucosal fibroids','Indicates failed procedure','Requires emergency surgery'],correctAnswers:[1],explanation:'Submucosal fibroids may expel vaginally; usually benign course.',difficulty:'medium',examFrequency:'medium'},
{id:'D028',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Gonadal Vein',question:'Ovarian vein embolization endpoint:',options:['Coils at renal vein junction only','Complete occlusion of main trunk and tributaries','Partial flow reduction','Stent placement'],correctAnswers:[1],explanation:'Coil entire incompetent trunk and tributaries for complete treatment.',difficulty:'medium',examFrequency:'medium'},
{id:'D029',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Renal',question:'Percutaneous cryoablation of renal tumors:',options:['Requires general anesthesia always','Can be done under sedation with local anesthesia','Has higher complication rate than RFA','Is only for benign lesions'],correctAnswers:[1],explanation:'Cryoablation can be done under sedation; ice ball visible on CT.',difficulty:'medium',examFrequency:'medium'},
{id:'D030',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Transplant',question:'Peak systolic velocity >300 cm/s in transplant renal artery suggests:',options:['Normal flow','Mild stenosis','Moderate stenosis','>70% stenosis'],correctAnswers:[3],explanation:'PSV >250-300 indicates hemodynamically significant stenosis (>70%).',difficulty:'medium',examFrequency:'high'},
{id:'D031',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Nephrostomy',question:'Whitaker test measures:',options:['GFR','Pressure-flow relationship in collecting system','Renal vein pressure','Bladder compliance'],correctAnswers:[1],explanation:'Perfusion test distinguishing obstructed from dilated non-obstructed system.',difficulty:'hard',examFrequency:'low'},
{id:'D032',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'UAE',question:'Ovarian failure after UAE occurs in approximately:',options:['<1% of women under 40','5-10% of women under 40','1-2% of women over 45','Never occurs'],correctAnswers:[0],explanation:'Rare in women <40; higher risk >45 due to utero-ovarian anastomoses.',difficulty:'medium',examFrequency:'high'},
{id:'D033',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Varicocele',question:'Varicocele embolization technical success rate:',options:['60-70%','70-80%','90-95%','50%'],correctAnswers:[2],explanation:'Technical success >90%; clinical success (fertility improvement) lower.',difficulty:'easy',examFrequency:'medium'},
{id:'D034',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'PAE',question:'IPSS improvement after PAE is typically:',options:['5-10 points','10-15 points','15-20 points','Minimal'],correctAnswers:[1],explanation:'Average IPSS improvement 10-15 points at 12 months.',difficulty:'medium',examFrequency:'medium'},
{id:'D035',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Renal',question:'Angiomyolipoma embolization is indicated when:',options:['Any size','Size >4 cm or symptomatic','Only after bleeding','Never indicated'],correctAnswers:[1],explanation:'Embolize if >4 cm, symptomatic, or in women of childbearing age.',difficulty:'medium',examFrequency:'high'},
  {id:'D001',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Nephrostomy',question:'Most common indication for nephrostomy?',options:['Stone disease','Malignant ureteric obstruction','Benign stricture','Pyonephrosis'],correctAnswers:[1],explanation:'Malignant ureteric obstruction most common.',difficulty:'easy',examFrequency:'medium'},
  {id:'D002',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Transplant',question:'Transplant RAS typically occurs at:',options:['Donor artery origin','Anastomotic site','Mid-graft artery','Intraparenchymal'],correctAnswers:[1],explanation:'Anastomosis = most common site.',difficulty:'easy',examFrequency:'high'},
  {id:'D003',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'UAE',question:'Best embolic agent for UFE?',options:['Coils','Gelfoam','PVA/microspheres 500-700 μm','NBCA'],correctAnswers:[2],explanation:'PVA/microspheres 500-700 μm are standard.',difficulty:'easy',examFrequency:'high'},
  {id:'D004',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'UAE',question:'Post-embolization syndrome after UFE includes all EXCEPT:',options:['Pelvic pain','Low-grade fever','Nausea','Heavy vaginal bleeding'],correctAnswers:[3],explanation:'Heavy bleeding NOT typical - may indicate complications.',difficulty:'medium',examFrequency:'high'},
  {id:'D005',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Varicocele',question:'Preferred embolic for varicocele?',options:['Coils alone','Sclerosant alone','Coils + sclerosant','Particles'],correctAnswers:[2],explanation:'Combination provides best results.',difficulty:'medium',examFrequency:'medium'},
  {id:'D006',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Fallopian Tube',question:'FTR most successful in which occlusion?',options:['Fimbrial','Proximal (cornual)','Mid-tubal','Post-ligation'],correctAnswers:[1],explanation:'Proximal >80% success - often mucus/debris/spasm.',difficulty:'medium',examFrequency:'medium'},
  {id:'D007',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Transplant',question:'Post-transplant lymphocele management?',options:['Observation','Aspiration alone','Drainage + sclerotherapy','Immediate surgery'],correctAnswers:[2],explanation:'Symptomatic lymphoceles need drainage + sclerotherapy.',difficulty:'medium',examFrequency:'medium'},
  {id:'D008',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Follow-up',question:'Monitoring after transplant renal artery intervention?',options:['Urea, Doppler, BP','Creatinine, Doppler, BP','Creatinine, CTA, urinalysis','Creatinine, Doppler, biopsy'],correctAnswers:[1],explanation:'Creatinine, Doppler US, and BP measurement.',difficulty:'easy',examFrequency:'medium'},
  {id:'D009',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Pelvic Congestion',question:'Diagnostic ovarian vein diameter criterion for PCS?',options:['>4 mm','>6 mm','>8 mm','>10 mm'],correctAnswers:[2],explanation:'>8 mm is diagnostic criterion.',difficulty:'medium',examFrequency:'medium'},
  {id:'D010',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Nephrostomy',question:'Urgent nephrostomy most indicated for:',options:['Asymptomatic hydronephrosis','Mild renal impairment with stone','Pyonephrosis','Chronic stricture'],correctAnswers:[2],explanation:'Pyonephrosis = urological emergency.',difficulty:'easy',examFrequency:'high'},
  {id:'D011',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Renal Cyst',question:'Which Bosniak requires surgical excision?',options:['I','II','IIF','IV'],correctAnswers:[3],explanation:'Bosniak IV >90% malignancy rate.',difficulty:'easy',examFrequency:'high'},
  {id:'D012',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'PAE',question:'Typical particle size for PAE?',options:['100-200 μm','200-400 μm','300-500 μm','500-700 μm'],correctAnswers:[2],explanation:'300-500 μm most commonly used.',difficulty:'medium',examFrequency:'medium'},
  {id:'D013',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'UAE',question:'Contraindication to UFE?',options:['Multiple fibroids','Submucosal fibroid','Pedunculated subserosal with narrow stalk','Fibroid >10 cm'],correctAnswers:[2],explanation:'Narrow stalk pedunculated = detachment risk.',difficulty:'medium',examFrequency:'high'},
  {id:'D014',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Varicocele',question:'Grade I varicocele is:',options:['Subclinical','Palpable only with Valsalva','Palpable at rest','Visible'],correctAnswers:[1],explanation:'Grade I = palpable with Valsalva only.',difficulty:'easy',examFrequency:'medium'},
  {id:'D015',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Ureteric Stent',question:'Typical ureteric stent dwell time before exchange?',options:['1 month','3-6 months','12 months','2 years'],correctAnswers:[1],explanation:'Exchange every 3-6 months to prevent encrustation.',difficulty:'easy',examFrequency:'medium'},
  {id:'D016',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'UAE',question:'Endpoint of UFE?',options:['Complete stasis in uterine arteries','Near-stasis with pruning of fibroid vessels','Filling utero-ovarian anastomoses','Reflux into aorta'],correctAnswers:[1],explanation:'Near-stasis with pruning, avoid complete occlusion.',difficulty:'medium',examFrequency:'high'},
  {id:'D017',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Transplant',question:'Doppler criteria for transplant RAS include all EXCEPT:',options:['PSV >200-250 cm/s','Tardus-parvus waveform','RI >0.8','PSV ratio >2:1'],correctAnswers:[2],explanation:'RI <0.5 (not >0.8) suggests stenosis. High RI = parenchymal disease.',difficulty:'hard',examFrequency:'medium'},
  {id:'D018',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'PAE',question:'Prostate artery most commonly arises from:',options:['Superior vesical','Inferior vesical','Internal pudendal','Obturator'],correctAnswers:[1],explanation:'Inferior vesical artery most common origin.',difficulty:'medium',examFrequency:'medium'},
  {id:'D019',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Nephrostomy',question:'Brodels line refers to:',options:['PUJ','Avascular plane for nephrostomy','Kidney-adrenal border','Renal hilum level'],correctAnswers:[1],explanation:'Avascular plane ideal for nephrostomy access.',difficulty:'medium',examFrequency:'medium'},
  {id:'D020',section:'D',sectionTitle:'Genito-urinary Intervention',subsection:'Renal',question:'Sclerosant for simple renal cysts?',options:['Absolute ethanol','Normal saline','Contrast','Antibiotics'],correctAnswers:[0],explanation:'Absolute ethanol most effective (>90% success).',difficulty:'easy',examFrequency:'medium'},
  // SECTION E (20 questions)
  {id:'E021',section:'E',sectionTitle:'MSK Intervention',subsection:'Spine',question:'Facet joint injection maximum steroid dose per session:',options:['20 mg triamcinolone','40 mg triamcinolone','80 mg triamcinolone','No limit'],correctAnswers:[2],explanation:'Typical max 80mg triamcinolone total per session (multiple levels).',difficulty:'medium',examFrequency:'medium'},
{id:'E022',section:'E',sectionTitle:'MSK Intervention',subsection:'Ablation',question:'RFA electrode tip temperature for bone tumor ablation:',options:['50-60°C','60-70°C','90-100°C','70-80°C'],correctAnswers:[2],explanation:'Target 90-100°C at electrode tip; 60-70°C at margin.',difficulty:'medium',examFrequency:'medium'},
{id:'E023',section:'E',sectionTitle:'MSK Intervention',subsection:'Vertebroplasty',question:'Cement volume per vertebral level typically:',options:['1-2 mL','2-4 mL','5-8 mL','10+ mL'],correctAnswers:[1],explanation:'Typically 2-4 mL per vertebra; more may not improve outcomes.',difficulty:'medium',examFrequency:'medium'},
{id:'E024',section:'E',sectionTitle:'MSK Intervention',subsection:'Joint',question:'Septic arthritis is a contraindication to:',options:['Diagnostic aspiration','Therapeutic steroid injection','Both aspiration and injection','Neither'],correctAnswers:[1],explanation:'Never inject steroid into potentially infected joint; aspiration diagnostic.',difficulty:'easy',examFrequency:'high'},
{id:'E025',section:'E',sectionTitle:'MSK Intervention',subsection:'Ablation',question:'MRI-guided focused ultrasound (MRgFUS) for bone metastases:',options:['Not used in bone','Provides real-time temperature monitoring','Requires open surgery','Has no advantage over RFA'],correctAnswers:[1],explanation:'MRgFUS offers non-invasive ablation with MR thermometry.',difficulty:'medium',examFrequency:'low'},
{id:'E026',section:'E',sectionTitle:'MSK Intervention',subsection:'Spine',question:'Transforaminal epidural injection targets:',options:['Central canal','Lateral recess and foramen','Facet joint','Sacroiliac joint'],correctAnswers:[1],explanation:'Transforaminal approach targets the foramen and lateral recess.',difficulty:'easy',examFrequency:'medium'},
{id:'E027',section:'E',sectionTitle:'MSK Intervention',subsection:'Vertebroplasty',question:'Osteoporotic VCF with >70% height loss:',options:['Ideal for vertebroplasty','Relative contraindication','Absolute contraindication','Requires kyphoplasty'],correctAnswers:[1],explanation:'Severe collapse (vertebra plana) has limited benefit and higher leak risk.',difficulty:'medium',examFrequency:'medium'},
{id:'E028',section:'E',sectionTitle:'MSK Intervention',subsection:'Biopsy',question:'Soft tissue sarcoma biopsy track:',options:['Can be placed anywhere','Must be in line with planned surgical resection','Should cross multiple compartments for best sample','Is not important'],correctAnswers:[1],explanation:'Track will be excised with tumor; must be planned with surgeon.',difficulty:'hard',examFrequency:'high'},
{id:'E029',section:'E',sectionTitle:'MSK Intervention',subsection:'Joint',question:'Hyaluronic acid injection for osteoarthritis provides relief for:',options:['1-2 weeks','1-3 months','3-6 months','Permanent'],correctAnswers:[2],explanation:'Viscosupplementation provides 3-6 months relief typically.',difficulty:'easy',examFrequency:'low'},
{id:'E030',section:'E',sectionTitle:'MSK Intervention',subsection:'Ablation',question:'Osteoblastoma vs osteoid osteoma:',options:['Same lesion different names','Osteoblastoma >1.5-2 cm, more aggressive','Osteoid osteoma is larger','No difference in treatment'],correctAnswers:[1],explanation:'Osteoblastoma larger (>1.5-2 cm), locally aggressive, may recur.',difficulty:'medium',examFrequency:'medium'},
  {id:'E001',section:'E',sectionTitle:'MSK Intervention',subsection:'Biopsy',question:'Typical needle gauge for bone biopsy?',options:['18-20G','14-16G','11-13G','8-10G'],correctAnswers:[2],explanation:'11-13G standard for adequate core specimens.',difficulty:'easy',examFrequency:'medium'},
  {id:'E002',section:'E',sectionTitle:'MSK Intervention',subsection:'Osteoid Osteoma',question:'RFA success rate for osteoid osteoma?',options:['60-70%','70-80%','80-90%','>90%'],correctAnswers:[3],explanation:'>90% primary success rate.',difficulty:'easy',examFrequency:'high'},
  {id:'E003',section:'E',sectionTitle:'MSK Intervention',subsection:'Vertebroplasty',question:'Optimal timing for vertebroplasty in acute VCF?',options:['Within 48 hours','2-4 weeks','6-8 weeks','3 months'],correctAnswers:[1],explanation:'After 2-4 weeks conservative management fails.',difficulty:'medium',examFrequency:'high'},
  {id:'E004',section:'E',sectionTitle:'MSK Intervention',subsection:'Vertebroplasty',question:'Most serious complication of vertebroplasty?',options:['Local hematoma','Adjacent level fracture','Pulmonary cement embolism','Infection'],correctAnswers:[2],explanation:'PCE most serious, though clinically significant is rare.',difficulty:'medium',examFrequency:'high'},
  {id:'E005',section:'E',sectionTitle:'MSK Intervention',subsection:'Osteoplasty',question:'Primary goal of osteoplasty for metastatic lesions?',options:['Tumor eradication','Stabilization and pain relief','Fracture prevention only','Replace surgical fixation'],correctAnswers:[1],explanation:'Pain relief and structural stabilization.',difficulty:'easy',examFrequency:'medium'},
  {id:'E006',section:'E',sectionTitle:'MSK Intervention',subsection:'Sacroplasty',question:'Best imaging for sacral insufficiency fractures?',options:['Plain radiography','CT','MRI','Bone scan'],correctAnswers:[2],explanation:'MRI most sensitive - shows bone marrow edema.',difficulty:'easy',examFrequency:'medium'},
  {id:'E007',section:'E',sectionTitle:'MSK Intervention',subsection:'Cryoablation',question:'Main advantage of cryoablation over RFA for bone tumors?',options:['Shorter procedure','Better visualization of ablation zone','Higher efficacy','Lower cost'],correctAnswers:[1],explanation:'Ice ball visible on CT/MRI in real-time.',difficulty:'medium',examFrequency:'medium'},
  {id:'E008',section:'E',sectionTitle:'MSK Intervention',subsection:'Joint Injection',question:'Preferred guidance for SI joint injection?',options:['Ultrasound','Fluoroscopy','CT','MRI'],correctAnswers:[1],explanation:'Fluoroscopy standard for SI joint.',difficulty:'easy',examFrequency:'medium'},
  {id:'E009',section:'E',sectionTitle:'MSK Intervention',subsection:'Ablation',question:'Target temperature at RFA ablation zone margin?',options:['40-45°C','50-55°C','60-70°C','90-100°C'],correctAnswers:[2],explanation:'60-70°C at margin ensures cell death.',difficulty:'medium',examFrequency:'medium'},
  {id:'E010',section:'E',sectionTitle:'MSK Intervention',subsection:'Vertebroplasty',question:'Contraindication to vertebroplasty?',options:['Acute VCF <4 weeks','Posterior wall disruption with canal compromise','Multiple contiguous fractures','Thoracolumbar junction fracture'],correctAnswers:[1],explanation:'Posterior wall disruption risks spinal canal cement.',difficulty:'medium',examFrequency:'high'},
  {id:'E011',section:'E',sectionTitle:'MSK Intervention',subsection:'Discography',question:'Positive provocative discography defined by:',options:['Any pain','Concordant pain at low pressure','Disc degeneration on imaging','Annular tear visualization'],correctAnswers:[1],explanation:'Concordant pain reproduction at low pressure.',difficulty:'medium',examFrequency:'medium'},
  {id:'E012',section:'E',sectionTitle:'MSK Intervention',subsection:'Biopsy',question:'Biopsy approach for suspected primary bone tumor:',options:['Shortest path','Cross compartments if needed','Single compartment, planned surgical tract','Always anterior'],correctAnswers:[2],explanation:'Must be planned for excision with resection.',difficulty:'hard',examFrequency:'high'},
  {id:'E013',section:'E',sectionTitle:'MSK Intervention',subsection:'Kyphoplasty',question:'Main advantage of kyphoplasty over vertebroplasty?',options:['Lower cost','Faster procedure','Potential height restoration','Lower cement leakage'],correctAnswers:[2],explanation:'Balloon tamp potentially restores height.',difficulty:'easy',examFrequency:'high'},
  {id:'E014',section:'E',sectionTitle:'MSK Intervention',subsection:'Vertebroplasty',question:'PMMA cement injectable at which consistency?',options:['Liquid phase','Toothpaste','Doughy phase','Solid phase'],correctAnswers:[1],explanation:'Toothpaste consistency allows controlled injection.',difficulty:'easy',examFrequency:'medium'},
  {id:'E015',section:'E',sectionTitle:'MSK Intervention',subsection:'Nerve Block',question:'Celiac plexus neurolysis indicated for:',options:['Pelvic malignancy','Upper abdominal/pancreatic malignancy','Lower limb pain','Chest wall pain'],correctAnswers:[1],explanation:'Effective for upper abdominal visceral pain.',difficulty:'easy',examFrequency:'medium'},
  {id:'E016',section:'E',sectionTitle:'MSK Intervention',subsection:'Osteoid Osteoma',question:'Classic presentation of osteoid osteoma?',options:['Constant severe pain','Night pain relieved by NSAIDs','Weight-bearing pain only','Painless swelling'],correctAnswers:[1],explanation:'Night pain dramatically relieved by NSAIDs.',difficulty:'easy',examFrequency:'high'},
  {id:'E017',section:'E',sectionTitle:'MSK Intervention',subsection:'Ablation',question:'Preferred ablation for bone metastases near spinal cord?',options:['RFA','Microwave','Cryoablation','HIFU'],correctAnswers:[2],explanation:'Cryoablation - visible ice ball, less neural damage from cold.',difficulty:'medium',examFrequency:'medium'},
  {id:'E018',section:'E',sectionTitle:'MSK Intervention',subsection:'Joint Injection',question:'Which joint requires image guidance due to depth?',options:['Shoulder','Knee','Hip','Ankle'],correctAnswers:[2],explanation:'Hip deep, routinely requires image guidance.',difficulty:'easy',examFrequency:'low'},
  {id:'E019',section:'E',sectionTitle:'MSK Intervention',subsection:'Vertebroplasty',question:'Unipedicular vs bipedicular approach:',options:['Bipedicular always required','Unipedicular adequate for most','Operator preference only','Bipedicular has lower complications'],correctAnswers:[1],explanation:'Unipedicular adequate for most fractures.',difficulty:'medium',examFrequency:'medium'},
  {id:'E020',section:'E',sectionTitle:'MSK Intervention',subsection:'Biopsy',question:'Touch preparation during bone biopsy:',options:['Never useful','Confirms adequate cellular material immediately','Replaces histology','Unacceptably increases procedure time'],correctAnswers:[1],explanation:'Immediate assessment of sample adequacy.',difficulty:'medium',examFrequency:'low'},
  // SECTION F (25 questions)
  {id:'F026',section:'F',sectionTitle:'Interventional Oncology',subsection:'Ablation',question:'Cryoablation mechanism of cell death:',options:['Protein denaturation only','Ice crystal formation, vascular stasis, apoptosis','Thermal coagulation','Mechanical disruption only'],correctAnswers:[1],explanation:'Multiple mechanisms: ice crystals, osmotic shifts, vascular injury, apoptosis.',difficulty:'medium',examFrequency:'medium'},
{id:'F027',section:'F',sectionTitle:'Interventional Oncology',subsection:'TACE',question:'Lipiodol in cTACE functions as:',options:['Embolic agent only','Drug carrier and tumor marker','Contrast agent only','Has no function'],correctAnswers:[1],explanation:'Lipiodol carries chemotherapy, provides embolic effect, retained by tumor.',difficulty:'easy',examFrequency:'high'},
{id:'F028',section:'F',sectionTitle:'Interventional Oncology',subsection:'Ablation',question:'Complete response on imaging after ablation requires:',options:['50% size reduction','No enhancement in ablation zone','Any size reduction','Central necrosis'],correctAnswers:[1],explanation:'No arterial enhancement = complete response (mRECIST/LI-RADS).',difficulty:'easy',examFrequency:'high'},
{id:'F029',section:'F',sectionTitle:'Interventional Oncology',subsection:'SIRT',question:'Glass vs resin Y90 microspheres differ by:',options:['Same product different names','Activity per sphere and embolic effect','Radiation type','Target organ'],correctAnswers:[1],explanation:'Glass = higher activity/sphere, less embolic; Resin = more embolic effect.',difficulty:'medium',examFrequency:'medium'},
{id:'F030',section:'F',sectionTitle:'Interventional Oncology',subsection:'Ablation',question:'Tumor seeding after ablation occurs in approximately:',options:['<1%','5-10%','10-15%','20%'],correctAnswers:[0],explanation:'Rare (<1%); track ablation reduces risk.',difficulty:'easy',examFrequency:'medium'},
{id:'F031',section:'F',sectionTitle:'Interventional Oncology',subsection:'TACE',question:'TACE for HCC with portal vein tumor thrombus:',options:['Absolutely contraindicated','Relatively contraindicated, may proceed selectively','No concern','First-line treatment'],correctAnswers:[1],explanation:'Main PVT = relative contraindication; segmental/selective may be possible.',difficulty:'hard',examFrequency:'high'},
{id:'F032',section:'F',sectionTitle:'Interventional Oncology',subsection:'PVE',question:'Typical FLR increase after PVE:',options:['5-10%','10-20%','30-40%','50%'],correctAnswers:[1],explanation:'Expect 10-20% volume increase (or ~40% relative increase) at 2-4 weeks.',difficulty:'medium',examFrequency:'high'},
{id:'F033',section:'F',sectionTitle:'Interventional Oncology',subsection:'Lung',question:'Most common tumor treated with lung ablation:',options:['Primary lung cancer','Colorectal metastases','Sarcoma metastases','Renal cell metastases'],correctAnswers:[1],explanation:'Colorectal lung metastases most common indication.',difficulty:'easy',examFrequency:'medium'},
{id:'F034',section:'F',sectionTitle:'Interventional Oncology',subsection:'Ablation',question:'Irreversible electroporation (IRE) uses:',options:['Thermal energy','Electrical pulses causing cell membrane pore formation','Cryogenic freezing','Microwave energy'],correctAnswers:[1],explanation:'Non-thermal; electrical pulses cause permanent membrane pores and cell death.',difficulty:'medium',examFrequency:'medium'},
{id:'F035',section:'F',sectionTitle:'Interventional Oncology',subsection:'TACE',question:'BCLC Stage C (advanced HCC) standard treatment is:',options:['Ablation','TACE','Systemic therapy (sorafenib/immunotherapy)','Transplant'],correctAnswers:[2],explanation:'Stage C = portal invasion/metastases; systemic therapy indicated.',difficulty:'medium',examFrequency:'high'},
{id:'F036',section:'F',sectionTitle:'Interventional Oncology',subsection:'SIRT',question:'REILD (radioembolization-induced liver disease) typically occurs:',options:['During procedure','1-4 weeks post-procedure','4-8 weeks post-procedure','6+ months post-procedure'],correctAnswers:[2],explanation:'REILD presents 4-8 weeks post-Y90 with jaundice, ascites, liver dysfunction.',difficulty:'medium',examFrequency:'medium'},
{id:'F037',section:'F',sectionTitle:'Interventional Oncology',subsection:'Ablation',question:'Cholecystitis after hepatic ablation:',options:['Never occurs','May occur with tumors near gallbladder','Requires cholecystectomy always','Is prevented by hydrodissection'],correctAnswers:[1],explanation:'Risk with tumors near gallbladder; prophylactic cholecystectomy sometimes considered.',difficulty:'medium',examFrequency:'medium'},
{id:'F038',section:'F',sectionTitle:'Interventional Oncology',subsection:'TACE',question:'ALBI score is used to assess:',options:['Tumor burden','Liver function (alternative to Child-Pugh)','Response to treatment','Portal hypertension'],correctAnswers:[1],explanation:'ALBI (albumin-bilirubin) score assesses liver function, simpler than Child-Pugh.',difficulty:'medium',examFrequency:'medium'},
{id:'F039',section:'F',sectionTitle:'Interventional Oncology',subsection:'Ablation',question:'Grounding pad burns during RFA are prevented by:',options:['Using multiple pads','Single pad placement','Higher power settings','Smaller electrodes'],correctAnswers:[0],explanation:'Multiple pads distribute current, reducing burn risk.',difficulty:'easy',examFrequency:'medium'},
{id:'F040',section:'F',sectionTitle:'Interventional Oncology',subsection:'Metastases',question:'Oligometastatic disease typically defined as:',options:['Any number of metastases','≤3-5 metastases in ≤1-3 organs','Single organ involvement only','Widespread metastases'],correctAnswers:[1],explanation:'Limited metastatic burden potentially amenable to local therapy.',difficulty:'easy',examFrequency:'high'},
{id:'F041',section:'F',sectionTitle:'Interventional Oncology',subsection:'SIRT',question:'Radiation segmentectomy refers to:',options:['Surgical resection after Y90','High-dose Y90 to single segment for curative intent','Low-dose whole liver treatment','Combination with TACE'],correctAnswers:[1],explanation:'Ablative doses (>190 Gy) to single segment for complete tumor necrosis.',difficulty:'hard',examFrequency:'medium'},
{id:'F042',section:'F',sectionTitle:'Interventional Oncology',subsection:'Ablation',question:'Artificial ascites during ablation:',options:['Is contraindicated','Creates thermal barrier to protect adjacent structures','Improves ablation efficacy','Increases complications'],correctAnswers:[1],explanation:'Fluid instillation creates protective barrier for bowel/stomach.',difficulty:'medium',examFrequency:'high'},
{id:'F043',section:'F',sectionTitle:'Interventional Oncology',subsection:'HCC',question:'LI-RADS 5 indicates:',options:['Probably benign','Probably HCC','Definitely HCC','Indeterminate'],correctAnswers:[2],explanation:'LR-5 = definitely HCC; characteristic arterial enhancement and washout.',difficulty:'easy',examFrequency:'high'},
{id:'F044',section:'F',sectionTitle:'Interventional Oncology',subsection:'TACE',question:'Degradable starch microspheres (DSM-TACE) duration of occlusion:',options:['Permanent','30-60 minutes','4-6 hours','24-48 hours'],correctAnswers:[1],explanation:'DSM degrade within ~30-60 minutes, temporary embolization.',difficulty:'medium',examFrequency:'low'},
{id:'F045',section:'F',sectionTitle:'Interventional Oncology',subsection:'PVE',question:'ALPPS compared to PVE:',options:['Slower FLR growth','Faster FLR growth','Same growth rate','Less invasive'],correctAnswers:[1],explanation:'ALPPS achieves faster FLR hypertrophy but higher morbidity than PVE.',difficulty:'hard',examFrequency:'medium'},
  {id:'F001',section:'F',sectionTitle:'Interventional Oncology',subsection:'HCC',question:'BCLC stage best treated with ablation?',options:['Stage 0 and A (very early/early)','Stage B (intermediate)','Stage C (advanced)','Stage D (terminal)'],correctAnswers:[0],explanation:'Stage 0-A candidates for curative treatments including ablation.',difficulty:'medium',examFrequency:'high'},
  {id:'F002',section:'F',sectionTitle:'Interventional Oncology',subsection:'TACE',question:'Main indication for cTACE?',options:['BCLC Stage 0','BCLC Stage A','BCLC Stage B','BCLC Stage D'],correctAnswers:[2],explanation:'Stage B (intermediate) main indication.',difficulty:'easy',examFrequency:'high'},
  {id:'F003',section:'F',sectionTitle:'Interventional Oncology',subsection:'TACE',question:'Absolute contraindication to TACE?',options:['Bilirubin 35 μmol/L','Portal vein thrombosis','Decompensated cirrhosis (Child-Pugh C)','Tumor >10 cm'],correctAnswers:[2],explanation:'Child-Pugh C = high liver failure risk.',difficulty:'medium',examFrequency:'high'},
  {id:'F004',section:'F',sectionTitle:'Interventional Oncology',subsection:'SIRT',question:'Mandatory pre-treatment scan before Y90?',options:['CT chest','Bone scan','Tc-99m MAA scan','PET-CT'],correctAnswers:[2],explanation:'MAA scan assesses lung shunt and extrahepatic perfusion.',difficulty:'easy',examFrequency:'high'},
  {id:'F005',section:'F',sectionTitle:'Interventional Oncology',subsection:'SIRT',question:'Maximum acceptable lung shunt fraction for Y90?',options:['5%','10%','20%','30%'],correctAnswers:[2],explanation:'<20% to avoid radiation pneumonitis.',difficulty:'medium',examFrequency:'high'},
  {id:'F006',section:'F',sectionTitle:'Interventional Oncology',subsection:'Ablation',question:'Target ablation zone diameter for 2.5 cm tumor?',options:['2.5 cm','3.5 cm','4.5 cm','5.5 cm'],correctAnswers:[2],explanation:'Need 1 cm margin = 4.5 cm zone.',difficulty:'medium',examFrequency:'high'},
  {id:'F007',section:'F',sectionTitle:'Interventional Oncology',subsection:'Ablation',question:'What is the heat sink effect?',options:['Heating adjacent bowel','Increased ablation near veins','Reduced ablation near large vessels','Skin burns from grounding pads'],correctAnswers:[2],explanation:'Blood flow cools tissue, reducing ablation efficacy.',difficulty:'medium',examFrequency:'high'},
  {id:'F008',section:'F',sectionTitle:'Interventional Oncology',subsection:'PVE',question:'Goal of PVE before hepatectomy?',options:['Tumor necrosis','Induce FLR hypertrophy','Reduce portal hypertension','Prevent tumor spread'],correctAnswers:[1],explanation:'Induce compensatory hypertrophy of FLR.',difficulty:'easy',examFrequency:'high'},
  {id:'F009',section:'F',sectionTitle:'Interventional Oncology',subsection:'Metastases',question:'Maximum tumor size suitable for CRLM ablation?',options:['2 cm','3 cm','4 cm','5 cm'],correctAnswers:[1],explanation:'≤3 cm = best outcomes (>90% local control).',difficulty:'easy',examFrequency:'high'},
  {id:'F010',section:'F',sectionTitle:'Interventional Oncology',subsection:'TACE',question:'Typical imaging follow-up after TACE?',options:['2 weeks','4-6 weeks','3 months','6 months'],correctAnswers:[1],explanation:'4-6 weeks using mRECIST criteria.',difficulty:'easy',examFrequency:'medium'},
  {id:'F011',section:'F',sectionTitle:'Interventional Oncology',subsection:'DEB-TACE',question:'Main advantage of DEB-TACE over cTACE?',options:['Higher response rate','Lower systemic drug exposure','Applicable to larger tumors','Lower cost'],correctAnswers:[1],explanation:'Controlled release = lower peak plasma levels, reduced toxicity.',difficulty:'medium',examFrequency:'medium'},
  {id:'F012',section:'F',sectionTitle:'Interventional Oncology',subsection:'Ablation',question:'Recommended minimum ablation margin for HCC?',options:['0.5 cm','1.0 cm','1.5 cm','2.0 cm'],correctAnswers:[1],explanation:'1 cm margin reduces local recurrence.',difficulty:'easy',examFrequency:'high'},
  {id:'F013',section:'F',sectionTitle:'Interventional Oncology',subsection:'Renal',question:'Thermal ablation recommended for renal tumors:',options:['<2 cm only','≤3 cm in poor surgical candidates','≤4 cm in all patients','Any size'],correctAnswers:[1],explanation:'≤3 cm in poor surgical candidates.',difficulty:'medium',examFrequency:'high'},
  {id:'F014',section:'F',sectionTitle:'Interventional Oncology',subsection:'Lung',question:'Most critical factor for local recurrence after lung ablation?',options:['Tumor histology','Patient age','Ablation margin','Number of tumors'],correctAnswers:[2],explanation:'Adequate margin (>5mm, ideally 10mm) most important.',difficulty:'medium',examFrequency:'high'},
  {id:'F015',section:'F',sectionTitle:'Interventional Oncology',subsection:'Bone',question:'Ablation for painful bone metastases provides pain relief in:',options:['30-40%','50-60%','70-80%','90-95%'],correctAnswers:[2],explanation:'Significant relief in 70-80%.',difficulty:'medium',examFrequency:'medium'},
  {id:'F016',section:'F',sectionTitle:'Interventional Oncology',subsection:'TACE',question:'mRECIST assesses response by:',options:['Total tumor size change','Viable (enhancing) tumor change','Tumor markers','PET metabolic activity'],correctAnswers:[1],explanation:'mRECIST measures viable (arterially enhancing) tumor.',difficulty:'medium',examFrequency:'high'},
  {id:'F017',section:'F',sectionTitle:'Interventional Oncology',subsection:'Ablation',question:'Microwave vs RFA:',options:['MWA has smaller zones','MWA more affected by heat sink','MWA faster with larger zones','MWA requires grounding pads'],correctAnswers:[2],explanation:'MWA faster, higher temps, less heat sink effect.',difficulty:'medium',examFrequency:'high'},
  {id:'F018',section:'F',sectionTitle:'Interventional Oncology',subsection:'SIRT',question:'Target tumor radiation dose for Y90?',options:['50-80 Gy','80-120 Gy','120-150 Gy','>200 Gy'],correctAnswers:[2],explanation:'Target 120-150 Gy for tumor response.',difficulty:'hard',examFrequency:'medium'},
  {id:'F019',section:'F',sectionTitle:'Interventional Oncology',subsection:'PVE',question:'Minimum FLR before major hepatectomy in normal liver?',options:['15-20%','25-30%','35-40%','>50%'],correctAnswers:[1],explanation:'25-30% for normal liver; 40% for cirrhotic.',difficulty:'medium',examFrequency:'high'},
  {id:'F020',section:'F',sectionTitle:'Interventional Oncology',subsection:'TACE',question:'Most common chemotherapy agent in cTACE?',options:['Cisplatin','Doxorubicin','5-FU','Oxaliplatin'],correctAnswers:[1],explanation:'Doxorubicin (often with lipiodol) most common.',difficulty:'easy',examFrequency:'high'},
  {id:'F021',section:'F',sectionTitle:'Interventional Oncology',subsection:'Ablation',question:'Hydrodissection during ablation is used to:',options:['Improve US visibility','Protect adjacent organs from thermal injury','Reduce bleeding','Increase ablation zone'],correctAnswers:[1],explanation:'Creates protective barrier for vulnerable structures.',difficulty:'easy',examFrequency:'high'},
  {id:'F022',section:'F',sectionTitle:'Interventional Oncology',subsection:'SIRT',question:'GDA coil embolization before Y90 is performed to:',options:['Increase tumor uptake','Prevent GI ulceration from non-target embolization','Reduce lung shunting','Improve catheter stability'],correctAnswers:[1],explanation:'Prevents reflux into GI tract, avoids ulceration.',difficulty:'medium',examFrequency:'high'},
  {id:'F023',section:'F',sectionTitle:'Interventional Oncology',subsection:'HCC',question:'Milan criteria for liver transplant in HCC?',options:['Single ≤3 cm','Single ≤5 cm or 2-3 tumors all ≤3 cm','Up to 5 tumors ≤5 cm each','Total burden ≤10 cm'],correctAnswers:[1],explanation:'Single ≤5cm OR 2-3 tumors all ≤3cm, no vascular invasion.',difficulty:'medium',examFrequency:'high'},
  {id:'F024',section:'F',sectionTitle:'Interventional Oncology',subsection:'Ablation',question:'Post-ablation syndrome is characterized by:',options:['Severe pain requiring opioids','Low-grade fever, fatigue, malaise','Jaundice and liver failure','Tumor lysis syndrome'],correctAnswers:[1],explanation:'Low-grade fever, malaise, self-limiting.',difficulty:'easy',examFrequency:'medium'},
  {id:'F025',section:'F',sectionTitle:'Interventional Oncology',subsection:'IRE',question:'IRE differs from thermal ablation by:',options:['Requiring higher temperatures','Preserving connective tissue architecture','Creating larger zones','Being less expensive'],correctAnswers:[1],explanation:'IRE preserves collagen/elastin, useful near vital structures.',difficulty:'medium',examFrequency:'medium'}

{
  id: 'a-new-1',
  section: 'A',
  subsection: 'Radiation Physics',
  question: 'What is the typical effective dose for a diagnostic abdominal CT scan?',
  options: [
    '0.1-0.5 mSv',
    '1-2 mSv',
    '8-15 mSv',
    '50-100 mSv',
    '200-300 mSv'
  ],
  correctAnswers: [2],
  explanation: 'A diagnostic abdominal CT scan typically delivers an effective dose of 8-15 mSv. For comparison, a chest X-ray is about 0.1 mSv, and annual background radiation is approximately 2-3 mSv. This knowledge is important for patient counseling and justification of imaging.',
  difficulty: 'medium'
},
{
  id: 'a-new-2',
  section: 'A',
  subsection: 'Radiation Protection',
  question: 'According to the ALARA principle, which of the following most effectively reduces operator radiation exposure during fluoroscopy?',
  options: [
    'Increasing frame rate',
    'Doubling the distance from the X-ray source',
    'Using magnification mode',
    'Positioning the image intensifier closer to the patient',
    'Removing the lead apron for better mobility'
  ],
  correctAnswers: [1],
  explanation: 'Doubling the distance from the radiation source reduces exposure by a factor of 4 (inverse square law). Increasing frame rate and magnification increase dose. The image intensifier should be close to the patient to reduce scatter, and lead aprons should always be worn.',
  difficulty: 'medium'
},
{
  id: 'a-new-3',
  section: 'A',
  subsection: 'Contrast Media',
  question: 'A patient develops urticaria and mild facial swelling 10 minutes after iodinated contrast injection. What is the most appropriate initial management?',
  options: [
    'Immediate intubation',
    'IV diphenhydramine and observation',
    'IM epinephrine 0.5mg immediately',
    'Stop the procedure and discharge home',
    'IV corticosteroids only'
  ],
  correctAnswers: [1],
  explanation: 'Urticaria with mild angioedema represents a mild-moderate allergic reaction. Initial treatment is IV antihistamines (diphenhydramine 25-50mg) with observation. Epinephrine is reserved for severe reactions with hypotension or bronchospasm. Corticosteroids help prevent biphasic reactions but act slowly.',
  difficulty: 'medium'
},
{
  id: 'a-new-4',
  section: 'A',
  subsection: 'Contrast Media',
  question: 'What is the recommended eGFR threshold below which metformin should be temporarily discontinued before iodinated contrast administration?',
  options: [
    'eGFR < 60 mL/min/1.73m²',
    'eGFR < 45 mL/min/1.73m²',
    'eGFR < 30 mL/min/1.73m²',
    'eGFR < 15 mL/min/1.73m²',
    'Metformin never needs to be held'
  ],
  correctAnswers: [2],
  explanation: 'Current guidelines (ACR, ESUR) recommend holding metformin for patients with eGFR < 30 mL/min/1.73m² receiving intravascular iodinated contrast due to the risk of lactic acidosis if contrast-induced nephropathy occurs. For eGFR 30-60, reassess renal function 48 hours post-procedure.',
  difficulty: 'medium'
},
{
  id: 'a-new-5',
  section: 'A',
  subsection: 'Vascular Access',
  question: 'When performing ultrasound-guided common femoral artery puncture, the ideal puncture site is:',
  options: [
    'At the inguinal ligament level',
    'Over the femoral head on fluoroscopy',
    'At the femoral bifurcation',
    '2 cm above the inguinal ligament',
    'At the superficial femoral artery origin'
  ],
  correctAnswers: [1],
  explanation: 'The ideal CFA puncture site is over the inferior third of the femoral head on fluoroscopy. This ensures puncture of the CFA (not SFA/profunda), allows effective compression against bone, and is below the inguinal ligament to reduce retroperitoneal hemorrhage risk.',
  difficulty: 'easy'
},
{
  id: 'a-new-6',
  section: 'A',
  subsection: 'Guidewires',
  question: 'A J-tipped guidewire is preferred over a straight wire for initial vascular access because:',
  options: [
    'It has better torque control',
    'It is stiffer and provides better support',
    'The curved tip reduces risk of dissection and subintimal passage',
    'It is more visible on fluoroscopy',
    'It can cross total occlusions more easily'
  ],
  correctAnswers: [2],
  explanation: 'The J-tip configuration deflects off vessel walls rather than catching on plaque or intima, reducing the risk of dissection and subintimal wire passage. Straight wires offer better steerability but higher perforation risk. Stiff wires are used for device support, not initial access.',
  difficulty: 'easy'
},
{
  id: 'a-new-7',
  section: 'A',
  subsection: 'Catheters',
  question: 'Which catheter shape is most appropriate for selecting the contralateral common iliac artery from an ipsilateral femoral approach?',
  options: [
    'Straight flush catheter',
    'Cobra C2',
    'Roberts uterine catheter',
    'Simmons 1',
    'Mickelson'
  ],
  correctAnswers: [2],
  explanation: 'The Roberts uterine catheter (or Omni flush/Contra catheter) has a reverse curve specifically designed for contralateral iliac selection from femoral access. Cobra catheters are used for visceral vessels. Simmons catheters require reformation in the aortic arch.',
  difficulty: 'medium'
},
{
  id: 'a-new-8',
  section: 'A',
  subsection: 'Hemostasis',
  question: 'What is the minimum recommended ACT (Activated Clotting Time) before removal of a femoral arterial sheath after using heparin?',
  options: [
    '< 100 seconds',
    '< 150 seconds',
    '< 180 seconds',
    '< 250 seconds',
    'ACT does not need to be checked'
  ],
  correctAnswers: [2],
  explanation: 'ACT should be < 150-180 seconds before sheath removal to allow adequate hemostasis with manual compression. Higher ACT values significantly increase the risk of access site bleeding and hematoma formation. Some centers use closure devices which may allow removal at higher ACTs.',
  difficulty: 'medium'
},
{
  id: 'a-new-9',
  section: 'A',
  subsection: 'Pharmacology',
  question: 'The mechanism of action of heparin involves:',
  options: [
    'Direct inhibition of thrombin only',
    'Potentiation of antithrombin III activity',
    'Inhibition of platelet aggregation',
    'Blocking vitamin K-dependent factor synthesis',
    'Direct factor Xa inhibition only'
  ],
  correctAnswers: [1],
  explanation: 'Heparin works by binding to and potentiating antithrombin III (AT-III), which then inhibits thrombin (IIa), factor Xa, and other serine proteases. This is distinct from direct thrombin inhibitors (bivalirudin) or vitamin K antagonists (warfarin). UFH requires AT-III to function.',
  difficulty: 'easy'
},
{
  id: 'a-new-10',
  section: 'A',
  subsection: 'Pharmacology',
  question: 'What is the appropriate reversal agent for dabigatran in a patient requiring emergency intervention?',
  options: [
    'Protamine sulfate',
    'Vitamin K',
    'Fresh frozen plasma',
    'Idarucizumab',
    'Tranexamic acid'
  ],
  correctAnswers: [3],
  explanation: 'Idarucizumab (Praxbind) is a specific reversal agent for dabigatran (a direct thrombin inhibitor). Protamine reverses heparin, vitamin K reverses warfarin, and FFP provides clotting factors but does not specifically reverse DOACs. Andexanet alfa reverses factor Xa inhibitors.',
  difficulty: 'medium'
},
{
  id: 'a-new-11',
  section: 'A',
  subsection: 'Imaging',
  question: 'In DSA, temporal subtraction artifacts are most commonly caused by:',
  options: [
    'Incorrect contrast injection rate',
    'Patient motion between mask and contrast images',
    'Using too high a frame rate',
    'Incorrect catheter positioning',
    'Excessive contrast concentration'
  ],
  correctAnswers: [1],
  explanation: 'Temporal subtraction in DSA requires perfect alignment between the mask (pre-contrast) and live (contrast) images. Patient motion between acquisition of these images creates misregistration artifacts appearing as white/black edges around structures. Pixel shifting can partially correct minor motion.',
  difficulty: 'easy'
},
{
  id: 'a-new-12',
  section: 'A',
  subsection: 'Sedation',
  question: 'A patient under moderate sedation becomes unresponsive to verbal stimuli but responds to painful stimuli with purposeful movements. This represents:',
  options: [
    'Minimal sedation (anxiolysis)',
    'Moderate sedation',
    'Deep sedation',
    'General anesthesia',
    'Normal response to moderate sedation'
  ],
  correctAnswers: [2],
  explanation: 'Deep sedation is defined as a drug-induced depression of consciousness where patients cannot be easily aroused but respond purposefully to repeated or painful stimulation. Moderate sedation maintains response to verbal commands. This patient has progressed to deep sedation and requires closer monitoring.',
  difficulty: 'medium'
},
{
  id: 'a-new-13',
  section: 'A',
  subsection: 'Anatomy',
  question: 'The right gonadal vein drains directly into the:',
  options: [
    'Right renal vein',
    'Inferior vena cava',
    'Right common iliac vein',
    'Right internal iliac vein',
    'Azygos vein'
  ],
  correctAnswers: [1],
  explanation: 'The right gonadal vein drains directly into the IVC, while the left gonadal vein drains into the left renal vein. This anatomical difference explains why left varicoceles are more common (longer drainage path, compression by sigmoid colon, nutcracker effect).',
  difficulty: 'easy'
},
{
  id: 'a-new-14',
  section: 'A',
  subsection: 'Anatomy',
  question: 'The celiac trunk typically arises from the aorta at which vertebral level?',
  options: [
    'T10',
    'T12-L1',
    'L2',
    'L3',
    'L4'
  ],
  correctAnswers: [1],
  explanation: 'The celiac trunk arises from the anterior aorta at the T12-L1 level, just below the aortic hiatus. The SMA arises at L1, renal arteries at L1-L2, and IMA at L3. These landmarks are important for planning aortic interventions and visceral catheterization.',
  difficulty: 'easy'
},
{
  id: 'a-new-15',
  section: 'A',
  subsection: 'Patient Safety',
  question: 'According to WHO surgical safety checklist principles, the "time out" before an IR procedure should include verification of:',
  options: [
    'Only patient identity',
    'Patient identity and procedure site only',
    'Patient identity, procedure, site, and relevant imaging',
    'Only the consent form',
    'Only antibiotic administration'
  ],
  correctAnswers: [2],
  explanation: 'The WHO time-out requires verification of correct patient, correct procedure, correct site/side, relevant imaging availability, anticipated critical events, antibiotic prophylaxis if indicated, and confirmed consent. This reduces wrong-patient and wrong-site procedures.',
  difficulty: 'easy'
},
{
  id: 'a-new-16',
  section: 'A',
  subsection: 'Embolization Materials',
  question: 'Which embolic agent provides the most permanent occlusion?',
  options: [
    'Gelfoam',
    'Coils',
    'Autologous blood clot',
    'Vasopressin',
    'Thrombin'
  ],
  correctAnswers: [1],
  explanation: 'Coils provide permanent mechanical occlusion and are not resorbed. Gelfoam is temporary (2-6 weeks), autologous clot is very temporary, and vasopressin/thrombin cause temporary vasospasm or thrombosis. PVA particles and liquid embolics (glue, Onyx) also provide permanent occlusion.',
  difficulty: 'easy'
},
{
  id: 'a-new-17',
  section: 'A',
  subsection: 'Embolization Materials',
  question: 'What is the mechanism of action of N-butyl cyanoacrylate (NBCA/glue) as an embolic agent?',
  options: [
    'Mechanical occlusion like a plug',
    'Inducing thrombosis through platelet activation',
    'Rapid polymerization on contact with ionic fluids (blood)',
    'Creating vasospasm',
    'Protein precipitation'
  ],
  correctAnswers: [2],
  explanation: 'NBCA polymerizes instantly on contact with ionic solutions including blood, creating a solid cast within the vessel. The polymerization speed can be modified by mixing with Lipiodol. It provides permanent occlusion and is particularly useful for high-flow lesions and AVMs.',
  difficulty: 'medium'
},

// ============================================
// SECTION B: Arterial Interventions (Questions 18-37)
// ============================================

{
  id: 'b-new-1',
  section: 'B',
  subsection: 'Aortic Disease',
  question: 'According to the Stanford classification, a Type B aortic dissection involves:',
  options: [
    'Only the ascending aorta',
    'Both ascending and descending aorta',
    'Only the descending aorta distal to the left subclavian artery',
    'The aortic arch only',
    'The abdominal aorta only'
  ],
  correctAnswers: [2],
  explanation: 'Stanford Type B dissection originates distal to the left subclavian artery and involves only the descending aorta. Type A involves the ascending aorta (regardless of extent). Type B is typically managed medically unless complicated (malperfusion, rupture, rapid expansion).',
  difficulty: 'easy'
},
{
  id: 'b-new-2',
  section: 'B',
  subsection: 'Aortic Disease',
  question: 'What is the minimum recommended proximal landing zone length for thoracic endovascular aortic repair (TEVAR)?',
  options: [
    '5 mm',
    '10 mm',
    '20 mm',
    '40 mm',
    '60 mm'
  ],
  correctAnswers: [2],
  explanation: 'A minimum of 20mm proximal landing zone in healthy aorta is recommended for adequate seal and to prevent type Ia endoleak. Shorter landing zones increase endoleak and migration risk. This may require coverage of the left subclavian artery with or without revascularization.',
  difficulty: 'medium'
},
{
  id: 'b-new-3',
  section: 'B',
  subsection: 'Peripheral Arterial Disease',
  question: 'According to the TASC II classification, which lesion is classified as TASC D in the femoropopliteal segment?',
  options: [
    'Single stenosis ≤10cm',
    'Single occlusion ≤5cm',
    'Chronic total occlusion of CFA or SFA (>20cm)',
    'Multiple stenoses totaling ≤10cm',
    'Single stenosis 3-5cm'
  ],
  correctAnswers: [2],
  explanation: 'TASC D femoropopliteal lesions include CTO >20cm involving SFA, chronic total occlusion of popliteal and proximal trifurcation vessels. TASC D traditionally favored surgery, though endovascular treatment is increasingly used. TASC A/B favor endovascular, TASC C/D traditionally favored surgery.',
  difficulty: 'hard'
},
{
  id: 'b-new-4',
  section: 'B',
  subsection: 'Peripheral Arterial Disease',
  question: 'What is the primary advantage of drug-coated balloons (DCB) over plain balloon angioplasty in femoropopliteal disease?',
  options: [
    'Better acute lumen gain',
    'Reduced restenosis rates',
    'Lower cost',
    'Shorter procedure time',
    'Less risk of dissection'
  ],
  correctAnswers: [1],
  explanation: 'DCBs deliver antiproliferative drugs (usually paclitaxel) to the vessel wall, significantly reducing neointimal hyperplasia and restenosis rates compared to plain balloon angioplasty. Acute lumen gain is similar, but long-term patency is improved.',
  difficulty: 'medium'
},
{
  id: 'b-new-5',
  section: 'B',
  subsection: 'Peripheral Arterial Disease',
  question: 'In critical limb ischemia (CLI), which angiosome should be primarily targeted for revascularization in a patient with a heel ulcer?',
  options: [
    'Anterior tibial/dorsalis pedis',
    'Peroneal artery',
    'Posterior tibial artery',
    'Any available vessel',
    'Popliteal artery'
  ],
  correctAnswers: [2],
  explanation: 'The heel is supplied by the posterior tibial artery (calcaneal branch). Angiosome-directed revascularization, restoring direct flow to the wound territory, improves wound healing compared to indirect revascularization through collaterals, though any revascularization is better than none.',
  difficulty: 'hard'
},
{
  id: 'b-new-6',
  section: 'B',
  subsection: 'Carotid Disease',
  question: 'According to guidelines, carotid artery stenting (CAS) is preferred over carotid endarterectomy (CEA) in which scenario?',
  options: [
    'All patients over 70 years old',
    'Previous neck radiation with hostile surgical field',
    'All symptomatic patients',
    'Patients with contralateral occlusion',
    'All patients with >80% stenosis'
  ],
  correctAnswers: [1],
  explanation: 'CAS is preferred when CEA carries high surgical risk: prior neck radiation, previous CEA with restenosis, surgically inaccessible lesions (high carotid bifurcation), or contralateral laryngeal nerve palsy. Age >70 actually favors CEA due to higher CAS stroke risk in elderly.',
  difficulty: 'medium'
},
{
  id: 'b-new-7',
  section: 'B',
  subsection: 'Carotid Disease',
  question: 'During carotid artery stenting, embolic protection devices are used to:',
  options: [
    'Improve stent apposition',
    'Reduce contrast usage',
    'Capture debris released during intervention to prevent stroke',
    'Maintain blood flow during balloon inflation',
    'Reduce procedure time'
  ],
  correctAnswers: [2],
  explanation: 'Embolic protection devices (filters or flow reversal systems) capture atherosclerotic debris dislodged during CAS to prevent cerebral embolization and stroke. Studies show reduced stroke rates with embolic protection. Filters are placed distally and retrieved after stenting.',
  difficulty: 'easy'
},
{
  id: 'b-new-8',
  section: 'B',
  subsection: 'Renal Artery',
  question: 'Which finding best indicates hemodynamically significant renal artery stenosis on duplex ultrasound?',
  options: [
    'Peak systolic velocity >100 cm/s',
    'Renal-aortic ratio >3.5',
    'Resistive index >0.8',
    'Renal length <8cm',
    'Absent diastolic flow in the aorta'
  ],
  correctAnswers: [1],
  explanation: 'A renal-aortic ratio (RAR) >3.5 or peak systolic velocity >200 cm/s indicates >60% stenosis. PSV >100 cm/s alone is not specific. Resistive index reflects parenchymal disease, not stenosis severity. Tardus parvus waveform in intrarenal arteries also suggests proximal stenosis.',
  difficulty: 'medium'
},
{
  id: 'b-new-9',
  section: 'B',
  subsection: 'Mesenteric Disease',
  question: 'Chronic mesenteric ischemia typically requires stenosis/occlusion of how many mesenteric vessels before symptoms develop?',
  options: [
    'One vessel',
    'At least two of three main vessels',
    'All three vessels must be occluded',
    'Only the SMA needs to be involved',
    'Symptoms occur with any single vessel stenosis >50%'
  ],
  correctAnswers: [1],
  explanation: 'Due to rich collateral networks between celiac, SMA, and IMA, chronic mesenteric ischemia typically requires significant stenosis/occlusion of at least 2 of 3 vessels. The classic triad is postprandial pain, food fear, and weight loss. Single vessel disease rarely causes chronic symptoms.',
  difficulty: 'medium'
},
{
  id: 'b-new-10',
  section: 'B',
  subsection: 'Mesenteric Disease',
  question: 'In acute mesenteric ischemia, which imaging finding suggests bowel infarction and is a contraindication to endovascular revascularization alone?',
  options: [
    'SMA occlusion',
    'Absent bowel wall enhancement',
    'Pneumatosis intestinalis',
    'Dilated small bowel loops',
    'Mesenteric stranding'
  ],
  correctAnswers: [2],
  explanation: 'Pneumatosis intestinalis (gas in bowel wall) indicates transmural infarction and requires surgical exploration for bowel resection, not just revascularization. Other signs of infarction include portal venous gas, lack of wall enhancement, and free perforation. Early SMA occlusion may still be viable.',
  difficulty: 'medium'
},
{
  id: 'b-new-11',
  section: 'B',
  subsection: 'Acute Limb Ischemia',
  question: 'According to the Rutherford classification, class IIb acute limb ischemia is characterized by:',
  options: [
    'Viable limb, not immediately threatened',
    'Marginally threatened, salvageable with prompt treatment',
    'Immediately threatened with sensory loss and mild motor deficit',
    'Irreversible ischemia with major tissue loss',
    'No sensory or motor deficit'
  ],
  correctAnswers: [2],
  explanation: 'Rutherford IIb indicates immediately threatened limb with sensory loss beyond toes and mild-moderate motor deficit, requiring immediate revascularization. Class I is viable, IIa is marginally threatened (salvageable if treated promptly), and III is irreversible. IIb has worse prognosis than IIa.',
  difficulty: 'hard'
},
{
  id: 'b-new-12',
  section: 'B',
  subsection: 'Acute Limb Ischemia',
  question: 'Catheter-directed thrombolysis for acute limb ischemia is contraindicated in which situation?',
  options: [
    'Symptoms present for 10 days',
    'History of stroke 2 years ago',
    'Active gastrointestinal bleeding',
    'Age over 75 years',
    'Prior bypass surgery'
  ],
  correctAnswers: [2],
  explanation: 'Absolute contraindications to thrombolysis include active bleeding, recent stroke (<2 months), and recent major surgery/trauma. Symptom duration >14 days is a relative contraindication. Age alone is not a contraindication. Prior bypass does not preclude thrombolysis.',
  difficulty: 'medium'
},
{
  id: 'b-new-13',
  section: 'B',
  subsection: 'Trauma',
  question: 'In blunt thoracic aortic injury, the most common site of injury is:',
  options: [
    'Ascending aorta',
    'Aortic root',
    'Aortic isthmus (just distal to left subclavian)',
    'Descending thoracic aorta at diaphragm',
    'Aortic arch'
  ],
  correctAnswers: [2],
  explanation: 'The aortic isthmus (junction of mobile arch and fixed descending aorta at ligamentum arteriosum) is the most common site of blunt aortic injury (90%). The differential deceleration forces at this transition point cause intimal tears. TEVAR has become first-line treatment.',
  difficulty: 'easy'
},
{
  id: 'b-new-14',
  section: 'B',
  subsection: 'Trauma',
  question: 'What is the first-line treatment for a grade III splenic laceration with contrast extravasation in a hemodynamically stable patient?',
  options: [
    'Observation only',
    'Immediate splenectomy',
    'Splenic artery embolization',
    'Blood transfusion and observation',
    'Surgical splenorrhaphy'
  ],
  correctAnswers: [2],
  explanation: 'Contrast extravasation indicates active bleeding requiring intervention. In a stable patient, splenic artery embolization (proximal or selective) preserves splenic function while controlling hemorrhage. Splenectomy is reserved for unstable patients or embolization failure. Observation with contrast blush risks delayed rupture.',
  difficulty: 'medium'
},
{
  id: 'b-new-15',
  section: 'B',
  subsection: 'Visceral Aneurysms',
  question: 'Which visceral artery aneurysm has the highest risk of rupture?',
  options: [
    'Splenic artery aneurysm',
    'Hepatic artery aneurysm',
    'SMA aneurysm',
    'Celiac artery aneurysm',
    'Gastroduodenal artery aneurysm'
  ],
  correctAnswers: [1],
  explanation: 'Hepatic artery aneurysms have approximately 80% rupture risk if untreated, with 35% mortality. Splenic artery aneurysms are most common but have lower rupture risk except in pregnancy. Treatment is indicated for hepatic aneurysms regardless of size, and for other visceral aneurysms >2cm.',
  difficulty: 'hard'
},
{
  id: 'b-new-16',
  section: 'B',
  subsection: 'Visceral Aneurysms',
  question: 'During embolization of a splenic artery aneurysm, coils should ideally be placed:',
  options: [
    'Only proximal to the aneurysm',
    'Only distal to the aneurysm',
    'Both proximal and distal to the aneurysm (sandwich technique)',
    'Only within the aneurysm sac',
    'In the main splenic artery trunk only'
  ],
  correctAnswers: [2],
  explanation: 'The sandwich technique (coils both proximal and distal to the aneurysm) prevents retrograde filling through collaterals, which is common in the splenic circulation via short gastric and gastroepiploic vessels. Proximal-only embolization risks continued aneurysm perfusion and growth.',
  difficulty: 'medium'
},
{
  id: 'b-new-17',
  section: 'B',
  subsection: 'Hemorrhage',
  question: 'In a patient with massive upper GI bleeding and negative endoscopy, CT angiography is positive. What is the minimum bleeding rate typically detectable by CTA?',
  options: [
    '0.04 mL/min',
    '0.1-0.3 mL/min',
    '0.5-1.0 mL/min',
    '2-3 mL/min',
    '5 mL/min'
  ],
  correctAnswers: [1],
  explanation: 'CTA can detect bleeding rates as low as 0.1-0.3 mL/min, making it more sensitive than conventional angiography (0.5-1.0 mL/min) and nuclear medicine bleeding scans (0.04 mL/min but less precise localization). CTA also provides anatomic roadmap for intervention.',
  difficulty: 'hard'
},
{
  id: 'b-new-18',
  section: 'B',
  subsection: 'Hemorrhage',
  question: 'When performing bronchial artery embolization for hemoptysis, which of the following is the most feared complication?',
  options: [
    'Post-embolization syndrome',
    'Spinal cord infarction',
    'Bronchial stenosis',
    'Chest wall pain',
    'Fever'
  ],
  correctAnswers: [1],
  explanation: 'Spinal cord infarction from embolization of the anterior spinal artery (artery of Adamkiewicz, which may arise from bronchial or intercostal arteries) is the most serious complication. Careful DSA to identify spinal branches and avoiding small particle embolization (<325μm) reduces this risk.',
  difficulty: 'medium'
},
{
  id: 'b-new-19',
  section: 'B',
  subsection: 'Dialysis Access',
  question: 'What is the recommended first-line treatment for a thrombosed AV fistula?',
  options: [
    'Surgical thrombectomy',
    'Create new access',
    'Pharmacomechanical thrombolysis/thrombectomy',
    'Systemic anticoagulation',
    'Observation'
  ],
  correctAnswers: [2],
  explanation: 'Endovascular pharmacomechanical thrombolysis/thrombectomy is first-line for thrombosed AV access, with high technical success rates and ability to treat underlying stenosis in the same session. It preserves venous capital and is less invasive than surgery. Underlying stenosis must be treated to prevent re-thrombosis.',
  difficulty: 'medium'
},
{
  id: 'b-new-20',
  section: 'B',
  subsection: 'Dialysis Access',
  question: 'In a patient with central venous stenosis and arm swelling on the side of a functioning AV fistula, the most appropriate treatment is:',
  options: [
    'Ligate the fistula',
    'Venous angioplasty ± stenting of the central stenosis',
    'Arm elevation only',
    'Create access on the opposite arm',
    'Systemic anticoagulation'
  ],
  correctAnswers: [1],
  explanation: 'Central venous stenosis (subclavian/brachiocephalic) causing symptomatic outflow obstruction should be treated with angioplasty ± stent placement to preserve the functioning access. Fistula ligation is last resort. Primary patency of central venous stents is limited, requiring surveillance and repeat intervention.',
  difficulty: 'medium'
},

// ============================================
// SECTION C: Venous Interventions (Questions 38-54)
// ============================================

{
  id: 'c-new-1',
  section: 'C',
  subsection: 'DVT',
  question: 'According to current guidelines, catheter-directed thrombolysis for DVT is most appropriate in which patient?',
  options: [
    'All patients with first-time DVT',
    'Iliofemoral DVT with symptoms <14 days and low bleeding risk',
    'Elderly patient with calf DVT',
    'Asymptomatic DVT found incidentally',
    'DVT with symptom duration >28 days'
  ],
  correctAnswers: [1],
  explanation: 'CDT is recommended for acute (<14 days) iliofemoral DVT in patients with low bleeding risk and good functional status. It reduces post-thrombotic syndrome severity. Isolated calf DVT, chronic DVT, and high bleeding risk patients are better treated with anticoagulation alone.',
  difficulty: 'medium'
},
{
  id: 'c-new-2',
  section: 'C',
  subsection: 'DVT',
  question: 'May-Thurner syndrome involves compression of which vessel?',
  options: [
    'Right common iliac vein by right common iliac artery',
    'Left common iliac vein by right common iliac artery',
    'IVC by the liver',
    'Femoral vein by the femoral artery',
    'Left renal vein by the SMA'
  ],
  correctAnswers: [1],
  explanation: 'May-Thurner (iliac vein compression syndrome) involves compression of the left common iliac vein by the overlying right common iliac artery against the lumbar spine. This explains the 3:1 predominance of left-sided DVT. Treatment involves thrombolysis and iliac vein stenting.',
  difficulty: 'easy'
},
{
  id: 'c-new-3',
  section: 'C',
  subsection: 'PE',
  question: 'Which of the following is an indication for catheter-directed therapy in pulmonary embolism?',
  options: [
    'Low-risk PE with negative troponin',
    'Submassive PE with RV dysfunction despite anticoagulation',
    'All patients with PE',
    'Chronic thromboembolic pulmonary hypertension',
    'Subsegmental PE'
  ],
  correctAnswers: [1],
  explanation: 'Catheter-directed therapy (thrombolysis or thrombectomy) is indicated for massive PE with hemodynamic instability or submassive PE with RV dysfunction and clinical deterioration. Low-risk PE needs anticoagulation only. CTEPH requires pulmonary endarterectomy or balloon pulmonary angioplasty.',
  difficulty: 'medium'
},
{
  id: 'c-new-4',
  section: 'C',
  subsection: 'IVC Filters',
  question: 'The primary indication for IVC filter placement is:',
  options: [
    'All patients with DVT',
    'Contraindication to anticoagulation with acute VTE',
    'Prevention of DVT in high-risk surgical patients',
    'All patients with PE',
    'Chronic DVT'
  ],
  correctAnswers: [1],
  explanation: 'IVC filters are indicated when anticoagulation is contraindicated in patients with acute proximal DVT or PE (e.g., active bleeding, recent surgery). Prophylactic filter placement in surgical patients is controversial. Retrievable filters should be removed when anticoagulation can resume.',
  difficulty: 'easy'
},
{
  id: 'c-new-5',
  section: 'C',
  subsection: 'IVC Filters',
  question: 'A patient with an IVC filter develops bilateral leg swelling 6 months after placement. The most likely cause is:',
  options: [
    'Heart failure',
    'Filter thrombosis',
    'Lymphedema',
    'Filter migration',
    'Filter fracture'
  ],
  correctAnswers: [1],
  explanation: 'IVC filter thrombosis occurs in up to 30% of patients over time, presenting with bilateral leg edema from venous outflow obstruction. Treatment includes anticoagulation if possible, and potentially catheter-directed intervention. This is a reason to retrieve filters when the indication resolves.',
  difficulty: 'medium'
},
{
  id: 'c-new-6',
  section: 'C',
  subsection: 'Varicocele',
  question: 'During varicocele embolization, the most common venous anatomy encountered is:',
  options: [
    'Single gonadal vein draining to IVC',
    'Multiple parallel gonadal veins',
    'Gonadal vein draining to common iliac vein',
    'Absent gonadal vein',
    'Gonadal vein draining to hepatic vein'
  ],
  correctAnswers: [1],
  explanation: 'Multiple parallel gonadal veins are common (up to 20% have duplicated systems), requiring careful venography to identify all draining veins. Missing a parallel channel results in recurrence. The left gonadal vein drains to the left renal vein, right gonadal to the IVC.',
  difficulty: 'medium'
},
{
  id: 'c-new-7',
  section: 'C',
  subsection: 'Varicocele',
  question: 'What is the technical success rate of percutaneous varicocele embolization?',
  options: [
    '50-60%',
    '70-80%',
    '90-95%',
    '99-100%',
    'Less than 50%'
  ],
  correctAnswers: [2],
  explanation: 'Percutaneous varicocele embolization has technical success rates of 90-95%, comparable to surgical ligation but with advantages of local anesthesia, shorter recovery, and ability to treat recurrence from missed parallel veins. Clinical success (semen improvement, pain relief) is also high.',
  difficulty: 'easy'
},
{
  id: 'c-new-8',
  section: 'C',
  subsection: 'Pelvic Congestion',
  question: 'Pelvic congestion syndrome is characterized by all of the following EXCEPT:',
  options: [
    'Chronic pelvic pain worsened by standing',
    'Dilated ovarian veins >6mm',
    'Pain improved with lying down',
    'Associated with nulliparity',
    'May have vulvar or thigh varicosities'
  ],
  correctAnswers: [3],
  explanation: 'Pelvic congestion syndrome is associated with multiparity (multiple pregnancies), not nulliparity. The hormonal and anatomical changes of pregnancy contribute to ovarian vein dilation. Symptoms are typically postural (worse standing, better supine) and may include visible varicosities.',
  difficulty: 'medium'
},
{
  id: 'c-new-9',
  section: 'C',
  subsection: 'Portal Hypertension',
  question: 'The hepatic venous pressure gradient (HVPG) threshold for clinically significant portal hypertension is:',
  options: [
    '>5 mmHg',
    '>10 mmHg',
    '>15 mmHg',
    '>20 mmHg',
    '>25 mmHg'
  ],
  correctAnswers: [1],
  explanation: 'HVPG >10 mmHg defines clinically significant portal hypertension (CSPH), associated with varices formation and decompensation risk. Normal HVPG is 1-5 mmHg. HVPG >12 mmHg indicates high variceal bleeding risk. TIPS aims to reduce HVPG to <12 mmHg or by >50%.',
  difficulty: 'medium'
},
{
  id: 'c-new-10',
  section: 'C',
  subsection: 'TIPS',
  question: 'Which of the following is a contraindication to TIPS?',
  options: [
    'Child-Pugh B cirrhosis',
    'Ascites',
    'Hepatic encephalopathy grade 3-4',
    'Previous variceal bleeding',
    'Portal vein velocity <10 cm/s'
  ],
  correctAnswers: [2],
  explanation: 'Severe hepatic encephalopathy (grade 3-4) is a contraindication to TIPS as shunting portal blood past the liver worsens encephalopathy. Other contraindications include severe heart failure, severe pulmonary hypertension, uncontrolled sepsis, and severe hepatic failure.',
  difficulty: 'medium'
},
{
  id: 'c-new-11',
  section: 'C',
  subsection: 'TIPS',
  question: 'The target portal pressure gradient after TIPS placement should be:',
  options: [
    '<5 mmHg',
    '<8 mmHg',
    '<12 mmHg or 50% reduction',
    '<20 mmHg',
    'Complete elimination of the gradient'
  ],
  correctAnswers: [2],
  explanation: 'The target post-TIPS gradient is <12 mmHg or >50% reduction from baseline. This reduces variceal bleeding and refractory ascites while minimizing excessive shunting that causes encephalopathy. Covered stent-grafts maintain patency better than bare stents.',
  difficulty: 'medium'
},
{
  id: 'c-new-12',
  section: 'C',
  subsection: 'TIPS',
  question: 'The most common cause of TIPS dysfunction within the first year is:',
  options: [
    'Stent infection',
    'Hepatic vein stenosis',
    'Intimal hyperplasia within the shunt',
    'Portal vein thrombosis',
    'Stent migration'
  ],
  correctAnswers: [2],
  explanation: 'Intimal hyperplasia causing shunt stenosis is the most common cause of TIPS dysfunction, occurring in up to 80% of bare metal stents at 1 year. Covered stent-grafts (e-PTFE) significantly reduce this, with primary patency >80% at 1 year. Surveillance with Doppler ultrasound is essential.',
  difficulty: 'medium'
},
{
  id: 'c-new-13',
  section: 'C',
  subsection: 'Variceal Bleeding',
  question: 'In a patient with acute variceal bleeding failing endoscopic therapy, the timing of rescue TIPS should ideally be:',
  options: [
    'Within 72 hours',
    'After 1 week of conservative management',
    'Only after second endoscopy failure',
    'As elective procedure after discharge',
    'Within 24-48 hours'
  ],
  correctAnswers: [4],
  explanation: 'Rescue TIPS for failed endoscopic therapy should be performed within 24-48 hours (ideally <72 hours). Early TIPS in high-risk patients (Child-Pugh C or B with active bleeding) improves survival. Delayed TIPS has higher mortality. TIPS controls bleeding in >90% of cases.',
  difficulty: 'medium'
},
{
  id: 'c-new-14',
  section: 'C',
  subsection: 'Budd-Chiari',
  question: 'The first-line interventional treatment for Budd-Chiari syndrome with hepatic vein thrombosis is:',
  options: [
    'Liver transplantation',
    'Surgical shunt creation',
    'Hepatic vein angioplasty/stenting',
    'TIPS',
    'Anticoagulation only'
  ],
  correctAnswers: [2],
  explanation: 'Hepatic vein recanalization with angioplasty ± stenting is first-line for Budd-Chiari when technically feasible. If hepatic veins cannot be recanalized, TIPS (direct intrahepatic portosystemic shunt) is performed. Liver transplant is reserved for failure of interventional options or advanced cirrhosis.',
  difficulty: 'medium'
},
{
  id: 'c-new-15',
  section: 'C',
  subsection: 'Central Venous Access',
  question: 'The optimal catheter tip position for a tunneled central venous catheter is:',
  options: [
    'Superior vena cava',
    'Right atrium',
    'Cavoatrial junction',
    'Brachiocephalic vein',
    'Internal jugular vein'
  ],
  correctAnswers: [2],
  explanation: 'The cavoatrial junction is the optimal position, providing reliable blood return, reducing thrombosis risk (better flow), and avoiding atrial arrhythmias from deep atrial positioning. Too superior positioning (SVC, brachiocephalic) increases thrombosis and dysfunction risk.',
  difficulty: 'easy'
},
{
  id: 'c-new-16',
  section: 'C',
  subsection: 'Central Venous Access',
  question: 'A patient with a port develops fever and positive blood cultures. The port was placed 8 months ago. Initial management includes:',
  options: [
    'Immediate port removal',
    'Antibiotics alone without port removal',
    'Blood cultures through port and peripheral, antibiotics, and reassessment',
    'Port exchange over wire',
    'Observation only'
  ],
  correctAnswers: [2],
  explanation: 'Initial management includes blood cultures from the port and peripherally to confirm catheter-related bloodstream infection (CRBSI), with empiric antibiotics. Uncomplicated CRBSI may be treated with antibiotics and lock therapy. Port removal is needed for complicated infections, tunnel infection, or treatment failure.',
  difficulty: 'medium'
},
{
  id: 'c-new-17',
  section: 'C',
  subsection: 'Chronic Venous Disease',
  question: 'According to the CEAP classification, C4 chronic venous disease includes:',
  options: [
    'Telangiectasias',
    'Varicose veins',
    'Edema',
    'Skin changes (pigmentation, eczema, lipodermatosclerosis)',
    'Active ulceration'
  ],
  correctAnswers: [3],
  explanation: 'CEAP C4 indicates skin changes secondary to venous disease including pigmentation, eczema, and lipodermatosclerosis. C1 = telangiectasias, C2 = varicose veins, C3 = edema, C5 = healed ulcer, C6 = active ulcer. Higher C class indicates more advanced disease requiring treatment.',
  difficulty: 'medium'
},

// ============================================
// SECTION D: Non-Vascular Interventions (Questions 55-71)
// ============================================

{
  id: 'd-new-1',
  section: 'D',
  subsection: 'Biliary',
  question: 'What is the most common indication for percutaneous biliary drainage?',
  options: [
    'Benign biliary stricture',
    'Bile leak after cholecystectomy',
    'Malignant biliary obstruction when ERCP fails or is not possible',
    'Primary sclerosing cholangitis',
    'Choledocholithiasis'
  ],
  correctAnswers: [2],
  explanation: 'Malignant biliary obstruction (pancreatic cancer, cholangiocarcinoma, metastases) when ERCP fails or is contraindicated is the most common indication. ERCP is generally first-line for distal obstruction. PTC is preferred for hilar tumors, prior surgery (Roux-en-Y), and failed ERCP.',
  difficulty: 'easy'
},
{
  id: 'd-new-2',
  section: 'D',
  subsection: 'Biliary',
  question: 'During percutaneous transhepatic cholangiography, the bile duct is entered using a:',
  options: [
    '22-gauge Chiba needle aiming for central ducts',
    '22-gauge needle with peripheral approach',
    '18-gauge needle directly into the common bile duct',
    'Trocar system',
    'Microwave ablation needle'
  ],
  correctAnswers: [1],
  explanation: 'PTC uses a 22-gauge Chiba needle advanced from a peripheral subcostal approach, targeting peripheral bile ducts while injecting contrast during slow withdrawal. Peripheral approach allows tract development and reduces major vascular injury. Central hilar puncture risks major bleeding.',
  difficulty: 'medium'
},
{
  id: 'd-new-3',
  section: 'D',
  subsection: 'Biliary',
  question: 'After percutaneous biliary drainage, a biliary drain should typically be left for how long before tract maturation allows removal?',
  options: [
    '24-48 hours',
    '1-2 weeks',
    '4-6 weeks',
    '3-6 months',
    'Indefinitely'
  ],
  correctAnswers: [2],
  explanation: 'Biliary tract maturation takes approximately 4-6 weeks, after which the catheter can be removed if the obstruction is resolved (e.g., stone clearance). Premature removal risks biliary peritonitis. For malignant obstruction, internal drainage via stent may allow catheter removal once function is confirmed.',
  difficulty: 'medium'
},
{
  id: 'd-new-4',
  section: 'D',
  subsection: 'Renal',
  question: 'The preferred site for percutaneous nephrostomy access is:',
  options: [
    'Upper pole anterior calyx',
    'Lower pole posterior calyx',
    'Middle calyx',
    'Renal pelvis directly',
    'Any calyx with largest hydronephrosis'
  ],
  correctAnswers: [1],
  explanation: 'Lower pole posterior calyx is preferred as it provides direct access to the collecting system through the avascular plane (Brödel\'s line), avoids the pleura, and allows comfortable catheter positioning. Upper pole risks pneumothorax. Anterior approach risks traversing bowel.',
  difficulty: 'easy'
},
{
  id: 'd-new-5',
  section: 'D',
  subsection: 'Renal',
  question: 'Antegrade ureteric stenting is indicated when:',
  options: [
    'All cases of ureteric obstruction',
    'Retrograde stenting has failed or is not possible',
    'Simple renal calculi',
    'Benign prostatic hyperplasia',
    'Ureteropelvic junction obstruction in children'
  ],
  correctAnswers: [1],
  explanation: 'Antegrade (percutaneous) ureteric stenting is performed when retrograde (cystoscopic) stenting fails or is not possible (e.g., ureteric obstruction from malignancy, bladder tumor obscuring orifice, urinary diversion). It requires nephrostomy access and can cross obstruction from above.',
  difficulty: 'easy'
},
{
  id: 'd-new-6',
  section: 'D',
  subsection: 'Abscess Drainage',
  question: 'Which abscess location is most appropriate for percutaneous drainage?',
  options: [
    'Interloop abscess <2cm',
    'Hepatic abscess 6cm with safe window',
    'Appendiceal abscess with enteric fistula',
    'Peripancreatic phlegmon without drainable collection',
    'Multiple small (<1cm) splenic microabscesses'
  ],
  correctAnswers: [1],
  explanation: 'A 6cm hepatic abscess with safe access window is ideal for percutaneous drainage. Collections should be >3cm with drainable content. Interloop abscesses without safe access, phlegmons, and multiple small abscesses are better managed medically or surgically.',
  difficulty: 'medium'
},
{
  id: 'd-new-7',
  section: 'D',
  subsection: 'Abscess Drainage',
  question: 'The catheter size for percutaneous abscess drainage is primarily determined by:',
  options: [
    'Patient body habitus',
    'Abscess location',
    'Viscosity of the abscess contents',
    'Operator preference only',
    'Duration of symptoms'
  ],
  correctAnswers: [2],
  explanation: 'Catheter size is chosen based on fluid viscosity: simple fluid needs 8-10Fr, thick pus needs 12-14Fr, and necrotic debris/fungal abscesses may need 14-16Fr or larger. Inadequate drainage due to small catheter size is a common cause of drainage failure.',
  difficulty: 'medium'
},
{
  id: 'd-new-8',
  section: 'D',
  subsection: 'Biopsy',
  question: 'For a suspected hepatocellular carcinoma amenable to transplant, which biopsy approach is most appropriate?',
  options: [
    'Percutaneous core biopsy',
    'EUS-guided FNA',
    'Avoid biopsy; diagnose with imaging criteria',
    'Surgical wedge biopsy',
    'Transjugular liver biopsy'
  ],
  correctAnswers: [2],
  explanation: 'HCC in transplant candidates should be diagnosed with imaging (LI-RADS criteria) rather than biopsy to avoid tumor seeding along the needle tract (up to 2.7% risk). Biopsy is reserved for atypical lesions where diagnosis would change management.',
  difficulty: 'medium'
},
{
  id: 'd-new-9',
  section: 'D',
  subsection: 'Biopsy',
  question: 'When performing CT-guided lung biopsy, the most common complication is:',
  options: [
    'Hemoptysis',
    'Pneumothorax',
    'Air embolism',
    'Tumor seeding',
    'Infection'
  ],
  correctAnswers: [1],
  explanation: 'Pneumothorax occurs in 15-40% of CT-guided lung biopsies, though only 5-15% require chest tube. Risk factors include COPD, small lesion, longer path through aerated lung, and multiple needle passes. Blood-patching and positioning can reduce risk.',
  difficulty: 'easy'
},
{
  id: 'd-new-10',
  section: 'D',
  subsection: 'Biopsy',
  question: 'What is the minimum number of core samples typically needed for adequate histopathological diagnosis?',
  options: [
    '1 core',
    '2-3 cores',
    '5-6 cores',
    '10 cores',
    'As many as possible'
  ],
  correctAnswers: [1],
  explanation: '2-3 adequate core samples typically provide sufficient tissue for histopathology and immunohistochemistry. Quality matters more than quantity. Additional passes increase complication risk. FNA alone may be insufficient for lymphoma and stromal tumors requiring architecture.',
  difficulty: 'easy'
},
{
  id: 'd-new-11',
  section: 'D',
  subsection: 'Gastrostomy',
  question: 'The preferred method for percutaneous gastrostomy placement is:',
  options: [
    'Surgical gastrostomy always',
    'Fluoroscopic-guided percutaneous gastrostomy',
    'PEG (endoscopic) when possible',
    'CT-guided gastrostomy',
    'All methods have equal outcomes'
  ],
  correctAnswers: [2],
  explanation: 'PEG (percutaneous endoscopic gastrostomy) is preferred when feasible due to direct visualization, lower complication rates, and ability to assess for pathology. Radiologic fluoroscopic gastrostomy is used when PEG is not possible (head/neck tumors, esophageal obstruction).',
  difficulty: 'medium'
},
{
  id: 'd-new-12',
  section: 'D',
  subsection: 'Gastrostomy',
  question: 'A contraindication to percutaneous gastrostomy placement includes:',
  options: [
    'Prior abdominal surgery',
    'Ascites',
    'Obesity',
    'Diabetes',
    'Age over 80'
  ],
  correctAnswers: [1],
  explanation: 'Ascites is a relative contraindication as it increases infection risk and may prevent tract maturation. Other contraindications include coagulopathy, gastric varices, peritonitis, and inability to appose stomach to abdominal wall. Prior surgery is not a contraindication though anatomy may be altered.',
  difficulty: 'medium'
},
{
  id: 'd-new-13',
  section: 'D',
  subsection: 'Spine',
  question: 'The most common indication for vertebroplasty is:',
  options: [
    'Degenerative disc disease',
    'Painful osteoporotic vertebral compression fracture',
    'Spinal stenosis',
    'Scoliosis',
    'Vertebral body osteomyelitis'
  ],
  correctAnswers: [1],
  explanation: 'Painful osteoporotic vertebral compression fractures refractory to conservative management are the main indication for vertebroplasty. It provides immediate pain relief in 80-90% of patients. Contraindications include osteomyelitis, cord compression, and coagulopathy.',
  difficulty: 'easy'
},
{
  id: 'd-new-14',
  section: 'D',
  subsection: 'Spine',
  question: 'The most serious complication of vertebroplasty is:',
  options: [
    'Pain at puncture site',
    'Cement leakage into spinal canal causing cord compression',
    'Rib fracture',
    'Transient fever',
    'Cement extravasation into disc space'
  ],
  correctAnswers: [1],
  explanation: 'Cement leakage into the spinal canal or foramina causing cord/nerve compression is the most serious complication, potentially requiring emergent surgical decompression. Venous embolism is also serious. Cement leakage into disc space is usually asymptomatic. Risk is reduced with PMMA viscosity control.',
  difficulty: 'medium'
},
{
  id: 'd-new-15',
  section: 'D',
  subsection: 'MSK',
  question: 'For ultrasound-guided aspiration of a Baker\'s cyst, the optimal approach is:',
  options: [
    'Anterior approach through the knee',
    'Medial approach',
    'Lateral approach',
    'Direct posterior approach with patient prone',
    'Superior approach above the patella'
  ],
  correctAnswers: [3],
  explanation: 'Baker\'s cysts (popliteal cysts) are approached posteriorly with the patient prone, allowing direct needle access while avoiding neurovascular structures (which are medial and lateral). Ultrasound guidance visualizes the cyst and confirms needle position.',
  difficulty: 'medium'
},
{
  id: 'd-new-16',
  section: 'D',
  subsection: 'MSK',
  question: 'The preferred imaging guidance for sacroiliac joint injection is:',
  options: [
    'Ultrasound',
    'MRI',
    'Fluoroscopy or CT',
    'No imaging needed',
    'Plain radiography'
  ],
  correctAnswers: [2],
  explanation: 'SI joint injection requires fluoroscopy or CT guidance due to the complex joint anatomy and overlying bone. The inferior aspect of the joint is targeted. Ultrasound cannot visualize the joint adequately. Contrast injection confirms intra-articular position before steroid injection.',
  difficulty: 'medium'
},
{
  id: 'd-new-17',
  section: 'D',
  subsection: 'Pain Management',
  question: 'Celiac plexus neurolysis is indicated for pain management in:',
  options: [
    'Chronic low back pain',
    'Pancreatic cancer pain',
    'Appendicitis',
    'Gallbladder pain',
    'Renal colic'
  ],
  correctAnswers: [1],
  explanation: 'Celiac plexus neurolysis (with alcohol or phenol) provides effective palliation for intractable pain from pancreatic cancer and other upper abdominal malignancies. It targets visceral afferent pain fibers and is highly effective when performed before narcotic tolerance develops.',
  difficulty: 'easy'
},

// ============================================
// SECTION E: Oncologic Interventions (Questions 72-88)
// ============================================

{
  id: 'e-new-1',
  section: 'E',
  subsection: 'Ablation Principles',
  question: 'What is the target ablation margin for hepatic radiofrequency ablation of HCC?',
  options: [
    'Exact tumor size only',
    '5mm margin',
    '10mm (1cm) margin',
    '2cm margin',
    'No margin needed if complete tumor coverage achieved'
  ],
  correctAnswers: [2],
  explanation: 'A 10mm (1cm) ablation margin around the visible tumor is the target to ensure destruction of microscopic disease. Inadequate margins are the primary cause of local recurrence. This requires creating an ablation zone at least 2cm larger than the tumor.',
  difficulty: 'medium'
},
{
  id: 'e-new-2',
  section: 'E',
  subsection: 'Ablation Principles',
  question: 'The "heat sink" effect in thermal ablation refers to:',
  options: [
    'Excessive heating of the ablation zone',
    'Cooling of ablation zone by adjacent blood vessels',
    'Heat injury to skin',
    'Increased effectiveness near vessels',
    'Generator overheating'
  ],
  correctAnswers: [1],
  explanation: 'The heat sink effect occurs when nearby blood vessels (>3mm) conduct heat away from the ablation zone, causing incomplete ablation at the vessel margin. This is why tumors adjacent to major vessels have higher recurrence rates. Vascular occlusion techniques can mitigate this effect.',
  difficulty: 'medium'
},
{
  id: 'e-new-3',
  section: 'E',
  subsection: 'RFA',
  question: 'The maximum tumor size generally recommended for radiofrequency ablation as a standalone treatment is:',
  options: [
    '1 cm',
    '2 cm',
    '3 cm',
    '5 cm',
    '7 cm'
  ],
  correctAnswers: [2],
  explanation: 'RFA is most effective for tumors ≤3cm, with >90% complete ablation rates. Tumors 3-5cm have higher incomplete ablation and recurrence rates. Larger tumors may require combination therapy (TACE + ablation) or multiple overlapping ablations.',
  difficulty: 'easy'
},
{
  id: 'e-new-4',
  section: 'E',
  subsection: 'Microwave Ablation',
  question: 'What is the main advantage of microwave ablation over radiofrequency ablation?',
  options: [
    'Lower cost',
    'Smaller ablation zones',
    'Less heat sink effect and faster ablation times',
    'No grounding pads needed is the only difference',
    'Less operator skill required'
  ],
  correctAnswers: [2],
  explanation: 'Microwave ablation provides faster heating, larger ablation zones, and is less affected by heat sink effect because it does not rely on electrical conductivity (which decreases with tissue desiccation). It also allows multiple simultaneous probes. No grounding pads are needed.',
  difficulty: 'medium'
},
{
  id: 'e-new-5',
  section: 'E',
  subsection: 'Cryoablation',
  question: 'Cryoablation is particularly advantageous for tumors near:',
  options: [
    'Major blood vessels',
    'Bowel',
    'The hilum',
    'Nerves (renal tumors near ureter)',
    'Diaphragm'
  ],
  correctAnswers: [3],
  explanation: 'Cryoablation better preserves collagenous structures including the collecting system, making it advantageous for central renal tumors near the ureter/collecting system. The ice ball is also visible on CT/MRI/US, allowing real-time monitoring of ablation margin.',
  difficulty: 'hard'
},
{
  id: 'e-new-6',
  section: 'E',
  subsection: 'TACE',
  question: 'Conventional TACE (cTACE) involves:',
  options: [
    'Chemotherapy injection followed by embolization with bland particles',
    'Chemotherapy mixed with Lipiodol followed by particle embolization',
    'Drug-eluting beads only',
    'Radioembolization',
    'Portal vein embolization'
  ],
  correctAnswers: [1],
  explanation: 'cTACE involves injecting chemotherapy (typically doxorubicin or cisplatin) mixed with Lipiodol, followed by embolic particles (Gelfoam, PVA). Lipiodol acts as a carrier for chemotherapy and provides tumor targeting. DEB-TACE uses drug-eluting beads that slowly release chemotherapy.',
  difficulty: 'easy'
},
{
  id: 'e-new-7',
  section: 'E',
  subsection: 'TACE',
  question: 'An absolute contraindication to TACE for HCC includes:',
  options: [
    'Multifocal HCC',
    'Main portal vein thrombosis (tumor or bland)',
    'Child-Pugh A cirrhosis',
    'Tumor size >5cm',
    'AFP >1000'
  ],
  correctAnswers: [1],
  explanation: 'Main portal vein thrombosis is an absolute contraindication because TACE eliminates hepatic arterial flow, and without portal flow, hepatic failure will result. Branch portal vein thrombosis may be acceptable with careful patient selection. Radioembolization may be safer in these patients.',
  difficulty: 'medium'
},
{
  id: 'e-new-8',
  section: 'E',
  subsection: 'TACE',
  question: 'Post-embolization syndrome after TACE typically includes all of the following EXCEPT:',
  options: [
    'Fever',
    'Abdominal pain',
    'Nausea',
    'Jaundice requiring intervention',
    'Elevated LFTs'
  ],
  correctAnswers: [3],
  explanation: 'Post-embolization syndrome (fever, pain, nausea, elevated LFTs) is expected and self-limited, occurring in up to 90% of patients. Jaundice requiring intervention suggests liver failure or biliary injury, which is a complication rather than part of the syndrome.',
  difficulty: 'easy'
},
{
  id: 'e-new-9',
  section: 'E',
  subsection: 'Radioembolization',
  question: 'Before Y-90 radioembolization, a planning angiogram with Tc-99m MAA is performed to:',
  options: [
    'Determine tumor size',
    'Assess hepatic artery anatomy and lung shunt fraction',
    'Treat the tumor',
    'Measure portal pressure',
    'Evaluate renal function'
  ],
  correctAnswers: [1],
  explanation: 'The mapping angiogram identifies hepatic artery anatomy, variant vessels requiring coil embolization, and extrahepatic supply at risk. MAA (technetium-labeled macroaggregated albumin) simulation assesses lung shunt fraction; >20% is a contraindication due to radiation pneumonitis risk.',
  difficulty: 'medium'
},
{
  id: 'e-new-10',
  section: 'E',
  subsection: 'Radioembolization',
  question: 'The maximum lung shunt fraction acceptable for Y-90 radioembolization is generally:',
  options: [
    '>50%',
    '30-40%',
    '<20%',
    '<5%',
    'Any shunt is acceptable'
  ],
  correctAnswers: [2],
  explanation: 'Lung shunt fraction should be <20% (some centers use <15% as cutoff) to prevent radiation pneumonitis. Higher shunt fractions require dose reduction or treatment is contraindicated. Shunting occurs through microscopic tumor arteriovenous communications.',
  difficulty: 'medium'
},
{
  id: 'e-new-11',
  section: 'E',
  subsection: 'Portal Vein Embolization',
  question: 'The primary goal of portal vein embolization before major hepatectomy is:',
  options: [
    'Tumor destruction',
    'Reducing blood loss during surgery',
    'Hypertrophy of the future liver remnant',
    'Portal pressure reduction',
    'Assessment of liver function'
  ],
  correctAnswers: [2],
  explanation: 'PVE induces hypertrophy of the non-embolized future liver remnant (FLR) by redirecting portal flow. This allows patients with initially insufficient FLR (<20-30%) to undergo safe major hepatectomy. Typical hypertrophy is 10-15% increase in FLR volume over 3-4 weeks.',
  difficulty: 'easy'
},
{
  id: 'e-new-12',
  section: 'E',
  subsection: 'Portal Vein Embolization',
  question: 'The minimum future liver remnant (FLR) generally required for safe hepatectomy in a patient with normal liver is:',
  options: [
    '10%',
    '20-25%',
    '40%',
    '50%',
    '60%'
  ],
  correctAnswers: [1],
  explanation: 'FLR >20-25% is generally safe in normal liver. In cirrhosis or after chemotherapy, FLR >30-40% is needed due to impaired regenerative capacity. PVE allows patients with marginal FLR to undergo surgery by inducing compensatory hypertrophy.',
  difficulty: 'medium'
},
{
  id: 'e-new-13',
  section: 'E',
  subsection: 'Bone Metastases',
  question: 'Palliative embolization for bone metastases is most commonly indicated for:',
  options: [
    'Osteoblastic metastases from prostate cancer',
    'Hypervascular metastases (renal, thyroid) causing pain or before surgery',
    'All bone metastases',
    'Solitary metastasis for cure',
    'Metastases responding well to chemotherapy'
  ],
  correctAnswers: [1],
  explanation: 'Embolization is most effective for hypervascular bone metastases (renal cell carcinoma, thyroid, hepatoma) for pain palliation or preoperative devascularization to reduce surgical bleeding. Hypovascular metastases (breast, prostate, lung) respond less well.',
  difficulty: 'medium'
},
{
  id: 'e-new-14',
  section: 'E',
  subsection: 'Colorectal Liver Metastases',
  question: 'For colorectal liver metastases, the role of ablation includes:',
  options: [
    'First-line treatment for all metastases',
    'Treatment of unresectable disease or combined with resection',
    'Replacement for chemotherapy',
    'Only for metastases >5cm',
    'Contraindicated in colorectal metastases'
  ],
  correctAnswers: [1],
  explanation: 'Ablation for colorectal liver metastases is used for unresectable disease (location, number, insufficient FLR), combined with resection (resection + ablation for multiple tumors), or for recurrence. Surgery remains the gold standard when feasible.',
  difficulty: 'medium'
},
{
  id: 'e-new-15',
  section: 'E',
  subsection: 'Renal Cell Carcinoma',
  question: 'The ideal candidate for percutaneous ablation of renal cell carcinoma is:',
  options: [
    'Any patient with RCC',
    'T1a tumor (<4cm) in patient unfit for surgery or with solitary kidney',
    'Large central tumor',
    'Tumor invading renal vein',
    'Tumor with extensive lymphadenopathy'
  ],
  correctAnswers: [1],
  explanation: 'T1a RCC (<4cm) in surgical candidates or patients with comorbidities, solitary kidney, or hereditary RCC syndromes (VHL) are ideal for ablation. Outcomes are comparable to partial nephrectomy. Larger, central, or locally invasive tumors are better treated surgically.',
  difficulty: 'medium'
},
{
  id: 'e-new-16',
  section: 'E',
  subsection: 'Lung Ablation',
  question: 'Which of the following is NOT a good indication for lung tumor ablation?',
  options: [
    'Primary NSCLC <3cm in a non-surgical candidate',
    'Limited pulmonary metastases from colorectal cancer',
    'Tumor adjacent to main pulmonary artery',
    'Metastatic tumor <2cm with stable systemic disease',
    'Local recurrence after radiation'
  ],
  correctAnswers: [2],
  explanation: 'Tumors adjacent to major vessels (main pulmonary artery, aorta) pose high bleeding risk and heat sink effect causing incomplete ablation. Central tumors near major airways also risk bronchial injury. Peripheral tumors <3cm have the best outcomes.',
  difficulty: 'medium'
},
{
  id: 'e-new-17',
  section: 'E',
  subsection: 'Thyroid',
  question: 'Radiofrequency ablation of benign thyroid nodules is most appropriate for:',
  options: [
    'All thyroid nodules',
    'Symptomatic autonomously functioning nodule refusing surgery',
    'Suspected malignancy',
    'Nodules <1cm',
    'Diffuse multinodular goiter'
  ],
  correctAnswers: [1],
  explanation: 'RFA is effective for symptomatic benign thyroid nodules (compressive symptoms, cosmetic concerns) or autonomously functioning nodules in patients refusing or unfit for surgery. Malignancy must be excluded (FNA). Volume reduction of 50-80% is typical.',
  difficulty: 'medium'
},

// ============================================
// SECTION F: Miscellaneous/Special Topics (Questions 89-100)
// ============================================

{
  id: 'f-new-1',
  section: 'F',
  subsection: 'Pediatric IR',
  question: 'In pediatric interventional radiology, which statement is TRUE regarding radiation protection?',
  options: [
    'Children have similar radiation sensitivity to adults',
    'Pediatric protocols can use adult exposure parameters',
    'Children have higher radiation sensitivity and require dose reduction',
    'Lead shielding is unnecessary in children',
    'CT is preferred over fluoroscopy in all cases'
  ],
  correctAnswers: [2],
  explanation: 'Children have higher radiation sensitivity (longer life for cancer expression, rapidly dividing cells) requiring careful dose optimization. Pediatric protocols should minimize fluoroscopy time, use lower frame rates, tighter collimation, and appropriate pediatric exposure settings.',
  difficulty: 'easy'
},
{
  id: 'f-new-2',
  section: 'F',
  subsection: 'Pediatric IR',
  question: 'The most common indication for pediatric vascular intervention is:',
  options: [
    'Atherosclerotic disease',
    'Central venous access',
    'Aortic aneurysm repair',
    'Carotid stenting',
    'Peripheral arterial stenting'
  ],
  correctAnswers: [1],
  explanation: 'Central venous access (tunneled catheters, ports) for chemotherapy, nutrition, or chronic illness is the most common pediatric vascular procedure. Atherosclerotic disease is rare in children. Other common procedures include vascular malformation treatment, biopsy, and abscess drainage.',
  difficulty: 'easy'
},
{
  id: 'f-new-3',
  section: 'F',
  subsection: 'Women\'s Health',
  question: 'Uterine artery embolization (UAE) for fibroids achieves symptom improvement in what percentage of patients?',
  options: [
    '30-40%',
    '50-60%',
    '70-80%',
    '85-95%',
    '99-100%'
  ],
  correctAnswers: [3],
  explanation: 'UAE provides significant symptom improvement (menorrhagia, bulk symptoms) in 85-95% of patients, with patient satisfaction rates of 80-90%. It preserves the uterus and avoids surgery. Volume reduction of individual fibroids is typically 40-60%.',
  difficulty: 'easy'
},
{
  id: 'f-new-4',
  section: 'F',
  subsection: 'Women\'s Health',
  question: 'A potential complication specific to uterine artery embolization is:',
  options: [
    'Pneumothorax',
    'Premature menopause from ovarian artery embolization',
    'Spinal cord injury',
    'Pulmonary embolism',
    'Hepatic failure'
  ],
  correctAnswers: [1],
  explanation: 'Premature ovarian failure can occur if embolic particles reach ovarian arteries (via utero-ovarian anastomoses or non-target embolization). Risk is higher in women >45 years. Other specific complications include post-embolization syndrome, fibroid expulsion, and endometritis.',
  difficulty: 'medium'
},
{
  id: 'f-new-5',
  section: 'F',
  subsection: 'Women\'s Health',
  question: 'Postpartum hemorrhage embolization is most commonly performed for:',
  options: [
    'Placenta previa only',
    'Uterine atony refractory to medical management',
    'All vaginal deliveries',
    'Minor postpartum bleeding',
    'Prevention before delivery'
  ],
  correctAnswers: [1],
  explanation: 'Uterine artery embolization for PPH is indicated when medical management (uterotonics) fails and patient is hemodynamically stable enough for angiography. It avoids hysterectomy, preserves fertility, and has >90% success rate. Bilateral UAE is typically performed.',
  difficulty: 'medium'
},
{
  id: 'f-new-6',
  section: 'F',
  subsection: 'Vascular Malformations',
  question: 'According to the ISSVA classification, which is a high-flow vascular malformation?',
  options: [
    'Venous malformation',
    'Lymphatic malformation',
    'Infantile hemangioma',
    'Arteriovenous malformation',
    'Capillary malformation (port-wine stain)'
  ],
  correctAnswers: [3],
  explanation: 'AVMs are high-flow malformations with arterial feeders, nidus, and draining veins. Venous, lymphatic, and capillary malformations are low-flow. Infantile hemangioma is a vascular tumor, not a malformation. This classification guides treatment approach.',
  difficulty: 'easy'
},
{
  id: 'f-new-7',
  section: 'F',
  subsection: 'Vascular Malformations',
  question: 'The preferred embolic agent for treatment of arteriovenous malformations is:',
  options: [
    'Gelfoam',
    'Coils alone',
    'Liquid embolics (NBCA, Onyx)',
    'Bland particles',
    'Sclerosants'
  ],
  correctAnswers: [2],
  explanation: 'Liquid embolics (NBCA glue, Onyx/EVOH) penetrate the AVM nidus and provide permanent occlusion. Proximal coiling alone allows recurrence via collaterals. Particles risk non-target embolization through AV shunts. Complete nidus obliteration is the goal.',
  difficulty: 'medium'
},
{
  id: 'f-new-8',
  section: 'F',
  subsection: 'Vascular Malformations',
  question: 'Sclerotherapy for venous malformation most commonly uses:',
  options: [
    'Normal saline',
    'Absolute ethanol or sodium tetradecyl sulfate (STS)',
    'NBCA glue',
    'Coils',
    'Gelfoam'
  ],
  correctAnswers: [1],
  explanation: 'Sclerotherapy with absolute ethanol or STS (Sotradecol) is first-line for venous malformations. These agents cause endothelial damage and thrombosis. Ethanol is more powerful but has more systemic side effects. Multiple sessions are typically needed.',
  difficulty: 'medium'
},
{
  id: 'f-new-9',
  section: 'F',
  subsection: 'Transplant',
  question: 'The most common vascular complication after liver transplantation is:',
  options: [
    'Portal vein thrombosis',
    'Hepatic vein stenosis',
    'Hepatic artery stenosis or thrombosis',
    'IVC stenosis',
    'Aortic dissection'
  ],
  correctAnswers: [2],
  explanation: 'Hepatic artery complications (stenosis, thrombosis) are most common (2-12%), causing biliary ischemia and graft loss if untreated. Early thrombosis requires re-transplant; stenosis can be treated with angioplasty/stenting. Portal and hepatic vein complications also occur but less frequently.',
  difficulty: 'medium'
},
{
  id: 'f-new-10',
  section: 'F',
  subsection: 'Transplant',
  question: 'Biliary strictures after liver transplant are typically treated first with:',
  options: [
    'Surgical revision',
    'Percutaneous balloon dilation and temporary stenting',
    'Retransplantation',
    'Conservative management only',
    'Permanent metallic stenting'
  ],
  correctAnswers: [1],
  explanation: 'Anastomotic biliary strictures are treated with serial balloon dilation ± temporary internal/external drainage. Most respond to endoscopic or percutaneous treatment. Surgery is reserved for refractory cases. Permanent metallic stents are avoided in benign disease.',
  difficulty: 'medium'
},
{
  id: 'f-new-11',
  section: 'F',
  subsection: 'Quality & Safety',
  question: 'According to SIR guidelines, the threshold complication rate for diagnostic angiography should be:',
  options: [
    '<0.1%',
    '<0.5%',
    '<2%',
    '<5%',
    '<10%'
  ],
  correctAnswers: [2],
  explanation: 'SIR quality improvement guidelines set threshold complication rates for procedures. Diagnostic angiography should have <2% major complications. Individual practitioners and departments should track outcomes against these benchmarks for quality assurance.',
  difficulty: 'medium'
},
{
  id: 'f-new-12',
  section: 'F',
  subsection: 'Quality & Safety',
  question: 'A "near miss" in interventional radiology should be:',
  options: [
    'Ignored as no harm occurred',
    'Reported and analyzed to prevent future events',
    'Only reported if patient requests',
    'Discussed informally only',
    'Documented only if witnessed'
  ],
  correctAnswers: [1],
  explanation: 'Near misses should be reported and analyzed through quality improvement systems as they represent opportunities to identify system failures before patient harm occurs. A culture of safety encourages reporting without blame to improve processes and prevent future events.',
  difficulty: 'easy'
}
]

// Helper functions
export function getQuestionsBySection(section: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'): MCQQuestion[] {
  return mcqQuestions.filter(q => q.section === section)
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
  const stats: Record<string, number> = {}
  for (const section of ['A', 'B', 'C', 'D', 'E', 'F'] as const) {
    stats[section] = getQuestionsBySection(section).length
  }
  return stats
}
