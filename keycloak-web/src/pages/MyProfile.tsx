import React, { useEffect, useState } from 'react'
import { useKeycloak } from '../context/KeycloakContext'

const MyProfile: React.FC = () => {
  const { keycloak } = useKeycloak()
  const [items, setItems] = useState<any[]>([]) // Update the type accordingly

  useEffect(() => {
    // Fetch items associated with the user from your API
    const fetchItems = async () => {
      try {
        // Use keycloak.token for authentication if needed
        const response = await fetch('your_api_endpoint')
        const data = await response.json()
        setItems(data)
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    }

    fetchItems()
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
