'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  Mail, 
  Phone, 
  Building, 
  Calendar,
  DollarSign,
  Target,
  TrendingUp,
  Clock,
  MessageSquare,
  Star,
  Download,
  Plus,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: 'website' | 'google' | 'facebook' | 'referral' | 'linkedin';
  status: 'new' | 'contacted' | 'qualified' | 'quoted' | 'converted' | 'lost';
  score: number;
  budget?: string;
  platforms: string[];
  createdAt: Date;
  lastContact?: Date;
  notes?: string;
  assignedTo?: string;
}

interface LeadStats {
  total: number;
  new: number;
  qualified: number;
  converted: number;
  conversionRate: number;
  averageScore: number;
}

// Mock data
const mockLeads: Lead[] = [
  {
    id: 'lead-001',
    name: 'Carlos Mendoza',
    email: 'carlos@techstartup.com',
    phone: '+52 555 123 4567',
    company: 'Tech Startup México',
    source: 'google',
    status: 'qualified',
    score: 85,
    budget: '5k-10k',
    platforms: ['Google Ads', 'Meta Ads'],
    createdAt: new Date('2025-01-20'),
    lastContact: new Date('2025-01-22'),
    notes: 'Muy interesado en campañas de conversión',
    assignedTo: 'Ana García'
  },
  {
    id: 'lead-002',
    name: 'Laura Rodríguez',
    email: 'laura@fashionbrand.mx',
    phone: '+52 555 987 6543',
    company: 'Fashion Brand MX',
    source: 'website',
    status: 'new',
    score: 72,
    budget: '10k+',
    platforms: ['TikTok Ads', 'Instagram Ads'],
    createdAt: new Date('2025-01-23'),
    notes: 'Busca aumentar ventas online'
  },
  {
    id: 'lead-003',
    name: 'Roberto Silva',
    email: 'roberto@consultoria.com',
    phone: '+52 555 456 7890',
    company: 'Consultoría Empresarial',
    source: 'linkedin',
    status: 'quoted',
    score: 90,
    budget: '10k+',
    platforms: ['Google Ads', 'LinkedIn Ads'],
    createdAt: new Date('2025-01-18'),
    lastContact: new Date('2025-01-23'),
    notes: 'Esperando aprobación de presupuesto',
    assignedTo: 'Ana García'
  },
  {
    id: 'lead-004',
    name: 'María González',
    email: 'maria@restaurante.mx',
    phone: '+52 555 321 6549',
    company: 'Restaurante Gourmet',
    source: 'facebook',
    status: 'contacted',
    score: 65,
    budget: '1k-5k',
    platforms: ['Facebook Ads', 'Google Ads'],
    createdAt: new Date('2025-01-21'),
    lastContact: new Date('2025-01-22'),
    notes: 'Interesada en promociones locales',
    assignedTo: 'Juan Pérez'
  },
  {
    id: 'lead-005',
    name: 'Alejandro Torres',
    email: 'alex@inmobiliaria.com',
    company: 'Inmobiliaria Prime',
    source: 'referral',
    status: 'converted',
    score: 95,
    budget: '10k+',
    platforms: ['Google Ads', 'Meta Ads', 'YouTube Ads'],
    createdAt: new Date('2025-01-10'),
    lastContact: new Date('2025-01-20'),
    notes: 'Cliente convertido - campaña activa',
    assignedTo: 'Ana García'
  }
];

const mockStats: LeadStats = {
  total: 142,
  new: 28,
  qualified: 45,
  converted: 12,
  conversionRate: 8.45,
  averageScore: 76
};

const statusColors = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  qualified: 'bg-purple-100 text-purple-700',
  quoted: 'bg-orange-100 text-orange-700',
  converted: 'bg-green-100 text-green-700',
  lost: 'bg-gray-100 text-gray-700'
};

const sourceIcons = {
  website: '🌐',
  google: '🔍',
  facebook: '📘',
  referral: '🤝',
  linkedin: '💼'
};

export default function AdminLeadsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = searchTerm === '' || 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pipeline de Leads</h1>
          <p className="text-gray-600">Gestiona y convierte leads en clientes</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-5 w-5 text-gray-400" />
              <span className="text-xs text-gray-500">Total</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{mockStats.total}</div>
            <p className="text-xs text-gray-600 mt-1">Leads totales</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Plus className="h-5 w-5 text-blue-500" />
              <span className="text-xs text-gray-500">Nuevos</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">{mockStats.new}</div>
            <p className="text-xs text-gray-600 mt-1">Esta semana</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Star className="h-5 w-5 text-purple-500" />
              <span className="text-xs text-gray-500">Calificados</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">{mockStats.qualified}</div>
            <p className="text-xs text-gray-600 mt-1">Listos para cotizar</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-xs text-gray-500">Convertidos</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{mockStats.converted}</div>
            <p className="text-xs text-gray-600 mt-1">Este mes</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-5 w-5 text-orange-500" />
              <span className="text-xs text-gray-500">Conversión</span>
            </div>
            <div className="text-2xl font-bold text-orange-600">{mockStats.conversionRate}%</div>
            <p className="text-xs text-gray-600 mt-1">Tasa actual</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <MessageSquare className="h-5 w-5 text-indigo-500" />
              <span className="text-xs text-gray-500">Score Promedio</span>
            </div>
            <div className="text-2xl font-bold text-indigo-600">{mockStats.averageScore}</div>
            <p className="text-xs text-gray-600 mt-1">Calidad de leads</p>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, email o empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:w-auto"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
              <ChevronDown className={`h-4 w-4 ml-2 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>

            <Button variant="primary">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Lead
            </Button>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>

          {/* Expandable Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estado
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="all">Todos</option>
                      <option value="new">Nuevo</option>
                      <option value="contacted">Contactado</option>
                      <option value="qualified">Calificado</option>
                      <option value="quoted">Cotizado</option>
                      <option value="converted">Convertido</option>
                      <option value="lost">Perdido</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fuente
                    </label>
                    <select
                      value={sourceFilter}
                      onChange={(e) => setSourceFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="all">Todas</option>
                      <option value="website">Website</option>
                      <option value="google">Google</option>
                      <option value="facebook">Facebook</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="referral">Referencia</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Presupuesto
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                      <option value="all">Todos</option>
                      <option value="1k-5k">$1k - $5k</option>
                      <option value="5k-10k">$5k - $10k</option>
                      <option value="10k+">$10k+</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Leads Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lead
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fuente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Presupuesto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Asignado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Último Contacto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {lead.name}
                          </div>
                          <div className="text-sm text-gray-500">{lead.email}</div>
                          {lead.company && (
                            <div className="text-xs text-gray-400 flex items-center mt-1">
                              <Building className="h-3 w-3 mr-1" />
                              {lead.company}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-2xl">{sourceIcons[lead.source]}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[lead.status]}`}>
                        {lead.status === 'new' && 'Nuevo'}
                        {lead.status === 'contacted' && 'Contactado'}
                        {lead.status === 'qualified' && 'Calificado'}
                        {lead.status === 'quoted' && 'Cotizado'}
                        {lead.status === 'converted' && 'Convertido'}
                        {lead.status === 'lost' && 'Perdido'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`text-lg font-bold ${getScoreColor(lead.score)}`}>
                          {lead.score}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">/100</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.budget || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.assignedTo || 'Sin asignar'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {lead.lastContact ? (
                        <div className="text-sm text-gray-500">
                          <div>{lead.lastContact.toLocaleDateString('es-MX')}</div>
                          <div className="text-xs text-gray-400">
                            Hace {Math.floor((new Date().getTime() - lead.lastContact.getTime()) / (1000 * 60 * 60 * 24))} días
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Lead Detail Modal */}
        <AnimatePresence>
          {selectedLead && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedLead(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedLead.name}</h2>
                      <p className="text-gray-600 mt-1">{selectedLead.company}</p>
                    </div>
                    <button
                      onClick={() => setSelectedLead(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Información de Contacto</h3>
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-900">
                          <Mail className="h-4 w-4 mr-3 text-gray-400" />
                          {selectedLead.email}
                        </div>
                        {selectedLead.phone && (
                          <div className="flex items-center text-gray-900">
                            <Phone className="h-4 w-4 mr-3 text-gray-400" />
                            {selectedLead.phone}
                          </div>
                        )}
                        {selectedLead.company && (
                          <div className="flex items-center text-gray-900">
                            <Building className="h-4 w-4 mr-3 text-gray-400" />
                            {selectedLead.company}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Detalles del Lead</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Estado:</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[selectedLead.status]}`}>
                            {selectedLead.status === 'new' && 'Nuevo'}
                            {selectedLead.status === 'contacted' && 'Contactado'}
                            {selectedLead.status === 'qualified' && 'Calificado'}
                            {selectedLead.status === 'quoted' && 'Cotizado'}
                            {selectedLead.status === 'converted' && 'Convertido'}
                            {selectedLead.status === 'lost' && 'Perdido'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Score:</span>
                          <span className={`font-bold ${getScoreColor(selectedLead.score)}`}>
                            {selectedLead.score}/100
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Presupuesto:</span>
                          <span className="text-gray-900">{selectedLead.budget || 'No especificado'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Fuente:</span>
                          <span className="text-gray-900">{selectedLead.source}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedLead.platforms.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Plataformas de Interés</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedLead.platforms.map((platform, index) => (
                          <Badge key={index} variant="primary">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedLead.notes && (
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Notas</h3>
                      <p className="text-gray-700 bg-gray-50 rounded-lg p-3">
                        {selectedLead.notes}
                      </p>
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Creado: {selectedLead.createdAt.toLocaleDateString('es-MX')}
                      </div>
                      {selectedLead.lastContact && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          Último contacto: {selectedLead.lastContact.toLocaleDateString('es-MX')}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button variant="primary" className="flex-1">
                      <Mail className="h-4 w-4 mr-2" />
                      Enviar Email
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      Llamar
                    </Button>
                    <Button variant="outline">
                      Convertir a Cliente
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
}