import React from 'react'
import NavBar from '../components/NavBar'

const Layout: React.FC = ({ children }) => (
  <>
    <NavBar />
    {children}
  </>
)

export default Layout
