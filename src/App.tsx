import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { UserForm } from './components/UserForm'
import { Toaster } from './components/ui/toaster'
import Artisan from './pages/Artisan'
import Artisans from './pages/Artisans'
import Navigation from './components/Navigation'
import SignOut from './pages/SignOut'

function App() {


  return (
    <>
      <Toaster />
      <Router>
        <main className="flex justify-center items-center h-screen relative">
          <div className="absolute top-0 left-0 w-full z-20 bg-gradient-to-r from-cyan-600 to-cyan-300 rounded-t-xl flex justify-center items-center">
            <Navigation />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-full z-10 bg-gray-200" />
          <div className="absolute left-0 right-0 mx-auto w-[1250px] top-[100px] bg-white rounded-lg shadow-lg p-4 z-30">
            <Routes>
              <Route path="/" element={<UserForm type="signin" />} />
              // TODO limit access to sign up page based on user role
              <Route path="/signup" element={<UserForm type="signup" />} />
              <Route path="/artisans" element={<Artisans />} />
              <Route path="/artisan" element={<Artisan />} />
              <Route path="/artisans/:uid" element={<Artisan />} />
              <Route path="/signout" element={<SignOut />} />
            </Routes>
          </div>
        </main>
      </Router>
    </>
  )
}

export default App