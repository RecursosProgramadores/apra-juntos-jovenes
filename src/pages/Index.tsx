import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import ProposalsSection from "@/components/sections/ProposalsSection";
import CandidateSection from "@/components/sections/CandidateSection";
import SocialSection from "@/components/sections/SocialSection";
import CTASection from "@/components/sections/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ProposalsSection />
      <CandidateSection />
      <SocialSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
