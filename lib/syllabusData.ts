// EBIR Syllabus Data - Based on CIRSE European Curriculum and Syllabus for IR (2023)
// Knowledge endpoints extracted directly from the official syllabus

export type ExamFrequency = 'green' | 'yellow' | 'red' | 'purple'

export interface KnowledgeEndpoint {
  id: string
  text: string
}

export interface Section {
  id: string
  number: string
  title: string
  frequency?: ExamFrequency
  knowledgeEndpoints?: KnowledgeEndpoint[]
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
        knowledgeEndpoints: [
          {
            id: '2.1.3-1',
            text: 'Select patients for invasive procedures: Determine which patients will benefit from an invasive diagnostic or therapeutic procedure and advise on the most appropriate course of management through a review of clinical history and examination, pre-procedural non-invasive imaging studies, results of laboratory investigations, and proposed and expected outcomes of the procedure'
          },
          {
            id: '2.1.3-2',
            text: 'Recognize when there is insufficient information to allow adequate evaluation of the patient'
          },
          {
            id: '2.1.3-3',
            text: 'Use a dedicated IR patient safety checklist (e.g. www.cirse.org/Checklist)'
          },
          {
            id: '2.1.3-4',
            text: 'Demonstrate proper communication with the patient and referring physician(s) regarding procedure appropriateness'
          },
          {
            id: '2.1.3-5',
            text: 'If a procedure is deemed inappropriate, establish the correct management pathway in conjunction with the patient and the referring physician'
          },
          {
            id: '2.1.3-6',
            text: 'Know when to refer patients to an anaesthetic pre-assessment clinic if the patient is judged to be at risk for conscious sedation'
          },
          {
            id: '2.1.3-7',
            text: 'Properly evaluate a patient before an IR procedure: Elicit a relevant clinical history, perform a focused physical examination, and demonstrate understanding of history/physical findings or treatment scenarios that require discussion with/referral to other disciplines'
          },
          {
            id: '2.1.3-8',
            text: 'Identify medications that may require adjustment before any proposed therapeutic procedure'
          },
          {
            id: '2.1.3-9',
            text: 'Identify factors that increase procedural risk and risk for conscious sedation and assign an American Society of Anaesthesiology (ASA) score from patient history and physical examination and the results of appropriate laboratory tests'
          },
          {
            id: '2.1.3-10',
            text: 'Obtain informed consent: Discussion of the procedure with the patient should include the purpose of the intervention, the likely outcome (technical success, clinical success, rate of recurrence), the risks, the benefits, and any follow-up studies/procedures required, as well as alternative therapeutic options'
          },
          {
            id: '2.1.3-11',
            text: 'Ability to assign the proper medication regimens/precautions before, during or after a procedure for: blood sugar abnormalities, high or low blood pressure, infection/antibiotic therapy, renal dysfunction, coagulopathy/anticoagulation, drug/contrast reactions and interactions, conscious sedation, and anaesthesia/analgesia'
          },
          {
            id: '2.1.3-12',
            text: 'Familiarity with up-to-date methods of resuscitation'
          },
          {
            id: '2.1.3-13',
            text: 'Ability to recognize peri-procedural complications or problems and know how to manage them and when to call for specialist help (contrast reaction, excessive sedation, pain and anxiety, nausea/vomiting, decreased oxygen saturation/arrested respiration, arrhythmia and cardiac arrest, sepsis, hypertension/hypotension, abnormal blood sugar, haemorrhage/haematoma)'
          }
        ]
      },
      {
        id: '2.1.4',
        number: '2.1.4',
        title: 'Recognizing and Reducing Occupational Hazards',
        frequency: 'green',
        knowledgeEndpoints: [
          {
            id: '2.1.4-1',
            text: 'Know the importance of working according to the ALARA (As Low As Reasonably Achievable) principle'
          },
          {
            id: '2.1.4-2',
            text: 'Understand special requirements of image formation and image quality aspects with respect to fluoroscopy'
          },
          {
            id: '2.1.4-3',
            text: 'Understand and explain in detail: flat-panel/image intensifier detectors, continuous and pulsed acquisition including frame rate, automatic brightness control, high dose rate fluoroscopy, cine runs, last image hold, and roadmapping'
          },
          {
            id: '2.1.4-4',
            text: 'Explain radiobiological dose-effect relationships relevant to Interventional Radiology with respect to patient safety including radiation effects on humans in general, children and the conceptus'
          },
          {
            id: '2.1.4-5',
            text: 'Explain the meaning of justification and optimization as applied to Interventional Radiology practices'
          },
          {
            id: '2.1.4-6',
            text: 'Explain the concepts and tools for dose management in Interventional Radiology of adult and paediatric patients'
          },
          {
            id: '2.1.4-7',
            text: 'Understand quantitative risk and dose assessment for workers and public in Interventional Radiology'
          },
          {
            id: '2.1.4-8',
            text: 'Define Quality Assurance (QA) in Interventional Radiology, QA management and responsibilities, and outline a QA and radiation protection program'
          },
          {
            id: '2.1.4-9',
            text: 'Demonstrate knowledge of the risks from pathogens, hazardous drugs and materials'
          },
          {
            id: '2.1.4-10',
            text: 'Demonstrate knowledge of the incidence and methods of transmission of common pathogens (viral hepatitis, HIV, MRSA) in the IR patient population'
          },
          {
            id: '2.1.4-11',
            text: 'Understand the methods of reducing transmission to attending staff and other patients including protective clothing, proper use and disposal of contaminated clothing and sharp instruments, and immunological protection'
          },
          {
            id: '2.1.4-12',
            text: 'Understand how to prevent and manage needlestick injury'
          }
        ]
      },
      {
        id: '2.1.7',
        number: '2.1.7',
        title: 'Pharmacology of IR',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.1.7-1',
            text: 'Understand the indications, contraindications, interactions and side effects of contrast media including CO2 and gadolinium, and the aetiology, prevention and treatment of contrast medium reactions'
          },
          {
            id: '2.1.7-2',
            text: 'Understand the pharmacology of local anaesthetics, analgesics, and sedatives used in IR'
          },
          {
            id: '2.1.7-3',
            text: 'Understand the pharmacology of vasoactive drugs used in IR procedures'
          },
          {
            id: '2.1.7-4',
            text: 'Understand drugs affecting coagulation including new oral anticoagulants'
          },
          {
            id: '2.1.7-5',
            text: 'Understand drugs used in diabetes and hypertension control relevant to IR procedures'
          },
          {
            id: '2.1.7-6',
            text: 'Understand the use of antibiotics and antiemetics in IR'
          },
          {
            id: '2.1.7-7',
            text: 'Understand chemotherapeutics commonly used in IR (e.g. cisplatin, doxorubicin)'
          },
          {
            id: '2.1.7-8',
            text: 'Understand the management of circulatory collapse and shock, and the management/pharmacology of cardiorespiratory arrest'
          }
        ]
      },
      {
        id: '2.1.9',
        number: '2.1.9',
        title: 'Core Procedures in IR',
        frequency: 'green',
        knowledgeEndpoints: [
          {
            id: '2.1.9-1',
            text: 'Haemorrhage control: Embolization of GI bleeding - know indications, contraindications, techniques, embolic agent selection, expected outcomes and complications'
          },
          {
            id: '2.1.9-2',
            text: 'Haemorrhage control: Embolization of trauma bleeding and stentgrafting in trauma - understand emergency protocols and management'
          },
          {
            id: '2.1.9-3',
            text: 'Sepsis control: Biliary drainage and stenting - know indications for external, internal-external, and internal drainage; understand Charcot\'s triad and Reynolds\' pentad'
          },
          {
            id: '2.1.9-4',
            text: 'Sepsis control: Nephrostomy - understand indications for emergency drainage of obstructed infected kidney (pyonephrosis), technique, and complications'
          },
          {
            id: '2.1.9-5',
            text: 'Sepsis control: Abscess drainage - know indications, imaging guidance, catheter selection, and management'
          },
          {
            id: '2.1.9-6',
            text: 'Thrombolysis and adjunctive angioplasty and stenting: Arterial thrombolysis for acute limb ischaemia - understand Rutherford classification, patient selection, technique, contraindications, and complications'
          },
          {
            id: '2.1.9-7',
            text: 'Thrombolysis: Venous thrombolysis for phlegmasia - recognize urgency and treatment options'
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
        knowledgeEndpoints: [
          {
            id: '2.2.1.1.1-1',
            text: 'Describe the anatomy relevant to thoracic outlet syndrome (TOS) and describe provocative measures for eliciting subclavian steal on non-invasive studies'
          },
          {
            id: '2.2.1.1.1-2',
            text: 'Describe and recognize collateral pathways for patients with arterial occlusive disease including important branches of the external iliac, internal iliac, common femoral and profunda femoris arteries and their role in collateral pathways'
          },
          {
            id: '2.2.1.1.1-3',
            text: 'Describe the angiosome concept'
          },
          {
            id: '2.2.1.1.1-4',
            text: 'Understand the bony and soft tissue anatomy of arterial puncture sites (common femoral artery, brachial artery, radial or ulnar artery, popliteal artery, pedal arteries, axillary artery, common carotid artery) and recognize their importance in avoiding complications'
          },
          {
            id: '2.2.1.1.1-5',
            text: 'Recognize the association of PAD with coronary artery disease and cerebrovascular disease, and the prognostic implication of PAD in terms of life expectancy'
          },
          {
            id: '2.2.1.1.1-6',
            text: 'Know the causes of peripheral ischaemia: atherosclerosis, peripheral emboli, arteritis, fibromuscular dysplasia, congenital and acquired coarctation of aorta, endofibrosis of the external iliac artery, popliteal aneurysm, popliteal entrapment, adventitial cyst, trauma, irradiation injury, thromboangiitis obliterans (Buerger\'s disease), and thrombosis of a persistent sciatic artery'
          },
          {
            id: '2.2.1.1.1-7',
            text: 'Know the PAD grading systems according to the Society for Vascular Surgery (SVS) and the International Society for Vascular Surgery (ISVS); describe and categorize intermittent claudication including Leriche syndrome'
          },
          {
            id: '2.2.1.1.1-8',
            text: 'Categorize chronic critical limb ischaemia and acute critical limb ischaemia according to SVS/ISVS systems'
          },
          {
            id: '2.2.1.1.1-9',
            text: 'Understand the specific clinical and imaging features of diabetic foot syndrome; understand how diabetic angiopathy differs from atherosclerotic disease; understand the difference between an ischaemic ulcer and a neuropathic ulcer'
          },
          {
            id: '2.2.1.1.1-10',
            text: 'Understand the sources of emboli and the clinical manifestations and management strategies for peripheral arterial emboli; understand the nature, cause and treatment of blue digit syndrome'
          },
          {
            id: '2.2.1.1.1-11',
            text: 'Describe histological and angiographic findings common to the forms of fibromuscular dysplasia that may affect the medium-size aortic branches; recognize signs or symptoms depending on which artery is affected'
          },
          {
            id: '2.2.1.1.1-12',
            text: 'Describe the typical findings of vasculitis including Takayasu\'s arteritis, giant cell arteritis and polyarteritis nodosa; define Raynaud disease and Raynaud\'s phenomenon'
          },
          {
            id: '2.2.1.1.1-13',
            text: 'Recognize the clinical manifestations and angiographic findings of blunt or penetrating trauma, irradiation vascular injury and endofibrosis of the external iliac artery'
          },
          {
            id: '2.2.1.1.1-14',
            text: 'Understand the anatomy relevant to popliteal entrapment syndrome; describe the anatomical relationships between the popliteal artery and the gastrocnemius or popliteus muscles in the four types of popliteal entrapment'
          },
          {
            id: '2.2.1.1.1-15',
            text: 'Have knowledge of ankle-brachial index (ABI), toe pressure, transcutaneous oxygen pressure (TcPO2) measurements and their interpretation'
          },
          {
            id: '2.2.1.1.1-16',
            text: 'Understand strategies for imaging patients with PAD including algorithms for acute and chronic ischaemia, diabetic foot syndrome, critical ischaemia and claudication, contraindications to iodinated contrast, arterial bypass grafts, endografts, vascular trauma, and entrapment syndromes'
          },
          {
            id: '2.2.1.1.1-17',
            text: 'Demonstrate technical competence in peripheral vascular interventions including: crossing stenosis with selective catheters and guidewires, recanalization techniques of total occlusions including subintimal recanalization and use of re-entry devices, balloon angioplasty and stent placement, catheter-directed thrombolysis and percutaneous aspiration and mechanical thrombectomy, and management of complications'
          },
          {
            id: '2.2.1.1.1-18',
            text: 'Recognize the role of emerging treatments for restenosis or calcified plaques including local drug delivery, percutaneous atherectomy, endovascular brachytherapy, shockwave angioplasty, and laser angioplasty'
          }
        ]
      },
      {
        id: '2.2.1.2',
        number: '2.2.1.2',
        title: 'Prostate Artery Embolization (PAE)',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.1.2-1',
            text: 'Understand the pathophysiology of benign prostatic hyperplasia (BPH) and the clinical presentation including IPSS scoring'
          },
          {
            id: '2.2.1.2-2',
            text: 'Know the indications and contraindications for PAE; understand patient selection criteria'
          },
          {
            id: '2.2.1.2-3',
            text: 'Understand the complex anatomy of the prostatic arteries and their variable origins from the internal iliac artery branches'
          },
          {
            id: '2.2.1.2-4',
            text: 'Know the dangerous anastomoses (rectal arteries, vesical arteries, penile arteries) and how to avoid non-target embolization'
          },
          {
            id: '2.2.1.2-5',
            text: 'Understand embolic agent selection for PAE (microspheres, particle size considerations)'
          },
          {
            id: '2.2.1.2-6',
            text: 'Know the expected outcomes, success rates, and potential complications of PAE including post-PAE syndrome'
          }
        ]
      },
      {
        id: '2.2.1.2.1',
        number: '2.2.1.2.1',
        title: 'Priapism',
        frequency: 'red',
        knowledgeEndpoints: [
          {
            id: '2.2.1.2.1-1',
            text: 'Understand the postulated mechanism of both high (arterial or non-ischaemic) and low flow (venous or ischaemic) priapism'
          },
          {
            id: '2.2.1.2.1-2',
            text: 'Know the clinical differentiation between high-flow and low-flow priapism (pain, rigidity, blood gas analysis, aetiology)'
          },
          {
            id: '2.2.1.2.1-3',
            text: 'Have knowledge of embolic agents for endovascular treatment of high-flow priapism: temporary embolization material (autologous clots, gelatinous foam) and permanent embolization material (endovascular coils or N-butyl-cyanoacrylate)'
          },
          {
            id: '2.2.1.2.1-4',
            text: 'Understand the diagnostic approach using Doppler ultrasound and pudendal angiography'
          },
          {
            id: '2.2.1.2.1-5',
            text: 'Understand why temporary embolic agents are preferred to preserve erectile function'
          }
        ]
      },
      {
        id: '2.2.1.3.1',
        number: '2.2.1.3.1',
        title: 'Venous Thrombosis and Insufficiency',
        frequency: 'green',
        knowledgeEndpoints: [
          {
            id: '2.2.1.3.1-1',
            text: 'Understand the pathophysiology, risk factors, and natural history of deep venous thrombosis (DVT)'
          },
          {
            id: '2.2.1.3.1-2',
            text: 'Know the classification of DVT (distal vs proximal, iliofemoral) and implications for treatment'
          },
          {
            id: '2.2.1.3.1-3',
            text: 'Understand the indications for catheter-directed thrombolysis (CDT) and pharmacomechanical thrombectomy (PMT)'
          },
          {
            id: '2.2.1.3.1-4',
            text: 'Know the clinical presentation and management of phlegmasia alba dolens and phlegmasia cerulea dolens'
          },
          {
            id: '2.2.1.3.1-5',
            text: 'Understand May-Thurner syndrome: anatomy, presentation, diagnosis (IVUS, CT/MR venography), and treatment (thrombus removal and stenting)'
          },
          {
            id: '2.2.1.3.1-6',
            text: 'Understand post-thrombotic syndrome and strategies for prevention'
          },
          {
            id: '2.2.1.3.1-7',
            text: 'Know the indications, types, and complications of IVC filters; understand retrieval considerations'
          }
        ]
      },
      {
        id: '2.2.1.3.2',
        number: '2.2.1.3.2',
        title: 'Pulmonary Thromboembolic Disease',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.1.3.2-1',
            text: 'Understand the risk stratification of pulmonary embolism (PE): high-risk/massive, intermediate-risk/submassive, and low-risk PE'
          },
          {
            id: '2.2.1.3.2-2',
            text: 'Know the prognostic markers for PE: RV dysfunction, troponin elevation, BNP elevation'
          },
          {
            id: '2.2.1.3.2-3',
            text: 'Understand the indications for catheter-directed therapy for PE: massive PE with contraindication to systemic thrombolysis, submassive PE with deterioration, failed systemic thrombolysis'
          },
          {
            id: '2.2.1.3.2-4',
            text: 'Know the techniques for PE intervention: catheter-directed thrombolysis (CDT), ultrasound-assisted CDT, and mechanical thrombectomy devices'
          },
          {
            id: '2.2.1.3.2-5',
            text: 'Know the complications of catheter-directed therapy for PE including pulmonary artery perforation, bradycardia, and access site bleeding'
          }
        ]
      },
      {
        id: '2.2.1.1.7',
        number: '2.2.1.1.7',
        title: 'Vascular Trauma',
        frequency: 'green',
        knowledgeEndpoints: [
          {
            id: '2.2.1.1.7-1',
            text: 'Recognize the clinical manifestations and angiographic findings of vascular trauma: blunt trauma, penetrating trauma, blast trauma and iatrogenic trauma'
          },
          {
            id: '2.2.1.1.7-2',
            text: 'Understand the indications for trauma embolization: solid organ injury (liver, spleen, kidney), pelvic fractures with arterial bleeding, ongoing hemorrhage after surgical packing'
          },
          {
            id: '2.2.1.1.7-3',
            text: 'Know the embolic agent selection for trauma embolization: coils for precise permanent occlusion, gelfoam for temporary diffuse embolization, particles for distal embolization, glue for high-flow situations'
          },
          {
            id: '2.2.1.1.7-4',
            text: 'Understand organ-specific embolization strategies: liver (dual blood supply allows aggressive embolization), spleen (proximal vs distal embolization for function preservation), kidney (superselective only to preserve parenchyma), pelvis (often bilateral, gelfoam often sufficient)'
          },
          {
            id: '2.2.1.1.7-5',
            text: 'Understand traumatic aortic injury (TAI): mechanism (rapid deceleration), classic location (aortic isthmus), classification (Grade I-IV), and endovascular treatment with stent-grafts'
          },
          {
            id: '2.2.1.1.7-6',
            text: 'Know the complications of endovascular trauma repair: stroke, spinal cord ischemia, coverage of branch vessels'
          }
        ]
      },
      {
        id: '2.2.1.1.8',
        number: '2.2.1.1.8',
        title: 'Visceral Arterial Disease',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.1.1.8-1',
            text: 'Understand acute mesenteric ischemia (AMI): causes (embolism, thrombosis, NOMI, venous thrombosis), clinical presentation ("pain out of proportion to exam"), CT signs (bowel wall changes, pneumatosis, portal venous gas), and treatment options'
          },
          {
            id: '2.2.1.1.8-2',
            text: 'Understand chronic mesenteric ischemia (CMI): classic triad (postprandial pain, food fear with weight loss, abdominal bruit) and treatment with angioplasty and stenting'
          },
          {
            id: '2.2.1.1.8-3',
            text: 'Understand renal artery stenosis: causes (atherosclerosis vs fibromuscular dysplasia), clinical presentations (renovascular hypertension, ischemic nephropathy, flash pulmonary edema), and current stenting indications'
          },
          {
            id: '2.2.1.1.8-4',
            text: 'Know factors that predict poor response to renal artery stenting: small kidney, high resistance index, chronic stable hypertension'
          },
          {
            id: '2.2.1.1.8-5',
            text: 'Understand visceral artery aneurysms: distribution (splenic most common, then hepatic), risk factors for rupture (size >2cm, pregnancy, mycotic), treatment indications and options (coil embolization, covered stent, surgical)'
          },
          {
            id: '2.2.1.1.8-6',
            text: 'Know the specific risks of splenic artery aneurysm in pregnancy'
          }
        ]
      },
      {
        id: '2.2.1.1.9',
        number: '2.2.1.1.9',
        title: 'Arterial Problems in Obstetrics and Gynaecology',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.1.1.9-1',
            text: 'Understand uterine artery embolization (UAE) for fibroids: indications (symptomatic fibroids, failed medical therapy), contraindications (pregnancy, suspected malignancy, pedunculated subserosal fibroid), and technique'
          },
          {
            id: '2.2.1.1.9-2',
            text: 'Know embolic agent selection for UAE: particle size considerations, endpoint of embolization'
          },
          {
            id: '2.2.1.1.9-3',
            text: 'Know the expected outcomes and complications of UAE: technical success rates, symptom improvement, fibroid volume reduction, post-embolization syndrome, amenorrhea risk, infection'
          },
          {
            id: '2.2.1.1.9-4',
            text: 'Understand postpartum hemorrhage (PPH) embolization: definition, causes (4 T\'s: Tone, Trauma, Tissue, Thrombin), indications for IR intervention'
          },
          {
            id: '2.2.1.1.9-5',
            text: 'Know the technique for PPH embolization: targets (uterine arteries first, then ovarian arteries, other internal iliac branches), embolic agent selection (gelfoam preferred for fertility preservation)'
          },
          {
            id: '2.2.1.1.9-6',
            text: 'Know the outcomes of PPH embolization: technical success rates, fertility preservation potential'
          }
        ]
      }
    ]
  }
]
