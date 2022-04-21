import { useRouter } from 'next/router'
import axiosClient from '../services/axiosClient'
import { useState, useEffect } from 'react'
export const useAuth = ({ loginUrl } = {}) => {
  const router = useRouter()

  const [user, setUser] = useState(null)
  const [isLoged, setIsLoged] = useState(false)
  const login = async (email, password) => {
    let result = {}

    try {
      let resp = await axiosClient.post('/api/auth/login', {
        email,
        password,
      })
      result.error = false
      const token = resp?.data?.access_token
      setIsLoged(true)
      localStorage.setItem('token', token)
      result.token = token
      return result
    } catch (error) {
      result.error = true
      if (error.response.status == 401) {
        result.msg = 'Incorrect login or password'
      } else {
        result.msg = error.message
      }
      return result
    }
  }

  function getToken() {
    return localStorage.getItem('token')
  }

  async function getUser() {
    let resp = await axiosClient.get('/api/auth/me')
    return resp.data
  }

  useEffect(() => {
    ;(async () => {
      let token = getToken()
      if (!token) {
        setIsLoged(false)
        let pathName = router.pathname.replace(/^\//, '')
        if (pathName != loginUrl) {
          router.push(loginUrl)
        }
      } else {
        setIsLoged(true)
        let u = await getUser()
        setUser(u)
      }
    })()
  }, [loginUrl, router])

  return {
    isLoged,
    user,
    login,
  }
}
