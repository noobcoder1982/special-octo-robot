import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowRight01Icon as ArrowRight,
  Shield01Icon as Shield,
  Target01Icon as Target,
  CpuIcon as Cpu,
  CheckmarkCircle01Icon as CheckCircle,
  UserIcon,
  GlobeIcon as Globe,
  Activity01Icon as Activity,
  ZapIcon as Zap
} from "hugeicons-react"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

const steps = [
  { id: 'identity', title: 'Operator Identity', icon: UserIcon, sub: 'Establish your humanitarian node.' },
  { id: 'skills', title: 'Skill Induction', icon: Cpu, sub: 'Index your strategic capabilities.' },
  { id: 'alignment', title: 'Sector Alignment', icon: Target, sub: 'Select your operational focus.' },
  { id: 'ready', title: 'Deployment Ready', icon: Shield, sub: 'Verify your tactical readiness.' }
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [formData, setFormData] = React.useState({
    bio: '',
    skills: [] as string[],
    sectors: [] as string[],
    availability: 'Part-time'
  })
  const navigate = useNavigate()

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      localStorage.setItem('isOnboardingRequired', 'false')
      navigate('/dashboard')
    }
  }

  const skillOptions = ['Logistics', 'Medical', 'Education', 'Tech Support', 'Advocacy', 'Translation']
  const sectorOptions = ['Environmental', 'Social Justice', 'Disaster Relief', 'Healthcare', 'Education']

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill) 
        : [...prev.skills, skill]
    }))
  }

  const toggleSector = (sector: string) => {
    setFormData(prev => ({
      ...prev,
      sectors: prev.sectors.includes(sector) 
        ? prev.sectors.filter(s => s !== sector) 
        : [...prev.sectors, sector]
    }))
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 relative overflow-hidden font-body">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 blur-[120px] rounded-full" />
        <div className="absolute top-0 right-0 p-24 opacity-5">
           <Globe className="h-96 w-96 text-indigo-600" />
        </div>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Progress Protocol */}
        <div className="flex justify-between items-center mb-16 px-4">
          {steps.map((step, i) => (
            <div key={step.id} className="flex flex-col items-center gap-3 relative">
               <div className={cn(
                 "h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-500 relative z-10",
                 i <= currentStep ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/30" : "bg-secondary text-muted-foreground/30 border border-border"
               )}>
                  <step.icon className="h-5 w-5" />
               </div>
               <span className={cn(
                 "text-[10px] font-black uppercase tracking-widest transition-all",
                 i === currentStep ? "text-indigo-600 opacity-100" : "text-muted-foreground opacity-30"
               )}>{step.title}</span>
               
               {i < steps.length - 1 && (
                 <div className="absolute left-[calc(100%+8px)] top-6 w-[calc(200%-110px)] h-[1px] bg-border">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: i < currentStep ? '100%' : '0%' }}
                      className="h-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]"
                    />
                 </div>
               )}
            </div>
          ))}
        </div>

        {/* Induction Content */}
        <div className="bg-card border border-border rounded-[3.5rem] p-12 md:p-16 shadow-2xl relative overflow-hidden">
           <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-12"
              >
                 <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground lowercase">
                      {steps[currentStep].title}.
                    </h2>
                    <p className="text-muted-foreground/60 text-lg font-medium">{steps[currentStep].sub}</p>
                 </div>

                 {currentStep === 0 && (
                   <div className="space-y-8">
                      <div className="space-y-3">
                         <label className="text-xs font-black uppercase tracking-widest text-indigo-600/60">Professional Brief</label>
                         <textarea 
                           placeholder="Describe your humanitarian mission in 2 sentences..."
                           className="w-full bg-secondary/30 border border-border rounded-3xl p-6 h-32 focus:border-indigo-600 outline-none transition-all resize-none text-lg font-medium"
                           value={formData.bio}
                           onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                         />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         {['Full-time Operator', 'Part-time Node', 'On-call Dispatch'].map(opt => (
                           <button 
                             key={opt}
                             onClick={() => setFormData(prev => ({ ...prev, availability: opt }))}
                             className={cn(
                               "h-14 rounded-2xl border transition-all text-xs font-bold uppercase tracking-widest",
                               formData.availability === opt ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-transparent border-border hover:border-indigo-600/40 text-muted-foreground"
                             )}
                           >
                             {opt}
                           </button>
                         ))}
                      </div>
                   </div>
                 )}

                 {currentStep === 1 && (
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {skillOptions.map(skill => (
                        <button
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          className={cn(
                            "h-20 rounded-3xl border flex flex-col items-center justify-center gap-2 transition-all group",
                            formData.skills.includes(skill) ? "bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-600/20" : "bg-transparent border-border hover:border-indigo-600/40"
                          )}
                        >
                           <span className="text-[10px] font-black uppercase tracking-widest">{skill}</span>
                           <div className={cn("h-1.5 w-1.5 rounded-full transition-colors", formData.skills.includes(skill) ? "bg-white" : "bg-border group-hover:bg-indigo-600/40")} />
                        </button>
                      ))}
                   </div>
                 )}

                 {currentStep === 2 && (
                   <div className="space-y-8">
                      <div className="flex flex-wrap gap-4">
                        {sectorOptions.map(sector => (
                          <button
                            key={sector}
                            onClick={() => toggleSector(sector)}
                            className={cn(
                              "px-8 py-4 rounded-full border text-xs font-bold uppercase tracking-widest transition-all",
                              formData.sectors.includes(sector) ? "bg-indigo-600 border-indigo-600 text-white" : "bg-secondary/40 border-border hover:border-indigo-600/40"
                            )}
                          >
                            {sector}
                          </button>
                        ))}
                      </div>
                   </div>
                 )}

                 {currentStep === 3 && (
                   <div className="flex flex-col items-center text-center space-y-8 py-8">
                      <div className="h-32 w-32 rounded-full bg-emerald-500/10 flex items-center justify-center relative">
                         <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-ping" />
                         <CheckCircle className="h-16 w-16 text-emerald-500" />
                      </div>
                      <div className="space-y-4">
                         <h3 className="text-3xl font-bold tracking-tight">System Integrity Verified</h3>
                         <p className="text-muted-foreground max-w-md mx-auto">All humanitarian nodes have been synchronized. Your tactical profile is ready for deployment.</p>
                      </div>
                   </div>
                 )}

                 <div className="flex justify-between items-center pt-12 border-t border-border">
                    <button 
                      onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                      className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Previous Stage
                    </button>
                    <Button 
                      onClick={handleNext}
                      className="h-16 px-12 rounded-[2rem] bg-indigo-600 hover:bg-black text-white font-black uppercase tracking-[0.2em] gap-4 shadow-2xl shadow-indigo-600/20 active:scale-95 transition-all"
                    >
                      {currentStep === steps.length - 1 ? 'Deploy Hub' : 'Initiate Next Phase'}
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                 </div>
              </motion.div>
           </AnimatePresence>
        </div>

        {/* Footer Metrics */}
        <div className="mt-12 flex justify-center gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/20 select-none">
           <div className="flex items-center gap-2"><Zap className="h-3 w-3" /> LATENCY: 0.02MS</div>
           <div className="flex items-center gap-2"><Shield className="h-3 w-3" /> ENCRYPTION: SHA-512</div>
           <div className="flex items-center gap-2"><Activity className="h-3 w-3" /> NODE: ACTIVE</div>
        </div>
      </div>
    </div>
  )
}
