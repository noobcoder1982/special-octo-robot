import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowLeft01Icon as ChevronLeft,
  AppleIcon as Apple,
  GlobeIcon as Globe,
  Loading02Icon as LoadingSpinner
} from "hugeicons-react"
import { Button } from "./ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useTheme } from "../contexts/ThemeContext"
import { cn } from "@/lib/utils"

import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "../lib/firebase"
import { apiRequest } from "../lib/api"

export default function SignInPage({ onLogin }: { onLogin: (user?: any) => void }) {
  const [isLogin, setIsLogin] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [resetSent, setResetSent] = React.useState(false);
  const [role, setRole] = React.useState<'volunteer' | 'ngo' | 'customer'>('volunteer');
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    organizationName: '',
  });
  const navigate = useNavigate();

  const syncWithBackend = async (token: string, additionalData?: any) => {
    const response = await apiRequest('/auth/firebase-login', {
      method: 'POST',
      body: JSON.stringify({ token, role, ...additionalData }),
    });

    if (response.success) {
      localStorage.setItem('accessToken', response.data.accessToken);
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onLogin(response.data.user);
    } else {
      throw new Error(response.message || 'Failed to sync with backend');
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      await syncWithBackend(token);
    } catch (err: any) {
      setError(err.message || 'Google Authentication failed');
      setIsLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      }
      
      const token = await userCredential.user.getIdToken();
      
      const additionalData = !isLogin ? { 
        name: formData.name, 
        organizationName: role === 'ngo' ? (formData.organizationName || formData.name) : undefined 
      } : {};

      await syncWithBackend(token, additionalData);
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError('Please enter your email address first to reset your password.');
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      setResetSent(false);
      await sendPasswordResetEmail(auth, formData.email);
      setResetSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email. Ensure your email is correct.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    const mockUser = {
      _id: 'guest123',
      name: 'Guest Volunteer',
      email: 'guest@impactquest.org',
      role: 'VOLUNTEER',
      skills: ['General Support'],
      location: 'Global',
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('accessToken', 'guest-token-123');
    onLogin(mockUser);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F8FAFC] dark:bg-background font-sans selection:bg-indigo-600/10 overflow-hidden relative">
      
      {/* Left Panel: Minimal Form */}
      <div className="flex-1 flex flex-col pt-32 lg:pt-0 lg:justify-center px-8 md:px-24 lg:px-32 xl:px-40 bg-white dark:bg-card relative z-10 shadow-[20px_0_40px_rgba(0,0,0,0.03)] dark:shadow-none transition-colors duration-500">
         
         {/* Mobile Header */}
         <div className="lg:hidden absolute top-8 left-8 right-8 flex justify-between items-center">
            <Link to="/" className="text-xl font-black tracking-tight text-foreground">IQ.</Link>
            <Link to="/"><ChevronLeft className="h-6 w-6 text-muted-foreground" /></Link>
         </div>

         <Link to="/" className="hidden lg:flex absolute top-12 left-12 text-2xl font-black tracking-tighter text-foreground hover:text-indigo-600 transition-colors">
            ImpactQuest.
         </Link>

         <AnimatePresence mode="wait">
            <motion.div 
              key={isLogin ? 'login-form' : 'signup-form'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="max-w-[420px] w-full mx-auto space-y-10"
            >
               {/* Header */}
               <div className="space-y-3">
                  <h2 className="text-4xl font-bold tracking-tight text-foreground">
                    {isLogin ? 'Welcome back' : 'Create an account'}
                  </h2>
                  <p className="text-muted-foreground text-[15px]">
                     {isLogin 
                        ? "Enter your details to access your dashboard."
                        : "Sign up and join the global volunteer network."
                     }
                  </p>
               </div>

            {/* Form */}
            <form onSubmit={handleAuth} className="space-y-5">
               <AnimatePresence mode="popLayout">
                  {!isLogin && (
                     <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-5 overflow-hidden"
                     >
                        <div className="flex gap-2 p-1 bg-secondary/50 rounded-2xl border border-border/40">
                           <button
                              type="button"
                              onClick={() => setRole('volunteer')}
                              className={cn(
                                 "flex-1 py-2.5 rounded-xl text-[10px] font-bold transition-all",
                                 role === 'volunteer' ? "bg-white dark:bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                              )}
                           >
                              Volunteer
                           </button>
                           <button
                              type="button"
                              onClick={() => setRole('ngo')}
                              className={cn(
                                 "flex-1 py-2.5 rounded-xl text-[10px] font-bold transition-all",
                                 role === 'ngo' ? "bg-white dark:bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                              )}
                           >
                              NGO
                           </button>
                           <button
                              type="button"
                              onClick={() => setRole('customer')}
                              className={cn(
                                 "flex-1 py-2.5 rounded-xl text-[10px] font-bold transition-all",
                                 role === 'customer' ? "bg-white dark:bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                              )}
                           >
                              Customer
                           </button>
                        </div>

                        <div className="space-y-4">
                           <div className="space-y-2">
                              <label className="text-sm font-medium text-foreground">
                                 {role === 'volunteer' ? 'Full name' : 'Contact name'}
                              </label>
                              <input 
                                 required
                                 name="name"
                                 type="text" 
                                 value={formData.name}
                                 onChange={handleInputChange}
                                 placeholder={role === 'volunteer' ? "Amélie Laurent" : "Jane Doe"}
                                 className="w-full h-14 bg-transparent rounded-2xl px-5 text-[15px] outline-none border border-border focus:border-indigo-600 transition-all placeholder:text-muted-foreground/50"
                              />
                           </div>

                           {role === 'ngo' && (
                              <div className="space-y-2">
                                 <label className="text-sm font-medium text-foreground">Organization name</label>
                                 <input 
                                    required
                                    name="organizationName"
                                    type="text" 
                                    value={formData.organizationName}
                                    onChange={handleInputChange}
                                    placeholder="Global Aid Network"
                                    className="w-full h-14 bg-transparent rounded-2xl px-5 text-[15px] outline-none border border-border focus:border-indigo-600 transition-all placeholder:text-muted-foreground/50"
                                 />
                              </div>
                           )}
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>

               <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <input 
                     required
                     name="email"
                     type="email" 
                     value={formData.email}
                     onChange={handleInputChange}
                     placeholder="amelie@example.com"
                     className="w-full h-14 bg-transparent rounded-2xl px-5 text-[15px] outline-none border border-border focus:border-indigo-600 transition-all placeholder:text-muted-foreground/50"
                  />
               </div>

               <div className="space-y-2">
                  <div className="flex justify-between items-center">
                     <label className="text-sm font-medium text-foreground">Password</label>
                     {isLogin && <button type="button" onClick={handleForgotPassword} className="text-xs font-medium text-indigo-600 hover:underline">Forgot password?</button>}
                  </div>
                  <input 
                     required={!resetSent}
                     name="password"
                     type="password" 
                     value={formData.password}
                     onChange={handleInputChange}
                     placeholder="••••••••"
                     className="w-full h-14 bg-transparent rounded-2xl px-5 text-[15px] outline-none border border-border focus:border-indigo-600 transition-all placeholder:text-muted-foreground/50"
                  />
               </div>

               {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl text-sm font-medium text-red-600 dark:text-red-400">
                     {error}
                  </div>
               )}

               {resetSent && (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl text-sm font-medium text-emerald-600 dark:text-emerald-400">
                     Password reset email sent! Check your inbox.
                  </div>
               )}

               <Button 
                  disabled={isLoading}
                  className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-[15px] font-bold transition-all mt-4"
               >
                  {isLoading ? <LoadingSpinner className="h-5 w-5 animate-spin" /> : (isLogin ? 'Log In' : 'Create Account')}
               </Button>
            </form>

            <div className="relative flex items-center py-2">
               <div className="flex-1 border-t border-border"></div>
               <span className="px-4 text-xs font-medium text-muted-foreground">Or continue with</span>
               <div className="flex-1 border-t border-border"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <button 
                  type="button"
                  onClick={handleGoogleAuth}
                  className="h-14 rounded-2xl border border-border bg-transparent hover:bg-secondary/50 flex items-center justify-center gap-3 transition-all font-medium text-[14px]"
               >
                  <svg viewBox="0 0 48 48" className="h-5 w-5">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    <path fill="none" d="M0 0h48v48H0z"/>
                  </svg>
                  Google
               </button>
               <button 
                  type="button"
                  onClick={handleGuestLogin}
                  className="h-14 rounded-2xl border border-border bg-transparent hover:bg-secondary/50 flex items-center justify-center gap-3 transition-all font-medium text-[14px]"
               >
                  <Globe className="h-5 w-5 text-foreground" /> Guest
               </button>
            </div>

            <div className="text-center pt-2">
               <span className="text-[14px] text-muted-foreground">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
               </span>
               <button 
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[14px] font-bold text-indigo-600 hover:underline"
               >
                  {isLogin ? "Register Now" : "Log In"}
               </button>
            </div>
         </motion.div>
         </AnimatePresence>
      </div>

      {/* Right Panel: Premium Visual Experience */}
      <div className="hidden lg:flex w-[55%] relative overflow-hidden bg-[#0A0A0B]">
         
         {/* Animated Mesh Gradients */}
         <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-indigo-600/30 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-600/20 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
         </div>

         {/* Decorative Grid */}
         <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '32px 32px' }} />

         <div className="relative z-10 w-full flex items-center justify-center p-20">
            <div className="max-w-2xl w-full space-y-12">
               
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8 }}
                 className="space-y-6"
               >
                  <h1 className="text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.05]">
                     Orchestrate <br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 italic">global impact.</span>
                  </h1>
                  <p className="text-indigo-100/60 text-xl font-medium max-w-lg leading-relaxed">
                     Empowering NGOs and volunteers with real-time intelligence to solve humanity's most pressing challenges.
                  </p>
               </motion.div>

               {/* Dynamic Mockup Visual */}
               <div className="relative pt-12">
                  {/* Main Dashboard Card */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="w-full aspect-[16/10] bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden p-8"
                  >
                     <div className="flex items-center justify-between mb-8">
                        <div className="flex gap-2">
                           <div className="h-3 w-3 rounded-full bg-red-500/50" />
                           <div className="h-3 w-3 rounded-full bg-amber-500/50" />
                           <div className="h-3 w-3 rounded-full bg-emerald-500/50" />
                        </div>
                        <div className="h-8 px-4 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                           <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Live Grid Active</span>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                           <div className="h-32 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 p-6 flex flex-col justify-between">
                              <div className="h-2 w-12 bg-indigo-400/40 rounded-full" />
                              <div className="space-y-2">
                                 <div className="h-4 w-full bg-white/10 rounded-full" />
                                 <div className="h-4 w-2/3 bg-white/5 rounded-full" />
                              </div>
                           </div>
                           <div className="h-24 rounded-3xl bg-white/5 border border-white/10 p-6" />
                        </div>
                        <div className="space-y-4">
                           <div className="h-24 rounded-3xl bg-white/5 border border-white/10 p-6" />
                           <div className="h-32 rounded-3xl bg-purple-500/10 border border-purple-500/20 p-6 flex flex-col justify-between">
                              <div className="h-2 w-16 bg-purple-400/40 rounded-full" />
                              <div className="h-8 w-8 rounded-full bg-white/10" />
                           </div>
                        </div>
                     </div>
                  </motion.div>

                  {/* Floating Elements */}
                  <motion.div 
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 -right-10 w-48 p-4 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl"
                  >
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-bold">AI</div>
                        <div className="space-y-1">
                           <div className="h-2 w-16 bg-white/40 rounded-full" />
                           <div className="h-2 w-10 bg-white/20 rounded-full" />
                        </div>
                     </div>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-6 -left-10 w-56 p-5 rounded-3xl bg-indigo-600 shadow-2xl shadow-indigo-600/40"
                  >
                     <div className="space-y-3">
                        <div className="h-1.5 w-12 bg-white/30 rounded-full" />
                        <div className="text-xs font-bold text-white uppercase tracking-widest">Mission Deployed</div>
                        <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                           <motion.div 
                             animate={{ x: [-100, 200] }}
                             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                             className="h-full w-1/3 bg-white/60"
                           />
                        </div>
                     </div>
                  </motion.div>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
