/**
 * Arquivo JavaScript principal
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Aplicação Beauty Clinic Finance inicializada');
    
    // Inicializa tooltips
    initTooltips();
    
    // Inicializa máscaras de entrada
    initInputMasks();
});

/**
 * Inicializa as tooltips do Bootstrap
 */
function initTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    if (tooltipTriggerList.length > 0) {
        [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }
}

/**
 * Inicializa as máscaras de entrada para campos específicos
 */
function initInputMasks() {
    // A implementar com biblioteca de máscaras
    console.log('Máscaras de entrada inicializadas');
}

/**
 * Função para mostrar alertas de notificação
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo do alerta (success, danger, warning, info)
 */
function showAlert(message, type = 'info') {
    const alertPlaceholder = document.getElementById('alertPlaceholder');
    if (alertPlaceholder) {
        const alert = document.createElement('div');
        alert.classList.add('alert', `alert-${type}`, 'alert-dismissible', 'fade', 'show');
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
        `;
        
        alertPlaceholder.appendChild(alert);
        
        // Auto-remover após 5 segundos
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 300);
        }, 5000);
    }
} 