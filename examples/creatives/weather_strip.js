window.YAAS = window.YAAS || {};

class Overlay extends BaseSimidCreative {
    constructor() {
        super();
        this.initUI_();
        this.initWeather_();
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
     * Logic for fetching/hardcoding coordinates
     */
    async initWeather_() {
        const lat = 28.704060;
        const lon = 77.102493;

        // const data = await this.getHardcodedWeather(lat, lon);
        const data = await this.getWeatherData(lat, lon);
        this.updateWeatherUI(data);
    }

    /**
     * Function that currently returns hardcoded values 
     * based on your specific API response.
     */
    async getHardcodedWeather(lat, lon) {
        // This simulates a successful response from the Open-Meteo API
        return {
            city: "New Delhi",
            temperature: 31.2,
            unit: "°C",
            windSpeed: "6.8 km/h"
        };
    }

        /**

     {
        "latitude": 28.717047,
        "longitude": 77.054794,
        "generationtime_ms": 0.019550323486328125,
        "utc_offset_seconds": 19800,
        "timezone": "Asia/Kolkata",
        "timezone_abbreviation": "GMT+5:30",
        "elevation": 221.0,
        "current_units": {
            "time": "iso8601",
            "interval": "seconds",
            "temperature_2m": "°C"
        },
        "current": {
            "time": "2026-05-05T15:15",
            "interval": 900,
            "temperature_2m": 28.0
        }
    } 
     */

    async getWeatherData(lat, lon) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m&timezone=auto`;
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        

        return {
            temperature: json.current.temperature_2m,
            unit: json.current_units.temperature_2m,
            city: "Delhi"
        };
    }

    /**
     * Injects the weather data into the HTML
     */
    updateWeatherUI(data) {
        const cityEl = document.getElementById('weather_city');
        const tempEl = document.getElementById('weather_temp');

        if (cityEl) cityEl.innerText = data.city;
        if (tempEl) tempEl.innerText = `☀️ ${data.temperature}${data.unit}`;
    }

    /**
     * SIMID standard override to update video time
     */
    onTimeUpdate(data) {
        super.onTimeUpdate(data);
        const currentTime = this.videoState.currentTime || 0;

        const timeEl = document.getElementById('time_indicator');
        if (timeEl) {
            const mins = Math.floor(currentTime / 60).toString().padStart(2, '0');
            const secs = Math.floor(currentTime % 60).toString().padStart(2, '0');
            timeEl.innerText = `${mins}:${secs}`;
        }
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