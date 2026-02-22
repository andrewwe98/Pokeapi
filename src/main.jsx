import { BrowserRouter } from 'react-router-dom'  
import { createRoot } from 'react-dom/client'
import React from 'react'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <strictMode>
    <App />
  </strictMode>,
)
