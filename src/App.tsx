import * as React from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Routes, Route, Link, useLocation, useNavigate, Navigate } from "react-router-dom"
import { Button } from "./components/ui/button"
import Home from "./components/Home"
import Marketplace from "./components/Marketplace"
import DashboardPage from './components/DashboardPage';
import PlannerPage from './components/PlannerPage';
import GroupsPage from "./components/GroupsPage"
import ChatPage from "./components/ChatPage"
import ProfilePage from "./components/ProfilePage"
import SignInPage from "./components/SignInPage"
import AboutPage from "./components/AboutPage"
import ContactPage from "./components/ContactPage"
import Sidebar from "./components/Sidebar"
import SettingsPage from "./components/SettingsPage"
import AlertsPage from "./components/AlertsPage"
import MapIntelligencePage from "./components/MapIntelligencePage"
import MissionLab from "./components/MissionLab"
import InventoryCenter from "./components/InventoryCenter"
import ResourcesPage from "./components/ResourcesPage"
import ContributionsPage from "./components/ContributionsPage"
import AchievementsPage from "./components/AchievementsPage"
import ImpactScorePage from "./components/ImpactScorePage"
import TeamMissionsPage from "./components/TeamMissionsPage"
import AssignmentsPage from "./components/AssignmentsPage"
import AIChatPage from "./components/AIChatPage"
import GenericMissionPage from "./components/GenericMissionPage"
import ActivityLogPage from "./components/ActivityLogPage"
import FeaturesPage from "./components/FeaturesPage"
import LoadingScreen from "./components/LoadingScreen"
import PricingPage from "./components/PricingPage"
import ChangelogPage from "./components/ChangelogPage"
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
  Settings01Icon,
  Menu01Icon as Menu,
  Cancel01Icon as Close,
  Search01Icon as Search,
  ArrowRight01Icon as ArrowRight
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
    { icon: ShoppingBasket01Icon, path: "/marketplace", label: "CENTER" },
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

function InfiniteWheel({ navItems, location, onSelect }: { navItems: any[], location: any, onSelect: () => void }) {
  const y = useMotionValue(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const velocityRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);
  
  const itemHeight = 110; 
  const totalItemsHeight = navItems.length * itemHeight;

  // Wrap y infinitely
  React.useEffect(() => {
    return y.onChange((latest) => {
      if (latest > 0) y.set(latest - totalItemsHeight);
      else if (latest < -totalItemsHeight) y.set(latest + totalItemsHeight);
    });
  }, [totalItemsHeight, y]);

  // Inertia loop — runs while there is velocity
  const startInertia = React.useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const loop = () => {
      velocityRef.current *= 0.88; // friction — lower = stops faster
      if (Math.abs(velocityRef.current) < 0.1) {
        velocityRef.current = 0;
        return;
      }
      y.set(y.get() + velocityRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }, [y]);

  // Wheel → add to velocity, let inertia carry it
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      velocityRef.current -= e.deltaY * 0.18;
      startInertia();
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startInertia]);

  const displayItems = [...navItems, ...navItems, ...navItems];

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden">
      <motion.div
        drag="y"
        dragConstraints={{ top: -Infinity, bottom: Infinity }}
        dragElastic={0}
        dragMomentum={false}
        style={{ y }}
        onDrag={(_, info) => {
          velocityRef.current = info.delta.y * 2;
        }}
        onDragEnd={() => startInertia()}
        className="flex flex-col items-stretch w-full cursor-grab active:cursor-grabbing select-none"
      >
        {displayItems.map((item, i) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.div
              key={`${item.name}-${i}`}
              style={{ height: itemHeight }}
              className="flex flex-col justify-center border-b border-white/10 mx-8"
            >
              <Link
                to={item.path}
                onClick={onSelect}
                className={cn(
                  "flex items-center justify-between text-5xl md:text-8xl font-black tracking-tighter uppercase transition-all duration-500 py-4 group/item",
                  isActive ? "text-orange-500" : "text-white/10 hover:[text-shadow:0_0_1px_white] hover:text-transparent hover:[-webkit-text-stroke:1.5px_white]"
                )}
              >
                <span className="transition-transform duration-500 will-change-transform group-hover/item:translate-x-8">{item.name}</span>
                {isActive && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                    <ArrowRight size={32} strokeWidth={2} className="text-orange-500" />
                  </motion.div>
                )}
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

function Navbar({ isAuthenticated, onLogout }: { isAuthenticated: boolean, onLogout: () => void }) {
  const location = useLocation();
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isAppPage = location.pathname !== "/" && location.pathname !== "/about" && location.pathname !== "/contact" && location.pathname !== "/signin" && location.pathname !== "/features" && location.pathname !== "/resources" && location.pathname !== "/pricing";

  if (isAppPage) return null;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Resources", path: "/resources" },
    { name: "About Us", path: "/about" },
    { name: "Pricing", path: "/pricing" },
    { name: "Changelog", path: "/changelog" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <>

      {/* Header Bar — all screen sizes */}
      <div className={cn(
        "fixed top-0 left-0 w-full z-[120] h-20 flex items-center justify-between px-6 md:px-10 transition-all duration-500",
        isMobileMenuOpen ? "bg-zinc-950" : "bg-background/80 backdrop-blur-2xl border-b border-border/10"
      )}>
        <Link to="/" className="flex items-center gap-2.5 z-[130]" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="h-8 w-8">
            <img src={isMobileMenuOpen || theme === 'dark' ? "/logo-white.png" : "/logo-black.png"} alt="ImpactQuest" className="h-full w-full object-contain" />
          </div>
          <span className={cn(
            "font-black text-xl tracking-tighter",
            isMobileMenuOpen ? "text-white" : "text-foreground"
          )}>ImpactQ</span>
        </Link>

        <div className="flex items-center gap-3 z-[130]">
          {!isMobileMenuOpen && (
            <>
              <AnimatedThemeToggler />
              {isAuthenticated && (
                <Link to="/dashboard" className="hidden sm:flex text-[11px] font-bold uppercase tracking-widest bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-all">
                  Dashboard
                </Link>
              )}
            </>
          )}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "h-11 w-11 flex items-center justify-center rounded-full transition-all duration-300",
              isMobileMenuOpen ? "text-white" : "text-foreground hover:bg-secondary"
            )}
          >
            {isMobileMenuOpen ? <Close size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Full-Screen Menu — all screen sizes */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col overflow-hidden text-white pt-20"
          >
            {/* Infinite Wheel List with List Item UI */}
            <div className="flex-1 relative overflow-hidden flex flex-col justify-start mt-4">
               {/* Edge Masks */}
               <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-zinc-950 to-transparent z-20 pointer-events-none" />
               <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-zinc-950 to-transparent z-20 pointer-events-none" />

               <div className="h-full">
                  <InfiniteWheel navItems={navItems} location={location} onSelect={() => setIsMobileMenuOpen(false)} />
               </div>
            </div>

            {/* Menu Footer Redesign - Image Inspired */}
            <div className="mt-auto relative z-10 border-t border-white/10">
               {/* Info Strip */}
               <div className="px-8 py-4 flex items-center justify-between text-white/20 text-[9px] font-black uppercase tracking-[0.4em] border-b border-white/5">
                  <span>2026</span>
                  <div className="flex gap-6">
                     <span className="cursor-pointer hover:text-white transition-colors">Privacy</span>
                     <span className="cursor-pointer hover:text-white transition-colors">Terms</span>
                  </div>
               </div>

               {/* Auth Bar */}
               <div className="border-t border-white/10 grid grid-cols-2 h-20 bg-zinc-950">
                  <Link 
                     to="/signin" 
                     onClick={() => setIsMobileMenuOpen(false)}
                     className="flex items-center justify-center border-r border-white/10 text-xl font-medium tracking-tighter uppercase hover:bg-white/5 transition-colors"
                  >
                     Log In
                  </Link>
                  <Link 
                     to="/signin" 
                     onClick={() => setIsMobileMenuOpen(false)}
                     className="flex items-center justify-center text-xl font-medium tracking-tighter uppercase hover:bg-white/5 transition-colors"
                  >
                     Sign Up
                  </Link>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

import OnboardingPage from "./components/OnboardingPage"

function App({ isAuthenticated, handleLogin, handleLogout }: { isAuthenticated: boolean, handleLogin: (user?: any) => void, handleLogout: () => void }) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  const isOnboardingRequired = React.useMemo(() => {
    if (!isAuthenticated || !user || Object.keys(user).length === 0) return false;
    return user.role === 'volunteer' && !user.isOnboarded;
  }, [user, isAuthenticated]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      <ScrollToTop />
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      
      <main>
        <Routes>
          <Route path="/" element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <Navigate to="/dashboard" />) : <Home />} />
          <Route path="/onboarding" element={isAuthenticated ? <OnboardingPage /> : <Navigate to="/signin" />} />
          <Route path="/about" element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <Navigate to="/dashboard" />) : <AboutPage />} />
          <Route path="/contact" element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <Navigate to="/dashboard" />) : <ContactPage />} />
          <Route path="/signin" element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <Navigate to="/dashboard" />) : <SignInPage onLogin={handleLogin} />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          
          {/* Main App Routes with Completion Check */}
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
            path="/quests" 
            element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <AppLayout onLogout={handleLogout}><Marketplace /></AppLayout>) : <Navigate to="/signin" />} 
          />
          <Route 
            path="/groups" 
            element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <AppLayout onLogout={handleLogout}><GroupsPage /></AppLayout>) : <Navigate to="/signin" />} 
          />
          <Route 
            path="/chat" 
            element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <AppLayout onLogout={handleLogout}><ChatPage /></AppLayout>) : <Navigate to="/signin" />} 
          />
          <Route 
            path="/chatbot" 
            element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <AppLayout onLogout={handleLogout}><ChatPage /></AppLayout>) : <Navigate to="/signin" />} 
          />
           <Route 
            path="/activity" 
            element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <AppLayout onLogout={handleLogout}><ActivityLogPage /></AppLayout>) : <Navigate to="/signin" />} 
          />
          <Route 
            path="/contributions" 
            element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <AppLayout onLogout={handleLogout}><ContributionsPage /></AppLayout>) : <Navigate to="/signin" />} 
          />
          <Route 
            path="/achievements" 
            element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <AppLayout onLogout={handleLogout}><AchievementsPage /></AppLayout>) : <Navigate to="/signin" />} 
          />
          <Route 
            path="/impact-score" 
            element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <AppLayout onLogout={handleLogout}><ImpactScorePage /></AppLayout>) : <Navigate to="/signin" />} 
          />
          <Route 
            path="/team-missions" 
            element={isAuthenticated ? (isOnboardingRequired ? <Navigate to="/onboarding" replace /> : <AppLayout onLogout={handleLogout}><TeamMissionsPage /></AppLayout>) : <Navigate to="/signin" />} 
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

  React.useEffect(() => {
    const onUnauthorized = () => {
      handleLogout();
    };
    window.addEventListener('auth:unauthorized', onUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', onUnauthorized);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppWrapper isAuthenticated={isAuthenticated} handleLogin={handleLogin} handleLogout={handleLogout} />
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default Root
