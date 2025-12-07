// EBIR MCQ Question Bank
// Questions organized by EBIR Syllabus Sections A-F

export interface MCQQuestion {
  id: string
  section: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
  sectionTitle: string
  subsection: string
  question: string
  options: string[]
  correctAnswers: number[] // indices of correct answers (0-based)
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
  // ============================================
  // SECTION A: Fundamental Topics in IR
  // ============================================
  {
    id: 'A001',
    section: 'A',
    sectionTitle: 'Fundamental Topics in IR',
    subsection: 'Patient Safety',
    question: 'A 65-year-old man is undergoing placement of a percutaneous radiologically inserted gastrostomy tube. During the procedure, he develops nausea, and it is decided to administer intravenous (IV) metoclopramide. He has no renal or liver impairment and weighs 75 kg. What is the most appropriate dose?',
    options: [
      '1 milligram',
      '10 milligrams',
      '20 milligrams',
      '4 milligrams'
    ],
    correctAnswers: [1],
    explanation: 'The standard IV dose of metoclopramide for adults is 10mg. The EMA has restricted metoclopramide use due to neurological side effects, recommending maximum 30mg/day for up to 5 days. Single doses of 10mg are appropriate for procedural nausea.',
    difficulty: 'easy',
    examFrequency: 'medium'
  },
  {
    id: 'A002',
    section: 'A',
    sectionTitle: 'Fundamental Topics in IR',
    subsection: 'Radiation Safety',
    question: 'What is the attenuation of a 0.5 mm lead equivalent apron?',
    options: [
      '50-70% of the incident radiation',
      '70-90% of the incident radiation',
      '90-95% of the incident radiation',
      '95-99% of the incident radiation'
    ],
    correctAnswers: [3],
    explanation: 'A 0.5 mm lead equivalent apron attenuates approximately 95-99% of scattered radiation at typical fluoroscopy energies. This is why protective aprons are essential for staff protection during procedures.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'A003',
    section: 'A',
    sectionTitle: 'Fundamental Topics in IR',
    subsection: 'Radiation Safety',
    question: 'According to the ALARA principle, which of the following is the most effective method to reduce operator radiation dose during fluoroscopy?',
    options: [
      'Using last image hold',
      'Increasing the distance from the X-ray source',
      'Wearing a thyroid shield',
      'Using pulsed fluoroscopy at 15 frames/second'
    ],
    correctAnswers: [1],
    explanation: 'According to the inverse square law, doubling the distance from the radiation source reduces exposure by a factor of 4. Distance is the most effective means of dose reduction. Other measures are important but less effective than maximizing distance.',
    difficulty: 'easy',
    examFrequency: 'high'
  },
  {
    id: 'A004',
    section: 'A',
    sectionTitle: 'Fundamental Topics in IR',
    subsection: 'Contrast Media',
    question: 'A patient with an eGFR of 28 mL/min/1.73m² requires a CT-guided procedure with iodinated contrast. According to current guidelines, which prophylactic measure has the strongest evidence for preventing contrast-induced nephropathy?',
    options: [
      'N-acetylcysteine administration',
      'Intravenous sodium bicarbonate',
      'Intravenous isotonic saline hydration',
      'Prophylactic hemodialysis post-procedure'
    ],
    correctAnswers: [2],
    explanation: 'IV hydration with isotonic saline (0.9% NaCl or Ringer\'s lactate) before and after contrast administration has the strongest evidence for preventing contrast-induced nephropathy. N-acetylcysteine and bicarbonate have not shown consistent benefit in large trials. Prophylactic dialysis is not recommended.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'A005',
    section: 'A',
    sectionTitle: 'Fundamental Topics in IR',
    subsection: 'Sedation',
    question: 'During moderate sedation with midazolam and fentanyl, a patient becomes unresponsive and develops oxygen saturation of 82%. What is the most appropriate first action?',
    options: [
      'Administer flumazenil IV',
      'Administer naloxone IV',
      'Open airway with jaw thrust and deliver supplemental oxygen',
      'Intubate the patient immediately'
    ],
    correctAnswers: [2],
    explanation: 'The first priority in managing respiratory depression is basic airway management: open the airway, provide supplemental oxygen, and support ventilation if needed. Reversal agents (flumazenil, naloxone) can be given subsequently if basic measures are insufficient. Intubation is reserved for cases unresponsive to initial measures.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'A006',
    section: 'A',
    sectionTitle: 'Fundamental Topics in IR',
    subsection: 'Anticoagulation',
    question: 'A patient on rivaroxaban requires an urgent high-bleeding-risk procedure. The last dose was taken 14 hours ago. What is the most appropriate management?',
    options: [
      'Proceed immediately - the drug has a short half-life',
      'Delay procedure for at least 24 hours if clinically possible',
      'Administer prothrombin complex concentrate before proceeding',
      'Check anti-Xa levels and proceed if below therapeutic range'
    ],
    correctAnswers: [1],
    explanation: 'For high-bleeding-risk procedures, rivaroxaban should be held for at least 24-48 hours (depending on renal function). With normal renal function, holding for 24 hours allows adequate clearance. PCC is reserved for life-threatening bleeding. Anti-Xa levels can guide management but waiting is preferred if possible.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'A007',
    section: 'A',
    sectionTitle: 'Fundamental Topics in IR',
    subsection: 'Vascular Access',
    question: 'When performing ultrasound-guided common femoral artery puncture, what is the ideal anatomical landmark for arterial access?',
    options: [
      'At the level of the inguinal ligament',
      'Over the femoral head on fluoroscopy',
      'At the bifurcation of the superficial and deep femoral arteries',
      'At the level of the lesser trochanter'
    ],
    correctAnswers: [1],
    explanation: 'The common femoral artery should be punctured over the femoral head on fluoroscopy. This landmark ensures the puncture is in the CFA (not SFA/profunda) and allows for effective manual compression against bone. Puncture at the inguinal ligament may be too high, risking retroperitoneal hemorrhage.',
    difficulty: 'easy',
    examFrequency: 'high'
  },
  {
    id: 'A008',
    section: 'A',
    sectionTitle: 'Fundamental Topics in IR',
    subsection: 'Wires and Catheters',
    question: 'Which guidewire characteristic is most important for navigating through a chronic total occlusion (CTO)?',
    options: [
      'Hydrophilic coating',
      'High tip stiffness',
      'Large diameter (0.038")',
      'Floppy tip design'
    ],
    correctAnswers: [1],
    explanation: 'CTO crossing typically requires guidewires with high tip stiffness/load to penetrate through the fibrous cap of the occlusion. Hydrophilic wires help with trackability but alone are insufficient. Floppy tips are used for atraumatic vessel navigation, not CTO crossing.',
    difficulty: 'medium',
    examFrequency: 'medium'
  },
  {
    id: 'A009',
    section: 'A',
    sectionTitle: 'Fundamental Topics in IR',
    subsection: 'Embolization',
    question: 'Which embolic agent would be most appropriate for bronchial artery embolization in a patient with hemoptysis?',
    options: [
      'Polyvinyl alcohol particles 150-250 micrometers',
      'Polyvinyl alcohol particles 350-500 micrometers',
      'N-butyl cyanoacrylate glue',
      'Gelfoam pledgets'
    ],
    correctAnswers: [1],
    explanation: 'PVA particles 350-500 micrometers are the standard embolic agent for bronchial artery embolization. Smaller particles (<300 micrometers) risk non-target embolization to the spinal artery of Adamkiewicz, causing paralysis. Larger particles may not achieve distal occlusion. Glue is reserved for specific situations.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'A010',
    section: 'A',
    sectionTitle: 'Fundamental Topics in IR',
    subsection: 'Complications',
    question: 'A patient develops severe lower back pain and leg weakness immediately following bronchial artery embolization. What is the most likely diagnosis?',
    options: [
      'Retroperitoneal hemorrhage',
      'Spinal cord ischemia',
      'Aortic dissection',
      'Femoral nerve injury'
    ],
    correctAnswers: [1],
    explanation: 'This presentation is classic for spinal cord ischemia due to non-target embolization of the anterior spinal artery (artery of Adamkiewicz), which can arise from bronchial or intercostal arteries. This is the most devastating complication of bronchial artery embolization, occurring in <1% of cases.',
    difficulty: 'medium',
    examFrequency: 'high'
  },

  // ============================================
  // SECTION B: Vascular Diagnosis and Intervention
  // ============================================
  {
    id: 'B001',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Peripheral Arterial Disease',
    question: 'A 45-year-old man presents to the emergency department with acute onset pain, pallor, pulselessness, paraesthesia, and paralysis at his left leg. Which of the following is the most likely diagnosis?',
    options: [
      'Arterial embolism',
      'Cystic adventitial disease',
      'Popliteal artery aneurysm',
      'Popliteal artery entrapment syndrome'
    ],
    correctAnswers: [0],
    explanation: 'The acute onset of the "6 Ps" (Pain, Pallor, Pulselessness, Paresthesia, Paralysis, Poikilothermia) is classic for acute arterial occlusion, most commonly from arterial embolism. Cystic adventitial disease and entrapment syndrome typically present with claudication. Popliteal aneurysms may thrombose but usually have a different history.',
    difficulty: 'easy',
    examFrequency: 'high'
  },
  {
    id: 'B002',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Peripheral Arterial Disease',
    question: 'Regarding popliteal artery entrapment syndrome, if at angiography the initial images are normal, which manoeuvre should be performed to test for this condition?',
    options: [
      'Extreme inversion of the foot',
      'Plantar flexion of the foot',
      'Flex the knee',
      'Inflate a blood pressure cuff on the calf'
    ],
    correctAnswers: [1],
    explanation: 'Plantar flexion (and dorsiflexion) of the foot is used to provoke popliteal artery compression in entrapment syndrome. The gastrocnemius muscle compresses the artery during these maneuvers. This is typically performed during angiography or duplex ultrasound.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'B003',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Peripheral Arterial Disease',
    question: 'After percutaneous balloon angioplasty (PTA) of the superficial femoral artery (SFA), you diagnose a flow-limiting dissection. What is the most appropriate next step?',
    options: [
      'Stent the dissection',
      'Atherectomy of the dissection membrane',
      'Prolonged balloon dilation',
      'Repeat imaging after one week'
    ],
    correctAnswers: [2],
    explanation: 'The first-line treatment for a flow-limiting dissection after PTA is prolonged balloon dilation (typically 2-3 minutes). This often "tacks" the dissection flap and restores flow. Stenting should be reserved as a bailout if prolonged dilation fails. Atherectomy is not appropriate for dissections.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'B004',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Aortic Intervention',
    question: 'On completion angiography following EVAR, contrast is seen filling the aneurysm sac from a patent lumbar artery. What type of endoleak is this?',
    options: [
      'Type I endoleak',
      'Type II endoleak',
      'Type III endoleak',
      'Type IV endoleak'
    ],
    correctAnswers: [1],
    explanation: 'Type II endoleaks result from retrograde flow through branch vessels (lumbar arteries, IMA, accessory renal arteries). Type I involves attachment site leaks, Type III involves fabric tears or component disconnection, Type IV involves graft porosity (rare with modern grafts).',
    difficulty: 'easy',
    examFrequency: 'high'
  },
  {
    id: 'B005',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Venous Disease',
    question: 'A 35-year-old woman presents with acute iliofemoral DVT with symptom onset 5 days ago. She has no contraindications to thrombolysis. What is the most appropriate treatment?',
    options: [
      'Anticoagulation alone',
      'Catheter-directed thrombolysis',
      'Surgical thrombectomy',
      'IVC filter placement followed by anticoagulation'
    ],
    correctAnswers: [1],
    explanation: 'For acute iliofemoral DVT (symptoms <14 days) in patients with low bleeding risk, catheter-directed thrombolysis (CDT) reduces post-thrombotic syndrome compared to anticoagulation alone. CDT is particularly beneficial in young, active patients with iliofemoral involvement.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'B006',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Dialysis Access',
    question: 'A patient with a brachiocephalic AV fistula develops hand coldness and weakness during dialysis. Symptoms resolve when the fistula is manually compressed. What is the diagnosis?',
    options: [
      'Central venous stenosis',
      'Arterial steal syndrome',
      'Venous hypertension',
      'Fistula thrombosis'
    ],
    correctAnswers: [1],
    explanation: 'Steal syndrome occurs when the fistula "steals" blood from the distal extremity, causing ischemic symptoms. The classic test is resolution of symptoms with fistula compression. Treatment options include banding, DRIL procedure, or fistula ligation in severe cases.',
    difficulty: 'easy',
    examFrequency: 'high'
  },
  {
    id: 'B007',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'TIPS',
    question: 'Which scoring systems are typically used to predict survival following TIPS? Select the two best options.',
    options: [
      'Child-Pugh score',
      'EASL guidelines',
      'Model for End-Stage Liver Disease (MELD)',
      'Shock index'
    ],
    correctAnswers: [0, 2],
    explanation: 'Child-Pugh and MELD scores are the standard scoring systems for predicting survival in patients with liver disease and are used to assess TIPS candidacy. MELD has largely replaced Child-Pugh for transplant listing. Both help predict post-TIPS mortality.',
    difficulty: 'easy',
    examFrequency: 'high'
  },
  {
    id: 'B008',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'TIPS',
    question: 'During TIPS creation, after portal vein puncture, what is the correct order of procedural steps?',
    options: [
      'Track dilatation → Portal pressure measurement → Stent placement → Variceal embolization',
      'Portal pressure measurement → Track dilatation → Stent placement → Variceal embolization',
      'Stent placement → Track dilatation → Portal pressure measurement → Variceal embolization',
      'Variceal embolization → Portal pressure measurement → Track dilatation → Stent placement'
    ],
    correctAnswers: [1],
    explanation: 'The correct sequence is: (1) Portal pressure measurement to confirm portal hypertension and establish baseline, (2) Track dilatation, (3) Stent placement, (4) Variceal embolization if present. Post-stent pressure gradient should be reduced to <12 mmHg.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'B009',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Bronchial Arteries',
    question: 'A 15-year-old with cystic fibrosis presents for bronchial artery embolization following hemoptysis. Which would be the most common bronchial arterial anatomical pattern?',
    options: [
      'One left bronchial artery and two right bronchial arteries',
      'Shared origin of right and left bronchial arteries',
      'The bronchial arteries arising above the usual level of the artery of Adamkiewicz',
      'Two left bronchial arteries and one right bronchial artery'
    ],
    correctAnswers: [3],
    explanation: 'The most common pattern is two left bronchial arteries and one right bronchial artery (40% of cases). The right bronchial often shares a common trunk with an intercostal artery (intercostobronchial trunk). Understanding variants is crucial to identify all bleeding sources.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'B010',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'GI Bleeding',
    question: 'A patient with a bleeding duodenal ulcer has an occluded celiac trunk at the origin. Via which artery can the gastroduodenal artery be accessed for embolization?',
    options: [
      'Inferior mesenteric artery',
      'Left gastric artery',
      'Right gastroepiploic artery',
      'Superior mesenteric artery'
    ],
    correctAnswers: [3],
    explanation: 'When the celiac trunk is occluded, the GDA can be accessed via the SMA through the pancreaticoduodenal arcade (inferior → superior PDA). This collateral pathway is the key alternative route for hepatic and GDA access in celiac occlusion.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'B011',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Visceral Aneurysms',
    question: 'A 45-year-old man with recurrent pancreatitis has a 4 cm splenic artery pseudoaneurysm. What is the most likely cause?',
    options: [
      'Auto-immune response with elevated immunoglobulin levels',
      'Infective complication of pancreatitis',
      'Portal hypertension',
      'Vessel wall erosion by pancreatic enzymes'
    ],
    correctAnswers: [3],
    explanation: 'Splenic artery pseudoaneurysms in pancreatitis result from enzymatic erosion of the arterial wall by pancreatic enzymes. These are true emergencies with high rupture risk. Treatment is typically endovascular embolization.',
    difficulty: 'easy',
    examFrequency: 'high'
  },
  {
    id: 'B012',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Renal Artery',
    question: 'During a renal angioplasty, early branching of the renal artery is observed. By definition, this means the branches are located:',
    options: [
      'After the division into dorsal and ventral branches',
      'At the origin from the aorta',
      'Within 1.5-2 cm of origin in the left renal artery or in the retrocaval segment of the right renal artery',
      'Within 4 cm of origin in the right or left renal artery'
    ],
    correctAnswers: [2],
    explanation: 'Early branching is defined as division within 1.5-2 cm of the origin for the left renal artery or within the retrocaval segment for the right renal artery. This anatomical variant affects stent selection and positioning strategy.',
    difficulty: 'hard',
    examFrequency: 'medium'
  },

  // ============================================
  // SECTION C: Non-vascular Interventions
  // ============================================
  {
    id: 'C001',
    section: 'C',
    sectionTitle: 'Non-vascular Interventions',
    subsection: 'Image-guided Biopsy',
    question: 'A 71-year-old man with extensive metastatic carcinoma requires tissue diagnosis. He has severe emphysema with minimal respiratory reserve and small, deep lung nodules. Which biopsy location would most safely avoid pneumothorax?',
    options: [
      'CT-guided biopsy of 1 cm mass in the anterior fourth rib',
      'CT-guided biopsy of 2 cm mass in the T9 vertebral body',
      'Ultrasound-guided biopsy of 1 cm left supraclavicular fossa mass',
      'Ultrasound-guided biopsy of 2 cm mass at the dome of the right lobe of the liver'
    ],
    correctAnswers: [1],
    explanation: 'Bone biopsy of the T9 vertebral body avoids crossing the pleura entirely, eliminating pneumothorax risk. Rib biopsy would still require traversing pleura. Supraclavicular and liver biopsies may be alternatives but vertebral body biopsy is safest for avoiding pneumothorax.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'C002',
    section: 'C',
    sectionTitle: 'Non-vascular Interventions',
    subsection: 'Drainage',
    question: 'A 70-year-old man presents with right upper quadrant pain, fever at 39.5°C, and tachycardia. CT shows a 6 cm rim-enhancing fluid collection in segment 3 of the liver. What is the most appropriate management?',
    options: [
      'Intravenous antibiotics alone',
      'Percutaneous drainage',
      'Percutaneous aspiration',
      'Open surgical drainage'
    ],
    correctAnswers: [1],
    explanation: 'A 6 cm liver abscess with systemic sepsis signs requires percutaneous drainage (not just aspiration). Drainage provides source control and allows ongoing evacuation of infected material. Antibiotics alone are insufficient for collections >5 cm. Surgery is reserved for failed percutaneous approaches.',
    difficulty: 'easy',
    examFrequency: 'high'
  },
  {
    id: 'C003',
    section: 'C',
    sectionTitle: 'Non-vascular Interventions',
    subsection: 'Colonic Stenting',
    question: 'Which imaging feature would be an absolute contraindication to placement of a colonic stent for malignant obstruction?',
    options: [
      'Oedema of the transverse colon',
      'Presence of perforation',
      'Obstruction at the splenic flexure',
      'Presence of a colo-vesical fistula'
    ],
    correctAnswers: [1],
    explanation: 'Perforation is an absolute contraindication to colonic stenting as it requires surgical intervention. Colonic oedema, splenic flexure location, and fistulas are relative contraindications or technical challenges but not absolute contraindications.',
    difficulty: 'easy',
    examFrequency: 'high'
  },
  {
    id: 'C004',
    section: 'C',
    sectionTitle: 'Non-vascular Interventions',
    subsection: 'Colonic Stenting',
    question: 'Which imaging strategy provides the highest technical success rate for colonic stent placement?',
    options: [
      'Fluoroscopic guidance alone',
      'Endoscopic guidance alone',
      'Combined fluoroscopic and endoscopic guidance',
      'Fluoroscopy with cone beam CT'
    ],
    correctAnswers: [2],
    explanation: 'Combined fluoroscopic and endoscopic guidance provides the highest technical success rate for colonic stenting. Fluoroscopy provides real-time visualization of wire and stent positioning, while endoscopy allows direct visualization of the stricture and ensures accurate placement.',
    difficulty: 'easy',
    examFrequency: 'medium'
  },
  {
    id: 'C005',
    section: 'C',
    sectionTitle: 'Non-vascular Interventions',
    subsection: 'Biliary Intervention',
    question: 'A patient with hilar cholangiocarcinoma (Bismuth type IIIa) requires biliary drainage. Which approach is most appropriate?',
    options: [
      'Left-sided percutaneous drainage only',
      'Right-sided percutaneous drainage only',
      'ERCP with bilateral plastic stents',
      'Right-sided percutaneous drainage, draining >50% of liver volume'
    ],
    correctAnswers: [3],
    explanation: 'In Bismuth IIIa (right hepatic duct involvement), right-sided drainage is required to access the affected segments. The goal is to drain >50% of functioning liver volume to effectively relieve jaundice and prevent cholangitis in undrained segments.',
    difficulty: 'hard',
    examFrequency: 'high'
  },
  {
    id: 'C006',
    section: 'C',
    sectionTitle: 'Non-vascular Interventions',
    subsection: 'Gastrostomy',
    question: 'During fluoroscopic gastrostomy tube placement, the safe window for gastric puncture is best identified by:',
    options: [
      'Anatomical landmarks only',
      'CT guidance',
      'Gastric insufflation and T-fastener placement',
      'Ultrasound guidance'
    ],
    correctAnswers: [2],
    explanation: 'Gastric insufflation displaces the transverse colon inferiorly and brings the anterior gastric wall against the abdominal wall. T-fasteners are then used to secure the stomach to the anterior abdominal wall, creating a safe tract before tube placement.',
    difficulty: 'medium',
    examFrequency: 'medium'
  },
  {
    id: 'C007',
    section: 'C',
    sectionTitle: 'Non-vascular Interventions',
    subsection: 'Lung Biopsy',
    question: 'Following CT-guided lung biopsy, a patient develops progressive dyspnea with SpO2 of 88%. Chest X-ray shows 40% pneumothorax. What is the most appropriate management?',
    options: [
      'Observation and supplemental oxygen',
      'Aspiration with small-bore needle',
      'Small-bore chest drain insertion',
      'Large-bore surgical chest drain'
    ],
    correctAnswers: [2],
    explanation: 'A symptomatic pneumothorax >30% with hypoxia requires drainage. Small-bore chest drains (8-14 Fr) are appropriate for iatrogenic pneumothorax and are as effective as large-bore drains with less patient discomfort.',
    difficulty: 'medium',
    examFrequency: 'high'
  },

  // ============================================
  // SECTION D: Genito-urinary Intervention
  // ============================================
  {
    id: 'D001',
    section: 'D',
    sectionTitle: 'Genito-urinary Intervention',
    subsection: 'Nephrostomy',
    question: 'What is the optimal site for percutaneous nephrostomy access?',
    options: [
      'Upper pole posterior calyx',
      'Lower pole posterior calyx',
      'Lower pole anterior calyx',
      'Direct renal pelvis puncture'
    ],
    correctAnswers: [1],
    explanation: 'The lower pole posterior calyx provides the safest access (Brödel\'s bloodless line), avoiding major vessels and allowing good drainage. Upper pole access risks pleural transgression. Anterior calyces require traversing more parenchyma. Direct pelvis puncture risks vascular injury.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'D002',
    section: 'D',
    sectionTitle: 'Genito-urinary Intervention',
    subsection: 'Transplant Renal Artery Stenosis',
    question: 'Which Doppler ultrasound findings suggest significant stenosis of a transplant renal artery? Select three options.',
    options: [
      'Peak systolic velocity >2 m/sec in the transplant renal artery',
      'Interlobar artery slow systolic rise (Tardus Parvus waveform)',
      'Interlobar artery systolic acceleration time >0.1 seconds',
      'Aliasing in the interlobar renal arteries'
    ],
    correctAnswers: [0, 1, 2],
    explanation: 'PSV >2 m/s at the anastomosis, tardus parvus waveforms (slow systolic acceleration), and prolonged acceleration time (>0.1 sec) in intrarenal arteries all suggest significant transplant renal artery stenosis. Aliasing in interlobar arteries is not a reliable sign of transplant RAS.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'D003',
    section: 'D',
    sectionTitle: 'Genito-urinary Intervention',
    subsection: 'Transplant Renal Artery Stenosis',
    question: 'A transplant renal artery stenosis is confirmed on angiography. What is the most appropriate initial therapeutic approach?',
    options: [
      'Covered stent placement',
      'Balloon angioplasty',
      'Primary bare stent placement',
      'Cutting balloon angioplasty'
    ],
    correctAnswers: [1],
    explanation: 'Balloon angioplasty alone is first-line treatment for transplant RAS, with high technical and clinical success rates. Stents are reserved for suboptimal angioplasty results, recurrent stenosis, or dissection. Cutting balloons are for resistant stenoses.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'D004',
    section: 'D',
    sectionTitle: 'Genito-urinary Intervention',
    subsection: 'Uterine Artery Embolization',
    question: 'A patient undergoing uterine artery embolization develops severe buttock pain post-procedure. What is the most likely cause?',
    options: [
      'Uterine necrosis',
      'Ovarian failure',
      'Non-target embolization of the superior gluteal artery',
      'Endometritis'
    ],
    correctAnswers: [2],
    explanation: 'Buttock pain following UAE suggests non-target embolization of the superior gluteal artery (via anastomoses with uterine/internal iliac branches). This causes gluteal claudication and can be avoided by careful catheter positioning and avoiding overly small particles.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'D005',
    section: 'D',
    sectionTitle: 'Genito-urinary Intervention',
    subsection: 'Fallopian Tube Recanalization',
    question: 'A 28-year-old woman with subfertility is referred for fallopian tube recanalization. What is the most common cause of occluded fallopian tubes?',
    options: [
      'Chlamydia infection',
      'Endometriosis',
      'Prior pelvic surgery',
      'Uterine fibroid'
    ],
    correctAnswers: [0],
    explanation: 'Chlamydia trachomatis infection is the most common cause of tubal occlusion worldwide. It causes salpingitis leading to scarring and obstruction. Many cases are subclinical. Endometriosis and surgery are less common causes.',
    difficulty: 'easy',
    examFrequency: 'medium'
  },
  {
    id: 'D006',
    section: 'D',
    sectionTitle: 'Genito-urinary Intervention',
    subsection: 'Varicocele',
    question: 'During varicocele embolization, which embolic agents are most commonly used? Select two options.',
    options: [
      'Coils',
      'Liquid sclerosant (sodium tetradecyl sulfate)',
      'Polyvinyl alcohol particles',
      'Gelfoam pledgets'
    ],
    correctAnswers: [0, 1],
    explanation: 'Varicocele embolization typically uses coils for mechanical occlusion and/or liquid sclerosants (like sodium tetradecyl sulfate or sotradecol) to cause endothelial damage and thrombosis. The combination is highly effective with low recurrence rates.',
    difficulty: 'easy',
    examFrequency: 'medium'
  },

  // ============================================
  // SECTION E: Musculoskeletal Intervention
  // ============================================
  {
    id: 'E001',
    section: 'E',
    sectionTitle: 'Musculoskeletal Intervention',
    subsection: 'MSK Biopsy',
    question: 'A 35-year-old man has a permeative bone lesion in the femur being treated with alcohol injection for a vascular malformation in the lower leg. A biopsy is requested. What is the correct approach?',
    options: [
      'Use a high-speed drill with coaxial needle for multiple core biopsies',
      'Further evaluation with MR imaging before biopsy',
      'Refuse the biopsy because of risk of tumor seeding along the track',
      'Perform aspiration biopsy to reduce fracture risk'
    ],
    correctAnswers: [1],
    explanation: 'A permeative bone lesion pattern is concerning for malignancy (primary bone tumor vs metastasis). MRI should be performed before biopsy to fully characterize the lesion, assess extent, and plan the biopsy tract. The biopsy track must be placed so it can be excised with definitive surgery.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'E002',
    section: 'E',
    sectionTitle: 'Musculoskeletal Intervention',
    subsection: 'Osteoid Osteoma',
    question: 'Which MRI findings are typical for osteoid osteoma? Select two options.',
    options: [
      'Bone marrow oedema',
      'Cortical thickening',
      'No contrast enhancement after gadolinium',
      'Marked periosteal reaction'
    ],
    correctAnswers: [0, 1],
    explanation: 'Osteoid osteomas typically show bone marrow edema (which can be extensive) and cortical thickening/reactive sclerosis on MRI. The nidus typically enhances with gadolinium. Periosteal reaction is minimal unless there is pathological fracture.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'E003',
    section: 'E',
    sectionTitle: 'Musculoskeletal Intervention',
    subsection: 'Osteoid Osteoma',
    question: 'A 16-year-old with spinal osteoid osteoma at L3 has pain refractory to NSAIDs. RFA is planned. Which of the following is the most likely major complication?',
    options: [
      'Motor nerve injury',
      'Synovitis',
      'Arachnoiditis',
      'Epidural haematoma'
    ],
    correctAnswers: [0],
    explanation: 'Motor nerve injury is the most significant potential complication of spinal osteoid osteoma RFA due to the proximity of nerve roots and spinal cord. Temperature monitoring and protective measures (thermocouples, hydrodissection) are essential.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'E004',
    section: 'E',
    sectionTitle: 'Musculoskeletal Intervention',
    subsection: 'Vertebroplasty/Kyphoplasty',
    question: 'During vertebroplasty for an osteoporotic compression fracture, what is the most common route of cement leakage?',
    options: [
      'Through the basivertebral vein into the epidural space',
      'Into the adjacent disc space',
      'Through the cortical fracture line',
      'Into the paravertebral soft tissues'
    ],
    correctAnswers: [0],
    explanation: 'The most common route of cement leakage is via the basivertebral venous plexus into the epidural space. This can cause spinal cord or nerve root compression. Careful cement injection under continuous fluoroscopic monitoring is essential to detect early leakage.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'E005',
    section: 'E',
    sectionTitle: 'Musculoskeletal Intervention',
    subsection: 'Osteoplasty',
    question: 'A 78-year-old with an osteolytic acetabular metastasis from colorectal cancer undergoes CT-guided osteoplasty. Which nerve is at risk during a posterior approach?',
    options: [
      'Obturator nerve',
      'Pudendal nerve',
      'Sacral plexus',
      'Sciatic nerve'
    ],
    correctAnswers: [3],
    explanation: 'The sciatic nerve runs posterior to the hip joint and acetabulum. A posterior approach for acetabular procedures places it at risk. Careful needle trajectory planning using CT guidance is essential to avoid nerve injury.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'E006',
    section: 'E',
    sectionTitle: 'Musculoskeletal Intervention',
    subsection: 'Spinal Intervention',
    question: 'What is the most appropriate protective measure during RFA of a spinal osteoid osteoma near the neural foramen?',
    options: [
      'Hydrodissection with 0.9% saline',
      'Hydrodissection with 5% dextrose',
      'Gas dissection with CO2',
      'Placement of thermocouples in the epidural and foraminal space'
    ],
    correctAnswers: [3],
    explanation: 'Thermocouple placement allows real-time temperature monitoring at critical structures. When temperature rises above 45°C, ablation is stopped to prevent nerve damage. D5W (not saline) is used for hydrodissection as it is non-conductive, but temperature monitoring is more reliable.',
    difficulty: 'hard',
    examFrequency: 'high'
  },

  // ============================================
  // SECTION F: Interventional Oncology
  // ============================================
  {
    id: 'F001',
    section: 'F',
    sectionTitle: 'Interventional Oncology',
    subsection: 'HCC Management',
    question: 'A 77-year-old woman with Hepatitis C cirrhosis has a 35mm lesion in segment 8 showing arterial enhancement and delayed washout on CT. AFP is 530 μmol/L. What is the most appropriate next step?',
    options: [
      'Microwave ablation',
      'Multidisciplinary tumor board discussion',
      'Percutaneous biopsy',
      'Transarterial chemoembolization'
    ],
    correctAnswers: [1],
    explanation: 'Despite classic imaging features of HCC (arterial enhancement + washout in a cirrhotic liver with elevated AFP), MDT discussion is essential before treatment to assess liver function, performance status, tumor staging (BCLC), and determine optimal treatment pathway.',
    difficulty: 'easy',
    examFrequency: 'high'
  },
  {
    id: 'F002',
    section: 'F',
    sectionTitle: 'Interventional Oncology',
    subsection: 'HCC Management',
    question: 'What are factors associated with failure of thermal ablation alone for HCC? Select three options.',
    options: [
      'Size of lesion >3 cm',
      'Perivascular location',
      'Likelihood of microsatellite lesions',
      'High chance of tumor seeding following ablation'
    ],
    correctAnswers: [0, 1, 2],
    explanation: 'Lesions >3 cm have higher local recurrence after ablation. Perivascular location causes "heat sink" effect reducing ablation efficacy. Larger tumors have higher rates of microsatellites. Tumor seeding is rare (<1%) and not a major factor in treatment failure.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'F003',
    section: 'F',
    sectionTitle: 'Interventional Oncology',
    subsection: 'TACE',
    question: 'During TACE for HCC, the right hepatic artery angiogram shows enhancement of the lesion. What is the appropriate next step before embolization?',
    options: [
      'Coil embolization of the gastroduodenal artery',
      'Selective catheterization of the left hepatic artery to check for supply to the nodule',
      'Superselective embolization with chemotherapy and lipiodol',
      'Superior mesenteric artery angiogram for aberrant supply'
    ],
    correctAnswers: [1],
    explanation: 'Before treating, all potential arterial supply to the tumor must be identified. The left hepatic artery should be catheterized to exclude dual supply. Missing a feeding vessel leads to incomplete treatment and early recurrence. SMA angiography is performed for replaced hepatic arteries.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'F004',
    section: 'F',
    sectionTitle: 'Interventional Oncology',
    subsection: 'TACE',
    question: 'Following superselective TACE with cisplatin, mitomycin C and lipiodol, the patient develops mild RUQ pain and fever of 38.0°C that afternoon. What is the most likely diagnosis?',
    options: [
      'Acute hepatitis',
      'Cholecystitis',
      'Liver infarction',
      'Post-embolization syndrome'
    ],
    correctAnswers: [3],
    explanation: 'Post-embolization syndrome (PES) is the most common "complication" after TACE, occurring in 60-80% of patients. It consists of fever, pain, nausea, and elevated liver enzymes, typically self-limiting within 72 hours. It should be distinguished from liver abscess or infarction.',
    difficulty: 'easy',
    examFrequency: 'high'
  },
  {
    id: 'F005',
    section: 'F',
    sectionTitle: 'Interventional Oncology',
    subsection: 'TACE',
    question: 'Which materials are appropriate for chemoembolization of HCC? Select two options.',
    options: [
      'Doxorubicin-loaded drug-eluting beads',
      'Lipiodol + doxorubicin + Gelfoam',
      'Non-spherical PVA with doxorubicin',
      'Irinotecan-loaded drug-eluting beads'
    ],
    correctAnswers: [0, 1],
    explanation: 'Doxorubicin-loaded DEBs (DEB-TACE) and conventional TACE with lipiodol-doxorubicin-Gelfoam are both established treatments for HCC. Irinotecan DEBs are used for colorectal liver metastases, not HCC. Non-spherical PVA is not typically combined with chemotherapy for TACE.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'F006',
    section: 'F',
    sectionTitle: 'Interventional Oncology',
    subsection: 'Follow-up',
    question: 'Following TACE for HCC with good angiographic result and post-embolization syndrome, what is the most appropriate follow-up imaging?',
    options: [
      'CT scan on day 1',
      'CT scan in 6 days',
      'CT scan in 2 weeks',
      'CT scan in 6 weeks'
    ],
    correctAnswers: [3],
    explanation: 'Post-TACE imaging should be performed at 4-6 weeks to allow inflammation to settle and properly assess treatment response using mRECIST criteria. Earlier imaging may show artifacts from lipiodol and inflammatory changes that confound interpretation.',
    difficulty: 'easy',
    examFrequency: 'high'
  },
  {
    id: 'F007',
    section: 'F',
    sectionTitle: 'Interventional Oncology',
    subsection: 'TARE/SIRT',
    question: 'During SIRT workup, Tc-99m MAA scan shows a lung shunt fraction of 25%. What is the most appropriate next step?',
    options: [
      'Proceed with standard Y-90 dose',
      'Reduce Y-90 dose by 40%',
      'Perform coil embolization of hepatopulmonary shunts and repeat MAA',
      'Abandon SIRT treatment'
    ],
    correctAnswers: [2],
    explanation: 'Lung shunt fraction >20% significantly increases radiation pneumonitis risk. Shunt-causing vessels (e.g., tumor arteriovenous shunts) should be coil-embolized and MAA repeated. If shunting persists >20%, dose reduction or treatment abandonment may be required.',
    difficulty: 'hard',
    examFrequency: 'high'
  },
  {
    id: 'F008',
    section: 'F',
    sectionTitle: 'Interventional Oncology',
    subsection: 'Ablation',
    question: 'Which factor has the greatest impact on the size of the ablation zone during microwave ablation?',
    options: [
      'Power setting',
      'Duration of ablation',
      'Antenna design',
      'Tissue impedance'
    ],
    correctAnswers: [1],
    explanation: 'Duration of ablation has the greatest impact on ablation zone size in MWA. Unlike RFA, MWA is less affected by tissue impedance due to its different heating mechanism. Power and antenna design are important but duration is the primary variable operators control.',
    difficulty: 'medium',
    examFrequency: 'medium'
  },
  {
    id: 'F009',
    section: 'F',
    sectionTitle: 'Interventional Oncology',
    subsection: 'PVE',
    question: 'A patient with colorectal liver metastases is planned for right hepatectomy. Portal vein embolization (PVE) is recommended. What is the risk of major complications?',
    options: [
      'Approximately 0.5%',
      'Approximately 10%',
      'Approximately 2%',
      'Approximately 5%'
    ],
    correctAnswers: [2],
    explanation: 'PVE has a major complication rate of approximately 2%, including hepatic failure, portal vein thrombosis, and bleeding. It is a relatively safe procedure that allows the future liver remnant to hypertrophy before major hepatic resection.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'F010',
    section: 'F',
    sectionTitle: 'Interventional Oncology',
    subsection: 'HCC in Non-cirrhotic Liver',
    question: 'A 76-year-old woman with a 6.3 cm biopsy-proven HCC in the left lobe of a non-cirrhotic liver. She had a STEMI 8 months ago with drug-eluting stent. What is the most appropriate treatment?',
    options: [
      'Multiple needle thermal ablation',
      'Left hepatectomy',
      'Trans-arterial radioembolization',
      'Trans-arterial chemoembolization'
    ],
    correctAnswers: [1],
    explanation: 'In non-cirrhotic liver with solitary HCC >5 cm, surgical resection (left hepatectomy) is the treatment of choice when feasible. The patient\'s cardiac status needs assessment but 8 months post-stent is typically sufficient interval. Ablation is less effective for tumors >3 cm.',
    difficulty: 'hard',
    examFrequency: 'high'
  },

  // Additional questions to expand the bank
  {
    id: 'B013',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Central Venous Access',
    question: 'A patient\'s portacath is non-functional and the tube has migrated to the pulmonary artery. The patient also reports intermittent palpitations. What is the most appropriate next step?',
    options: [
      'CT angiography of the chest',
      'ECG monitoring for 24 hours',
      'Endovascular retrieval',
      'New portacath placement'
    ],
    correctAnswers: [2],
    explanation: 'A migrated catheter fragment in the pulmonary artery requires urgent endovascular retrieval using snare devices. The palpitations may be due to the foreign body causing arrhythmias. Retrieval should be performed before complications occur (thrombus, infection, cardiac injury).',
    difficulty: 'easy',
    examFrequency: 'high'
  },
  {
    id: 'A011',
    section: 'A',
    sectionTitle: 'Fundamental Topics in IR',
    subsection: 'Contrast Media',
    question: 'A patient develops urticaria, facial swelling, and mild bronchospasm 5 minutes after contrast injection. What is the appropriate treatment?',
    options: [
      'IV epinephrine 1mg',
      'IM epinephrine 0.3-0.5mg + IV diphenhydramine + supplemental oxygen',
      'IV diphenhydramine only',
      'Observe and reassess in 30 minutes'
    ],
    correctAnswers: [1],
    explanation: 'This is a moderate allergic reaction requiring IM epinephrine (0.3-0.5mg of 1:1000), antihistamines (H1 blocker), and supportive care with oxygen. IV epinephrine is reserved for severe anaphylaxis with cardiovascular collapse. Observation alone is insufficient.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'C008',
    section: 'C',
    sectionTitle: 'Non-vascular Interventions',
    subsection: 'Colonic Stenting',
    question: 'After colonic stent placement, the patient reports multiple episodes of diarrhea 16 hours post-procedure. What is the most appropriate action?',
    options: [
      'Advise this is normal and arrange an abdominal radiograph',
      'Prescribe oral loperamide',
      'Send stool sample for culture',
      'Isolate patient and prescribe IV metronidazole'
    ],
    correctAnswers: [0],
    explanation: 'Diarrhea following relief of colonic obstruction is expected and normal. The backed-up proximal bowel contents are now able to pass. An abdominal X-ray confirms stent position and excludes perforation. Anti-diarrheals should be avoided initially.',
    difficulty: 'easy',
    examFrequency: 'medium'
  },
  {
    id: 'B014',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Hepatic Artery Anatomy',
    question: 'During chemoembolization, you notice a replaced right hepatic artery. From which vessel does this most commonly arise?',
    options: [
      'Left gastric artery',
      'Superior mesenteric artery',
      'Gastroduodenal artery',
      'Celiac trunk'
    ],
    correctAnswers: [1],
    explanation: 'A replaced right hepatic artery most commonly arises from the superior mesenteric artery (approximately 15-20% of the population). A replaced left hepatic artery typically arises from the left gastric artery. Knowledge of hepatic arterial variants is essential for safe hepatic interventions.',
    difficulty: 'easy',
    examFrequency: 'high'
  },
  {
    id: 'F011',
    section: 'F',
    sectionTitle: 'Interventional Oncology',
    subsection: 'Post-procedure Management',
    question: 'A patient returns 1 week after TACE with doxorubicin-eluting beads, presenting with fever (38.7°C) and epigastric pain. What are the appropriate next management steps? Select three options.',
    options: [
      'Reassure the patient and discharge as this is an expected side effect',
      'Blood tests including CRP and WCC and CT scan',
      'Admit and commence broad-spectrum antibiotics',
      'Percutaneous aspiration of treated lesion',
      'Perform ECG and assess myocardial enzyme levels'
    ],
    correctAnswers: [1, 2, 4],
    explanation: 'Fever at 1 week post-TACE is concerning for liver abscess or infection (not typical PES which resolves in 72 hours). Investigation with blood tests and CT is needed. Empirical antibiotics and cardiac workup (doxorubicin cardiotoxicity) should be initiated. Aspiration is only done if abscess is confirmed.',
    difficulty: 'hard',
    examFrequency: 'high'
  },
  {
    id: 'B015',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Hemoptysis',
    question: 'Following bronchial artery embolization, a patient has recurrent hemoptysis on day 9. What are the most likely sources of recurrent bleeding? Select three options.',
    options: [
      'Systemic collaterals from right internal mammary artery',
      'Systemic collaterals from right phrenic artery',
      'Collaterals from right pulmonary artery',
      'Further right bronchial artery supply'
    ],
    correctAnswers: [0, 1, 3],
    explanation: 'Recurrent hemoptysis after BAE is usually from: (1) non-bronchial systemic collaterals (internal mammary, phrenic, intercostal), (2) reconstitution of embolized bronchial arteries, or (3) missed bronchial artery branches. Pulmonary artery bleeding is rare in inflammatory lung disease.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'A012',
    section: 'A',
    sectionTitle: 'Fundamental Topics in IR',
    subsection: 'Stents',
    question: 'Which statement about self-expanding metal stents (SEMS) vs balloon-expandable stents is correct?',
    options: [
      'SEMS are preferred at the aortic bifurcation due to precise placement',
      'Balloon-expandable stents are preferred for tortuous iliac arteries',
      'SEMS are preferred in areas subject to external compression',
      'Balloon-expandable stents have better radial force than SEMS'
    ],
    correctAnswers: [3],
    explanation: 'Balloon-expandable stents have greater radial force, making them ideal for calcified, resistant lesions and precise placement (e.g., renal artery ostia, aortic bifurcation). SEMS are preferred in tortuous vessels due to flexibility but may crush under external compression.',
    difficulty: 'medium',
    examFrequency: 'medium'
  },
  {
    id: 'B016',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'TIPS',
    question: 'A proximal hepatic vein stenosis is found during TIPS creation. What is the most appropriate management?',
    options: [
      'Balloon dilatation of the stenosis only',
      'Cutting balloon venoplasty',
      'Hepatic vein covered stent placement and dilatation',
      'Uncovered stent placement and dilatation'
    ],
    correctAnswers: [2],
    explanation: 'Hepatic vein stenosis in the setting of TIPS requires covered stent placement and dilatation. Covered stents provide better patency than balloon angioplasty alone or uncovered stents. The TIPS tract will connect with this stent for optimal outflow.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'C009',
    section: 'C',
    sectionTitle: 'Non-vascular Interventions',
    subsection: 'Colonic Stenting',
    question: 'Why is colonic stent placement preferred over emergency surgery for malignant obstruction in palliative patients? Select two options.',
    options: [
      'Lower mortality',
      'Lower rate of stoma formation',
      'Shorter intensive care stay',
      'Better cancer survival'
    ],
    correctAnswers: [1, 2],
    explanation: 'Colonic stenting as bridge-to-surgery or palliative treatment offers lower stoma rates and shorter ICU stays compared to emergency surgery. Mortality rates are similar. Cancer survival is not improved by stenting; it is a palliative measure.',
    difficulty: 'medium',
    examFrequency: 'medium'
  },
  {
    id: 'D007',
    section: 'D',
    sectionTitle: 'Genito-urinary Intervention',
    subsection: 'Transplant Renal Artery',
    question: 'After balloon angioplasty of a transplant renal artery stenosis, acute thrombosis occurs. What are the appropriate options? Select three.',
    options: [
      'Immediate discussion/referral for surgical thrombectomy',
      'Suction catheter thrombectomy',
      'Repeat angioplasty',
      'Inject thrombolytic agent'
    ],
    correctAnswers: [0, 1, 3],
    explanation: 'Acute thrombosis of the transplant renal artery is an emergency. Options include: catheter thrombectomy (suction/mechanical), thrombolysis, or surgical thrombectomy. Repeat angioplasty alone will not resolve the thrombus and may cause further injury.',
    difficulty: 'hard',
    examFrequency: 'high'
  },
  {
    id: 'A013',
    section: 'A',
    sectionTitle: 'Fundamental Topics in IR',
    subsection: 'Closure Devices',
    question: 'Following diagnostic angiography using a 6Fr sheath, which factor is a contraindication to vascular closure device deployment?',
    options: [
      'Mild peripheral arterial disease',
      'Puncture site in the superficial femoral artery',
      'BMI > 35',
      'Previous closure device at the same site 6 months ago'
    ],
    correctAnswers: [1],
    explanation: 'Puncture of the SFA (rather than CFA) is a contraindication to closure device use due to smaller vessel diameter and increased complication risk. Previous closure device use, obesity, and mild PAD are relative considerations but not absolute contraindications.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'E007',
    section: 'E',
    sectionTitle: 'Musculoskeletal Intervention',
    subsection: 'Cryoablation',
    question: 'What is the primary advantage of cryoablation over radiofrequency ablation for renal tumor treatment?',
    options: [
      'Shorter procedure time',
      'Better visualization of the ice ball on CT',
      'Higher complete ablation rate',
      'No need for conscious sedation'
    ],
    correctAnswers: [1],
    explanation: 'The main advantage of cryoablation is real-time visualization of the ice ball on CT or MRI, allowing precise monitoring of the ablation margin. RFA ablation zones are not visible in real-time. Cryoablation also causes less pain (can use conscious sedation) but procedure times are longer.',
    difficulty: 'medium',
    examFrequency: 'medium'
  },
  {
    id: 'B017',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'Pseudoaneurysm',
    question: 'A 3 cm femoral artery pseudoaneurysm with an 8 mm neck is identified following cardiac catheterization. Which feature is an absolute contraindication to ultrasound-guided thrombin injection?',
    options: [
      'Pseudoaneurysm size greater than 2 cm',
      'Patient on therapeutic anticoagulation',
      'Arteriovenous fistula communication',
      'Neck length less than 10 mm'
    ],
    correctAnswers: [2],
    explanation: 'Arteriovenous fistula communication is an absolute contraindication to thrombin injection as it risks systemic embolization through the venous system. Anticoagulation reduces success but is not an absolute contraindication. Size and neck dimensions are technical considerations.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'A014',
    section: 'A',
    sectionTitle: 'Fundamental Topics in IR',
    subsection: 'Hepatic Venous Pressure',
    question: 'During transjugular liver biopsy, the wedged hepatic venous pressure is 22 mmHg and free hepatic venous pressure is 6 mmHg. What does this indicate?',
    options: [
      'Normal portal pressure',
      'Mild portal hypertension',
      'Clinically significant portal hypertension',
      'Pre-sinusoidal portal hypertension'
    ],
    correctAnswers: [2],
    explanation: 'HVPG = 22-6 = 16 mmHg. Normal HVPG is 1-5 mmHg. Values ≥10 mmHg indicate clinically significant portal hypertension with risk of variceal bleeding. Values ≥12 mmHg predict high risk of variceal hemorrhage.',
    difficulty: 'medium',
    examFrequency: 'high'
  },
  {
    id: 'B018',
    section: 'B',
    sectionTitle: 'Vascular Diagnosis and Intervention',
    subsection: 'EVAR',
    question: 'What is the minimum recommended proximal landing zone length for standard EVAR?',
    options: [
      '5 mm',
      '10 mm',
      '15 mm',
      '25 mm'
    ],
    correctAnswers: [2],
    explanation: 'A minimum 15 mm infrarenal neck length is typically required for standard EVAR to achieve adequate seal and prevent Type Ia endoleak. Shorter necks may require fenestrated/branched grafts or chimney techniques.',
    difficulty: 'easy',
    examFrequency: 'high'
  },
  {
    id: 'F012',
    section: 'F',
    sectionTitle: 'Interventional Oncology',
    subsection: 'Ablation',
    question: 'What is the recommended minimum ablation margin for HCC treatment?',
    options: [
      '0.5 cm',
      '1.0 cm',
      '1.5 cm',
      '2.0 cm'
    ],
    correctAnswers: [1],
    explanation: 'A minimum 1 cm ablation margin around HCC is recommended to achieve complete tumor destruction and reduce local recurrence. This margin accounts for microscopic tumor extension and the technical uncertainty of ablation zone boundaries.',
    difficulty: 'easy',
    examFrequency: 'high'
  },
  {
    id: 'C010',
    section: 'C',
    sectionTitle: 'Non-vascular Interventions',
    subsection: 'Biliary Intervention',
    question: 'A patient with malignant biliary obstruction has a bilirubin of 350 μmol/L. ERCP has failed. What is the preferred approach for percutaneous biliary drainage?',
    options: [
      'Left-sided approach',
      'Right-sided approach',
      'Either side - no preference',
      'Combined bilateral approach always required'
    ],
    correctAnswers: [1],
    explanation: 'Right-sided approach is generally preferred as the right system is larger and easier to access, provides better drainage of more liver volume, and the tract is shorter. Left-sided approach is used for left-predominant disease or when right system is inaccessible.',
    difficulty: 'medium',
    examFrequency: 'medium'
  },
  {
    id: 'D008',
    section: 'D',
    sectionTitle: 'Genito-urinary Intervention',
    subsection: 'Follow-up',
    question: 'What is the most appropriate monitoring protocol for a patient after transplant renal artery intervention?',
    options: [
      'Serum urea, Doppler ultrasound, and blood pressure measurement',
      'Serum creatinine, Doppler ultrasound, and blood pressure measurement',
      'Serum creatinine, CT angiography, and urinalysis',
      'Serum creatinine, Doppler ultrasound, and renal biopsy'
    ],
    correctAnswers: [1],
    explanation: 'Post-intervention monitoring includes serum creatinine (renal function), Doppler ultrasound (stent patency and flow), and blood pressure measurement (treatment success). CTA exposes the patient to contrast and radiation unnecessarily when Doppler is effective.',
    difficulty: 'easy',
    examFrequency: 'medium'
  }
]

// Helper function to get questions by section
export function getQuestionsBySection(section: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'): MCQQuestion[] {
  return mcqQuestions.filter(q => q.section === section)
}

// Helper function to get random questions
export function getRandomQuestions(count: number, section?: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'): MCQQuestion[] {
  let questions = section ? getQuestionsBySection(section) : [...mcqQuestions]
  
  // Shuffle array
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]]
  }
  
  return questions.slice(0, Math.min(count, questions.length))
}

// Get section statistics
export function getSectionStats() {
  const stats: Record<string, number> = {}
  for (const section of ['A', 'B', 'C', 'D', 'E', 'F'] as const) {
    stats[section] = getQuestionsBySection(section).length
  }
  return stats
}
