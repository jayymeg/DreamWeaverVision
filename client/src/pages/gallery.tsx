import PageContainer from "@/components/layout/page-container";
import DreamGallery from "@/components/dream-gallery/dream-gallery";
import { Helmet } from "react-helmet";

export default function Gallery() {
  return (
    <>
      <Helmet>
        <title>Dream Gallery - DreamCrafter</title>
        <meta 
          name="description" 
          content="Browse your collection of recorded dreams and their visualizations in our beautiful dream gallery interface." 
        />
      </Helmet>
      <PageContainer>
        <DreamGallery />
      </PageContainer>
    </>
  );
}
