import { useState, useEffect } from 'react'
import LandingPage from './pages/website/LandingPage'
import SignupPage from './pages/website/SignupPage'
import TrialCheckoutPage from './pages/website/TrialCheckoutPage'
import AppShell from './pages/website/AppShell'

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [signupUserName, setSignupUserName] = useState('shiva')
  const [selectedPlan, setSelectedPlan] = useState('annual')

  useEffect(() => {
    const handleLocationChange = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentPath]);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setCurrentPath(path);
  };

  // If path is /checkout, render Tabula Trial Checkout Page
  if (currentPath === '/checkout' || currentPath.startsWith('/checkout') || currentPath === '/trial-checkout') {
    return (
      <TrialCheckoutPage 
        userName={signupUserName}
        initialPlan={selectedPlan}
        onBack={() => navigateTo('/signup')}
        onCompleteTrial={() => navigateTo('/dashboard')}
      />
    )
  }

  // If path is /signup, render Tabula Signup Page
  if (currentPath === '/signup' || currentPath.startsWith('/signup') || currentPath === '/create-account') {
    return (
      <SignupPage 
        onBackToLanding={() => navigateTo('/')}
        onProceedToCheckout={(name) => {
          if (name) setSignupUserName(name);
          navigateTo('/checkout');
        }}
      />
    )
  }

  // If path is /dashboard or /app, render the full Homeschool App Shell (Dashboard, Students, Planner, etc.)
  if (
    currentPath === '/dashboard' || 
    currentPath.startsWith('/dashboard') || 
    currentPath === '/app' || 
    currentPath.startsWith('/app')
  ) {
    return <AppShell onNavigateToLanding={() => navigateTo('/')} />
  }

  // Default: root path '/' and '/landing' render the Landing Page
  return (
    <LandingPage 
      onGoToApp={() => navigateTo('/dashboard')} 
      onSelectPlan={setSelectedPlan} 
    />
  )
}

export default App
