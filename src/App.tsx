import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { UserForm } from './components/UserForm'
import { Toaster } from './components/ui/toaster'
import Artisans from './pages/Artisans'

function App() {


  return (
    <>
      <main className="min-h-[90vh] text-black bg-gray-100 border-2 border-slate-800 rounded-md p-4">
        <Router>
          <Routes>
            <Route path="/" element={<UserForm type="signin" />} />
            <Route path="/artisans" element={<Artisans />} />
          </Routes>
        </Router>
        <Toaster />

      </main>
    </>
  )
}

export default App