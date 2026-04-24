import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div className="text-foreground bg-background min-h-screen">
        <App />
      </div>
    </BrowserRouter>
  </StrictMode>,
)
