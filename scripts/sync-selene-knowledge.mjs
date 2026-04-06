import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const srcRoot = path.join(projectRoot, 'src');
const outputPath = path.join(srcRoot, 'config', 'seleneProjectKnowledge.generated.js');
const adsTxtPath = path.join(projectRoot, 'public', 'ads.txt');

function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

function listFilesRecursive(dirPath) {
  if (!fs.existsSync(dirPath)) return [];

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFilesRecursive(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function readIfExists(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function uniqueSorted(items) {
  return [...new Set(items.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function detectRoutes(mainJsContent) {
  const routeMatches = [...mainJsContent.matchAll(/['"]([^'"]+)['"]\s*:\s*([A-Za-z0-9_]+)/g)];
  return uniqueSorted(routeMatches.map(([, route, component]) => `${route} -> ${component}`));
}

function detectSettings(settingsContent) {
  const settings = [];
  if (settingsContent.includes('font-size-select')) settings.push('Font size setting');
  if (settingsContent.includes('speed-select')) settings.push('Typing speed setting');
  if (settingsContent.includes('animations-toggle')) settings.push('Animation toggle setting');
  if (settingsContent.includes('logout-btn')) settings.push('Logout action in settings');
  return settings;
}

function detectUnavailableInputFeatures(inputAreaContent) {
  const limitations = [];
  if (inputAreaContent.includes('upload-btn') && inputAreaContent.includes('Función no disponible')) {
    limitations.push('Image upload button is present in the UI but currently unavailable');
  }
  if (inputAreaContent.includes('mic-btn') && inputAreaContent.includes('Función no disponible')) {
    limitations.push('Microphone button is present in the UI but currently unavailable');
  }
  return limitations;
}

function detectIntegrations(fileContents) {
  const integrations = [];
  const combined = fileContents.join('\n');

  if (combined.includes('@google/generative-ai')) integrations.push('Google Gemini API integration');
  if (combined.includes('firebase/auth')) integrations.push('Firebase Authentication integration');
  if (combined.includes('firebase/firestore')) integrations.push('Cloud Firestore integration');
  if (combined.includes('adsbygoogle')) integrations.push('Google AdSense integration');
  if (combined.includes('GoogleAuthProvider')) integrations.push('Google Sign-In provider');

  return uniqueSorted(integrations);
}

function fileLabel(fullPath) {
  return toPosix(path.relative(projectRoot, fullPath));
}

function detectExportedModules(files) {
  return uniqueSorted(
    files
      .filter((file) => file.endsWith('.js'))
      .map((file) => fileLabel(file))
  );
}

function generateKnowledge() {
  const componentFiles = listFilesRecursive(path.join(srcRoot, 'components'));
  const serviceFiles = listFilesRecursive(path.join(srcRoot, 'services'));
  const landingFiles = listFilesRecursive(path.join(srcRoot, 'landing_comp'));
  const configFiles = listFilesRecursive(path.join(srcRoot, 'config'));
  const allRelevantFiles = [...componentFiles, ...serviceFiles, ...landingFiles, ...configFiles];

  const fileContents = allRelevantFiles.map((file) => readIfExists(file));
  const mainJsContent = readIfExists(path.join(srcRoot, 'main.js'));
  const settingsContent = readIfExists(path.join(srcRoot, 'components', 'SettingsModal.js'));
  const inputAreaContent = readIfExists(path.join(srcRoot, 'components', 'InputArea.js'));
  const historyContent = readIfExists(path.join(srcRoot, 'services', 'history.js'));
  const sidebarContent = readIfExists(path.join(srcRoot, 'components', 'Sidebar.js'));
  const cookieConsentContent = readIfExists(path.join(srcRoot, 'components', 'CookieConsent.js'));
  const onboardingContent = readIfExists(path.join(srcRoot, 'components', 'Onboarding.js'));

  const detectedFeatures = [
    mainJsContent.includes('loginWithGoogle') ? 'Google login flow is wired from the landing page into the app' : '',
    onboardingContent ? 'Onboarding flow exists before entering the main app experience' : '',
    historyContent.includes('subscribeToMessages') ? 'Chat history is persisted and streamed from Firestore' : '',
    historyContent.includes('deleteChat') ? 'Users can delete chat conversations from the sidebar' : '',
    sidebarContent.includes('mobile-menu-toggle') ? 'Sidebar includes a dedicated mobile menu toggle' : '',
    cookieConsentContent ? 'Cookie consent preferences are stored locally before enabling ads' : '',
    fs.existsSync(adsTxtPath) ? 'ads.txt file is present in public assets for AdSense setup' : '',
    ...detectSettings(settingsContent)
  ];

  const limitations = [
    ...detectUnavailableInputFeatures(inputAreaContent),
    inputAreaContent.includes('matchMedia') ? 'Input placeholder text adapts for smaller mobile widths' : '',
    cookieConsentContent ? 'Ad consent is stored per browser through localStorage, not per authenticated account' : ''
  ];

  return {
    generatedAt: new Date().toISOString(),
    detectedRoutes: detectRoutes(mainJsContent),
    componentFiles: detectExportedModules(componentFiles),
    serviceFiles: detectExportedModules(serviceFiles),
    landingFiles: detectExportedModules(landingFiles),
    integrations: detectIntegrations(fileContents),
    detectedFeatures: uniqueSorted(detectedFeatures),
    limitations: uniqueSorted(limitations)
  };
}

function writeKnowledgeFile(knowledge) {
  const output = `export const GENERATED_PROJECT_KNOWLEDGE = ${JSON.stringify(knowledge, null, 2)};\n`;
  fs.writeFileSync(outputPath, output, 'utf8');
}

const knowledge = generateKnowledge();
writeKnowledgeFile(knowledge);

console.log(`[sync-selene-knowledge] Updated ${fileLabel(outputPath)}`);
