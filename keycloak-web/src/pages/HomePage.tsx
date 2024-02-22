import React from 'react';
import { useKeycloak } from '../context/KeyclockContext';

const HomePage: React.FC = () => {
    const { keycloak, authenticated } = useKeycloak();
    console.log('keycloak', keycloak)
    console.log('authenticated', authenticated)

    const handleLogin = () => {
        keycloak?.login();
    };

    const handleLogout = () => {
        keycloak?.logout();
    };

    return (
        <div>
            <h1>Welcome to the Home Page!</h1>
            {authenticated ? (
                <div>
                    <p>Hello, {keycloak?.idTokenParsed.preferred_username}!</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <p>Please log in to access your personalized content.</p>
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}
        </div>
    );
};

export default HomePage;