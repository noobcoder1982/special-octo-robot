import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from "react-router-dom"
import { Button } from "./components/ui/button"
import Home from "./components/Home"
import Marketplace from "./components/Marketplace"
import DashboardPage from "./components/DashboardPage"
import AboutPage from "./components/AboutPage"
import ContactPage from "./components/ContactPage"
import MapIntelligencePage from "./components/MapIntelligencePage"
import PlannerPage from './components/PlannerPage';
import MissionLab from "./components/MissionLab"
import InventoryCenter from "./components/InventoryCenter"
import GroupsPage from "./components/GroupsPage"
import AIChatPage from "./components/AIChatPage"
import ChatPage from "./components/ChatPage"
import ProfilePage from "./components/ProfilePage"
import SignInPage from "./components/SignInPage"
import OnboardingPage from "./components/OnboardingPage"
import Sidebar from "./components/Sidebar"

import SettingsPage from "./components/SettingsPage"
import ResourcesPage from "./components/ResourcesPage"
import ContributionsPage from "./components/ContributionsPage"
import AchievementsPage from "./components/AchievementsPage"
import ImpactScorePage from "./components/ImpactScorePage"
import TeamMissionsPage from "./components/TeamMissionsPage"
import AssignmentsPage from "./components/AssignmentsPage"
import GenericMissionPage from "./components/GenericMissionPage"
import ActivityLogPage from "./components/ActivityLogPage"
import FeaturesPage from "./components/FeaturesPage"
import LoadingScreen from "./components/LoadingScreen"
const ThemeSwitchDemo = React.lazy(() => import("./components/ThemeSwitchDemo"))
const ProgressionShowcase = React.lazy(() => import("./components/ProgressionShowcase"))
import PricingPage from "./components/PricingPage"
import { AnimatedThemeToggler } from "./components/ui/animated-theme-toggler"
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext"
import { ThemeProvider, useTheme } from "./contexts/ThemeContext"
import { TerminationProvider, useTermination } from "./contexts/TerminationContext"
import { 
  FlashIcon as Zap, 
  Shield01Icon as Shield, 
  Target01Icon as Target, 
  Notification01Icon as Bell, 
  DocumentCodeIcon as FileText, 
  FavouriteIcon as Heart, 
  Logout01Icon as LogOut,
  DashboardCircleIcon,
  ShoppingBasket01Icon,
  UserIcon,
  Settings01Icon
} from "hugeicons-react"
import { cn } from "@/lib/utils"

function AppLayout({ children, onLogout }: { children: React.ReactNode, onLogout: () => void }) {
  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative pb-[88px] md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={useLocation().pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-1 flex flex-col min-w-0 overflow-hidden"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
      <MobileNav onLogout={onLogout} />
    </div>
  );
}

function MobileNav({ onLogout }: { onLogout: () => void }) {
  const location = useLocation();
  
  const mobileLinks = [
    { icon: DashboardCircleIcon, path: "/dashboard", label: "HUB" },
    { icon: ShoppingBasket01Icon, path: "/marketplace", label: "MISSIONS" },
    { icon: UserIcon, path: "/profile", label: "PROFILE" },
    { icon: Settings01Icon, path: "/settings", label: "SYSTEM" },
  ];

  return (
    <motion.div 
       initial={{ y: 100 }}
       animate={{ y: 0 }}
       className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none"
    >
       <div className="bg-card/80 backdrop-blur-3xl border border-border/40 rounded-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] flex justify-between items-center pointer-events-auto overflow-hidden divide-x divide-border/20 p-1">
          {mobileLinks.map(link => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link 
                key={link.path} 
                to={link.path}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center py-3 px-1 transition-all relative overflow-hidden",
                  isActive ? "text-indigo-600 bg-indigo-600/5 rounded-2xl" : "text-muted-foreground hover:text-foreground hover:bg-secondary/20"
                )}
              >
                 <link.icon size={isActive ? 22 : 20} className={cn("transition-all duration-300", isActive ? "mb-1 scale-110" : "scale-100 opacity-60")} />
                 <AnimatePresence>
                   {isActive && (
                      <motion.span 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-[9px] font-black tracking-widest leading-none mt-1"
                      >
                         {link.label}
                      </motion.span>
                   )}
                 </AnimatePresence>
                 {isActive && (
                    <motion.div layoutId="mobile-nav-indicator" className="absolute top-0 left-[20%] right-[20%] h-[2px] bg-indigo-600 rounded-b-full shadow-[0_0_10px_rgba(79,70,229,0.8)]" />
                 )}
              </Link>
            )
          })}
       </div>
    </motion.div>
  )
}

function Navbar({ isAuthenticated, onLogout }: { isAuthenticated: boolean, onLogout: () => void }) {
  const location = useLocation();
  const { theme } = useTheme();

  const isAppPage = location.pathname !== "/" && location.pathname !== "/about" && location.pathname !== "/contact" && location.pathname !== "/signin" && location.pathname !== "/features" && location.pathname !== "/resources" && location.pathname !== "/pricing";

  if (isAppPage) return null;

  return (
    <motion.nav 
      initial={false}
      animate={{ 
        y: location.pathname === "/signin" ? -150 : 0,
        opacity: location.pathname === "/signin" ? 0 : 1
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 flex justify-center py-6 pointer-events-none bg-transparent"
    >
      <div className="flex items-center justify-between px-3 md:px-4 py-2 bg-background/60 backdrop-blur-3xl border border-border/30 rounded-full shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] gap-4 lg:gap-8 mx-4 max-w-max pointer-events-auto">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center group">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 overflow-hidden transition-transform group-hover:scale-105">
                <img src={theme === 'dark' ? "/logo-white.png" : "/logo-black.png"} alt="ImpactQuest" className="h-full w-full object-contain" />
              </div>
              <span className="font-semibold text-base tracking-tight opacity-90 transition-opacity group-hover:opacity-100">ImpactQuest</span>
            </div>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-0.5">
          {[
            { name: "Home", path: "/" },
            { name: "Features", path: "/features" },
            { name: "Resources", path: "/resources" },
            { name: "About Us", path: "/about" },
            { name: "Pricing", path: "/pricing" },
            { name: "Contact", path: "/contact" }
          ].map((item) => (
            <Link 
              key={item.name}
              to={item.path} 
              className={`text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2.5 rounded-full transition-all duration-500 whitespace-nowrap relative group ${location.pathname === item.path ? 'text-background' : 'text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.03]'}`}
            >
              {location.pathname === item.path && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-foreground rounded-full -z-10 shadow-lg shadow-foreground/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right: CTA */}
        <div className="flex items-center">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link to="/dashboard" className="text-[11px] font-bold uppercase tracking-[0.15em] bg-foreground text-background px-5 py-2 rounded-full transition-all hover:bg-accent hover:shadow-lg hover:-translate-y-[1px]">Dashboard</Link>
              <button 
                onClick={onLogout} 
                className="p-2 hover:bg-secondary rounded-full transition-all group/logout ml-1"
                title="Logout"
              >
                <LogOut className="h-[18px] w-[18px] text-muted-foreground group-hover/logout:text-red-500 transition-colors" />
              </button>
            </div>
          ) : (
            <Link to="/signin" className="text-[11px] font-bold uppercase tracking-[0.2em] bg-foreground text-background px-6 py-2.5 rounded-full transition-all hover:bg-accent hover:shadow-[0_8px_20px_-6px_rgba(var(--accent),0.5)] active:scale-95">
              Get Started
            </Link>
          )}
          <div className="ml-2 border-l border-border/30 pl-2">
            <AnimatedThemeToggler />
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App({ isAuthenticated, handleLogin, handleLogout }: { isAuthenticated: boolean, handleLogin: (user?: any) => void, handleLogout: () => void }) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isOnboardingRequired = React.useMemo(() => {
    if (!user || Object.keys(user).length === 0) return false;
    if (user.role === 'volunteer') {
      return !user.skills || user.skills.length === 0;
    }
    if (user.role === 'ngo') {
      return !user.organizationName;
    }
    return false;
  }, [user]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      <ScrollToTop />
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      
      <main>
        <Routes>
          <Route path="/" element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <Navigate to="/dashboard" />) : <Home />} />
          <Route path="/about" element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <Navigate to="/dashboard" />) : <AboutPage />} />
          <Route path="/contact" element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <Navigate to="/dashboard" />) : <ContactPage />} />
          <Route path="/signin" element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <Navigate to="/dashboard" />) : <SignInPage onLogin={handleLogin} />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/onboarding" element={isAuthenticated ? <OnboardingPage /> : <Navigate to="/signin" />} />
          
          {/* Main App Routes */}
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <AppLayout onLogout={handleLogout}><DashboardPage /></AppLayout>) : <Navigate to="/signin" />} 
          />
          <Route 
            path="/planner" 
            element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <AppLayout onLogout={handleLogout}><PlannerPage /></AppLayout>) : <Navigate to="/signin" />} 
          />
          <Route 
            path="/mission-lab" 
            element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <AppLayout onLogout={handleLogout}><MissionLab /></AppLayout>) : <Navigate to="/signin" />} 
          />
          <Route 
            path="/ai-console" 
            element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <AppLayout onLogout={handleLogout}><AIChatPage /></AppLayout>) : <Navigate to="/signin" />} 
          />
          <Route 
            path="/map" 
            element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <AppLayout onLogout={handleLogout}><MapIntelligencePage /></AppLayout>) : <Navigate to="/signin" />} 
          />
          <Route 
            path="/inventory" 
            element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <AppLayout onLogout={handleLogout}><InventoryCenter /></AppLayout>) : <Navigate to="/signin" />} 
          />
          <Route 
            path="/marketplace" 
            element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <AppLayout onLogout={handleLogout}><Marketplace /></AppLayout>) : <Navigate to="/signin" />} 
          />
          <Route 
            path="/chat" 
            element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <AppLayout onLogout={handleLogout}><ChatPage /></AppLayout>) : <Navigate to="/signin" />} 
          />
          <Route 
            path="/activity" 
            element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <AppLayout onLogout={handleLogout}><ActivityLogPage /></AppLayout>) : <Navigate to="/signin" />} 
          />
          <Route 
            path="/impact-score" 
            element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <AppLayout onLogout={handleLogout}><ImpactScorePage /></AppLayout>) : <Navigate to="/signin" />} 
          />
          <Route 
            path="/assignments" 
            element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <AppLayout onLogout={handleLogout}><AssignmentsPage /></AppLayout>) : <Navigate to="/signin" />} 
          />
          <Route 
            path="/alerts" 
            element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <AppLayout onLogout={handleLogout}><AlertsPage /></AppLayout>) : <Navigate to="/signin" />} 
          />
          <Route 
            path="/settings" 
            element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <AppLayout onLogout={handleLogout}><SettingsPage /></AppLayout>) : <Navigate to="/signin" />} 
          />
          <Route 
            path="/profile" 
            element={isAuthenticated ? <AppLayout onLogout={handleLogout}><ProfilePage /></AppLayout> : <Navigate to="/signin" />} 
          />

          <Route 
            path="/theme-demo" 
            element={
              <React.Suspense fallback={<LoadingScreen onComplete={() => {}} />}>
                <ThemeSwitchDemo />
              </React.Suspense>
            } 
          />
          <Route 
            path="/progression" 
            element={
              <React.Suspense fallback={<LoadingScreen onComplete={() => {}} />}>
                <ProgressionShowcase />
              </React.Suspense>
            } 
          />
        </Routes>
      </main>
    </div>
  )
}

function AppWrapper({ isAuthenticated, handleLogin, handleLogout }: { isAuthenticated: boolean, handleLogin: (user?: any) => void, handleLogout: () => void }) {
  const [isLoading, setIsLoading] = React.useState(true)

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen"
        >
          <App isAuthenticated={isAuthenticated} handleLogin={handleLogin} handleLogout={handleLogout} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Root() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    return !!localStorage.getItem('accessToken')
  })

  const handleLogin = (user?: any) => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppWrapper isAuthenticated={isAuthenticated} handleLogin={handleLogin} handleLogout={handleLogout} />
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default Root
