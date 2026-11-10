class App {
    constructor() {
        this.currentScene = 0;
        this.totalScenes = 6;
        this.isTransitioning = false;
        this.audio = new AudioManager();
        this.sceneManager = new SceneManager();
        this.init();
    }

    init() {
        console.log('🔄 Inicializando App...');
        
        if (this.audio) {
            this.audio.init();
        }
        
        // 📱 Mantener pantalla encendida
        this.mantenerPantallaEncendida();
        
        setTimeout(() => {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.classList.add('hidden');
            }
        }, 500);

        this.setupEvents();
        
        setTimeout(() => {
            this.goToScene(0);
            setTimeout(() => {
                if (typingEffect) {
                    typingEffect.applyToScene(0);
                }
            }, 500);
        }, 100);
    }

    // 📱 Mantener pantalla encendida en celular
    async mantenerPantallaEncendida() {
        try {
            if ('wakeLock' in navigator) {
                const wakeLock = await navigator.wakeLock.request('screen');
                console.log('✅ Pantalla mantenida encendida');
                
                document.addEventListener('visibilitychange', async () => {
                    if (document.visibilityState === 'visible') {
                        try {
                            await navigator.wakeLock.request('screen');
                        } catch (e) {
                            console.log('⚠️ No se pudo reactivar WakeLock');
                        }
                    }
                });
            }
        } catch (error) {
            console.log('⚠️ WakeLock no soportado en este dispositivo');
        }
    }

    setupEvents() {
        const audioBtn = document.getElementById('audio-toggle');
        if (audioBtn) {
            audioBtn.addEventListener('click', () => {
                if (this.audio) {
                    this.audio.toggle();
                }
            });
        }
        
        const btnComenzar = document.getElementById('btn-comenzar');
        if (btnComenzar) {
            const newBtn = btnComenzar.cloneNode(true);
            btnComenzar.parentNode.replaceChild(newBtn, btnComenzar);
            
            newBtn.addEventListener('click', () => {
                console.log('🎯 Click en COMENZAR');
                if (this.audio) {
                    this.audio.play('button_click');
                    this.audio.playMusic('musica_aventura');
                }
                this.nextScene();
            });
        }
    }

    goToScene(index) {
        if (this.isTransitioning || index === this.currentScene) return;
        if (index < 0 || index >= this.totalScenes) return;

        console.log('📍 Ir a escena:', index);
        this.isTransitioning = true;
        
        document.querySelectorAll('.scene').forEach(scene => {
            scene.classList.remove('active');
        });

        setTimeout(() => {
            const nextEl = document.querySelector('.scene[data-scene="' + index + '"]');
            if (nextEl) {
                nextEl.classList.add('active');
                if (this.sceneManager) {
                    this.sceneManager.onSceneEnter(index);
                }
            }
            this.currentScene = index;
            this.isTransitioning = false;
        }, 500);
    }

    nextScene() {
        console.log('➡️ Siguiente escena desde:', this.currentScene);
        this.goToScene(this.currentScene + 1);
    }

    restart() {
        console.log('🔄 Reiniciando aventura...');
        
        if (this.audio) {
            this.audio.stopAll();
        }
        
        document.querySelectorAll('.fiesta-overlay, .confeti, .globo-flotante, .btn-continuar').forEach(function(el) {
            if (el && el.parentNode) {
                el.remove();
            }
        });
        
        if (this.sceneManager) {
            this.sceneManager.clearTimers();
            this.sceneManager.eggClicks = 0;
        }
        
        if (typingEffect) {
            typingEffect.clearAll();
        }
        
        document.querySelectorAll('.scene').forEach(scene => {
            scene.classList.remove('active');
        });
        
        this.currentScene = -1;
        
        setTimeout(() => {
            this.goToScene(0);
            setTimeout(() => {
                if (typingEffect) {
                    typingEffect.applyToScene(0);
                }
            }, 600);
        }, 200);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM cargado, iniciando App...');
    window.app = new App();
});