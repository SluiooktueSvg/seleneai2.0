import { icons } from './router.js';
import { Header, HeroSection, FeaturesSection, CTASection, FAQSection, Footer } from './components.js';

// Home Page
export function HomePage() {
  return `
    ${Header()}
    <main>
      ${HeroSection()}
      ${FeaturesSection()}
      ${FAQSection()}
      ${CTASection()}
    </main>
    ${Footer()}
  `;
}

// Features Page
export function FeaturesPage() {
  const mainFeatures = [
    { icon: 'brain', title: 'Practical AI Assistance', description: 'Selene focuses on everyday use cases such as writing help, idea generation, coding support, and question answering.', benefits: ['Prompt-based conversations', 'Chat history support', 'Suggestion shortcuts', 'General productivity help'], color: 'from-blue-500 to-cyan-500' },
    { icon: 'zap', title: 'Focused Product Experience', description: 'The interface is built to keep the conversation readable and usable on both desktop and mobile screens.', benefits: ['Clean chat layout', 'Responsive input area', 'Mobile navigation support', 'Fast page transitions'], color: 'from-yellow-500 to-orange-500' },
    { icon: 'shield', title: 'Transparent Site Policies', description: 'Visitors can review public pages that explain how the site works, how to get in touch, and how privacy choices affect ads.', benefits: ['Privacy page', 'Terms page', 'Contact page', 'Cookie choice banner'], color: 'from-green-500 to-emerald-500' },
    { icon: 'barChart', title: 'Continuous Improvements', description: 'Selene can keep evolving as the product matures, with UI updates, policy clarifications, and new features added over time.', benefits: ['Interface refinements', 'Policy updates', 'Feature adjustments', 'Better mobile support'], color: 'from-purple-500 to-violet-500' }
  ];

  const capabilities = [
    { icon: 'messageSquare', title: 'Conversational AI', description: 'Natural dialogue for customer support, virtual assistants, and interactive experiences.' },
    { icon: 'image', title: 'Image Generation', description: 'Create stunning visuals from text descriptions with our advanced image models.' },
    { icon: 'code', title: 'Code Assistant', description: 'Generate, debug, and optimize code across 50+ programming languages.' },
    { icon: 'fileText', title: 'Document Analysis', description: 'Extract insights, summarize, and analyze documents of any format instantly.' },
    { icon: 'globe', title: 'Multi-language Support', description: 'Communicate in 100+ languages with accurate translation and localization.' },
    { icon: 'lock', title: 'Access Control', description: 'Granular permissions and role-based access for team collaboration.' }
  ];

  const stats = [
    { value: 'Web', label: 'Browser Access' },
    { value: 'AI', label: 'Assistant Workflow' },
    { value: '24/7', label: 'Site Availability Goal' },
    { value: 'Public', label: 'Policy Pages' }
  ];

  return `
    <div class="min-h-screen bg-[var(--background)]">
      <div class="pointer-events-none fixed inset-0 overflow-hidden">
        <div class="absolute -left-40 top-0 h-[500px] w-[500px] animate-pulse rounded-full bg-gradient-to-br from-blue-600/20 via-purple-600/15 to-transparent blur-3xl"></div>
        <div class="absolute -right-40 bottom-0 h-[600px] w-[600px] animate-pulse rounded-full bg-gradient-to-tl from-violet-600/20 via-purple-600/15 to-transparent blur-3xl" style="animation-delay: 1s"></div>
      </div>

      <header class="sticky top-0 z-50 border-b border-[rgba(39,39,42,0.4)] bg-[var(--background)]/80 backdrop-blur-xl">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="/" class="group flex items-center gap-2 text-[var(--muted-foreground)] transition-all duration-300 hover:text-[var(--foreground)] active:scale-95 touch-manipulation">
            <span class="transition-transform duration-300 group-hover:-translate-x-1">${icons.arrowLeft}</span>
            <span>Back to Home</span>
          </a>
          <a href="/" class="flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-violet-600">
              <span class="h-4 w-4 text-white">${icons.sparkles}</span>
            </div>
            <span class="text-lg font-semibold gradient-text">Selene</span>
          </a>
        </div>
      </header>

      <main class="relative z-10">
        <section class="px-4 py-20 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-4xl text-center">
            <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 animate-fade-in-up">
              <span class="h-4 w-4 text-purple-400">${icons.sparkles}</span>
              <span class="text-sm text-purple-300">Explore Our Platform</span>
            </div>
            <h1 class="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl animate-fade-in-up-delay-1">
              <span>Powerful </span>
              <span class="gradient-text">Features</span>
              <span> for</span>
              <br>
              <span>Modern Teams</span>
            </h1>
            <p class="mx-auto max-w-2xl text-lg text-[var(--muted-foreground)] animate-fade-in-up-delay-2">
              Learn what Selene offers today, how the experience is structured, and which public pages are available to support transparency and trust.
            </p>
          </div>
        </section>

        <section class="border-y border-[rgba(39,39,42,0.4)] bg-[var(--secondary)]/20 px-4 py-12 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-5xl">
            <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
              ${stats.map((stat, index) => `
                <div class="text-center animate-fade-in-up-delay-${index + 3}">
                  <div class="text-3xl font-bold gradient-text sm:text-4xl">${stat.value}</div>
                  <div class="mt-1 text-sm text-[var(--muted-foreground)]">${stat.label}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <section class="px-4 py-24 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-7xl">
            <div class="mb-16 text-center">
              <h2 class="mb-4 text-3xl font-bold sm:text-4xl animate-fade-in-up">Core Capabilities</h2>
              <p class="mx-auto max-w-2xl text-[var(--muted-foreground)] animate-fade-in-up-delay-1">Built from the ground up to handle the most demanding AI workloads</p>
            </div>
            <div class="grid gap-8 lg:grid-cols-2">
              ${mainFeatures.map((feature, index) => `
                <div class="card group p-8 animate-fade-in-up-delay-${index + 2}">
                  <div class="flex items-start gap-6">
                    <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <span class="h-7 w-7 text-white">${icons[feature.icon]}</span>
                    </div>
                    <div class="flex-1">
                      <h3 class="mb-2 text-xl font-semibold transition-colors duration-300 group-hover:text-purple-300">${feature.title}</h3>
                      <p class="mb-4 text-[var(--muted-foreground)] leading-relaxed">${feature.description}</p>
                      <ul class="space-y-2">
                        ${feature.benefits.map(benefit => `
                          <li class="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                            <span class="text-green-400">${icons.check}</span>
                            <span>${benefit}</span>
                          </li>
                        `).join('')}
                      </ul>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <section class="border-t border-[rgba(39,39,42,0.4)] bg-[var(--secondary)]/10 px-4 py-24 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-7xl">
            <div class="mb-16 text-center">
              <h2 class="mb-4 text-3xl font-bold sm:text-4xl animate-fade-in-up">Everything You Need</h2>
              <p class="mx-auto max-w-2xl text-[var(--muted-foreground)] animate-fade-in-up-delay-1">Core capabilities and site sections that help visitors understand the product before signing in</p>
            </div>
            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              ${capabilities.map((cap, index) => `
                <div class="card group p-6 animate-fade-in-up-delay-${Math.min(index + 2, 6)}">
                  <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-violet-600/20 transition-all duration-300 group-hover:from-blue-600/30 group-hover:via-purple-600/30 group-hover:to-violet-600/30 group-hover:scale-105">
                    <span class="h-6 w-6 text-purple-400 transition-colors duration-300 group-hover:text-purple-300">${icons[cap.icon]}</span>
                  </div>
                  <h3 class="mb-2 text-lg font-semibold transition-colors duration-300 group-hover:text-purple-300">${cap.title}</h3>
                  <p class="text-sm text-[var(--muted-foreground)] leading-relaxed">${cap.description}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <section class="px-4 py-24 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-3xl text-center">
            <div class="rounded-2xl border border-[rgba(39,39,42,0.5)] bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-violet-500/10 p-12 backdrop-blur-sm">
              <span class="mx-auto mb-6 block h-12 w-12 text-purple-400 animate-pulse">${icons.clock}</span>
              <h2 class="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
              <p class="mb-8 text-[var(--muted-foreground)]">Join thousands of teams already using Selene to transform their workflow. Start your free trial today.</p>
              <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="/">
                  <button class="btn btn-primary group relative w-full overflow-hidden rounded-xl px-8 py-4 text-lg font-medium sm:w-auto touch-manipulation">
                    <span class="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                    <span class="relative flex items-center gap-2">
                      <span class="h-5 w-5">${icons.sparkles}</span>
                      Start Free Trial
                    </span>
                  </button>
                </a>
                <a href="/contact">
                  <button class="btn btn-outline group w-full rounded-xl px-8 py-4 text-lg font-medium sm:w-auto touch-manipulation">Contact Sales</button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer class="border-t border-[rgba(39,39,42,0.4)] bg-[var(--background)]/50 px-4 py-8 backdrop-blur-xl">
        <div class="mx-auto max-w-7xl text-center">
          <p class="text-sm text-[var(--muted-foreground)]">${new Date().getFullYear()} Selene. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `;
}

// Privacy Page
export function PrivacyPage() {
  const sections = [
    { icon: 'database', title: 'Information We Collect', content: 'We may collect account details provided through Google Sign-In, information submitted in contact forms, and the prompts or usage data required to operate the Selene experience.' },
    { icon: 'eye', title: 'How We Use Information', content: 'We use this information to authenticate users, provide the AI assistant, improve reliability, answer support requests, prevent abuse, and maintain the service.' },
    { icon: 'lock', title: 'Third-Party Services', content: 'Selene relies on third-party services such as Firebase, Google Sign-In, AI APIs, and Google AdSense. These services may process technical information needed to deliver authentication, hosting, analytics, or advertising.' },
    { icon: 'shieldCheck', title: 'Advertising and Cookies', content: 'If advertising is enabled on Selene, Google may use cookies or similar technologies to measure ads and, where allowed, personalize them. Visitors can choose whether to accept advertising cookies or continue with essential cookies only.' },
    { icon: 'userCheck', title: 'Your Rights', content: 'You can contact us to request access, correction, or deletion of personal data that we control. You can also manage local browser data by clearing stored site data in your browser settings.' },
    { icon: 'bell', title: 'Policy Updates', content: 'We may update this Privacy Policy when our product, legal obligations, or advertising setup changes. The latest version will always be published on this page with a revised update date.' }
  ];

  return `
    <div class="relative min-h-screen overflow-hidden bg-[var(--background)]">
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl"></div>
        <div class="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-purple-600/20 to-violet-600/20 blur-3xl" style="animation-delay: 1s"></div>
      </div>

      <div class="relative z-10 mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <a href="/" class="group mb-8 inline-flex items-center gap-2 text-[var(--muted-foreground)] transition-all duration-300 hover:text-[var(--foreground)] active:scale-95 touch-manipulation">
          <span class="inline-flex transition-transform duration-300 group-hover:-translate-x-1">${icons.arrowLeft}</span>
          <span>Back to Home</span>
        </a>

        <div class="mb-12 text-center animate-fade-in-up">
          <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-violet-600 shadow-lg shadow-purple-500/30">
            <span class="h-8 w-8 text-white">${icons.shield}</span>
          </div>
          <h1 class="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy <span class="gradient-text">Policy</span>
          </h1>
          <p class="text-lg text-[var(--muted-foreground)]">Last updated: April 2026</p>
        </div>

        <div class="mb-12 rounded-2xl border border-[rgba(39,39,42,0.5)] bg-[var(--card)]/50 p-6 backdrop-blur-sm animate-fade-in-up-delay-1">
          <p class="text-[var(--muted-foreground)] leading-relaxed">
            This Privacy Policy explains what Selene collects, how the service works with authentication, AI responses, and advertising, and what choices visitors have when cookies or Google ads are involved.
          </p>
        </div>

        <div class="space-y-6">
          ${sections.map((section, index) => `
            <div class="group rounded-2xl border border-[rgba(39,39,42,0.5)] bg-[var(--card)]/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 animate-fade-in-up-delay-${Math.min(index + 2, 6)}">
              <div class="flex items-start gap-4">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 transition-all duration-300 group-hover:from-blue-500/30 group-hover:to-purple-500/30">
                  <span class="h-6 w-6 text-purple-400 transition-transform duration-300 group-hover:scale-110">${icons[section.icon]}</span>
                </div>
                <div>
                  <h2 class="mb-2 text-xl font-semibold transition-colors duration-300 group-hover:text-purple-400">${section.title}</h2>
                  <p class="text-[var(--muted-foreground)] leading-relaxed">${section.content}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div id="advertising" class="mt-12 rounded-2xl border border-[rgba(39,39,42,0.5)] bg-[var(--card)]/50 p-6 backdrop-blur-sm animate-fade-in-up-delay-6">
          <h2 class="mb-3 text-2xl font-semibold">Google AdSense and advertising disclosures</h2>
          <div class="space-y-3 text-[var(--muted-foreground)] leading-relaxed">
            <p>Selene may display advertising supplied by Google AdSense. Google and its partners may use cookies to serve and measure ads based on visits to this site or other websites.</p>
            <p>You can choose to accept advertising cookies or continue with essential cookies only when the privacy banner is shown. If you decline advertising cookies, Selene can request non-personalized ads where supported.</p>
            <p>For more information about how Google uses data in advertising, visit Google's advertising and privacy materials. If you are in a region where consent is required, additional consent messaging may apply before ads are requested.</p>
          </div>
        </div>

        <div class="mt-12 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-violet-500/10 p-6 text-center backdrop-blur-sm animate-fade-in-up-delay-6">
          <h3 class="mb-2 text-lg font-semibold">Questions about your privacy?</h3>
          <p class="mb-4 text-[var(--muted-foreground)]">Use the contact page if you need help with privacy, cookies, account data, or advertising disclosures.</p>
          <a href="/contact">
            <button class="btn btn-primary">Contact Us</button>
          </a>
        </div>
      </div>
    </div>
  `;
}

// Terms Page
export function TermsPage() {
  const sections = [
    { icon: 'check', title: 'Acceptance of Terms', content: 'By accessing or using Selene, you agree to these Terms of Service. If you do not agree, please do not use the site or the authenticated assistant experience.' },
    { icon: 'scale', title: 'Permitted Use', content: 'You may use Selene for lawful personal or business purposes. You are responsible for reviewing AI-generated output before relying on it in real situations.' },
    { icon: 'ban', title: 'Prohibited Activities', content: 'You may not misuse the service to break the law, abuse authentication systems, scrape restricted data, interfere with site operations, or generate harmful or deceptive content.' },
    { icon: 'fileText', title: 'Content and Ownership', content: 'You retain responsibility for the content you submit or generate. Selene, its branding, interface, and site code remain protected by applicable intellectual property laws.' },
    { icon: 'alertTriangle', title: 'No Professional Advice', content: 'Selene can make mistakes. The service is provided for informational and productivity purposes and should not be treated as legal, medical, financial, or other professional advice.' },
    { icon: 'refreshCw', title: 'Changes to the Service', content: 'We may update features, pricing, policies, or advertising placements as the project evolves. Material changes will be reflected on the site and in updated policy documents where appropriate.' }
  ];

  return `
    <div class="relative min-h-screen overflow-hidden bg-[var(--background)]">
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl"></div>
        <div class="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-purple-600/20 to-violet-600/20 blur-3xl" style="animation-delay: 1s"></div>
      </div>

      <div class="relative z-10 mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <a href="/" class="group mb-8 inline-flex items-center gap-2 text-[var(--muted-foreground)] transition-all duration-300 hover:text-[var(--foreground)] active:scale-95 touch-manipulation">
          <span class="inline-flex transition-transform duration-300 group-hover:-translate-x-1">${icons.arrowLeft}</span>
          <span>Back to Home</span>
        </a>

        <div class="mb-12 text-center animate-fade-in-up">
          <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-violet-600 shadow-lg shadow-purple-500/30">
            <span class="h-8 w-8 text-white">${icons.fileText}</span>
          </div>
          <h1 class="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Terms of <span class="gradient-text">Service</span>
          </h1>
          <p class="text-lg text-[var(--muted-foreground)]">Last updated: April 2026</p>
        </div>

        <div class="mb-12 rounded-2xl border border-[rgba(39,39,42,0.5)] bg-[var(--card)]/50 p-6 backdrop-blur-sm animate-fade-in-up-delay-1">
          <p class="text-[var(--muted-foreground)] leading-relaxed">
            These Terms of Service describe the basic rules for using Selene responsibly, including acceptable use, ownership, disclaimers, and site updates.
          </p>
        </div>

        <div class="space-y-6">
          ${sections.map((section, index) => `
            <div class="group rounded-2xl border border-[rgba(39,39,42,0.5)] bg-[var(--card)]/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 animate-fade-in-up-delay-${Math.min(index + 2, 6)}">
              <div class="flex items-start gap-4">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 transition-all duration-300 group-hover:from-blue-500/30 group-hover:to-purple-500/30">
                  <span class="h-6 w-6 text-purple-400 transition-transform duration-300 group-hover:scale-110">${icons[section.icon]}</span>
                </div>
                <div>
                  <h2 class="mb-2 text-xl font-semibold transition-colors duration-300 group-hover:text-purple-400">${section.title}</h2>
                  <p class="text-[var(--muted-foreground)] leading-relaxed">${section.content}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="mt-12 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-violet-500/10 p-6 text-center backdrop-blur-sm animate-fade-in-up-delay-6">
          <h3 class="mb-2 text-lg font-semibold">Questions about our terms?</h3>
          <p class="mb-4 text-[var(--muted-foreground)]">Use the contact page if you need clarification about usage, content, or policy questions.</p>
          <a href="/contact">
            <button class="btn btn-primary">Contact Us</button>
          </a>
        </div>
      </div>
    </div>
  `;
}

// Contact Page
export function ContactPage() {
  const contactInfo = [
    { icon: 'mail', title: 'Support', value: 'Use the contact form', description: 'Best option for product, privacy, or account questions' },
    { icon: 'messageSquare', title: 'Policy Requests', value: 'Privacy and advertising', description: 'Reach out for cookies, AdSense, or data concerns' },
    { icon: 'clock', title: 'Response Time', value: 'As soon as possible', description: 'We review requests in the order they arrive' },
    { icon: 'shield', title: 'Site Notices', value: 'Public policy pages available', description: 'Privacy, terms, and contact details stay accessible on the site' }
  ];

  return `
    <div class="relative min-h-screen overflow-hidden bg-[var(--background)]">
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl"></div>
        <div class="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-purple-600/20 to-violet-600/20 blur-3xl" style="animation-delay: 1s"></div>
      </div>

      <div class="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <a href="/" class="group mb-8 inline-flex items-center gap-2 text-[var(--muted-foreground)] transition-all duration-300 hover:text-[var(--foreground)] active:scale-95 touch-manipulation">
          <span class="inline-flex transition-transform duration-300 group-hover:-translate-x-1">${icons.arrowLeft}</span>
          <span>Back to Home</span>
        </a>

        <div class="mb-12 text-center animate-fade-in-up">
          <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-violet-600 shadow-lg shadow-purple-500/30">
            <span class="h-8 w-8 text-white">${icons.mail}</span>
          </div>
          <h1 class="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Get in <span class="gradient-text">Touch</span>
          </h1>
          <p class="mx-auto max-w-2xl text-lg text-[var(--muted-foreground)]">
            Use this page for support, business questions, privacy requests, or advertising-related inquiries about Selene.
          </p>
        </div>

        <div class="grid gap-8 lg:grid-cols-2">
          <div class="rounded-2xl border border-[rgba(39,39,42,0.5)] bg-[var(--card)]/50 p-8 backdrop-blur-sm animate-fade-in-up-delay-1">
            <div id="form-container">
              <form id="contact-form" class="space-y-6">
                <div class="grid gap-6 sm:grid-cols-2">
                  <div class="space-y-2">
                    <label class="text-sm font-medium">Name</label>
                    <input type="text" required placeholder="Your name" class="input">
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-medium">Email</label>
                    <input type="email" required placeholder="your@email.com" class="input">
                  </div>
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium">Subject</label>
                  <input type="text" required placeholder="How can we help?" class="input">
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium">Message</label>
                  <textarea required placeholder="Tell us more about your inquiry..." rows="5" class="input textarea"></textarea>
                </div>
                <button type="submit" class="btn btn-primary group w-full">
                  <span class="mr-2 transition-transform duration-300 group-hover:translate-x-1">${icons.send}</span>
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div class="space-y-6">
            ${contactInfo.map((info, index) => `
              <div class="group rounded-2xl border border-[rgba(39,39,42,0.5)] bg-[var(--card)]/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 animate-fade-in-up-delay-${index + 2}">
                <div class="flex items-center gap-4">
                  <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 transition-all duration-300 group-hover:from-blue-500/30 group-hover:to-purple-500/30">
                    <span class="h-6 w-6 text-purple-400 transition-transform duration-300 group-hover:scale-110">${icons[info.icon]}</span>
                  </div>
                  <div>
                    <p class="text-sm text-[var(--muted-foreground)]">${info.title}</p>
                    <p class="font-semibold transition-colors duration-300 group-hover:text-purple-400">${info.value}</p>
                    <p class="text-sm text-[var(--muted-foreground)]">${info.description}</p>
                  </div>
                </div>
              </div>
            `).join('')}

            <div class="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-violet-500/10 p-6 backdrop-blur-sm animate-fade-in-up-delay-6">
              <h3 class="mb-2 text-lg font-semibold">Need privacy or AdSense details?</h3>
              <p class="mb-4 text-[var(--muted-foreground)]">You can also review our privacy and terms pages for cookie, advertising, and data-handling information.</p>
              <a href="/privacy">
                <button class="btn btn-outline border-purple-500/50 text-purple-400 hover:bg-purple-500/10">View Privacy Policy</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
