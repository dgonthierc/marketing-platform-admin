'use client';

import { useState } from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { ServicesGrid } from '@/components/landing/ServicesGrid';
import { PortfolioShowcase } from '@/components/landing/PortfolioShowcase';
import { ContactForm } from '@/components/forms/ContactForm';
import { ServiceCalculator } from '@/components/landing/ServiceCalculator';

export default function Home() {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <PortfolioShowcase />
      
      <section id="contact-form" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Empieza a Crecer Hoy
              </h2>
              <p className="text-lg text-gray-600">
                Completa el formulario y recibe una auditoría gratuita de tus campañas actuales
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {showCalculator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <ServiceCalculator onClose={() => setShowCalculator(false)} />
        </div>
      )}
    </>
  );
}
