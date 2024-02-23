import './App.css'
import HomePage from './pages/HomePage'
import { KeycloakProvider } from './context/KeycloakContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MyProfile from './pages/MyProfile'

function App() {
  return (
    <KeycloakProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-profile" element={<MyProfile />} />
        </Routes>
      </BrowserRouter>
    </KeycloakProvider>
  )
}

export default App
