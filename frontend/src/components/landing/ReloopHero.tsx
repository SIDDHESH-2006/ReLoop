import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui";
import { RadialEmblem } from "../effects";

/* Branded RELOOP entry screen — brand mark, wordmark, platform label, headline and the two primary CTAs. */
export default function ReloopHero() {
  return (
    <section className="relative z-10 mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-6 py-24 text-center">
      {/* Brand mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <RadialEmblem size={128} />
      </motion.div>

      {/* Wordmark */}
      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, type: "spring", stiffness: 300, damping: 24 }}
        className="mt-6 font-display text-6xl font-extrabold uppercase leading-none tracking-tight sm:text-7xl md:text-8xl"
      >
        Reloop
      </motion.h1>

      {/* Platform label */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42 }}
        className="mt-4 font-mono text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground sm:text-sm"
      >
        The Circular Economy Platform
      </motion.p>

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.54, type: "spring", stiffness: 300, damping: 26 }}
        className="mt-10 max-w-2xl font-display text-4xl font-extrabold uppercase leading-[0.92] tracking-tight sm:text-5xl md:text-6xl"
      >
        Find the next best life for <span className="text-primary">every item.</span>
      </motion.h2>

      {/* Supporting text */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.68 }}
        className="mt-6 max-w-xl text-lg text-muted-foreground"
      >
        Reloop keeps products, materials and resources in use for as long as possible — connecting students,
        food institutions, recyclers, upcyclers and donation organisations in one continuous loop.
      </motion.p>

      {/* Two large pill CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.82, type: "spring", stiffness: 300, damping: 24 }}
        className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-6"
      >
        <Button to="/get-started" variant="mint" className="w-full px-10 py-5 text-base sm:w-auto">
          Get started <ArrowRight className="h-5 w-5" />
        </Button>
        <Button to="/about" variant="white" className="w-full px-10 py-5 text-base sm:w-auto">
          Explore about us
        </Button>
      </motion.div>
    </section>
  );
}
