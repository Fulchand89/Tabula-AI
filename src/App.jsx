import { useState, useEffect } from 'react'
import LandingPage from './pages/website/LandingPage'
import SignupPage from './pages/website/SignupPage'
import TrialCheckoutPage from './pages/website/TrialCheckoutPage'
import AppShell from './pages/website/AppShell'

// Helper to normalize path and match AppShell navigation keys
export const pathToNavKey = (pathname) => {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean === '/dashboard' || clean === '/home' || clean === '/app') return 'home';
  if (clean === '/students') return 'students';
  if (clean === '/student-detail' || clean === '/students/detail' || clean.startsWith('/students/')) return 'student-detail';
  if (clean === '/planner') return 'planner';
  if (clean === '/planner-complete' || clean === '/planner/complete') return 'planner-complete';
  if (clean === '/planner-week2' || clean === '/planner/week-2' || clean === '/week-2') return 'planner-week2';
  if (clean === '/planner-family' || clean === '/planner/family-units' || clean === '/family-units') return 'planner-family';
  if (clean === '/planner-schedule' || clean === '/planner/schedule') return 'planner-schedule';
  if (clean === '/planner-blank') return 'planner-blank';
  if (clean === '/lesson-detail' || clean === '/planner/lesson-detail' || clean === '/lesson') return 'lesson-detail';
  if (clean === '/coach') return 'coach';
  if (clean === '/resources' || clean === '/resource-library') return 'resources';
  if (clean === '/account' || clean === '/membership') return 'account';
  if (clean === '/privacy' || clean === '/privacy-settings') return 'privacy';
  return null;
};

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [signupUserName, setSignupUserName] = useState('shiva')
  const [selectedPlan, setSelectedPlan] = useState('annual')

  useEffect(() => {
    // If user lands on /checkout or /trial-checkout, automatically redirect to /payment
    if (window.location.pathname === '/checkout' || window.location.pathname.startsWith('/checkout') || window.location.pathname === '/trial-checkout') {
      window.history.replaceState({ idx: 0, path: '/payment' }, '', '/payment');
      setCurrentPath('/payment');
    } else if (!window.history.state || window.history.state.idx === undefined) {
      // Initialize history state if needed
      window.history.replaceState({ idx: 0, path: window.location.pathname }, '', window.location.pathname);
    }

    const handleLocationChange = () => {
      const current = window.location.pathname;
      if (current === '/checkout' || current.startsWith('/checkout') || current === '/trial-checkout') {
        window.history.replaceState({ ...(window.history.state || {}), path: '/payment' }, '', '/payment');
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        setCurrentPath('/payment');
        return;
      }
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
    const targetPath = (path === '/checkout' || path.startsWith('/checkout') || path === '/trial-checkout') ? '/payment' : path;
    const currentIdx = window.history.state?.idx ?? 0;
    window.history.pushState({ idx: currentIdx + 1, path: targetPath }, '', targetPath);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setCurrentPath(targetPath);
  };

  const handleBack = (fallbackPath = '/dashboard') => {
    if (window.history.state && window.history.state.idx > 0) {
      window.history.back();
    } else {
      navigateTo(fallbackPath);
    }
  };

  const cleanPath = currentPath.replace(/\/+$/, '') || '/';

  // 1. If path is /payment or /checkout, render Tabula Trial Checkout / Payment Page
  if (
    cleanPath === '/payment' ||
    cleanPath.startsWith('/payment') ||
    cleanPath === '/checkout' ||
    cleanPath.startsWith('/checkout') ||
    cleanPath === '/trial-checkout'
  ) {
    return (
      <TrialCheckoutPage
        userName={signupUserName}
        initialPlan={selectedPlan}
        onBack={() => handleBack('/signup')}
        onCompleteTrial={() => navigateTo('/dashboard')}
      />
    )
  }

  // 2. If path is /signup, render Tabula Signup Page
  if (cleanPath === '/signup' || cleanPath.startsWith('/signup') || cleanPath === '/create-account') {
    return (
      <SignupPage
        onBackToLanding={() => handleBack('/')}
        onProceedToCheckout={(name) => {
          if (name) setSignupUserName(name);
          navigateTo('/payment');
        }}
      />
    )
  }

  // 3. If path matches any AppShell homeschool view (Dashboard, Students, Planner, Coach, Resources, Account, Privacy, etc.)
  const shellNavKey = pathToNavKey(cleanPath);
  if (shellNavKey) {
    return (
      <AppShell
        activeRoute={shellNavKey}
        currentPath={cleanPath}
        onNavigate={navigateTo}
        onBack={handleBack}
        onNavigateToLanding={() => navigateTo('/')}
      />
    )
  }

  // 4. Default: root path '/' and '/landing' render the Landing Page
  return (
    <LandingPage
      onGoToApp={() => navigateTo('/dashboard')}
      onSelectPlan={setSelectedPlan}
      onNavigateToSignup={(plan) => {
        if (plan) setSelectedPlan(plan);
        navigateTo('/signup');
      }}
    />
  )
}

export default App
