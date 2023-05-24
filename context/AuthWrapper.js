import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

function AuthWrapper({ Component, pageProps }) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if the access token exists in the user's session or storage
    const accessToken = localStorage.getItem('accessToken')

    const isRegisterPage = router.pathname === '/register'
    const isLoginPage = router.pathname === '/login'

    if (accessToken || isRegisterPage || isLoginPage) {
      setIsLoggedIn(true)
    } else {
      // Redirect the user to the login page if the access token doesn't exist
      router.push('/login')
    }
  }, [])

  // Render the page if the user is logged in
  return isLoggedIn ? <Component {...pageProps} /> : null
}

export default AuthWrapper