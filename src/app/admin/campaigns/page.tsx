'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  Search,
  Filter,
  Plus,
  Play,
  Pause,
  Edit2,
  Copy,
  Trash2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Eye,
  MousePointer,
  ShoppingCart,
  Target,
  Calendar,
  ChevronDown,
  MoreVertical,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Campaign {
  id: string;
  name: string;
  client: string;
  platform: 'Google Ads' | 'Meta Ads' | 'TikTok Ads' | 'LinkedIn Ads';
  status: 'active' | 'paused' | 'ended' | 'draft';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  roas: number;
  startDate: Date;
  endDate?: Date;
  performance: 'excellent' | 'good' | 'average' | 'poor';
}

interface CampaignStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalSpend: number;
  totalRevenue: number;
  averageRoas: number;
  totalConversions: number;
}

// Mock data
const mockCampaigns: Campaign[] = [
  {
    id: 'camp-001',
    name: 'Black Friday 2025 - Search',
    client: 'Fashion Brand MX',
    platform: 'Google Ads',
    status: 'active',
    budget: 50000,
    spent: 32500,
    impressions: 1250000,
    clicks: 45000,
    conversions: 2800,
    ctr: 3.6,
    cpc: 0.72,
    roas: 5.2,
    startDate: new Date('2025-01-01'),
    performance: 'excellent'
  },
  {
    id: 'camp-002',
    name: 'Brand Awareness - Video',
    client: 'Tech Startup México',
    platform: 'TikTok Ads',
    status: 'active',
    budget: 30000,
    spent: 18500,
    impressions: 2500000,
    clicks: 75000,
    conversions: 1200,
    ctr: 3.0,
    cpc: 0.25,
    roas: 4.8,
    startDate: new Date('2025-01-10'),
    performance: 'good'
  },
  {
    id: 'camp-003',
    name: 'Lead Generation B2B',
    client: 'Consultoría Empresarial',
    platform: 'LinkedIn Ads',
    status: 'paused',
    budget: 25000,
    spent: 15000,
    impressions: 450000,
    clicks: 8500,
    conversions: 350,
    ctr: 1.9,
    cpc: 1.76,
    roas: 3.5,
    startDate: new Date('2024-12-15'),
    endDate: new Date('2025-01-20'),
    performance: 'average'
  },
  {
    id: 'camp-004',
    name: 'Remarketing - Carrito Abandonado',
    client: 'Fashion Brand MX',
    platform: 'Meta Ads',
    status: 'active',
    budget: 20000,
    spent: 12500,
    impressions: 850000,
    clicks: 28000,
    conversions: 1800,
    ctr: 3.3,
    cpc: 0.45,
    roas: 6.5,
    startDate: new Date('2025-01-05'),
    performance: 'excellent'
  },
  {
    id: 'camp-005',
    name: 'Promoción Local - Maps',
    client: 'Restaurante Gourmet',
    platform: 'Google Ads',
    status: 'active',
    budget: 8000,
    spent: 5200,
    impressions: 120000,
    clicks: 6500,
    conversions: 450,
    ctr: 5.4,
    cpc: 0.80,
    roas: 4.2,
    startDate: new Date('2025-01-15'),
    performance: 'good'
  }
];

const mockStats: CampaignStats = {
  totalCampaigns: 48,
  activeCampaigns: 35,
  totalSpend: 285000,
  totalRevenue: 1425000,
  averageRoas: 5.0,
  totalConversions: 18500
};

const statusColors = {
  active: 'bg-green-100 text-green-700',
  paused: 'bg-yellow-100 text-yellow-700',
  ended: 'bg-gray-100 text-gray-700',
  draft: 'bg-blue-100 text-blue-700'
};

const performanceColors = {
  excellent: 'text-green-600',
  good: 'text-blue-600',
  average: 'text-yellow-600',
  poor: 'text-red-600'
};

const platformIcons = {
  'Google Ads': '🔍',
  'Meta Ads': '📘',
  'TikTok Ads': '🎵',
  'LinkedIn Ads': '💼'
};

export default function AdminCampaignsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showActions, setShowActions] = useState<string | null>(null);

  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch = searchTerm === '' || 
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.client.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    const matchesPlatform = platformFilter === 'all' || campaign.platform === platformFilter;
    
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const getPerformanceIcon = (performance: string) => {
    switch(performance) {
      case 'excellent': return <TrendingUp className="h-4 w-4" />;
      case 'good': return <TrendingUp className="h-4 w-4" />;
      case 'average': return <TrendingDown className="h-4 w-4" />;
      case 'poor': return <TrendingDown className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Campañas</h1>
          <p className="text-gray-600">Monitorea y optimiza todas las campañas publicitarias</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-5 w-5 text-gray-400" />
              <span className="text-xs text-gray-500">Total</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{mockStats.totalCampaigns}</div>
            <p className="text-xs text-gray-600 mt-1">Campañas</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Play className="h-5 w-5 text-green-500" />
              <span className="text-xs text-gray-500">Activas</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{mockStats.activeCampaigns}</div>
            <p className="text-xs text-gray-600 mt-1">En curso</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-5 w-5 text-red-500" />
              <span className="text-xs text-gray-500">Inversión</span>
            </div>
            <div className="text-2xl font-bold text-red-600">
              ${(mockStats.totalSpend / 1000).toFixed(0)}k
            </div>
            <p className="text-xs text-gray-600 mt-1">Este mes</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-xs text-gray-500">Ingresos</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              ${(mockStats.totalRevenue / 1000).toFixed(0)}k
            </div>
            <p className="text-xs text-gray-600 mt-1">Generados</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-5 w-5 text-purple-500" />
              <span className="text-xs text-gray-500">ROAS</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">{mockStats.averageRoas}x</div>
            <p className="text-xs text-gray-600 mt-1">Promedio</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <ShoppingCart className="h-5 w-5 text-blue-500" />
              <span className="text-xs text-gray-500">Conversiones</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {(mockStats.totalConversions / 1000).toFixed(1)}k
            </div>
            <p className="text-xs text-gray-600 mt-1">Totales</p>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar campaña o cliente..."
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
              Nueva Campaña
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
                      <option value="active">Activas</option>
                      <option value="paused">Pausadas</option>
                      <option value="ended">Finalizadas</option>
                      <option value="draft">Borrador</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plataforma
                    </label>
                    <select
                      value={platformFilter}
                      onChange={(e) => setPlatformFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="all">Todas</option>
                      <option value="Google Ads">Google Ads</option>
                      <option value="Meta Ads">Meta Ads</option>
                      <option value="TikTok Ads">TikTok Ads</option>
                      <option value="LinkedIn Ads">LinkedIn Ads</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rendimiento
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                      <option value="all">Todos</option>
                      <option value="excellent">Excelente</option>
                      <option value="good">Bueno</option>
                      <option value="average">Promedio</option>
                      <option value="poor">Bajo</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCampaigns.map((campaign) => (
            <Card key={campaign.id} className="p-6 hover:shadow-lg transition-shadow">
              {/* Campaign Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{platformIcons[campaign.platform]}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{campaign.client}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[campaign.status]}`}>
                      {campaign.status === 'active' && 'Activa'}
                      {campaign.status === 'paused' && 'Pausada'}
                      {campaign.status === 'ended' && 'Finalizada'}
                      {campaign.status === 'draft' && 'Borrador'}
                    </span>
                    <div className={`flex items-center gap-1 text-sm ${performanceColors[campaign.performance]}`}>
                      {getPerformanceIcon(campaign.performance)}
                      <span className="capitalize">{campaign.performance}</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <button
                    onClick={() => setShowActions(showActions === campaign.id ? null : campaign.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <MoreVertical className="h-5 w-5 text-gray-400" />
                  </button>
                  
                  {showActions === campaign.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center">
                        <Edit2 className="h-4 w-4 mr-2" /> Editar
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center">
                        <Copy className="h-4 w-4 mr-2" /> Duplicar
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center">
                        {campaign.status === 'active' ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" /> Pausar
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" /> Activar
                          </>
                        )}
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" /> Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Budget Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Presupuesto</span>
                  <span className="text-gray-900 font-medium">
                    ${campaign.spent.toLocaleString('es-MX')} / ${campaign.budget.toLocaleString('es-MX')}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {((campaign.spent / campaign.budget) * 100).toFixed(0)}% utilizado
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="flex items-center text-gray-600 text-xs mb-1">
                    <Eye className="h-3 w-3 mr-1" />
                    Impresiones
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {(campaign.impressions / 1000).toFixed(0)}k
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center text-gray-600 text-xs mb-1">
                    <MousePointer className="h-3 w-3 mr-1" />
                    Clicks
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {(campaign.clicks / 1000).toFixed(1)}k
                  </div>
                  <div className="text-xs text-gray-500">CTR: {campaign.ctr}%</div>
                </div>
                
                <div>
                  <div className="flex items-center text-gray-600 text-xs mb-1">
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Conversiones
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {campaign.conversions.toLocaleString('es-MX')}
                  </div>
                  <div className="text-xs text-gray-500">CPC: ${campaign.cpc}</div>
                </div>
              </div>

              {/* ROAS Highlight */}
              <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">ROAS</p>
                    <p className="text-2xl font-bold text-primary-600">{campaign.roas}x</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600 mb-1">Revenue Generado</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${(campaign.spent * campaign.roas).toLocaleString('es-MX')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Campaign Dates */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Inicio: {campaign.startDate.toLocaleDateString('es-MX')}
                </div>
                {campaign.endDate && (
                  <div>
                    Fin: {campaign.endDate.toLocaleDateString('es-MX')}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}