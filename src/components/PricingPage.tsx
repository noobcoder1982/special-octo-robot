import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FlashIcon as Zap, 
  Shield01Icon as ShieldCheck, 
  GlobeIcon as Globe, 
  ArrowRight01Icon as ArrowRight, 
  CheckmarkCircle01Icon as CheckCircle2, 
  CancelCircleIcon as XCircle,
  Add01Icon as Plus,
  ArrowDown01Icon as ChevronDown,
  CpuIcon as Cpu,
  Target01Icon as Target,
  Activity01Icon as Activity,
  SparklesIcon as Sparkles,
  Layers01Icon as Layers,
  FingerPrintIcon as Fingerprint,
  LockIcon as Lock,
  ArrowRight01Icon as ChevronRight,
  Infinity01Icon as InfinityIcon,
  HardDriveIcon as HardDrive,
  NeuralNetworkIcon as Network,
  InformationCircleIcon as HelpCircle,
  Tick01Icon as Check,
  Cancel01Icon as X,
  UserGroupIcon as Users,
  Calendar01Icon as Calendar,
  AnalyticsUpIcon as BarChart3,
  Comment01Icon as MessageSquare,
  Shield01Icon as Shield,
  InformationCircleIcon as LifeBuoy
} from "hugeicons-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

// --- PRODUCTION READY UTILITIES ---

const BlurText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const letters = text.split("");
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.02, delayChildren: delay }}
      className={cn("inline-flex flex-wrap", className)}
    >
      {letters.map((letter, index) => (
        <motion.span 
          key={index}
          initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'yearly'>('monthly');

  const comparisonFeatures = [
    { id: "chapters", label: "Active Chapters & Locations" },
    { id: "comms", label: "Group Communication Tools" },
    { id: "tracking", label: "Volunteer Hour & Impact Tracking" },
    { id: "matching", label: "AI-Powered Skill Matching" },
    { id: "reports", label: "Advanced Impact Analytics" },
    { id: "support", label: "Dedicated Success Specialist" },
    { id: "roles", label: "Custom Coordinator Roles" },
    { id: "branding", label: "Organization Custom Branding" },
  ];

  const tiers = [
    { 
       name: "Community", 
       price: "0", 
       desc: "Essential coordinating tools for local groups and small initiatives.", 
       comparison: {
         chapters: "1 Active Chapter",
         comms: true,
         tracking: "Unlimited Logs",
         matching: false,
         reports: "Basic Export",
         support: false,
         roles: false,
         branding: false,
       },
       tag: "Free Forever"
    },
    { 
       name: "Impact", 
       price: billingCycle === 'monthly' ? "49" : "36", 
       desc: "Precision management for growing non-profits and NGOs.", 
       comparison: {
         chapters: "10 Activity Zones",
         comms: true,
         tracking: "Automated Verification",
         matching: true,
         reports: "Live Dashboards",
         support: true,
         roles: true,
         branding: false,
       },
       highlight: true,
       tag: "Recommended"
    },
    { 
       name: "Enterprise", 
       price: billingCycle === 'monthly' ? "149" : "112", 
       desc: "Full-scale governance for global humanitarian operations.", 
       comparison: {
         chapters: "Unlimited Regions",
         comms: true,
         tracking: "Blockchain Verified",
         matching: true,
         reports: "Custom Audits",
         support: "24/7 Priority",
         roles: true,
         branding: true,
       },
       ultra: true,
       tag: "Large-Scale"
    }
  ];

  const faqs = [
    { q: "What defines an 'Active Chapter'?", a: "A chapter is a localized team or geographical location that manages its own volunteers and missions independently." },
    { q: "Can we upgrade our plan at any time?", a: "Absolutely. You can scale your plan as your community grows. New features are unlocked immediately upon synchronization." },
    { q: "Do you offer discounts for registered NGOs?", a: "Yes. ImpactQuest provides subsidized pricing for verified humanitarian non-profit organizations. Reach out to our community team." },
    { q: "How secure is our volunteer data?", a: "We prioritize privacy. All volunteer data is secured using industry-standard encryption and complies with global data protection regulations." }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-indigo-600/20 transition-colors duration-500 overflow-x-hidden pt-40 pb-32">
      
      {/* 1. ATMOSPHERIC CANVAS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,hsla(var(--primary),0.1),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 space-y-40">
         
         {/* 2. HEADER BRIEFING */}
         <div className="text-center space-y-10">
            <div className="flex justify-center">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-secondary/80 border border-border/40 backdrop-blur-xl shadow-lg"
               >
                  <Users className="h-3.5 w-3.5 text-primary" />
                  <span className="text-foreground/80 text-[10px] font-black uppercase tracking-[0.4em] leading-none">Choose Your Impact Level</span>
               </motion.div>
            </div>
            
            <div className="space-y-6">
               <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] lowercase">
                  <BlurText text="community" /> <br/>
                  <span className="text-primary/40 italic">
                     <BlurText text="support." delay={0.4} />
                  </span>
               </h1>
            </div>

            {/* BILLING TOGGLE */}
            <div className="flex justify-center pt-8">
               <div className="p-1.5 bg-secondary/50 rounded-2xl border border-border/60 flex items-center gap-2 backdrop-blur-2xl shadow-xl relative">
                  <button 
                    onClick={() => setBillingCycle('monthly')}
                    className={cn(
                      "relative z-10 px-10 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300",
                      billingCycle === 'monthly' ? "bg-foreground text-background shadow-lg" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Monthly
                  </button>
                  <button 
                    onClick={() => setBillingCycle('yearly')}
                    className={cn(
                      "relative z-10 px-10 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300",
                      billingCycle === 'yearly' ? "bg-foreground text-background shadow-lg" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Yearly
                    <span className="absolute -top-3 -right-2 px-3 py-1 bg-indigo-600 text-white text-[9px] font-bold rounded-full shadow-lg">-25% Off</span>
                  </button>
               </div>
            </div>
         </div>

         {/* 3. THE COMPARISON GRID */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-12">
            {tiers.map((tier, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1, duration: 0.6 }}
                 viewport={{ once: true }}
                 className={cn(
                    "p-12 rounded-[3.5rem] bg-card border flex flex-col justify-between transition-all duration-500 relative group overflow-hidden",
                    tier.highlight ? "border-purple-600/40 ring-4 ring-purple-600/5 shadow-2xl scale-[1.02] z-10" : "border-border/60",
                    tier.ultra && "border-amber-500/40 ring-4 ring-amber-500/5 shadow-2xl"
                 )}
               >
                  <div className="space-y-12 relative z-10">
                     <div className="space-y-6">
                        <div className="flex items-center justify-between">
                           <span className={cn(
                              "text-[11px] font-black uppercase tracking-[0.4em]",
                              tier.ultra ? "text-amber-500" : tier.highlight ? "text-purple-600" : "text-muted-foreground"
                           )}>{tier.name}</span>
                           <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-secondary text-muted-foreground border border-border/40">
                              {tier.tag}
                           </span>
                        </div>
                        <div className="flex items-end gap-1">
                           <span className="text-xl font-black text-muted-foreground/30 mb-8 tracking-tighter leading-none">$</span>
                           <span className={cn(
                              "text-8xl font-black tracking-tighter leading-none italic",
                              tier.ultra ? "text-amber-500" : "text-foreground"
                           )}>{tier.price}</span>
                           <span className="text-sm font-black text-muted-foreground/30 mb-4 ml-2 uppercase tracking-widest">/mo</span>
                        </div>
                        <p className="text-base text-muted-foreground font-medium italic opacity-70 leading-relaxed h-12">
                           {tier.desc}
                        </p>
                     </div>

                     <div className="space-y-8">
                        <div className="flex items-center justify-between opacity-30">
                           <span className="text-[10px] font-black uppercase tracking-[0.4em]">Feature Set</span>
                           <div className="h-px flex-1 bg-foreground/20 ml-4" />
                        </div>
                        <ul className="space-y-6">
                           {comparisonFeatures.map((feat) => {
                             const value = tier.comparison[feat.id as keyof typeof tier.comparison];
                             const isIncluded = value !== false;
                             
                             return (
                               <li key={feat.id} className="group/item">
                                 <div className="flex items-center justify-between gap-4">
                                   <div className="flex items-center gap-3 min-w-0">
                                      <div className={cn(
                                        "h-6 w-6 rounded-lg flex items-center justify-center transition-all",
                                        isIncluded 
                                          ? (tier.ultra ? "bg-amber-500/10 text-amber-500" : tier.highlight ? "bg-purple-600/10 text-purple-600" : "bg-indigo-600/10 text-indigo-600")
                                          : "bg-secondary text-muted-foreground/20 opacity-40"
                                      )}>
                                        {isIncluded ? <Check className="h-4 w-4 stroke-[3px]" /> : <X className="h-4 w-4 stroke-[3px]" />}
                                      </div>
                                      <span className={cn(
                                        "text-xs font-black tracking-tight leading-none lowercase",
                                        isIncluded ? "text-foreground" : "text-muted-foreground/40"
                                      )}>
                                        {feat.label}
                                      </span>
                                   </div>
                                   {typeof value === 'string' && (
                                     <span className={cn(
                                       "text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded bg-secondary/50 border border-border/40 whitespace-nowrap",
                                       tier.ultra ? "text-amber-500" : tier.highlight ? "text-purple-600" : "text-indigo-600"
                                     )}>{value}</span>
                                   )}
                                 </div>
                               </li>
                             );
                           })}
                        </ul>
                     </div>
                  </div>

                  <Button className={cn(
                     "w-full h-18 rounded-[1.5rem] mt-16 font-black uppercase tracking-widest text-[11px] transition-all active:scale-95 z-10",
                     tier.highlight ? "bg-purple-600 text-white shadow-xl shadow-purple-600/20" : 
                     tier.ultra ? "bg-amber-500 text-black shadow-xl shadow-amber-500/20" : 
                     "bg-secondary/80 text-foreground hover:bg-foreground hover:text-background border border-border/40"
                  )}>
                     {tier.price === "0" ? "Start Free" : "Upgrade Plan"}
                  </Button>
               </motion.div>
            ))}
         </div>

         {/* 4. ORGANIZATION HUB */}
         <section className="relative pt-24">
            <div className="p-12 md:p-24 rounded-[4rem] bg-card border border-border/40 backdrop-blur-xl relative overflow-hidden group shadow-2xl">
               <div className="absolute top-0 right-0 p-24 opacity-[0.03] group-hover:rotate-6 transition-transform duration-1000">
                  <Globe className="h-64 w-64 text-foreground" />
               </div>
               
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10 text-left">
                  <div className="space-y-10">
                     <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <div className="h-10 w-10 rounded-2xl bg-foreground text-background flex items-center justify-center shadow-lg">
                              <Shield className="h-5 w-5" />
                           </div>
                           <span className="text-indigo-600 text-[11px] font-black uppercase tracking-[0.4em]">Organization Controls</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] lowercase">enterprise <br/> <span className="text-muted-foreground/30 italic">briefing.</span></h2>
                     </div>
                     <p className="text-2xl text-muted-foreground font-medium italic leading-relaxed max-w-xl opacity-80">
                        Managing a global network? Our enterprise suite provides multisite governance, specialized data auditing, and dedicated organizational onboarding.
                     </p>
                     <Button variant="outline" className="h-18 px-12 rounded-[1.5rem] font-black uppercase tracking-widest text-[12px] gap-6 shadow-sm hover:bg-foreground hover:text-background transition-all">
                        Contact Partner Team <ArrowRight className="h-5 w-5" />
                     </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8">
                     {[
                        { label: "Platform Uptime", val: "99.98%", icon: Activity },
                        { label: "Sync Latency", val: "Real-time", icon: Cpu },
                        { label: "Data Security", val: "SOC 2 Type II", icon: ShieldCheck },
                        { label: "Grid Status", val: "Nominal", icon: Globe }
                     ].map((stat, i) => (
                        <div key={i} className="p-8 rounded-[2rem] bg-secondary/30 border border-border/40 group/stat hover:bg-secondary transition-all">
                           <stat.icon className="h-6 w-6 text-indigo-600 mb-6 group-hover/stat:scale-110 transition-transform" />
                           <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 mb-2">{stat.label}</div>
                           <div className="text-4xl font-black italic tracking-tighter text-foreground">{stat.val}</div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* 5. FAQ */}
         <section className="space-y-20 pt-10">
            <div className="text-center space-y-6">
               <h2 className="text-6xl md:text-8xl font-black tracking-tighter lowercase">operational <span className="text-muted-foreground/30 italic">briefing:</span> faq.</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {faqs.map((faq, i) => (
                  <motion.div 
                    key={i} 
                    className="p-12 rounded-[3.5rem] bg-card border border-border/60 hover:border-indigo-600/30 transition-all group relative"
                  >
                     <div className="flex gap-10">
                        <div className="h-12 w-12 shrink-0 rounded-2xl bg-secondary border border-border/60 flex items-center justify-center text-indigo-600 font-black italic text-2xl shadow-sm">?</div>
                        <div className="space-y-6 text-left">
                           <h4 className="text-2xl font-black tracking-tight text-foreground leading-tight">{faq.q}</h4>
                           <p className="text-xl text-muted-foreground leading-relaxed italic font-medium opacity-60">
                              {faq.a}
                           </p>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
            
            <div className="pt-24 text-center">
               <div className="inline-flex items-center gap-6 px-10 py-3 rounded-full bg-secondary/50 border border-border/40 text-[11px] font-black uppercase tracking-widest text-muted-foreground/40">
                  <LifeBuoy className="h-4 w-4" /> 24/7 Platform Health Systems Active
               </div>
            </div>
         </section>

      </div>
    </div>
  )
}
