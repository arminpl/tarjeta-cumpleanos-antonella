console.log('👆 Touch manager cargado');

document.addEventListener('touchstart', function(e) {
    const target = e.target.closest('.btn-principal, .huevo-container');
    if (target) {
        target.classList.add('touch-active');
    }
}, { passive: true });

document.addEventListener('touchend', function(e) {
    const target = e.target.closest('.btn-principal, .huevo-container');
    if (target) {
        target.classList.remove('touch-active');
    }
}, { passive: true });