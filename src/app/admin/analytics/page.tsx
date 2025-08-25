'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Calendar,
  Download,
  Filter,
  ChevronDown,
  Target,
  Award,
  ShoppingBag,
  CreditCard,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface ServiceRevenue {
  name: string;
  value: number;
  percentage: number;
}

interface ClientMetrics {
  name: string;
  mrr: number;
  ltv: number;
  campaigns: number;
}

interface PlatformPerformance {
  platform: string;
  spend: number;
  revenue: number;
  roas: number;
}

// Mock data
const revenueData: RevenueData[] = [
  { month: 'Ene', revenue: 85000, expenses: 35000, profit: 50000 },
  { month: 'Feb', revenue: 92000, expenses: 38000, profit: 54000 },
  { month: 'Mar', revenue: 105000, expenses: 42000, profit: 63000 },
  { month: 'Abr', revenue: 98000, expenses: 40000, profit: 58000 },
  { month: 'May', revenue: 115000, expenses: 45000, profit: 70000 },
  { month: 'Jun', revenue: 125000, expenses: 48000, profit: 77000 },
  { month: 'Jul', revenue: 135000, expenses: 52000, profit: 83000 },
  { month: 'Ago', revenue: 142000, expenses: 55000, profit: 87000 },
  { month: 'Sep', revenue: 150000, expenses: 58000, profit: 92000 },
  { month: 'Oct', revenue: 165000, expenses: 62000, profit: 103000 },
  { month: 'Nov', revenue: 178000, expenses: 65000, profit: 113000 },
  { month: 'Dic', revenue: 195000, expenses: 70000, profit: 125000 }
];

const serviceRevenue: ServiceRevenue[] = [
  { name: 'Google Ads', value: 450000, percentage: 38 },
  { name: 'Meta Ads', value: 380000, percentage: 32 },
  { name: 'TikTok Ads', value: 180000, percentage: 15 },
  { name: 'Consultoría', value: 100000, percentage: 8 },
  { name: 'Reportes', value: 85000, percentage: 7 }
];

const topClients: ClientMetrics[] = [
  { name: 'Inmobiliaria Prime', mrr: 25000, ltv: 300000, campaigns: 5 },
  { name: 'Fashion Brand MX', mrr: 18000, ltv: 150000, campaigns: 3 },
  { name: 'Tech Startup México', mrr: 15000, ltv: 120000, campaigns: 4 },
  { name: 'Restaurante Gourmet', mrr: 8000, ltv: 48000, campaigns: 2 },
  { name: 'Consultoría Empresarial', mrr: 12000, ltv: 96000, campaigns: 3 }
];

const platformPerformance: PlatformPerformance[] = [
  { platform: 'Google Ads', spend: 280000, revenue: 1400000, roas: 5.0 },
  { platform: 'Facebook Ads', spend: 180000, revenue: 720000, roas: 4.0 },
  { platform: 'Instagram Ads', spend: 120000, revenue: 540000, roas: 4.5 },
  { platform: 'TikTok Ads', spend: 80000, revenue: 480000, roas: 6.0 },
  { platform: 'LinkedIn Ads', spend: 40000, revenue: 160000, roas: 4.0 }
];

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

export default function AdminAnalyticsPage() {
  const [dateRange, setDateRange] = useState('year');
  const [compareMode, setCompareMode] = useState(false);

  const currentRevenue = 195000;
  const previousRevenue = 178000;
  const revenueChange = ((currentRevenue - previousRevenue) / previousRevenue) * 100;

  const currentMRR = 95000;
  const previousMRR = 88000;
  const mrrChange = ((currentMRR - previousMRR) / previousMRR) * 100;

  const totalAdSpend = 700000;
  const totalRevenue = 3300000;
  const averageROAS = (totalRevenue / totalAdSpend).toFixed(1);

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics de Ingresos</h1>
            <p className="text-gray-600">Análisis completo del rendimiento financiero</p>
          </div>
          
          <div className="flex gap-3 mt-4 lg:mt-0">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="week">Última Semana</option>
              <option value="month">Último Mes</option>
              <option value="quarter">Último Trimestre</option>
              <option value="year">Último Año</option>
            </select>
            
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className={`flex items-center text-sm ${revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {revenueChange >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                {Math.abs(revenueChange).toFixed(1)}%
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${currentRevenue.toLocaleString('es-MX')}
            </div>
            <p className="text-sm text-gray-600 mt-1">Ingresos del Mes</p>
            <div className="mt-3 text-xs text-gray-500">
              vs ${previousRevenue.toLocaleString('es-MX')} mes anterior
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div className={`flex items-center text-sm ${mrrChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {mrrChange >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                {Math.abs(mrrChange).toFixed(1)}%
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ${currentMRR.toLocaleString('es-MX')}
            </div>
            <p className="text-sm text-gray-600 mt-1">MRR Actual</p>
            <div className="mt-3 text-xs text-gray-500">
              42 clientes activos
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex items-center text-sm text-green-600">
                <ArrowUp className="h-4 w-4 mr-1" />
                15%
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {averageROAS}x
            </div>
            <p className="text-sm text-gray-600 mt-1">ROAS Promedio</p>
            <div className="mt-3 text-xs text-gray-500">
              Retorno sobre inversión publicitaria
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Award className="h-6 w-6 text-orange-600" />
              </div>
              <div className="flex items-center text-sm text-green-600">
                <ArrowUp className="h-4 w-4 mr-1" />
                8%
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              $125,000
            </div>
            <p className="text-sm text-gray-600 mt-1">Utilidad Neta</p>
            <div className="mt-3 text-xs text-gray-500">
              Margen del 64%
            </div>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Trend */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Tendencia de Ingresos</h3>
              <Button variant="ghost" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Este Año
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip 
                  formatter={(value: number) => `$${value.toLocaleString('es-MX')}`}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3b82f6" fill="#93bbfc" name="Ingresos" />
                <Area type="monotone" dataKey="profit" stackId="2" stroke="#10b981" fill="#86efac" name="Utilidad" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Service Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución por Servicio</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceRevenue}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceRevenue.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toLocaleString('es-MX')}`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {serviceRevenue.map((service, index) => (
                <div key={service.name} className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-gray-600">{service.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">${(service.value / 1000).toFixed(0)}k</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Platform Performance */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rendimiento por Plataforma</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="platform" stroke="#9ca3af" fontSize={12} />
              <YAxis yAxisId="left" stroke="#9ca3af" fontSize={12} tickFormatter={(value) => `$${value/1000}k`} />
              <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" fontSize={12} />
              <Tooltip 
                formatter={(value: number, name: string) => {
                  if (name === 'ROAS') return `${value}x`;
                  return `$${value.toLocaleString('es-MX')}`;
                }}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="spend" fill="#ef4444" name="Inversión" />
              <Bar yAxisId="left" dataKey="revenue" fill="#10b981" name="Ingresos" />
              <Line yAxisId="right" type="monotone" dataKey="roas" stroke="#3b82f6" strokeWidth={2} name="ROAS" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Clients Table */}
        <Card className="overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Clientes por Ingresos</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    MRR
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    LTV
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campañas Activas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tendencia
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topClients.map((client, index) => (
                  <tr key={client.name}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{client.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">
                        ${client.mrr.toLocaleString('es-MX')}
                      </div>
                      <div className="text-xs text-gray-500">mensuales</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${client.ltv.toLocaleString('es-MX')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <ShoppingBag className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-900">{client.campaigns}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-sm">+12%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}