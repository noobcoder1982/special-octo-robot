import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowUp01Icon as ArrowUp, 
  AttachmentIcon as Paperclip, 
  AiChat01Icon as Bot, 
  GlobeIcon as Globe,
  ArrowDown01Icon as ChevronDown,
  ArrowRight01Icon as ArrowRight
} from "hugeicons-react"
import { Button } from "./ui/button"

export default function AIChatPage() {
  const [messages, setMessages] = React.useState<any[]>([])
  const [input, setInput] = React.useState("")

  const queries = [
    "Analyze risk factors for Sector Gamma flooding",
    "Identify optimal drop points for medical supplies",
    "Calculate volunteer efficiency index for last mission",
    "Draft a strategic briefing for the regional NGO council"
  ]

  const handleSend = () => {
    if(!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", content: "Signal received. I am processing your strategic inquiry through our neural grid. Currently, all sectors show stable operational metrics. How can I assist with your deployment planning?" }])
    }, 1000);
  }

  if (messages.length === 0) {
    return (
      <div className="flex h-screen bg-background relative overflow-hidden pb-[88px] md:pb-0 font-body flex-col items-center justify-center">
        {/* Soft Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f9f1d0] dark:bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none opacity-80" />

        <div className="relative z-10 w-full max-w-3xl px-6 flex flex-col items-center text-center -mt-20">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-8">What can I help with?</h1>

          {/* Input Box */}
          <div className="w-full bg-card shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-border/50 rounded-3xl p-4 flex flex-col mb-10 text-left transition-all focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.08)] focus-within:border-border">
             <textarea 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => {
                 if (e.key === 'Enter' && !e.shiftKey) {
                   e.preventDefault()
                   handleSend()
                 }
               }}
               placeholder="Ask AI anything"
               className="w-full bg-transparent border-none resize-none outline-none h-24 text-base placeholder:text-muted-foreground/50 p-2"
             />
             
             <div className="flex justify-between items-center mt-2 px-1">
                {/* Left tools */}
                <div className="flex items-center gap-2">
                   <button className="flex items-center gap-2 bg-secondary/80 hover:bg-secondary px-3 py-1.5 rounded-full text-xs font-semibold transition-colors text-muted-foreground">
                      <Bot className="h-4 w-4 text-foreground/70" />
                      <span className="text-foreground/80">o3-mini</span>
                      <ChevronDown className="h-3 w-3 opacity-50" />
                   </button>
                   <button className="h-8 w-8 rounded-full bg-secondary/80 hover:bg-secondary flex items-center justify-center text-muted-foreground transition-colors">
                      <Globe className="h-4 w-4" />
                   </button>
                </div>

                {/* Right tools */}
                <div className="flex items-center gap-2">
                   <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                      <Paperclip className="h-5 w-5" />
                   </button>
                   <button 
                     onClick={handleSend}
                     disabled={!input.trim()}
                     className="h-9 w-9 rounded-full bg-foreground hover:bg-foreground/90 text-background flex items-center justify-center transition-all disabled:opacity-30 disabled:bg-muted-foreground"
                   >
                      <ArrowUp className="h-5 w-5 stroke-[2.5px]" />
                   </button>
                </div>
             </div>
          </div>

          {/* Queries */}
          <div className="w-full text-left">
             <div className="text-[13px] font-semibold text-muted-foreground/80 mb-4 px-2">Examples of queries:</div>
             <div className="flex flex-col gap-3 items-start">
               {queries.map((q, i) => (
                 <button key={i} onClick={() => setInput(q)} className="group flex items-center gap-2 px-4 py-2 rounded-full border border-dashed border-border/80 hover:border-solid hover:bg-secondary/50 hover:border-border transition-all text-[13px] font-medium text-muted-foreground hover:text-foreground">
                    {q} <ArrowRight className="h-3 w-3 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                 </button>
               ))}
             </div>
          </div>
        </div>
      </div>
    )
  }

  // Chat UI when there are messages
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden pb-[88px] md:pb-0 font-body">
      <main className="flex-1 flex flex-col relative">
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 max-w-4xl mx-auto w-full pt-12">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'ml-auto max-w-[80%]' : 'max-w-[85%]'}`}>
               {m.role === 'assistant' && (
                 <div className="h-8 w-8 shrink-0 rounded-full border border-border flex items-center justify-center">
                   <Bot className="h-4 w-4 text-foreground" />
                 </div>
               )}
               <div className={`p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-secondary text-foreground ml-auto' : 'bg-transparent'}`}>
                 {m.content}
               </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-background">
          <div className="max-w-3xl mx-auto relative flex items-center bg-card shadow-md border border-border/50 rounded-full px-2 py-2">
             <textarea 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => {
                 if (e.key === 'Enter' && !e.shiftKey) {
                   e.preventDefault()
                   handleSend()
                 }
               }}
               placeholder="Message AI..."
               className="w-full bg-transparent border-none outline-none pl-6 pr-16 py-2 resize-none h-[40px] text-sm"
             />
             <Button 
               onClick={handleSend}
               size="icon"
               className="absolute right-3 rounded-full h-9 w-9 bg-foreground hover:bg-foreground/90 text-background transition-all"
             >
               <ArrowUp className="h-4 w-4" />
             </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
