import PageContainer from "@/components/layout/page-container";
import { Helmet } from "react-helmet";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About - DreamCrafter</title>
        <meta 
          name="description" 
          content="Learn about DreamCrafter's mission to help you understand your dreams through visualization and interpretation." 
        />
      </Helmet>
      <PageContainer className="prose dark:prose-invert max-w-4xl mx-auto">
        <h1 className="font-heading text-4xl font-bold mb-6">About DreamCrafter</h1>
        
        <div className="mb-8">
          <img 
            src="https://images.unsplash.com/photo-1519692933481-e162a57d6721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=400" 
            alt="Dreamy night sky" 
            className="w-full h-64 object-cover rounded-xl" 
          />
        </div>
        
        <h2 className="font-heading text-2xl font-semibold mb-4">Our Mission</h2>
        <p>
          DreamCrafter was created with a simple yet profound mission: to help people explore the rich landscape of their dreams, 
          understand their subconscious mind, and harness the creative potential that emerges during sleep.
        </p>
        
        <p>
          We believe that dreams are not just random neural firings, but meaningful expressions of our deepest thoughts, fears, 
          desires, and creativity. By providing tools to capture, visualize, and interpret dreams, we hope to open a window into 
          the mysterious world that occupies a third of our lives.
        </p>
        
        <h2 className="font-heading text-2xl font-semibold mb-4 mt-8">How DreamCrafter Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="bg-white dark:bg-neutral-dark/50 p-6 rounded-lg">
            <h3 className="font-heading text-xl font-semibold mb-3">Journal</h3>
            <p>Record your dreams with details about emotions, settings, characters, and events while they're still fresh in your mind.</p>
          </div>
          
          <div className="bg-white dark:bg-neutral-dark/50 p-6 rounded-lg">
            <h3 className="font-heading text-xl font-semibold mb-3">Visualize</h3>
            <p>Our algorithm transforms your written dreams into unique, abstract visual representations that capture their essence.</p>
          </div>
          
          <div className="bg-white dark:bg-neutral-dark/50 p-6 rounded-lg">
            <h3 className="font-heading text-xl font-semibold mb-3">Interpret</h3>
            <p>Gain insights into possible meanings of your dreams through our interpretation engine based on symbol analysis.</p>
          </div>
        </div>
        
        <h2 className="font-heading text-2xl font-semibold mb-4">Privacy & Your Data</h2>
        <p>
          We take your privacy seriously. DreamCrafter is designed to store your dreams locally on your device by default. 
          Your personal dream journal never leaves your computer unless you explicitly choose to share it.
        </p>
        
        <h2 className="font-heading text-2xl font-semibold mb-4 mt-8">The Science of Dreams</h2>
        <p>
          Dreams occur primarily during REM (Rapid Eye Movement) sleep, when brain activity is high and resembles wakefulness. 
          Scientists believe dreams may serve several important functions:
        </p>
        
        <ul>
          <li>Processing emotions and experiences</li>
          <li>Memory consolidation and learning</li>
          <li>Problem-solving and creativity</li>
          <li>Mental rehearsal and preparation</li>
        </ul>
        
        <p>
          While the exact purpose of dreams remains a scientific mystery, their value for self-reflection, 
          creativity, and psychological insight is well-documented.
        </p>
        
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-xl my-8">
          <h2 className="font-heading text-2xl font-semibold mb-2">Start Your Dream Journey</h2>
          <p className="mb-0">
            Begin recording your dreams today and discover the hidden meanings and creative inspiration within your subconscious mind.
          </p>
        </div>
      </PageContainer>
    </>
  );
}
