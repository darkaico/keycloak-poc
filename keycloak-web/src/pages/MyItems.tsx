import React, { useEffect, useState } from 'react';
import AuthenticationMessage from '../components/AuthenticationMessage';
import ItemDTO from '../types/dtos';
import useKeycloak from '../hooks/useKeycloak';

const MyItems: React.FC = () => {
  const { authenticated, keycloak } = useKeycloak();
  const [items, setItems] = useState<ItemDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (!keycloak) {
          return;
        }

        const userId = keycloak.idTokenParsed?.sub;

        setLoading(true);
        setError(null);

        const response = await fetch(`/api/users/${userId}/items`, {
          headers: {
            Authorization: `Bearer ${keycloak.token}`
          }
        });

        if (!response.ok) {
          setError('Error fetching items.');
          return;
        }

        const data = await response.json();
        setItems(data.items);
      } catch (error) {
        console.error('Error fetching items:', error);
        setError('Unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    if (authenticated) {
      fetchItems();
    }
  }, [keycloak, authenticated]);

  if (!authenticated || !keycloak) {
    return <AuthenticationMessage />;
  }

  return (
    <div>
      <h1>Welcome to My Items Page!</h1>
      <p>Hello, {keycloak?.idTokenParsed.preferred_username}!</p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Items</h2>
      {items && items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>No items available.</p>
      )}
    </div>
  );
};

export default MyItems;
