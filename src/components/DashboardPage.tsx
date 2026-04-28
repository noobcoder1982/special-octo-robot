import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Add01Icon as Plus,
  SentIcon as Send,
  HelpCircleIcon as HelpCircle,
  UserGroupIcon as Users,
  CheckmarkCircle01Icon as CheckCircle2,
  FlashIcon as Zap,
  DocumentCodeIcon as FileText,
  AnalyticsUpIcon as TrendingUp,
  ArrowUpRight01Icon as ArrowUpRight,
  More02Icon as MoreVertical,
  Activity01Icon as ActivityIcon,
  Notification01Icon as Bell,
  Time01Icon as Clock,
  Calendar01Icon as CalendarIcon,
  FilterIcon as Filter,
  More01Icon as MoreHorizontal,
  ArrowRight01Icon as ChevronRight,
  ArrowLeft01Icon as ChevronLeft,
  Tick01Icon as Check,
  Target01Icon as Target,
  Shield01Icon as Shield,
  FavouriteIcon as Heart,
  SparklesIcon as Sparkles,
  ArrowRight01Icon as ArrowRight,
  ShoppingBasket01Icon as ShoppingBag,
  DashboardCircleIcon as LayoutIcon,
  GridIcon,
  Layers01Icon as LayersIcon,
  Search01Icon as Search,
  Comment01Icon as MessageSquare,
  UserAdd01Icon as UserPlus,
  ArrowDown01Icon as ChevronDown,
  Maximize01Icon as Maximize2,
  Menu01Icon as List,
  CommandIcon,
  Settings01Icon as Settings,
  CpuIcon as Cpu
} from "hugeicons-react"
import { Button } from "./ui/button"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"
import { cn } from "@/lib/utils"
import { apiRequest } from "../lib/api"
import { useNavigate } from "react-router-dom"


type LayoutMode = 'overview' | 'focus' | 'grid' | 'activity' | 'compact'

const fadeInUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
}

const graphData = {
  Realtime: [10, 20, 15, 30, 25, 40, 35, 50, 45, 60, 55, 70, 65, 80, 75, 90, 85, 100, 95, 110, 105, 120, 115, 130],
  Periodic: [400, 600, 850, 450, 750, 550, 650],
  Quarterly: [1400, 2600, 3850, 2450, 3750, 2550, 3650, 4900, 2400, 4800, 3500, 4700],
  Annual: [24000, 48000, 35000, 47000, 55000, 62000]
}

const labels = {
  Realtime: Array.from({length: 24}).map((_, i) => `${i}:00`),
  Periodic: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  Quarterly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  Annual: ['2021', '2022', '2023', '2024', '2025', '2026']
}

const dummyTasks = [
  { id: 1, title: "Clean Water Initiative", difficulty: "Medium", xp: 450, status: "Active", sector: "Environmental" },
  { id: 2, title: "Local Shelter Food Drive", difficulty: "High", xp: 1200, status: "Pending", sector: "Social" },
  { id: 3, title: "English Tutor Session", difficulty: "Low", xp: 200, status: "Planned", sector: "Education" },
  { id: 4, title: "Medical Supply Logistics", difficulty: "High", xp: 850, status: "Active", sector: "Medical" },
  { id: 5, title: "Renewable Energy Seminar", difficulty: "Medium", xp: 500, status: "Planned", sector: "Advocacy" },
  { id: 6, title: "Urban Reforestation", difficulty: "Medium", xp: 600, status: "Active", sector: "Environmental" },
]

export default function DashboardPage() {
  const [user, setUser] = React.useState<any>(null)
  const [layoutMode, setLayoutMode] = React.useState<LayoutMode>('overview')
  const [showLayoutMenu, setShowLayoutMenu] = React.useState(false)
  const [selectedPeriod, setSelectedPeriod] = React.useState<keyof typeof graphData>('Quarterly')
  const [showNotifications, setShowNotifications] = React.useState(false)
  const navigate = useNavigate()

  
  // Calendar Logic
  const now = new Date()
  const [currentMonth, setCurrentMonth] = React.useState(now.getMonth())
  const [currentYear, setCurrentYear] = React.useState(now.getFullYear())
  const [selectedDate, setSelectedDate] = React.useState<number>(now.getDate())

  React.useEffect(() => {
    const fetchData = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
      setUser(storedUser)
      try {
        const profileRes = await apiRequest('/auth/me')
        if (profileRes.success) {
          setUser(profileRes.data.user)
          localStorage.setItem('user', JSON.stringify(profileRes.data.user))
        }
      } catch (err) {}
    }
    fetchData()
  }, [])

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const handleLayoutChange = (mode: LayoutMode) => {
    setLayoutMode(mode)
    setShowLayoutMenu(false)
  }

  // --- SUB-RENDERERS ---

  const renderOverview = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Mission Intelligence Banner */}
      <motion.div 
        {...fadeInUp}
        className="relative h-64 w-full rounded-[4rem] bg-indigo-600 overflow-hidden shadow-2xl shadow-indigo-600/20 group cursor-pointer"
        onClick={() => navigate('/mission-lab')}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-700 opacity-90" />
        <div className="absolute top-0 right-0 p-16 opacity-10 group-hover:scale-110 transition-transform duration-700">
           <Cpu className="h-64 w-64" />
        </div>
        <div className="absolute inset-0 p-12 flex flex-col justify-center">
           <div className="flex items-center gap-4 mb-4">
              <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[9px] font-black uppercase tracking-[0.4em] text-white">Neural Active</div>
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
           </div>
           <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white lowercase">AI Mission Laboratory</h2>
           <p className="text-white/60 font-medium max-w-xl mt-4">Access our neural grid to parse raw situational data into actionable humanitarian missions.</p>
        </div>
        <div className="absolute bottom-8 right-12 h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:translate-x-2 transition-transform">
           <ArrowRight className="h-6 w-6 text-indigo-600" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">

        {/* Main Impact Card */}
        <motion.div {...fadeInUp} className="bg-card border border-border rounded-[3.5rem] p-12 shadow-xl shadow-indigo-500/5 relative overflow-hidden group">
          {/* ... existing impact card content ... */}

          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
            <TrendingUp className="h-64 w-64 text-indigo-600" />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 relative z-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <Target className="h-4.5 w-4.5 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold">Impact Analytics</h3>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-7xl font-black tracking-tighter text-foreground italic">{(user?.points || 0).toLocaleString()}<span className="text-3xl text-muted-foreground/20 ml-2 not-italic">XP</span></span>
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/10">+14.2% Growth</div>
              </div>
            </div>
            <div className="bg-secondary/30 p-1 rounded-full border border-border mt-4 md:mt-0">
               {(Object.keys(graphData) as Array<keyof typeof graphData>).map((tab) => (
                 <button 
                    key={tab} 
                    onClick={() => setSelectedPeriod(tab)}
                    className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all ${selectedPeriod === tab ? 'bg-foreground text-background shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                 >
                   {tab}
                 </button>
               ))}
            </div>
          </div>
          
          {/* Graph Visualization */}
          <div className="h-[280px] flex items-end gap-3 px-2">
            {graphData[selectedPeriod].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end group/bar h-full">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${(val / Math.max(...graphData[selectedPeriod])) * 100}%` }}
                  className={cn(
                    "w-full rounded-2xl relative transition-all duration-500",
                    i === graphData[selectedPeriod].length - 1 
                      ? "bg-indigo-600 shadow-[0_0_30px_rgba(79,70,229,0.5)]" 
                      : "bg-indigo-500/20 dark:bg-muted/40 group-hover/bar:bg-indigo-600/40"
                  )}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Panel: Calendar */}
        <motion.div {...fadeInUp} transition={{delay: 0.1}} className="bg-card border border-border rounded-[3.5rem] p-10 shadow-xl shadow-blue-500/5">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-bold">{monthNames[currentMonth]}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">{currentYear} Delivery Schedule</p>
            </div>
            <div className="flex gap-2">
               <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-secondary/50"><ChevronLeft className="h-4 w-4" /></Button>
               <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-secondary/50"><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-y-4 text-center mb-10">
             {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, idx) => <div key={`${d}-${idx}`} className="text-[10px] font-black text-muted-foreground/30">{d}</div>)}
             {Array.from({length: 31}).slice(0, 28).map((_, i) => (
               <div 
                key={i} 
                className={cn(
                  "h-10 w-10 mx-auto flex items-center justify-center rounded-2xl text-xs font-bold transition-all relative group cursor-pointer",
                  i + 1 === now.getDate() ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" : "hover:bg-secondary"
                )}
               >
                 {i + 1}
                 {(i === 14 || i === 22) && <div className="absolute bottom-1.5 h-1 w-1 bg-indigo-400 rounded-full" />}
               </div>
             ))}
          </div>
          <Button className="w-full h-14 rounded-3xl bg-secondary/50 hover:bg-indigo-600 hover:text-white transition-all text-xs font-bold gap-3 group">
            <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform" /> Schedule Opportunity
          </Button>
        </motion.div>
      </div>

      {/* Bottom Insights Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
         <div className="bg-card border border-border rounded-[3rem] p-8 space-y-6">
            <div className="flex items-center gap-3">
               <ActivityIcon className="h-5 w-5 text-emerald-500" />
               <h4 className="font-bold">Recent Impact</h4>
            </div>
            <div className="space-y-4">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex gap-4 items-center">
                    <div className="h-10 w-10 rounded-2xl bg-secondary/60 flex items-center justify-center font-bold text-xs">+{i*5}0</div>
                    <div>
                       <p className="text-xs font-bold">Contribution logged</p>
                       <p className="text-[10px] text-muted-foreground/60">{i}h ago</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
         <div className="bg-card border border-border rounded-[3rem] p-8 space-y-6">
            <div className="flex items-center gap-3">
               <Sparkles className="h-5 w-5 text-indigo-500" />
               <h4 className="font-bold">Smart Matches</h4>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">Based on your competencies in <span className="text-indigo-600 font-bold">Education</span>, we suggest checking the local shelter drive.</p>
            <Button variant="outline" className="w-full h-11 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-secondary">Explore Matches</Button>
         </div>
         <div className="bg-card border border-border rounded-[3rem] p-8 space-y-6 bg-indigo-600 text-white shadow-xl shadow-indigo-600/20">
            <h4 className="font-bold text-xl">Level {Math.floor((user?.points || 0) / 1000) + 1} Reached</h4>
            <div className="space-y-2">
               <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-60">
                  <span>Progress to Next Tier</span>
                  <span>{((user?.points || 0) % 1000) / 10}%</span>
               </div>
               <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white" style={{ width: `${((user?.points || 0) % 1000) / 10}%` }} />
               </div>
            </div>
            <p className="text-xs font-medium opacity-80">You are in the top 5% of community contributors this month.</p>
         </div>
      </div>
    </div>
  )

  const renderFocus = () => (
    <div className="h-[80vh] grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 animate-in fade-in zoom-in-95 duration-1000 items-center">
      <div className="relative h-full flex flex-col justify-center">
        <div className="absolute inset-0 bg-indigo-600/5 blur-[120px] rounded-full animate-pulse pointer-events-none" />
        <motion.div 
          {...fadeInUp} 
          className="bg-card/40 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-16 shadow-2xl relative z-10 space-y-12 ring-1 ring-white/10"
        >
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-3xl bg-indigo-600 text-white flex items-center justify-center shadow-[0_0_40px_rgba(79,70,229,0.4)]">
               <Zap className="h-10 w-10 fill-current" />
            </div>
            <div>
               <div className="px-4 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-[9px] font-black uppercase tracking-[0.3em] mb-2 inline-block">Active Directive</div>
               <h2 className="text-5xl font-black tracking-tighter">Clean Water Initiative</h2>
            </div>
          </div>

          <p className="text-xl text-muted-foreground/80 leading-relaxed font-medium">
            Maintain high-precision logistics flow for the current sector assignment. 
            <span className="text-indigo-600 font-bold block mt-2">Primary Objective: Secure Asset Distribution.</span>
          </p>
          
          <div className="space-y-4 pt-6 border-t border-white/5">
             <div className="flex justify-between text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.4em]">
                <span>Logistics Completion</span>
                <span>84.2%</span>
             </div>
             <div className="h-4 w-full bg-secondary/50 rounded-full overflow-hidden p-1.5 shadow-inner border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '84.2%' }}
                  className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.6)]" 
                />
             </div>
          </div>

          <div className="flex gap-6 pt-4">
             <Button className="flex-1 h-18 rounded-3xl bg-indigo-600 hover:bg-slate-900 text-white font-black text-lg shadow-2xl shadow-indigo-600/30 transition-all active:scale-95 uppercase tracking-widest">Execute Shift</Button>
             <Button variant="outline" className="h-18 w-18 rounded-3xl border-white/10 hover:bg-white/5 backdrop-blur-xl"><Search className="h-7 w-7" /></Button>
          </div>
        </motion.div>
      </div>

      {/* Focus Sidebar: Operational Telemetry */}
      <motion.div 
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-8 h-full flex flex-col justify-center"
      >
         <div className="bg-card/30 backdrop-blur-2xl border border-white/5 rounded-[3rem] p-10 space-y-10 shadow-xl ring-1 ring-white/5">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400">Live Telemetry</h3>
            {[
              { label: "Signal Strength", val: "98.4%", color: "text-emerald-500" },
              { label: "Asset Velocity", val: "12 units/h", color: "text-indigo-400" },
              { label: "Local Latency", val: "24ms", color: "text-blue-400" },
              { label: "System Load", val: "Nominal", color: "text-slate-400" },
            ].map(stat => (
              <div key={stat.label} className="space-y-2 group cursor-default">
                 <p className="text-[9px] font-bold uppercase tracking-widest text-white/30 leading-none group-hover:text-white/50 transition-colors">{stat.label}</p>
                 <div className={cn("text-3xl font-black tracking-tighter", stat.color)}>{stat.val}</div>
              </div>
            ))}
         </div>
         <Button variant="ghost" className="h-14 rounded-2xl border border-dashed border-white/10 text-muted-foreground/40 text-[10px] uppercase font-black tracking-[0.4em] hover:bg-white/5 hover:text-indigo-400">Abort Operation</Button>
      </motion.div>
    </div>
  )

  const renderCompact = () => (
    <div className="animate-in fade-in zoom-in-95 duration-700 space-y-10">
      {/* Tactical Header Bar */}
      <div className="flex items-center justify-between bg-card/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 shadow-xl ring-1 ring-white/5">
         <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 border-r border-white/10 pr-8">
               <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
               <span className="text-[11px] font-black uppercase tracking-widest leading-none">System Grid Active</span>
            </div>
            <div className="flex gap-4">
               {[1, 2, 3].map(i => <div key={i} className="h-2 w-8 bg-indigo-500/20 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 w-1/2" /></div>)}
            </div>
         </div>
         <div className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">HID (High Information Density) Layout Enabled</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {dummyTasks.concat(dummyTasks).slice(0, 12).map((task, i) => (
            <motion.div 
               key={i} 
               {...fadeInUp}
               transition={{ delay: i * 0.02 }}
               className="bg-card/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 hover:bg-indigo-600/5 hover:border-indigo-500/30 transition-all cursor-pointer group shadow-sm ring-1 ring-white/5"
            >
               <div className="flex justify-between items-start mb-6">
                  <div className="h-10 w-10 rounded-2xl bg-secondary/50 group-hover:bg-indigo-600 transition-all duration-500 flex items-center justify-center shrink-0">
                     <Cpu className="h-5 w-5 text-muted-foreground group-hover:text-white" />
                  </div>
                  <div className="text-right">
                     <span className="text-[11px] font-black text-indigo-500 block leading-none">+{task.xp} XP</span>
                     <span className="text-[8px] font-bold text-muted-foreground/30 uppercase tracking-tighter">Yield</span>
                  </div>
               </div>
               <h5 className="text-sm font-bold text-foreground leading-[1.3] truncate mb-2">{task.title}</h5>
               <div className="flex items-center gap-2">
                  <div className="flex-1 h-[2px] bg-secondary/60 rounded-full overflow-hidden">
                     <div className="h-full bg-indigo-500/40 w-1/3" />
                  </div>
                  <span className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-widest">{task.status}</span>
               </div>
            </motion.div>
         ))}
      </div>
    </div>
  )

  const renderGrid = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
         <div className="space-y-2">
            <h2 className="text-3xl font-bold">Opportunity Explorer</h2>
            <p className="text-sm text-muted-foreground">Discover and join community initiatives based on your skills.</p>
         </div>
         <div className="flex bg-secondary/40 p-2 rounded-2xl border border-border items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 border-r border-border/40">
               <Filter className="h-4 w-4 text-muted-foreground" />
               <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Filters</span>
            </div>
            {['All', 'Active', 'Social', 'High XP'].map(f => (
              <button key={f} className={cn("px-5 py-2 rounded-xl text-[11px] font-bold transition-all", f === 'All' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}>
                {f}
              </button>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {dummyTasks.map((task, i) => (
           <motion.div 
            key={task.id} 
            {...fadeInUp}
            transition={{ delay: i * 0.05 }}
            className="bg-card border border-border rounded-[3rem] p-8 group hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-600/5 transition-all cursor-pointer relative overflow-hidden"
          >
             <div className="flex justify-between items-start mb-10">
                <div className={cn("px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest", 
                  task.difficulty === 'High' ? 'bg-rose-500/10 text-rose-500' : 'bg-indigo-500/10 text-indigo-500'
                )}>
                  {task.difficulty} Complexity
                </div>
                <div className="h-9 w-9 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                   <Maximize2 className="h-4 w-4" />
                </div>
             </div>
             <h4 className="text-xl font-bold text-foreground mb-4 group-hover:translate-x-1 transition-transform">{task.title}</h4>
             <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/40">
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-widest">Reward Pool</span>
                   <span className="text-base font-black text-indigo-600">+{task.xp} XP</span>
                </div>
                <Button className="h-10 px-5 rounded-full bg-secondary/50 group-hover:bg-indigo-600 group-hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">Commit</Button>
             </div>
           </motion.div>
         ))}
      </div>
    </div>
  )

  const renderActivity = () => (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="space-y-8">
         <h2 className="text-3xl font-bold px-4">Activity Stream</h2>
         <div className="space-y-6 relative pl-10">
            <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-500/40 via-indigo-500/10 to-transparent" />
            {[
              { type: 'Task', name: 'Water Logistics Completed', time: '12m ago', val: '+450 XP', color: 'bg-emerald-500' },
              { type: 'Level', name: 'Advanced Contributor Status', time: '2h ago', val: 'New Badge', color: 'bg-indigo-600' },
              { type: 'Chat', name: 'Marcus Chen sent a message', time: '5h ago', val: 'Unread', color: 'bg-blue-500' },
              { type: 'System', name: 'Night Shift Data Sync', time: '1d ago', val: 'Stable', color: 'bg-slate-400' },
            ].map((act, i) => (
              <motion.div 
                key={i} 
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-[2.5rem] p-7 flex items-center gap-6 relative shadow-sm group hover:shadow-lg transition-all"
              >
                 <div className={cn("absolute -left-8 h-4 w-4 rounded-full border-4 border-background z-20", act.color)} />
                 <div className="h-12 w-12 rounded-2xl bg-secondary/60 flex items-center justify-center shrink-0">
                    <ActivityIcon className="h-5 w-5 text-muted-foreground" />
                 </div>
                 <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                       <span className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-widest">{act.type}</span>
                       <span className="text-[10px] font-bold text-muted-foreground/60">{act.time}</span>
                    </div>
                    <p className="text-base font-bold text-foreground">{act.name}</p>
                 </div>
                 <div className="px-4 py-2 rounded-2xl bg-secondary/40 text-xs font-black uppercase text-foreground">
                    {act.val}
                 </div>
              </motion.div>
            ))}
         </div>
      </div>
      <div className="space-y-8">
         <h2 className="text-3xl font-bold">Insights</h2>
         <div className="bg-card border border-border rounded-[3.5rem] p-10 space-y-12 shadow-sm">
            {[
              { label: "Completion Rate", val: "94%", trend: "up" },
              { label: "Community Rank", val: "#12", trend: "up" },
              { label: "Active Connections", val: "48", trend: "stable" }
            ].map(stat => (
              <div key={stat.label} className="space-y-2">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 leading-none">{stat.label}</p>
                 <div className="flex items-baseline gap-4">
                    <span className="text-4xl font-black text-foreground">{stat.val}</span>
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  )

  return (
    <div className="flex-1 bg-background font-body overflow-y-auto transition-colors duration-500 selection:bg-indigo-500/10 h-screen scrollbar-hide py-10 px-8">
      <main className="max-w-[1700px] mx-auto space-y-12 pb-32">
        
        {/* Header Protocol */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-8">
           <div className="space-y-3">
              <div className="flex items-center gap-3">
                 <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500/60 leading-none">Status: Primary Hub Optimized</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
                Dashboard <span className="font-display italic font-medium text-indigo-600 underline decoration-indigo-500/30 underline-offset-8">Overview</span>
              </h1>
              <p className="text-muted-foreground/60 text-sm font-medium tracking-tight">Managing community impact and volunteer logistics through high-fidelity oversight.</p>
           </div>
           
           <div className="flex items-center gap-4 w-full md:w-auto relative">
              {/* LAYOUT SELECTOR ▾ */}
              <div className="relative">
                <Button 
                  onClick={() => setShowLayoutMenu(!showLayoutMenu)}
                  className="h-14 px-8 rounded-3xl bg-slate-900 hover:bg-black text-white font-bold gap-4 shadow-2xl shadow-slate-900/20 active:scale-95 transition-all min-w-[180px] justify-between"
                >
                   <div className="flex items-center gap-3">
                      <LayoutIcon className="h-5 w-5 text-indigo-400" />
                      <span className="text-sm font-black uppercase tracking-widest">Layout</span>
                   </div>
                   <ChevronDown className={cn("h-5 w-5 transition-transform duration-500", showLayoutMenu && "rotate-180")} />
                </Button>

                <AnimatePresence>
                  {showLayoutMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      className="absolute right-0 top-full mt-4 w-[280px] rounded-[2.5rem] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.6)] z-[100] p-4 flex flex-col gap-2 border border-white/20 overflow-hidden"
                      style={{ 
                        backgroundColor: "rgba(255, 255, 255, 0.03)", 
                        backdropFilter: "blur(40px) saturate(180%)",
                        WebkitBackdropFilter: "blur(40px) saturate(180%)"
                      }}
                    >
                       {[
                         { id: 'overview', icon: CommandIcon, label: 'Overview Mode', sub: 'Standard' },
                         { id: 'focus', icon: Maximize2, label: 'Focus Mode', sub: 'Deep Work' },
                         { id: 'grid', icon: GridIcon, label: 'Grid Mode', sub: 'Discovery' },
                         { id: 'activity', icon: List, label: 'Activity Mode', sub: 'Timeline' },
                         { id: 'compact', icon: LayersIcon, label: 'Compact Mode', sub: 'Density' },
                       ].map((opt) => (
                         <button
                           key={opt.id}
                           onClick={() => handleLayoutChange(opt.id as LayoutMode)}
                           onMouseEnter={() => setLayoutMode(opt.id as LayoutMode)} 
                           className={cn(
                             "w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all group relative overflow-hidden",
                             layoutMode === opt.id ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20" : "hover:bg-white/10 text-muted-foreground hover:text-foreground"
                           )}
                         >
                            <opt.icon className="h-5 w-5 shrink-0" />
                            <div>
                               <p className="text-xs font-black uppercase tracking-widest leading-none mb-1">{opt.label}</p>
                               <p className="text-[9px] font-medium opacity-60 italic">{opt.sub}</p>
                            </div>
                         </button>
                       ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="h-10 w-[1px] bg-border/40" />

              <div className="flex items-center gap-3 bg-secondary/30 p-2 border border-border/50 rounded-3xl shadow-inner relative">
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="h-12 w-12 flex items-center justify-center rounded-2xl hover:bg-card transition-all relative group shadow-sm bg-background border border-border/60"
                  >
                      <Bell className="h-5 w-5 text-muted-foreground group-hover:text-indigo-600" />
                      <span className="absolute top-3 right-3 h-2 w-2 bg-rose-500 rounded-full border-2 border-background" />
                  </button>
                  
                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        className="absolute right-0 mt-4 w-80 rounded-[2.5rem] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.6)] z-[100] p-8 space-y-6 border border-white/20 overflow-hidden"
                        style={{ 
                          backgroundColor: "rgba(255, 255, 255, 0.03)", 
                          backdropFilter: "blur(40px) saturate(180%)",
                          WebkitBackdropFilter: "blur(40px) saturate(180%)"
                        }}
                      >
                         <div className="flex justify-between items-center border-b border-white/10 pb-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-foreground">Inbox Signals</span>
                            <span className="text-[10px] text-indigo-400 font-bold cursor-pointer hover:underline">Clear Signals</span>
                         </div>
                         <div className="space-y-4">
                            <div className="flex gap-4 p-3 hover:bg-white/10 rounded-2xl transition-colors cursor-pointer group">
                               <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10">
                                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                </div>
                               <div>
                                  <p className="text-xs font-bold text-foreground">Initiative Approved</p>
                                  <p className="text-[10px] text-muted-foreground/60">Sector 4 deployment validated.</p>
                               </div>
                            </div>
                            <div className="flex gap-4 p-3 hover:bg-white/10 rounded-2xl transition-colors cursor-pointer group">
                               <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/10">
                                  <MessageSquare className="h-5 w-5 text-indigo-400" />
                               </div>
                               <div>
                                  <p className="text-xs font-bold text-foreground">New Signal</p>
                                  <p className="text-[10px] text-muted-foreground/60">Coordinated logs for Sector 7.</p>
                               </div>
                            </div>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <AnimatedThemeToggler className="h-12 w-12 rounded-2xl bg-background border border-border/60 shadow-sm" />
              </div>
           </div>
        </div>

        {/* Dynamic Layout Engine */}
        <div className="min-h-screen">
          <AnimatePresence mode="wait">
            {layoutMode === 'overview' && <motion.div key="overview" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>{renderOverview()}</motion.div>}
            {layoutMode === 'focus' && <motion.div key="focus" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>{renderFocus()}</motion.div>}
            {layoutMode === 'grid' && <motion.div key="grid" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>{renderGrid()}</motion.div>}
            {layoutMode === 'activity' && <motion.div key="activity" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>{renderActivity()}</motion.div>}
            {layoutMode === 'compact' && <motion.div key="compact" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>{renderCompact()}</motion.div>}
          </AnimatePresence>
        </div>

      </main>
    </div>
  )
}
