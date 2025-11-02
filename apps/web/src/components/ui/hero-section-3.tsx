"use client"

import { motion } from "framer-motion"
import { PromptBox } from "@/components/ui/chatgpt-prompt-input"

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-[80vh] overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.25),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.25),transparent_60%)]" />
      </motion.div>


      {/* AI Prompt Section */}
      <motion.div
        className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <div className="text-center space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              What do you want to create?
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start building with a single prompt. No coding needed.
            </p>
          </div>
          <PromptBox />
          <p className="text-xs text-muted-foreground">
            By using NBCON PRO AI Assistant, you agree to our Terms & AI Policy.
          </p>
        </div>
      </motion.div>
    </section>
  )
}

