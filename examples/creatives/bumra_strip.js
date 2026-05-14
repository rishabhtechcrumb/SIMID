window.YAAS = window.YAAS || {};

class Overlay extends BaseSimidCreative {
    constructor() {
        super();
        this.initUI_();
    }

    /**
     * Set up button listeners safely
     */
    initUI_() {
        const buttons = {
            'play_btn': CreativeMessage.REQUEST_PLAY,
            'pause_btn': CreativeMessage.REQUEST_PAUSE,
            'skip_btn': CreativeMessage.REQUEST_SKIP
        };

        for (const [id, message] of Object.entries(buttons)) {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', () => {
                    this.simidProtocol.sendMessage(message);
                });
            }
        }
    }

    /**
     * SIMID standard override to update video time
     */
    onTimeUpdate(data) {
        super.onTimeUpdate(data);
        const currentTime = this.videoState.currentTime || 0;
    }
}

/**
 * STARTUP LOGIC
 * We wait for DOMContentLoaded to ensure elements like 'play_btn' exist 
 * before the Overlay class tries to attach event listeners.
 */
window.addEventListener('DOMContentLoaded', () => {
    const creative = new Overlay();
    creative.ready();
});