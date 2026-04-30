import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { 
  Zap, 
  Shield, 
  Target, 
  Globe, 
  Users, 
  Activity, 
  Command, 
  Cpu, 
  Layers, 
  ArrowRight,
  ChevronRight,
  Sparkles,
  Search,
  Lock,
  MessageCircle,
  Trophy
} from "lucide-react"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

const BlurText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const letters = text.split("");
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: delay },
    },
  };
  const child = {
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      },
    },
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn("inline-flex flex-wrap", className)}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index} className="inline-block leading-none">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
}

const features = [
  {
    title: "Strategic Deployment Hub",
    description: "Centrally coordinate humanitarian missions with a real-time tactical overview of global nodes and volunteer distribution.",
    icon: Layers,
    color: "indigo",
    stats: "24.5k Nodes Active"
  },
  {
    title: "Protocol Intelligence (AI)",
    description: "Leverage advanced neural briefing structures to analyze mission data and generate real-time strategic recommendations.",
    icon: Cpu,
    color: "emerald",
    stats: "99.2% Sync Precision"
  },
  {
    title: "Impact Marketplace",
    description: "A high-precision deployment grid where volunteers can join high-priority missions across diverse tactical sectors.",
    icon: Target,
    color: "rose",
    stats: "150+ Sectors"
  },
  {
    title: "Social Resilience Index",
    description: "Monitor community stability in real-time through an immutable activity ledger and strategic resilience analytics.",
    icon: Activity,
    color: "amber",
    stats: "Live Resilience Feed"
  },
  {
    title: "Secure Personnel Grid",
    description: "Manage global volunteer squads with end-to-end encrypted coordination and verified skill progression protocols.",
    icon: Shield,
    color: "blue",
    stats: "SHA-512 Encrypted"
  },
  {
    title: "Global Reach Protocol",
    description: "Seamlessly expand your humanitarian footprint with built-in localization and cross-border operational support.",
    icon: Globe,
    color: "purple",
    stats: "Global Infrastructure"
  }
]

export default function FeaturesPage() {
  const containerRef = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto bg-background font-sans selection:bg-indigo-600/10 scroll-smooth h-screen scrollbar-hide">
      
      {/* Cinematic Hero */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-8 overflow-hidden">
        {/* Iridescent Aura */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 blur-[180px] rounded-full" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full animate-pulse" />
        </div>

        <div className="relative z-10 space-y-8 max-w-[1400px]">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-indigo-600/5 border border-indigo-600/10 text-indigo-600 text-[11px] font-black uppercase tracking-[0.4em] mb-4"
           >
              <Sparkles className="h-4 w-4" /> Feature Protocol Hub
           </motion.div>
           
           <h1 className="text-[12vw] sm:text-[10vw] lg:text-[7.5rem] font-bold tracking-tight text-foreground leading-[0.85] mb-8">
             <BlurText text="Engineered for" /> <br/>
             <span className="font-black text-indigo-600 text-[10vw] lg:text-[12rem] lowercase">
                <BlurText text="pure impact." delay={0.4} />
             </span>
           </h1>

           <motion.p 
             initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
             whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
             className="max-w-3xl mx-auto text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed tracking-tight"
           >
             From real-time coordination to AI-driven insights, ImpactQuest provides the tactical layer for the next generation of global volunteering.
           </motion.p>
           
           <motion.div 
             {...fadeInUp}
             transition={{ delay: 0.2 }}
             className="pt-12"
           >
             <Link to="/signin">
               <Button className="h-20 px-12 rounded-[2.5rem] bg-indigo-600 text-white text-xl font-black gap-4 shadow-2xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-95 transition-all">
                  Initialize deployment <ArrowRight className="h-6 w-6" />
               </Button>
             </Link>
           </motion.div>
        </div>
      </section>

      {/* Feature Protocol Grid */}
      <section className="px-8 md:px-12 lg:px-24 py-32 max-w-[1700px] mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative p-12 rounded-[3.5rem] border border-border/60 bg-card hover:border-indigo-600/30 hover:shadow-2xl hover:shadow-indigo-600/5 transition-all overflow-hidden"
              >
                 {/* Adaptive Glow */}
                 <div className={cn("absolute -top-10 -right-10 h-32 w-32 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity rounded-full", `bg-${f.color}-500`)} />
                 
                 <div className={cn(
                   "h-16 w-16 rounded-[2rem] flex items-center justify-center mb-10 transition-all group-hover:scale-110",
                   `bg-${f.color}-600/10 text-${f.color}-600 border border-${f.color}-600/20`
                 )}>
                    <f.icon className="h-8 w-8" />
                 </div>
                 
                 <div className="space-y-4 mb-10">
                    <h3 className="text-3xl font-bold tracking-tight text-foreground group-hover:text-indigo-600 transition-colors leading-none">{f.title}</h3>
                    <p className="text-muted-foreground text-base font-medium leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
                      {f.description}
                    </p>
                 </div>

                 <div className="pt-8 border-t border-border/40 flex justify-between items-center text-[11px] font-black uppercase tracking-widest text-muted-foreground/30">
                    <span className={cn("text-xs font-black", `text-${f.color}-600`)}>{f.stats}</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                 </div>
              </motion.div>
            ))}
         </div>
      </section>

      {/* Strategic Showcase (Interactive Feel) */}
      <section className="px-8 md:px-12 lg:px-24 py-32 max-w-[1700px] mx-auto border-t border-border/40 bg-card/10 backdrop-blur-3xl rounded-[4rem] mb-32 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none" />
         
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 relative z-10">
            <div className="space-y-12 flex flex-col justify-center">
               <div className="space-y-6">
                  <span className="text-indigo-600 text-[11px] font-black uppercase tracking-[0.4em]">Integrated Intelligence</span>
                  <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.85]">
                     <BlurText text="Advanced" /> <br/> 
                     <span className="font-black text-indigo-600 text-[8vw] md:text-[8rem] lowercase leading-none">
                        <BlurText text="sync protocols." delay={0.3} />
                     </span>
                  </h2>
               </div>
               <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-xl italic border-l-4 border-indigo-600 pl-8">
                 "Our mission is to replace fragmented efforts with a unified coordination layer. ImpactQuest ensures every volunteer is deployed where they're needed most."
               </p>
               <div className="flex flex-wrap gap-8">
                  <div className="space-y-2">
                     <div className="text-4xl font-black text-foreground italic">99.9%</div>
                     <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 leading-none">Uptime Protocol</div>
                  </div>
                  <div className="space-y-2">
                     <div className="text-4xl font-black text-foreground italic">10ms</div>
                     <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 leading-none">Sync Latency</div>
                  </div>
                  <div className="space-y-2">
                     <div className="text-4xl font-black text-foreground italic">24/7</div>
                     <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 leading-none">Live Oversight</div>
                  </div>
               </div>
            </div>

            <div className="relative">
               {/* Mini Mock Interface */}
               <motion.div 
                 initial={{ rotate: -2, y: 30 }}
                 whileInView={{ rotate: 0, y: 0 }}
                 className="bg-card border border-border/60 rounded-[3rem] p-10 shadow-2xl relative z-10 aspect-[4/3] flex flex-col"
               >
                  <div className="flex justify-between items-center mb-10 pb-6 border-b border-border/40">
                     <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-indigo-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground leading-none">Tactical Feed</span>
                     </div>
                     <Activity className="h-4 w-4 text-emerald-500 animate-pulse" />
                  </div>
                  <div className="space-y-6 flex-1">
                     {[1,2,3].map(i => (
                       <div key={i} className="flex gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/40 items-center">
                          <div className="h-10 w-10 rounded-full bg-indigo-600/10 flex items-center justify-center"><Zap className="h-4 w-4 text-indigo-600" /></div>
                          <div className="flex-1">
                             <div className="h-2 w-1/2 bg-indigo-600/20 rounded-full mb-2" />
                             <div className="h-1 w-3/4 bg-muted-foreground/10 rounded-full" />
                          </div>
                          <div className="text-[8px] font-bold text-indigo-600 uppercase">Active</div>
                       </div>
                     ))}
                  </div>
                  <div className="mt-10 pt-6 border-t border-border/40 flex justify-between items-center">
                     <div className="flex -space-x-3">
                        {[1,2,3,4].map(i => <div key={i} className="h-8 w-8 rounded-full bg-secondary border-2 border-background" />)}
                     </div>
                     <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/40 italic">Syncing with Global Hub...</span>
                  </div>
               </motion.div>
               {/* Floating blobs behind the mock */}
               <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full" />
               <div className="absolute -top-20 -left-20 w-48 h-48 bg-purple-600/10 blur-[80px] rounded-full" />
            </div>
         </div>
      </section>

      {/* Final Tactical CTA - DARK MODE OPTIMIZED */}
      <section className="relative px-8 md:px-12 lg:px-24 py-48 text-center overflow-hidden border-t border-border/40">
         <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-indigo-600/5 blur-[180px] rounded-full" />
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
         </div>

         <div className="relative z-10 max-w-5xl mx-auto space-y-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
               <span className="text-indigo-600 text-[11px] font-black uppercase tracking-[0.5em] block mb-8">End of Briefing</span>
               <h2 className="text-[10vw] lg:text-[8.5rem] font-black tracking-tighter leading-[0.8] text-foreground lowercase">
                  <BlurText text="deploy now" />
               </h2>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-muted-foreground font-medium max-w-2xl mx-auto italic leading-relaxed"
            >
               Join the global infrastructure of 50k+ tactical volunteers. <br/>Architect the future of humanitarian response.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8"
            >
               <Link to="/signin">
                  <Button className="h-24 px-16 rounded-full bg-indigo-600 text-white text-2xl font-black gap-6 shadow-[0_0_50px_rgba(79,70,229,0.3)] hover:scale-110 hover:bg-indigo-700 active:scale-95 transition-all">
                     START PROTOCOL <Sparkles className="h-8 w-8" />
                  </Button>
               </Link>
            </motion.div>
         </div>

         <div className="mt-48 pt-12 border-t border-border/20 flex flex-col md:flex-row items-center justify-between text-[10px] font-black text-muted-foreground/20 uppercase tracking-[0.5em] max-w-[1700px] mx-auto">
            <span>© 2026 ImpactQuest Infrastructure</span>
            <div className="flex gap-12 mt-8 md:mt-0">
               <span className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Grid Online</span>
               <span>v4.0.1 Stable</span>
            </div>
         </div>
      </section>

    </div>
  )
}
