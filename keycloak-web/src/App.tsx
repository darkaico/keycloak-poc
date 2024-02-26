import './App.css'
import HomePage from './pages/HomePage'
import { KeycloakProvider } from './context/KeycloakContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MyItems from './pages/MyItems'
import Layout from './components/Layout'

function App() {
  return (
    <KeycloakProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/my-items"
            element={
              <Layout>
                <MyItems />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </KeycloakProvider>
  )
}

export default App
