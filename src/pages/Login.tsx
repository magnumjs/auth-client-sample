import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { storeToken } from '../utils/auth'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token = params.get('token')
    const refreshToken = params.get('refreshToken')
    if (token) {
      storeToken(token, refreshToken || undefined)
      navigate('/')
    } else {
      window.location.href = `${import.meta.env.VITE_AUTH_SERVER_URL}/login?returnUrl=${window.location.origin}/login/callback`
    }
  }, [location, navigate])

  return <div>Logging in...</div>
}

export default Login
