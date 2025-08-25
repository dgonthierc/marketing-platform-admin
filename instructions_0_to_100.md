# 🚀 MEGA PROMPT ULTRA INTELIGENTE PARA CLAUDE CODE
## Construcción Granular Mobile-First - Plataforma Servicios Marketing Digital

---

## 🎯 **CONTEXTO FUNDAMENTAL DEL PROYECTO**

### **ESENCIA DEL NEGOCIO:**
Crear una plataforma web mobile-first para **vender servicios de gestión de campañas publicitarias**. El usuario es un especialista en Google Ads, Facebook Ads, TikTok Ads que quiere **automatizar la generación de leads, cotizaciones y gestión de clientes**. NO necesita APIs de plataformas publicitarias - él maneja las campañas directamente.

### **OBJETIVO CORE:**
**Convertir visitantes móviles en clientes pagantes** a través de:
1. Landing page de alta conversión
2. Sistema de cotización automatizado
3. Portal de cliente simplificado
4. CRM básico integrado

### **STACK TECNOLÓGICO (AGOSTO 2025):**
- **Next.js 15.5** (Turbopack beta, middleware estable)
- **React 19.1.1** (Server Components, Actions, ref cleanup)
- **TypeScript 5.5+** (strict mode)
- **Tailwind CSS 4.1** (text shadows, máscaras, better browser compatibility)
- **Supabase** (PostgreSQL + Auth + Storage)
- **Prisma 5.20+** (ORM type-safe)
- **Framer Motion 11+** (animaciones premium móvil)
- **React Hook Form 7.52+** + **Zod 3.23+** (validación)

---

## 🧠 **FILOSOFÍA DE DESARROLLO GRANULAR**

### **PRINCIPIOS CORE:**
1. **Mobile-First Absoluto**: Cada componente nace móvil, crece a desktop
2. **Business-Driven**: Cada feature debe generar leads o mejorar conversión
3. **Performance Obsession**: Sub-3s load time, 60fps animations
4. **Accessibility First**: WCAG 2.1 AA compliance desde el inicio
5. **Incremental Excellence**: Cada commit debe mejorar la conversión

### **METODOLOGÍA NANO-STEP:**
- **1 componente = 1 sesión de trabajo**
- **Testing inmediato** de cada componente
- **Optimización performance** en cada step
- **Business validation** antes del siguiente paso
- **Documentation automática** de progreso

---

## 📱 **MEJORES PRÁCTICAS MOBILE-FIRST (AGOSTO 2025)**

### **RESPONSIVE DESIGN STRATEGY:**
```css
/* Mobile-First Breakpoints Tailwind 4.1 */
/* Base: 320px - 639px (Mobile) */
.container { @apply px-4; }
.text-responsive { @apply text-sm leading-relaxed; }

/* sm: 640px+ (Large Mobile) */
@media (min-width: 640px) { 
  .container { @apply px-6; }
  .text-responsive { @apply text-base; }
}

/* md: 768px+ (Tablet) */
@media (min-width: 768px) {
  .container { @apply px-8 max-w-4xl mx-auto; }
}

/* lg: 1024px+ (Desktop) */
@media (min-width: 1024px) {
  .container { @apply max-w-6xl; }
}
```

### **PERFORMANCE TARGETS:**
- **LCP**: <2.5s mobile
- **FID**: <100ms
- **CLS**: <0.1
- **Bundle Size**: <200KB initial
- **Image Optimization**: WebP/AVIF with fallbacks

### **TOUCH & GESTURE STANDARDS:**
- **Minimum touch target**: 44px x 44px
- **Swipe gestures**: Left/right navigation
- **Pull-to-refresh**: List updates
- **Long press**: Context actions
- **Pinch zoom**: Image galleries

---

## 🗃️ **SISTEMA DE TRACKING Y RECORDATORIOS**

### **PROGRESS TRACKING FILE:** `PROJECT_PROGRESS.md`
```markdown
# PROYECTO MARKETING PLATFORM - PROGRESO

## STATUS GENERAL: [IN_PROGRESS]
- Iniciado: [FECHA]
- Última actualización: [FECHA]
- Progreso total: [X]%

## COMPONENTS COMPLETADOS:
### ✅ CORE SETUP
- [ ] Next.js 15.5 project initialization
- [ ] Tailwind CSS 4.1 configuration
- [ ] TypeScript strict setup
- [ ] Supabase project creation
- [ ] Prisma schema base

### ✅ LANDING PAGE COMPONENTS
- [ ] HeroSection mobile-optimized
- [ ] ServicesGrid touch-friendly
- [ ] PortfolioShowcase interactive
- [ ] CTASection conversion-optimized
- [ ] TestimonialsCarousel swipe-enabled

## BUSINESS METRICS TRACKING:
- Conversion Rate Target: >5%
- Mobile Performance Score: >90
- Accessibility Score: >95
- SEO Score: >90

## NEXT PRIORITY: [COMPONENT_NAME]
## BLOCKERS: [LIST_ANY_ISSUES]
```

---

## 🔥 **NANO-STEPS IMPLEMENTATION WORKFLOW**

### **STEP 0: PROJECT INITIALIZATION**

#### **0.1 Environment Setup**
```bash
# EJECUTAR EN ORDEN:
npx create-next-app@latest marketing-platform --typescript --tailwind --app
cd marketing-platform
npm install @supabase/supabase-js prisma @prisma/client
npm install react-hook-form @hookform/resolvers zod
npm install framer-motion lucide-react
npm install @types/node

# VERIFICACIÓN:
- ✅ Next.js 15.5+ installed
- ✅ All dependencies compatible
- ✅ TypeScript strict mode enabled
- ✅ No dependency conflicts
```

#### **0.2 Tailwind 4.1 Advanced Setup**
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Mobile-first responsive system
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      // Conversion-optimized colors
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      // Mobile typography scale
      fontSize: {
        'mobile-xs': ['0.75rem', { lineHeight: '1rem' }],
        'mobile-sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'mobile-base': ['1rem', { lineHeight: '1.5rem' }],
        'mobile-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'mobile-xl': ['1.25rem', { lineHeight: '1.75rem' }],
        'mobile-2xl': ['1.5rem', { lineHeight: '2rem' }],
        'mobile-3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      },
      // Touch-friendly spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      // Animation durations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
    },
  },
  plugins: [],
};

export default config;

// VERIFICACIÓN:
- ✅ Tailwind 4.1 features working
- ✅ Mobile-first breakpoints configured
- ✅ Custom animations smooth on mobile
- ✅ Color system conversion-optimized
```

---

### **STEP 1: DATABASE ARCHITECTURE**

#### **1.1 Prisma Schema Foundation**
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// BUSINESS CORE MODELS
model Lead {
  id          String      @id @default(cuid())
  email       String      @unique
  name        String?
  company     String?
  phone       String?
  source      String      @default("website") // "website", "referral", "google"
  status      LeadStatus  @default(NEW)
  score       Int         @default(0) // 0-100 lead scoring
  industry    String?
  budget      String?     // "1k-5k", "5k-10k", "10k+"
  platforms   String[]    // ["google", "meta", "tiktok"]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  
  // Relations
  quotes      Quote[]
  interactions LeadInteraction[]
  
  @@map("leads")
}

model Quote {
  id            String      @id @default(cuid())
  leadId        String
  services      Json        // {platforms: [], budget: 0, duration: 3}
  monthlyFee    Decimal     @db.Decimal(10,2)
  setupFee      Decimal     @db.Decimal(10,2)
  totalValue    Decimal     @db.Decimal(10,2)
  status        QuoteStatus @default(PENDING)
  validUntil    DateTime
  sentAt        DateTime?
  viewedAt      DateTime?
  acceptedAt    DateTime?
  rejectedAt    DateTime?
  createdAt     DateTime    @default(now())
  
  lead Lead @relation(fields: [leadId], references: [id])
  
  @@map("quotes")
}

model Client {
  id          String       @id @default(cuid())
  leadId      String?      @unique
  name        String
  email       String       @unique
  company     String?
  phone       String?
  industry    String
  status      ClientStatus @default(ACTIVE)
  startDate   DateTime     @default(now())
  
  // Relations
  projects    Project[]
  payments    Payment[]
  lead        Lead?        @relation(fields: [leadId], references: [id])
  
  @@map("clients")
}

// ENUMS
enum LeadStatus {
  NEW
  CONTACTED
  QUALIFIED
  QUOTED
  CONVERTED
  LOST
}

enum QuoteStatus {
  PENDING
  SENT
  VIEWED
  ACCEPTED
  REJECTED
  EXPIRED
}

enum ClientStatus {
  ACTIVE
  PAUSED
  ENDED
}

// VERIFICACIÓN:
- ✅ Schema reflects business model perfectly
- ✅ Lead scoring system integrated
- ✅ Quote workflow complete
- ✅ Client lifecycle managed
```

#### **1.2 Supabase Integration**
```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// lib/db/queries.ts
import { prisma } from './prisma';

export const leadQueries = {
  async create(data: CreateLeadData) {
    return prisma.lead.create({
      data: {
        ...data,
        score: calculateLeadScore(data), // Business logic
      }
    });
  },
  
  async findByEmail(email: string) {
    return prisma.lead.findUnique({
      where: { email },
      include: { quotes: true, interactions: true }
    });
  }
};

// VERIFICACIÓN:
- ✅ Supabase connection established
- ✅ Prisma client configured
- ✅ Query patterns established
- ✅ Business logic separation
```

---

### **STEP 2: COMPONENT ARCHITECTURE FOUNDATION**

#### **2.1 Design System Base**
```typescript
// components/ui/Button.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base classes - Mobile-optimized
  "inline-flex items-center justify-center rounded-lg text-mobile-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl",
        destructive: "bg-error text-white hover:bg-error/90",
        outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        ghost: "hover:bg-gray-100",
        cta: "bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-2xl hover:from-primary-700 hover:to-blue-700 transform hover:-translate-y-1"
      },
      size: {
        default: "h-12 px-6 py-2", // 48px minimum touch target
        sm: "h-10 px-4 text-mobile-sm",
        lg: "h-14 px-8 text-mobile-lg", // Premium CTA size
        icon: "h-12 w-12", // Square touch target
        full: "h-12 w-full" // Mobile-friendly full width
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

// VERIFICACIÓN:
- ✅ 44px+ touch targets all variants
- ✅ Accessible focus states
- ✅ Loading states handled
- ✅ Mobile-first responsive text
- ✅ Conversion-optimized CTA variant
```

#### **2.2 Layout Foundation**
```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Performance optimization
  variable: '--font-inter'
});

export const metadata = {
  title: 'Marketing Digital Profesional | Aumenta tus Ventas 300%',
  description: 'Especialistas en Google Ads, Facebook Ads y TikTok Ads. Garantizamos resultados o devolvemos tu dinero.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  themeColor: '#3b82f6',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={cn(inter.variable, 'antialiased')}>
      <body className="min-h-screen bg-white font-sans text-gray-900">
        {/* Mobile-first structure */}
        <div className="flex flex-col min-h-screen">
          <main className="flex-1">
            {children}
          </main>
        </div>
        
        {/* Performance monitoring */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Web Vitals tracking
              new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  if (entry.entryType === 'navigation') {
                    console.log('Navigation timing:', entry.duration);
                  }
                }
              }).observe({entryTypes: ['navigation']});
            `
          }}
        />
      </body>
    </html>
  );
}

// VERIFICACIÓN:
- ✅ Mobile-first viewport meta
- ✅ Performance font loading
- ✅ SEO-optimized metadata
- ✅ Accessibility foundation
- ✅ Core Web Vitals tracking
```

---

### **STEP 3: HERO SECTION - PRIMERA CONVERSIÓN**

#### **3.1 HeroSection Component**
```typescript
// components/landing/HeroSection.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { TrendingUp, Users, Award } from 'lucide-react';

interface HeroStats {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const stats: HeroStats[] = [
  { value: "300%", label: "ROI Promedio", icon: TrendingUp },
  { value: "500+", label: "Clientes Exitosos", icon: Users },
  { value: "5 años", label: "Experiencia", icon: Award }
];

export function HeroSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Main Headline - Mobile Optimized */}
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-mobile-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Aumenta tus Ventas hasta{' '}
            <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
              300%
            </span>
            <br className="hidden sm:block" />
            con Publicidad Digital
            <span className="text-success"> que SÍ Funciona</span>
          </motion.h1>

          {/* Value Proposition */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-mobile-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Especialistas en Google Ads, Facebook Ads y TikTok Ads. 
            <strong className="text-gray-900"> Garantizamos resultados</strong> o devolvemos tu dinero.
          </motion.p>

          {/* Social Proof Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 mb-10"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="text-mobile-xl sm:text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-mobile-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons - Mobile Optimized */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <Button 
              variant="cta" 
              size="lg"
              className="w-full sm:w-auto min-w-[280px]"
              onClick={() => {
                // Smooth scroll to contact form
                document.getElementById('contact-form')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              🚀 Auditoría GRATUITA de mis Anuncios
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => {
                document.getElementById('portfolio')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              📊 Ver Casos de Éxito
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-mobile-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              ✅ <span>Sin permanencia</span>
            </div>
            <div className="flex items-center gap-2">
              ✅ <span>Garantía de resultados</span>
            </div>
            <div className="flex items-center gap-2">
              ✅ <span>Reportes semanales</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// VERIFICACIÓN BUSINESS:
- ✅ Headline clara y benefit-driven
- ✅ Social proof prominente
- ✅ CTA irresistible y sin fricción
- ✅ Trust indicators visible
- ✅ Mobile-first responsive perfecto
- ✅ Performance optimizado
```

---

### **CHECKPOINT DE PROGRESO - PRIMER NANO-STEP**

#### **VERIFICACIÓN OBLIGATORIA ANTES DE CONTINUAR:**

```markdown
## ✅ CHECKPOINT 1 - FOUNDATION COMPLETE

### TECHNICAL VERIFICATION:
- [ ] Next.js 15.5 working perfectly
- [ ] Tailwind 4.1 mobile-first responsive
- [ ] TypeScript strict mode no errors
- [ ] Components render correctly on all mobile sizes
- [ ] Performance: LCP < 2.5s on mobile
- [ ] Accessibility: Focus management working

### BUSINESS VERIFICATION:
- [ ] Hero section converts visitors to interested leads
- [ ] Value proposition is immediately clear
- [ ] CTA buttons are irresistible and prominent
- [ ] Social proof builds trust instantly
- [ ] Mobile experience is premium-quality

### NEXT PRIORITY: Lead Capture Form
- Component: ContactForm with lead scoring
- Business Goal: Convert 5%+ of traffic to leads
- Technical Goal: Form validation + Supabase integration
```

---

## 💥 **INSTRUCCIONES CRÍTICAS PARA CLAUDE CODE**

### **WORKFLOW OBLIGATORIO:**

#### **1. ANTES DE CADA SESIÓN:**
- [ ] Leer `PROJECT_PROGRESS.md` completo
- [ ] Verificar último checkpoint completado
- [ ] Confirmar próximo nano-step a implementar
- [ ] Validar que setup anterior funciona 100%

#### **2. DURANTE CADA IMPLEMENTACIÓN:**
- [ ] **MOBILE-FIRST ABSOLUTO**: Diseñar para 320px primero
- [ ] **BUSINESS LOGIC FIRST**: ¿Esta feature genera leads/ventas?
- [ ] **PERFORMANCE OBSESSION**: Optimizar cada imagen, animation, bundle
- [ ] **ACCESSIBILITY MANDATORY**: ARIA, keyboard nav, screen readers
- [ ] **TEST IMMEDIATELY**: Verificar en DevTools mobile simulation

#### **3. DESPUÉS DE CADA COMPONENTE:**
- [ ] Actualizar `PROJECT_PROGRESS.md` con status
- [ ] Verificar métricas business (conversión, performance)
- [ ] Documentar decisiones técnicas importantes
- [ ] Confirmar que siguiente paso está claro

#### **4. ESTRUCTURA DE COMMITS:**
```
feat(hero): implement mobile-first hero section with conversion optimization

- Added HeroSection component with gradient backgrounds
- Implemented social proof stats with icons
- Created CTA buttons with hover animations  
- Optimized for mobile touch interactions
- Performance: LCP 1.8s, CLS 0.05

Business Impact:
- Clear value proposition for lead generation
- Trust indicators to reduce friction
- Conversion-optimized CTAs

Next: Implement ContactForm with lead scoring
```

---

### **RECORDATORIOS CONSTANTES:**

#### **🎯 ESSENCE REMINDERS:**
> "¿Este componente ayuda a convertir visitantes en clientes pagantes?"
> "¿Un usuario móvil puede usar esto fácilmente con el pulgar?"
> "¿Esta implementación refleja profesionalismo premium?"

#### **📱 MOBILE-FIRST REMINDERS:**
> "Diseñar para iPhone SE (375px) primero, luego escalar"
> "44px minimum touch targets, always"
> "Test en Chrome DevTools mobile mode SIEMPRE"

#### **⚡ PERFORMANCE REMINDERS:**
> "¿Este componente añade más de 10KB al bundle?"
> "¿Las animaciones corren a 60fps en mobile?"
> "¿Las imágenes están optimizadas WebP/AVIF?"

---

### **PRÓXIMOS NANO-STEPS EN ORDEN:**

#### **STEP 4: Lead Capture Form**
- ContactForm component con validación Zod
- Lead scoring automático
- Integración Supabase
- Email automation trigger
- Thank you page con next steps

#### **STEP 5: Services Section**
- ServicesGrid con pricing hints
- Interactive service calculator  
- Modal con detalles completos
- CTA hacia quote form
- Social proof por servicio

#### **STEP 6: Portfolio Showcase**
- CaseStudy components
- Before/After metrics
- Interactive charts
- Testimonial integration
- Industry filtering

#### **STEP 7: Quote System**  
- Multi-step quote form
- Intelligent pricing calculator
- PDF proposal generation
- Email automation
- CRM lead tracking

---

## 🎯 **OBJETIVO FINAL:**

**Una plataforma mobile-first que convierta 5%+ de visitantes en leads calificados, genere cotizaciones automáticas y gestione clientes de forma eficiente, construida con las mejores prácticas de desarrollo web de agosto 2025.**

### **SUCCESS METRICS:**
- **Conversion Rate**: >5% visitors to leads
- **Mobile Performance**: >90 Lighthouse score
- **Accessibility**: WCAG 2.1 AA compliance
- **Business ROI**: Platform pays for itself in <30 days
- **User Experience**: <3 taps to request quote

---

**¡ESTE PROMPT ESTÁ LISTO PARA CONSTRUCCIÓN GRANULAR INTELIGENTE! 🚀**