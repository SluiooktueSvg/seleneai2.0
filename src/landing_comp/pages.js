import { icons } from './router.js';
import { Header, HeroSection, FeaturesSection, CTASection, Footer } from './components.js';

// Home Page
export function HomePage() {
  return `
    ${Header()}
    <main>
      ${HeroSection()}
      ${FeaturesSection()}
      ${CTASection()}
    </main>
    ${Footer()}
  `;
}

// Features Page
export function FeaturesPage() {
  const mainFeatures = [
    { icon: 'brain', title: 'Advanced AI Models', description: 'Powered by cutting-edge language models that understand context, nuance, and intent with human-like comprehension.', benefits: ['Natural language understanding', 'Context-aware responses', 'Multi-turn conversations', 'Continuous learning'], color: 'from-blue-500 to-cyan-500' },
    { icon: 'zap', title: 'Lightning Fast Processing', description: 'Experience instant responses with our optimized infrastructure designed for real-time AI interactions.', benefits: ['Sub-second response times', 'Parallel processing', 'Global CDN distribution', '99.9% uptime guarantee'], color: 'from-yellow-500 to-orange-500' },
    { icon: 'shield', title: 'Enterprise Security', description: 'Your data is protected with military-grade encryption and compliance with international security standards.', benefits: ['End-to-end encryption', 'SOC 2 Type II certified', 'GDPR compliant', 'Regular security audits'], color: 'from-green-500 to-emerald-500' },
    { icon: 'barChart', title: 'Intelligent Analytics', description: 'Gain deep insights into your usage patterns and optimize your workflow with detailed metrics.', benefits: ['Real-time dashboards', 'Custom reports', 'Usage predictions', 'ROI tracking'], color: 'from-purple-500 to-violet-500' }
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
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '50ms', label: 'Avg Response' },
    { value: '100+', label: 'Languages' },
    { value: '10M+', label: 'Daily Requests' }
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
              Discover how Selene transforms the way you work with AI-powered tools designed for productivity, creativity, and collaboration.
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
              <p class="mx-auto max-w-2xl text-[var(--muted-foreground)] animate-fade-in-up-delay-1">A comprehensive suite of AI tools for every use case</p>
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
    { icon: 'database', title: 'Information We Collect', content: 'We collect information you provide directly to us, such as when you create an account, use our services, or contact us. This includes your name, email address, and usage data to improve your AI experience.' },
    { icon: 'eye', title: 'How We Use Your Information', content: 'We use the information we collect to provide, maintain, and improve our AI services, to communicate with you, and to personalize your experience. Your data helps us train and enhance our AI models while maintaining strict privacy standards.' },
    { icon: 'lock', title: 'Data Security', content: 'We implement industry-standard security measures to protect your personal information. All data is encrypted in transit and at rest using AES-256 encryption. We regularly audit our security practices and maintain SOC 2 Type II compliance.' },
    { icon: 'userCheck', title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal information at any time. You can export your data, request account deletion, or opt-out of certain data collection practices through your account settings.' },
    { icon: 'bell', title: 'Updates to This Policy', content: 'We may update this Privacy Policy from time to time. We will notify you of any significant changes by email or through a prominent notice on our platform at least 30 days before the changes take effect.' }
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
          <p class="text-lg text-[var(--muted-foreground)]">Last updated: March 2026</p>
        </div>

        <div class="mb-12 rounded-2xl border border-[rgba(39,39,42,0.5)] bg-[var(--card)]/50 p-6 backdrop-blur-sm animate-fade-in-up-delay-1">
          <p class="text-[var(--muted-foreground)] leading-relaxed">
            At Selene, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI platform. Please read this policy carefully to understand our practices regarding your personal data.
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
          <h3 class="mb-2 text-lg font-semibold">Questions about your privacy?</h3>
          <p class="mb-4 text-[var(--muted-foreground)]">Contact our privacy team for any concerns or requests.</p>
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
    { icon: 'check', title: 'Acceptance of Terms', content: 'By accessing or using Selene AI services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to update these terms at any time.' },
    { icon: 'scale', title: 'Use of Services', content: 'You may use Selene AI for lawful purposes only. You agree not to use our services to generate harmful, illegal, or misleading content. Our AI tools are designed to assist and augment your work, not replace professional advice.' },
    { icon: 'ban', title: 'Prohibited Activities', content: 'Users may not: attempt to reverse engineer our AI models, use the service for spam or harassment, violate intellectual property rights, share account credentials, or use automated systems to access our services without permission.' },
    { icon: 'fileText', title: 'Intellectual Property', content: 'Content you create using Selene belongs to you, subject to our license to provide services. The Selene platform, including all AI models, software, and documentation, remains our exclusive property protected by intellectual property laws.' },
    { icon: 'alertTriangle', title: 'Limitation of Liability', content: 'Selene AI is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of our services. Our total liability is limited to the amount you paid in the last 12 months.' },
    { icon: 'refreshCw', title: 'Subscription & Cancellation', content: 'Paid subscriptions are billed monthly or annually. You may cancel at any time, and your access will continue until the end of the billing period. Refunds are available within 14 days of initial purchase for annual plans.' }
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
          <p class="text-lg text-[var(--muted-foreground)]">Last updated: March 2026</p>
        </div>

        <div class="mb-12 rounded-2xl border border-[rgba(39,39,42,0.5)] bg-[var(--card)]/50 p-6 backdrop-blur-sm animate-fade-in-up-delay-1">
          <p class="text-[var(--muted-foreground)] leading-relaxed">
            Welcome to Selene. These Terms of Service govern your use of our AI-powered platform and services. By using Selene, you enter into a binding agreement with us. Please read these terms carefully before proceeding.
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
          <p class="mb-4 text-[var(--muted-foreground)]">Our legal team is here to help clarify any concerns.</p>
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
    { icon: 'mail', title: 'Email', value: 'support@selene.ai', description: 'Send us an email anytime' },
    { icon: 'messageSquare', title: 'Live Chat', value: 'Available 24/7', description: 'Get instant support' },
    { icon: 'mapPin', title: 'Office', value: 'San Francisco, CA', description: 'Visit our headquarters' },
    { icon: 'clock', title: 'Response Time', value: 'Under 24 hours', description: 'We reply quickly' }
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
            Have questions about Selene? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
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
              <h3 class="mb-2 text-lg font-semibold">Looking for quick answers?</h3>
              <p class="mb-4 text-[var(--muted-foreground)]">Check out our documentation and frequently asked questions.</p>
              <button class="btn btn-outline border-purple-500/50 text-purple-400 hover:bg-purple-500/10">View Documentation</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
