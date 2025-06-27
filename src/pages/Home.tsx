import { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken, clearToken, tryRefreshToken } from '../utils/auth'

const Home = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      let token = getToken()
      if (!token) return

      try {
        const res = await axios.get(`${import.meta.env.VITE_AUTH_SERVER_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUser(res.data)
      } catch {
        const newToken = await tryRefreshToken()
        if (newToken) {
          const res = await axios.get(`${import.meta.env.VITE_AUTH_SERVER_URL}/me`, {
            headers: { Authorization: `Bearer ${newToken}` }
          })
          setUser(res.data)
        }
      }
    }

    fetchUser()
  }, [])

  if (!getToken()) {
    return <a href="/login/callback">Login</a>
  }

  return (
    <div>
      <h1>Welcome {user?.email || 'User'}</h1>
      <button onClick={clearToken}>Logout</button>
    </div>
  )
}

export default Home
