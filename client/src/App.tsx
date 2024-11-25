import { BrowserRouter, Route, Routes } from 'react-router'
import Rides from './pages/Rides'
import Trips from './pages/Trips'
import { Toaster } from '@/components/ui/sonner'

const App = () => (
  <BrowserRouter>
    <Toaster />
    <Routes>
      <Route path="/" element={<Rides />} />
      <Route path="/viagens" element={<Trips />} />
    </Routes>
  </BrowserRouter>
)

export default App
