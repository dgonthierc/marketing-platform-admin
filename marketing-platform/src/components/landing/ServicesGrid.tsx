'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { services, getPlatforms } from '@/data/services';
import { Service, ServiceCategory } from '@/types/services';
import { 
  TrendingUp, 
  Clock, 
  Users, 
  Award,
  ChevronRight,
  Check,
  Star
} from 'lucide-react';

export function ServicesGrid() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);

  const categories = [
    { id: 'all', name: 'Todos', icon: '🎯' },
    { id: ServiceCategory.PAID_SEARCH, name: 'Search', icon: '🔍' },
    { id: ServiceCategory.SOCIAL_MEDIA, name: 'Social', icon: '📱' },
    { id: ServiceCategory.VIDEO, name: 'Video', icon: '📺' },
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(s => s.category === selectedCategory);

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Servicios Premium de Marketing Digital
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Elige tu Arma de{' '}
            <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
              Crecimiento Digital
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cada negocio es único. Por eso ofrecemos servicios especializados 
            que se adaptan a tus objetivos y presupuesto.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as ServiceCategory | 'all')}
              className={`
                px-6 py-3 rounded-full font-medium transition-all
                ${selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }
              `}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ServiceCard 
                  service={service} 
                  onSelect={() => setSelectedService(service)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-8 sm:p-12 text-white"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            ¿No sabes cuál elegir?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Déjanos analizar tu negocio y te recomendaremos la mejor estrategia
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="bg-white text-primary-600 hover:bg-gray-100"
            onClick={() => setShowCalculator(true)}
          >
            <span className="mr-2">🎯</span>
            Obtener Recomendación Personalizada
          </Button>
        </motion.div>
      </div>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal 
            service={selectedService} 
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

interface ServiceCardProps {
  service: Service;
  onSelect: () => void;
}

function ServiceCard({ service, onSelect }: ServiceCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
      {service.badge && (
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1 bg-gradient-to-r from-primary-600 to-blue-600 text-white text-xs font-bold rounded-full">
            {service.badge}
          </span>
        </div>
      )}

      <div className="p-6 flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{service.icon}</div>
          <div className="flex gap-1">
            {service.platforms.map((platform) => (
              <span 
                key={platform.id}
                className="text-xl"
                title={platform.name}
              >
                {platform.icon}
              </span>
            ))}
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {service.name}
        </h3>
        
        <p className="text-gray-600 mb-4">
          {service.shortDescription}
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">ROI Promedio</div>
            <div className="font-bold text-primary-600">{service.metrics.avgROI}</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Resultados en</div>
            <div className="font-bold text-primary-600">{service.metrics.timeToResults}</div>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          {service.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 pt-0 mt-auto">
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-sm text-gray-500">Desde</span>
          <span className="text-3xl font-bold text-gray-900">
            ${service.pricing.starting}
          </span>
          <span className="text-sm text-gray-500">/mes</span>
        </div>

        <Button
          variant="default"
          className="w-full group"
          onClick={onSelect}
        >
          Ver Detalles
          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </Card>
  );
}

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
}

function ServiceModal({ service, onClose }: ServiceModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h3 className="text-2xl font-bold">{service.name}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-lg mb-3">Descripción</h4>
              <p className="text-gray-600 mb-6">{service.description}</p>

              <h4 className="font-semibold text-lg mb-3">Características Incluidas</h4>
              <div className="space-y-2">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-lg mb-4">Métricas de Éxito</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ROI Promedio</span>
                    <span className="font-bold text-primary-600">{service.metrics.avgROI}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tiempo a Resultados</span>
                    <span className="font-bold">{service.metrics.timeToResults}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Retención de Clientes</span>
                    <span className="font-bold">{service.metrics.clientRetention}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tasa de Éxito</span>
                    <span className="font-bold">{service.metrics.successRate}</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-sm text-gray-600">Inversión desde</span>
                  <span className="text-3xl font-bold text-primary-600">
                    ${service.pricing.starting}
                  </span>
                  <span className="text-sm text-gray-600">/mes</span>
                </div>
                {service.pricing.setupFee && (
                  <p className="text-sm text-gray-600 mb-4">
                    + ${service.pricing.setupFee} setup fee (único pago)
                  </p>
                )}
                <Button
                  variant="cta"
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    document.getElementById('contact-form')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                    onClose();
                  }}
                >
                  Solicitar Cotización Personalizada
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}