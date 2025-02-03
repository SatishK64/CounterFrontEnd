import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Divider from './Divider'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Divider />
  </StrictMode>,
)
