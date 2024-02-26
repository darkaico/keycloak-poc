import React from 'react';
import { useKeycloak } from '../context/KeycloakContext';
import AuthenticationMessage from '../components/AuthenticationMessage';

const MyAccount: React.FC = () => {
  const { keycloak, authenticated } = useKeycloak();

  if (!authenticated || !keycloak) {
    return <AuthenticationMessage />;
  }

  return (
    <div>
      <h1>My Account</h1>
      <p>Hello, {keycloak?.idTokenParsed.preferred_username}!</p>
      <p>Email: {keycloak?.idTokenParsed.email}</p>
      <p>
            <textarea
              id="token"
              rows={20}
              cols={100}
              defaultValue={keycloak?.idToken}
            />
          </p>
    </div>
  );
};

export default MyAccount;
