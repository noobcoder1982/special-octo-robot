import * as React from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { 
  ArrowRight01Icon as ArrowRight, 
  PlayIcon as Play, 
  Shield01Icon as ShieldCheck, 
  FlashIcon as Zap, 
  UserGroupIcon as Users, 
  GlobeIcon as Globe, 
  Target01Icon as Target,
  SparklesIcon as Sparkles,
  CommandIcon as Command,
  Activity01Icon as Activity,
  ArrowDown01Icon as ChevronDown,
  Add01Icon as Plus,
  NewTwitterIcon as Twitter,
  GithubIcon as Github,
  Mail01Icon as Mail,
  Comment01Icon as MessageSquare
} from "hugeicons-react"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
import DashboardPreview from "./DashboardPreview"
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
      filter: "blur(40px)",
      y: 40,
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
        <motion.span variants={child} key={index} className="inline-block">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function Home() {
  const containerRef = React.useRef(null)
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false)

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isVideoPlaying && e.key === 'Enter') {
        setIsVideoPlaying(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVideoPlaying])
  
  return (
    <div ref={containerRef} className="min-h-screen bg-background font-sans selection:bg-indigo-600/10 transition-colors duration-500 overflow-x-hidden">
      

      {/* Dynamic Tactical Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-indigo-600/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
         <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-600/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Hero Section - The Command Center */}
      <section className="relative z-10 pt-48 pb-20 px-8 md:px-12 lg:px-24 flex flex-col items-center text-center">
        
        {/* Release Protocol Pill */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-indigo-600/5 border border-indigo-600/10 shadow-sm mb-12 group cursor-pointer hover:bg-indigo-600/10 transition-all font-sans"
        >
          <div className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 leading-none">Protocol Release v4.0.1 <span className="text-muted-foreground/40 ml-2 italic">Available Now</span></span>
        </motion.div>

        {/* Main Strategic Heading */}
        <div className="max-w-[1400px] space-y-12 mb-12 px-4">
            <h1 className="text-[14vw] sm:text-[12vw] lg:text-[8.5rem] font-black text-foreground leading-[0.8] tracking-tighter lowercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
               <BlurText text="strategic" /> <br />
               <BlurText text="resilience." className="outline-text" delay={0.4} />
            </h1>
           
           <motion.p 
             initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
             whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
             className="max-w-4xl mx-auto text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed tracking-tight italic"
           >
             ImpactQuest is the tactical layer for modern volunteering. A high-fidelity mission control system designed to orchestrate complex community recovery through data-rich synchronization.
           </motion.p>
        </div>

        {/* Action Protocols */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-8 mb-20 relative z-20"
        >
          <Link to="/signin">
            <Button className="h-20 px-12 rounded-[2.5rem] bg-indigo-600 text-white text-xl font-black gap-4 hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/20 active:scale-95 leading-none">
                Deploy protocol <ArrowRight className="h-6 w-6" />
            </Button>
          </Link>
          <button 
            onClick={() => setIsVideoPlaying(true)}
            className="flex items-center gap-4 group cursor-pointer"
          >
             <div className="h-20 w-20 rounded-full border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 active:scale-90 transition-all bg-white/5 backdrop-blur-xl">
                <Play className="h-6 w-6 text-white fill-current ml-1" />
             </div>
             <div className="text-left">
                <div className="text-[10px] font-black uppercase tracking-widest text-foreground/30 leading-none mb-1">Briefing</div>
                <div className="text-sm font-bold text-foreground uppercase tracking-widest leading-none">Watch Tape</div>
             </div>
          </button>
        </motion.div>

        {/* Video Overlay */}
        <AnimatePresence>
          {isVideoPlaying && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
            >
              <video 
                src="/rickroll.mp4" 
                autoPlay 
                controls
                className="w-full h-full object-contain bg-black"
                onEnded={() => setIsVideoPlaying(false)}
              />
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm font-bold tracking-widest uppercase animate-pulse">
                Press ENTER to exit
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Intelligence Preview - LIFTED UP */}
        <div className="w-full relative -mt-8 md:-mt-12">
           <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none opacity-40 animate-pulse" />
           <DashboardPreview />
        </div>
      </section>

      {/* Strategic Breakdown Section - ANNOTATIONS */}
      <section className="px-8 md:px-12 lg:px-24 py-48 max-w-[1700px] mx-auto relative">
            <div className="text-center space-y-4 mb-32">
               <span className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.4em]">Infrastructure Mapping</span>
               <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.8] lowercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  <BlurText text="Protocol analysis" />
               </h2>
            </div>

         {/* The Annotation Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
            {[
              { 
                tag: "Command Hub", 
                title: "Centralized Nav", 
                desc: "Every sector, mission, and audit log accessible via a unified strategic sidebar.",
                pos: "top-1/4 left-1/4"
              },
              { 
                tag: "Execution Grid", 
                title: "Live Auditing", 
                desc: "High-resolution XP indices and contribution tracking verified by SHA-512 protocols.",
                pos: "bottom-1/2 left-1/2"
              },
              { 
                tag: "Tactical Distribution", 
                title: "Sector Sync", 
                desc: "Multi-layered mission cards providing real-time operational status across diverse zones.",
                pos: "top-1/3 right-1/4"
              }
            ].map((node, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group p-10 rounded-[3rem] border border-white/5 bg-card/60 backdrop-blur-3xl space-y-6 hover:border-indigo-600/30 transition-all cursor-default relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                 
                 <div className="flex items-center gap-3 mb-6">
                    <div className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">{node.tag}</span>
                 </div>
                 
                 <h3 className="text-4xl font-bold tracking-tight font-signature" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{node.title}</h3>
                 <p className="text-muted-foreground text-lg font-medium leading-relaxed italic opacity-60 group-hover:opacity-100 transition-all">
                    {node.desc}
                 </p>

                 <div className="pt-8 flex items-center justify-between">
                    <div className="flex gap-2">
                       <ChevronDown className="h-4 w-4 text-indigo-600 animate-bounce" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-foreground/20 italic">Node Link Active</span>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-indigo-600/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                       <Plus className="h-4 w-4 text-indigo-600" />
                    </div>
                 </div>
              </motion.div>
            ))}
         </div>
      </section>

      {/* Feature Protocol Hub - REFINED */}
      <section className="px-8 md:px-12 lg:px-24 pb-48 max-w-[1700px] mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div className="space-y-12">
               <div>
                  <span className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Node Intelligence</span>
                  <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground leading-[0.8] lowercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                     <BlurText text="engineered for" /> <br/> 
                     <span className="text-white/20 font-black not-italic lowercase">
                        <BlurText text="pure action." delay={0.4} />
                     </span>
                  </h2>
               </div>
               <motion.p 
                 initial={{ filter: "blur(10px)", opacity: 0, y: 30 }}
                 whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                 className="text-2xl text-muted-foreground font-medium leading-relaxed max-w-xl italic border-l-4 border-indigo-600 pl-8"
               >
                  "Fragmentation is the enemy of recovery. ImpactQuest provides the single source of truth for every humanitarian deployment."
               </motion.p>
               <Button variant="ghost" className="h-20 px-0 text-foreground font-black text-[12px] uppercase tracking-[0.4em] gap-4 hover:bg-transparent hover:text-indigo-600 group">
                  Explore feature nodes <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
               </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
               {[
                  { title: "Skill Sync", desc: "Automated verification of humanitarian expertise via tactical audit.", icon: Zap },
                  { title: "Squad Core", desc: "Real-time coordination of high-priority mission squads.", icon: Users },
                  { title: "Impact Ledger", desc: "Immutable record of strategic community contributions.", icon: Command },
                  { title: "Mission Market", desc: "Real-time deployment grid for high-urgency rescue sites.", icon: Sparkles }
               ].map((f, i) => (
                  <div key={i} className="p-10 rounded-[3.5rem] border border-white/5 bg-card/40 backdrop-blur-3xl group hover:border-indigo-600/30 hover:shadow-2xl transition-all relative overflow-hidden">
                     <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:scale-110">
                        <f.icon className="h-7 w-7" />
                     </div>
                     <h4 className="text-2xl font-bold mb-4 tracking-tight font-signature" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{f.title}</h4>
                     <p className="text-muted-foreground text-base font-medium leading-relaxed italic opacity-60 group-hover:opacity-100 transition-all">{f.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Proof Grid */}
      <section className="py-24 border-y border-white/5 bg-card/10">
         <div className="max-w-[1700px] mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-16">
            {[
              { label: "Active Nodes", val: "24,519" },
              { label: "XP Audited", val: "142.8M" },
              { label: "Tactical Zones", val: "508" },
              { label: "Uptime Protocol", val: "99.98%" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2 text-center md:text-left">
                 <div className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 leading-none">{stat.label}</div>
                  <div className="text-5xl font-black text-foreground font-signature text-6xl">{stat.val}</div>
              </div>
            ))}
         </div>
      </section>

      {/* Ready to Deploy CTA */}
      <section className="py-48 px-8 md:px-12 lg:px-24 max-w-[1700px] mx-auto text-center relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-indigo-600/5 blur-[150px] rounded-full" />
         <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="space-y-12 relative z-10"
         >
            <span className="text-indigo-600 text-[11px] font-black uppercase tracking-[0.5em] block mb-8">Base Connection Active</span>
            <h2 className="text-[10vw] lg:text-[8.5rem] font-black tracking-tighter leading-[0.8] text-foreground lowercase">
               <BlurText text="deploy now" />
            </h2>
            <div className="pt-12">
               <Link to="/signin">
                  <Button className="h-24 px-16 rounded-[3rem] bg-indigo-600 text-white text-2xl font-black gap-6 hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/20 active:scale-95 leading-none">
                     Begin Induction <ArrowRight className="h-8 w-8" />
                  </Button>
               </Link>
            </div>
         </motion.div>
      </section>

      {/* Strategic Access: PRICING PROTOCOL */}
      <section className="px-8 md:px-12 lg:px-24 py-48 max-w-[1700px] mx-auto relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-indigo-600/5 blur-[250px] rounded-full pointer-events-none opacity-40" />
         
         <div className="text-center space-y-6 mb-32 relative z-10">
            <span className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.4em]">Resource Licensing</span>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-foreground leading-[0.8] lowercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
               <BlurText text="strategic" /> <br/>
               <span className="outline-text">
                  <BlurText text="access." delay={0.4} />
               </span>
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground font-medium italic opacity-60">
               Select your operational tier to leverage the full scale of the ImpactQuest global infrastructure.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {[
               { 
                  name: "Free", 
                  price: "0", 
                  desc: "Essential synchronization for solo operators.", 
                  features: ["1 Active Sector", "Standard Data Sync", "Community Briefings", "Global Decal"],
                  color: "indigo-600"
               },
               { 
                  name: "Pro", 
                  price: "29", 
                  desc: "High-fidelity coordination for tactical teams.", 
                  features: ["Unlimited Sectors", "AI Mission Briefings", "Vector Search Nodes", "Priority Sync (0.01ms)", "Team Analytics Hub"],
                  color: "indigo-600",
                  highlight: true
               },
               { 
                  name: "Ultra", 
                  price: "99", 
                  desc: "Absolute grid sovereignty for organizations.", 
                  features: ["Full Infrastructure Access", "Dedicated Neural Coordinator", "Custom Protocol Design", "White-label Briefings", "Sovereign Gold Identity"],
                  color: "amber-500",
                  ultra: true
               }
            ].map((tier, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1, duration: 0.8 }}
                 viewport={{ once: true }}
                 className={cn(
                    "p-12 rounded-[3.5rem] bg-card border flex flex-col justify-between transition-all duration-500 hover:scale-[1.02] relative overflow-hidden",
                    tier.highlight ? "border-indigo-600/40 shadow-2xl shadow-indigo-600/10 ring-4 ring-indigo-600/5" : "border-border/60 hover:border-indigo-600/30 shadow-xl",
                    tier.ultra && "border-[#EAB308]/40 shadow-2xl shadow-[#EAB308]/10 ring-4 ring-[#EAB308]/5"
                 )}
               >
                  {tier.highlight && (
                     <div className="absolute top-10 right-10 px-4 py-1.5 rounded-full bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest shadow-lg leading-none">Recommended</div>
                  )}
                  {tier.ultra && (
                     <div className="absolute top-10 right-10 px-4 py-1.5 rounded-full bg-[#EAB308] text-black text-[9px] font-black uppercase tracking-widest shadow-lg leading-none">Sovereign Tier</div>
                  )}

                  <div className="space-y-12">
                     <div className="space-y-4">
                        <span className={cn(
                           "text-[10px] font-black uppercase tracking-[0.4em]",
                           tier.ultra ? "text-[#EAB308]" : "text-indigo-600"
                        )}>{tier.name} ACCESS</span>
                        <div className="flex items-end gap-1">
                           <span className="text-xs font-black text-muted-foreground/30 mb-2 tracking-tighter">$</span>
                           <span className={cn(
                              "text-7xl font-black tracking-tighter leading-none italic",
                              tier.ultra ? "text-[#EAB308]" : "text-foreground"
                           )}>{tier.price}</span>
                           <span className="text-sm font-black text-muted-foreground/30 mb-3 ml-2 uppercase tracking-widest">/mo</span>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium italic opacity-60 h-10">{tier.desc}</p>
                     </div>

                     <div className="space-y-6">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/30">Protocol Assets</span>
                        <ul className="space-y-4">
                           {tier.features.map((feature, j) => (
                              <li key={j} className="flex items-center gap-4 text-xs font-bold text-foreground">
                                 <div className={cn(
                                    "h-1.5 w-1.5 rounded-full",
                                    tier.ultra ? "bg-[#EAB308]" : "bg-indigo-600"
                                 )} />
                                 {feature}
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>

                  <Button className={cn(
                     "w-full h-18 rounded-[1.5rem] mt-16 font-black uppercase tracking-widest text-[11px] transition-all active:scale-95",
                     tier.highlight ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20" : 
                     tier.ultra ? "bg-[#EAB308] text-black shadow-xl shadow-[#EAB308]/20" : 
                     "bg-secondary text-foreground hover:bg-foreground hover:text-background"
                  )}>
                     Initialize {tier.name}
                  </Button>
               </motion.div>
            ))}
         </div>
      </section>

      {/* Cinematic Awwwards-Level Tactical Footer */}
      <footer className="relative bg-card pt-32 pb-16 px-8 md:px-12 lg:px-24 overflow-hidden border-t border-border/40">
         {/* Massive Ghost Heading behind footer */}
         <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 pointer-events-none opacity-[0.01] select-none">
            <h2 className="text-[30vw] font-black tracking-tighter uppercase whitespace-nowrap" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>IMPACT QUEST</h2>
         </div>

         <div className="max-w-[1700px] mx-auto relative z-10">
            {/* Top Grid: Brand & Nav */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
               
               {/* Column 1: Brand & Briefing */}
               <div className="lg:col-span-5 space-y-12">
                  <div className="space-y-6">
                     <Link to="/" className="flex items-center gap-4 group">
                        <div className="h-12 w-12 rounded-2xl bg-foreground text-background flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                           <span className="font-black text-2xl italic">IQ</span>
                        </div>
                        <span className="text-xl font-black tracking-[0.4em] text-foreground lowercase">impactquest</span>
                     </Link>
                     <p className="text-xl text-muted-foreground font-medium max-w-sm italic leading-relaxed">
                        The single source of truth for global humanitarian response and strategic volunteer deployment.
                     </p>
                  </div>

                  {/* Tactical Briefing Sign-up */}
                  <div className="space-y-6">
                     <div className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">Protocol Briefing</div>
                     <div className="flex gap-2 max-w-sm border-b border-border/40 pb-4 focus-within:border-indigo-600 transition-colors">
                        <input 
                           type="email" 
                           placeholder="Enter operator email..." 
                           className="bg-transparent border-none outline-none text-foreground font-medium placeholder:text-muted-foreground/30 flex-1 px-0"
                        />
                        <button className="text-[10px] font-black uppercase tracking-widest text-foreground hover:text-indigo-600 transition-colors">Subscribe</button>
                     </div>
                  </div>
               </div>

               {/* Column 2: Tactical Nodes (Links) */}
               <div className="lg:col-span-2 space-y-8">
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 text-left">Infrastructure</div>
                  <ul className="space-y-4 text-left">
                     {['Dashboard', 'Quest Board', 'Impact Score', 'Marketplace', 'Resources'].map(link => (
                        <li key={link}><Link to="#" className="text-sm font-bold text-foreground/60 hover:text-indigo-600 transition-colors italic leading-none block">{link}</Link></li>
                     ))}
                  </ul>
               </div>

               {/* Column 3: Governance */}
               <div className="lg:col-span-2 space-y-8">
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 text-left">Governance</div>
                  <ul className="space-y-4 text-left">
                     {['Audit Protocol', 'Sector Rules', 'Privacy Key', 'Hardware Check', 'Grid Terms'].map(link => (
                        <li key={link}><Link to="#" className="text-sm font-bold text-foreground/60 hover:text-indigo-600 transition-colors italic leading-none block">{link}</Link></li>
                     ))}
                  </ul>
               </div>

               {/* Column 4: Command Center */}
               <div className="lg:col-span-3 space-y-8">
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 text-left">Command Center</div>
                  <div className="space-y-6">
                     <div className="p-6 rounded-3xl bg-secondary/30 border border-border/40 backdrop-blur-xl">
                        <div className="text-[9px] font-black uppercase tracking-widest text-indigo-600 mb-2 text-left">Live Node Performance</div>
                        <div className="flex items-end gap-1 h-8">
                           {[20, 45, 30, 60, 40, 55, 70, 40, 50, 65].map((h, i) => (
                              <div key={i} className="flex-1 bg-indigo-600/20 rounded-t-sm animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
                           ))}
                        </div>
                     </div>
                     <div className="flex gap-4">
                        {[Twitter, Github, Mail, MessageSquare].map((Icon, i) => (
                           <a key={i} href="#" className="h-12 w-12 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground hover:bg-foreground hover:text-background transition-all">
                              <Icon className="h-5 w-5" />
                           </a>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            {/* Bottom Bar: Final Specs */}
            <div className="pt-16 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/30">
               <div className="flex items-center gap-6">
                  <span>© 2026 IQ Infrastructure</span>
                  <div className="flex items-center gap-2">
                     <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> 
                     <span>Primary Grid Online</span>
                  </div>
               </div>
               <div className="flex gap-12">
                  <span className="flex items-center gap-2">SYNC_LATENCY: <span className="text-foreground">0.02ms</span></span>
                  <span className="text-foreground flex items-center gap-2">UPTIME: <span className="text-foreground">99.98%</span></span>
               </div>
               <div className="flex items-center gap-2 italic">
                  ENCRYPTED VIA SHA-512 PROTOCOL
               </div>
            </div>
         </div>
      </footer>

    </div>
  )
}
