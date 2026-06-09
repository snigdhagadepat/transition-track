export interface Course {
  id: string
  college: string
  collegeCode: string
  name: string
  code: string
  points: number
  duration: number
  subjectArea: string
  careerPaths: string[]
  description: string
}

export const courses: Course[] = [
  // UCD
  { id: 'ucd-medicine', college: 'University College Dublin', collegeCode: 'UCD', name: 'Medicine', code: 'DN100', points: 614, duration: 6, subjectArea: 'Health', careerPaths: ['Medicine', 'Research', 'Surgery'], description: 'One of Ireland\'s most prestigious medical programmes with world-class research facilities.' },
  { id: 'ucd-cs', college: 'University College Dublin', collegeCode: 'UCD', name: 'Computer Science', code: 'DN200', points: 520, duration: 4, subjectArea: 'Technology', careerPaths: ['Software Engineering', 'Data Science', 'AI Research'], description: 'Covers algorithms, systems, AI, and software engineering with strong industry links.' },
  { id: 'ucd-law', college: 'University College Dublin', collegeCode: 'UCD', name: 'Law', code: 'DN550', points: 540, duration: 4, subjectArea: 'Legal', careerPaths: ['Solicitor', 'Barrister', 'Legal Consultant'], description: 'Ireland\'s leading law school with excellent mooting and internship opportunities.' },
  { id: 'ucd-commerce', college: 'University College Dublin', collegeCode: 'UCD', name: 'Commerce', code: 'DN300', points: 505, duration: 4, subjectArea: 'Business', careerPaths: ['Finance', 'Management', 'Marketing', 'Accounting'], description: 'Broad business foundation with specialisations in finance, accounting, and marketing.' },
  { id: 'ucd-arch', college: 'University College Dublin', collegeCode: 'UCD', name: 'Architecture', code: 'DN030', points: 495, duration: 5, subjectArea: 'Creative', careerPaths: ['Architecture', 'Urban Design', 'Project Management'], description: 'Studio-based learning combining design creativity with technical precision.' },

  // TCD
  { id: 'tcd-medicine', college: 'Trinity College Dublin', collegeCode: 'TCD', name: 'Medicine', code: 'TR071', points: 612, duration: 6, subjectArea: 'Health', careerPaths: ['Medicine', 'Research', 'Global Health'], description: 'Trinity\'s medical school is one of the oldest in Ireland with outstanding clinical placements.' },
  { id: 'tcd-cs', college: 'Trinity College Dublin', collegeCode: 'TCD', name: 'Computer Science', code: 'TR048', points: 540, duration: 4, subjectArea: 'Technology', careerPaths: ['Software Engineering', 'Cybersecurity', 'AI'], description: 'Taught by world-leading researchers in the heart of Dublin\'s tech hub.' },
  { id: 'tcd-law', college: 'Trinity College Dublin', collegeCode: 'TCD', name: 'Law', code: 'TR004', points: 540, duration: 4, subjectArea: 'Legal', careerPaths: ['Barrister', 'Solicitor', 'International Law'], description: 'Renowned for producing leading barristers and international legal professionals.' },
  { id: 'tcd-psychology', college: 'Trinity College Dublin', collegeCode: 'TCD', name: 'Psychology', code: 'TR013', points: 500, duration: 4, subjectArea: 'Science', careerPaths: ['Clinical Psychology', 'Research', 'Counselling'], description: 'Rich in research, covering cognitive, clinical, and developmental psychology.' },

  // UCC
  { id: 'ucc-medicine', college: 'University College Cork', collegeCode: 'UCC', name: 'Medicine', code: 'CK101', points: 608, duration: 6, subjectArea: 'Health', careerPaths: ['Medicine', 'Surgery', 'GP'], description: 'Award-winning medical school with community-based learning across Munster.' },
  { id: 'ucc-law', college: 'University College Cork', collegeCode: 'UCC', name: 'Law', code: 'CK101', points: 495, duration: 4, subjectArea: 'Legal', careerPaths: ['Solicitor', 'Corporate Law', 'EU Law'], description: 'Strong focus on EU law and international commercial law.' },
  { id: 'ucc-pharmacy', college: 'University College Cork', collegeCode: 'UCC', name: 'Pharmacy', code: 'CK731', points: 530, duration: 5, subjectArea: 'Health', careerPaths: ['Pharmacist', 'Clinical Trials', 'Healthcare Management'], description: 'The only pharmacy school in Munster with exceptional clinical training.' },
  { id: 'ucc-nursing', college: 'University College Cork', collegeCode: 'UCC', name: 'Nursing (General)', code: 'CK802', points: 380, duration: 4, subjectArea: 'Health', careerPaths: ['Staff Nurse', 'Nurse Manager', 'Advanced Nurse Practitioner'], description: 'Integrated practice placements in Cork University Hospital and beyond.' },

  // DCU
  { id: 'dcu-journalism', college: 'Dublin City University', collegeCode: 'DCU', name: 'Journalism', code: 'DC116', points: 390, duration: 4, subjectArea: 'Creative', careerPaths: ['Journalist', 'Broadcaster', 'Digital Media'], description: 'Ireland\'s leading journalism school with state-of-the-art broadcast studios.' },
  { id: 'dcu-cs', college: 'Dublin City University', collegeCode: 'DCU', name: 'Computer Science', code: 'DC206', points: 440, duration: 4, subjectArea: 'Technology', careerPaths: ['Software Developer', 'Systems Architect', 'Data Engineer'], description: 'Practical, industry-focused computing with strong placement programmes.' },
  { id: 'dcu-business', college: 'Dublin City University', collegeCode: 'DCU', name: 'Business Studies', code: 'DC114', points: 400, duration: 4, subjectArea: 'Business', careerPaths: ['Management', 'Entrepreneurship', 'HR', 'Marketing'], description: 'Combines core business skills with a year of international study or internship.' },
  { id: 'dcu-teaching', college: 'Dublin City University', collegeCode: 'DCU', name: 'Education (Secondary)', code: 'DC204', points: 350, duration: 4, subjectArea: 'Education', careerPaths: ['Secondary Teacher', 'Special Education', 'School Counsellor'], description: 'Train to teach in secondary schools across Ireland with excellent mentorship.' },

  // NUIG (University of Galway)
  { id: 'nuig-medicine', college: 'University of Galway', collegeCode: 'NUIG', name: 'Medicine', code: 'GY101', points: 600, duration: 6, subjectArea: 'Health', careerPaths: ['Medicine', 'Research', 'Rural Medicine'], description: 'Community-engaged medical training in the west of Ireland.' },
  { id: 'nuig-engineering', college: 'University of Galway', collegeCode: 'NUIG', name: 'Engineering', code: 'GY402', points: 460, duration: 4, subjectArea: 'Engineering', careerPaths: ['Civil Engineer', 'Mechanical Engineer', 'Project Manager'], description: 'Broad first year then specialise in civil, mechanical, electrical, or biomedical.' },
  { id: 'nuig-arts', college: 'University of Galway', collegeCode: 'NUIG', name: 'Arts', code: 'GY101', points: 320, duration: 3, subjectArea: 'Arts', careerPaths: ['Teaching', 'Journalism', 'Public Sector', 'Postgraduate Research'], description: 'Flexible degree combining humanities, social science, and language subjects.' },

  // UL
  { id: 'ul-engineering', college: 'University of Limerick', collegeCode: 'UL', name: 'Engineering (Common Entry)', code: 'LM040', points: 390, duration: 4, subjectArea: 'Engineering', careerPaths: ['Mechanical Engineer', 'Electronic Engineer', 'Industrial Engineer'], description: 'Ireland\'s top co-op engineering programme with guaranteed paid work placement.' },
  { id: 'ul-sport', college: 'University of Limerick', collegeCode: 'UL', name: 'Sport & Exercise Science', code: 'LM130', points: 360, duration: 4, subjectArea: 'Sport', careerPaths: ['Physiotherapist', 'Sports Coach', 'Health Promotion', 'Performance Analyst'], description: 'Combines physiology, biomechanics, and psychology in state-of-the-art facilities.' },
  { id: 'ul-business', college: 'University of Limerick', collegeCode: 'UL', name: 'Business (Common Entry)', code: 'LM050', points: 370, duration: 4, subjectArea: 'Business', careerPaths: ['Management', 'Finance', 'Supply Chain', 'International Business'], description: 'Structured co-op gives you 8 months of real industry experience before you graduate.' },

  // Maynooth University
  { id: 'mu-psychology', college: 'Maynooth University', collegeCode: 'MU', name: 'Psychology', code: 'MH101', points: 395, duration: 4, subjectArea: 'Science', careerPaths: ['Psychologist', 'Social Worker', 'HR', 'Research'], description: 'Strong research culture with excellent staff-to-student ratios.' },
  { id: 'mu-cs', college: 'Maynooth University', collegeCode: 'MU', name: 'Computer Science & Software Engineering', code: 'MH201', points: 380, duration: 4, subjectArea: 'Technology', careerPaths: ['Software Engineer', 'DevOps', 'Cybersecurity'], description: 'Modern, practical curriculum with close ties to the Maynooth tech cluster.' },
  { id: 'mu-education', college: 'Maynooth University', collegeCode: 'MU', name: 'Education (Primary)', code: 'MH601', points: 350, duration: 4, subjectArea: 'Education', careerPaths: ['Primary Teacher', 'Special Education', 'School Leadership'], description: 'Ireland\'s largest primary teacher education programme.' },

  // TU Dublin
  { id: 'tud-design', college: 'Technological University Dublin', collegeCode: 'TU Dublin', name: 'Visual Communication Design', code: 'TU856', points: 280, duration: 4, subjectArea: 'Creative', careerPaths: ['Graphic Designer', 'UX Designer', 'Art Director'], description: 'Portfolio-based creative degree in the heart of Dublin\'s creative quarter.' },
  { id: 'tud-culinary', college: 'Technological University Dublin', collegeCode: 'TU Dublin', name: 'Culinary Arts', code: 'TU866', points: 240, duration: 4, subjectArea: 'Hospitality', careerPaths: ['Chef', 'Food Entrepreneur', 'Food Stylist', 'Nutrition Consultant'], description: 'Train in professional kitchens with award-winning chefs and industry mentors.' },
  { id: 'tud-electrical', college: 'Technological University Dublin', collegeCode: 'TU Dublin', name: 'Electrical Engineering', code: 'TU731', points: 300, duration: 4, subjectArea: 'Engineering', careerPaths: ['Electrical Engineer', 'Renewable Energy', 'Automation'], description: 'Hands-on electrical engineering with strong renewable energy and automation tracks.' },

  // RCSI
  { id: 'rcsi-medicine', college: 'RCSI University of Medicine & Health Sciences', collegeCode: 'RCSI', name: 'Medicine', code: 'SM001', points: 599, duration: 6, subjectArea: 'Health', careerPaths: ['Surgeon', 'GP', 'Specialist Medicine'], description: 'World-ranked medical school with campuses in Dublin, Bahrain, and Malaysia.' },
  { id: 'rcsi-pharmacy', college: 'RCSI University of Medicine & Health Sciences', collegeCode: 'RCSI', name: 'Pharmacy', code: 'SM002', points: 490, duration: 5, subjectArea: 'Health', careerPaths: ['Hospital Pharmacist', 'Community Pharmacist', 'Industry'], description: 'Pharmacy training with unrivalled hospital access in the Royal College of Surgeons.' },
]

export const colleges = [...new Set(courses.map(c => c.collegeCode))]
export const subjectAreas = [...new Set(courses.map(c => c.subjectArea))]
