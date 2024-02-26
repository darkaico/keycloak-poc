import React from 'react'
import useKeycloak from '../hooks/useKeycloak';

const HomePage: React.FC = () => {
  const { keycloak, authenticated } = useKeycloak();

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      {authenticated ? (
        <div>
          <p>Hello, {keycloak?.idTokenParsed.preferred_username}!</p>
        </div>
      ) : (
        <div>
          <p>Please log in to access your personalized content.</p>
        </div>
      )}
    </div>
  )
}

export default HomePage
