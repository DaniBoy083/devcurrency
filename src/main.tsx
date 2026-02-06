/*
  Ponto de entrada da aplicação
  Renderiza o componente App no elemento root do HTML
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'  // Estilos globais
import App from './App.tsx'

// Cria a raiz do React e renderiza o App
createRoot(document.getElementById('root')!).render(
  // StrictMode ajuda a detectar problemas potenciais na aplicação (desenvolvimento)
  <StrictMode>
    <App />
  </StrictMode>,
)
