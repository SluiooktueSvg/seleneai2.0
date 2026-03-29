import { icons } from './router.js';

// Header Component
export function Header() {
  return `
    <header class="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" class="group flex items-center gap-3 transition-all duration-500 hover:scale-105 active:scale-95 touch-manipulation rounded-xl">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-violet-600 shadow-lg shadow-purple-500/25 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-purple-500/40">
            <span class="inline-flex h-5 w-5 items-center justify-center text-white">${icons.sparkles}</span>
          </div>
          <span class="text-2xl font-bold gradient-text transition-all duration-300 group-hover:tracking-wide">Selene</span>
        </a>
        <div class="flex items-center">
          <button class="btn btn-primary group relative overflow-hidden px-6 py-3">
            <span class="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            <span class="relative transition-all duration-300 group-hover:tracking-wider">Sign In</span>
          </button>
        </div>
      </div>
    </header>
  `;
}

// Hero Section Component
export function HeroSection() {
  return `
    <section class="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-16">
      <!-- Background gradient orbs -->
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute -left-40 top-0 h-[500px] w-[500px] animate-pulse rounded-full bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-transparent blur-3xl"></div>
        <div class="absolute -right-40 bottom-0 h-[600px] w-[600px] animate-pulse rounded-full bg-gradient-to-tl from-violet-600/30 via-purple-600/20 to-transparent blur-3xl" style="animation-delay: 1s"></div>
        <div class="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/15 to-violet-500/10 blur-3xl" style="animation-delay: 2s"></div>
      </div>

      <!-- Grid pattern overlay -->
      <div class="pointer-events-none absolute inset-0 opacity-20" style="background-image: linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px); background-size: 60px 60px;"></div>

      <div class="relative z-10 mx-auto max-w-5xl text-center">
        <!-- Badge -->
        <div class="mb-8 inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-[rgba(39,39,42,0.5)] bg-[rgba(26,26,36,0.5)] px-4 py-2 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95 touch-manipulation">
          <span class="inline-flex h-4 w-4 animate-pulse items-center justify-center text-purple-400">${icons.sparkles}</span>
          <span class="text-sm text-[var(--muted-foreground)]">Powered by Artificial Intelligence</span>
        </div>

        <!-- Main heading -->
        <h1 class="mb-6 animate-fade-in-up-delay-2 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl" style="text-wrap: balance;">
          <span class="inline-block transition-all duration-500 hover:scale-105">The future of</span>
          <span class="inline-block gradient-text transition-all duration-500 hover:scale-110"> productivity </span>
          <span class="inline-block transition-all duration-500 hover:scale-105">is here</span>
        </h1>

        <!-- Subtitle -->
        <p class="mx-auto mb-10 max-w-2xl animate-fade-in-up-delay-4 text-lg text-[var(--muted-foreground)] transition-all duration-500 hover:text-[var(--foreground)]/80 sm:text-xl" style="text-wrap: pretty;">
          Transform the way you work with our next-generation AI platform. Automate tasks, generate content, and unleash your creativity without limits.
        </p>

        <!-- CTA Buttons -->
        <div class="flex animate-fade-in-up-delay-6 flex-col items-center justify-center gap-4 sm:flex-row">
          <button id="google-signin-btn" class="btn btn-primary group relative w-full overflow-hidden rounded-xl px-8 py-4 text-lg font-medium sm:w-auto touch-manipulation">
            <span class="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            <span class="relative flex items-center justify-center gap-3 transition-all duration-300 group-hover:tracking-wide group-active:tracking-wide">
              <span class="inline-flex h-5 w-5 flex-shrink-0 transition-transform duration-500 group-hover:rotate-[360deg] group-active:scale-90">${icons.google}</span>
              <span>Continue with Google</span>
            </span>
          </button>

          <a href="/features" class="w-full sm:w-auto">
            <button class="btn btn-outline group w-full rounded-xl px-8 py-4 text-lg font-medium sm:w-auto touch-manipulation">
              <span class="transition-all duration-300 group-hover:tracking-wide group-active:tracking-wide">Explore Features</span>
              <span class="ml-2 inline-flex h-5 w-5 flex-shrink-0 transition-all duration-500 group-hover:translate-x-2 group-hover:text-purple-400 group-active:translate-x-2 group-active:text-purple-400">${icons.arrowRight}</span>
            </button>
          </a>
        </div>
      </div>
    </section>
  `;
}

// Features Section Component
export function FeaturesSection() {
  const features = [
    { icon: 'brain', title: 'Advanced AI', description: 'State-of-the-art language models that understand and generate content with exceptional precision.' },
    { icon: 'zap', title: 'Ultra Fast', description: 'Instant responses and real-time processing to maximize your productivity.' },
    { icon: 'shield', title: 'Secure & Private', description: 'Your data is protected with enterprise-grade encryption and regulatory compliance.' },
    { icon: 'barChart', title: 'Smart Analytics', description: 'Get deep insights and detailed metrics about your usage and performance.' }
  ];

  return `
    <section id="features" class="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute left-1/2 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-pulse"></div>
      </div>

      <div class="relative z-10 mx-auto max-w-7xl">
        <div class="mb-16 text-center">
          <h2 class="mb-4 text-3xl font-bold sm:text-4xl animate-fade-in-up-delay-1 transition-all duration-500 hover:scale-105">
            <span class="inline-block transition-all duration-500 hover:text-purple-300">Powerful</span>
            <span class="gradient-text"> Features</span>
          </h2>
          <p class="mx-auto max-w-2xl text-[var(--muted-foreground)] animate-fade-in-up-delay-2 transition-all duration-500 hover:text-[var(--foreground)]/80">
            Everything you need to take your productivity to the next level, integrated into a single platform.
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          ${features.map((feature, index) => `
            <div class="card group cursor-pointer p-6 animate-fade-in-up-delay-${index + 3}" tabindex="0">
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-violet-600/20 transition-all duration-500 group-hover:from-blue-600/40 group-hover:via-purple-600/40 group-hover:to-violet-600/40 group-hover:scale-110 group-hover:rotate-3 group-active:scale-95">
                <span class="inline-flex h-6 w-6 items-center justify-center text-purple-400 transition-all duration-500 group-hover:scale-110 group-hover:text-purple-300">${icons[feature.icon]}</span>
              </div>
              <h3 class="mb-2 text-lg font-semibold transition-all duration-300 group-hover:text-purple-300 group-hover:tracking-wide group-active:text-purple-300">${feature.title}</h3>
              <p class="text-sm leading-relaxed text-[var(--muted-foreground)] transition-all duration-500 group-hover:text-[var(--foreground)]/70">${feature.description}</p>
              <div class="absolute inset-0 -z-10 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

// CTA Section Component
export function CTASection() {
  return `
    <section class="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div class="relative z-10 mx-auto max-w-4xl">
        <div class="group relative overflow-hidden rounded-3xl border border-[rgba(39,39,42,0.5)] bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-violet-600/10 p-8 backdrop-blur-xl sm:p-12 lg:p-16 transition-all duration-700 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20">
          <div class="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl transition-all duration-700 group-hover:bg-blue-500/30 group-hover:scale-110"></div>
          <div class="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-violet-500/20 blur-3xl transition-all duration-700 group-hover:bg-violet-500/30 group-hover:scale-110"></div>

          <div class="relative z-10 text-center">
            <h2 class="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl animate-fade-in-up-delay-1 transition-all duration-500 hover:scale-105">
              <span class="inline-block transition-all duration-500 hover:text-purple-300">Start your journey with</span>
              <span class="gradient-text"> AI</span>
            </h2>
            <p class="mx-auto mb-8 max-w-xl text-[var(--muted-foreground)] animate-fade-in-up-delay-2 transition-all duration-500 hover:text-[var(--foreground)]/80">
              Join thousands of users who are already transforming the way they work. Try free for 14 days.
            </p>
            <div class="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up-delay-3">
              <button class="btn btn-primary group relative w-full overflow-hidden rounded-xl px-8 py-4 text-lg font-medium sm:w-auto touch-manipulation">
                <span class="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                <span class="relative flex items-center justify-center gap-2 transition-all duration-300 group-hover:tracking-wide group-active:tracking-wide">
                  <span>Start Free</span>
                  <span class="inline-flex h-5 w-5 flex-shrink-0 transition-all duration-500 group-hover:translate-x-2 group-active:translate-x-2">${icons.arrowRight}</span>
                </span>
              </button>
              <button class="btn btn-outline group w-full rounded-xl px-8 py-4 text-lg font-medium sm:w-auto touch-manipulation">
                <span class="transition-all duration-300 group-hover:tracking-wide group-active:tracking-wide">Watch Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Footer Component
export function Footer() {
  const year = new Date().getFullYear();
  
  return `
    <footer class="border-t border-[rgba(39,39,42,0.4)] bg-[var(--background)]/50 px-4 py-12 backdrop-blur-xl sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <a href="/" class="group flex items-center gap-2 transition-all duration-500 hover:scale-105 active:scale-95 touch-manipulation">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-violet-600 shadow-lg shadow-purple-500/20 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-purple-500/40">
              <span class="inline-flex h-4 w-4 items-center justify-center text-white">${icons.sparkles}</span>
            </div>
            <span class="text-lg font-semibold gradient-text transition-all duration-300 group-hover:tracking-wide">Selene</span>
          </a>

          <nav class="flex flex-wrap items-center justify-center gap-6">
            <a href="/privacy" class="text-sm text-[var(--muted-foreground)] transition-all duration-300 hover:text-purple-400 hover:tracking-wider active:text-purple-400 active:tracking-wider touch-manipulation">Privacy</a>
            <a href="/terms" class="text-sm text-[var(--muted-foreground)] transition-all duration-300 hover:text-purple-400 hover:tracking-wider active:text-purple-400 active:tracking-wider touch-manipulation">Terms</a>
            <a href="/contact" class="text-sm text-[var(--muted-foreground)] transition-all duration-300 hover:text-purple-400 hover:tracking-wider active:text-purple-400 active:tracking-wider touch-manipulation">Contact</a>
          </nav>

          <p class="text-sm text-[var(--muted-foreground)] transition-all duration-300 hover:text-[var(--foreground)]/80">
            ${year} Selene. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  `;
}
