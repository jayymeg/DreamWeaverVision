import PageContainer from "@/components/layout/page-container";
import HeroSection from "@/components/home/hero-section";
import FeatureSection from "@/components/home/feature-section";
import CtaSection from "@/components/home/cta-section";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>DreamCrafter - AI-Inspired Dream Journal & Visualizer</title>
        <meta 
          name="description" 
          content="Transform your dreams into beautiful visualizations and uncover their hidden meanings with DreamCrafter, your personal AI-powered dream journal." 
        />
      </Helmet>
      <PageContainer>
        <HeroSection />
        <FeatureSection />
        <CtaSection />
      </PageContainer>
    </>
  );
}
