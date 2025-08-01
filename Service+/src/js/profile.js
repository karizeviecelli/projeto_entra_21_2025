document.addEventListener('DOMContentLoaded', () => {
    // Estado da aplicação
    let isEditing = false;
    let originalData = {};

    // Elementos do DOM
    const elements = {
        editBtn: document.getElementById('editBtn'),
        saveBtn: document.getElementById('saveBtn'),
        cancelBtn: document.getElementById('cancelBtn'),
        avatarImg: document.getElementById('avatarImg'),
        avatarInput: document.getElementById('avatarInput'),
        displayName: document.getElementById('displayName'),
        displayEmail: document.getElementById('displayEmail'),
        darkModeToggle: document.getElementById('darkModeToggle'),
        changePasswordBtn: document.getElementById('changePasswordBtn'),
        passwordSection: document.getElementById('passwordSection'),
        
        // Campos do formulário
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        birthDate: document.getElementById('birthDate'),
        address: document.getElementById('address'),
        city: document.getElementById('city'),
        state: document.getElementById('state'),
        bio: document.getElementById('bio'),
        
        // Campos de senha
        currentPassword: document.getElementById('currentPassword'),
        newPassword: document.getElementById('newPassword'),
        confirmPassword: document.getElementById('confirmPassword')
    };

    // Inicialização
    init();

    function init() {
        loadSavedData();
        setupDarkMode();
        saveOriginalData();
        setupEventListeners();
    }

    // Carregar dados salvos do localStorage
    function loadSavedData() {
        const savedData = {
            name: localStorage.getItem('userName'),
            email: localStorage.getItem('userEmail'),
            phone: localStorage.getItem('userPhone'),
            birthDate: localStorage.getItem('userBirthDate'),
            address: localStorage.getItem('userAddress'),
            city: localStorage.getItem('userCity'),
            state: localStorage.getItem('userState'),
            bio: localStorage.getItem('userBio'),
            avatar: localStorage.getItem('userAvatar')
        };

        console.log('Loaded from localStorage:', savedData);

        if (savedData.name) {
            elements.name.value = savedData.name;
            elements.displayName.textContent = savedData.name;
        }
        if (savedData.email) {
            elements.email.value = savedData.email;
            elements.displayEmail.textContent = savedData.email;
        }
        if (savedData.phone) elements.phone.value = savedData.phone;
        if (savedData.birthDate) elements.birthDate.value = savedData.birthDate;
        if (savedData.address) elements.address.value = savedData.address;
        if (savedData.city) elements.city.value = savedData.city;
        if (savedData.state) elements.state.value = savedData.state;
        if (savedData.bio) elements.bio.value = savedData.bio;
        if (savedData.avatar && savedData.avatar.startsWith('data:image/')) {
            elements.avatarImg.src = savedData.avatar;
            console.log('Avatar loaded:', savedData.avatar);
        } else {
            console.warn('No valid avatar in localStorage, using default');
        }
    }

    // Configuração do modo escuro
    function setupDarkMode() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            elements.darkModeToggle.textContent = '☀️';
        } else {
            elements.darkModeToggle.textContent = '🌙';
        }

        elements.darkModeToggle.addEventListener('click', () => {
            if (document.body.classList.contains('dark-mode')) {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
                elements.darkModeToggle.textContent = '🌙';
            } else {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                elements.darkModeToggle.textContent = '☀️';
            }
        });
    }

    // Salvar dados originais
    function saveOriginalData() {
        originalData = {
            name: elements.name.value,
            email: elements.email.value,
            phone: elements.phone.value,
            birthDate: elements.birthDate.value,
            address: elements.address.value,
            city: elements.city.value,
            state: elements.state.value,
            bio: elements.bio.value,
            avatar: elements.avatarImg.src
        };
    }

    // Configurar event listeners
    function setupEventListeners() {
        // Upload de avatar
        elements.avatarInput.addEventListener('change', handleAvatarChange);
        
        // Validação em tempo real
        elements.email.addEventListener('blur', validateEmail);
        elements.phone.addEventListener('input', formatPhone);
        
        // Campos de senha
        elements.newPassword.addEventListener('input', validatePasswordStrength);
        elements.confirmPassword.addEventListener('input', validatePasswordMatch);
    }

    // Funções principais
    window.toggleEdit = function() {
        isEditing = !isEditing;
        
        if (isEditing) {
            enterEditMode();
        } else {
            exitEditMode();
        }
    };

    function enterEditMode() {
        // Alterar botões
        elements.editBtn.style.display = 'none';
        elements.saveBtn.style.display = 'inline-flex';
        elements.cancelBtn.style.display = 'inline-flex';
        
        // Habilitar campos
        const fields = ['name', 'email', 'phone', 'birthDate', 'address', 'city', 'state', 'bio'];
        fields.forEach(field => {
            elements[field].removeAttribute('readonly');
            elements[field].style.background = 'var(--white)';
            elements[field].style.borderColor = 'var(--primary-blue)';
        });

        // Mostrar overlay do avatar
        document.querySelector('.avatar-wrapper').style.cursor = 'pointer';
        
        showNotification('Modo de edição ativado', 'info');
    }

    function exitEditMode() {
        // Alterar botões
        elements.editBtn.style.display = 'inline-flex';
        elements.saveBtn.style.display = 'none';
        elements.cancelBtn.style.display = 'none';
        
        // Desabilitar campos
        const fields = ['name', 'email', 'phone', 'birthDate', 'address', 'city', 'state', 'bio'];
        fields.forEach(field => {
            elements[field].setAttribute('readonly', true);
            elements[field].style.background = 'var(--bg-light)';
            elements[field].style.borderColor = 'var(--border-gray)';
        });

        // Esconder overlay do avatar
        document.querySelector('.avatar-wrapper').style.cursor = 'default';
    }

    window.saveProfile = function() {
        if (!validateForm()) {
            return;
        }

        // Mostrar loading
        const saveBtn = elements.saveBtn;
        const btnText = saveBtn.querySelector('.btn-text');
        const spinner = saveBtn.querySelector('.loading-spinner');
        
        saveBtn.disabled = true;
        btnText.style.display = 'none';
        spinner.style.display = 'inline-block';

        // Salvar dados no localStorage
        localStorage.setItem('userName', elements.name.value);
        localStorage.setItem('userEmail', elements.email.value);
        localStorage.setItem('userPhone', elements.phone.value);
        localStorage.setItem('userBirthDate', elements.birthDate.value);
        localStorage.setItem('userAddress', elements.address.value);
        localStorage.setItem('userCity', elements.city.value);
        localStorage.setItem('userState', elements.state.value);
        localStorage.setItem('userBio', elements.bio.value);
        localStorage.setItem('userAvatar', elements.avatarImg.src);

        console.log('Saved to localStorage:', {
            userName: elements.name.value,
            userAvatar: elements.avatarImg.src
        });

        // Simular salvamento
        setTimeout(() => {
            // Atualizar dados exibidos
            elements.displayName.textContent = elements.name.value;
            elements.displayEmail.textContent = elements.email.value;
            
            // Salvar novos dados originais
            saveOriginalData();
            
            // Sair do modo de edição
            exitEditMode();
            
            // Resetar botão
            saveBtn.disabled = false;
            btnText.style.display = 'inline';
            spinner.style.display = 'none';
            
            showNotification('Perfil atualizado com sucesso!', 'success');
        }, 1500);
    };

    window.cancelEdit = function() {
        // Restaurar dados originais
        Object.keys(originalData).forEach(key => {
            if (elements[key]) {
                if (key === 'avatar') {
                    elements.avatarImg.src = originalData[key];
                } else {
                    elements[key].value = originalData[key];
                }
            }
        });
        
        exitEditMode();
        showNotification('Alterações canceladas', 'info');
    };

    // Funções de avatar
    window.handleAvatarClick = function() {
        if (isEditing) {
            elements.avatarInput.click();
        }
    };

    function handleAvatarChange(event) {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB
                showNotification('Arquivo muito grande. Máximo 5MB.', 'error');
                return;
            }

            if (!file.type.startsWith('image/')) {
                showNotification('Por favor, selecione apenas imagens.', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                elements.avatarImg.src = e.target.result;
                console.log('Avatar updated in UI:', e.target.result);
                showNotification('Foto atualizada! Clique em Salvar para confirmar.', 'info');
            };
            reader.readAsDataURL(file);
        }
    }

    // Funções de senha
    window.showPasswordSection = function() {
        elements.passwordSection.style.display = 'block';
        elements.changePasswordBtn.style.display = 'none';
    };

    window.hidePasswordSection = function() {
        elements.passwordSection.style.display = 'none';
        elements.changePasswordBtn.style.display = 'inline-flex';
        
        // Limpar campos
        elements.currentPassword.value = '';
        elements.newPassword.value = '';
        elements.confirmPassword.value = '';
    };

    window.updatePassword = function() {
        const current = elements.currentPassword.value;
        const newPass = elements.newPassword.value;
        const confirm = elements.confirmPassword.value;

        if (!current || !newPass || !confirm) {
            showNotification('Preencha todos os campos de senha.', 'error');
            return;
        }

        if (newPass !== confirm) {
            showNotification('As senhas não coincidem.', 'error');
            return;
        }

        if (newPass.length < 6) {
            showNotification('A nova senha deve ter pelo menos 6 caracteres.', 'error');
            return;
        }

        // Simular atualização
        const updateBtn = event.target;
        const btnText = updateBtn.querySelector('.btn-text');
        const spinner = updateBtn.querySelector('.loading-spinner');
        
        updateBtn.disabled = true;
        btnText.style.display = 'none';
        spinner.style.display = 'inline-block';

        setTimeout(() => {
            hidePasswordSection();
            
            updateBtn.disabled = false;
            btnText.style.display = 'inline';
            spinner.style.display = 'none';
            
            showNotification('Senha atualizada com sucesso!', 'success');
        }, 1500);
    };

    window.togglePassword = function(fieldId) {
        const field = document.getElementById(fieldId);
        const button = field.nextElementSibling;
        
        if (field.type === 'password') {
            field.type = 'text';
            button.textContent = '🙈';
        } else {
            field.type = 'password';
            button.textContent = '👁️';
        }
    };

    // Funções de validação
    function validateForm() {
        const name = elements.name.value.trim();
        const email = elements.email.value.trim();
        const phone = elements.phone.value.trim();

        if (!name) {
            showNotification('Nome é obrigatório.', 'error');
            elements.name.focus();
            return false;
        }

        if (!email || !isValidEmail(email)) {
            showNotification('E-mail inválido.', 'error');
            elements.email.focus();
            return false;
        }

        if (!phone) {
            showNotification('Telefone é obrigatório.', 'error');
            elements.phone.focus();
            return false;
        }

        return true;
    }

    function validateEmail() {
        const email = elements.email.value.trim();
        if (email && !isValidEmail(email)) {
            elements.email.style.borderColor = 'var(--accent-red)';
            showNotification('E-mail inválido.', 'error');
        } else {
            elements.email.style.borderColor = 'var(--primary-blue)';
        }
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function formatPhone(event) {
        let value = event.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            if (value.length < 14) {
                value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            }
        }
        
        event.target.value = value;
    }

    function validatePasswordStrength() {
        const password = elements.newPassword.value;
        const field = elements.newPassword;
        
        if (password.length < 6) {
            field.style.borderColor = 'var(--accent-red)';
        } else if (password.length < 8) {
            field.style.borderColor = 'var(--warning-yellow)';
        } else {
            field.style.borderColor = 'var(--success-green)';
        }
    }

    function validatePasswordMatch() {
        const newPass = elements.newPassword.value;
        const confirm = elements.confirmPassword.value;
        const field = elements.confirmPassword;
        
        if (confirm && newPass !== confirm) {
            field.style.borderColor = 'var(--accent-red)';
        } else if (confirm) {
            field.style.borderColor = 'var(--success-green)';
        }
    }

    // Sistema de notificações
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;

        document.getElementById('notificationContainer').appendChild(notification);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // Função de logout
    window.logout = function() {
        if (confirm('Tem certeza que deseja sair?')) {
            showNotification('Logout realizado com sucesso!', 'info');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }
    };

    // Smooth scroll para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Prevenir perda de dados não salvos
    window.addEventListener('beforeunload', function(e) {
        if (isEditing) {
            e.preventDefault();
            e.returnValue = 'Você tem alterações não salvas. Deseja realmente sair?';
        }
    });
});