import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    // TODO create povider reducer
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
