import { PenLine, PaintbrushVertical, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <PenLine className="text-2xl text-primary" />,
    title: "Record Your Dreams",
    description: "Document your dreams in our intuitive journal with details about emotions, characters, and environments.",
    learnMoreLink: "#"
  },
  {
    icon: <PaintbrushVertical className="text-2xl text-primary" />,
    title: "Visualize with AI",
    description: "Transform written dreams into unique, abstract visual art using our AI-powered visualization engine.",
    learnMoreLink: "#"
  },
  {
    icon: <BrainCircuit className="text-2xl text-primary" />,
    title: "Uncover Meanings",
    description: "Discover possible interpretations of your dreams through our analysis algorithm and reflection tools.",
    learnMoreLink: "#"
  }
];

export default function FeatureSection() {
  return (
    <section id="features" className="py-10 md:py-16">
      <h2 className="font-heading text-3xl font-bold text-center mb-12">How DreamCrafter Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-neutral-dark/50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="font-heading text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-neutral-medium mb-4">{feature.description}</p>
            <a href={feature.learnMoreLink} className="text-primary hover:text-primary-dark flex items-center font-medium">
              <span>Learn more</span>
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
