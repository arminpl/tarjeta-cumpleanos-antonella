class SceneManager {
    constructor() {
        this.eggClicks = 0;
        this.audio = null;
        this.typingEffect = null;
        this.sceneTimers = [];
        console.log('🎬 SceneManager creado');
    }

    clearTimers() {
        console.log('🧹 Limpiando timers...');
        this.sceneTimers.forEach(t => clearTimeout(t));
        this.sceneTimers = [];
    }

    onSceneEnter(index) {
        console.log('🎬 Entrando a escena:', index);
        
        if (window.app && window.app.audio) {
            this.audio = window.app.audio;
        }
        
        if (typeof typingEffect !== 'undefined') {
            this.typingEffect = typingEffect;
        }
        
        this.clearTimers();
        
        if (this.typingEffect) {
            this.typingEffect.clearAll();
        }
        
        switch(index) {
            case 0: this.scene0(); break;
            case 1: this.scene1(); break;
            case 2: this.scene2(); break;
            case 3: this.scene3(); break;
            case 4: this.scene4(); break;
            case 5: this.scene5(); break;
            default: console.log('⚠️ Escena no manejada:', index);
        }
    }

    scene0() {
        console.log('🎬 Escena 0: Aventura');
        
        // ✅ CORRECCIÓN: AGREGADO SONIDO DE INTRO AL ENTRAR A LA ESCENA 0
        if (this.audio) {
            setTimeout(() => {
                this.audio.play('intro');
            }, 500);
        }
        
        if (this.typingEffect) {
            setTimeout(() => {
                this.typingEffect.applyToScene(0);
            }, 300);
        }
        
        const btn = document.getElementById('btn-comenzar');
        if (btn) {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', () => {
                console.log('🎯 Click en COMENZAR');
                if (this.audio) {
                    this.audio.play('button_click');
                    this.audio.playMusic('musica_aventura');
                }
                if (window.app) {
                    window.app.nextScene();
                }
            });
        }
    }

    scene1() {
        console.log('🎬 Escena 1: Huevo');
        
        if (this.typingEffect) {
            setTimeout(() => {
                this.typingEffect.applyToScene(1);
            }, 300);
        }
        
        this.eggClicks = 0;
        const huevo = document.getElementById('huevo-interactivo');
        
        if (huevo) {
            const newHuevo = huevo.cloneNode(true);
            huevo.parentNode.replaceChild(newHuevo, huevo);
            const newImg = newHuevo.querySelector('img');
            
            if (newImg) {
                newImg.src = 'assets/images/objetos/solo huevo.webp';
                newImg.style.animation = '';
            }
            
            newHuevo.addEventListener('click', () => {
                this.eggClicks++;
                console.log('🥚 Click en huevo:', this.eggClicks);
                
                switch(this.eggClicks) {
                    case 1:
                        if (this.audio) this.audio.play('egg_shake');
                        if (newImg) {
                            newImg.style.animation = 'shake 0.3s ease';
                            setTimeout(() => {
                                newImg.style.animation = '';
                            }, 500);
                        }
                        break;
                        
                    case 2:
                        if (this.audio) this.audio.play('egg_crack');
                        if (newImg) {
                            newImg.src = 'assets/images/objetos/huevo agrietado.webp';
                            newImg.style.animation = 'shake 0.4s ease';
                            setTimeout(() => {
                                newImg.style.animation = '';
                            }, 600);
                        }
                        break;
                        
                    case 3:
                        if (this.audio) {
                            this.audio.play('egg_break');
                            setTimeout(() => {
                                this.audio.play('surprise');
                            }, 300);
                        }
                        if (newImg) {
                            newImg.src = 'assets/images/objetos/huevo abierto.webp';
                            newImg.style.animation = 'none';
                        }
                        
                        const timer = setTimeout(() => {
                            console.log('➡️ Avanzando a escena 2');
                            if (window.app) window.app.nextScene();
                        }, 1500);
                        this.sceneTimers.push(timer);
                        break;
                }
            });
        }
    }

    scene2() {
        console.log('🎬 Escena 2: Sorpresa');
        
        if (this.typingEffect) {
            setTimeout(() => {
                this.typingEffect.applyToScene(2);
            }, 300);
        }
        
        const trici = document.querySelector('#scene-2 .personaje-trici');
        const estegui = document.querySelector('#scene-2 .personaje-estegui');
        
        if (trici) {
            trici.style.transform = 'translateX(-100%)';
            setTimeout(() => {
                trici.style.transition = 'transform 0.8s ease';
                trici.style.transform = 'translateX(0)';
            }, 300);
        }
        
        if (estegui) {
            estegui.style.transform = 'translateX(100%)';
            setTimeout(() => {
                estegui.style.transition = 'transform 0.8s ease';
                estegui.style.transform = 'translateX(0)';
            }, 500);
        }

        const timer = setTimeout(() => {
            console.log('➡️ Avanzando a escena 3');
            if (window.app) window.app.nextScene();
        }, 6000);
        this.sceneTimers.push(timer);
    }

    scene3() {
        console.log('🎬 Escena 3: Antonella');
        
        if (this.audio) {
            this.audio.playMusic('musica_cumpleanos');
        }
        
        if (this.typingEffect) {
            setTimeout(() => {
                this.typingEffect.applyToScene(3);
            }, 300);
        }
        
        this.activateFiesta();
        
        const timer = setTimeout(() => {
            console.log('➡️ Avanzando a escena 4');
            if (window.app) window.app.nextScene();
        }, 6000);
        this.sceneTimers.push(timer);
    }

    scene4() {
        console.log('🎬 Escena 4: Datos');
        
        if (this.typingEffect) {
            setTimeout(() => {
                this.typingEffect.applyToScene(4);
            }, 300);
        }
        
        if (this.audio) {
            this.audio.play('soft_pop');
        }
        
        const timer = setTimeout(() => {
            console.log('➡️ Avanzando a escena 5');
            if (window.app) window.app.nextScene();
        }, 6000);
        this.sceneTimers.push(timer);
    }

    scene5() {
        console.log('🎬 Escena 5: Cierre - Te esperamos');
        
        if (this.typingEffect) {
            setTimeout(() => {
                this.typingEffect.applyToScene(5);
            }, 300);
        }
        
        this.activateFiesta();
        
        if (this.audio) {
            this.audio.play('confetti_celebracion');
        }
        
        const btnMapa = document.querySelector('.btn-mapa');
        if (btnMapa) {
            const newBtnMapa = btnMapa.cloneNode(true);
            btnMapa.parentNode.replaceChild(newBtnMapa, btnMapa);
            newBtnMapa.addEventListener('click', () => {
                if (this.audio) this.audio.play('button_click');
                console.log('📍 Abriendo ubicación en Google Maps');
                window.open('https://maps.app.goo.gl/qBFQFPBtmK9fX5fJ9', '_blank');
            });
        }
        
        const btnConfirmar = document.getElementById('btn-confirmar');
        if (btnConfirmar) {
            const newBtnConfirmar = btnConfirmar.cloneNode(true);
            btnConfirmar.parentNode.replaceChild(newBtnConfirmar, btnConfirmar);
            
            newBtnConfirmar.addEventListener('click', () => {
                if (this.audio) {
                    this.audio.play('button_click');
                    setTimeout(() => {
                        this.audio.play('surprise');
                    }, 200);
                }
                
                newBtnConfirmar.textContent = '✅ ¡CONFIRMADO! 🎉';
                newBtnConfirmar.style.background = 'linear-gradient(135deg, #00b894, #00cec9)';
                newBtnConfirmar.style.transform = 'scale(1.05)';
                
                const msg = encodeURIComponent('🎂 ¡Confirmo mi asistencia al cumpleaños de Antonella! 🦕🎉');
                window.open('https://wa.me/+59171576430?text=' + msg, '_blank');
                
                setTimeout(() => {
                    newBtnConfirmar.textContent = '✅ CONFIRMAR PARTICIPACIÓN';
                    newBtnConfirmar.style.transform = '';
                }, 3000);
            });
        }
        
        const btnReiniciar = document.getElementById('btn-reiniciar');
        console.log('🔍 Buscando btn-reiniciar:', btnReiniciar);
        
        if (btnReiniciar) {
            const newBtnReiniciar = btnReiniciar.cloneNode(true);
            btnReiniciar.parentNode.replaceChild(newBtnReiniciar, btnReiniciar);
            
            newBtnReiniciar.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🔄 Click en REINICIAR');
                if (this.audio) {
                    this.audio.play('button_click');
                    setTimeout(() => {
                        if (window.app) {
                            window.app.restart();
                        }
                    }, 200);
                } else {
                    if (window.app) {
                        window.app.restart();
                    }
                }
            });
        } else {
            console.warn('⚠️ Botón REINICIAR no encontrado en el DOM');
        }
    }

    activateFiesta() {
        const container = document.getElementById('scene-container');
        
        const oldOverlay = container.querySelector('.fiesta-overlay');
        if (oldOverlay) oldOverlay.remove();
        
        const overlay = document.createElement('div');
        overlay.className = 'fiesta-overlay';
        container.appendChild(overlay);
        
        this.createConfeti();
    }

    createConfeti() {
        const container = document.getElementById('scene-container');
        const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bcb', '#ff9f43', '#a29bfe'];
        
        const oldConfeti = container.querySelectorAll('.confeti');
        oldConfeti.forEach(el => el.remove());
        
        for (let i = 0; i < 30; i++) {
            const confeti = document.createElement('div');
            confeti.className = 'confeti';
            confeti.style.cssText = `
                left: ${Math.random() * 100}%;
                top: -10px;
                width: ${Math.random() * 8 + 4}px;
                height: ${Math.random() * 8 + 4}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                animation: caerConfeti ${Math.random() * 3 + 2}s linear infinite;
                animation-delay: ${Math.random() * 3}s;
            `;
            container.appendChild(confeti);
        }
    }
}