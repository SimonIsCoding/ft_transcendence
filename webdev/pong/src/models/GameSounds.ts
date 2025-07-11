export class GameSounds {
    private static ctx: AudioContext;
    private static nodes: Record<string, OscillatorNode> = {};

    static init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }

    static play(name: 'paddle' | 'wall' | 'score') {
        this.init();
        
        // Stop existing sound if playing
        if (this.nodes[name]) {
            this.nodes[name].stop();
        }

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        // Configure based on sound type
        switch (name) {
            case 'paddle':
                osc.type = 'sine';
                osc.frequency.value = 220;
                gain.gain.value = 0.3;
                break;
            case 'wall':
                osc.type = 'square';
                osc.frequency.value = 440;
                gain.gain.value = 0.2;
                break;
            case 'score':
                osc.type = 'sawtooth';
                osc.frequency.value = 110;
                gain.gain.value = 0.4;
                break;
        }

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        // Original Pong sound durations
        const duration = name === 'score' ? 0.5 : 0.05;
        
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
        this.nodes[name] = osc;
    }
}