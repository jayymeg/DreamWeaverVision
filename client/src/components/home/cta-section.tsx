import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import { motion } from "framer-motion";

export default function CtaSection() {
  return (
    <section id="cta" className="py-10 md:py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Begin Your Dream Journey Today</h2>
        <p className="text-neutral-medium text-lg mb-8">Unlock the mysteries of your subconscious mind and transform your dreams into beautiful art.</p>
        <Link href="/journal">
          <Button className="px-8 py-6 bg-primary hover:bg-primary-dark text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1" size="lg">
            <PenLine className="mr-2 h-5 w-5" /> Record Your First Dream
          </Button>
        </Link>
        <p className="mt-6 text-sm text-neutral-medium">No account required. All dreams are stored locally on your device.</p>
      </motion.div>
    </section>
  );
}
