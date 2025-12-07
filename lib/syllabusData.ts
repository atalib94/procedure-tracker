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
        id: '2.1.5',
        number: '2.1.5',
        title: 'The Interventional Radiology Team',
        frequency: 'purple',
        knowledgeEndpoints: [
          {
            id: '2.1.5-1',
            text: 'Recognize and promote a team environment in the practice of IR including radiographers/technicians, nurses, radiology helpers, and other clinicians including oncologists, surgeons and physicians'
          },
          {
            id: '2.1.5-2',
            text: 'Help to provide a safe, stimulating working environment in which all IR team members are encouraged to participate'
          },
          {
            id: '2.1.5-3',
            text: 'Support the continuing medical education of IR team members and involve team members in research and audit'
          },
          {
            id: '2.1.5-4',
            text: 'Integrate the various members of the IR team in quality assurance programmes, teaching and mentoring'
          },
          {
            id: '2.1.5-5',
            text: 'Understand the potential responsibilities and limitations in IR practice of radiographers/technicians and nurses'
          }
        ]
      },
      {
        id: '2.1.6',
        number: '2.1.6',
        title: 'Interventional Radiology Clinical Practice',
        frequency: 'purple',
        knowledgeEndpoints: [
          {
            id: '2.1.6-1',
            text: 'Understand the importance of interprofessional communication to ensure appropriate prioritization and management of all referrals'
          },
          {
            id: '2.1.6-2',
            text: 'Ensure that patients are assessed and advised by an appropriate clinician and ensure awareness of the entire skills repertoire of the IR'
          },
          {
            id: '2.1.6-3',
            text: 'Communicate effectively with multiple staff groups including nursing, physician assistants, junior medical staff, consultants from other relevant disciplines, and clerical staff'
          },
          {
            id: '2.1.6-4',
            text: 'Understand the necessity of developing and maintaining an IR clinic to evaluate patients pre- and post-procedure, provide information, obtain informed consent, and promote IR as a clinical practice'
          },
          {
            id: '2.1.6-5',
            text: 'Understand healthcare coding systems and the financial and business model for the IR service'
          },
          {
            id: '2.1.6-6',
            text: 'Understand the importance of attending relevant MDT meetings'
          },
          {
            id: '2.1.6-7',
            text: 'Adhere to institutional and national information privacy and ethical standards with regard to all medical records, correspondence, and use of patient information for research purposes'
          },
          {
            id: '2.1.6-8',
            text: 'Understand the mechanisms and requirements for continually monitoring quality assurance including regular documentation and classification of complications, regular morbidity and mortality meetings, effective audit, and contribution to national audits'
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
        id: '2.1.8',
        number: '2.1.8',
        title: 'Imaging',
        frequency: 'green',
        knowledgeEndpoints: [
          {
            id: '2.1.8-1',
            text: 'Understand the mechanisms, complementary roles and limitations of the different imaging techniques including ultrasonography, MRA, CTA, catheter angiography (including DSA and 3D rotational angiography), cone beam CT and image fusion'
          },
          {
            id: '2.1.8-2',
            text: 'Demonstrate thorough understanding of duplex ultrasound including both arterial and venous examinations, normal and abnormal Doppler waveforms, and contrast-enhanced ultrasound imaging (CEUS)'
          },
          {
            id: '2.1.8-3',
            text: 'Understand CT and CTA protocols including contrast materials, reconstruction techniques, radiation doses and methods to reduce them'
          },
          {
            id: '2.1.8-4',
            text: 'Have knowledge of MR and MRA including effects on implanted materials, MRA techniques, contrast materials including gadolinium risks, and differences between contrast-enhanced and unenhanced techniques'
          },
          {
            id: '2.1.8-5',
            text: 'Understand standard groin anatomy including the position of the inguinal ligament and the femoral nerve, artery and vein; the Seldinger technique; ultrasound-guided vessel puncture; and mechanisms of puncture site haemostasis'
          },
          {
            id: '2.1.8-6',
            text: 'Know alternative sites of arterial puncture (brachial, axillary, radial, ulnar, popliteal, tibial, pedal) and understand their advantages and disadvantages'
          },
          {
            id: '2.1.8-7',
            text: 'Understand digital subtraction angiographic techniques, bolus chase techniques, road mapping, smart mask and pixel shift techniques'
          },
          {
            id: '2.1.8-8',
            text: 'Understand the complications of catheter angiography and their management, including abnormal coagulation, renal dysfunction, and contrast reaction'
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
        id: '2.2.1.1.2',
        number: '2.2.1.1.2',
        title: 'Aortic and Upper Extremity Arterial Disease',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.1.1.2-1',
            text: 'Know the difference between an aortic pseudoaneurysm and a ductus diverticulum'
          },
          {
            id: '2.2.1.1.2-2',
            text: 'Know the potential causes of "dysphagia aortica" and "dysphagia lusoria"'
          },
          {
            id: '2.2.1.1.2-3',
            text: 'Know the clinical presentation of upper extremity arterial pathology'
          },
          {
            id: '2.2.1.1.2-4',
            text: 'Describe the imaging findings in atherosclerotic, syphilitic, mycotic, post-traumatic and congenital aneurysms'
          },
          {
            id: '2.2.1.1.2-5',
            text: 'Recognize chest radiography and CT findings in the setting of traumatic disruption of the aorta'
          },
          {
            id: '2.2.1.1.2-6',
            text: 'Recognize the angiographic findings associated with different forms of aortitis'
          },
          {
            id: '2.2.1.1.2-7',
            text: 'Recognize imaging findings and typical distribution of abnormalities in Takayasu\'s disease'
          },
          {
            id: '2.2.1.1.2-8',
            text: 'Recognize the imaging findings in the vascular components of connective tissue disorders (e.g. Marfan syndrome and Ehlers-Danlos syndrome)'
          },
          {
            id: '2.2.1.1.2-9',
            text: 'Demonstrate technical competence in catheterizing the great vessels in normal and variant anatomy'
          },
          {
            id: '2.2.1.1.2-10',
            text: 'Demonstrate competence in performing angioplasty, stenting and embolization of supra-aortic branches'
          }
        ]
      },
      {
        id: '2.2.1.1.3',
        number: '2.2.1.1.3',
        title: 'Acute Aortic Syndromes and Aneurysmal Disease',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.1.1.3-1',
            text: 'Know the levels of arterial connection between the aorta and the spinal cord, the angiographic appearance of the artery of Adamkiewicz and understand its clinical significance'
          },
          {
            id: '2.2.1.1.3-2',
            text: 'Know the pathological spectrum of acute aortic pathology including intramural haematoma, aortic ulceration, penetrating aortic ulcer, and aortic dissection'
          },
          {
            id: '2.2.1.1.3-3',
            text: 'Know the factors predisposing to aortic dissection: atherosclerosis, hypertension, connective tissue disorders, arterial inflammatory conditions, bicuspid aortic valve, and pregnancy'
          },
          {
            id: '2.2.1.1.3-4',
            text: 'Know the natural history of aortic dissection including acute and chronic phases, the potential for late aneurysm formation and the implications for treatment'
          },
          {
            id: '2.2.1.1.3-5',
            text: 'Recognize the symptoms and physical signs associated with: compression of adjacent structures by large aneurysms, distal embolization of aneurysm thrombus, aorto-caval fistula, aorto-enteric fistula, intra-thoracic and intra-abdominal rupture'
          },
          {
            id: '2.2.1.1.3-6',
            text: 'Be able to identify the typical signs of the true and false lumen of a dissection on catheter angiography, CTA and MRA; recognize the difference between static and dynamic type of dissection'
          },
          {
            id: '2.2.1.1.3-7',
            text: 'Classify thoracic and abdominal aortic aneurysms with respect to suitability for endovascular repair and define the anatomical information required in case selection and planning'
          },
          {
            id: '2.2.1.1.3-8',
            text: 'Understand the requirements for medium and long-term surveillance of aortic stent-grafts, including detection of structural failure, device migration, component dislocation, graft occlusion, endoleaks, and sac expansion'
          },
          {
            id: '2.2.1.1.3-9',
            text: 'Define the concept of "endoleak", the imaging criteria by which the 5 subtypes may be classified and the indications for reintervention'
          },
          {
            id: '2.2.1.1.3-10',
            text: 'Demonstrate competence in planning stent-graft repair using cross sectional imaging and in the techniques of endovascular repair of aortic aneurysms or dissections'
          }
        ]
      },
      {
        id: '2.2.1.1.4',
        number: '2.2.1.1.4',
        title: 'Supra-aortic Arterial Disease',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.1.1.4-1',
            text: 'Understand the anatomy of the carotid and vertebral arteries including common variants'
          },
          {
            id: '2.2.1.1.4-2',
            text: 'Know the indications and contraindications for carotid artery stenting (CAS) versus carotid endarterectomy (CEA)'
          },
          {
            id: '2.2.1.1.4-3',
            text: 'Understand the technique of carotid artery stenting including embolic protection devices'
          },
          {
            id: '2.2.1.1.4-4',
            text: 'Know the complications of carotid stenting including stroke, hyperperfusion syndrome, and access site complications'
          },
          {
            id: '2.2.1.1.4-5',
            text: 'Understand subclavian steal syndrome: anatomy, presentation, diagnosis, and treatment options'
          }
        ]
      },
      {
        id: '2.2.1.1.5',
        number: '2.2.1.1.5',
        title: 'Stroke',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.1.1.5-1',
            text: 'Understand the pathophysiology of acute ischaemic stroke and the concept of the ischaemic penumbra'
          },
          {
            id: '2.2.1.1.5-2',
            text: 'Know the indications for mechanical thrombectomy in acute stroke including time windows and imaging selection criteria'
          },
          {
            id: '2.2.1.1.5-3',
            text: 'Understand the techniques for mechanical thrombectomy including stent retrievers and aspiration devices'
          },
          {
            id: '2.2.1.1.5-4',
            text: 'Know the complications of mechanical thrombectomy including vessel perforation, dissection, and haemorrhagic transformation'
          },
          {
            id: '2.2.1.1.5-5',
            text: 'Understand the role of imaging (CT perfusion, MRI) in patient selection for thrombectomy'
          }
        ]
      },
      {
        id: '2.2.1.1.6',
        number: '2.2.1.1.6',
        title: 'Vascular Malformations',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.1.1.6-1',
            text: 'Understand the ISSVA classification of vascular anomalies: vascular tumours vs vascular malformations'
          },
          {
            id: '2.2.1.1.6-2',
            text: 'Know the characteristics of different types of vascular malformations: capillary, venous, lymphatic, arteriovenous malformations (AVMs), and arteriovenous fistulae (AVFs)'
          },
          {
            id: '2.2.1.1.6-3',
            text: 'Understand the imaging features of different vascular malformations on ultrasound, MRI, and angiography'
          },
          {
            id: '2.2.1.1.6-4',
            text: 'Know the indications and techniques for treatment of vascular malformations including sclerotherapy and embolization'
          },
          {
            id: '2.2.1.1.6-5',
            text: 'Understand the embolic agents used for vascular malformation treatment: ethanol, bleomycin, sodium tetradecyl sulfate (STS), polidocanol, Onyx, coils, and glue'
          },
          {
            id: '2.2.1.1.6-6',
            text: 'Know the complications of vascular malformation treatment including skin necrosis, nerve injury, and non-target embolization'
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
        id: '2.2.1.3.3',
        number: '2.2.1.3.3',
        title: 'Disease of the Superior and Inferior Vena Cava',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.1.3.3-1',
            text: 'Understand the causes of SVC obstruction: malignant (lung cancer, lymphoma, mediastinal tumours) and benign (thrombosis, fibrosing mediastinitis, central venous catheters)'
          },
          {
            id: '2.2.1.3.3-2',
            text: 'Know the clinical presentation of SVC syndrome: facial swelling, dyspnoea, upper extremity oedema, collateral vein distension'
          },
          {
            id: '2.2.1.3.3-3',
            text: 'Understand the treatment options for SVC obstruction: stenting, thrombolysis, and the role of anticoagulation'
          },
          {
            id: '2.2.1.3.3-4',
            text: 'Know the causes and treatment of IVC obstruction and IVC filter-related complications'
          }
        ]
      },
      {
        id: '2.2.1.3.4.1',
        number: '2.2.1.3.4.1',
        title: 'Portal Venous Disease and TIPS/BRTO',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.1.3.4.1-1',
            text: 'Understand the pathophysiology of portal hypertension and its complications: variceal bleeding, ascites, hepatic encephalopathy'
          },
          {
            id: '2.2.1.3.4.1-2',
            text: 'Know the indications for TIPS: refractory variceal bleeding, refractory ascites, Budd-Chiari syndrome, hepatorenal syndrome'
          },
          {
            id: '2.2.1.3.4.1-3',
            text: 'Know the contraindications for TIPS: severe hepatic encephalopathy, right heart failure, polycystic liver disease, severe coagulopathy'
          },
          {
            id: '2.2.1.3.4.1-4',
            text: 'Understand the technique of TIPS creation including pre-procedure planning, portal vein access, stent selection, and target portosystemic gradient'
          },
          {
            id: '2.2.1.3.4.1-5',
            text: 'Know the complications of TIPS: hepatic encephalopathy, shunt stenosis/occlusion, hepatic failure, and haemobilia'
          },
          {
            id: '2.2.1.3.4.1-6',
            text: 'Understand the concept and technique of balloon-occluded retrograde transvenous obliteration (BRTO) for gastric varices'
          }
        ]
      },
      {
        id: '2.2.1.3.4.2',
        number: '2.2.1.3.4.2',
        title: 'Hepatic Venous Disease and Budd-Chiari Syndrome',
        frequency: 'red',
        knowledgeEndpoints: [
          {
            id: '2.2.1.3.4.2-1',
            text: 'Understand the aetiology of Budd-Chiari syndrome: hypercoagulable states, myeloproliferative disorders, oral contraceptives, and idiopathic causes'
          },
          {
            id: '2.2.1.3.4.2-2',
            text: 'Know the clinical presentation and imaging features of Budd-Chiari syndrome'
          },
          {
            id: '2.2.1.3.4.2-3',
            text: 'Understand the treatment algorithm for Budd-Chiari syndrome: anticoagulation, angioplasty/stenting of hepatic vein stenosis, TIPS, and liver transplantation'
          }
        ]
      },
      {
        id: '2.2.1.3.5',
        number: '2.2.1.3.5',
        title: 'Gonadal Venous Interventions',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.1.3.5-1',
            text: 'Understand the anatomy of gonadal veins and the pathophysiology of varicocele and pelvic congestion syndrome'
          },
          {
            id: '2.2.1.3.5-2',
            text: 'Know the indications for varicocele embolization: symptomatic varicocele, infertility, and scrotal pain'
          },
          {
            id: '2.2.1.3.5-3',
            text: 'Understand the technique of gonadal vein embolization including embolic agents (coils, sclerosants)'
          },
          {
            id: '2.2.1.3.5-4',
            text: 'Know the outcomes and complications of varicocele embolization'
          },
          {
            id: '2.2.1.3.5-5',
            text: 'Understand pelvic congestion syndrome: presentation, diagnosis, and treatment with ovarian vein embolization'
          }
        ]
      },
      {
        id: '2.2.1.3.6',
        number: '2.2.1.3.6',
        title: 'Haemodialysis Vascular Access',
        frequency: 'green',
        knowledgeEndpoints: [
          {
            id: '2.2.1.3.6-1',
            text: 'Understand the types of dialysis access: native arteriovenous fistula (AVF), arteriovenous graft (AVG), and central venous catheters'
          },
          {
            id: '2.2.1.3.6-2',
            text: 'Know the criteria for fistula maturation and the causes of non-maturation'
          },
          {
            id: '2.2.1.3.6-3',
            text: 'Understand the causes of dialysis access dysfunction: stenosis, thrombosis, aneurysm, and steal syndrome'
          },
          {
            id: '2.2.1.3.6-4',
            text: 'Know the techniques for dialysis access intervention: fistulography, angioplasty, thrombectomy, and stent-graft placement'
          },
          {
            id: '2.2.1.3.6-5',
            text: 'Understand dialysis access steal syndrome and treatment options: banding, DRIL procedure, and access ligation'
          },
          {
            id: '2.2.1.3.6-6',
            text: 'Know the indications and technique for percutaneous AVF creation (EndoAVF)'
          }
        ]
      },
      {
        id: '2.2.1.3.7',
        number: '2.2.1.3.7',
        title: 'Central Venous Access',
        frequency: 'green',
        knowledgeEndpoints: [
          {
            id: '2.2.1.3.7-1',
            text: 'Understand the indications for central venous access devices: chemotherapy, parenteral nutrition, haemodialysis, and long-term IV therapy'
          },
          {
            id: '2.2.1.3.7-2',
            text: 'Know the types of central venous access devices: tunnelled catheters, non-tunnelled catheters, ports, and PICCs'
          },
          {
            id: '2.2.1.3.7-3',
            text: 'Understand the anatomy and preferred sites for central venous access: internal jugular, subclavian, and femoral veins'
          },
          {
            id: '2.2.1.3.7-4',
            text: 'Know the technique of ultrasound-guided central venous catheter insertion including tip positioning'
          },
          {
            id: '2.2.1.3.7-5',
            text: 'Know the complications of central venous access: pneumothorax, haemothorax, catheter malposition, infection, thrombosis, and catheter fracture'
          },
          {
            id: '2.2.1.3.7-6',
            text: 'Understand the management of central line complications including catheter exchange and fibrin sheath stripping'
          }
        ]
      },
      {
        id: '2.2.1.3.8',
        number: '2.2.1.3.8',
        title: 'Venous Sampling',
        frequency: 'red',
        knowledgeEndpoints: [
          {
            id: '2.2.1.3.8-1',
            text: 'Understand the indications for adrenal venous sampling (AVS) in primary aldosteronism and the technique of selective adrenal vein catheterization'
          },
          {
            id: '2.2.1.3.8-2',
            text: 'Know how to interpret AVS results: lateralization index and selectivity index'
          },
          {
            id: '2.2.1.3.8-3',
            text: 'Understand the indications and technique for petrosal sinus sampling in Cushing syndrome'
          },
          {
            id: '2.2.1.3.8-4',
            text: 'Know the indications for parathyroid venous sampling in localization of parathyroid adenomas'
          }
        ]
      }
    ]
  },
  {
    id: 'section-c',
    letter: 'C',
    title: 'Non-vascular Interventions in the Chest, GI Tract and Hepatobiliary Systems',
    sections: [
      {
        id: '2.2.2.1',
        number: '2.2.2.1',
        title: 'Image-guided Biopsy and Drainage',
        frequency: 'green',
        knowledgeEndpoints: [
          {
            id: '2.2.2.1-1',
            text: 'Understand the indications and contraindications for image-guided biopsy of various organs'
          },
          {
            id: '2.2.2.1-2',
            text: 'Know the choice of imaging guidance (ultrasound, CT, fluoroscopy) for different biopsy targets'
          },
          {
            id: '2.2.2.1-3',
            text: 'Understand needle selection for biopsy: fine needle aspiration (FNA) vs core biopsy; coaxial vs non-coaxial technique'
          },
          {
            id: '2.2.2.1-4',
            text: 'Know the complications of image-guided biopsy: haemorrhage, pneumothorax, tumour seeding, and organ injury'
          },
          {
            id: '2.2.2.1-5',
            text: 'Understand the technique of transjugular liver biopsy: indications (coagulopathy, ascites), technique, and complications'
          },
          {
            id: '2.2.2.1-6',
            text: 'Know the factors affecting diagnostic yield of biopsies and how to optimize sample adequacy'
          }
        ]
      },
      {
        id: '2.2.2.2',
        number: '2.2.2.2',
        title: 'Lymphatic Embolization',
        frequency: 'red',
        knowledgeEndpoints: [
          {
            id: '2.2.2.2-1',
            text: 'Understand the anatomy of the thoracic duct and lymphatic system'
          },
          {
            id: '2.2.2.2-2',
            text: 'Know the causes of chylothorax and chylous ascites: traumatic, surgical, and non-traumatic'
          },
          {
            id: '2.2.2.2-3',
            text: 'Understand the technique of lymphangiography and thoracic duct embolization'
          },
          {
            id: '2.2.2.2-4',
            text: 'Know the embolic agents used for lymphatic embolization: glue, coils, and Onyx'
          }
        ]
      },
      {
        id: '2.2.2.3',
        number: '2.2.2.3',
        title: 'Image-guided Aspiration and Drainage of Collections',
        frequency: 'green',
        knowledgeEndpoints: [
          {
            id: '2.2.2.3-1',
            text: 'Know the indications for percutaneous drainage of fluid collections and abscesses'
          },
          {
            id: '2.2.2.3-2',
            text: 'Understand the imaging characteristics that differentiate abscess from other collections'
          },
          {
            id: '2.2.2.3-3',
            text: 'Know the technique of percutaneous drainage including access route selection, catheter sizing, and securing methods'
          },
          {
            id: '2.2.2.3-4',
            text: 'Understand the Seldinger vs trocar technique for drain placement'
          },
          {
            id: '2.2.2.3-5',
            text: 'Know the management of drains post-procedure: flushing, repositioning, upsizing, and removal criteria'
          },
          {
            id: '2.2.2.3-6',
            text: 'Understand the complications of percutaneous drainage: haemorrhage, bowel injury, fistula formation, and sepsis'
          }
        ]
      },
      {
        id: '2.2.2.4.1',
        number: '2.2.2.4.1',
        title: 'Enteral Tube Placement',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.2.4.1-1',
            text: 'Know the indications for percutaneous gastrostomy (PEG) and radiologically-inserted gastrostomy (RIG)'
          },
          {
            id: '2.2.2.4.1-2',
            text: 'Understand the contraindications: coagulopathy, interposed organs, ascites, gastric varices'
          },
          {
            id: '2.2.2.4.1-3',
            text: 'Know the technique of fluoroscopically-guided gastrostomy insertion'
          },
          {
            id: '2.2.2.4.1-4',
            text: 'Understand the indications and technique for gastrojejunostomy and jejunostomy'
          },
          {
            id: '2.2.2.4.1-5',
            text: 'Know the complications: peritonitis, tube dislodgement, buried bumper syndrome, and aspiration'
          },
          {
            id: '2.2.2.4.1-6',
            text: 'Understand post-procedure care and tube management'
          }
        ]
      },
      {
        id: '2.2.2.4.2',
        number: '2.2.2.4.2',
        title: 'Gastrointestinal Stenting',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.2.4.2-1',
            text: 'Know the indications for oesophageal stenting: malignant obstruction, fistulae, and post-operative leaks'
          },
          {
            id: '2.2.2.4.2-2',
            text: 'Understand the types of oesophageal stents: covered vs uncovered, and their indications'
          },
          {
            id: '2.2.2.4.2-3',
            text: 'Know the indications and technique for gastroduodenal stenting'
          },
          {
            id: '2.2.2.4.2-4',
            text: 'Understand colonic stenting: indications (malignant obstruction, bridge to surgery), technique, and contraindications'
          },
          {
            id: '2.2.2.4.2-5',
            text: 'Know the complications of GI stenting: perforation, migration, tumour ingrowth/overgrowth, and bleeding'
          }
        ]
      },
      {
        id: '2.2.2.5',
        number: '2.2.2.5',
        title: 'Hepato-pancreatico-biliary (HPB) Intervention',
        frequency: 'green',
        knowledgeEndpoints: [
          {
            id: '2.2.2.5-1',
            text: 'Understand the anatomy of the biliary tree and variants'
          },
          {
            id: '2.2.2.5-2',
            text: 'Know the indications for percutaneous biliary drainage: obstructive jaundice, cholangitis, bile leak, and preoperative decompression'
          },
          {
            id: '2.2.2.5-3',
            text: 'Understand the technique of percutaneous transhepatic cholangiography (PTC) and biliary drainage'
          },
          {
            id: '2.2.2.5-4',
            text: 'Know the difference between external, internal-external, and internal (stent) drainage'
          },
          {
            id: '2.2.2.5-5',
            text: 'Understand biliary stent types: plastic vs metallic, covered vs uncovered'
          },
          {
            id: '2.2.2.5-6',
            text: 'Know the management of biliary strictures: benign vs malignant, balloon dilatation, and stenting'
          },
          {
            id: '2.2.2.5-7',
            text: 'Understand the complications of biliary intervention: haemorrhage, biliary peritonitis, cholangitis, and pancreatitis'
          },
          {
            id: '2.2.2.5-8',
            text: 'Know the technique of percutaneous cholecystostomy: indications and technique'
          }
        ]
      }
    ]
  },
  {
    id: 'section-d',
    letter: 'D',
    title: 'Intervention of the Genito-urinary Tract and Renal Transplants',
    sections: [
      {
        id: '2.2.3.1',
        number: '2.2.3.1',
        title: 'Pelvicalyceal and Ureteric Obstruction',
        frequency: 'green',
        knowledgeEndpoints: [
          {
            id: '2.2.3.1-1',
            text: 'Understand the causes of urinary tract obstruction: calculi, malignancy, stricture, and extrinsic compression'
          },
          {
            id: '2.2.3.1-2',
            text: 'Know the clinical presentation of obstructive uropathy and indications for urgent decompression'
          },
          {
            id: '2.2.3.1-3',
            text: 'Understand the technique of percutaneous nephrostomy: patient positioning, access site selection (Brodel\'s line), and catheter placement'
          },
          {
            id: '2.2.3.1-4',
            text: 'Know the complications of nephrostomy: haemorrhage, sepsis, pleural injury, and catheter dislodgement'
          },
          {
            id: '2.2.3.1-5',
            text: 'Understand the technique of antegrade ureteric stent insertion'
          },
          {
            id: '2.2.3.1-6',
            text: 'Know the indications and technique for ureteric dilatation and metallic stent placement'
          }
        ]
      },
      {
        id: '2.2.3.2',
        number: '2.2.3.2',
        title: 'Renal Stone Disease',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.3.2-1',
            text: 'Understand the role of percutaneous nephrolithotomy (PCNL) and the IR role in access creation'
          },
          {
            id: '2.2.3.2-2',
            text: 'Know the optimal access site and technique for PCNL tract creation'
          },
          {
            id: '2.2.3.2-3',
            text: 'Understand the complications of percutaneous stone treatment: haemorrhage and collecting system injury'
          }
        ]
      },
      {
        id: '2.2.3.3',
        number: '2.2.3.3',
        title: 'Renal Masses and Perirenal Collections',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.3.3-1',
            text: 'Know the indications for percutaneous renal biopsy and the technique including native vs transplant kidney'
          },
          {
            id: '2.2.3.3-2',
            text: 'Understand the imaging features of renal masses and indications for biopsy'
          },
          {
            id: '2.2.3.3-3',
            text: 'Know the technique of drainage of perirenal and pararenal collections'
          },
          {
            id: '2.2.3.3-4',
            text: 'Understand the management of renal cysts: aspiration, sclerotherapy'
          }
        ]
      },
      {
        id: '2.2.3.4',
        number: '2.2.3.4',
        title: 'Genito-urinary Interventions',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.3.4-1',
            text: 'Know the indications and technique for suprapubic catheter insertion'
          },
          {
            id: '2.2.3.4-2',
            text: 'Understand the management of urinomas and urinary leaks'
          },
          {
            id: '2.2.3.4-3',
            text: 'Know the technique of percutaneous drainage of prostatic abscess'
          }
        ]
      },
      {
        id: '2.2.3.5',
        number: '2.2.3.5',
        title: 'Renal Transplant Interventions',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.3.5-1',
            text: 'Understand the surgical anatomy of renal transplants and common vascular anastomotic configurations'
          },
          {
            id: '2.2.3.5-2',
            text: 'Know the causes of transplant dysfunction: acute rejection, vascular complications, and ureteric obstruction'
          },
          {
            id: '2.2.3.5-3',
            text: 'Understand the technique of transplant renal artery angioplasty and stenting'
          },
          {
            id: '2.2.3.5-4',
            text: 'Know the management of transplant renal artery stenosis and its differentiation from rejection'
          },
          {
            id: '2.2.3.5-5',
            text: 'Understand the management of peritransplant collections: lymphocele, haematoma, urinoma'
          },
          {
            id: '2.2.3.5-6',
            text: 'Know the technique of transplant kidney biopsy'
          }
        ]
      }
    ]
  },
  {
    id: 'section-e',
    letter: 'E',
    title: 'Intervention of the Musculoskeletal System',
    sections: [
      {
        id: '2.2.4.1',
        number: '2.2.4.1',
        title: 'Image-guided MSK Biopsy',
        frequency: 'green',
        knowledgeEndpoints: [
          {
            id: '2.2.4.1-1',
            text: 'Know the indications for bone and soft tissue biopsy'
          },
          {
            id: '2.2.4.1-2',
            text: 'Understand the importance of biopsy tract planning in musculoskeletal tumours to avoid compromising future surgical resection'
          },
          {
            id: '2.2.4.1-3',
            text: 'Know the choice of needle and technique for bone biopsy: coaxial technique, bone biopsy systems'
          },
          {
            id: '2.2.4.1-4',
            text: 'Understand the complications of MSK biopsy: tumour seeding, fracture, and neurovascular injury'
          }
        ]
      },
      {
        id: '2.2.4.2',
        number: '2.2.4.2',
        title: 'Percutaneous Ablation of Bone and Soft Tissue Lesions',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.4.2-1',
            text: 'Know the indications for percutaneous ablation of musculoskeletal tumours: osteoid osteoma, bone metastases, and soft tissue tumours'
          },
          {
            id: '2.2.4.2-2',
            text: 'Understand the ablation modalities: radiofrequency ablation (RFA), microwave ablation (MWA), and cryoablation'
          },
          {
            id: '2.2.4.2-3',
            text: 'Know the techniques for protecting adjacent structures during ablation: hydrodissection, CO2 dissection, and thermal monitoring'
          },
          {
            id: '2.2.4.2-4',
            text: 'Understand the outcomes and complications of bone ablation'
          }
        ]
      },
      {
        id: '2.2.4.3',
        number: '2.2.4.3',
        title: 'Intra-articular Injections',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.4.3-1',
            text: 'Know the indications for image-guided intra-articular injections: diagnostic and therapeutic'
          },
          {
            id: '2.2.4.3-2',
            text: 'Understand the technique of joint injection under fluoroscopic or ultrasound guidance'
          },
          {
            id: '2.2.4.3-3',
            text: 'Know the agents used: corticosteroids, local anaesthetics, hyaluronic acid, and contrast'
          },
          {
            id: '2.2.4.3-4',
            text: 'Understand the complications: infection, bleeding, and post-injection flare'
          }
        ]
      },
      {
        id: '2.2.4.4',
        number: '2.2.4.4',
        title: 'Percutaneous Osteoplasty',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.4.4-1',
            text: 'Know the indications for percutaneous osteoplasty: pathological fractures, painful bone metastases, and structural reinforcement'
          },
          {
            id: '2.2.4.4-2',
            text: 'Understand the technique of cement injection including cement preparation and delivery'
          },
          {
            id: '2.2.4.4-3',
            text: 'Know the complications: cement leakage, embolism, and infection'
          },
          {
            id: '2.2.4.4-4',
            text: 'Understand the role of cementoplasty in combination with ablation for bone metastases'
          }
        ]
      },
      {
        id: '2.2.4.5.1',
        number: '2.2.4.5.1',
        title: 'Vertebral Body Compression Fractures (VBCF)',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.4.5.1-1',
            text: 'Understand the indications for vertebroplasty and kyphoplasty: osteoporotic compression fractures, painful vertebral metastases'
          },
          {
            id: '2.2.4.5.1-2',
            text: 'Know the contraindications: asymptomatic fractures, active infection, severe coagulopathy, and retropulsion of fragments'
          },
          {
            id: '2.2.4.5.1-3',
            text: 'Understand the technique of vertebroplasty: approach (transpedicular vs extrapedicular), cement injection, and endpoint'
          },
          {
            id: '2.2.4.5.1-4',
            text: 'Know the difference between vertebroplasty and balloon kyphoplasty'
          },
          {
            id: '2.2.4.5.1-5',
            text: 'Know the complications: cement leakage (venous, discal, epidural), pulmonary embolism, infection, and adjacent level fractures'
          }
        ]
      },
      {
        id: '2.2.4.5.2',
        number: '2.2.4.5.2',
        title: 'Spinal Procedures for Disc, Nerves and Facet Joints',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.4.5.2-1',
            text: 'Know the indications for epidural steroid injection and selective nerve root block'
          },
          {
            id: '2.2.4.5.2-2',
            text: 'Understand the technique of interlaminar vs transforaminal epidural injection'
          },
          {
            id: '2.2.4.5.2-3',
            text: 'Know the indications and technique for facet joint injection and medial branch block'
          },
          {
            id: '2.2.4.5.2-4',
            text: 'Understand sacroiliac joint injection technique'
          },
          {
            id: '2.2.4.5.2-5',
            text: 'Know the complications of spinal injections: infection, haematoma, nerve injury, and dural puncture'
          }
        ]
      }
    ]
  },
  {
    id: 'section-f',
    letter: 'F',
    title: 'Interventional Oncology (IO)',
    sections: [
      {
        id: '2.2.5.1',
        number: '2.2.5.1',
        title: 'Fundamental IO',
        frequency: 'green',
        knowledgeEndpoints: [
          {
            id: '2.2.5.1-1',
            text: 'Understand the role of interventional oncology in the multidisciplinary cancer team'
          },
          {
            id: '2.2.5.1-2',
            text: 'Know the principles of tumour staging and how IO treatments fit into oncological management algorithms'
          },
          {
            id: '2.2.5.1-3',
            text: 'Understand the concepts of curative vs palliative IO treatments'
          },
          {
            id: '2.2.5.1-4',
            text: 'Know the imaging criteria for assessing treatment response: RECIST, mRECIST, and other response criteria'
          },
          {
            id: '2.2.5.1-5',
            text: 'Understand the principles of patient selection for IO treatments including performance status assessment'
          },
          {
            id: '2.2.5.1-6',
            text: 'Know the principles of follow-up imaging after IO treatments and how to interpret post-treatment imaging changes'
          }
        ]
      },
      {
        id: '2.2.5.2',
        number: '2.2.5.2',
        title: 'Vascular Interventional Oncology',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.5.2-1',
            text: 'Understand the principles of transarterial chemoembolization (TACE): conventional TACE (cTACE) vs drug-eluting bead TACE (DEB-TACE)'
          },
          {
            id: '2.2.5.2-2',
            text: 'Know the indications for TACE in hepatocellular carcinoma (HCC): BCLC staging system and patient selection'
          },
          {
            id: '2.2.5.2-3',
            text: 'Understand the technique of TACE: selective catheterization, chemotherapeutic agents, embolic agents, and endpoints'
          },
          {
            id: '2.2.5.2-4',
            text: 'Know the complications of TACE: post-embolization syndrome, liver failure, biliary injury, and non-target embolization'
          },
          {
            id: '2.2.5.2-5',
            text: 'Understand the indications and technique of transarterial radioembolization (TARE/SIRT) with Y90'
          },
          {
            id: '2.2.5.2-6',
            text: 'Know the pre-treatment workup for Y90: hepatic angiography, MAA scan, and dosimetry'
          },
          {
            id: '2.2.5.2-7',
            text: 'Understand the role of bland embolization in liver tumours and other malignancies'
          },
          {
            id: '2.2.5.2-8',
            text: 'Know the indications for chemoembolization of metastatic disease: colorectal liver metastases, neuroendocrine tumour metastases'
          }
        ]
      },
      {
        id: '2.2.5.3.1',
        number: '2.2.5.3.1',
        title: 'Non-vascular IO: Malignant Chest and Abdominal Disease',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.5.3.1-1',
            text: 'Know the indications for percutaneous ablation of liver tumours: HCC, colorectal metastases, and other metastases'
          },
          {
            id: '2.2.5.3.1-2',
            text: 'Understand the ablation modalities: radiofrequency ablation (RFA), microwave ablation (MWA), cryoablation, and irreversible electroporation (IRE)'
          },
          {
            id: '2.2.5.3.1-3',
            text: 'Know the factors affecting ablation zone size: tissue properties, heat-sink effect, and electrode design'
          },
          {
            id: '2.2.5.3.1-4',
            text: 'Understand the technique of liver ablation: planning, targeting, ablation zone assessment'
          },
          {
            id: '2.2.5.3.1-5',
            text: 'Know the complications of liver ablation: bleeding, bile duct injury, abscess, tumour seeding, and thermal injury to adjacent structures'
          },
          {
            id: '2.2.5.3.1-6',
            text: 'Understand the indications and technique of lung ablation for primary and metastatic lung tumours'
          },
          {
            id: '2.2.5.3.1-7',
            text: 'Know the indications for renal tumour ablation and the technique'
          }
        ]
      },
      {
        id: '2.2.5.3.2',
        number: '2.2.5.3.2',
        title: 'Non-vascular IO: Malignant Biliary Disease',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.5.3.2-1',
            text: 'Know the indications for biliary drainage in malignant obstruction: cholangiocarcinoma, pancreatic cancer, metastatic disease'
          },
          {
            id: '2.2.5.3.2-2',
            text: 'Understand the role of preoperative biliary drainage in hilar cholangiocarcinoma'
          },
          {
            id: '2.2.5.3.2-3',
            text: 'Know the technique and outcomes of biliary stenting for palliation of malignant obstruction'
          },
          {
            id: '2.2.5.3.2-4',
            text: 'Understand the role of intraluminal brachytherapy and photodynamic therapy in biliary malignancies'
          }
        ]
      },
      {
        id: '2.2.5.3.3',
        number: '2.2.5.3.3',
        title: 'Non-vascular IO: Prostate Cancer',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.5.3.3-1',
            text: 'Understand the role of image-guided biopsy in prostate cancer diagnosis: transrectal vs transperineal, systematic vs targeted'
          },
          {
            id: '2.2.5.3.3-2',
            text: 'Know the indications for focal therapy of prostate cancer: patient selection and treatment modalities'
          },
          {
            id: '2.2.5.3.3-3',
            text: 'Understand the techniques of prostate ablation: cryotherapy, HIFU, and focal laser ablation'
          }
        ]
      },
      {
        id: '2.2.5.3.4',
        number: '2.2.5.3.4',
        title: 'Non-vascular IO: Malignant Musculoskeletal Disease',
        frequency: 'yellow',
        knowledgeEndpoints: [
          {
            id: '2.2.5.3.4-1',
            text: 'Know the indications for percutaneous treatment of bone metastases: pain palliation, structural stabilization, and local tumour control'
          },
          {
            id: '2.2.5.3.4-2',
            text: 'Understand the technique of combined ablation and cementoplasty for bone metastases'
          },
          {
            id: '2.2.5.3.4-3',
            text: 'Know the role of cryoablation in bone metastases and its advantages'
          },
          {
            id: '2.2.5.3.4-4',
            text: 'Understand the assessment of fracture risk in bone metastases (Mirels scoring system)'
          },
          {
            id: '2.2.5.3.4-5',
            text: 'Know the techniques for spinal metastases treatment: vertebroplasty, ablation, and separation surgery concepts'
          }
        ]
      }
    ]
  }
]
