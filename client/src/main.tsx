import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route } from 'react-router'
import { Routes } from 'react-router'
import Rides from './pages/Rides'
import Trips from './pages/Trips'
import { Toaster } from '@/components/ui/sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />
        <Routes>
          <Route path="/" element={<Rides />} />
          <Route path="/viagens" element={<Trips />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
