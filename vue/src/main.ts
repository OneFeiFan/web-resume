import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './index.css';

// Inject noise overlay outside Vue — as a direct child of <body>,
// exactly like the React version. Bypasses framework rendering lifecycle.
const noiseEl = document.createElement('div');
noiseEl.className = 'noise-overlay';
noiseEl.setAttribute('aria-hidden', 'true');
document.body.appendChild(noiseEl);

createApp(App).use(createPinia()).use(router).mount('#app');
