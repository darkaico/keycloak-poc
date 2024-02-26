import './App.css'
import HomePage from './pages/HomePage'
import { KeycloakProvider } from './context/KeycloakContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MyItems from './pages/MyItems'
import Layout from './components/Layout'
import ErrorBoundary from './context/ErrorBoundary'
import MyAccount from './pages/MyAccount'

function App() {
  return (
    <KeycloakProvider>
      <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route path="/my-account" element={<Layout><MyAccount /></Layout>} />
          <Route
            path="/my-items"
            element={
              <Layout>
                <MyItems />
              </Layout>
            }
          />
        </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </KeycloakProvider>
  )
}

export default App
