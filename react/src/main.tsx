import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Inject noise overlay outside React — as a direct child of <body>,
// exactly like the proven Gemini reference HTML structure.
// React's rendering lifecycle can interfere with fixed-position
// pseudo-elements and nested overlays, so we bypass it entirely.
const noiseEl = document.createElement('div')
noiseEl.className = 'noise-overlay'
noiseEl.setAttribute('aria-hidden', 'true')
document.body.appendChild(noiseEl)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
