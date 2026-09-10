import { Service, Specialist, Article, Testimonial, Booking } from '../types';

export const CLINIC_INFO = {
  name: 'MutuaMente Psicologia',
  legalName: 'MutuaMente - Serviços de Psicologia Clínica e Psicoterapia Lda.',
  nif: '516892340',
  foundedBy: 'Dra. Sofia Godinho Cabrita (Cédula OPP n.º 15786)',
  email: 'mutuamentepsicologia@gmail.com',
  website: 'https://mutuamente.pt',
  websiteFormatted: 'mutuamente.pt',
  phone: '+351 965 197 069',
  phoneFormatted: '965 197 069',
  whatsappUrl: 'https://wa.me/351965197069?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20as%20consultas%20na%20MutuaMente.',
  instagram: '@mutuamente.psicologia',
  instagramUrl: 'https://instagram.com',
  linkedinUrl: 'https://linkedin.com',
  spotifyUrl: 'https://spotify.com',
  address: {
    street: 'Av. Duque de Ávila 22',
    postalCode: '1000-141',
    city: 'Lisboa',
    country: 'Portugal',
    metro: 'Metro Saldanha / São Sebastião (Linhas Amarela e Vermelha)',
  },
  emergencyNotice: 'Em situações de emergência ou crise aguda de saúde mental, contacte o SNS 24 (808 24 24 24) ou o número nacional de emergência 112. A linha de apoio psicológico do SNS 24 é gratuita e funciona 24 horas por dia.',
  openingHours: 'Segunda a Sexta: 08:30 – 20:30 | Sábado: 09:00 – 14:00'
};

export const SERVICES: Service[] = [
  {
    id: 'psicologia-adultos',
    title: 'Psicoterapia Individual (Adultos)',
    titleEn: 'Individual Psychotherapy (Adults)',
    shortDesc: 'Um espaço seguro e confidencial para autoconhecimento, superação da ansiedade, depressão e transições de vida.',
    shortDescEn: 'A safe, confidential space for self-discovery, overcoming anxiety, depression, and major life transitions.',
    fullDesc: 'Acompanhamento clínico continuado centrado nas suas necessidades singulares. Através de uma relação terapêutica empática e sem julgamentos, trabalhamos a regulação emocional, padrões de pensamento, resolução de conflitos internos e construção de ferramentas práticas para o dia a dia.',
    fullDescEn: 'Continuous clinical guidance centered on your unique needs. We work with emotional regulation, thought patterns, and practical tools for daily well-being.',
    durationMinutes: 50,
    priceEur: 65,
    targetAudience: 'Adultos (>18 anos)',
    targetAudienceEn: 'Adults (18+)',
    iconName: 'UserCheck',
    badge: 'Mais Procurado',
    badgeEn: 'Most Popular',
    suitableFor: [
      'Ansiedade, ataques de pânico e fobias',
      'Sintomas depressivos e desânimo persistente',
      'Burnout profissional e exaustão laboral',
      'Baixa autoestima e insegurança',
      'Processos de luto ou separação afetiva'
    ],
    suitableForEn: [
      'Anxiety, panic attacks and phobias',
      'Depressive symptoms and persistent apathy',
      'Workplace burnout and exhaustion',
      'Low self-esteem and insecurity',
      'Grief and relationship breakdown'
    ]
  },
  {
    id: 'terapia-casal',
    title: 'Terapia de Casal e Familiar',
    titleEn: 'Couples & Family Therapy',
    shortDesc: 'Restaurar a comunicação, resolver impasses relacionais e fortalecer a cumplicidade afetiva.',
    shortDescEn: 'Restoring communication, resolving relational impasses, and strengthening emotional bonds.',
    fullDesc: 'Sessões focadas na dinâmica da relação, proporcionando uma mediação neutra e construtiva. Identificamos ciclos repetitivos de conflito, reconstruímos a confiança após quebras de vínculo e melhoramos a comunicação emocional entre o par.',
    fullDescEn: 'Sessions focused on relationship dynamics, providing neutral and constructive mediation to rebuild mutual trust.',
    durationMinutes: 75,
    priceEur: 90,
    targetAudience: 'Casais e Núcleos Familiares',
    targetAudienceEn: 'Couples and Families',
    iconName: 'HeartHandshake',
    suitableFor: [
      'Crises de comunicação e distanciamento afetivo',
      'Gestão de conflitos frequentes e discussões repetitivas',
      'Transição para a parentalidade',
      'Reconstrução de confiança após infidelidade',
      'Separações conscientes e coparentalidade saudável'
    ],
    suitableForEn: [
      'Communication breakdown and emotional distance',
      'Recurring conflict patterns',
      'Transition to parenthood',
      'Rebuilding trust and intimacy',
      'Conscious separation and healthy co-parenting'
    ]
  },
  {
    id: 'apoio-online',
    title: 'Consultas Online (Telepsicologia)',
    titleEn: 'Online Therapy (Telepsychology)',
    shortDesc: 'Terapia acessível a partir do conforto da sua casa, com a mesma eficácia clínica e encriptação ponto a ponto.',
    shortDescEn: 'Accessible therapy from the comfort of your home, with verified clinical efficacy and end-to-end encryption.',
    fullDesc: 'Conecte-se com a Dra. Sofia Godinho Cabrita através da nossa sala de vídeo segura e confidencial. Ideal para quem reside fora de Lisboa, no estrangeiro (comunidade emigrante/expats) ou prefere flexibilidade de horários.',
    fullDescEn: 'Connect directly with Dr. Sofia Godinho Cabrita via secure video consultation. Ideal for residents outside Lisbon, expats, and travelers.',
    durationMinutes: 50,
    priceEur: 60,
    targetAudience: 'Adultos e Jovens (Nacional e Internacional)',
    targetAudienceEn: 'Adults & Young Adults (Worldwide)',
    iconName: 'Video',
    badge: 'Flexível',
    badgeEn: 'Flexible',
    suitableFor: [
      'Portugueses e expatriados a residir no estrangeiro',
      'Pessoas com limitações geográficas ou de mobilidade',
      'Profissionais com horários exigentes',
      'Continuidade de tratamento em viagem de trabalho'
    ],
    suitableForEn: [
      'Expats and Portuguese speakers abroad',
      'Clients with mobility or distance constraints',
      'Busy professionals seeking time efficiency',
      'Seamless therapy continuation while traveling'
    ]
  },
  {
    id: 'orientacao-vocacional',
    title: 'Orientação Vocacional & Carreira',
    titleEn: 'Vocational & Career Guidance',
    shortDesc: 'Decisões escolares e profissionais conscientes com recurso a testes psicométricos validados.',
    shortDescEn: 'Informed academic and career decisions backed by validated psychometric evaluations.',
    fullDesc: 'Processo estruturado de exploração de interesses, aptidões cognitivas e valores pessoais. Indicado para estudantes de 9.º e 12.º ano na escolha do percurso escolar/universitário, ou adultos em momento de transição ou reconversão de carreira.',
    fullDescEn: 'Structured exploration of interests, cognitive aptitudes, and personal values for students and transitioning professionals.',
    durationMinutes: 60,
    priceEur: 75,
    targetAudience: 'Estudantes e Profissionais em Transição',
    targetAudienceEn: 'Students and Career Switchers',
    iconName: 'Compass',
    suitableFor: [
      'Escolha de área do ensino secundário (9.º ano)',
      'Acesso ao ensino superior e candidaturas (12.º ano)',
      'Reorientação de carreira profissional e mudança de área',
      'Identificação de forças e potencial cognitivo'
    ],
    suitableForEn: [
      'Secondary school course selection',
      'University degree selection and goals',
      'Mid-career pivots and industry changes',
      'Strengths and cognitive potential identification'
    ]
  },
  {
    id: 'avaliacao-neuropsicologica',
    title: 'Avaliação Psicológica e Cognitiva',
    titleEn: 'Psychological & Cognitive Assessment',
    shortDesc: 'Relatórios clínicos detalhados para despiste de PHDA, sobredotação ou declínio cognitivo.',
    shortDescEn: 'Detailed clinical reports for ADHD screening, giftedness, or cognitive screening.',
    fullDesc: 'Aplicação de baterias de testes normalizados para a população portuguesa pela Ordem dos Psicólogos. Inclui sessões de avaliação, elaboração de relatório clínico oficial e sessão de devolução detalhada com recomendações terapêuticas.',
    fullDescEn: 'Administration of standardized neuropsychological test batteries with comprehensive official clinical reports.',
    durationMinutes: 75,
    priceEur: 110,
    targetAudience: 'Jovens e Adultos',
    targetAudienceEn: 'Adolescents & Adults',
    iconName: 'BrainCircuit',
    suitableFor: [
      'Despiste de Perturbação de Hiperatividade e Défice de Atenção (PHDA)',
      'Avaliação de Altas Habilidades / Sobredotação',
      'Avaliação de funções executivas e memória',
      'Relatórios clínicos para universidades ou medicina do trabalho'
    ],
    suitableForEn: [
      'ADHD and attention screening',
      'High intellectual potential / Giftedness assessment',
      'Executive function and memory evaluations',
      'Formal clinical reports for academic accommodations'
    ]
  }
];

export const SPECIALISTS: Specialist[] = [
  {
    id: 'sofia-godinho-cabrita',
    name: 'Dra. Sofia Godinho Cabrita',
    role: 'Psicóloga Clínica & Fundadora',
    roleEn: 'Clinical Psychologist & Founder',
    oppNumber: 'Cédula OPP n.º 15786',
    bio: 'Psicóloga Clínica formada no ISPA – Instituto Universitário de Ciências Psicológicas, Sociais e da Vida, com Licenciatura em Psicologia Aplicada (Ramo Clínica) e Mestrado em Psicologia Clínica. Membro efectivo da Ordem dos Psicólogos Portugueses (Cédula n.º 15786) e registada na Entidade Reguladora da Saúde (ERS). Com mais de 15 anos de prática clínica, é especialista no acolhimento e tratamento de perturbações de ansiedade, depressão, burnout, relações interpessoais, bem como avaliação psicológica especializada e orientação vocacional.',
    bioEn: 'Clinical Psychologist graduated from ISPA with a Master in Clinical Psychology. Full member of the Portuguese Order of Psychologists (OPP 15786) and registered with ERS. With over 15 years of experience, specializing in anxiety, depression, burnout, interpersonal dynamics, psychological assessments, and vocational guidance.',
    specialties: [
      'Ansiedade e Pânico', 
      'Depressão e Humor', 
      'Psicoterapia Integrativa', 
      'Terapia de Casal e Familiar',
      'Avaliação Psicológica', 
      'Orientação Vocacional',
      'Regulação Emocional'
    ],
    specialtiesEn: [
      'Anxiety & Panic', 
      'Depression & Mood', 
      'Integrative Psychotherapy', 
      'Couples & Family Therapy',
      'Psychological Assessment', 
      'Vocational Guidance',
      'Emotional Regulation'
    ],
    languages: ['Português', 'English', 'Español'],
    photoUrl: 'https://raw.githubusercontent.com/Mutuamente/mutuamente-website/main/photo.png',
    consultationTypes: [
      'psicologia-adultos', 
      'terapia-casal', 
      'apoio-online', 
      'orientacao-vocacional', 
      'avaliacao-neuropsicologica'
    ],
    availabilityDays: [1, 2, 3, 4, 5, 6]
  }
];

export const INITIAL_BOOKINGS: Booking[] = [];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    clientInitials: 'M. S.',
    clientAgeLocation: '34 anos, Lisboa',
    service: 'Psicoterapia de Adultos',
    rating: 5,
    text: 'A Dra. Sofia proporcionou-me um ambiente de acolhimento genuíno onde finalmente consegui compreender as origens dos meus ataques de ansiedade. Ao fim de 4 meses sinto-me uma pessoa com ferramentas reais para viver sem medo.',
    textEn: 'Dr. Sofia provided a truly compassionate environment where I finally understood the roots of my anxiety. In four months I gained real-life tools to thrive.'
  },
  {
    id: 'test-2',
    clientInitials: 'R. & T.',
    clientAgeLocation: 'Casados há 7 anos, Cascais',
    service: 'Terapia de Casal',
    rating: 5,
    text: 'Estávamos num ponto crítico de rutura comunicacional após o nascimento do nosso segundo filho. A mediação na MutuaMente foi transformadora: aprendemos a escutar o que o outro sente e não apenas a reagir.',
    textEn: 'We were in a critical breakdown in communication. Therapy at MutuaMente was transformative: we learned to hear how the other feels rather than just reacting.'
  },
  {
    id: 'test-3',
    clientInitials: 'J. P.',
    clientAgeLocation: '41 anos, Berlim (Online)',
    service: 'Consultas Online',
    rating: 5,
    text: 'Viver no estrangeiro torna difícil encontrar terapia em português com esta profundidade cultural e rigor. O sistema de agendamento online é prático e a qualidade da videochamada é irrepreensível.',
    textEn: 'Living abroad makes finding Portuguese therapy with cultural depth challenging. The online booking system is seamless and video sessions feel just like being in the room.'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Ansiedade Funcional: Quando o Sucesso Esconde a Exaustão',
    titleEn: 'High-Functioning Anxiety: When Success Masks Exhaustion',
    excerpt: 'Perfeccionismo, incapacidade de relaxar e medo constante de errar. Descubra os sinais invisíveis da ansiedade de alto rendimento.',
    excerptEn: 'Perfectionism, inability to unwind, and fear of failure. Discover the silent indicators of high-functioning anxiety.',
    author: 'Dra. Sofia Godinho Cabrita',
    date: '02 Set 2026',
    readTime: '4 min de leitura',
    category: 'Saúde Mental',
    categoryEn: 'Mental Health',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'art-2',
    title: 'Como Falar de Emoções com os Nossos Filhos Sem Julgamento',
    titleEn: 'How to Talk About Feelings With Children Without Judgment',
    excerpt: 'Estratégias práticas de validação emocional que ajudam a acalmar birras e a fortalecer a auto-estima desde a primeira infância.',
    excerptEn: 'Practical emotional validation techniques that soothe tantrums and build healthy self-esteem.',
    author: 'Dra. Sofia Godinho Cabrita',
    date: '28 Ago 2026',
    readTime: '6 min de leitura',
    category: 'Parentalidade',
    categoryEn: 'Parenting',
    imageUrl: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'art-3',
    title: 'Burnout Laboral: 5 Sinais de Alarme que Não Deve Ignorar',
    titleEn: 'Work Burnout: 5 Warning Signs You Should Never Ignore',
    excerpt: 'A diferença entre cansaço pontual e exaustão emocional crónica, e como traçar limites saudáveis antes do colapso.',
    excerptEn: 'The difference between regular tiredness and chronic emotional exhaustion, and how to set healthy boundaries.',
    author: 'Dra. Sofia Godinho Cabrita',
    date: '15 Ago 2026',
    readTime: '5 min de leitura',
    category: 'Bem-Estar',
    categoryEn: 'Well-being',
    imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=600&q=80'
  }
];

export const FAQS = [
  {
    q: 'Como funciona a primeira consulta de psicologia?',
    qEn: 'How does the initial psychology consultation work?',
    a: 'A primeira consulta é uma sessão de acolhimento e avaliação inicial com a Dra. Sofia Godinho Cabrita. Serve para compreendermos a sua história de vida, identificar o motivo da procura de apoio e alinhar expectativas terapêuticas num ambiente seguro, empático e de total confidencialidade.',
    aEn: 'The first consultation is an initial welcoming and evaluation session with Dr. Sofia Godinho Cabrita. It is designed to understand your history, clarify your therapeutic goals, and build a secure, confidential foundation.'
  },
  {
    q: 'As consultas de psicologia têm comparticipação ou reembolso?',
    qEn: 'Are psychology sessions eligible for health insurance reimbursement?',
    a: 'Sim. Emitimos o Recibo Verde Eletrónico oficial da Autoridade Tributária com o NIF do utente e menção à cédula profissional da Ordem dos Psicólogos Portugueses (OPP n.º 15786). Estas despesas são dedutíveis no IRS como Despesas de Saúde (isenção de IVA ao abrigo do Art. 9.º do CIVA) e aceites para reembolso pelos principais subsistemas e seguradoras (Médis, Multicare, AdvanceCare, ADSE, SAMS, etc.).',
    aEn: 'Yes. We issue official electronic receipts (Recibo Verde) through the Portuguese Tax Authority with OPP accreditation (OPP 15786). These qualify for health tax deductions in IRS (VAT exempt under Art. 9 CIVA) and can be submitted to private health insurance (Médis, Multicare, ADSE, etc.).'
  },
  {
    q: 'As consultas online têm a mesma eficácia que as presenciais?',
    qEn: 'Is online therapy as effective as in-person therapy?',
    a: 'Sim. Diversos estudos científicos internacionais e as diretrizes da Ordem dos Psicólogos Portugueses confirmam que a telepsicologia tem eficácia equivalente à terapia presencial para a grande maioria das perturbações emocionais (ansiedade, depressão, gestão do stress). As nossas sessões decorrem através de plataformas seguras e com encriptação.',
    aEn: 'Yes. Robust scientific studies and OPP guidelines demonstrate that telepsychology offers equivalent clinical efficacy for anxiety, depression, and stress management.'
  },
  {
    q: 'Como funcionam os métodos de pagamento (MB WAY, Multibanco)?',
    qEn: 'How do payment methods (MB WAY, Multibanco) work?',
    a: 'Para confirmar o seu agendamento, pode efetuar o pagamento seguro através de MB WAY (recebe notificação instantânea no telemóvel), Referência Multibanco (válida por 24 horas), ou Cartão de Débito/Crédito, ou optar por liquidar após a consulta. O sistema envia a confirmação imediata e o respetivo Recibo Verde Eletrónico oficial ser-lhe-á enviado diretamente pela Dra. Sofia após a consulta.',
    aEn: 'To secure your booking, you can pay via MB WAY, Multibanco reference, Credit/Debit Card, or choose to pay post-session. Instant confirmation is sent and the official tax receipt (Recibo Verde) will be emailed directly by Dr. Sofia after the session.'
  },
  {
    q: 'Qual é a política de desmarcação ou cancelamento?',
    qEn: 'What is the rescheduling and cancellation policy?',
    a: 'Compreendemos que imprevistos acontecem. As consultas podem ser remarcadas ou canceladas sem custos desde que avisadas com pelo menos 24 horas de antecedência em relação ao horário marcado. Cancelamentos com menos de 24 horas implicam o pagamento integral da sessão, uma vez que o horário ficou reservado com exclusividade.',
    aEn: 'Sessions may be rescheduled or canceled free of charge with at least 24 hours notice. Cancellations made under 24 hours require full session payment as the time was reserved exclusively.'
  }
];
