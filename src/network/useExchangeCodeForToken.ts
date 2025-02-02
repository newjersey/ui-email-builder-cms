import { useEffect, useState } from 'react'
import { useAuth } from 'src/utils/AuthContext'
import { currentUrlSearchParamsFor } from 'src/utils/currentUrlSearchParamsFor'
import { signInWithCode } from './auth'
import { navigate } from 'gatsby'

export const useExchangeCodeForToken = () => {
  const code: string | null = currentUrlSearchParamsFor('code')
  const [loading, setLoading] = useState(!!code)
  const [auth, setAuth] = useAuth()
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchToken = async () => {
      if (!code) return
      const result = await signInWithCode({ code })

      switch (result.kind) {
        case 'SUCCESS':
          setAuth({
            idToken: result.AuthenticationResult.IdToken,
            refreshToken: result.AuthenticationResult.RefreshToken,
          })
          navigate(window.location.pathname, { replace: true })
          break
        case 'NOT_AUTHORIZED':
          setErrorMessage(result.error.message)
          break
        default:
          // something has gone terribly wrong
          setErrorMessage('An unknown error occurred')
      }
      setLoading(false)
    }

    if (code && !auth) {
      setLoading(true)
      fetchToken()
    } else if (code && auth) {
      navigate(window.location.pathname, { replace: true })
    } else {
      setLoading(false)
    }
  }, [code, auth])

  return {
    loading,
    errorMessage,
  }
}
