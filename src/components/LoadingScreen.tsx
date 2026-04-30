import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = React.useState(0)
  const text = "ImpactQuest"

  React.useEffect(() => {
    const duration = 3500 // 3.5 seconds total
    const interval = 30 
    const step = 100 / (duration / interval)
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + step
      })
    }, interval)

    const completionTimer = setTimeout(() => {
      onComplete()
    }, duration + 800)

    return () => {
      clearInterval(timer)
      clearTimeout(completionTimer)
    }
  }, [onComplete])

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const letterVariant = {
    hidden: { opacity: 0, filter: "blur(20px)", y: 5 },
    visible: { 
      opacity: 1, 
      filter: "blur(0px)", 
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(30px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-[#030303] flex flex-col items-center justify-center overflow-hidden"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Absolute Minimalist Center */}
      <div className="relative flex flex-col items-center gap-20 w-full max-w-xl">
         
         {/* Letter-by-Letter Staggered Blur Reveal */}
         <motion.div 
           variants={container}
           initial="hidden"
           animate="visible"
           className="flex items-center justify-center overflow-visible"
         >
            {text.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={letterVariant}
                className={cn(
                  "text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter text-white inline-block",
                  i >= 6 ? "opacity-30 font-light" : "opacity-100" // "Quest" part
                )}
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {char}
              </motion.span>
            ))}
         </motion.div>

         {/* Intense White Glowy Progress Interface */}
         <div className="w-full max-w-sm space-y-6">
            <div className="w-full h-1.5 bg-white/5 rounded-full relative overflow-hidden backdrop-blur-sm">
               {/* Core White Bar */}
               <motion.div 
                  className="absolute inset-y-0 left-0 rounded-full z-10"
                  style={{ backgroundColor: "#ffffff" }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
               />
               
               {/* Primary White Plasma Glow */}
               <motion.div 
                  className="absolute inset-y-0 left-0 blur-md opacity-70 rounded-full"
                  style={{ backgroundColor: "#ffffff" }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
               />
               
               {/* Secondary Atmospheric Bloom */}
               <motion.div 
                  className="absolute inset-y-0 left-0 blur-xl opacity-30 rounded-full"
                  style={{ backgroundColor: "#ffffff" }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
               />
               
               {/* Inner Specular Highlight */}
               <motion.div 
                  className="absolute inset-x-0 top-0.5 h-[1px] rounded-full mx-2"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress - 5}%` }}
               />
            </div>
            
            {/* Minimalist Tech Stats */}
            <div className="flex justify-between items-center px-1">
               <div className="flex items-center gap-3">
                  <div 
                    className="h-1.5 w-1.5 rounded-full animate-pulse" 
                    style={{ backgroundColor: "#ffffff", boxShadow: "0 0 8px #ffffff" }}
                  />
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] leading-none">{Math.round(progress)}% Integrated</span>
               </div>
               <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] leading-none">v4.0.1 Stable</span>
            </div>
         </div>
      </div>

       {/* Floating Decal */}
       <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-20"
      >
         <div className="h-1 w-1 bg-white rounded-full shadow-[0_0_10px_white]" />
      </motion.div>
    </motion.div>
  )
}

// Minimal utility if not imported
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
