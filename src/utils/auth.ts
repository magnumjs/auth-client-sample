export const storeToken = (token: string, refreshToken?: string) => {
  localStorage.setItem('token', token)
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken)
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken')
}

export const clearToken = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  window.location.href = '/'
}

export const tryRefreshToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken()
  if (!refreshToken) return null

  try {
    const res = await fetch(`${import.meta.env.VITE_AUTH_SERVER_URL}/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })
    if (!res.ok) throw new Error('Refresh failed')
    const data = await res.json()
    storeToken(data.token, data.refreshToken)
    return data.token
  } catch {
    clearToken()
    return null
  }
}
