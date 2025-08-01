import React, { useState } from 'react';
import { Search, Filter, Star, Clock, MapPin, Phone, Mail, Calendar, DollarSign, User, ArrowLeft, CheckCircle } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  category: string;
  provider: {
    name: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    location: string;
    responseTime: string;
    completedJobs: number;
    joinDate: string;
    description: string;
    phone: string;
    email: string;
  };
  price: {
    min: number;
    max: number;
    unit: 'hora' | 'serviço' | 'diária';
  };
  description: string;
  image: string;
  tags: string[];
  availability: string[];
}

const mockServices: Service[] = [
  {
    id: 1,
    title: "Instalação e Reparo Elétrico Residencial",
    category: "Manutenção",
    provider: {
      name: "Carlos Eduardo Santos",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviewCount: 127,
      location: "São Paulo, SP",
      responseTime: "2 horas",
      completedJobs: 312,
      joinDate: "2022",
      description: "Eletricista com mais de 15 anos de experiência em instalações residenciais e comerciais. Especializado em automação residencial e sistemas de segurança.",
      phone: "(11) 99999-0001",
      email: "carlos.eletricista@email.com"
    },
    price: { min: 80, max: 150, unit: 'hora' },
    description: "Serviços completos de elétrica: instalação de tomadas, interruptores, quadros elétricos, iluminação e automação residencial.",
    image: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["Elétrica", "Instalação", "Reparo", "Automação"],
    availability: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]
  },
  {
    id: 2,
    title: "Limpeza Residencial Completa",
    category: "Casa & Jardim",
    provider: {
      name: "Maria Fernanda Silva",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      reviewCount: 89,
      location: "Rio de Janeiro, RJ",
      responseTime: "1 hora",
      completedJobs: 245,
      joinDate: "2023",
      description: "Profissional especializada em limpeza residencial e organização. Trabalho com produtos ecológicos e técnicas modernas de limpeza.",
      phone: "(21) 99999-0002",
      email: "maria.limpeza@email.com"
    },
    price: { min: 120, max: 300, unit: 'serviço' },
    description: "Limpeza completa da casa incluindo todos os cômodos, organização de armários e limpeza de eletrodomésticos.",
    image: "https://images.pexels.com/photos/4239047/pexels-photo-4239047.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["Limpeza", "Organização", "Produtos Ecológicos"],
    availability: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
  },
  {
    id: 3,
    title: "Desenvolvimento de Sites e Aplicativos",
    category: "Tecnologia",
    provider: {
      name: "Pedro Henrique Costa",
      avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviewCount: 156,
      location: "Remoto",
      responseTime: "30 minutos",
      completedJobs: 178,
      joinDate: "2021",
      description: "Desenvolvedor Full Stack com expertise em React, Node.js e mobile. Mais de 8 anos criando soluções digitais para empresas de todos os portes.",
      phone: "(11) 99999-0003",
      email: "pedro.dev@email.com"
    },
    price: { min: 3000, max: 15000, unit: 'serviço' },
    description: "Desenvolvimento completo de sites, e-commerce, aplicativos mobile e sistemas web personalizados.",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["React", "Node.js", "Mobile", "E-commerce"],
    availability: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]
  },
  {
    id: 4,
    title: "Design Gráfico e Identidade Visual",
    category: "Design & Arte",
    provider: {
      name: "Ana Carolina Ferreira",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      reviewCount: 203,
      location: "Belo Horizonte, MG",
      responseTime: "1 hora",
      completedJobs: 289,
      joinDate: "2020",
      description: "Designer gráfica especializada em branding e identidade visual. Formada em Design e com MBA em Marketing Digital.",
      phone: "(31) 99999-0004",
      email: "ana.design@email.com"
    },
    price: { min: 500, max: 3000, unit: 'serviço' },
    description: "Criação de logotipos, identidade visual completa, materiais gráficos e design para redes sociais.",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["Logo", "Branding", "Social Media", "Print"],
    availability: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]
  },
  {
    id: 5,
    title: "Aulas Particulares de Matemática",
    category: "Educação",
    provider: {
      name: "Professor João Roberto",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.9,
      reviewCount: 94,
      location: "Porto Alegre, RS",
      responseTime: "2 horas",
      completedJobs: 156,
      joinDate: "2019",
      description: "Professor de Matemática com 20 anos de experiência. Especialista em ensino fundamental, médio e preparatório para vestibular.",
      phone: "(51) 99999-0005",
      email: "joao.matematica@email.com"
    },
    price: { min: 50, max: 120, unit: 'hora' },
    description: "Aulas particulares de matemática presenciais ou online para todos os níveis de ensino.",
    image: "https://images.pexels.com/photos/714698/pexels-photo-714698.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["Matemática", "Vestibular", "Online", "Presencial"],
    availability: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
  },
  {
    id: 6,
    title: "Mudanças e Fretes",
    category: "Transporte",
    provider: {
      name: "Roberto Transportes",
      avatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6,
      reviewCount: 78,
      location: "Curitiba, PR",
      responseTime: "3 horas",
      completedJobs: 234,
      joinDate: "2018",
      description: "Empresa familiar de mudanças e fretes com frota própria. Serviços de mudança residencial, comercial e transportes diversos.",
      phone: "(41) 99999-0006",
      email: "roberto.transportes@email.com"
    },
    price: { min: 200, max: 800, unit: 'serviço' },
    description: "Mudanças residenciais e comerciais, fretes, montagem e desmontagem de móveis.",
    image: "https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["Mudança", "Frete", "Montagem", "Desmontagem"],
    availability: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
  }
];

type ViewType = 'dashboard' | 'profile';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showContractModal, setShowContractModal] = useState(false);

  const categories = ['Todos', 'Manutenção', 'Casa & Jardim', 'Tecnologia', 'Design & Arte', 'Educação', 'Transporte'];

  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'Todos' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const viewService = (service: Service) => {
    setSelectedService(service);
    setCurrentView('profile');
  };

  const goBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedService(null);
  };

  if (currentView === 'profile' && selectedService) {
    return <ServiceProfile service={selectedService} onBack={goBackToDashboard} onContract={() => setShowContractModal(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Service<span className="text-red-500">+</span></h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Bem-vindo!</span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar serviços ou profissionais..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory === 'Todos' ? 'Todos os Serviços' : selectedCategory}
          </h2>
          <p className="text-gray-600 mt-1">{filteredServices.length} serviços encontrados</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => viewService(service)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight">{service.title}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full shrink-0 ml-2">
                    {service.category}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={service.provider.avatar}
                    alt={service.provider.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{service.provider.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">
                        {service.provider.rating} ({service.provider.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    {service.provider.location}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      R$ {service.price.min} - R$ {service.price.max}
                    </p>
                    <p className="text-xs text-gray-500">por {service.price.unit}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {service.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum serviço encontrado</h3>
            <p className="text-gray-600">Tente ajustar sua busca ou filtros</p>
          </div>
        )}
      </main>

      {/* Contract Modal */}
      {showContractModal && selectedService && (
        <ContractModal 
          service={selectedService} 
          onClose={() => setShowContractModal(false)} 
        />
      )}
    </div>
  );
}

function ServiceProfile({ service, onBack, onContract }: { 
  service: Service; 
  onBack: () => void; 
  onContract: () => void; 
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="aspect-video">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{service.title}</h1>
                  <span className="bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full">
                    {service.category}
                  </span>
                </div>
                <p className="text-gray-600 text-lg">{service.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {service.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Provider Profile */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Sobre o Profissional</h2>
              <div className="flex items-start gap-4">
                <img
                  src={service.provider.avatar}
                  alt={service.provider.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.provider.name}</h3>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-medium">{service.provider.rating}</span>
                      <span className="text-gray-600">({service.provider.reviewCount} avaliações)</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {service.provider.location}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{service.provider.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
                      <p className="font-semibold text-gray-900">{service.provider.completedJobs}</p>
                      <p className="text-sm text-gray-600">Trabalhos Concluídos</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Clock className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                      <p className="font-semibold text-gray-900">{service.provider.responseTime}</p>
                      <p className="text-sm text-gray-600">Tempo de Resposta</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Calendar className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                      <p className="font-semibold text-gray-900">Desde {service.provider.joinDate}</p>
                      <p className="text-sm text-gray-600">No Service+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Disponibilidade</h2>
              <div className="flex flex-wrap gap-2">
                {service.availability.map(day => (
                  <span key={day} className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                    {day}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Preços</h3>
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  <span className="text-3xl font-bold text-gray-900">
                    R$ {service.price.min} - R$ {service.price.max}
                  </span>
                </div>
                <p className="text-gray-600">por {service.price.unit}</p>
              </div>
              
              <button
                onClick={onContract}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3"
              >
                Contratar Serviço
              </button>
              
              <div className="space-y-2">
                <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Ligar
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Enviar E-mail
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contato</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{service.provider.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{service.provider.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{service.provider.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContractModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the contract submission
    alert('Solicitação enviada com sucesso! O profissional entrará em contato em breve.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Contratar Serviço</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
            <p className="text-gray-600">com {service.provider.name}</p>
            <div className="mt-2 p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-medium">
                R$ {service.price.min} - R$ {service.price.max} por {service.price.unit}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Preferida
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Horário Preferido
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Selecione um horário</option>
                <option value="morning">Manhã (8h - 12h)</option>
                <option value="afternoon">Tarde (12h - 18h)</option>
                <option value="evening">Noite (18h - 22h)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição do Serviço
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Descreva detalhes do serviço que precisa..."
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Enviar Solicitação
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;