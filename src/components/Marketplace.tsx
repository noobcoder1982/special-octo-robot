import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Add01Icon as Plus, 
  More02Icon as MoreVertical, 
  Search01Icon as Search, 
  FilterIcon as Filter, 
  FlashIcon as Zap, 
  UserGroupIcon as Users, 
  GlobeIcon as Globe, 
  Shield01Icon as ShieldCheck, 
  ArrowUpRight01Icon as ArrowUpRight,
  FavouriteIcon as Heart,
  DropletIcon as Droplets,
  Book01Icon as BookOpen,
  Target01Icon as Target,
  Time01Icon as Clock,
  Briefcase01Icon as Briefcase,
  SparklesIcon as Sparkles,
  Location01Icon as MapPin,
  ArrowRight01Icon as ChevronRight,
  FilterIcon as FilterX
} from "hugeicons-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

import { apiRequest } from "../lib/api"

const categoryToSector: Record<string, string> = {
  'disaster-relief': 'Crisis Support',
  'education': 'Education',
  'healthcare': 'Medical',
  'environment': 'Environment',
  'community': 'Social',
  'logistics': 'Social',
  'technical': 'Social',
  'other': 'Social'
}

const categoryToIcon: Record<string, any> = {
  'disaster-relief': Heart,
  'environment': Droplets,
  'education': BookOpen,
  'healthcare': ShieldCheck,
  'logistics': Briefcase,
  'technical': Zap,
  'other': Target
}

const urgencyToDifficulty: Record<string, string> = {
  'low': 'Light',
  'medium': 'Standard',
  'high': 'Tactical',
  'critical': 'Critical'
}

const colorMap: Record<string, string> = {
  'disaster-relief': 'bg-rose-500',
  'environment': 'bg-emerald-500',
  'education': 'bg-blue-500',
  'healthcare': 'bg-indigo-500',
  'technical': 'bg-amber-500',
  'other': 'bg-purple-500'
}

const sectors = ["All Sectors", "Environment", "Education", "Crisis Support", "Social", "Medical"]

export default function Marketplace() {
  const [quests, setQuests] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [selectedSector, setSelectedSector] = React.useState("All Sectors")
  const [searchQuery, setSearchQuery] = React.useState("")

  React.useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiRequest('/tasks', { method: 'GET' })
        if (response.success) {
          const transformed = response.data.map((task: any) => ({
            id: task._id,
            title: task.title,
            description: task.description,
            sector: categoryToSector[task.category] || 'Social',
            reward: `${(task.maxVolunteers || 1) * 100} XP`, // Pseudo reward
            difficulty: urgencyToDifficulty[task.urgency] || 'Standard',
            status: task.status === 'open' ? 'Available' : 'Assigned',
            icon: categoryToIcon[task.category] || Target,
            color: colorMap[task.category] || 'bg-purple-500',
            participants: task.assignedVolunteers?.length || 0
          }))
          setQuests(transformed)
        }
      } catch (err) {
        console.error("Failed to fetch tasks", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTasks()
  }, [])

  const filteredQuests = quests.filter(q => 
    (selectedSector === "All Sectors" || q.sector === selectedSector) &&
    (q.title.toLowerCase().includes(searchQuery.toLowerCase()) || q.description.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="flex-1 overflow-y-auto bg-background font-body text-foreground pb-32 selection:bg-indigo-500/10 h-screen scrollbar-hide">
      
      {/* Header - Industrial Refined */}
      <div className="relative pt-24 pb-16 px-8 md:px-12 bg-card/30 border-b border-border/40 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-[1700px] mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
             <div className="h-10 w-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
                <Target className="h-5 w-5" />
             </div>
             <span className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-600/60 leading-none">Global Mission Protocol</span>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="space-y-4 max-w-3xl">
               <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[0.9]">
                  Mission <span className="font-display italic font-medium text-indigo-600">Marketplace</span>
               </h1>
               <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl">
                  Deploy to high-priority sectors. Your contribution generates real-time Impact XP and drives the social resilience index.
               </p>
            </div>
            
            <div className="flex items-center gap-6">
               <div className="text-right hidden sm:block">
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-1">Network Capacity</div>
                  <div className="text-2xl font-black text-foreground italic">94% <span className="text-xs text-indigo-600 font-bold ml-1">UP</span></div>
               </div>
               <div className="h-12 w-px bg-border/40 mx-2" />
               <Button className="h-14 px-8 rounded-2xl bg-indigo-600 text-white font-bold gap-3 shadow-xl shadow-indigo-600/20 hover:scale-[1.02] transition-all">
                  <Plus className="h-5 w-5" /> Propose Mission
               </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar - Sticky Protocol */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-2xl border-b border-border/40 transition-all duration-500">
         <div className="max-w-[1700px] mx-auto px-8 md:px-12 py-6 flex flex-col md:flex-row items-center gap-8">
            <div className="relative flex-1 w-full group">
               <div className="absolute inset-x-0 -bottom-px h-[2px] bg-gradient-to-r from-transparent via-indigo-500/80 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 blur-[2px]" />
               <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-indigo-500 animate-pulse drop-shadow-[0_0_8px_rgba(79,70,229,0.6)]" />
               </div>
               <input 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 type="text" 
                 placeholder="Semantic AI Search: 'Logistics missions near me with high XP...'" 
                 className="w-full h-14 bg-card/40 backdrop-blur-2xl border border-indigo-500/20 rounded-2xl pl-14 pr-[140px] text-sm font-medium focus:outline-none focus:border-indigo-500/60 focus:bg-background transition-all shadow-[0_0_15px_rgba(79,70,229,0.05)] focus:shadow-[0_0_30px_rgba(79,70,229,0.15)] text-foreground placeholder:text-muted-foreground/50"
                 spellCheck={false}
               />
               <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3 pointer-events-none">
                  <span className="hidden md:block text-[9px] font-black uppercase tracking-widest text-indigo-500/60 transition-opacity">Neural / Fuzzy</span>
                  <button className="h-8 px-4 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 hover:bg-indigo-600 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest shadow-sm pointer-events-auto">
                     Search
                  </button>
               </div>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2 md:pb-0 w-full md:w-auto">
               {sectors.map(sector => (
                 <button 
                    key={sector}
                    onClick={() => setSelectedSector(sector)}
                    className={cn(
                      "whitespace-nowrap px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all",
                      selectedSector === sector ? "bg-foreground text-background shadow-lg" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                    )}
                 >
                    {sector}
                 </button>
               ))}
               <Button variant="ghost" className="h-10 w-10 p-0 rounded-2xl text-muted-foreground"><FilterX className="h-4 w-4" /></Button>
            </div>
         </div>
      </div>

      {/* Grid - Mission Cards */}
      <div className="max-w-[1700px] mx-auto px-8 md:px-12 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredQuests.map((quest, i) => (
              <motion.div 
                layout
                key={quest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="group relative bg-card border border-border/60 rounded-[3rem] p-10 flex flex-col justify-between hover:border-indigo-600/30 hover:shadow-2xl hover:shadow-indigo-600/5 transition-all cursor-pointer overflow-hidden min-h-[420px]"
              >
                {/* Tactical Corner Decal */}
                <div className="absolute top-0 right-0 h-40 w-40 bg-indigo-600/0 p-8 flex justify-end items-start transition-colors group-hover:bg-indigo-600/5">
                   <div className="h-2 w-2 rounded-full bg-border group-hover:bg-indigo-600 transition-colors" />
                </div>
                
                <div>
                  <div className="flex justify-between items-start mb-8">
                     <div className={cn("h-16 w-16 rounded-[2rem] flex items-center justify-center border border-border/40 shadow-inner group-hover:scale-110 transition-transform", quest.color.replace('bg-', 'bg-') + '/10')}>
                        <quest.icon className={cn("h-8 w-8", quest.color.replace('bg-', 'text-'))} />
                     </div>
                     <div className={cn(
                        "px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border",
                        quest.status === 'Hot' ? "bg-rose-500 text-white border-rose-600 shadow-lg shadow-rose-500/20" : 
                        quest.status === 'Active' ? "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" : "bg-secondary text-muted-foreground border-border/40"
                     )}>
                        {quest.status}
                     </div>
                  </div>

                  <div className="space-y-2 mb-6">
                     <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600/60 leading-none">
                        <MapPin className="h-3 w-3" /> Sector {quest.sector}
                     </div>
                     <h3 className="text-3xl font-bold tracking-tight text-foreground leading-tight group-hover:text-indigo-600 transition-colors">{quest.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground text-base font-medium leading-relaxed line-clamp-3 mb-10 italic opacity-80 group-hover:opacity-100 transition-opacity">
                    {quest.description}
                  </p>
                </div>

                <div className="pt-8 border-t border-border/40 flex items-end justify-between">
                   <div className="space-y-4">
                      <div className="flex -space-x-3">
                         {Array.from({length: 3}).map((_, idx) => (
                            <div key={idx} className="h-8 w-8 rounded-full border-2 border-background bg-secondary overflow-hidden">
                               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Q${quest.id}${idx}`} alt="U" />
                            </div>
                         ))}
                         <div className="h-8 w-8 rounded-full border-2 border-background bg-indigo-600/10 flex items-center justify-center text-[10px] font-black text-indigo-600">
                            +{quest.participants}
                         </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                           <span className="text-[10px] text-muted-foreground/40 font-black uppercase tracking-widest mb-1">Impact XP</span>
                           <span className="text-lg font-black text-foreground">{quest.reward}</span>
                        </div>
                        <div className="h-10 w-px bg-border/40" />
                        <div className="flex flex-col">
                           <span className="text-[10px] text-muted-foreground/40 font-black uppercase tracking-widest mb-1">Risk Level</span>
                           <span className="text-lg font-black text-foreground italic">{quest.difficulty}</span>
                        </div>
                      </div>
                   </div>
                   
                   <button className="h-16 w-16 rounded-[2.5rem] bg-foreground text-background flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xl shadow-black/5 active:scale-90">
                      <ChevronRight className="h-8 w-8" />
                   </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

    </div>
  )
}
