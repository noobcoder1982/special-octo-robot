import * as React from "react"
import { motion } from "framer-motion"
import { 
  FlashIcon as Zap, 
  SparklesIcon as Sparkles, 
  CpuIcon as Cpu, 
  Layers01Icon as Layers, 
  Activity01Icon as Activity, 
  GlobeIcon as Globe, 
  Shield01Icon as Shield, 
  Target01Icon as Target,
  ArrowRight01Icon as ArrowRight,
  Clock01Icon as Clock,
  RocketIcon as Rocket,
  Add01Icon as Plus,
  ArrowLeft01Icon as ArrowLeft,
  Award01Icon as ChampionIcon,
  Comment01Icon as Chat01Icon,
  PackageIcon,
  CompassIcon as Map01Icon,
  FlashIcon as Energy01Icon
} from "hugeicons-react"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

// Icon Helpers (Must be defined before updates array)
const Trophy = ChampionIcon;
const Message = Chat01Icon;
const Inventory = PackageIcon;
const MapIcon = Map01Icon;
const Energy = Energy01Icon;

const updates = [
  {
    version: "v2.0",
    title: "MVP Submission Build",
    date: "Current",
    tag: "Production",
    icon: ChampionIcon,
    color: "indigo",
    features: [
      { name: "Hackathon Ready", desc: "Prioritized core features for live demo readiness and stability.", type: "Release" },
      { name: "Production Deployment", desc: "Optimized for Vercel and Railway with stable AI-assisted workflows.", type: "Infrastructure" },
      { name: "UI Polish", desc: "Refined user flows for fast judge understanding and practical usability.", type: "Improvement" }
    ]
  },
  {
    version: "v1.9",
    title: "Role-Based Access Control",
    date: "Latest",
    tag: "Security",
    icon: Shield,
    color: "emerald",
    features: [
      { name: "Authorized Roles", desc: "Restricted advanced operational tools to authorized NGO roles.", type: "Security" },
      { name: "User Segregation", desc: "Defined separate experiences for Volunteers, NGOs, and Customers.", type: "New" }
    ]
  },
  {
    version: "v1.8",
    title: "Nearby Activity Intelligence",
    date: "Recent",
    tag: "Feature",
    icon: MapIcon,
    color: "amber",
    features: [
      { name: "Geographic Relevance", desc: "Real-time discovery of NGO opportunities focused on local areas like Bhubaneswar.", type: "New" },
      { name: "Map Discovery", desc: "Interactive map-based exploration of community tasks and events.", type: "New" }
    ]
  },
  {
    version: "v1.7",
    title: "Chat Intelligence Upgrade",
    date: "Recent",
    tag: "AI",
    icon: Message,
    color: "rose",
    features: [
      { name: "AI Chat Assistant", desc: "Upgraded team chat with AI that detects actionable opportunities in conversations.", type: "AI" },
      { name: "Smart Prompts", desc: "Automated task creation and summaries directly from chat logs.", type: "New" }
    ]
  },
  {
    version: "v1.6",
    title: "Inventory Management",
    date: "Recent",
    tag: "Utility",
    icon: Inventory,
    color: "blue",
    features: [
      { name: "Live Tracking", desc: "Real-time inventory system for equipment and resource availability management.", type: "New" },
      { name: "AI Gear Suggestions", desc: "Automated equipment recommendations based on mission requirements.", type: "AI" }
    ]
  },
  {
    version: "v1.5",
    title: "Volunteer Energy System",
    date: "Recent",
    tag: "Core",
    icon: Energy,
    color: "orange",
    features: [
      { name: "Fatigue-Aware Logic", desc: "Energy score system (0-100) to ensure sustainable volunteer deployment.", type: "New" },
      { name: "Readiness Logic", desc: "Advanced assignment logic based on volunteer stamina and availability.", type: "Improvement" }
    ]
  },
  {
    version: "v1.4",
    title: "Mission Intelligence System",
    date: "Recent",
    tag: "Intelligence",
    icon: Target,
    color: "purple",
    features: [
      { name: "Request Conversion", desc: "Convert scattered help requests into organized, prioritized missions.", type: "AI" },
      { name: "Structured Missions", desc: "Dynamic mission cards with area, priority, and status recommendations.", type: "New" }
    ]
  },
  {
    version: "v1.3",
    title: "AI Intelligence Layer",
    date: "Development",
    tag: "Architecture",
    icon: Cpu,
    color: "indigo",
    features: [
      { name: "Operational AI", desc: "Integrated smart matching and mission prioritization engines.", type: "AI" },
      { name: "Profile Insights", desc: "Skill-based recommendations and readiness scoring for all users.", type: "New" }
    ]
  },
  {
    version: "v1.2",
    title: "Gamification Layer",
    date: "Development",
    tag: "Engagement",
    icon: Trophy,
    color: "amber",
    features: [
      { name: "XP & Levels", desc: "Implemented XP points and rank progression to improve participation.", type: "New" },
      { name: "Achievement Matrix", desc: "Digital badges and milestones for contribution tracking.", type: "New" }
    ]
  },
  {
    version: "v1.1",
    title: "Platform Structure",
    date: "Initial",
    tag: "Architecture",
    icon: Layers,
    color: "gray",
    features: [
      { name: "Core Architecture", desc: "Designed the multi-page system (Dashboard, Missions, Profiles, Groups).", type: "Infrastructure" },
      { name: "Communication Grid", desc: "Introduced integrated chat and inventory systems.", type: "New" }
    ]
  },
  {
    version: "v1.0",
    title: "Initial Concept",
    date: "Genesis",
    tag: "Vision",
    icon: Rocket,
    color: "blue",
    features: [
      { name: "Core Vision", desc: "Defined the AI-powered Volunteer Management Platform concept.", type: "Genesis" },
      { name: "User Groups", desc: "Identified Volunteers, NGOs, and Customers as primary stakeholders.", type: "Strategy" }
    ]
  }
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-indigo-600/20 transition-colors duration-500 overflow-x-hidden pb-32">
      
      {/* 1. ATMOSPHERIC CANVAS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-500/5 to-transparent blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 pt-32">
        
        {/* BACK BUTTON */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-12 left-6 md:left-12"
        >
          <Link 
            to="/" 
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Grid
          </Link>
        </motion.div>

        {/* 2. MINIMALIST HEADER */}
        <div className="space-y-4 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-indigo-600 font-black text-[10px] uppercase tracking-[0.4em]"
          >
            <Clock size={14} /> 
            Development Log
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground lowercase">
            system <span className="text-muted-foreground/40 italic">evolution.</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-xl italic opacity-60">
            A precise timeline of our journey from concept to a production-grade AI platform.
          </p>
        </div>

        {/* 3. LINEAR-STYLE TIMELINE */}
        <div className="relative space-y-0">
          {/* Vertical Line */}
          <div className="absolute left-[3px] md:left-[140px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-border via-border/40 to-transparent" />

          {updates.map((update, i) => (
            <motion.section 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative grid grid-cols-1 md:grid-cols-[140px_1fr] gap-8 md:gap-16 py-16 md:py-24 group"
            >
              {/* Sticky Left Column (Version/Date) */}
              <div className="md:sticky md:top-32 h-fit space-y-2 md:text-right pr-8">
                <div className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-1">{update.version}</div>
                <div className="text-2xl font-bold tracking-tight text-foreground/80 leading-none">{update.date}</div>
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/30 px-2 py-0.5 rounded border border-border/40 inline-block md:block md:w-fit md:ml-auto">
                   {update.tag}
                </div>
              </div>

              {/* Node (The Dot) */}
              <div className="absolute left-[-1.5px] md:left-[135.5px] top-[74px] md:top-[114px] h-2.5 w-2.5 rounded-full bg-background border-2 border-indigo-600 z-10 shadow-[0_0_10px_rgba(79,70,229,0.5)] group-hover:scale-125 transition-transform" />

              {/* Content Area */}
              <div className="space-y-12 pl-12 md:pl-0">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground group-hover:text-indigo-600 transition-colors">
                    {update.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-12">
                   {update.features.map((feature, idx) => (
                     <div key={idx} className="space-y-4 max-w-2xl">
                        <div className="flex items-center gap-3">
                           <div className={cn(
                             "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded",
                             feature.type === 'New' || feature.type === 'Genesis' ? "bg-indigo-600/10 text-indigo-600" :
                             feature.type === 'Improvement' || feature.type === 'AI' ? "bg-amber-600/10 text-amber-600" :
                             "bg-emerald-600/10 text-emerald-600"
                           )}>
                              {feature.type}
                           </div>
                           <h4 className="text-lg font-bold tracking-tight text-foreground/90">{feature.name}</h4>
                        </div>
                        <p className="text-base text-muted-foreground leading-relaxed font-medium opacity-70 italic">
                           {feature.desc}
                        </p>
                     </div>
                   ))}
                </div>
                
                {/* Visual Placeholder */}
                <div className="pt-8">
                   <div className="aspect-video w-full rounded-3xl bg-secondary/30 border border-border/40 overflow-hidden relative group/image">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <update.icon size={48} className="text-indigo-600/20 group-hover/image:scale-110 transition-transform duration-700" />
                      </div>
                   </div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* 4. FOOTER */}
        <footer className="mt-40 pt-20 border-t border-border/40 text-center">
           <div className="inline-flex items-center gap-6 px-10 py-3 rounded-full bg-secondary/50 border border-border/40 text-[11px] font-black uppercase tracking-widest text-muted-foreground/30">
              <Plus size={14} /> The vision continues
           </div>
        </footer>

      </div>
    </div>
  )
}
