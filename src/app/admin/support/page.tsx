'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  Search,
  Filter,
  MessageSquare,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  User,
  Calendar,
  ChevronRight,
  Reply,
  Archive,
  Star,
  Tag,
  Paperclip,
  Send,
  MoreVertical,
  ChevronDown,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Ticket {
  id: string;
  subject: string;
  description: string;
  client: string;
  clientEmail: string;
  category: 'technical' | 'billing' | 'campaign' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting' | 'resolved' | 'closed';
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  responseTime?: number; // in hours
  messages: TicketMessage[];
  attachments?: string[];
}

interface TicketMessage {
  id: string;
  sender: string;
  senderType: 'client' | 'admin';
  message: string;
  timestamp: Date;
}

interface TicketStats {
  totalTickets: number;
  openTickets: number;
  avgResponseTime: number;
  satisfactionRate: number;
  resolvedToday: number;
  pendingUrgent: number;
}

// Mock data
const mockTickets: Ticket[] = [
  {
    id: 'ticket-001',
    subject: 'Error en reporte de campaña de Google Ads',
    description: 'No puedo ver las métricas de conversión en mi dashboard',
    client: 'Carlos Mendoza',
    clientEmail: 'carlos@techstartup.com',
    category: 'technical',
    priority: 'high',
    status: 'in_progress',
    assignedTo: 'Ana García',
    createdAt: new Date('2025-01-23T10:30:00'),
    updatedAt: new Date('2025-01-23T14:45:00'),
    responseTime: 2.5,
    messages: [
      {
        id: 'msg-001',
        sender: 'Carlos Mendoza',
        senderType: 'client',
        message: 'No puedo ver las métricas de conversión en mi dashboard. Aparece un error 500.',
        timestamp: new Date('2025-01-23T10:30:00')
      },
      {
        id: 'msg-002',
        sender: 'Ana García',
        senderType: 'admin',
        message: 'Hola Carlos, lamento el inconveniente. Estoy revisando el problema. ¿Podrías indicarme desde cuándo experimentas este error?',
        timestamp: new Date('2025-01-23T13:00:00')
      },
      {
        id: 'msg-003',
        sender: 'Carlos Mendoza',
        senderType: 'client',
        message: 'Desde esta mañana aproximadamente a las 9 AM',
        timestamp: new Date('2025-01-23T14:45:00')
      }
    ]
  },
  {
    id: 'ticket-002',
    subject: 'Solicitud de aumento de presupuesto',
    description: 'Necesito aumentar el presupuesto de mis campañas',
    client: 'Laura Rodríguez',
    clientEmail: 'laura@fashionbrand.mx',
    category: 'campaign',
    priority: 'medium',
    status: 'open',
    createdAt: new Date('2025-01-23T15:20:00'),
    updatedAt: new Date('2025-01-23T15:20:00'),
    messages: [
      {
        id: 'msg-004',
        sender: 'Laura Rodríguez',
        senderType: 'client',
        message: 'Hola, me gustaría aumentar el presupuesto de mis campañas de TikTok Ads a $15,000 mensuales.',
        timestamp: new Date('2025-01-23T15:20:00')
      }
    ]
  },
  {
    id: 'ticket-003',
    subject: 'Pregunta sobre facturación',
    description: 'No he recibido mi factura del mes pasado',
    client: 'Roberto Silva',
    clientEmail: 'roberto@consultoria.com',
    category: 'billing',
    priority: 'low',
    status: 'resolved',
    assignedTo: 'Juan Pérez',
    createdAt: new Date('2025-01-22T09:15:00'),
    updatedAt: new Date('2025-01-22T16:30:00'),
    responseTime: 1.5,
    messages: [
      {
        id: 'msg-005',
        sender: 'Roberto Silva',
        senderType: 'client',
        message: 'Buenos días, no he recibido mi factura de diciembre.',
        timestamp: new Date('2025-01-22T09:15:00')
      },
      {
        id: 'msg-006',
        sender: 'Juan Pérez',
        senderType: 'admin',
        message: 'Hola Roberto, te he reenviado la factura a tu correo. Por favor confirma si la recibiste.',
        timestamp: new Date('2025-01-22T10:45:00')
      },
      {
        id: 'msg-007',
        sender: 'Roberto Silva',
        senderType: 'client',
        message: 'Perfecto, ya la recibí. Muchas gracias!',
        timestamp: new Date('2025-01-22T16:30:00')
      }
    ]
  },
  {
    id: 'ticket-004',
    subject: 'URGENTE: Campaña pausada sin autorización',
    description: 'Mi campaña principal se pausó y estoy perdiendo ventas',
    client: 'Fashion Brand MX',
    clientEmail: 'admin@fashionbrand.mx',
    category: 'campaign',
    priority: 'urgent',
    status: 'open',
    createdAt: new Date('2025-01-23T17:00:00'),
    updatedAt: new Date('2025-01-23T17:00:00'),
    messages: [
      {
        id: 'msg-008',
        sender: 'Fashion Brand MX',
        senderType: 'client',
        message: 'Mi campaña de Black Friday se pausó sin mi autorización. Necesito que se reactive INMEDIATAMENTE.',
        timestamp: new Date('2025-01-23T17:00:00')
      }
    ],
    attachments: ['screenshot-error.png']
  }
];

const mockStats: TicketStats = {
  totalTickets: 342,
  openTickets: 28,
  avgResponseTime: 2.3,
  satisfactionRate: 94.5,
  resolvedToday: 12,
  pendingUrgent: 3
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700'
};

const statusColors = {
  open: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-yellow-100 text-yellow-700',
  waiting: 'bg-purple-100 text-purple-700',
  resolved: 'bg-green-100 text-green-700',
  closed: 'bg-gray-100 text-gray-700'
};

const categoryIcons = {
  technical: '🔧',
  billing: '💳',
  campaign: '📊',
  general: '📝'
};

export default function AdminSupportPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = searchTerm === '' || 
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getPriorityIcon = (priority: string) => {
    switch(priority) {
      case 'urgent': return <AlertTriangle className="h-4 w-4" />;
      case 'high': return <AlertCircle className="h-4 w-4" />;
      case 'medium': return <HelpCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Centro de Soporte</h1>
          <p className="text-gray-600">Gestiona tickets y consultas de clientes</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <MessageSquare className="h-5 w-5 text-gray-400" />
              <span className="text-xs text-gray-500">Total</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{mockStats.totalTickets}</div>
            <p className="text-xs text-gray-600 mt-1">Tickets totales</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="h-5 w-5 text-blue-500" />
              <span className="text-xs text-gray-500">Abiertos</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">{mockStats.openTickets}</div>
            <p className="text-xs text-gray-600 mt-1">Por resolver</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <span className="text-xs text-gray-500">Respuesta</span>
            </div>
            <div className="text-2xl font-bold text-yellow-600">{mockStats.avgResponseTime}h</div>
            <p className="text-xs text-gray-600 mt-1">Tiempo promedio</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Star className="h-5 w-5 text-green-500" />
              <span className="text-xs text-gray-500">Satisfacción</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{mockStats.satisfactionRate}%</div>
            <p className="text-xs text-gray-600 mt-1">Rating promedio</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-xs text-gray-500">Resueltos</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{mockStats.resolvedToday}</div>
            <p className="text-xs text-gray-600 mt-1">Hoy</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span className="text-xs text-gray-500">Urgentes</span>
            </div>
            <div className="text-2xl font-bold text-red-600">{mockStats.pendingUrgent}</div>
            <p className="text-xs text-gray-600 mt-1">Pendientes</p>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar ticket, cliente o descripción..."
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
                      <option value="open">Abierto</option>
                      <option value="in_progress">En Progreso</option>
                      <option value="waiting">Esperando</option>
                      <option value="resolved">Resuelto</option>
                      <option value="closed">Cerrado</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prioridad
                    </label>
                    <select
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="all">Todas</option>
                      <option value="urgent">Urgente</option>
                      <option value="high">Alta</option>
                      <option value="medium">Media</option>
                      <option value="low">Baja</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                      <option value="all">Todas</option>
                      <option value="technical">Técnico</option>
                      <option value="billing">Facturación</option>
                      <option value="campaign">Campañas</option>
                      <option value="general">General</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Tickets List */}
        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <Card 
              key={ticket.id} 
              className="p-6 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setSelectedTicket(ticket)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{categoryIcons[ticket.category]}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{ticket.subject}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[ticket.priority]} flex items-center gap-1`}>
                      {getPriorityIcon(ticket.priority)}
                      {ticket.priority === 'urgent' && 'Urgente'}
                      {ticket.priority === 'high' && 'Alta'}
                      {ticket.priority === 'medium' && 'Media'}
                      {ticket.priority === 'low' && 'Baja'}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[ticket.status]}`}>
                      {ticket.status === 'open' && 'Abierto'}
                      {ticket.status === 'in_progress' && 'En Progreso'}
                      {ticket.status === 'waiting' && 'Esperando'}
                      {ticket.status === 'resolved' && 'Resuelto'}
                      {ticket.status === 'closed' && 'Cerrado'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{ticket.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {ticket.client}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {ticket.createdAt.toLocaleDateString('es-MX')}
                    </div>
                    {ticket.assignedTo && (
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        Asignado a: {ticket.assignedTo}
                      </div>
                    )}
                    {ticket.responseTime && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Respuesta: {ticket.responseTime}h
                      </div>
                    )}
                    {ticket.attachments && ticket.attachments.length > 0 && (
                      <div className="flex items-center">
                        <Paperclip className="h-4 w-4 mr-1" />
                        {ticket.attachments.length} archivo(s)
                      </div>
                    )}
                  </div>
                </div>
                
                <ChevronRight className="h-5 w-5 text-gray-400 ml-4" />
              </div>
            </Card>
          ))}
        </div>

        {/* Ticket Detail Modal */}
        <AnimatePresence>
          {selectedTicket && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedTicket(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{categoryIcons[selectedTicket.category]}</span>
                        <h2 className="text-2xl font-bold text-gray-900">{selectedTicket.subject}</h2>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[selectedTicket.priority]}`}>
                          {selectedTicket.priority === 'urgent' && 'Urgente'}
                          {selectedTicket.priority === 'high' && 'Alta'}
                          {selectedTicket.priority === 'medium' && 'Media'}
                          {selectedTicket.priority === 'low' && 'Baja'}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[selectedTicket.status]}`}>
                          {selectedTicket.status === 'open' && 'Abierto'}
                          {selectedTicket.status === 'in_progress' && 'En Progreso'}
                          {selectedTicket.status === 'waiting' && 'Esperando'}
                          {selectedTicket.status === 'resolved' && 'Resuelto'}
                          {selectedTicket.status === 'closed' && 'Cerrado'}
                        </span>
                        <span className="text-sm text-gray-500">
                          Ticket #{selectedTicket.id}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedTicket(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-4">
                    {selectedTicket.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderType === 'admin' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-2xl ${message.senderType === 'admin' ? 'bg-primary-50' : 'bg-gray-50'} rounded-lg p-4`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">{message.sender}</span>
                            <span className="text-xs text-gray-500">
                              {message.timestamp.toLocaleString('es-MX')}
                            </span>
                          </div>
                          <p className="text-gray-700">{message.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reply Section */}
                <div className="p-6 border-t border-gray-200">
                  <div className="flex gap-3">
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Escribe tu respuesta..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                    />
                    <div className="flex flex-col gap-2">
                      <Button variant="primary">
                        <Send className="h-4 w-4 mr-2" />
                        Enviar
                      </Button>
                      <Button variant="outline">
                        <Archive className="h-4 w-4 mr-2" />
                        Cerrar
                      </Button>
                    </div>
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