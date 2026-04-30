import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { 
  Shield01Icon as Shield, 
  Target01Icon as Target, 
  FlashIcon as Zap, 
  GlobeIcon as Globe, 
  CpuIcon as Cpu, 
  CommandIcon as Command 
} from "hugeicons-react"
import { cn } from "@/lib/utils"

const BlurText = ({ text, className, delay = 0, stagger = 0.02 }: { text: string, className?: string, delay?: number, stagger?: number }) => {
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
        <motion.span variants={child} key={index} className="inline-block leading-none">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function AboutPage() {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 500]);

  return (
    <div ref={containerRef} className="min-h-[300vh] bg-background selection:bg-indigo-600/10 transition-colors duration-1000">
      
      {/* Sector 1: Massive Typographic Induction */}
      <section className="h-screen flex flex-col justify-center px-8 md:px-12 lg:px-24 relative overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-indigo-600/5 blur-[200px] rounded-full pointer-events-none" />
         
         <div className="relative z-10 space-y-12">
            <div className="flex items-center gap-4">
               <Shield className="h-5 w-5 text-indigo-600" />
               <span className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.4em]">Governance Protocol v9.0</span>
            </div>
            
            <h1 className="text-[15vw] lg:text-[14rem] font-black tracking-tighter leading-[0.8] text-foreground lowercase">
               <BlurText text="we are" /> <br/>
               <span className="text-foreground/10 italic outline-text">
                  <BlurText text="impactquest." delay={0.4} />
               </span>
            </h1>

            <p className="max-w-3xl text-2xl md:text-3xl text-muted-foreground font-medium leading-relaxed italic border-l-8 border-indigo-600 pl-12">
               "Built on the ruins of fragmented efforts, ImpactQuest is the high-fidelity orchestration layer for global humanitarian deployment."
            </p>
         </div>

         {/* Background Ghost Text */}
         <div className="absolute bottom-10 right-10 opacity-[0.02] select-none">
            <h2 className="text-[20vw] font-black tracking-tighter leading-none lowercase">GENESIS</h2>
         </div>
      </section>

      {/* Sector 2: Cinematic Kinetic Typography */}
      <section className="h-screen flex flex-col justify-center overflow-hidden border-y border-white/5 bg-black/5 relative">
         <motion.div style={{ x: x1 }} className="whitespace-nowrap">
            <h2 className="text-[18vw] font-black tracking-tighter text-foreground/10 lowercase outline-text">tactical. engineered. resilient. strategic.</h2>
         </motion.div>
         <div className="py-12 px-8 md:px-24 flex justify-between items-center relative z-10">
            <div className="max-w-2xl space-y-8">
               <h3 className="text-5xl font-bold tracking-tight text-foreground lowercase">
                  <BlurText text="our core methodology" />
               </h3>
               <p className="text-xl text-muted-foreground leading-relaxed italic opacity-60">
                  Every mission profile on our grid is verified through a multi-layered audit protocol. We don't just coordinate; we engineer impact with mathematical precision.
               </p>
            </div>
            <div className="hidden lg:flex flex-col items-end gap-2 text-right opacity-20">
               <div className="text-xs font-black uppercase tracking-widest text-indigo-600">Verification Rate</div>
               <div className="text-8xl font-black italic">99.9%</div>
            </div>
         </div>
         <motion.div style={{ x: x2 }} className="whitespace-nowrap">
            <h2 className="text-[18vw] font-black tracking-tighter text-foreground/10 lowercase outline-text text-right">unified. precise. mission-centric. automated.</h2>
         </motion.div>
      </section>

      {/* Sector 3: High-Density Operational Grid */}
      <section className="min-h-screen py-48 px-8 md:px-12 lg:px-24 max-w-[1700px] mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-48 items-center">
            <div className="space-y-24">
               {[
                  { tag: "01", title: "Autonomous Indexing", desc: "Real-time parsing of global humanitarian data nodes to identify high-urgency rescue sites before they escalate.", icon: Cpu },
                  { tag: "02", title: "Neural Skill Mapping", desc: "Analyzing volunteer trajectories to deploy the most compatible expertise to the most critical sectors.", icon: Target },
                  { tag: "03", title: "Immutable Audit", desc: "Every contribution is hashed and verified, creating a transparent ledger of community resilience.", icon: Command }
               ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="group space-y-6"
                  >
                     <div className="flex items-center gap-4">
                        <span className="text-indigo-600 font-black text-xs font-mono tracking-widest">{item.tag} //</span>
                        <h4 className="text-4xl font-bold tracking-tight text-foreground lowercase">
                           <BlurText text={item.title} delay={0.2} />
                        </h4>
                     </div>
                     <p className="text-xl text-muted-foreground font-medium leading-relaxed italic border-l-4 border-indigo-600/20 pl-8 group-hover:border-indigo-600 transition-all">
                        {item.desc}
                     </p>
                  </motion.div>
               ))}
            </div>

            <div className="relative">
               <div className="aspect-[4/5] rounded-[4rem] bg-indigo-600/5 border border-indigo-600/10 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full p-20 flex flex-col justify-between">
                     <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600">Observation Mode</span>
                     <h5 className="text-6xl font-black text-foreground lowercase">beyond <br/> <span className="text-muted-foreground/20 italic">coordination.</span></h5>
                     <div className="space-y-8">
                        <div className="h-1 w-full bg-indigo-600/10 overflow-hidden rounded-full">
                           <motion.div 
                             initial={{ width: 0 }}
                             whileInView={{ width: '85%' }}
                             transition={{ duration: 2, ease: "easeOut" }}
                             className="h-full bg-indigo-600"
                           />
                        </div>
                        <p className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground/40">Grid Saturation Levels: Active</p>
                     </div>
                  </div>
               </div>

               {/* Geometric Accents */}
               <div className="absolute -top-12 -right-12 h-32 w-32 bg-indigo-600/20 blur-[60px] rounded-full animate-pulse" />
               <div className="absolute -bottom-20 -left-20 h-64 w-64 bg-purple-600/10 blur-[100px] rounded-full" />
            </div>
         </div>
      </section>

      {/* Sector 4: Final Induction */}
      <section className="h-[80vh] flex flex-col justify-center items-center text-center px-8">
         <div className="space-y-12 max-w-4xl">
            <h2 className="text-[8vw] lg:text-[8rem] font-black tracking-tighter leading-[0.8] text-foreground lowercase">
               <BlurText text="join the protocol." />
            </h2>
            <p className="text-2xl text-muted-foreground font-medium italic opacity-60">
               We don't just build software; we architect the infrastructure of human kindness.
            </p>
            <div className="pt-12">
               <button className="h-24 px-16 rounded-[3rem] bg-indigo-600 text-white text-2xl font-black gap-6 hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/20 active:scale-95 leading-none">
                  Deploy Profile
               </button>
            </div>
         </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .outline-text {
          -webkit-text-stroke: 1.5px hsla(var(--foreground), 0.3);
          color: hsla(var(--foreground), 0.05);
        }
        .dark .outline-text {
          -webkit-text-stroke: 1.5px hsla(var(--foreground), 0.4);
        }
      `}} />
    </div>
  )
}
