import { useState, useEffect } from 'react'
import LandingPage from './pages/website/LandingPage'
import SignupPage from './pages/website/SignupPage'
import TrialCheckoutPage from './pages/website/TrialCheckoutPage'
import AppShell from './pages/website/AppShell'

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [signupUserName, setSignupUserName] = useState('shiva')

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }
    window.addEventListener('popstate', handleLocationChange)
    return () => window.removeEventListener('popstate', handleLocationChange)
  }, [])

  const navigateTo = (path) => {
    window.history.pushState({}, '', path)
    setCurrentPath(path)
  }

  // If path is /checkout, render Tabula Trial Checkout Page matching screenshot
  if (currentPath === '/checkout' || currentPath.startsWith('/checkout') || currentPath === '/trial-checkout') {
    return (
      <TrialCheckoutPage 
        userName={signupUserName}
        onBack={() => navigateTo('/signup')}
        onCompleteTrial={() => navigateTo('/')}
      />
    )
  }

  // If path is /signup, render Tabula Signup Page matching screenshot
  if (currentPath === '/signup' || currentPath.startsWith('/signup') || currentPath === '/create-account') {
    return (
      <SignupPage 
        onBackToLanding={() => navigateTo('/landing')}
        onProceedToCheckout={(name) => {
          if (name) setSignupUserName(name);
          navigateTo('/checkout');
        }}
      />
    )
  }

  // If path is /landing, render Tabula Landing Page
  if (currentPath === '/landing' || currentPath.startsWith('/landing')) {
    return <LandingPage onGoToApp={() => navigateTo('/')} />
  }

  // Otherwise render the full Homeschool App Shell (Dashboard, Students, Add Curriculum modal)
  return <AppShell onNavigateToLanding={() => navigateTo('/landing')} />
}

export default App
