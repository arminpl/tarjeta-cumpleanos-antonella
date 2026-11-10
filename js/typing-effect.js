class TypingEffect {
    constructor() {
        this.typingSpeed = 45;
        this.timeouts = [];
        this.intervals = [];
        console.log('⌨️ TypingEffect inicializado');
    }

    applyTo(container = document, delay = 200) {
        this.clearAll();
        
        const elements = container.querySelectorAll ? 
            container.querySelectorAll('.typing-text') : 
            document.querySelectorAll('.typing-text');
        
        if (elements.length === 0) return;

        console.log(`⌨️ Aplicando efecto de escritura a ${elements.length} textos`);
        
        elements.forEach((el, index) => {
            const originalText = el.textContent.trim();
            el.textContent = '';
            el.style.visibility = 'visible';
            
            let classDelay = 0;
            if (el.classList.contains('delay-1')) classDelay = 300;
            else if (el.classList.contains('delay-2')) classDelay = 800;
            else if (el.classList.contains('delay-3')) classDelay = 1300;
            
            const startDelay = delay + classDelay + (index * 100);
            this.typeText(el, originalText, startDelay);
        });
    }

    typeText(element, text, delay) {
        const chars = text.split('');
        let index = 0;
        
        const timeout = setTimeout(() => {
            element.textContent = '';
            
            const typeInterval = setInterval(() => {
                if (index < chars.length) {
                    element.textContent += chars[index];
                    index++;
                } else {
                    clearInterval(typeInterval);
                    element.classList.add('typing-done');
                }
            }, this.typingSpeed);
            
            this.intervals.push(typeInterval);
        }, delay);
        
        this.timeouts.push(timeout);
    }

    clearAll() {
        this.timeouts.forEach(t => clearTimeout(t));
        this.timeouts = [];
        
        this.intervals.forEach(i => clearInterval(i));
        this.intervals = [];
    }

    resetTexts(container = document) {
        const elements = container.querySelectorAll ? 
            container.querySelectorAll('.typing-text') : 
            document.querySelectorAll('.typing-text');
        
        elements.forEach(el => {
            if (!el.dataset.originalText) {
                el.dataset.originalText = el.textContent;
            }
            el.textContent = el.dataset.originalText || el.textContent;
            el.style.visibility = 'visible';
            el.classList.remove('typing-done');
        });
    }

    applyToScene(sceneIndex) {
        const sceneEl = document.querySelector(`.scene[data-scene="${sceneIndex}"]`);
        if (sceneEl) {
            const textos = sceneEl.querySelectorAll('.typing-text');
            textos.forEach(el => {
                el.style.visibility = 'visible';
            });
            
            this.resetTexts(sceneEl);
            this.applyTo(sceneEl, 300);
        }
    }

    applyToElement(element, delay = 0) {
        if (!element) return;
        const originalText = element.textContent.trim();
        element.textContent = '';
        element.style.visibility = 'visible';
        this.typeText(element, originalText, delay);
    }
}

const typingEffect = new TypingEffect();