import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { CookieBanner } from '../components/CookieBanner';
import { HeroSection } from '../components/sections/HeroSection';
import { PainSection } from '../components/sections/PainSection';
import { PillarsSection } from '../components/sections/PillarsSection';
import { HowItWorksSection } from '../components/sections/HowItWorksSection';
import { BenefitsSection } from '../components/sections/BenefitsSection';
import { AboutSection } from '../components/sections/AboutSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { IncludedSection } from '../components/sections/IncludedSection';
import { AppSection } from '../components/sections/AppSection';
import { LeadMagnetSection } from '../components/LeadForm/LeadMagnetSection';
import { FinalCtaSection } from '../components/sections/FinalCtaSection';
import { FaqSection } from '../components/sections/FaqSection';

export function LandingPage() {
  return (
    <div style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <Navbar />
      <HeroSection />
      <PainSection />
      <PillarsSection />
      <HowItWorksSection />
      <BenefitsSection />
      <AboutSection />
      <TestimonialsSection />
      <IncludedSection />
      <AppSection />
      <LeadMagnetSection />
      <FinalCtaSection />
      <FaqSection />
      <Footer />
      <CookieBanner />
    </div>
  );
}
