import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Fontes empacotadas junto com o site: funcionam mesmo com internet ruim.
import '@fontsource/atkinson-hyperlegible/400.css'
import '@fontsource/atkinson-hyperlegible/700.css'
import '@fontsource/barlow-condensed/600.css'
import '@fontsource/barlow-condensed/700.css'

import './styles/tokens.css'
import './styles/base.css'
import './styles/app.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
