import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import Keycloak from 'keycloak-js';

interface KeycloakContextProps {
    keycloak: Keycloak | null;
    authenticated: boolean;
}

const KeycloakContext = createContext<KeycloakContextProps | undefined>(undefined);

interface KeycloakProviderProps {
    children: React.ReactNode;
}

const KeycloakProvider: React.FC<KeycloakProviderProps> = ({ children }) => {
    const isRun = useRef<boolean>(false);
    const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        if (isRun.current) return;

        isRun.current = true;

        const initKeycloak = async () => {
            const keycloackConfig = {
                url: import.meta.env.VITE_KEYCLOAK_URL as string,
                realm: import.meta.env.VITE_KEYCLOAK_REALM as string,
                clientId: import.meta.env.VITE_KEYCLOAK_CLIENT as string,
                // redirectUri: 'http://localhost:5173'
            }

            console.log('keycloackConfig', keycloackConfig);

            const keycloakInstance: Keycloak = new Keycloak(keycloackConfig);

            keycloakInstance.init({
                onLoad: 'login-required',
            }).then((authenticated: boolean) => {
                setAuthenticated(authenticated);
            }).catch((error) => {
                console.error('Keycloak initialization failed:', error);
                setAuthenticated(false);
            }).finally(() => {
                setKeycloak(keycloakInstance);
            })
        };

        initKeycloak();
    }, []);

    return (
        <KeycloakContext.Provider value={{ keycloak, authenticated }}>
            {children}
        </KeycloakContext.Provider>
    );
};

const useKeycloak = (): KeycloakContextProps => {
    const context = useContext(KeycloakContext);
    if (!context) {
        throw new Error('useKeycloak must be used within a KeycloakProvider');
    }
    return context;
};

export { KeycloakProvider, useKeycloak };
