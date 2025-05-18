import { useState } from "react";
import PageContainer from "@/components/layout/page-container";
import DreamForm from "@/components/dream-entry/dream-form";
import VisualizationPreview from "@/components/dream-entry/visualization-preview";
import { Helmet } from "react-helmet";

export default function Journal() {
  const [visualization, setVisualization] = useState<any | null>(null);
  const [dreamData, setDreamData] = useState<any | null>(null);

  const handleGenerateVisualization = (data: any) => {
    setVisualization(data);
  };

  const handleSaveDreamData = (data: any) => {
    setDreamData(data);
  };

  return (
    <>
      <Helmet>
        <title>Dream Journal - DreamCrafter</title>
        <meta 
          name="description" 
          content="Record your dreams and transform them into visual art. Our dream journal helps you capture, visualize and interpret your dreams." 
        />
      </Helmet>
      <PageContainer>
        <DreamForm 
          onGenerateVisualization={(data) => {
            handleGenerateVisualization(data);
            handleSaveDreamData({
              title: (document.getElementById("title") as HTMLInputElement)?.value || "My Dream",
              description: (document.getElementById("description") as HTMLTextAreaElement)?.value || "",
              date: new Date(),
              mood: (document.getElementById("mood") as HTMLSelectElement)?.value,
              clarity: (document.getElementById("clarity") as HTMLSelectElement)?.value,
              location: (document.getElementById("location") as HTMLInputElement)?.value,
            });
          }} 
        />
        {visualization && (
          <VisualizationPreview 
            visualization={visualization} 
            dreamData={dreamData} 
          />
        )}
      </PageContainer>
    </>
  );
}
