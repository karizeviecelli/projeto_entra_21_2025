document.addEventListener('DOMContentLoaded', () => {
  // ----- MODO ESCURO -----
  const toggleButton = document.getElementById('darkModeToggle');
  if (toggleButton) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      toggleButton.textContent = '☀️';
    } else {
      document.body.classList.remove('dark-mode');
      toggleButton.textContent = '🌙';
    }

    toggleButton.addEventListener('click', () => {
      if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        toggleButton.textContent = '🌙';
      } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        toggleButton.textContent = '☀️';
      }
    });
  }

  // ----- MODAIS -----
  const loginModal = document.getElementById('loginModal');
  const registerModal = document.getElementById('registerModal');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  function showLogin() {
    closeModal();
    loginModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function showRegister() {
    closeModal();
    registerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (loginModal) loginModal.classList.remove('active');
    if (registerModal) registerModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  function switchToRegister() {
    closeModal();
    showRegister();
  }

  function switchToLogin() {
    closeModal();
    showLogin();
  }

  window.addEventListener('click', (e) => {
    if (e.target === loginModal || e.target === registerModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // ----- FORMULÁRIOS -----
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      const rememberMe = document.getElementById('rememberMe').checked;

      showLoadingState(e.target.querySelector('button[type="submit"]'));

      setTimeout(() => {
        console.log('Login attempt:', { email, password, rememberMe });

        showNotification('Login realizado com sucesso!', 'success');

        closeModal();
        loginForm.reset();
        resetButton(e.target.querySelector('button[type="submit"]'), 'Entrar');

        updateUIForLoggedInUser();
        window.location.href = "dashboard/dashboard/dashboard.html";
      }, 1500);
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
      const acceptTerms = document.getElementById('acceptTerms').checked;
      const shareInfo = document.getElementById('shareInfo').checked;

      if (!acceptTerms) {
        showNotification('Você deve aceitar os termos de uso.', 'error');
        return;
      }

      showLoadingState(e.target.querySelector('button[type="submit"]'));

      setTimeout(() => {
        console.log('Registration attempt:', { email, password, acceptTerms, shareInfo });

        showNotification('Cadastro realizado com sucesso!', 'success');

        closeModal();
        registerForm.reset();
        resetButton(e.target.querySelector('button[type="submit"]'), 'Cadastrar-se');

        updateUIForLoggedInUser();
       window.location.href = "dashboard/dashboard/dashboard.html";

      }, 1500);
    });
  }

  // ----- UTILITÁRIOS -----
  function showLoadingState(button) {
    button.disabled = true;
    button.innerHTML = '<span class="loading-spinner"></span> Carregando...';
  }

  function resetButton(button, originalText) {
    button.disabled = false;
    button.innerHTML = originalText;
  }

  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button onclick="this.parentElement.remove()">&times;</button>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 5000);

    if (!document.querySelector('#notification-styles')) {
      const styles = document.createElement('style');
      styles.id = 'notification-styles';
      styles.textContent = `
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          color: white;
          z-index: 3000;
          display: flex;
          align-items: center;
          gap: 1rem;
          min-width: 300px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          animation: slideInRight 0.3s ease;
        }
        .notification-success {
          background: #10b981;
        }
        .notification-error {
          background: #ef4444;
        }
        .notification-info {
          background: #3b82f6;
        }
        .notification button {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .loading-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `;
      document.head.appendChild(styles);
    }
  }

  function updateUIForLoggedInUser() {
    const nav = document.querySelector('.nav');
    nav.innerHTML = `
      <a href="#home" class="nav-link">Início</a>
      <a href="#services" class="nav-link">Serviços</a>
      <a href="#how-it-works" class="nav-link">Como Funciona</a>
      <a href="../user/index.html" class="nav-link">Meus Pedidos</a>
      <button class="btn btn-outline" onclick="logout()">Sair</button>
    `;
  }

  function logout() {
    const nav = document.querySelector('.nav');
    nav.innerHTML = `
      <a href="#home" class="nav-link">Início</a>
      <a href="#services" class="nav-link">Serviços</a>
      <a href="#how-it-works" class="nav-link">Como Funciona</a>
      <button class="btn btn-outline" onclick="showLogin()">Entrar</button>
      <button class="btn btn-primary" onclick="showRegister()">Cadastrar-se</button>
    `;
    showNotification('Logout realizado com sucesso!', 'info');
  }

  // ----- SCROLL SUAVE -----
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ----- VALIDAÇÃO EM TEMPO REAL -----
  function validateEmail(email) {
    const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return re.test(email);
  }

  function validatePassword(password) {
    return password.length >= 6;
  }

  const emailInputs = document.querySelectorAll('input[type="email"]');
  const passwordInputs = document.querySelectorAll('input[type="password"]');

  emailInputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (input.value && !validateEmail(input.value)) {
        input.style.borderColor = '#ef4444';
        showFieldError(input, 'Por favor, insira um email válido');
      } else {
        input.style.borderColor = '#e5e7eb';
        removeFieldError(input);
      }
    });
  });

  passwordInputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (input.value && !validatePassword(input.value)) {
        input.style.borderColor = '#ef4444';
        showFieldError(input, 'A senha deve ter pelo menos 6 caracteres');
      } else {
        input.style.borderColor = '#e5e7eb';
        removeFieldError(input);
      }
    });
  });

  function showFieldError(input, message) {
    removeFieldError(input);
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    `;
    input.parentElement.appendChild(errorElement);
  }

  function removeFieldError(input) {
    const existingError = input.parentElement.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
  }

  // ----- INTERAÇÕES COM OS CARDS -----
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const serviceName = card.querySelector('h3').textContent;
      showNotification(`Em breve: categoria ${serviceName}`, 'info');
    });
  });

  // ----- ANIMAÇÃO AO ROLAR -----
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.service-card, .step');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });

  // ----- MENU MOBILE -----
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Tornando as funções globais para uso inline no HTML
  window.showLogin = showLogin;
  window.showRegister = showRegister;
  window.closeModal = closeModal;
  window.switchToLogin = switchToLogin;
  window.switchToRegister = switchToRegister;
  window.logout = logout;
});
