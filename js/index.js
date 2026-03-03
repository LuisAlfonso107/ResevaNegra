// ==========================================================================
// Reserva Negra - JavaScript Mínimo
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // 1. Inicializar Lucide icons
    lucide.createIcons();
    
    // 2. Manejar menú móvil
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
    const closeIcon = mobileMenuBtn.querySelector('.close-icon');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
            
            if (mobileMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                document.body.style.overflow = '';
            });
        });
    }
    
    // 3. Manejar formulario
    const interestForm = document.getElementById('interest-form');
    const formSuccess = document.getElementById('form-success');
    
    if (interestForm) {
        // Cargar datos guardados (si existen)
        loadFormData();
        
        // Guardar borrador en tiempo real
        const formInputs = interestForm.querySelectorAll('input');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                saveFormDraft();
            });
        });
        
        // Manejar envío del formulario
        interestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulario
            if (!validateForm()) {
                alert('Por favor, completa los campos requeridos correctamente');
                return;
            }
            
            // Guardar en localStorage
            saveToLocalStorage();
            
            // Mostrar mensaje de éxito
            showSuccessMessage();
            
            // Resetear formulario
            resetForm();
        });
    }
    
    // 4. Configurar año actual en footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // 5. Efecto de hover en formulario
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#b8975e';
            this.style.boxShadow = '0 0 20px rgba(184, 151, 94, 0.2)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = 'rgba(176, 176, 176, 0.3)';
            this.style.boxShadow = 'none';
        });
    });
});

// ==========================================================================
// Funciones del Formulario
// ==========================================================================

function validateForm() {
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!nombre) {
        return false;
    }
    
    if (!email || !isValidEmail(email)) {
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function saveFormDraft() {
    const formData = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value
    };
    
    localStorage.setItem('reserva_negra_form_draft', JSON.stringify(formData));
}

function loadFormData() {
    const savedData = localStorage.getItem('reserva_negra_form_draft');
    if (savedData) {
        const data = JSON.parse(savedData);
        
        if (document.getElementById('nombre')) {
            document.getElementById('nombre').value = data.nombre || '';
        }
        if (document.getElementById('email')) {
            document.getElementById('email').value = data.email || '';
        }
        if (document.getElementById('telefono')) {
            document.getElementById('telefono').value = data.telefono || '';
        }
    }
}

function saveToLocalStorage() {
    // Obtener datos del formulario
    const formData = {
        nombre: document.getElementById('nombre').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        fecha: new Date().toISOString()
    };
    
    // Obtener datos existentes
    const existingData = JSON.parse(localStorage.getItem('reserva_negra_interesados') || '[]');
    
    // Agregar nueva entrada
    existingData.push(formData);
    
    // Guardar en localStorage
    localStorage.setItem('reserva_negra_interesados', JSON.stringify(existingData));
    
    // Limpiar borrador
    localStorage.removeItem('reserva_negra_form_draft');
    
    // Mostrar en consola para debugging
    console.log('Datos guardados:', formData);
    console.log('Total de interesados:', existingData.length);
}

function showSuccessMessage() {
    const formSuccess = document.getElementById('form-success');
    if (formSuccess) {
        formSuccess.classList.remove('hidden');
        
        // Ocultar después de 4 segundos
        setTimeout(() => {
            formSuccess.classList.add('hidden');
        }, 4000);
    }
    
    // Mostrar alerta simple
    alert('¡Gracias por tu interés! Te contactaremos muy pronto.');
}

function resetForm() {
    const interestForm = document.getElementById('interest-form');
    if (interestForm) {
        interestForm.reset();
    }
}

// ==========================================================================
// Utilidades adicionales
// ==========================================================================

// Manejar resize de ventana para menú móvil
window.addEventListener('resize', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    if (window.innerWidth >= 768 && mobileMenu) {
        mobileMenu.classList.remove('active');
        if (menuIcon) menuIcon.classList.remove('hidden');
        if (closeIcon) closeIcon.classList.add('hidden');
        document.body.style.overflow = '';
    }
});

// ==========================================================================
// Debug utilities (solo en desarrollo local)
// ==========================================================================

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Exponer funciones útiles para debugging
    window.debug = {
        showInteresados: function() {
            const data = localStorage.getItem('reserva_negra_interesados');
            console.log('Interesados guardados:', data ? JSON.parse(data) : []);
        },
        clearData: function() {
            localStorage.clear();
            console.log('LocalStorage limpiado');
        },
        testForm: function() {
            document.getElementById('nombre').value = 'Juan Pérez';
            document.getElementById('email').value = 'juan@ejemplo.com';
            document.getElementById('telefono').value = '+505 8888 8888';
            console.log('Formulario de prueba completado');
        }
    };
}