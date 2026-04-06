import { GENERATED_PROJECT_KNOWLEDGE } from './seleneProjectKnowledge.generated';

export const SELENE_PROJECT_KNOWLEDGE = {
  identity: {
    productName: 'Selene',
    creator: 'Luis Mario C.',
    company: 'Sluiooktue Inc.',
    projectLineage: 'Antigravity'
  },
  stack: {
    frontend: ['Vanilla JavaScript', 'Vite', 'CSS', 'Tailwind utilities in landing styles'],
    services: ['Firebase Authentication', 'Cloud Firestore', 'Google Gemini API', 'Google AdSense']
  },
  currentCapabilities: [
    'Google Sign-In login flow',
    'Onboarding with preferred name and discovery questions',
    'Chat interface with Gemini-powered responses',
    'Persistent chat history stored per user in Firestore',
    'Auto-generated short chat titles',
    'Sidebar with recent conversations and chat deletion',
    'Responsive mobile chat input and responsive mobile settings modal',
    'Landing pages for home, features, privacy, terms, and contact',
    'Cookie consent banner for advertising preferences',
    'AdSense script integration with ads gated by consent choice'
  ],
  confirmedBehavior: [
    'Selene can answer general user questions and hold chat conversations through Gemini',
    'Selene stores user and assistant messages in Firestore chat collections',
    'Selene shows suggestion cards on a new chat screen',
    'Selene lets users adjust font size, typing speed, and animations in settings',
    'Selene includes privacy, terms, contact, ads.txt, and AdSense-related disclosures'
  ],
  notImplementedOrLimited: [
    'There is no automatic codebase indexing or live repository search inside Selene responses yet',
    'Upload image and microphone buttons currently show a modal saying the feature is not available',
    'The contact page form currently shows a success state in the UI but does not send messages to a real backend',
    'Selene should not claim features that are not explicitly confirmed in this knowledge file or in the code'
  ],
  inProgressOrNextFocus: [
    'Continue polishing mobile UX and responsive details',
    'Keep improving AdSense readiness and public-site trust signals',
    'Expand Selene project self-knowledge so answers about the product stay concrete and accurate'
  ],
  answeringRules: [
    'When the user asks about Selene, answer from confirmed project facts first',
    'Separate current functionality from planned work',
    'If something is not implemented or not confirmed, say that clearly instead of guessing',
    'When useful, mention the relevant project area such as chat, onboarding, settings, sidebar, privacy, or ads'
  ]
};

export function buildProjectKnowledgeBlock() {
  const sections = [
    ['IDENTIDAD', [
      `Producto: ${SELENE_PROJECT_KNOWLEDGE.identity.productName}`,
      `Creador: ${SELENE_PROJECT_KNOWLEDGE.identity.creator}`,
      `Compania: ${SELENE_PROJECT_KNOWLEDGE.identity.company}`,
      `Proyecto base: ${SELENE_PROJECT_KNOWLEDGE.identity.projectLineage}`
    ]],
    ['STACK', [
      `Frontend: ${SELENE_PROJECT_KNOWLEDGE.stack.frontend.join(', ')}`,
      `Servicios: ${SELENE_PROJECT_KNOWLEDGE.stack.services.join(', ')}`
    ]],
    ['FUNCIONALIDADES ACTUALES', SELENE_PROJECT_KNOWLEDGE.currentCapabilities],
    ['COMPORTAMIENTO CONFIRMADO', SELENE_PROJECT_KNOWLEDGE.confirmedBehavior],
    ['LIMITACIONES O NO IMPLEMENTADO', SELENE_PROJECT_KNOWLEDGE.notImplementedOrLimited],
    ['ENFOQUE ACTUAL O PROXIMO', SELENE_PROJECT_KNOWLEDGE.inProgressOrNextFocus],
    ['REGLAS PARA RESPONDER SOBRE EL PROYECTO', SELENE_PROJECT_KNOWLEDGE.answeringRules],
    ['RUTAS DETECTADAS AUTOMATICAMENTE', GENERATED_PROJECT_KNOWLEDGE.detectedRoutes],
    ['ARCHIVOS DE COMPONENTES DETECTADOS', GENERATED_PROJECT_KNOWLEDGE.componentFiles],
    ['ARCHIVOS DE SERVICIOS DETECTADOS', GENERATED_PROJECT_KNOWLEDGE.serviceFiles],
    ['ARCHIVOS DE LANDING DETECTADOS', GENERATED_PROJECT_KNOWLEDGE.landingFiles],
    ['INTEGRACIONES DETECTADAS AUTOMATICAMENTE', GENERATED_PROJECT_KNOWLEDGE.integrations],
    ['FUNCIONES DETECTADAS AUTOMATICAMENTE', GENERATED_PROJECT_KNOWLEDGE.detectedFeatures],
    ['LIMITACIONES DETECTADAS AUTOMATICAMENTE', GENERATED_PROJECT_KNOWLEDGE.limitations],
    [`ULTIMA SINCRONIZACION AUTOMATICA`, [`Generado en: ${GENERATED_PROJECT_KNOWLEDGE.generatedAt}`]]
  ];

  return sections
    .map(([title, items]) => `${title}:\n${items.map((item) => `- ${item}`).join('\n')}`)
    .join('\n\n');
}
