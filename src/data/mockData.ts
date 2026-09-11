import { Service, Specialist, Article, Testimonial, Booking, Quote, DetailedReason } from '../types';

export const CLINIC_INFO = {
  name: 'MutuaMente Psicologia',
  legalName: 'MutuaMente - Serviços de Psicologia Clínica e Psicoterapia',
  nif: '516892340',
  foundedBy: 'Dra. Sofia Godinho Cabrita (Cédula OPP n.º 15786)',
  oppNumber: '15786',
  email: 'mutuamentepsicologia@gmail.com',
  website: 'https://mutuamente.pt',
  websiteFormatted: 'mutuamente.pt',
  phone: '+351 965 197 069',
  phoneFormatted: '965 197 069',
  whatsappUrl: 'https://wa.me/351965197069?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20as%20consultas%20na%20MutuaMente.',
  instagram: '@mutuamente.psicologia',
  instagramUrl: 'https://www.instagram.com/mutuamente.psicologia',
  facebook: 'MutuaMente Psicologia',
  facebookUrl: 'https://www.facebook.com/mutuamentepsicologia',
  linkedinUrl: 'https://linkedin.com',
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

export const QUOTES: Quote[] = [
  {
    text: 'O pensamento é o ensaio da ação.',
    author: 'Sigmund Freud',
    authorRole: 'Pai da Psicanálise'
  },
  {
    text: "There is a crack in everything, that's how the light gets in.",
    translationPt: 'Em tudo existe algo quebrado, é assim que é possível entrar luz.',
    author: 'Leonard Cohen',
    authorRole: 'Poeta, Romancista e Músico'
  },
  {
    text: "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
    translationPt: 'Não posso mudar a direção do vento, mas posso ajustar as minhas velas para chegar sempre ao meu destino.',
    author: 'Jimmy Dean',
    authorRole: 'Músico e Comunicador'
  },
  {
    text: 'You can do anything you set your mind to.',
    translationPt: 'Pode alcançar tudo aquilo a que se propuser com determinação e clareza mental.',
    author: 'Benjamin Franklin',
    authorRole: 'Pensador e Polímata'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'psicologia-clinica',
    title: 'Consulta de Psicologia Clínica',
    titleEn: 'Clinical Psychology Consultation',
    shortDesc: 'Trabalhar a saúde mental e o bem-estar individual e coletivo com intervenções sistematizadas para a promoção de mudanças duradouras.',
    shortDescEn: 'Evidence-based clinical intervention for emotional well-being, resilience, and sustainable personal growth.',
    fullDesc: 'A Psicologia Clínica é uma área que tem como finalidade trabalhar a saúde mental e o bem-estar individual e coletivo com intervenções sistematizadas para a promoção de mudanças duradouras. Utiliza, para tal, vários métodos e técnicas a fim de conhecer a realidade psíquica e comportamental de cada pessoa, ou grupo de pessoas.\n\nOs motivos para se decidir a fazer consultas de psicologia são muito diversos. Esses motivos podem passar por estar a atravessar um período ou fase de vida conturbada, de dúvida ou ter várias questões para as quais não está a conseguir encontrar resposta sozinho, acerca de si, das suas interações interpessoais, da dinâmica familiar, da sua sexualidade ou caminho de vida. Poderá também ser necessário apoio caso esteja a experienciar uma situação de luto, mudança brusca, ansiedade e depressão, entre muitos outros.\n\nA psicóloga, seguindo uma abordagem dinâmica, é uma facilitadora que, munida de bagagem teórica e prática, convida a pessoa a ser mais tolerante, resiliente e a desenvolver um olhar mais sensível para si e sobre o mundo, dando-lhe novos sentidos.',
    fullDescEn: 'Clinical Psychology is dedicated to fostering individual and collective mental health through structured, evidence-grounded interventions. Through a dynamic psychoanalytic framework, Dr. Sofia acts as a compassionate facilitator inviting self-tolerance, resilience, and new meaning.',
    durationMinutes: 50,
    priceEur: 65,
    targetAudience: 'Adultos, Jovens e Casais (Presencial & Online)',
    targetAudienceEn: 'Adults, Youths & Couples (In-person & Online)',
    iconName: 'UserCheck',
    badge: 'Referência Clínica',
    badgeEn: 'Core Practice',
    suitableFor: [
      'Fases conturbadas, de dúvida ou transições de vida',
      'Dificuldades nas interações interpessoais e dinâmica familiar',
      'Ansiedade, ataques de pânico, estresse e depressão',
      'Processos de luto, perdas significativas ou separação',
      'Dúvidas existenciais, sexualidade e rumo pessoal'
    ],
    suitableForEn: [
      'Challenging life phases, doubts, or transitions',
      'Interpersonal relationship or family dynamic challenges',
      'Anxiety, panic, persistent stress, and depression',
      'Grief, significant loss, or separation',
      'Existential questions, personal identity, and life path'
    ],
    specializations: [
      'Modelo Psicanalítico e Dinâmico',
      'Acolhimento Empático e Isento de Julgamentos',
      'Presencial em Lisboa e Online por Videoconsulta Segura',
      'Emissão de Recibo Verde Oficial com Cédula OPP 15786'
    ]
  },
  {
    id: 'avaliacao-psicologica',
    title: 'Avaliação Psicológica',
    titleEn: 'Psychological Assessment',
    shortDesc: 'Procedimento formal através de instrumentos validados para avaliar aptidões, personalidade e competências comportamentais.',
    shortDescEn: 'Formal evaluation through certified instruments assessing psychological traits, cognitive aptitudes, and behavioral competencies.',
    fullDesc: 'A avaliação psicológica é um procedimento que visa avaliar, através de instrumentos previamente validados, os diversos processos psicológicos que compõe o indivíduo, nomeadamente aptidões, características de personalidade e competências comportamentais. A avaliação e descrição da realidade psicológica de alguém fornece ao psicólogo um conjunto de informações que este deve saber interpretar, selecionar e sobretudo transmitir e devolver. O psicólogo é o único profissional habilitado por lei para exercer esta função, sendo que esta responsabilidade traz consigo uma série de considerações éticas que visam não somente a imparcialidade do processo em si, mas principalmente a humanização deste, tendo como foco, em última instância a preservação da integridade do sujeito avaliado.',
    fullDescEn: 'Psychological assessment is a standardized scientific procedure designed to evaluate psychological processes, personality structure, and behavioral competence. Licensed psychologists are the sole legally authorized professionals for this practice, adhering to rigorous ethics and human-centered respect.',
    durationMinutes: 75,
    priceEur: 90,
    targetAudience: 'Candidatos a Concursos, Condutores, Seguranças e Estudantes',
    targetAudienceEn: 'Public Contest Applicants, Drivers, Security Personnel & Students',
    iconName: 'BrainCircuit',
    badge: 'Habilitação Legal',
    badgeEn: 'Certified',
    suitableFor: [
      'Procedimentos concursais e provas de ingresso na função pública',
      'Avaliação psicológica obrigatória de condutores',
      'Avaliação de seguranças privados e porte de arma',
      'Orientação vocacional para estudantes do 9.º e 12.º ano ou adultos'
    ],
    suitableForEn: [
      'Public competitive exams and state admission tenders',
      'Mandatory psychological driver certifications',
      'Private security guards psychological licensing',
      'Vocational and career orientation for students and adults'
    ],
    specializations: [
      'Avaliação Psicológica no âmbito de Procedimentos Concursais',
      'Avaliação Psicológica de Condutores',
      'Avaliação Psicológica de Seguranças',
      'Orientação Vocacional'
    ]
  },
  {
    id: 'consultoria-rh',
    title: 'Consultoria de Recursos Humanos',
    titleEn: 'Human Resources Consulting',
    shortDesc: 'Diagnósticos e estratégias práticas alinhando a cultura e os objetivos da empresa com as necessidades dos colaboradores.',
    shortDescEn: 'Tailored organizational diagnostic and practical interventions aligning corporate objectives with employee well-being.',
    fullDesc: 'Uma consultoria de RH é realizada de acordo com diagnósticos específicos, que levam em consideração toda a cultura da organização e utilizam técnicas adequadas à empresa, focadas no que é prático e aplicável.\n\nTrata-se de uma consultoria que possui uma visão externa do que acontece na empresa e que tem como objetivo fazer análises com um foco mais crítico sobre os seus processos, principalmente no que envolvem questões relacionadas à gestão de Recursos Humanos. A partir disso, o consultor consegue propor as melhorias necessárias para que sejam alcançados resultados verdadeiramente efetivos, tanto para a organização, quanto para seus colaboradores.\n\nAo realizar esta análise, o intuito do consultor é compreender a relação existente entre a empresa, seus colaboradores e também os gestores que fazem parte dela, para que assim consiga entender se há um alinhamento entre os objetivos organizacionais aos dos profissionais que compõem o negócio como um todo.\n\nApós a realização deste diagnóstico, caso ele verifique que existem falhas em determinados pontos e processos desenvolvidos dentro da empresa, o seu papel é o de elaborar estratégias eficientes de mudanças, que contemplem, principalmente, este alinhamento que citei acima, atendendo, efetivamente e na prática, os anseios da empresa, sem deixar de lado as necessidades dos colaboradores que dela fazem parte.',
    fullDescEn: 'HR Consulting provides an external, critical, and practical assessment of organizational dynamics, culture, and recruitment processes to guarantee alignment between business strategy and people fulfillment.',
    durationMinutes: 60,
    priceEur: 85,
    targetAudience: 'Empresas, Gestores, Equipas e Departamentos de RH',
    targetAudienceEn: 'Companies, Managers, Teams & HR Departments',
    iconName: 'Compass',
    badge: 'Mundo Corporativo',
    badgeEn: 'Corporate',
    suitableFor: [
      'Apoio na seleção de candidatos através da análise do seu perfil pessoal',
      'Entrevistas estruturadas de avaliação de competências',
      'Diagnóstico da cultura e clima organizacional',
      'Estratégias de alinhamento entre lideranças e colaboradores'
    ],
    suitableForEn: [
      'Candidate selection through in-depth psychological profile analysis',
      'Competency-based behavioral assessment interviews',
      'Diagnostic of workplace culture and team dynamics',
      'Alignment strategies between corporate targets and human needs'
    ],
    specializations: [
      'Apoio na Seleção de candidatos através da Análise do seu Perfil Pessoal',
      'Entrevista de Avaliação de Competências'
    ]
  },
  {
    id: 'apoio-online',
    title: 'Consultas Online',
    titleEn: 'Online Consultations',
    shortDesc: 'A mesma qualidade e rigor clínico no conforto da sua casa ou onde estiver.',
    shortDescEn: 'The same clinical quality and safety from the comfort of your home.',
    fullDesc: 'Sessões por videoconferência encriptada com a Dra. Sofia Godinho Cabrita, facilitando o acesso a residentes em qualquer parte de Portugal e no estrangeiro.',
    fullDescEn: 'Encrypted telepsychology sessions conducted by Dr. Sofia Godinho Cabrita for clients worldwide.',
    durationMinutes: 50,
    priceEur: 65,
    targetAudience: 'Adultos e Jovens (Nacional e Internacional)',
    targetAudienceEn: 'Adults & Youths (Worldwide)',
    iconName: 'Video',
    badge: 'Videoconsulta',
    badgeEn: 'Online Session',
    suitableFor: [
      'Residentes fora de Lisboa ou no estrangeiro',
      'Necessidade de flexibilidade de horários',
      'Continuidade de tratamento durante deslocações'
    ],
    suitableForEn: [
      'Residents outside Lisbon or abroad',
      'Schedule flexibility and convenience',
      'Treatment continuity during travel'
    ]
  }
];

export const WHEN_TO_SEEK_THERAPY: string[] = [
  'Não está a conseguir lidar com situações que surgiram no seu trabalho;',
  'As suas relações amorosas ou de família poderiam ser melhoradas;',
  'Anda demasiadamente triste, ansioso, paralisado, estressado e irritado;',
  'Deseja desenvolver habilidades sociais, como ser mais empático, comunicativo ou romper a barreira da timidez;',
  'Gostaria de aprender a amar-se mais;',
  'Deseja libertar-se de relacionamentos abusivos, mas ainda não descobriu como;',
  'Os seus medos são paralisantes e sente que o atrapalham a ter uma vida autónoma e realizada;',
  'Não consegue superar situações traumáticas do presente ou do passado;',
  'Precisa de auxílio para passar por uma perda importante, um luto ou uma separação;',
  'Gostaria de ser ouvido sem julgamentos;',
  'Gostaria de viver uma transformação pessoal positiva;',
  'Deseja cuidar da saúde mental para ser uma pessoa mais feliz.'
];

export const DETAILED_REASONS: DetailedReason[] = [
  {
    id: 'autoconhecimento',
    title: 'Busca de autoconhecimento',
    fullContent: 'O autoconhecimento é o grande benefício para quem faz psicoterapia. Através da relação terapêutica, uma pessoa é levada a conhecer aspectos de si mesma que, muitas vezes, sequer fazia ideia. Começa a compreender a razão de determinadas atitudes, de certos sentimentos e situações que ocorrem em sua vida. Além disso, quando uma pessoa se conhece a fundo, ela consegue lidar melhor com as suas emoções e com o seu comportamento, consequentemente lida melhor com muitos acontecimentos em sua vida. Isso não significa que ela não irá mais passar por momentos difíceis, significa que ela saberá contorna-los da melhor forma e tirar deles as melhores experiências para o seu crescimento pessoal e emocional. A busca pelo autoconhecimento pode auxiliar em diversas áreas da vida, como as relações e o desenvolvimento profissional, por exemplo.'
  },
  {
    id: 'emocoes-negativas',
    title: 'Sentimentos constantes de tristeza, ansiedade, estresse, raiva, desânimo',
    fullContent: 'Todos nós nos sentimos tristes, com raiva ou ansiosos em alguns momentos de nossa vida e mesmo de nosso dia. As emoções consideradas negativas também são muito importantes porque é através delas que nos fortalecemos, que aprendemos a lidar com as frustrações, que desenvolvemos a resiliência e muitos outros aprendizados. Porém, é perfeitamente comum que você busque uma orientação psicológica se sentir que essas emoções tem atrapalhado a sua vida de alguma forma. O excesso de desânimo, de estresse, os momentos de raiva constantes e a ansiedade… tudo isso pode ser levado para o consultório psicológico e, por meio de um processo psicoterapêutico, ser desenvolvida a sua capacidade de melhor compreender e lidar com as emoções. O psicólogo irá ajudar também a identificar se esses sentimentos indicam algum tipo de patologia e lhe fornecer o direcionamento correto para acompanha-la.'
  },
  {
    id: 'situacoes-dificeis',
    title: 'Situações difíceis',
    fullContent: 'Muitas vezes, quando estamos passando por uma situação complicada, parece que não conseguimos enxergar sozinhos uma solução. É comum nos aconselharmos então com as pessoas que amamos e mais confiamos, elas normalmente nos ajudam a enfrentar os problemas e nos sentirmos acolhidos. Mas há casos em que, mesmo contando com apoio de bons amigos e pessoas queridas, o problema parece tomar conta de nossa vida, perturba nossos pensamentos e simplesmente não conseguimos encontrar a saída. Nestes casos, procurar um psicólogo pode ser de grande valia, já que, além de ser alguém que está totalmente “de fora” do seu cotidiano, é também um profissional que vai dialogar com você de forma isenta de julgamentos e preconceitos, alguém com uma bagagem de estudos e com experiência para te mostrar soluções que pode ser que você não veja por si só. Diferentemente das pessoas com quem você já convive, o psicólogo não te dirá o que você deve fazer, mas te ajudará a pensar com maior clareza e a desenvolver a sua capacidade de solucionar conflitos.'
  },
  {
    id: 'culpa-passado',
    title: 'Sentimento de culpa ou dificuldade de lidar com o passado',
    fullContent: 'O sentimento de culpa ou mesmo o fato de alguém viver ligado ao seu passado é uma verdadeira pedra que trava todas as chances de caminhar para frente. Quando uma pessoa não consegue se perdoar ou perdoar os outros, uma “ferida” emocional fica sempre aberta, pronta para sangrar a qualquer momento e trazer à tona tudo que já deveria ter sido resolvido e não foi. Iniciar psicoterapia então será muito importante para que essas questões passadas sejam melhor elaboradas, superadas e não mais impeçam que se viva de maneira satisfatória.'
  },
  {
    id: 'separacoes-lutos',
    title: 'Separações, lutos, perdas ou mudanças',
    fullContent: 'É comum que diante de situações de grandes mudanças ou perdas, demoremos algum tempo para “digerir” tudo e retomarmos nossas vidas. O período de adaptação ou até mesmo o luto são normais e devem ser vividos para que os acontecimentos sejam bem elaborados. Não há um prazo determinado para que uma perda ou separação seja superada, isso é muito pessoal e depende de vários fatores, mas um psicólogo pode auxiliar muito neste processo. Quando alguém passa por uma situação assim, geralmente apresenta a necessidade de se sentir apoiado e acolhido e este acolhimento é recebido no processo psicoterapêutico. E não apenas isso, um profissional também irá ajudar a entender o momento vivido, a encontrar as melhores formas de aceitar e enfrentar. Além, é claro, de ter uma observação atenta para a ocorrência de sinais que indiquem o surgimento de algum transtorno.'
  },
  {
    id: 'relacionamentos',
    title: 'Dificuldades de relacionamento',
    fullContent: 'Relacionar-se não é uma tarefa fácil e todos nós, sem exceção, passamos por conflitos nesta área da vida. Seja o relacionamento amoroso, com a família, com amigos, colegas de trabalho… para todos eles levamos aspectos de nossa história e de nossa personalidade e às vezes isso se choca com aquilo que o outro também carrega como bagagem. Não é preciso ter grandes dificuldades ou aguardar, por exemplo, que se esteja à beira de uma separação conjugal para buscar o apoio psicológico (o que acontece na maioria dos casos), pelo contrário, é possível que a busca pelo psicólogo seja uma forma de desenvolver cada vez mais as habilidades de relacionamento e investir nesse aspecto.'
  },
  {
    id: 'comportamentos-alterados',
    title: 'Manias, medos, comportamentos alterados',
    fullContent: 'É possível que os seus medos em excesso, comportamentos que você não tem conseguido controlar ou “manias” queiram lhe dizer que algo não vai bem. Comer de forma compulsiva, não conseguir para de comprar coisas, sentir medo de sair de casa ou de se relacionar com pessoas, chorar o tempo todo… são alguns exemplos destes comportamentos que merecem atenção. É claro que, por si só, não são sinônimos de transtornos, mas podem indicar o desenvolvimento de alguma patologia e um psicólogo com certeza poderá lhe ajudar a identificar isso.'
  },
  {
    id: 'curiosidade',
    title: 'Curiosidade ou vontade',
    fullContent: 'Isso mesmo, você pode ir ao psicólogo simplesmente porque tem curiosidade ou vontade de fazer psicoterapia! É possível que você se surpreenda muito com esse encontro e que o processo te ajude a se desenvolver em muitos aspectos.'
  },
  {
    id: 'prevencao',
    title: 'Prevenção',
    fullContent: 'Hoje quase todo mundo já se convenceu da importância de se fazer exames médicos periódicos, ter uma boa alimentação e praticar exercícios físicos regularmente. São atitudes básicas que nos ajudam a prevenir doenças e ter uma qualidade de vida melhor. Estamos ainda quebrando barreiras quando falamos de prevenção em saúde mental, mas já existe uma evolução. O fato é que a saúde emocional é tão importante quanto a física, afinal, estão ligadas! Existem muitas pesquisas na área da psicossomática que indicam a influência das emoções em nossa saúde como um todo, incluindo o desenvolvimento de doenças e o tratamento e prevenção das mesmas. Nossa preocupação com a longevidade e boa qualidade de vida deve envolver um cuidado também psicológico e, neste sentido, é muito importante buscarmos a orientação profissional.\n\nExistem ainda outros motivos para que você procure um psicólogo clínico ou mesmo de outras especialidades, pois a Psicologia está presente em muitas outras áreas, como a Jurídica, Social, Esportiva, Hospitalar, Organizacional… cada profissional tem objetivos diferentes em cada uma dessas áreas. É importante que saibamos que a Psicologia se faz cada vez mais presente em nosso cotidiano e não somente na clínica. Quanto mais conhecermos acerca de seu papel na sociedade, melhor entenderemos sobre sua contribuição para a nossa vida particularmente.'
  }
];

export const PARTNERSHIPS_INFO = {
  pricingNote: 'Valores transparentes e ajustados a cada necessidade e enquadramento.',
  allianz: {
    name: 'Allianz',
    status: 'Comparticipação / Reembolso',
    desc: 'Comparticipação de consultas de Psicologia Clínica através de apólice de saúde com cobertura de ambulatório ou medicina especializada.',
  },
  protocols: {
    discount: 'Desconto de 10%',
    title: 'Parcerias & Protocolos Institucionais',
    desc: 'Desconto de 10% em consultas de Psicologia Clínica para entidades, empresas e organizações protocoladas (em fase de formalização e expansão de acordos).',
  },
  reimbursementGuide: 'Todas as consultas beneficiam da emissão de Recibo Verde Oficial da Autoridade Tributária com menção à cédula profissional OPP n.º 15786, sendo 100% elegíveis para dedução no IRS (15% em despesas de saúde, isento de IVA ao abrigo do art. 9.º do CIVA) e para reembolso em seguros como Allianz, Médis, Multicare, AdvanceCare e ADSE.'
};

export const SPECIALISTS: Specialist[] = [
  {
    id: 'sofia-godinho-cabrita',
    name: 'Dra. Sofia Godinho Cabrita',
    role: 'Psicóloga Clínica & Fundadora',
    roleEn: 'Clinical Psychologist & Founder',
    oppNumber: 'Cédula OPP n.º 15786',
    bio: 'O meu nome é Sofia Godinho Cabrita e sou Psicóloga Clínica. Formei-me no Ispa, Instituto Universitário de Ciências Psicológicas, Sociais e da Vida, onde realizei a Licenciatura em Psicologia Aplicada, Ramo de Especialização Clínica e o Mestrado em Psicologia Clínica. Sou membro efetivo da Ordem dos Psicólogos Portugueses.\n\nAo longo de 15 anos de carreira tenho desenvolvido atividade tanto em ambiente clínico como no mundo corporativo e de consultoria, mantendo um investimento continuado nas áreas de avaliação psicológica, promoção de competências de gestão emocional e desenvolvimento pessoal.\n\nNa prática clínica sigo o modelo de referência psicanalítico, sendo a minha grande paixão aliar o conhecimento humano aos desafios das organizações e do próprio indivíduo.\n\nVamos conhecer-nos?\nCédula Profissional: 15786',
    bioEn: 'Clinical Psychologist graduated from Ispa (Degree in Applied Psychology, Clinical Specialization & Master in Clinical Psychology). Full Member of the Portuguese Order of Psychologists (OPP 15786). Over 15 years of experience in clinical practice, corporate consultancy, psychological assessment, and emotional management, working within the psychoanalytic reference model.',
    specialties: [
      'Psicologia Clínica (Modelo Psicanalítico)',
      'Avaliação Psicológica Especializada',
      'Consultoria de Recursos Humanos',
      'Gestão Emocional e Desenvolvimento Pessoal',
      'Orientação Vocacional',
      'Procedimentos Concursais, Condutores e Seguranças'
    ],
    specialtiesEn: [
      'Clinical Psychology (Psychoanalytic Model)',
      'Specialized Psychological Assessment',
      'Human Resources Consulting',
      'Emotional Management & Personal Growth',
      'Vocational Guidance',
      'Certified Assessments for Competitions & Drivers'
    ],
    languages: ['Português', 'English', 'Español'],
    photoUrl: './photo.png',
    consultationTypes: [
      'psicologia-clinica',
      'avaliacao-psicologica',
      'consultoria-rh',
      'psicologia-adultos',
      'apoio-online'
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
