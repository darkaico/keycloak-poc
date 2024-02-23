import React from 'react'
import { Link } from 'react-router-dom'
import { useKeycloak } from '../context/KeycloakContext'

interface NavBarProps {
  onLogin: () => void
  onLogout: () => void
}

const NavBar: React.FC<NavBarProps> = ({ onLogin, onLogout }) => {
  const { authenticated } = useKeycloak()

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        {authenticated ? (
          <>
            <li>
              <Link to="/my-profile">
                My Profile
              </Link>
            </li>
            <li onClick={onLogout}>Logout</li>
          </>
        ) : (
          <li onClick={onLogin}>Login</li>
        )}
      </ul>
    </nav>
  )
}

export default NavBar
