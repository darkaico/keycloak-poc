import React, { useEffect, useState } from 'react'
import { useKeycloak } from '../context/KeycloakContext'

const MyProfile: React.FC = () => {
  const { authenticated, keycloak } = useKeycloak()
  if (!authenticated) {
    //TODO: only render here if we are authenticated
  }

  const [items, setItems] = useState<any[]>([]) // Update the type accordingly

  useEffect(() => {
    // Fetch items associated with the user from your API
    const fetchItems = async () => {
      try {
        const userId = keycloak?.idTokenParsed.sub;

        // Use keycloak.token for authentication if needed
        const response = await fetch(`/api/users/${userId}/items`)

        if (response.status != 200) {
          console.error('Item not found', response.json())
          return
        }

        const data = await response.json()
        setItems(data.items)
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    }

    // TODO: improve this call
    if(authenticated) {
      fetchItems()
    }
  }, [keycloak])

  return (
    <div>
      <h1>My Profile</h1>
      <p>Hello, {keycloak?.idTokenParsed.preferred_username}!</p>
      <h2>My Items:</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li> // Update with your item properties
        ))}
      </ul>
    </div>
  )
}

export default MyProfile
