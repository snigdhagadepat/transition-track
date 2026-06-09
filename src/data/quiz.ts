export interface QuizQuestion {
  id: number
  question: string
  options: { label: string; scores: Record<string, number> }[]
}

export interface QuizCategory {
  id: string
  label: string
  careers: string[]
}

export const quizCategories: QuizCategory[] = [
  { id: 'health', label: 'Health & Medicine', careers: ['Medicine', 'Nursing', 'Pharmacy', 'Veterinary Medicine', 'Psychology'] },
  { id: 'tech', label: 'Technology & Data', careers: ['Software Engineering', 'Data Science'] },
  { id: 'creative', label: 'Creative & Design', careers: ['Architecture', 'Graphic Design', 'Journalism & Media'] },
  { id: 'business', label: 'Business & Finance', careers: ['Business & Finance'] },
  { id: 'legal', label: 'Law & Justice', careers: ['Law'] },
  { id: 'engineering', label: 'Engineering & Trades', careers: ['Civil Engineering', 'Electrical Trades'] },
  { id: 'education', label: 'Education & People', careers: ['Secondary School Teaching'] },
]

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'You have a free Saturday. What are you most likely doing?',
    options: [
      { label: 'Volunteering at the local hospital or charity', scores: { health: 3, education: 1 } },
      { label: 'Building something — an app, a game, or a gadget', scores: { tech: 3, engineering: 2 } },
      { label: 'Drawing, painting, or making music', scores: { creative: 3 } },
      { label: 'Organising a sports event or club meeting', scores: { education: 2, business: 1 } },
    ],
  },
  {
    id: 2,
    question: 'Which school subject do you enjoy most?',
    options: [
      { label: 'Biology or Chemistry', scores: { health: 3 } },
      { label: 'Maths or Computer Science', scores: { tech: 3, engineering: 2 } },
      { label: 'Art or Music', scores: { creative: 3 } },
      { label: 'English or History', scores: { legal: 2, education: 2, creative: 1 } },
    ],
  },
  {
    id: 3,
    question: 'A friend is upset. What do you do?',
    options: [
      { label: 'Listen carefully and offer emotional support', scores: { health: 2, education: 2 } },
      { label: 'Help them solve the problem practically', scores: { tech: 1, engineering: 1, business: 1 } },
      { label: 'Distract them with something creative or fun', scores: { creative: 2 } },
      { label: 'Research options and present them with a plan', scores: { legal: 2, business: 2 } },
    ],
  },
  {
    id: 4,
    question: 'What kind of work environment appeals to you?',
    options: [
      { label: 'A hospital, clinic, or care setting', scores: { health: 3 } },
      { label: 'A tech startup or office with screens everywhere', scores: { tech: 3 } },
      { label: 'A studio, newsroom, or creative agency', scores: { creative: 3 } },
      { label: 'A construction site, lab, or workshop', scores: { engineering: 3 } },
    ],
  },
  {
    id: 5,
    question: 'Your dream project is:',
    options: [
      { label: 'Developing a cure for a disease', scores: { health: 3 } },
      { label: 'Building an app used by millions', scores: { tech: 3 } },
      { label: 'Designing an iconic building', scores: { creative: 2, engineering: 2 } },
      { label: 'Running a successful company', scores: { business: 3 } },
    ],
  },
  {
    id: 6,
    question: 'Which TV show would you binge?',
    options: [
      { label: 'Grey\'s Anatomy or ER', scores: { health: 2 } },
      { label: 'Silicon Valley or Mr. Robot', scores: { tech: 2 } },
      { label: 'The Crown or a documentary series', scores: { legal: 1, education: 1 } },
      { label: 'Grand Designs or The Great British Bake Off', scores: { creative: 2, engineering: 1 } },
    ],
  },
  {
    id: 7,
    question: 'You prefer working:',
    options: [
      { label: 'Directly with people (patients, students, clients)', scores: { health: 2, education: 3 } },
      { label: 'With data, code, or machines', scores: { tech: 3, engineering: 2 } },
      { label: 'With creative media — visuals, words, sound', scores: { creative: 3 } },
      { label: 'In teams making business decisions', scores: { business: 3 } },
    ],
  },
  {
    id: 8,
    question: 'Which skill are you most proud of?',
    options: [
      { label: 'Empathy and communication', scores: { health: 2, education: 2, legal: 1 } },
      { label: 'Problem-solving and logic', scores: { tech: 2, engineering: 2 } },
      { label: 'Creativity and imagination', scores: { creative: 3 } },
      { label: 'Leadership and organisation', scores: { business: 3, education: 1 } },
    ],
  },
  {
    id: 9,
    question: 'Salary matters to you, but so does:',
    options: [
      { label: 'Making a real difference to people\'s lives', scores: { health: 2, education: 2 } },
      { label: 'Building things that last', scores: { tech: 2, engineering: 2 } },
      { label: 'Creative freedom and self-expression', scores: { creative: 2 } },
      { label: 'Power and influence', scores: { legal: 2, business: 2 } },
    ],
  },
  {
    id: 10,
    question: 'In a group project you usually:',
    options: [
      { label: 'Support others and keep morale high', scores: { health: 1, education: 2 } },
      { label: 'Fix the technical problems nobody else can', scores: { tech: 2, engineering: 2 } },
      { label: 'Come up with the creative vision', scores: { creative: 2 } },
      { label: 'Lead and delegate tasks', scores: { business: 2, legal: 1 } },
    ],
  },
  {
    id: 11,
    question: 'Which of these excites you most?',
    options: [
      { label: 'Operating in life-or-death situations', scores: { health: 3 } },
      { label: 'Writing an AI that understands human language', scores: { tech: 3 } },
      { label: 'Designing a logo seen by millions', scores: { creative: 3 } },
      { label: 'Winning a court case for an innocent person', scores: { legal: 3 } },
    ],
  },
  {
    id: 12,
    question: 'You read a news story. Which catches your eye?',
    options: [
      { label: 'New breakthrough in cancer treatment', scores: { health: 2 } },
      { label: 'Tech company launches groundbreaking AI tool', scores: { tech: 2 } },
      { label: 'Artist\'s work sells for €1 million', scores: { creative: 2 } },
      { label: 'Government changes education policy', scores: { education: 2, legal: 1 } },
    ],
  },
  {
    id: 13,
    question: 'How do you feel about exams and study?',
    options: [
      { label: 'I love deep studying — I want to know everything', scores: { health: 2, tech: 1 } },
      { label: 'I prefer practical assignments over written exams', scores: { engineering: 2, creative: 2 } },
      { label: 'I like debating and essay-style questions', scores: { legal: 3, education: 1 } },
      { label: 'I prefer real-world projects and case studies', scores: { business: 2, tech: 1 } },
    ],
  },
  {
    id: 14,
    question: 'Which Irish university would you most like to attend?',
    options: [
      { label: 'TCD or UCD — I want the traditional experience', scores: { legal: 1, health: 1 } },
      { label: 'DCU — close to Dublin\'s tech industry', scores: { tech: 2 } },
      { label: 'UL — I want a co-op work placement', scores: { engineering: 2, business: 1 } },
      { label: 'NCAD or TU Dublin — creative focus', scores: { creative: 3 } },
    ],
  },
  {
    id: 15,
    question: 'Your proudest school moment was:',
    options: [
      { label: 'Helping a classmate understand something difficult', scores: { education: 3, health: 1 } },
      { label: 'Getting a top grade in a STEM subject', scores: { tech: 2, health: 1, engineering: 1 } },
      { label: 'Winning an art, music, or writing competition', scores: { creative: 3 } },
      { label: 'Being elected to student council or leading a team', scores: { business: 2, legal: 1 } },
    ],
  },
  {
    id: 16,
    question: 'Imagine you are 35. Which statement fits you?',
    options: [
      { label: 'I save lives every day at work', scores: { health: 3 } },
      { label: 'My code runs on millions of devices', scores: { tech: 3 } },
      { label: 'My designs are in shops and galleries worldwide', scores: { creative: 3 } },
      { label: 'I run a business I built from scratch', scores: { business: 3 } },
    ],
  },
  {
    id: 17,
    question: 'Which work-experience placement would you grab?',
    options: [
      { label: 'Shadowing a GP or hospital doctor', scores: { health: 3 } },
      { label: 'Interning at a tech startup', scores: { tech: 3 } },
      { label: 'Working at a design agency or newspaper', scores: { creative: 3 } },
      { label: 'Placement at a law firm or accounting office', scores: { legal: 2, business: 2 } },
    ],
  },
  {
    id: 18,
    question: 'Pick your ideal Leaving Cert combination:',
    options: [
      { label: 'Biology, Chemistry, Maths', scores: { health: 3 } },
      { label: 'Maths, Physics, Computer Science', scores: { tech: 3, engineering: 2 } },
      { label: 'Art, English, French', scores: { creative: 3 } },
      { label: 'Business, Accounting, Economics', scores: { business: 3 } },
    ],
  },
  {
    id: 19,
    question: 'What motivates you most at school?',
    options: [
      { label: 'Knowing my work will help other people', scores: { health: 2, education: 2 } },
      { label: 'The challenge of cracking hard problems', scores: { tech: 2, engineering: 2 } },
      { label: 'Being able to express myself creatively', scores: { creative: 3 } },
      { label: 'Competing and coming out on top', scores: { business: 2, legal: 2 } },
    ],
  },
  {
    id: 20,
    question: 'What\'s most important in your future career?',
    options: [
      { label: 'Job security and social impact', scores: { health: 2, education: 2 } },
      { label: 'High salary and career growth', scores: { tech: 2, business: 2 } },
      { label: 'Passion, creativity, and self-expression', scores: { creative: 3 } },
      { label: 'Prestige, influence, and making history', scores: { legal: 3 } },
    ],
  },
]
