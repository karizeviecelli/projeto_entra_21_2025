document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements for user profile
    const userName = document.getElementById('userName');
    const userAvatar = document.getElementById('userAvatar');

    // Debugging: Check if DOM elements exist
    if (!userName || !userAvatar) {
        console.error('DOM elements missing: userName:', !!userName, 'userAvatar:', !!userAvatar);
        console.warn('Please ensure dashboard.html has <span id="userName"> and <div id="userAvatar" class="user-avatar"> in the header.');
        // Fallback: Continue loading the rest of the dashboard
    } else {
        // Load user profile data from localStorage
        const savedName = localStorage.getItem('userName');
        const savedAvatar = localStorage.getItem('userAvatar');

        // Debugging: Log localStorage values
        console.log('Loaded from localStorage - userName:', savedName, 'userAvatar:', savedAvatar);

        // Update user name
        userName.textContent = savedName || 'Bem-vindo!';

        // Update user avatar
        try {
            if (savedAvatar && savedAvatar.startsWith('data:image/')) {
                userAvatar.style.backgroundImage = `url('${savedAvatar}')`;
                userAvatar.style.backgroundSize = 'cover';
                userAvatar.style.backgroundPosition = 'center';
                userAvatar.innerHTML = ''; // Remove default emoji
                console.log('Avatar set successfully:', savedAvatar);
            } else {
                userAvatar.innerHTML = '<span>👤</span>'; // Fallback to emoji
                console.warn('No valid avatar found in localStorage, using fallback emoji');
            }
        } catch (error) {
            console.error('Error setting avatar:', error);
            userAvatar.innerHTML = '<span>👤</span>'; // Fallback on error
        }
    }

    // Proceed with rendering services even if user profile elements are missing
    try {
        renderServices();
        setupEventListeners();
        setupDarkMode();
    } catch (error) {
        console.error('Error initializing dashboard:', error);
    }
});

// Mock data for services
const mockServices = [
    {
        id: 1,
        title: "Instalação e Reparo Elétrico Residencial",
        category: "manutencao",
        categoryName: "Manutenção",
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
        category: "casa-jardim",
        categoryName: "Casa & Jardim",
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
        category: "tecnologia",
        categoryName: "Tecnologia",
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
        category: "design-arte",
        categoryName: "Design & Arte",
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
        category: "educacao",
        categoryName: "Educação",
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
        category: "transporte",
        categoryName: "Transporte",
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

// Global variables
let filteredServices = [...mockServices];
let currentService = null;

// DOM Elements
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const servicesGrid = document.getElementById('servicesGrid');
const servicesCount = document.getElementById('servicesCount');
const sectionTitle = document.querySelector('.section-title');
const noResults = document.getElementById('noResults');
const serviceModal = document.getElementById('serviceModal');
const contractModal = document.getElementById('contractModal');
const darkModeToggle = document.getElementById('darkModeToggle');

// Setup event listeners
function setupEventListeners() {
    if (!searchInput || !servicesGrid || !servicesCount || !sectionTitle || !noResults || !serviceModal || !contractModal || !darkModeToggle) {
        console.error('One or more critical DOM elements are missing:', {
            searchInput: !!searchInput,
            filterButtons: filterButtons.length,
            servicesGrid: !!servicesGrid,
            servicesCount: !!servicesCount,
            sectionTitle: !!sectionTitle,
            noResults: !!noResults,
            serviceModal: !!serviceModal,
            contractModal: !!contractModal,
            darkModeToggle: !!darkModeToggle
        });
        return;
    }

    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilter);
    });
    
    // Dark mode toggle
    darkModeToggle.addEventListener('click', toggleDarkMode);
    
    // Contract form
    const contractForm = document.getElementById('contractForm');
    if (contractForm) {
        contractForm.addEventListener('submit', handleContractSubmit);
    } else {
        console.error('Contract form element (#contractForm) is missing');
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === serviceModal) {
            closeServiceModal();
        }
        if (event.target === contractModal) {
            closeContractModal();
        }
    });
}

// Handle search functionality
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    filteredServices = mockServices.filter(service => {
        return service.title.toLowerCase().includes(searchTerm) ||
               service.provider.name.toLowerCase().includes(searchTerm) ||
               service.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
               service.description.toLowerCase().includes(searchTerm);
    });
    
    renderServices();
}

// Handle category filtering
function handleFilter(event) {
    const category = event.target.dataset.category;
    
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter services
    if (category === 'todos') {
        filteredServices = [...mockServices];
        sectionTitle.textContent = 'Todos os Serviços';
    } else {
        filteredServices = mockServices.filter(service => service.category === category);
        const categoryName = mockServices.find(s => s.category === category)?.categoryName || category;
        sectionTitle.textContent = categoryName;
    }
    
    // Apply search filter if there's a search term
    if (searchInput.value.trim()) {
        handleSearch();
        return;
    }
    
    renderServices();
}

// Render services grid
function renderServices() {
    servicesCount.textContent = filteredServices.length;
    
    if (filteredServices.length === 0) {
        servicesGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    servicesGrid.style.display = 'grid';
    noResults.style.display = 'none';
    
    servicesGrid.innerHTML = filteredServices.map(service => `
        <div class="service-card" onclick="openServiceModal(${service.id})">
            <div class="service-image" style="background-image: url('${service.image}')"></div>
            <div class="service-content">
                <div class="service-header">
                    <h3 class="service-title">${service.title}</h3>
                    <span class="service-category">${service.categoryName}</span>
                </div>
                
                <div class="provider-info">
                    <div class="provider-avatar" style="background-image: url('${service.provider.avatar}')"></div>
                    <div class="provider-details">
                        <h4>${service.provider.name}</h4>
                        <div class="provider-rating">
                            <span class="star">⭐</span>
                            <span>${service.provider.rating} (${service.provider.reviewCount})</span>
                        </div>
                    </div>
                </div>
                
                <p class="service-description">${service.description}</p>
                
                <div class="service-footer">
                    <div class="service-location">
                        <span>📍</span>
                        <span>${service.provider.location}</span>
                    </div>
                    <div class="service-price">
                        <div class="price-range">R$ ${service.price.min} - R$ ${service.price.max}</div>
                        <div class="price-unit">por ${service.price.unit}</div>
                    </div>
                </div>
                
                <div class="service-tags">
                    ${service.tags.slice(0, 3).map(tag => `<span class="service-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Open service modal
function openServiceModal(serviceId) {
    currentService = mockServices.find(service => service.id === serviceId);
    if (!currentService) return;
    
    const serviceProfile = document.getElementById('serviceProfile');
    if (!serviceProfile) {
        console.error('Service profile element (#serviceProfile) is missing');
        return;
    }
    
    serviceProfile.innerHTML = `
        <div class="profile-header">
            <div class="profile-image" style="background-image: url('${currentService.image}')"></div>
            <h1 class="profile-title">${currentService.title}</h1>
            <p class="profile-description">${currentService.description}</p>
            <div class="profile-tags">
                ${currentService.tags.map(tag => `<span class="profile-tag">${tag}</span>`).join('')}
            </div>
        </div>
        
        <div class="provider-section">
            <h3>Sobre o Profissional</h3>
            <div class="provider-profile">
                <div class="provider-avatar-large" style="background-image: url('${currentService.provider.avatar}')"></div>
                <div class="provider-info-detailed">
                    <h4 class="provider-name">${currentService.provider.name}</h4>
                    <div class="provider-stats">
                        <div class="stat-item">
                            <span class="star">⭐</span>
                            <span>${currentService.provider.rating} (${currentService.provider.reviewCount} avaliações)</span>
                        </div>
                        <div class="stat-item">
                            <span>📍</span>
                            <span>${currentService.provider.location}</span>
                        </div>
                    </div>
                    <p class="provider-bio">${currentService.provider.description}</p>
                </div>
            </div>
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">✅</div>
                    <div class="stat-number">${currentService.provider.completedJobs}</div>
                    <div class="stat-label">Trabalhos Concluídos</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">⏱️</div>
                    <div class="stat-number">${currentService.provider.responseTime}</div>
                    <div class="stat-label">Tempo de Resposta</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📅</div>
                    <div class="stat-number">Desde ${currentService.provider.joinDate}</div>
                    <div class="stat-label">No Service+</div>
                </div>
            </div>
        </div>
        
        <div class="availability-section">
            <h3>Disponibilidade</h3>
            <div class="availability-days">
                ${currentService.availability.map(day => `<span class="availability-day">${day}</span>`).join('')}
            </div>
        </div>
        
        <div class="pricing-section">
            <h3>Preços</h3>
            <div class="price-display">R$ ${currentService.price.min} - R$ ${currentService.price.max}</div>
            <p class="price-description">por ${currentService.price.unit}</p>
            
            <div class="action-buttons">
                <button class="btn btn-primary" onclick="openContractModal()">Contratar Serviço</button>
            </div>
            
            <div class="contact-buttons">
                <button class="contact-btn" onclick="contactProvider('phone')">📞 Ligar</button>
                <button class="contact-btn" onclick="contactProvider('email')">✉️ E-mail</button>
            </div>
            
            <div class="contact-info">
                <h4>Contato</h4>
                <div class="contact-item">
                    <span>📞</span>
                    <span>${currentService.provider.phone}</span>
                </div>
                <div class="contact-item">
                    <span>✉️</span>
                    <span>${currentService.provider.email}</span>
                </div>
                <div class="contact-item">
                    <span>📍</span>
                    <span>${currentService.provider.location}</span>
                </div>
            </div>
        </div>
    `;
    
    serviceModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close service modal
function closeServiceModal() {
    serviceModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentService = null;
}

// Open contract modal
function openContractModal() {
    if (!currentService) return;
    
    const serviceSummary = document.getElementById('serviceSummary');
    if (!serviceSummary) {
        console.error('Service summary element (#serviceSummary) is missing');
        return;
    }
    
    serviceSummary.innerHTML = `
        <div class="summary-title">${currentService.title}</div>
        <div class="summary-provider">com ${currentService.provider.name}</div>
        <div class="summary-price">R$ ${currentService.price.min} - R$ ${currentService.price.max} por ${currentService.price.unit}</div>
    `;
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('contractDate').min = today;
    
    contractModal.classList.add('active');
}

// Close contract modal
function closeContractModal() {
    contractModal.classList.remove('active');
    const contractForm = document.getElementById('contractForm');
    if (contractForm) {
        contractForm.reset();
    }
}

// Handle contract form submission
function handleContractSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const contractData = {
        serviceId: currentService.id,
        date: formData.get('contractDate') || document.getElementById('contractDate').value,
        time: formData.get('contractTime') || document.getElementById('contractTime').value,
        message: formData.get('contractMessage') || document.getElementById('contractMessage').value
    };
    
    // Simulate API call
    setTimeout(() => {
        alert('Solicitação enviada com sucesso! O profissional entrará em contato em breve.');
        closeContractModal();
        closeServiceModal();
    }, 500);
}

// Contact provider
function contactProvider(type) {
    if (!currentService) return;
    
    if (type === 'phone') {
        window.open(`tel:${currentService.provider.phone}`);
    } else if (type === 'email') {
        window.open(`mailto:${currentService.provider.email}?subject=Interesse no serviço: ${currentService.title}`);
    }
}

// Dark mode functionality
function setupDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDarkMode);
}

// Utility functions for external use
window.openServiceModal = openServiceModal;
window.closeServiceModal = closeServiceModal;
window.openContractModal = openContractModal;
window.closeContractModal = closeContractModal;
window.contactProvider = contactProvider;