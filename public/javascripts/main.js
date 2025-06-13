// Declara.net - Cliente JavaScript
// Funcionalidades para mejorar la experiencia de usuario

document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar funcionalidades globales
    initValidations();
    initAnimations();
    initFormHelpers();
    
    // Funcionalidades específicas para el formulario de declaraciones
    if (document.getElementById('declarationForm')) {
        initDeclarationForm();
    }
});

/**
 * Inicializar validaciones globales
 */
function initValidations() {
    // Validar RFC automáticamente
    const rfcInputs = document.querySelectorAll('input[name="rfc"]');
    rfcInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            validateRFC(e.target);
        });
    });
    
    // Validar CURP automáticamente
    const curpInputs = document.querySelectorAll('input[name="curp"]');
    curpInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            validateCURP(e.target);
        });
    });
    
    // Validar códigos postales
    const cpInputs = document.querySelectorAll('input[name="codigoPostal"]');
    cpInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            validateCP(e.target);
        });
    });
}

/**
 * Validar RFC mexicano
 */
function validateRFC(input) {
    const rfc = input.value.toUpperCase();
    input.value = rfc;
    
    if (rfc.length === 13) {
        const rfcPattern = /^[A-Z&Ñ]{3,4}[0-9]{6}[A-Z0-9]{3}$/;
        if (!rfcPattern.test(rfc)) {
            showFieldError(input, 'RFC inválido. Formato: AAAA000000AAA');
            return false;
        } else {
            showFieldSuccess(input, 'RFC válido');
            return true;
        }
    } else if (rfc.length > 0) {
        showFieldWarning(input, `Faltan ${13 - rfc.length} caracteres`);
    } else {
        clearFieldStatus(input);
    }
    return false;
}

/**
 * Validar CURP mexicana
 */
function validateCURP(input) {
    const curp = input.value.toUpperCase();
    input.value = curp;
    
    if (curp.length === 18) {
        const curpPattern = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z][0-9]$/;
        if (!curpPattern.test(curp)) {
            showFieldError(input, 'CURP inválida. Verificar formato');
            return false;
        } else {
            showFieldSuccess(input, 'CURP válida');
            return true;
        }
    } else if (curp.length > 0) {
        showFieldWarning(input, `Faltan ${18 - curp.length} caracteres`);
    } else {
        clearFieldStatus(input);
    }
    return false;
}

/**
 * Validar código postal
 */
function validateCP(input) {
    const cp = input.value;
    
    if (cp.length === 5) {
        if (!/^\d{5}$/.test(cp)) {
            showFieldError(input, 'Código postal debe contener solo números');
            return false;
        } else {
            showFieldSuccess(input, 'Código postal válido');
            return true;
        }
    } else if (cp.length > 0) {
        showFieldWarning(input, `Faltan ${5 - cp.length} dígitos`);
    } else {
        clearFieldStatus(input);
    }
    return false;
}

/**
 * Mostrar error en campo
 */
function showFieldError(input, message) {
    input.classList.remove('is-valid', 'is-warning');
    input.classList.add('is-invalid');
    updateFieldFeedback(input, message, 'invalid-feedback text-danger');
}

/**
 * Mostrar éxito en campo
 */
function showFieldSuccess(input, message) {
    input.classList.remove('is-invalid', 'is-warning');
    input.classList.add('is-valid');
    updateFieldFeedback(input, message, 'valid-feedback text-success');
}

/**
 * Mostrar advertencia en campo
 */
function showFieldWarning(input, message) {
    input.classList.remove('is-invalid', 'is-valid');
    input.classList.add('is-warning');
    updateFieldFeedback(input, message, 'warning-feedback text-warning');
}

/**
 * Limpiar estado del campo
 */
function clearFieldStatus(input) {
    input.classList.remove('is-invalid', 'is-valid', 'is-warning');
    const feedback = input.parentNode.querySelector('.field-feedback');
    if (feedback) {
        feedback.remove();
    }
}

/**
 * Actualizar mensaje de feedback del campo
 */
function updateFieldFeedback(input, message, className) {
    let feedback = input.parentNode.querySelector('.field-feedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.className = 'field-feedback small';
        input.parentNode.appendChild(feedback);
    }
    feedback.className = `field-feedback small ${className}`;
    feedback.textContent = message;
}

/**
 * Inicializar animaciones
 */
function initAnimations() {
    // Animación de aparición para alertas
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach((alert, index) => {
        setTimeout(() => {
            alert.classList.add('fade-in');
        }, index * 100);
    });
    
    // Auto-dismiss para alertas de éxito
    const successAlerts = document.querySelectorAll('.alert-success');
    successAlerts.forEach(alert => {
        setTimeout(() => {
            const closeBtn = alert.querySelector('.btn-close');
            if (closeBtn) {
                closeBtn.click();
            }
        }, 5000);
    });
}

/**
 * Helpers generales para formularios
 */
function initFormHelpers() {
    // Formatear números en tiempo real
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('blur', function(e) {
            if (e.target.value && !isNaN(e.target.value)) {
                const value = parseFloat(e.target.value);
                if (e.target.step === "0.01") {
                    e.target.value = value.toFixed(2);
                }
            }
        });
    });
    
    // Mejorar UX de selects
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.addEventListener('change', function(e) {
            if (e.target.value) {
                e.target.classList.add('is-valid');
                e.target.classList.remove('is-invalid');
            }
        });
    });
}

/**
 * Inicializar funcionalidades específicas del formulario de declaraciones
 */
function initDeclarationForm() {
    initConditionalFields();
    initProgressTracking();
    initMoneyCalculations();
    initFormSave();
}

/**
 * Manejo de campos condicionales
 */
function initConditionalFields() {
    const conditionalMappings = [
        {
            trigger: 'input[name="participaEnEmpresas"]',
            target: '#tipoParticipacionContainer',
            showValue: 'si'
        },
        {
            trigger: 'input[name="casaHabitacion"]',
            target: '#casaHabitacionDetails',
            showValue: 'si'
        },
        {
            trigger: 'input[name="otrosInmuebles"]',
            target: '#otrosInmueblesDetails',
            showValue: 'si'
        },
        {
            trigger: 'input[name="tieneVehiculos"]',
            target: '#vehiculosDetails',
            showValue: 'si'
        },
        {
            trigger: 'input[name="tieneBienesMuebles"]',
            target: '#bienesMueblesDetails',
            showValue: 'si'
        },
        {
            trigger: 'input[name="cuentasBancarias"]',
            target: '#cuentasBancariasDetails',
            showValue: 'si'
        },
        {
            trigger: 'input[name="inversionesValores"]',
            target: '#inversionesValoresDetails',
            showValue: 'si'
        },
        {
            trigger: 'input[name="tieneAdeudos"]',
            target: '#adeudosDetails',
            showValue: 'si'
        }
    ];
    
    conditionalMappings.forEach(mapping => {
        const triggers = document.querySelectorAll(mapping.trigger);
        const target = document.querySelector(mapping.target);
        
        if (triggers.length && target) {
            triggers.forEach(trigger => {
                trigger.addEventListener('change', function() {
                    if (this.value === mapping.showValue) {
                        showElement(target);
                    } else {
                        hideElement(target);
                    }
                });
                
                // Verificar estado inicial
                if (trigger.checked && trigger.value === mapping.showValue) {
                    showElement(target);
                }
            });
        }
    });
}

/**
 * Mostrar elemento con animación
 */
function showElement(element) {
    element.style.display = 'block';
    element.classList.add('fade-in');
    
    // Hacer campos requeridos si es necesario
    const inputs = element.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (input.dataset.conditionalRequired) {
            input.required = true;
        }
    });
}

/**
 * Ocultar elemento
 */
function hideElement(element) {
    element.style.display = 'none';
    element.classList.remove('fade-in');
    
    // Quitar requerimiento y limpiar valores
    const inputs = element.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.required = false;
        if (input.type !== 'radio' && input.type !== 'checkbox') {
            input.value = '';
        } else {
            input.checked = false;
        }
        clearFieldStatus(input);
    });
}

/**
 * Tracking de progreso del formulario
 */
function initProgressTracking() {
    const form = document.getElementById('declarationForm');
    const progressBar = document.getElementById('formProgress');
    const progressText = document.getElementById('progressText');
    
    if (!form || !progressBar || !progressText) return;
    
    function updateProgress() {
        const requiredInputs = form.querySelectorAll('input[required]:not([style*="display: none"]), select[required]:not([style*="display: none"])');
        let completed = 0;
        
        requiredInputs.forEach(input => {
            if (input.type === 'radio') {
                const radioGroup = form.querySelectorAll(`input[name="${input.name}"]`);
                const hasChecked = Array.from(radioGroup).some(radio => radio.checked);
                if (hasChecked) completed++;
            } else if (input.value.trim() !== '') {
                completed++;
            }
        });
        
        const percentage = Math.round((completed / requiredInputs.length) * 100) || 0;
        progressBar.style.width = percentage + '%';
        progressText.textContent = percentage + '%';
        
        // Cambiar color según progreso
        progressBar.className = 'progress-bar';
        if (percentage < 30) {
            progressBar.classList.add('bg-danger');
        } else if (percentage < 70) {
            progressBar.classList.add('bg-warning');
        } else {
            progressBar.classList.add('bg-success');
        }
    }
    
    // Actualizar progreso en tiempo real
    form.addEventListener('input', updateProgress);
    form.addEventListener('change', updateProgress);
    
    // Actualización inicial
    setTimeout(updateProgress, 100);
}

/**
 * Cálculos automáticos de dinero
 */
function initMoneyCalculations() {
    const ingresosInputs = [
        'sueldoSalarios', 'honorarios', 'actividadFinanciera', 
        'actividadComercial', 'otrosIngresos'
    ];
    
    const totalInput = document.getElementById('ingresosTotales');
    
    if (!totalInput) return;
    
    ingresosInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', calcularIngresosTotales);
            input.addEventListener('blur', function() {
                if (this.value) {
                    this.value = parseFloat(this.value).toFixed(2);
                }
            });
        }
    });
    
    function calcularIngresosTotales() {
        let total = 0;
        ingresosInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input && input.value) {
                total += parseFloat(input.value) || 0;
            }
        });
        totalInput.value = total.toFixed(2);
        
        // Animar el campo total
        totalInput.classList.add('bg-success', 'text-white');
        setTimeout(() => {
            totalInput.classList.remove('bg-success', 'text-white');
        }, 1000);
    }
}

/**
 * Funcionalidad de guardado automático (borrador)
 */
function initFormSave() {
    const form = document.getElementById('declarationForm');
    if (!form) return;
    
    // Guardar borrador cada 30 segundos
    setInterval(() => {
        saveDraft();
    }, 30000);
    
    // Guardar al cambiar campos importantes
    form.addEventListener('change', () => {
        setTimeout(saveDraft, 1000);
    });
    
    // Cargar borrador al iniciar
    loadDraft();
}

/**
 * Guardar borrador en localStorage
 */
function saveDraft() {
    const form = document.getElementById('declarationForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        if (data[key]) {
            // Manejar múltiples valores (checkboxes)
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    }
    
    try {
        localStorage.setItem('declarationDraft', JSON.stringify(data));
        showTemporaryMessage('Borrador guardado automáticamente', 'success');
    } catch (e) {
        console.warn('No se pudo guardar el borrador:', e);
    }
}

/**
 * Cargar borrador desde localStorage
 */
function loadDraft() {
    try {
        const draft = localStorage.getItem('declarationDraft');
        if (draft) {
            const data = JSON.parse(draft);
            const form = document.getElementById('declarationForm');
            
            Object.keys(data).forEach(key => {
                const elements = form.querySelectorAll(`[name="${key}"]`);
                elements.forEach(element => {
                    if (element.type === 'checkbox' || element.type === 'radio') {
                        if (Array.isArray(data[key])) {
                            element.checked = data[key].includes(element.value);
                        } else {
                            element.checked = element.value === data[key];
                        }
                    } else {
                        element.value = data[key];
                    }
                });
            });
            
            showTemporaryMessage('Borrador cargado', 'info');
        }
    } catch (e) {
        console.warn('No se pudo cargar el borrador:', e);
    }
}

/**
 * Mostrar mensaje temporal
 */
function showTemporaryMessage(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

/**
 * Utilidades globales
 */
window.DeclaraNet = {
    validateRFC,
    validateCURP,
    validateCP,
    showTemporaryMessage,
    saveDraft,
    loadDraft
};
