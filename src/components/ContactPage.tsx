import * as React from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { 
  ArrowRight, 
  Mail, 
  Twitter, 
  Github, 
  MessageSquare, 
  Globe,
  Plus,
  ArrowUpRight,
  Cpu,
  Shield,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

const BlurText = ({ text, className, delay = 0, stagger = 0.015 }: { text: string, className?: string, delay?: number, stagger?: number }) => {
  const letters = text.split("");
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
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
      filter: "blur(20px)",
      y: 10,
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

const ContactVector = ({ label, value, sub, icon: Icon, delay = 0 }: any) => (
  <motion.a
    href="#"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    viewport={{ once: true }}
    className="group block relative py-12 border-b border-foreground/10 hover:bg-foreground/[0.02] transition-colors px-4"
  >
    <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.4em]">{label}</span>
          <div className="h-1 w-1 rounded-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 italic">{sub}</span>
        </div>
        <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground group-hover:translate-x-4 transition-transform duration-500">
          {value}
        </h3>
      </div>
      <div className="flex items-center gap-6">
        <div className="h-16 w-16 rounded-full border border-foreground/10 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all group-hover:scale-110">
          <Icon className="h-6 w-6 group-hover:text-white transition-colors" />
        </div>
        <ArrowUpRight className="h-8 w-8 text-muted-foreground/20 group-hover:text-indigo-600 group-hover:rotate-45 transition-all duration-500" />
      </div>
    </div>
  </motion.a>
);

export default function ContactPage() {
  const [formData, setFormData] = React.useState({ name: '', email: '', role: 'Volunteer', message: '' });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-indigo-600/10 transition-colors duration-1000 overflow-x-hidden">
      
      {/* Background Texture & Grain */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[1]">
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      {/* 1. HERO TYPOGRAPHY BLOCK */}
      <section className="pt-48 pb-24 px-8 md:px-12 lg:px-24 max-w-[1700px] mx-auto relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-4 mb-12">
            <Cpu className="h-5 w-5 text-indigo-600" />
            <span className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.5em]">Induction Center // v4.0.1</span>
          </div>
          
          <h1 className="text-[12vw] lg:text-[10rem] font-bold tracking-tighter leading-[0.85] text-foreground lowercase">
            <BlurText text="initiate a" /> <br/>
            <span className="text-foreground/10 italic outline-text">
               <BlurText text="strategic" delay={0.2} />
            </span> <br/>
            <BlurText text="handshake." delay={0.4} />
          </h1>
          
          <div className="flex flex-col md:flex-row gap-12 mt-24 items-start">
            <p className="max-w-xl text-2xl text-muted-foreground font-medium italic border-l-4 border-indigo-600 pl-8 leading-relaxed">
              "Every signal received is indexed into our global mission grid. We are currently accepting new agency partnerships and high-tier volunteer nodes."
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Current Grid Status</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-bold text-foreground italic">Primary Induction Hub Online</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTACT METHODS AS DESIGN ELEMENTS */}
      <section className="mt-32 border-t border-foreground/10 pb-32">
        <ContactVector label="direct_briefing" value="hq@impactquest.org" sub="fastest response" icon={Mail} delay={0.1} />
        <ContactVector label="tactical_chat" value="@impactquest_hub" sub="operational updates" icon={Twitter} delay={0.2} />
        <ContactVector label="dev_repository" value="github.com/quest-infra" sub="open protocols" icon={Github} delay={0.3} />
        <ContactVector label="secure_comms" value="induction_node_01" sub="encrypted via sha-512" icon={Shield} delay={0.4} />
      </section>

      {/* 3. FORM (REIMAGINED AS INLINE INDUCTION) */}
      <section className="py-48 px-8 md:px-12 lg:px-24 bg-card/10 backdrop-blur-3xl relative overflow-hidden flex flex-col items-center">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none" />
         
         <div className="max-w-5xl w-full relative z-10">
            <AnimatePresence mode="wait">
               {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-12 py-24"
                  >
                     <div className="h-32 w-32 rounded-full bg-indigo-600 flex items-center justify-center mx-auto shadow-2xl shadow-indigo-600/40">
                        <motion.div
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1 }}
                        >
                           <Zap className="h-16 w-16 text-white" />
                        </motion.div>
                     </div>
                     <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground lowercase">Signal Broadcasting...</h2>
                     <p className="text-2xl text-muted-foreground font-medium italic max-w-2xl mx-auto">
                        Your mission profile has been hashed and indexed. A tactical operator will verify your credentials shortly.
                     </p>
                     <button 
                       onClick={() => setIsSuccess(false)}
                       className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600 hover:text-foreground transition-colors"
                     >
                        Initialize New Handshake
                     </button>
                  </motion.div>
               ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-24"
                  >
                     <div className="text-center space-y-4">
                        <span className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.4em]">Protocol Induction</span>
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-foreground lowercase italic">
                           Induction Payload
                        </h2>
                     </div>

                     <form onSubmit={handleSubmit} className="text-[3vw] lg:text-[2.5rem] font-bold tracking-tight text-foreground leading-[1.6]">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-6">
                           <span>Hi, I am</span>
                           <input 
                             required
                             type="text" 
                             placeholder="[Operator Name]"
                             className="bg-transparent border-b-2 border-foreground/10 focus:border-indigo-600 outline-none px-2 py-1 placeholder:text-muted-foreground/10 transition-colors w-full md:w-auto min-w-[300px]"
                           />
                           <span>and I represent a</span>
                           <select 
                             className="bg-transparent border-b-2 border-foreground/10 focus:border-indigo-600 outline-none px-2 py-1 cursor-pointer transition-colors text-indigo-600 italic"
                           >
                              <option className="bg-background">Humanitarian Node</option>
                              <option className="bg-background">Technical Fleet</option>
                              <option className="bg-background">Strategic Partner</option>
                              <option className="bg-background">Individual Operator</option>
                           </select>
                           <span>. My communication frequency is</span>
                           <input 
                             required
                             type="email" 
                             placeholder="[operator@grid.node]"
                             className="bg-transparent border-b-2 border-foreground/10 focus:border-indigo-600 outline-none px-2 py-1 placeholder:text-muted-foreground/10 transition-colors w-full md:w-auto min-w-[400px]"
                           />
                           <span>. I am initiating this handshake to brief you on:</span>
                           <textarea 
                             required
                             placeholder="[Brief payload contents here...]"
                             className="w-full bg-secondary/20 border-2 border-foreground/10 rounded-3xl p-8 text-xl font-medium focus:border-indigo-600/50 outline-none transition-all mt-12 min-h-[200px] placeholder:text-muted-foreground/10"
                           />
                        </div>

                        <div className="mt-24 flex flex-col items-center gap-8">
                           <button 
                             disabled={isSubmitting}
                             className="group relative h-32 w-full max-w-sm rounded-full bg-foreground text-background overflow-hidden transition-all active:scale-95"
                           >
                              <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                              <div className="relative z-10 flex items-center justify-center gap-6">
                                 <span className="text-2xl font-black uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                                    {isSubmitting ? 'Syncing...' : 'Broadcast Signal'}
                                 </span>
                                 <ArrowRight className="h-8 w-8 group-hover:text-white transition-colors group-hover:translate-x-2" />
                              </div>
                           </button>
                           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/30">
                              By broadcasting, you agree to the tactical engagement terms of the grid.
                           </p>
                        </div>
                     </form>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </section>

      {/* 4. FINAL CTA MOMENT */}
      <footer className="pt-48 pb-16 px-8 md:px-12 lg:px-24 max-w-[1700px] mx-auto border-t border-foreground/10">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-end">
            <div className="space-y-12">
               <h2 className="text-[10vw] lg:text-[7.5rem] font-black tracking-tighter leading-none text-foreground lowercase">
                  beyond <br/> <span className="text-foreground/5 italic outline-text">the grid.</span>
               </h2>
               <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/20">
                  <span>LATENCY: 0.02MS</span>
                  <span>LOAD: OPTIMAL</span>
                  <span>REGISTRY: GLOBAL</span>
               </div>
            </div>
            <div className="flex flex-col items-end gap-12 text-right">
               <div className="flex gap-4">
                  {[Twitter, Github, MessageSquare].map((Icon, i) => (
                    <a key={i} href="#" className="h-16 w-16 rounded-full border border-foreground/10 flex items-center justify-center hover:bg-foreground hover:text-background transition-all group">
                       <Icon className="h-6 w-6" />
                    </a>
                  ))}
               </div>
               <p className="text-xl text-muted-foreground font-medium italic opacity-40 max-w-md">
                  Powered by the mission control core of ImpactQuest Infrastructure. v4.0.1 Stable Protocol.
               </p>
            </div>
         </div>
         <div className="mt-32 pt-12 border-t border-foreground/10 text-center">
            <span className="text-[10px] font-black uppercase tracking-[1em] text-muted-foreground/10 select-none">IMPACTQUEST_PROTOCOLS_ACTIVE</span>
         </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .outline-text {
          -webkit-text-stroke: 1.5px hsla(var(--foreground), 0.3);
          color: hsla(var(--foreground), 0.05);
          transition: all 0.5s ease;
        }
        .dark .outline-text {
          -webkit-text-stroke: 1.5px hsla(var(--foreground), 0.4);
        }
        @media (max-width: 1024px) {
          .outline-text {
            -webkit-text-stroke: 0.8px hsla(var(--foreground), 0.3);
          }
        }
      `}} />
    </div>
  )
}
