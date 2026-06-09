// Pre-written demo responses for Pathfinder — no API key needed.
// Each entry matches on keywords in the user's message.

export interface DemoResponse {
  keywords: string[]
  text: string
  cards: {
    title: string
    location: string
    degreePath: string
    salaryRange: string
    story: string
    emoji: string
  }[]
}

export const demoResponses: DemoResponse[] = [
  {
    keywords: ['biology', 'bio', 'lab', 'labs', 'science'],
    text: `You said biology — and I'm already hearing "future doctor" in your head. **Stop right there.**

A biology degree is one of the most versatile qualifications on the planet, and the majority of the most interesting careers that use it have nothing to do with a stethoscope or a pipette.

Here are 4 careers you almost certainly haven't considered:

**1. Life Sciences Venture Capital Analyst** — Berlin or Boston
You evaluate biotech startups for investment. You read scientific papers in the morning, pitch decks in the afternoon. You never touch a lab again.

**2. Regulatory Affairs Specialist** — Amsterdam or Singapore
You guide drugs and medical devices through the approval process. Pharmaceutical companies pay extremely well for this. Zero lab work.

**3. Science Journalist at a major publication** — London, New York, or remote
Nature, New Scientist, The Guardian Science Desk. You translate complex research for the public. BSc Biology + MA Journalism gets you there.

**4. Computational Biology Product Manager** — Boston, Zurich, or Dublin
You work at a biotech software company, translating what scientists need into what engineers build. BSc Biology + MSc Bioinformatics + 2 years experience = €90k+.

**The key insight:** a biology degree + ONE postgrad pivot opens doors that pure scientists never see.

Do you lean more towards the business/strategy side, or the communication/media side of these?`,
    cards: [
      {
        title: 'Life Sciences VC Analyst',
        location: 'Berlin, Germany',
        degreePath: 'BSc Biology + MSc Biotechnology Management',
        salaryRange: '€65,000–€95,000',
        story: 'Siobhán studied biology in UCC, hated every minute of lab work, did an MSc in biotech management in Munich, and now evaluates drug startups for a Berlin VC fund. She reads scientific papers in the morning and pitch decks in the afternoon.',
        emoji: '🔬',
      },
      {
        title: 'Regulatory Affairs Specialist',
        location: 'Amsterdam, Netherlands',
        degreePath: 'BSc Biology or Pharmacy + MSc Regulatory Affairs',
        salaryRange: '€55,000–€85,000',
        story: 'Ciarán finished his biology degree in Maynooth, did a one-year MSc in Regulatory Affairs online, and landed a job at a Dutch pharmaceutical company. He now helps new medicines get approved across the EU.',
        emoji: '📋',
      },
      {
        title: 'Computational Biology Product Manager',
        location: 'Boston, USA',
        degreePath: 'BSc Biology + MSc Bioinformatics + MBA (optional)',
        salaryRange: '$95,000–$140,000',
        story: 'Aoife studied biology in TCD, taught herself Python, did a part-time MSc in bioinformatics, and joined a genomics startup in Boston as a PM. She bridges the gap between scientists and engineers.',
        emoji: '💻',
      },
    ],
  },
  {
    keywords: ['maths', 'math', 'numbers', 'statistics', 'data', 'accounting'],
    text: `Maths brain — excellent. And before you say "accountant" or "actuary", let me show you what's actually possible.

The world is desperate for people who can think quantitatively AND communicate. That combination is rarer than you think, and it's where the really interesting (and well-paid) careers live.

**1. Quantitative UX Researcher** — Google, Spotify, Amsterdam
You use statistics to understand how millions of people use products. BSc Maths + MSc Human-Computer Interaction. Pays extremely well. Deeply creative.

**2. Climate Finance Analyst** — European Investment Bank, Luxembourg
You model the financial risk of climate change for governments and funds. BSc Maths/Economics + MSc Climate Finance. This field is exploding right now.

**3. Sports Performance Data Scientist** — Premier League clubs, NBA, or Dubai
You analyse player performance data to inform coaching decisions. BSc Maths/Stats + MSc Sport Analytics. Yes, this is a real job. Yes, it pays well.

**4. Algorithmic Trading Researcher** — London, Singapore, Zurich
You build mathematical models for hedge funds. BSc Maths + MSc Financial Maths. The highest-paying graduate path in existence.

What interests you more — working with organisations (finance, policy) or with products/people (tech, sport)?`,
    cards: [
      {
        title: 'Climate Finance Analyst',
        location: 'Luxembourg / Brussels',
        degreePath: 'BSc Mathematics + MSc Climate Finance or Environmental Economics',
        salaryRange: '€60,000–€90,000',
        story: 'Padraig studied maths in UCD, did an MSc in environmental economics in Utrecht, and now works at the European Investment Bank modelling the financial risk of infrastructure projects in flood zones.',
        emoji: '🌍',
      },
      {
        title: 'Sports Performance Data Scientist',
        location: 'Manchester, UK / Dubai',
        degreePath: 'BSc Mathematics or Statistics + MSc Sport Analytics',
        salaryRange: '£55,000–£85,000',
        story: 'Niamh studied statistics in UL, wrote her thesis on GAA player tracking data, and was hired by a Premier League analytics team before she even graduated. She now models fatigue and injury risk.',
        emoji: '⚽',
      },
      {
        title: 'Quantitative UX Researcher',
        location: 'Amsterdam / London / Remote',
        degreePath: 'BSc Maths or Psychology + MSc Human-Computer Interaction',
        salaryRange: '€70,000–€105,000',
        story: 'Eimear hated pure maths but loved understanding people. She combined her stats degree with an HCI masters and landed at Booking.com in Amsterdam running experiments on how 50 million users interact with the site.',
        emoji: '📊',
      },
    ],
  },
  {
    keywords: ['law', 'legal', 'justice', 'rights'],
    text: `Law is one of the most misunderstood degrees out there. Most people think: study law → become a solicitor or barrister. That path exists — but it's one door in a corridor of twenty.

Here's what nobody tells you:

**1. Tech Policy Counsel** — Brussels, London, San Francisco
You advise governments or tech companies on AI regulation, data privacy, and digital rights. Law degree + interest in tech = one of the hottest careers in 2025. The EU AI Act created hundreds of these roles overnight.

**2. International Arbitration Specialist** — Singapore, Dubai, Geneva
You resolve billion-dollar commercial disputes between companies across different countries. BSc Law + LLM International Arbitration. Singapore especially is a global hub for this.

**3. Bioethics Consultant** — WHO Geneva, hospital boards, pharma companies
You advise on the ethical implications of medical decisions, AI diagnostics, and gene editing. Law + Philosophy/Bioethics masters. Genuinely fascinating work.

**4. Climate Litigation Lawyer** — The Hague, New York, anywhere
You sue governments and corporations over climate change. This is a growing and high-profile field — cases are being won at the European Court of Human Rights right now.

Are you drawn more to the corporate/commercial side or the human rights/policy side?`,
    cards: [
      {
        title: 'Tech Policy Counsel',
        location: 'Brussels, Belgium',
        degreePath: 'LLB Law + LLM Technology Law or EU Law',
        salaryRange: '€75,000–€120,000',
        story: 'Fionnuala studied law in TCD, did an LLM in technology law in KU Leuven, and now advises a major tech company on compliance with EU AI regulations. She reads legislation in the morning and reviews AI system documentation in the afternoon.',
        emoji: '⚖️',
      },
      {
        title: 'International Arbitration Specialist',
        location: 'Singapore',
        degreePath: 'LLB Law + LLM International Arbitration',
        salaryRange: 'SGD $110,000–$180,000',
        story: 'Seán did his law degree in UCD, spent a year at the ICC in Paris, did an LLM in Singapore, and never came home. He now resolves commercial disputes worth hundreds of millions between Asian companies.',
        emoji: '🌏',
      },
    ],
  },
  {
    keywords: ['art', 'design', 'creative', 'draw', 'music', 'film', 'media'],
    text: `Creative brain — and before anyone tells you to "have a backup plan", let me show you how wrong that advice is.

The most innovative companies in the world are desperate for people who can think creatively AND understand systems. Here's where that leads:

**1. Experience Design Director** — Tech companies, Amsterdam or Singapore
You design how people feel when they use products — not just how they look. BSc Design + MBA or MSc Human Experience Design. Apple, Airbnb, Booking.com all hire for this.

**2. Creative Strategist at a Global Ad Agency** — London, New York, Dubai
You combine cultural insight with creative thinking to build brand strategies. BA Creative Arts + experience. Wieden+Kennedy, Droga5, BBDO. Pays very well at senior level.

**3. Immersive Experience Designer** — London, LA, Tokyo
You design for theme parks, museums, theatre, and VR. The line between art and technology is vanishing. BSc Design + technical skills in Unity or Unreal Engine.

**4. Design Researcher** — Any major tech company
You study how people behave and translate that into product decisions. This is one of the fastest-growing and best-paid design roles. BA Design + MSc Psychology or Anthropology.

What kind of creative work excites you most — visual, spatial, digital, or storytelling?`,
    cards: [
      {
        title: 'Experience Design Director',
        location: 'Amsterdam, Netherlands',
        degreePath: 'BA Design or Fine Art + MSc Human Experience Design',
        salaryRange: '€85,000–€130,000',
        story: 'Roisín studied visual communication in NCAD, worked at a small Dublin studio, did a masters in Copenhagen, and now leads experience design for a fintech company in Amsterdam. She never picked up a paintbrush again — and she doesn\'t miss it.',
        emoji: '🎨',
      },
      {
        title: 'Immersive Experience Designer',
        location: 'Tokyo, Japan / London, UK',
        degreePath: 'BA Design or Theatre + skills in Unity/Unreal Engine',
        salaryRange: '£55,000–£90,000',
        story: 'Cormac studied drama and design in Limerick, taught himself game engine tools on YouTube, and got hired by a London studio building immersive theatre experiences and museum installations in Tokyo.',
        emoji: '🎭',
      },
    ],
  },
  {
    keywords: ['global', 'abroad', 'international', 'ireland', 'beyond', 'travel', 'world', 'asia', 'middle east', 'europe', 'berlin', 'singapore', 'dubai'],
    text: `Ireland is a brilliant base — but the world is the actual playing field. Here's something most Irish students don't realise: Irish graduates are highly sought after internationally because of the combination of EU citizenship, English fluency, and a reputation for being great to work with.

Here are careers specifically designed to take you global:

**1. International Development Consultant** — UN agencies, World Bank, NGOs
You work on poverty, health, and education projects across Africa, Asia, and Latin America. Based in Geneva, Nairobi, or New York. Needs: any degree + MSc International Development.

**2. Global Mobility Specialist** — Major corporations, Dubai or Singapore
You help companies move employees between countries — visas, tax, culture. Huge demand in the Gulf and Southeast Asia. Any business degree + HR certification.

**3. EU Affairs Manager** — Brussels
You represent Irish companies or organisations to EU institutions. Law, politics, or business degree + fluent in one other EU language. Ireland punches above its weight in Brussels.

**4. Destination Marketing Manager** — Tourism boards worldwide
You market countries and regions to global travellers. Business or arts degree + experience in digital marketing. Can be based literally anywhere.

Which region pulls you most — Asia, Middle East, Americas, or Europe?`,
    cards: [
      {
        title: 'International Development Consultant',
        location: 'Geneva, Switzerland / Nairobi, Kenya',
        degreePath: 'Any degree + MSc International Development or Public Policy',
        salaryRange: '$65,000–$110,000 (+ benefits)',
        story: 'Clodagh studied geography in Maynooth, did an MSc in international development in Edinburgh, and now works for the UN World Food Programme, splitting her time between Geneva and field postings in East Africa.',
        emoji: '🌍',
      },
      {
        title: 'EU Affairs Manager',
        location: 'Brussels, Belgium',
        degreePath: 'BA Law / Politics / Business + MA European Affairs',
        salaryRange: '€65,000–€100,000',
        story: 'Darragh studied politics in UCD, did a masters in EU affairs in the College of Europe in Bruges, and now represents Irish tech companies in front of EU policymakers. He\'s one of 50,000 lobbyists in the Brussels bubble.',
        emoji: '🇪🇺',
      },
    ],
  },
  {
    keywords: ['two degrees', 'postgrad', 'masters', 'phd', 'graduate', 'combination', 'pivot'],
    text: `This is my favourite topic — because the most interesting careers in the world almost always require a deliberate combination of two different disciplines.

The magic formula is: **Undergrad in Subject A + Postgrad in Subject B = access to a whole new field that pure A or pure B graduates can't reach.**

Here are some powerful combinations:

**BSc Biology + MSc Science Communication**
→ Science Journalist, Documentary Maker, Museum Curator, Pharma Communications Director

**BSc Engineering + MBA**
→ Tech Entrepreneur, Venture Capital Partner, Infrastructure Fund Manager

**BA Psychology + MSc Data Science**
→ Behavioural Data Scientist (the most in-demand role at every major tech company right now)

**LLB Law + MSc Cybersecurity**
→ Cyber Law Specialist, Data Protection Officer — every company in the world needs this now

**BA Linguistics + MSc AI/NLP**
→ Natural Language Processing Researcher — you train the AI models that power ChatGPT-style tools

**BSc Nursing + MBA**
→ Healthcare Operations Director, Hospital CEO, Health Tech Founder

The key insight: your postgrad doesn't have to match your undergrad. In fact, the most valuable people are those who **bridge two worlds**.

Which two worlds would you most want to bridge?`,
    cards: [
      {
        title: 'Behavioural Data Scientist',
        location: 'London / Amsterdam / Remote',
        degreePath: 'BA Psychology + MSc Data Science or Behavioural Economics',
        salaryRange: '£70,000–£110,000',
        story: 'Orla studied psychology in UCC and hated that she couldn\'t answer "why do people do this at scale?" She did an MSc in data science, learned Python, and now works at a London fintech studying why people make bad financial decisions — and helping them make better ones.',
        emoji: '🧠',
      },
      {
        title: 'Cyber Law Specialist',
        location: 'Dublin / London / Singapore',
        degreePath: 'LLB Law + MSc Cybersecurity or Data Protection',
        salaryRange: '€80,000–€140,000',
        story: 'Tadhg studied law in TCD, did a part-time MSc in cybersecurity in DCU, and now earns more than most senior barristers advising multinational companies on GDPR compliance and data breach response.',
        emoji: '🔐',
      },
    ],
  },
  {
    keywords: ['surprise', 'weird', 'niche', 'unusual', 'random', 'unexpected', 'never heard'],
    text: `Oh you want the weird ones? Excellent. Here are jobs that genuinely exist, pay well, and that almost no Irish student has ever heard of:

**1. Astrobiologist turned Science Policy Advisor** — NASA, ESA, or the EU
You advise governments on the implications of space exploration. Yes, this is real. Yes, the EU has a space policy team in Brussels.

**2. Forensic Accountant** — Global law firms, FBI, Interpol
You follow money trails in fraud, corruption, and money laundering cases. Accounting degree + forensic accounting certification. More exciting than it sounds — you're essentially a financial detective.

**3. Neuromarketing Researcher** — Consumer brands, Amsterdam or London
You use brain scanning and eye tracking to understand why people buy things. BSc Neuroscience or Psychology + MSc Marketing Research. L'Oréal, Unilever, and Heineken all have internal neuromarketing teams.

**4. Longevity Research Venture Partner** — Silicon Valley / Singapore
You evaluate startups trying to extend human lifespan. Biology + business background. This sector has attracted $5 billion in investment in the last 3 years.

**5. Wilderness Therapy Facilitator** — Canada, New Zealand, Scotland
You use outdoor environments to treat trauma and mental health issues. Psychology + outdoor education qualifications. Genuinely life-changing work.

Which of these do you want to know more about?`,
    cards: [
      {
        title: 'Forensic Accountant',
        location: 'London / Dublin / New York',
        degreePath: 'BAcc Accounting + Certified Fraud Examiner (CFE) qualification',
        salaryRange: '€65,000–€120,000',
        story: 'Brian studied accounting in DCU thinking he\'d end up in a Big Four firm doing audits. He did one forensic case during his placement year — tracing €4 million in fraud — and never went back to regular accounting. He now works for a London law firm on international corruption cases.',
        emoji: '🔍',
      },
      {
        title: 'Neuromarketing Researcher',
        location: 'Amsterdam, Netherlands',
        degreePath: 'BSc Psychology or Neuroscience + MSc Marketing Research',
        salaryRange: '€60,000–€90,000',
        story: 'Sinéad studied psychology in Maynooth, specialised in perception, did an MSc in consumer neuroscience in Rotterdam, and now works for a major FMCG company running eye-tracking and EEG studies on why people pick one cereal over another.',
        emoji: '🧪',
      },
    ],
  },
]

// Default fallback response
export const fallbackResponse: DemoResponse = {
  keywords: [],
  text: `Interesting — tell me more and I'll get more specific. But while you're thinking, here are 3 careers that almost every student with any background has overlooked:

**1. Health Tech Product Manager** — Dublin, London, or Boston
You build digital health products — apps, diagnostics, wearables. Any science or business degree + tech experience. One of the fastest-growing roles in Ireland right now.

**2. Policy Analyst at an International Organisation** — Brussels, Geneva, New York
You research and write policy for the EU, UN, or OECD. Any degree + strong writing + a passion for a specific issue area. More accessible than people think.

**3. Sustainability Consultant** — Any major city
You help companies reduce their environmental impact and meet ESG regulations. Any degree + professional sustainability qualification (IEMA, GRI). Enormous demand right now as EU reporting requirements kick in.

What subjects are you studying, or what do you find yourself reading about when nobody's making you?`,
  cards: [
    {
      title: 'Health Tech Product Manager',
      location: 'Dublin / London / Boston',
      degreePath: 'Any degree + experience + product management certification',
      salaryRange: '€70,000–€110,000',
      story: 'Méabh studied nursing in UCC, got frustrated with paper-based processes, taught herself product basics, joined a health tech startup as a clinical advisor, and is now their Head of Product. She never left healthcare — she changed how it works.',
      emoji: '❤️',
    },
    {
      title: 'Sustainability Consultant',
      location: 'Dublin / Amsterdam / Remote',
      degreePath: 'Any degree + MSc Sustainability or IEMA qualification',
      salaryRange: '€55,000–€90,000',
      story: 'Eoin studied geography in NUIG, did a professional sustainability cert, and now earns €85k helping Irish companies prepare their ESG reports for new EU regulations. He started three years ago when almost nobody knew what ESG meant.',
      emoji: '🌿',
    },
  ],
}

export function findDemoResponse(userMessage: string): DemoResponse {
  const msg = userMessage.toLowerCase()
  for (const response of demoResponses) {
    if (response.keywords.some(k => msg.includes(k))) {
      return response
    }
  }
  return fallbackResponse
}
