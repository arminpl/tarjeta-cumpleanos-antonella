class AudioManager {
    constructor() {
        this.currentMusic = null;
        this.isMuted = false;
        this.isInitialized = false;
        this.musicVolume = 0.3;
        this.sfxVolume = 0.5;
        this.sounds = {};
        this.music = {};
        this.currentMusicElement = null;
        this.playingSounds = new Set();
        console.log('🎵 AudioManager creado');
    }

    init() {
        if (this.isInitialized) return;
        this.isInitialized = true;
        console.log('🎵 Audio inicializado');
        this.loadSounds();
    }

    loadSounds() {
        const soundFiles = {
            'intro': 'intro.mp3',
            'button_click': 'button_click.mp3',
            'egg_shake': 'egg_shake.mp3',
            'egg_crack': 'egg_crack.mp3',
            'egg_break': 'egg_break.mp3',
            'surprise': 'surprise.mp3',
            'soft_pop': 'soft_pop.mp3',
            'confetti_celebracion': 'confetti_celebracion.mp3'
        };

        const musicFiles = {
            'musica_aventura': 'musica_aventura.mp3',
            'musica_cumpleanos': 'musica_cumpleanos.mp3'
        };

        for (const [key, file] of Object.entries(soundFiles)) {
            const audio = new Audio(`assets/audio/${file}`);
            audio.preload = 'auto';
            this.sounds[key] = audio;
        }

        for (const [key, file] of Object.entries(musicFiles)) {
            const audio = new Audio(`assets/audio/${file}`);
            audio.preload = 'auto';
            audio.loop = true;
            audio.volume = this.musicVolume;
            this.music[key] = audio;
        }

        console.log('✅ Sonidos cargados:', Object.keys(this.sounds));
        console.log('✅ Música cargada:', Object.keys(this.music));
    }

    play(soundName) {
        if (this.isMuted || !this.isInitialized) {
            console.log(`🔇 Sonido ${soundName} silenciado`);
            return;
        }

        const sound = this.sounds[soundName];
        if (!sound) {
            console.warn(`⚠️ Sonido no encontrado: ${soundName}`);
            return;
        }

        try {
            if (this.playingSounds.has(soundName)) {
                sound.pause();
                sound.currentTime = 0;
                this.playingSounds.delete(soundName);
            }

            sound.volume = this.sfxVolume;
            sound.currentTime = 0;
            this.playingSounds.add(soundName);
            
            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log(`🔊 Reproduciendo: ${soundName}`);
                    })
                    .catch(error => {
                        if (error.name === 'AbortError') {
                            console.log(`⏹️ Sonido ${soundName} interrumpido (normal)`);
                        } else {
                            console.warn(`⚠️ Error al reproducir ${soundName}:`, error);
                        }
                        this.playingSounds.delete(soundName);
                    });
            }
        } catch (error) {
            console.warn(`⚠️ Error al reproducir ${soundName}:`, error);
            this.playingSounds.delete(soundName);
        }
    }

    playMusic(musicName) {
        if (this.isMuted || !this.isInitialized) {
            console.log(`🔇 Música ${musicName} silenciada`);
            return;
        }

        this.stopMusic();

        const music = this.music[musicName];
        if (!music) {
            console.warn(`⚠️ Música no encontrada: ${musicName}`);
            return;
        }

        try {
            music.volume = this.musicVolume;
            music.currentTime = 0;
            
            const playPromise = music.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log(`🎵 Reproduciendo música: ${musicName}`);
                    })
                    .catch(error => {
                        if (error.name === 'AbortError') {
                            console.log(`⏹️ Música ${musicName} interrumpida (normal)`);
                        } else {
                            console.warn(`⚠️ Error al reproducir música ${musicName}:`, error);
                        }
                    });
            }
            this.currentMusicElement = music;
        } catch (error) {
            console.warn(`⚠️ Error al reproducir música ${musicName}:`, error);
        }
    }

    toggle() {
        this.isMuted = !this.isMuted;
        const btn = document.getElementById('audio-toggle');
        if (btn) {
            btn.textContent = this.isMuted ? '🔇' : '🔊';
        }
        
        if (this.isMuted) {
            this.stopAll();
        }
        
        console.log('🔊 Audio:', this.isMuted ? 'MUTE' : 'UNMUTE');
    }

    stopMusic() {
        if (this.currentMusicElement) {
            try {
                this.currentMusicElement.pause();
                this.currentMusicElement.currentTime = 0;
            } catch (e) {}
            this.currentMusicElement = null;
        }

        for (const [key, music] of Object.entries(this.music)) {
            try {
                if (!music.paused) {
                    music.pause();
                    music.currentTime = 0;
                }
            } catch (e) {}
        }
    }

    stopAll() {
        console.log('⏹️ Deteniendo todos los sonidos...');
        
        for (const [key, sound] of Object.entries(this.sounds)) {
            try {
                if (!sound.paused) {
                    sound.pause();
                    sound.currentTime = 0;
                }
            } catch (e) {}
        }

        this.playingSounds.clear();
        this.stopMusic();
        
        console.log('⏹️ Todos los sonidos detenidos');
    }

    playSoft(soundName) {
        if (this.isMuted || !this.isInitialized) {
            console.log(`🔇 Sonido suave ${soundName} silenciado`);
            return;
        }

        const sound = this.sounds[soundName];
        if (!sound) {
            console.warn(`⚠️ Sonido no encontrado: ${soundName}`);
            return;
        }

        try {
            if (this.playingSounds.has(soundName)) {
                sound.pause();
                sound.currentTime = 0;
                this.playingSounds.delete(soundName);
            }

            sound.volume = this.sfxVolume * 0.5;
            sound.currentTime = 0;
            this.playingSounds.add(soundName);
            
            const playPromise = sound.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log(`🔊 Sonido suave: ${soundName}`);
                    })
                    .catch(error => {
                        if (error.name === 'AbortError') {
                            console.log(`⏹️ Sonido suave ${soundName} interrumpido (normal)`);
                        } else {
                            console.warn(`⚠️ Error al reproducir ${soundName}:`, error);
                        }
                        this.playingSounds.delete(soundName);
                    });
            }
        } catch (error) {
            console.warn(`⚠️ Error al reproducir ${soundName}:`, error);
            this.playingSounds.delete(soundName);
        }
    }

    setSfxVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
        for (const [key, sound] of Object.entries(this.sounds)) {
            sound.volume = this.sfxVolume;
        }
    }

    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        for (const [key, music] of Object.entries(this.music)) {
            music.volume = this.musicVolume;
        }
    }
}